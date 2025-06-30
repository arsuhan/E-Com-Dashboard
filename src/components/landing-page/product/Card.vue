<script setup>
//import { useState } from '../../composables/store.js';
import { useState } from '@/composables/store.js';
import router from '@/router';
const props = defineProps(['title', 'price', 'description', 'image', 'product']);
const { state } = useState();

const addToCard = (product) => {
    if (state.atToCart.length !== 0){
        console.log('local product', product);
        console.log('state.atToCart', state.atToCart);

        const findProductsFromAtToCart = state.atToCart.find((pd) => pd.id === product.id);
        if (findProductsFromAtToCart === undefined){
            state.atToCart = [...state.atToCart, product];
        }
    } else { state.atToCart = [...state.atToCart, product];
        console.log('zero', state.atToCart);
    }

    // state.atToCart = [...state.atToCart, product];
    // console.log('cart added to cart', state.atToCart);

    // comment code for the refrance for the future

    // const sessionProduct = JSON.parse(sessionStorage.getItem('cartProduct'));

    // const productArray = sessionProduct ? [...sessionProduct] : [];

    // if (sessionProduct && sessionProduct.length > 0) {
    //     productArray.push(product);
    //     state.atCartProducts++;
    //     sessionStorage.setItem('cartProduct', JSON.stringify([productArray]));
    // } else {
    //     sessionStorage.setItem('cartProduct', JSON.stringify([product]));
    //     state.atCartProducts++;

    // }
};

// const descres = () =>{
//     store.atCartProducts--;
// }

const buyNow = (product) => {
    state.buyNowProduct = product;
    console.log('State3: ', state);

    router.push('/product/details?productId=${product.id}');
};
</script>

<template>
    <!-- <div class="col-span-18 sm:col-span-1 md:col-span-2 lg:col-span-3 lg:pb-1 mt-6 lg:mt-0 group"> -->
    <div class="col-span-12 sm:col-span-6 md:col-span-6 lg:col-span-4 lg:pb-8 mt- lg:mt-0 group">
        <div class="" style="height: 335px; padding: 2px; border-radius: 8px; background: linear-gradient(90deg, rgba(253, 228, 165, 0.2), rgba(187, 199, 205, 0.2)), linear-gradient(180deg, rgba(253, 228, 165, 0.2), rgba(187, 199, 205, 0.2))">
            <div class="p-3 bg-surface-0 dark:bg-surface-900 h-full w-full overflow-hidden" style="border-radius: 8px">
                <div class="flex items-center justify-center lg:h-[200px] md:h-[180px] xs:h-[180px] overflow-hidden">
                    <img :src="image ? image : ''" class="w-full object-cover h-full transition ease-in duration-300 hover:scale-125" />
                </div>
                <h5 class="mb-2 text-surface-700 dark:text-surface-0 text-[20px] md:text-[30px] lg:text-[22px] font-bold xs:mt-6 lg:mt-0 md:mt-3">{{ title ? title : '' }}</h5>
                <span class="text-surface-600 dark:text-surface-200">{{ description ? description : '' }}</span>
                <section class="flex justify-between lg:mb-10 pb-10">
                    <h5 class="mb-2 text-surface-900 dark:text-surface-0 text-[15px] md:text-[20px]">{{ price ? price : '' }}</h5>
                    <section class="flex">
                        <div class="transition mx-1 translate-x-72 ease-linear duration-300 group-hover:-translate-x-0">
                            <Button icon="pi pi-heart" class="text-xs sm:text-xs md:text-base color-orange" label="Cart" severity="help" @click="addToCard(props.product)" rounded aria-label="Favorite" />
                        </div>
                        <div class="transition mx-2 translate-x-72 ease-linear duration-300 group-hover:-translate-x-1">
                            <Button class="text-xs sm:text-xs md:text-base" icon="pi pi-check" label="Buy" severity="info" rounded aria-label="Favorite" @click="buyNow(props.product)" />
                        </div>
                    </section>
                </section>
            </div>
        </div>
    </div>
</template>
