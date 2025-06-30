<script setup>
import { onMounted, reactive } from 'vue';
//getDoc
import { addDoc, deleteDoc, doc, getDocs, updateDoc } from 'firebase/firestore';

import { useFirestore } from 'vuefire';
const db = useFirestore();

//import { useCollection } from 'vuefire';
import { collection } from 'firebase/firestore';

const state = reactive({
    //id: '',
    //name: '',
    // price: 0,
    //quantity: 0,
    //description: '',
    //productUrl: '',
    //visibleAddProduct: true
    reviewData: []
});

const addProductInDb = async () => {
    console.log('products', state);

    // Add a new document with a generated id.
    const docRef = await addDoc(collection(db, 'products'), {
        name: state.name,
        price: state.price,
        quantity: state.quantity,
        description: state.description,
        productUrl: state.productUrl
    });
    console.log('add product successfully', docRef);

    //state remove after the product
    state.name = '';
    state.price = 0;
    state.quantity = 0;
    state.description = '';
    state.productUrl = '';

    const querySnapshot = await getDocs(collection(db, 'products'));
    const productArray = [];
    querySnapshot.forEach((doc) => {
        productArray.push({ ...doc.data(), id: doc.id });
        // doc.data() is never undefined for query doc snapshots
        //console.log('product showing from db', doc.id, ' => ', doc.data());
    });
    state.productData = productArray.reverse();
};
const deleteProduct = async (product) => {
    alert('are you sure you want to delete this product');
    await deleteDoc(doc(db, 'products', product.id));
    console.log('delete product', product);
    const querySnapshot = await getDocs(collection(db, 'products'));
    const productArray = [];
    querySnapshot.forEach((doc) => {
        productArray.push({ ...doc.data(), id: doc.id });
    });
    state.productData = [...productArray];
};

//the update product
//const updatrProduct = (product) => {
//console.log('update the product', product);
//state.wantToUpdate = true;
//};

//const updateTheProductInDB = () => {
//console.log('update the productn in db');
//};

const updateStateProductData = (product) => {
    state.visibleAddProduct = false;
    console.log('update product', product);
    state.id = product.id;
    state.name = product.name;
    state.price = product.price;
    state.quantity = product.quantity;
    state.description = product.description;
    //state.productUrl = product.productUrl;
    //alert('are you sure update the product');
};

const updateProduct = async () => {
    const specificProductRef = await doc(db, 'products', state.id);

    await updateDoc(specificProductRef, {
        name: state.name,
        price: state.price,
        quantity: state.quantity,
        description: state.description
    });
    alert('product update successfully !!');
    state.id = '';
    state.name = '';
    state.price = '';
    state.quantity = '';
    state.description = '';
    state.visibleAddProduct = true;

    try {
        const productArray = [];
        const querySnapshot = await getDocs(collection(db, 'products'));
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            productArray.push({ ...doc.data(), id: doc.id });
        });
        console.log('all products refetch after update data', productArray);
        state.productData = [...productArray];
    } catch (e) {
        console.log('Error getting cached products document:', e);
    }
};

const disableReview = async (review) => {
    console.log('review', review);
    const specificReviewRef = await doc(db, 'reviews', review.id);
    await updateDoc(specificReviewRef, {
        status: false
    });
    try {
        const reviewArray = [];
        const querySnapshot = await getDocs(collection(db, 'reviews'));
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            reviewArray.push({ ...doc.data(), id: doc.id });
        });
        console.log('reviewArray', reviewArray);
        state.reviewData = [...reviewArray];
    } catch (e) {
        console.log('Error getting cached products document:', e);
    }
};

const enableReview = async (review) => {
    console.log('review', review);
    const specificReviewRef = await doc(db, 'reviews', review.id);
    await updateDoc(specificReviewRef, {
        status: true
    });
    try {
        const reviewArray = [];
        const querySnapshot = await getDocs(collection(db, 'reviews'));
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            reviewArray.push({ ...doc.data(), id: doc.id });
        });
        console.log('reviewArray', reviewArray);
        state.reviewData = [...reviewArray];
    } catch (e) {
        console.log('Error getting cached products document:', e);
    }
};

onMounted(async () => {
    //const docRef = doc(db, 'todos', 'suhan');
    try {
        const reviewArray = [];
        const querySnapshot = await getDocs(collection(db, 'reviews'));
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            reviewArray.push({ ...doc.data(), id: doc.id });
        });
        console.log('reviewArray', reviewArray);
        state.reviewData = [...reviewArray];
    } catch (e) {
        console.log('Error getting cached products document:', e);
    }
});
//<Button v-if="state.wantToUpdate" label="Submit" icon="pi pi-check" severity="info" iconPos="right" @click="updateTheProductInDB" />
</script>

<template>
  <Fluid>
    <div class="flex flex-col md:flex-row gap-8">
      <section class="w-full">
        <div class="md:w-full card flex justify-center py-4 text-[18px] font-bold">All review</div>

        <div class="card" v-if="state.reviewData.length > 0">
          <div
            v-for="(item, index) in state.reviewData"
            :key="index"
            class="flex flex-col sm:flex-row sm:items-center p-6 gap-4"
            :class="{ 'border-t border-surface': index !== 0 }"
          >
            <!-- Image -->
            <div class="md:w-40 w-full max-w-[150px] mx-auto sm:mx-0">
              <img
                class="rounded w-full"
                :src="item.status
                  ? 'https://static.vecteezy.com/system/resources/previews/004/154/332/original/data-storage-database-outline-style-icon-vector.jpg'
                  : 'https://www.clipartmax.com/png/middle/416-4168161_data-store-icon.png'"
                :alt="item.name"
              />
            </div>

            <!-- Main content -->
            <div class="flex flex-col md:flex-row justify-between md:items-center flex-1 gap-6 w-full">
              <!-- Info + Rating -->
              <div class="flex flex-row md:flex-col justify-between items-start gap-2 w-full md:w-auto">
                <div>
                  <span class="font-medium text-surface-500 dark:text-surface-400 text-sm">{{ item.userId }}</span>
                  <div class="text-lg font-medium mt-2">{{ item.productid }}</div>
                </div>
              </div>

              <!-- Price + Star + Buttons -->
              <div class="flex flex-col sm:items-end justify-between gap-2 w-full md:w-auto">
                <!-- $ + star same line -->
                <div class="flex items-center gap-4">
                  <span class="text-lg font-semibold">${{ item.price }}</span>
                  <div class="flex items-center gap-1">
                    <span class="text-sm font-medium">{{ item.rating }}</span>
                    <i class="pi pi-star-fill text-yellow-500"></i>
                  </div>
                </div>

                <!-- Buttons -->
                <div class="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                  <Button
                    severity="danger"
                    icon="pi pi-trash"
                    label="Disable review"
                    class="w-full sm:w-auto"
                    @click="disableReview(item)"
                    :disabled="!item.status"
                  />
                  <Button
                    icon="pi pi-shopping-cart"
                    label="Keep review"
                    class="w-full sm:w-auto"
                    :disabled="item.status"
                    @click="enableReview(item)"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- No review -->
        <div v-else class="text-center py-8 text-gray-500">You have no review</div>
      </section>
    </div>
  </Fluid>
</template>



<!-- <template>
    <Fluid>
        <div class="flex flex-col md:flex-row gap-8">
            <section>
                <div class="md:w-full card flex">All review</div>
                <div class="card" v-if="state.reviewData.length > 0">
                    <div v-for="(item, index) in state.reviewData" :key="index">
                        <div class="flex flex-col sm:flex-row sm:items-center p-6 gap-4" :class="{ 'border-t border-surface': index !== 0 }">
                            <div class="md:w-40 relative">
                                <img
                                    class="block xl:block mx-auto rounded w-full"
                                    :src="
                                        item.status
                                            ? 'https://static.vecteezy.com/system/resources/previews/004/154/332/original/data-storage-database-outline-style-icon-vector.jpg'
                                            : 'https://www.clipartmax.com/png/middle/416-4168161_data-store-icon.png'
                                    "
                                    :alt="item.name"
                                /> -->
                                <!--https://www.clipartmax.com/png/middle/416-4168161_data-store-icon.png-->
                            <!-- </div>
                            <div class="flex flex-col md:flex-row justify-between md:items-center flex-1 gap-6">
                                <div class="flex flex-row md:flex-col justify-between items-start gap-2">
                                    <div>
                                        <span class="font-medium text-surface-500 dark:text-surface-400 text-sm">{{ item.userId }}</span>
                                        <div class="text-lg font-medium mt-2">{{ item.productid }}</div>
                                    </div>
                                    <div class="bg-surface-100 p-1" style="border-radius: 30px">
                                        <div
                                            class="bg-surface-0 flex items-center gap-2 justify-center py-1 px-2"
                                            style="
                                                border-radius: 30px;
                                                box-shadow:
                                                    0px 1px 2px 0px rgba,
                                                    0px 1px 2px 0px rgba(0, 0, 0, 0.06)
                                            "
                                        >
                                            <span class="text-surface-900 font-medium text-sm">{{ item.rating }}</span>
                                            <i class="pi pi-star-fill text-yellow-500"></i>
                                        </div>
                                    </div>
                                </div>
                                <div class="flex flex-col md:items-end gap-8">
                                    <span class="text-xl font-semibold">${{ item.price }}</span>
                                    <div class="flex flex-row-reverse md:flex-row gap-2">
                                        <Button severity="danger" icon="pi pi-trash" label="Disable review" class="flex-auto md:flex-initial whitespace-nowrap" @click="disableReview(item)" :disabled="!item.status"></Button>
                                        <Button icon="pi pi-shopping-cart" label="Keep review" class="flex-auto md:flex-initial whitespace-nowrap" :disabled="item.status" @click="enableReview(item)"></Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div v-else>
                    <p>you have no review</p>
                </div>
            </section>
        </div>
    </Fluid>
</template> -->
