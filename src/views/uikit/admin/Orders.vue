<script setup>
import { onMounted, reactive } from 'vue';
//getDoc
import { doc, getDocs, updateDoc } from 'firebase/firestore';

import { useFirestore } from 'vuefire';
const db = useFirestore();

//import { useCollection } from 'vuefire';
import { collection } from 'firebase/firestore';

const state = reactive({
    productData: [],
    
});

const courierOrder = async (id, order) => {

    try {
        const specificOrderRef = await doc(db, 'order', id);

await updateDoc(specificOrderRef, {
    ...order, courier: true
});
alert('order update successfully !!');
await reFatch()
    } catch (e) {
        console.log('Error getting cached products document:', e);
    }
};

const reFatch = async () => {
    const orderArray = [];
        const querySnapshot = await getDocs(collection(db, 'order'));
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            orderArray.push({ ...doc.data(), id: doc.id });
        });
        console.log('all orders', orderArray);
        state.orderData = [...orderArray];
}

onMounted(async () => {
    //const docRef = doc(db, 'todos', 'suhan');
    try {
       await reFatch();
    } catch (e) {
        console.log('Error getting cached products document:', e);
    }
});
//<Button v-if="state.wantToUpdate" label="Submit" icon="pi pi-check" severity="info" iconPos="right" @click="updateTheProductInDB" />
</script>
<template>
  <Fluid>
    <div class="flex flex-col md:flex-row gap-8 md:px-0">
      <div class="w-full md:w-full card p-4">
        <div class="w-full">
          <div class="lg:text-[28px] md:text-[20px] xs:text-[14px] font-bold my-4 flex items-center justify-center px-4">All Orders</div>
          <div v-if="state.orderData && state.orderData.length > 0">
            <p class="text-green-500 font-bold flex items-center justify-center px-4">Order product list inventory</p>
            <p class="black flex items-center justify-center px-4 mb-4">-----------------------------------</p>
            <div>
                <!-- {{ state?.orderData }} -->
              <div
                class="w-full my-4 py-4 px-4 border shadow-md rounded-md "
                v-for="order in state.orderData"
                :key="order.id"
              >
                <section class="flex flex-col md:flex-row md:justify-between md:items-start gap-4 md:gap-8">
                  <section class="capitalize md:w-1/3">
                    <p>Name: {{ order?.name }}</p>
                    <p>Address: {{ order?.address }}</p>
                    <p>Phone: {{ order?.phone }}</p>
                  </section>

                  <section class="md:w-1/2">
                    <div
                      v-for="product in order?.orderProducts"
                      :key="product.id"
                      class="flex flex-col md:flex-row items-center md:items-start gap-4 md:gap-8 mb-4"
                    >
                      <div>
                        <p>Name: {{ product?.name }}</p>
                        <p>Price: {{ product?.price }}</p>
                        <p>Total Order Quantity: {{ product?.totalOrderQuantity }}</p>
                      </div>
                      <div>
                        <img :src="product.productUrl" alt="product" class="w-[100px]" />
                      </div>
                    </div>
                  </section>

                  <section class="flex md:flex-col items-center md:items-end md:w-1/6">
                    <Button
                      v-if="!order?.courier"
                      label="Complete"
                      severity="warn"
                      class="mx-2 md:mx-0 my-2"
                      @click="courierOrder(order?.id, order)"
                    />
                    <Button
                      v-else
                      label="Completed"
                      severity="primary"
                      class="mx-2 md:mx-0 my-2"
                      disabled
                    />
                  </section>
                </section>
              </div>
            </div>
          </div>
          <div v-else class="text-center py-10 text-red-500">No orders found.</div>
        </div>
      </div>
    </div>
  </Fluid>
</template>