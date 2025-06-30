<script setup>
import { onMounted, reactive } from 'vue';
//getDoc
import { addDoc, deleteDoc, doc, getDocs, updateDoc } from 'firebase/firestore';

import { useFirestore } from 'vuefire';
const db = useFirestore();

//import { useCollection } from 'vuefire';
import { collection } from 'firebase/firestore';

const state = reactive({
    id: '',
    name: '',
    price: 0,
    quantity: 0,
    description: '',
    productUrl: '',
    productData: [],
    visibleAddProduct: true
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

onMounted(async () => {
    //const docRef = doc(db, 'todos', 'suhan');
    try {
        const productArray = [];
        const querySnapshot = await getDocs(collection(db, 'products'));
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            productArray.push({ ...doc.data(), id: doc.id });
        });
        console.log('all products', productArray);
        state.productData = [...productArray];
    } catch (e) {
        console.log('Error getting cached products document:', e);
    }
});
//<Button v-if="state.wantToUpdate" label="Submit" icon="pi pi-check" severity="info" iconPos="right" @click="updateTheProductInDB" />
</script>

<template>
  <Fluid>
    <div class="flex flex-col md:flex-row gap-8 px-4 md:px-0">
      
      <!-- Form section: mobile order-1, desktop order-2 -->
      <div class="w-full md:w-1/2 flex flex-col gap-4 order-1 md:order-2">
        <section v-if="state.visibleAddProduct">
          <div class="font-semibold text-xl mb-4">Product Add</div>
          <div class="flex flex-col gap-2">
            <label for="name1">Name</label>
            <InputText id="name1" type="text" v-model="state.name" />
          </div>
          <div class="flex flex-col gap-2">
            <label for="price1">Price</label>
            <InputText id="price1" type="number" min="0" v-model="state.price" />
          </div>
          <div class="flex flex-col gap-2">
            <label for="quantity1">Quantity</label>
            <InputText id="quantity1" type="number" min="0" v-model="state.quantity" />
          </div>
          <div class="flex flex-col gap-2">
            <label for="productUrl1">Product URL</label>
            <InputText id="productUrl1" type="url" v-model="state.productUrl" />
          </div>
          <div class="flex flex-col gap-2">
            <label for="description1">Description</label>
            <textarea
              id="description1"
              class="border rounded resize-none"
              rows="3"
              v-model="state.description"
            />
          </div>
          <Button
            label="Submit"
            icon="pi pi-check"
            iconPos="right"
            @click="addProductInDb"
            class="mt-4 w-full md:w-auto"
          />
        </section>

        <section v-else>
          <div class="font-semibold text-xl mb-4">Product Update</div>
          <div class="flex flex-col gap-2">
            <label for="name2">Name</label>
            <InputText id="name2" type="text" v-model="state.name" />
          </div>
          <div class="flex flex-col gap-2">
            <label for="price2">Price</label>
            <InputText id="price2" type="number" min="0" v-model="state.price" />
          </div>
          <div class="flex flex-col gap-2">
            <label for="quantity2">Quantity</label>
            <InputText id="quantity2" type="number" min="0" v-model="state.quantity" />
          </div>
          <div class="flex flex-col gap-2">
            <label for="productUrl2">Product URL</label>
            <InputText id="productUrl2" type="url" v-model="state.productUrl" />
          </div>
          <div class="flex flex-col gap-2">
            <label for="description2">Description</label>
            <textarea
              id="description2"
              class="border rounded resize-none"
              rows="3"
              v-model="state.description"
            />
          </div>
          <div class="flex gap-2 mt-4 flex-wrap">
            <Button
              label="Update"
              severity="info"
              icon="pi pi-check"
              iconPos="right"
              @click="updateProduct"
              class="flex-1 min-w-[120px]"
            />
            <Button
              label="Cancel"
              severity="secondary"
              outlined
              @click="resetForm"
              class="flex-1 min-w-[120px]"
            />
          </div>
        </section>
      </div>

      <!-- Product list section: mobile order-2, desktop order-1 -->
      <div class="w-full md:w-1/2 order-2 md:order-1 card flex flex-col">
        <div v-if="state.productData.length > 0" class="flex justify-center">
          <div class="w-full">
            <p class="text-green-500 font-bold text-center mb-4">Your product list inventory</p>
            <div v-for="product in state.productData" :key="product.id" class="m-2 md:m-4 xs:-m-4 xs:mt-6">
              <Card style="width: 100%; max-width: 400px; overflow: hidden; margin: auto;">
                <template #header>
                  <img alt="product image" :src="product.productUrl" class="w-full" />
                </template>

                <template #title>{{ product.name }}</template>

                <template #content>
                  <p class="m-0">{{ product.description }}</p>
                  <p class="m-0">
                    Price: {{ product.price }} tk - Quantity: {{ product.quantity }}
                  </p>
                </template>

                <template #footer>
                  <div class="flex gap-2 mt-1 flex-wrap">
                    <Button
                      @click="deleteProduct(product)"
                      label="Delete"
                      severity="secondary"
                      outlined
                      class="flex-1 min-w-[120px]"
                    />
                    <Button
                      @click="updateStateProductData(product)"
                      label="Update"
                      class="flex-1 min-w-[120px]"
                    />
                  </div>
                </template>
              </Card>
            </div>
          </div>
        </div>
        <div v-else>
          <p class="text-red-500 text-center">You have no product in inventory</p>
          <ProgressSpinner
            style="width: 50px; height: 50px; margin: auto;"
            strokeWidth="8"
            fill="transparent"
            animationDuration=".5s"
            aria-label="Custom ProgressSpinner"
          />
        </div>
      </div>
    </div>
  </Fluid>
</template>

<!-- <template>
    <Fluid>
        <div class="flex flex-col md:flex-row gap-8">
            <div class="md:w-full card flex">
                <div class="w-1/2">
                    <div v-if="state.productData.length > 0" class="flex justify-center">
                        <div>
                            <p class="text-green-500 font-bold flex justify-center">your product list inventory</p>
                            <div v-for="product in state.productData" :key="product" class="m-4 mx-8">
                                <Card style="width: 25rem; overflow: hidden">
                                    <template #header>
                                        <img alt="user header" :src="product.productUrl" class="w-full" />
                                    </template>

                                    <template #title>{{ product.name }}</template>
                                    <template #content>
                                        <p class="m-0">
                                            {{ product.description }}
                                        </p>
                                        <p class="m-0">price : {{ product.price }} tk - quantity : {{ product.quantity }}</p>
                                    </template>
                                    <template #footer>
                                        <div class="flex gap-4 mt-1">
                                            <Button @click="deleteProduct(product)" label="Delete" severity="secondary" outlined class="w-full font-color-red-500" />
                                            <Button @click="updateStateProductData(product)" label="Update" class="w-full" />
                                        </div>
                                    </template>
                                </Card>
                            </div>
                        </div>
                    </div>
                    <div v-else>
                        <div>
                            <p class="text-red-500 flex justify-center">you have no product in inventory</p>
                            <ProgressSpinner style="width: 50px; height: 50px" strokeWidth="8" fill="transparent" animationDuration=".5s" aria-label="Custom ProgressSpinner" />
                        </div>
                    </div>
                </div>

                <div class="flex flex-col gap-4 w-1/2 md:mx-8 lg:mx-0">
                    <section v-if="state.visibleAddProduct">
                        <div class="font-semibold text-xl">Product Add</div>
                        <div class="flex flex-col gap-2">
                            <label for="name1">Name</label>
                            <InputText id="name1" type="text" v-model="state.name" />
                        </div>
                        <div class="flex flex-col gap-2">
                            <label for="price">Price</label>
                            <InputText id="price" type="number" min="0" v-model="state.price" />
                        </div>
                        <div class="flex flex-col gap-2">
                            <label for="quantity">Quantity</label>
                            <InputText id="quantity" type="number" min="0" v-model="state.quantity" />
                        </div>
                        <div class="flex flex-col gap-2">
                            <label for="quantity">Product url</label>
                            <InputText id="quantity" type="url" v-model="state.productUrl" />
                        </div>
                        <div class="flex flex-col gap-2">
                            <label for="description">Description</label>
                            <textarea id="description" type="text" class="border rounded" v-model="state.description" />
                        </div>
                        <Button v-if="!state.wantToUpdate" label="Submit" icon="pi pi-check" iconPos="right" @click="addProductInDb" class="mt-4" />
                    </section>
                    <section v-else>
                        <div class="font-semibold text-xl">Product Update</div>
                        <div class="flex flex-col gap-2">
                            <label for="name1">Name</label>
                            <InputText id="name1" type="text" v-model="state.name" />
                        </div>
                        <div class="flex flex-col gap-2">
                            <label for="price">Price</label>
                            <InputText id="price" type="number" min="0" v-model="state.price" />
                        </div>
                        <div class="flex flex-col gap-2">
                            <label for="quantity">Quantity</label>
                            <InputText id="quantity" type="number" min="0" v-model="state.quantity" />
                        </div>
                        <div class="flex flex-col gap-2">
                            <label for="quantity">Product url</label>
                            <InputText id="quantity" type="url" v-model="state.productUrl" />
                        </div>
                        <div class="flex flex-col gap-2">
                            <label for="description">Description</label>
                            <textarea id="description" type="text" class="border" v-model="state.description" />
                        </div>
                        <Button v-if="!state.wantToUpdate" label="warn" severity="main" icon="pi pi-check" iconPos="right" @click="updateProduct" class="mt-4" />
                    </section>
                </div>
            </div>
        </div>
    </Fluid>
</template> -->