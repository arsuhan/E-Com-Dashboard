<script setup>
import { useRouter } from 'vue-router';
import { useState } from '../../composables/store.js';
const { state } = useState();

const router = useRouter();

const addToCart = (product) => {
  if (state.atToCart.length !== 0) {
    const findProductsFromAtToCart = state.atToCart.find((pd) => pd.id === product.id);
    if (!findProductsFromAtToCart) {
      state.atToCart = [...state.atToCart, product];
    }
  } else {
    state.atToCart = [...state.atToCart, product];
  }
  router.push('/add-to-cart');
};
</script>

<template>
  <div
    id="hero"
    class="pt-6 px-4 md:px-8 lg:px-20 min-h-screen flex flex-col-reverse lg:flex-row items-center justify-between gap-10 lg:gap-6"
    style="background: linear-gradient(0deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.2)), radial-gradient(77.36% 256.97% at 77.36% 57.52%, rgb(238, 239, 175) 0%, rgb(195, 227, 250) 100%); clip-path: ellipse(150% 87% at 93% 13%)"
  >
    <!-- Left Section: Text + Description + Price + Buttons -->
    <div
      class="w-full lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left px-4 md:px-10 order-2 lg:order-none"
    >
      <h1
        class="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 leading-snug hover:scale-105 transition duration-300"
      >
        <span class="font-light block">Welcome to e-shop - Quality Products at Your Fingertips!</span>
      </h1>

      <p class="text-base sm:text-lg md:text-xl mt-4 text-gray-700">{{ state.buyNowProduct?.name }}</p>
      <p class="text-base sm:text-lg md:text-xl mt-1 text-gray-700">{{ state.buyNowProduct?.description }}</p>

      <p class="text-base sm:text-lg md:text-xl mt-1 text-gray-700 font-semibold">{{ state.buyNowProduct?.price }} BDT</p>

      <!-- Buttons -->
      <div
        class="w-full flex flex-col lg:flex-row flex-wrap justify-center lg:justify-start gap-4 mt-6"
      >
        <Button
          label="All Products"
          as="router-link"
          to="/all-products"
          rounded
          class="!text-sm sm:!text-base md:!text-lg lg:!text-xl !px-4"
        />
        <Button
          label="Buy"
          severity="help"
          class="!text-sm sm:!text-base md:!text-lg lg:!text-xl !px-4"
          @click="addToCart(state.buyNowProduct)"
        />
      </div>
    </div>

    <!-- Image Section -->
<div
  class="w-full lg:w-1/2 flex items-center justify-center order-1 lg:order-none mt-0 sm:mt-2 md:mt-4 lg:mt-0"
>
  <img
    :src="state.buyNowProduct?.productUrl ? state.buyNowProduct?.productUrl : 'https://www.pngall.com/wp-content/uploads/4/Headphone-Transparent-PNG.png'"
    alt="Hero Image"
    class="w-8/12 sm:w-6/12 md:w-5/12 lg:w-6/12 h-auto object-contain"
  />
</div>s

  </div>
</template>