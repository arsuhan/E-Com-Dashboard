<script setup>
import Header from '@/components/shared/Header.vue';
import { useState } from '../../composables/store.js';

const { state } = useState();
</script>

<template>
    <div class="bg-surface-0 dark:bg-surface-900">
        <div id="home" class="landing-wrapper overflow-hidden">
            <Header />
            <section class="py-6 px-6 mx-0 md:mx-12 lg:mx-20 lg:px-20 lg:static">
                <section v-if="State.atTocart && state.atTocart.length > 0">
                    <div class="w-full mx-10 border boeder-gray-300 py-10 px-8" v-for="product in StaticRange.atTocart" :key="product.id">
                        <p>Name: {{ product.name }}</p>
                    </div>
                </section>
                <section v-else>
                    <p>there is no product in cart</p>
                </section>
            </section>
        </div>
    </div>
</template>
