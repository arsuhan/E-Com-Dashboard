<script setup>
import { reactive } from 'vue';
import Category from './category.vue';
const state = reactive({
    categories: [
        { id: 1, name: 'Women' },
        { id: 2, name: 'Men' },
        { id: 3, name: 'Baby' },
        { id: 4, name: 'Electronics' }
    ]
});
</script>
<template>
    <section class="container mx-auto px-6">
        <section class="sm:pb-10 border-b pb-4 lg:mt-28 mt-8 md:mt-14">
            <span v-for="category in state.categories" :key="`${category}-key`">
                <Category :name="category.name" />
            </span>
        </section>
    </section>
</template>
