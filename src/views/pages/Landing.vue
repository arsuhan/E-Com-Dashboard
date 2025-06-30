<script setup>
import Header from '@/components/shared/Header.vue';
import Section from '@/components/landing-page/Section.vue';
import ProductCategories from '../../components/product-categories/Section.vue';
import Products from '@/components/landing-page/product/Section.vue';
// import ProductCategories from '../../components/landing-page/product-categories/Category.vue';
//import ProductCetagorys from '@/components/landing-page/Product-Cetagorys/Cetagory.vue';
</script>

<template>
    <div class="bg-surface-0 dark:bg-surface-900">
        <div id="home" class="landing-wrapper overflow-hidden">
            <Header />
            <Section />
            <div class="py-6 px-6 mx-0 md:mx-12 lg:mx-20 lg:px-20 lg:static">
                <ProductCategories />
                <Products />
            </div>
        </div>
    </div>
</template>
