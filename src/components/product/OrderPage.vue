<script setup>

import { collection, getDocs, query, where } from 'firebase/firestore';
import { onMounted, reactive } from 'vue';
import { useFirestore } from 'vuefire';
// import ProductCard from './Card.vue';
// import ProductCard from '@/components/landing-page/product/Card.vue';

const localState = reactive({
    productData: []
});

const db = useFirestore();

onMounted(async () => {

    try {
        const email = sessionStorage.getItem('userEmail:');
        console.log('email', email);
        const q = query(collection(db, 'order'), where('email', '==', email));

        const querySnapShot = await getDocs(q);
        const productArray = [];
        querySnapShot.forEach((doc) => {
            console.log('Orders', doc.data());
            console.log(doc.id, ' => ', doc.data());
            productArray.push({ ...doc.data(), id: doc.id });
        });
        console.log('All products', productArray);
        localState.productData = [...productArray];
    } catch (e) {
        console.log('Erorr getting products document: ', e);
    }
});

</script>

<template>
    <div class="bg-surface-0 dark:bg-surface-900">
        <div id="home" class="landing-wrapper overflow-hidden">
            <Header />
            <ProductCategories />
            <section>
                <div id="features" class="py-6 px-6 lg:px-20 mt-8 mx-0 lg:mx-20">
                    <div class="grid grid-cols-12 gap-4 justify-center">
                        <div class="col-span-12 text-center mt-20 mb-6">
                            <div class="text-surface-900 dark:text-surface-0 font-normal mb-2 text-4xl">Top Picks for You</div>
                            <span class="text-muted-color text-2xl">Check out our latest and treding products curated just for you.</span>
                        </div>
                            <!-- {{ localState.productData }} -->
                        <!-- <ProductCard v-for="product in localState.productData" :title="product.name" :image="product.productUrl" :price="product.price" :description="product.description" :product="product" :key="product" /> -->
                    </div>
                </div>

                    <div class="border" v-for="product in localState.productData" :key="product">
                        <p>name: {{ product?.name }}</p>
                        <p class="bg-green-500 px-4 py-8">order completed : {{ product.courier ? 'product sent to you' : 'not Done yet' }}</p>
                        <div v-for="order in product?.orderproducts" :key="order">
                            <p>name : {{ order?.name }}</p>
                            <p>price : {{ order?.price }}</p>
                            <p>totalOrderQuantity : {{ order?.totalOrderQuantity }}</p>
                        </div>
                        <!-- {{ product }} -->

                    </div>

            </section>
        </div>
    </div>
</template>
