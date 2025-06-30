<script setup>
import Header from '@/components/shared/Header.vue';
import ProductCategories from '../../components/product-categories/Section.vue';

import { collection, getDocs } from 'firebase/firestore';
import { onMounted, reactive } from 'vue';
import { useFirestore } from 'vuefire';
//import ProductCard from './Card.vue';
import ProductCard from '@/components/landing-page/product/Card.vue';

const localState = reactive({
    productData: []
});

const db = useFirestore();

onMounted(async () => {
    try {
        const productArray = [];
        const querySnapShot = await getDocs(collection(db, 'products'));
        querySnapShot.forEach((doc) => {
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
                <div id="features" class="py-6 px-6 lg:px-20 mt-2 mx-0 lg:mx-20">
                    <div class="grid grid-cols-12 lg:gap-4 md:gap-4 xs:gap-2 justify-center">
                        <div class="col-span-12 text-center lg:mt-20 md:mt-6 mb-6">
                            <div class="text-surface-900 dark:text-surface-0 font-normal mb-2 lg:text-4xl text-3xl">Top Picks for You</div>
                            <span class="text-muted-color lg:text-2xl text-xl">Check out our latest and treding products curated just for you.</span>
                        </div>
                        <ProductCard v-for="product in localState.productData" :title="product.name" :image="product.productUrl" :price="product.price" :description="product.description" :product="product" :key="product" />
                    </div>
                </div>
            </section>
        </div>
    </div>
</template>
