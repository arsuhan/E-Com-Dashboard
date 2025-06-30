<script setup>
import Header from '@/components/shared/Header.vue';
import { loadStripe } from "@stripe/stripe-js";
import { addDoc, collection } from 'firebase/firestore';
import { onMounted, reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useFirestore } from 'vuefire';
import { useState } from '../../composables/store.js';
const stripeRef = ref()
const db = useFirestore();
const router = useRouter();
const { state } = useState();

const localstate = reactive({
    atToCart: [],
    nextClicked: false,
    userData : {},
    pk: import.meta.env.VITE_PK
});

const picked = ref('Two');

const quantityIncrease = (e, product) => {
    const localQuantity = e.target.value
    if (Number(localQuantity) < 0){
        alert('you can`t give the nagetive quantity..');
        return;
    }
    if (Number(localQuantity) > Number(product.quantity)){
        alert('you cant give the quantity more then ' + product.quantity );
        return;
    }
    const updateTheQuantity = localstate.atToCart.find((pd) => pd.id === product.id);
    updateTheQuantity.totalOrderQuantity = localQuantity;
};

const next = () => {
    const quantityFlag = localstate.atToCart.find((pd) => pd.totalOrderQuantity === '');
    if (quantityFlag) {
        alert('please give product quantity of all products')
        return;
    }
    localstate.nextClicked = true;
    const userData = JSON.parse(sessionStorage.getItem('userData'));
    if (userData?.email) {
        localstate.userData = userData
    } else {
        alert('please logged in otherwise you can not order')
    }
};

const deleteCartProduct = (product) => {
    if (product) {
        if (confirm('are you sure you want to delete this product?')){
            const filterCartProduct = localstate.atToCart.filter((prd) => prd.id !== product.id);
            localstate.atToCart = filterCartProduct;
            state.atToCart = filterCartProduct;
        }
    }
};

const cashOnDalibery = async () => {
    const orderObject = {
        email: localstate.userData?.email,
        name: localstate.userData?.name,
        address: localstate.userData?.address,
        phone: localstate.userData?.phone,
        orderProducts: state.atToCart,
        payment: false,
        paymentId: '',
    }

    try {
        const docRef = await addDoc(collection(db, 'order'), {...orderObject});
        alert('Order Add Successfully, please wait till you get your products')
        state.atToCart = []
        localstate.atToCart = []
        router.push('/');
    } catch (error) {
        alert('error occurred while creating order');
    }
};

onMounted(async () => {
    localstate.atToCart = [...state.atToCart]
    const stripe = await loadStripe('pk_test_51QeJOg4cE0lBOcbYlIHUaZMWEYS9DvnSUospS0RjU4Dqpo6i4YxoJRukVNBkbyKoNcKNuX9lNZubcsQ5VmBm5UCw00GYKCuGCq');
    stripeRef.value = stripe
});
</script>

<template>
  <div class="bg-surface-0 dark:bg-surface-900">
    <div id="home" class="landing-wrapper overflow-hidden">
      <Header />
      <section class="py-6 px-4 sm:px-6 md:mx-12 lg:mx-20">
        <div v-if="localstate.atToCart.length">
          <div
            class="w-full my-1 border border-gray-300 py-4 px-4 sm:px-6"
            v-for="product in localstate.atToCart"
            :key="product.id"
          >
            <div class="flex flex-col md:flex-row xs:items-center justify-between md:items-center gap-4 font-bold">
              <div class="capitalize">
                <p>Name: {{ product.name }}</p>
                <p>Description: {{ product.description }}</p>
                <p>Price: {{ product.price }}</p>
              </div>
              <div class="xs:items-center flex flex-col sm:flex-row items-start md:items-center gap-4 w-full md:w-auto">
                <img
                  :src="product.productUrl"
                  alt="product image"
                  class="w-[100px] h-[100px] object-cover"
                />
                <div>
                  <label class="block text-md font-medium mb-2">
                    Quantity ({{ product.quantity }})
                  </label>
                  <input
                    @blur="(e) => quantityIncrease(e, product)"
                    max="10"
                    type="number"
                    class="w-[120px] border py-2 px-4 rounded"
                  />
                </div>
                <Button
                  label="Delete"
                  severity="danger"
                  class="mt-2 sm:mt-0 sm:ml-5"
                  @click="deleteCartProduct(product)"
                />
              </div>
            </div>
          </div>
        </div>

        <div v-else>
          <p>There is no product in cart</p>
        </div>

        <div v-if="localstate.nextClicked">
          <p class="py-6 text-[22px]">Shipping Details</p>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
            <div>
              <label class="block text-md font-medium mb-2">Name</label>
              <input
                :value="localstate.userData.name"
                type="text"
                readonly
                class="w-full border py-2 px-2 rounded"
              />
            </div>
            <div>
              <label class="block text-md font-medium mb-2">Email</label>
              <input
                :value="localstate.userData.email"
                type="text"
                readonly
                class="w-full border py-2 px-2 rounded"
              />
            </div>
            <div>
              <label class="block text-md font-medium mb-2">Phone</label>
              <input
                :value="localstate.userData.phone"
                type="phone"
                class="w-full border py-2 px-2 rounded"
              />
            </div>
            <div>
              <label class="block text-md font-medium mb-2">Address</label>
              <input
                :value="localstate.userData.address"
                type="text"
                class="w-full border py-2 px-2 rounded"
              />
            </div>
          </div>

          <div>
            <p class="text-[22px] mb-4">Delivery Options</p>
            <div class="flex flex-col sm:flex-row gap-4">
              <div>
                <input type="radio" id="gateway" value="Two" v-model="picked" />
                <label for="gateway" class="ml-2">Payment Gateway</label>
              </div>
              <div>
                <input type="radio" id="cod" value="One" v-model="picked" />
                <label for="cod" class="ml-2">Cash On Delivery</label>
              </div>
            </div>

            <div v-if="picked === 'Two'" class="mt-4">
              <Button label="Place Order" />
            </div>
          </div>
        </div>

        <div
          class="py-4 flex flex-col sm:flex-row gap-4 justify-end items-center sm:items-start mx-4 sm:mx-40"
          v-if="localstate.atToCart.length"
        >
          <Button v-if="!localstate.nextClicked" label="Next" @click="next" class="w-full sm:w-auto" />
          <Button v-if="picked === 'One'" label="Place Order" @click="cashOnDalibery" class="w-full sm:w-auto" />
        </div>
      </section>
    </div>
  </div>
</template>