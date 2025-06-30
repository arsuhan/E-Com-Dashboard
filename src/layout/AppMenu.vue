<script setup>
import { ref } from 'vue';

import AppMenuItem from './AppMenuItem.vue';

const model = ref([
    {
        label: 'Home',
        items: [{ label: 'Dashboard', icon: 'pi pi-fw pi-home', to: '/' }]
    },
    {
        label: 'Products',
        items: [
            { label: 'product', icon: 'pi pi-fw pi-id-card', to: '/uikit/admin/Products' },
            // { label: 'Button', icon: 'pi pi-fw pi-mobile', to: '/uikit/button', class: 'rotated-icon' },
            // { label: 'Order', icon: 'pi pi-fw pi-list', to: '/uikit/list' }
            //    { label: 'Form Layout', icon: 'pi pi-fw pi-id-card', to: '/uikit/formlayout' },
            //    { label: 'Input', icon: 'pi pi-fw pi-check-square', to: '/uikit/input' },
            //    { label: 'Table', icon: 'pi pi-fw pi-table', to: '/uikit/table' },
            //    { label: 'Tree', icon: 'pi pi-fw pi-share-alt', to: '/uikit/tree' },
            //    { label: 'Overlay', icon: 'pi pi-fw pi-clone', to: '/uikit/overlay' },
            //    { label: 'Media', icon: 'pi pi-fw pi-image', to: '/uikit/media' },
            //    { label: 'Menu', icon: 'pi pi-fw pi-bars', to: '/uikit/menu' },
            //    { label: 'Message', icon: 'pi pi-fw pi-comment', to: '/uikit/message' },
            //    { label: 'File', icon: 'pi pi-fw pi-file', to: '/uikit/file' },
            //    { label: 'Chart', icon: 'pi pi-fw pi-chart-bar', to: '/uikit/charts' },
            //    { label: 'Timeline', icon: 'pi pi-fw pi-calendar', to: '/uikit/timeline' },
            //    { label: 'Misc', icon: 'pi pi-fw pi-circle', to: '/uikit/misc' }
        ]
    },
    {
        lebel: 'orders',
        items: [{ label: 'orders', icon: 'pi pi-fw pi-id-card', to: '/uikit/admin/Orders' }]
    },
    {
        lebel: 'review',
        items: [{ label: 'review', icon: 'pi pi-fw pi-id-card', to: '/uikit/admin/Reviews' }]
    }
]);
</script>

<template>
    <ul class="layout-menu">
        <template v-for="(item, i) in model" :key="item">
            <app-menu-item v-if="!item.separator" :item="item" :index="i"></app-menu-item>
            <li v-if="item.separator" class="menu-separator"></li>
        </template>
    </ul>
    <!--{
        label: 'Pages',
                 to: '/landing'
            },
            {
                label: 'Auth',
                icon: 'pi pi-fw pi-user',
                items: [
                    {
                        label: 'Login',
                        icon: 'pi pi-fw pi-sign-in',
                        to: '/auth/login'
                    },
                    {
                        label: 'Error',
                        icon: 'pi pi-fw pi-times-circle',
                        to: '/auth/error'
                    },
                    {
                        label: 'Access Denied',
                        icon: 'pi pi-fw pi-lock',
                        to: '/auth/access'
                    }
                ]
            },
            {
                label: 'Crud',
                icon: 'pi pi-fw pi-pencil',
                to: '/pages/crud'
            },
            {
                label: 'Not Found',
                icon: 'pi pi-fw pi-exclamation-circle',
                to: '/pages/notfound'
            },
            {
                label: 'Empty',
                icon: 'pi pi-fw pi-circle-off',
                to: '/pages/empty'
            }
        ]
    },
    {
        label: 'Hierarchy',
        items: [
            {
                label: 'Submenu 1',
                icon: 'pi pi-fw pi-bookmark',
                items: [
                    {
                        label: 'Submenu 1.1',
                        icon: 'pi pi-fw pi-bookmark',
                        items: [
                            { label: 'Submenu 1.1.1', icon: 'pi pi-fw pi-bookmark' },
                            { label: 'Submenu 1.1.2', icon: 'pi pi-fw pi-bookmark' },
                            { label: 'Submenu 1.1.3', icon: 'pi pi-fw pi-bookmark' }
                        ]
                    },
                    {
                        label: 'Submenu 1.2',
                        icon: 'pi pi-fw pi-bookmark',
                        items: [{ label: 'Submenu 1.2.1', icon: 'pi pi-fw pi-bookmark' }]
                    }
                ]
            },
            {
                label: 'Submenu 2',
                icon: 'pi pi-fw pi-bookmark',
                items: [
                    {
                        label: 'Submenu 2.1',
                        icon: 'pi pi-fw pi-bookmark',
                        items: [
                            { label: 'Submenu 2.1.1', icon: 'pi pi-fw pi-bookmark' },
                            { label: 'Submenu 2.1.2', icon: 'pi pi-fw pi-bookmark' }
                        ]
                    },
                    {
                        label: 'Submenu 2.2',
                        icon: 'pi pi-fw pi-bookmark',
                        items: [{ label: 'Submenu 2.2.1', icon: 'pi pi-fw pi-bookmark' }]
                    }
                ]
            }
        ]
    },
    {
        label: 'Get Started',
        items: [
            {
                label: 'Documentation',
                icon: 'pi pi-fw pi-book',
                to: '/documentation'
            },
            {
                label: 'View Source',
                icon: 'pi pi-fw pi-github',
                url: 'https://github.com/primefaces/sakai-vue',
                target: '_blank'
            }
        ]
    }-->
</template>

<style lang="scss" scoped></style>
