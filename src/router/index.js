import AppLayout from '@/layout/AppLayout.vue';
import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/admin',
            component: AppLayout,
            children: [
                {
                    path: '/admin/dashboard',
                    name: 'dashboard',
                    component: () => import('@/views/Dashboard.vue')
                },

                //
                {
                    path: '/uikit/formlayout',
                    name: 'formlayout',
                    component: () => import('@/views/uikit/FormLayout.vue')
                },

                {
                    path: '/uikit/admin/products',
                    name: 'products',
                    component: () => import('@/views/uikit/admin/Products.vue')
                },

                {
                    path: '/uikit/admin/orders',
                    name: 'orders',
                    component: () => import('@/views/uikit/admin/Orders.vue')
                },

                {
                    path: '/uikit/admin/reviews',
                    name: 'reviews',
                    component: () => import('@/views/uikit/admin/Reviews.vue')
                }

                //ui kits
                //         {
                //             path: '/uikit/formlayout',
                //             name: 'formlayout',
                //             component: () => import('@/views/uikit/FormLayout.vue')
                //         },
                //         {
                //             path: '/uikit/input',
                //             name: 'input',
                //             component: () => import('@/views/uikit/InputDoc.vue')
                //         },
                //         {
                //             path: '/uikit/button',
                //             name: 'button',
                //             component: () => import('@/views/uikit/ButtonDoc.vue')
                //         },
                //         {
                //             path: '/uikit/table',
                //             name: 'table',
                //             component: () => import('@/views/uikit/TableDoc.vue')
                //         },
                //         {
                //             path: '/uikit/list',
                //             name: 'list',
                //             component: () => import('@/views/uikit/ListDoc.vue')
                //         },
                //         {
                //             path: '/uikit/tree',
                //             name: 'tree',
                //             component: () => import('@/views/uikit/TreeDoc.vue')
                //         },
                //         {
                //             path: '/uikit/panel',
                //             name: 'panel',
                //             component: () => import('@/views/uikit/PanelsDoc.vue')
                //         },

                //         {
                //             path: '/uikit/overlay',
                //             name: 'overlay',
                //             component: () => import('@/views/uikit/OverlayDoc.vue')
                //         },
                //         {
                //             path: '/uikit/media',
                //             name: 'media',
                //             component: () => import('@/views/uikit/MediaDoc.vue')
                //         },
                //         {
                //             path: '/uikit/message',
                //             name: 'message',
                //             component: () => import('@/views/uikit/MessagesDoc.vue')
                //         },
                //         {
                //             path: '/uikit/file',
                //             name: 'file',
                //             component: () => import('@/views/uikit/FileDoc.vue')
                //         },
                //         {
                //             path: '/uikit/menu',
                //             name: 'menu',
                //             component: () => import('@/views/uikit/MenuDoc.vue')
                //         },
                //         {
                //             path: '/uikit/charts',
                //             name: 'charts',
                //             component: () => import('@/views/uikit/ChartDoc.vue')
                //         },
                //         {
                //             path: '/uikit/misc',
                //             name: 'misc',
                //             component: () => import('@/views/uikit/MiscDoc.vue')
                //         },
                //         {
                //             path: '/uikit/timeline',
                //             name: 'timeline',
                //             component: () => import('@/views/uikit/TimelineDoc.vue')
                //         },
                //         {
                //             path: '/pages/empty',
                //             name: 'empty',
                //             component: () => import('@/views/pages/Empty.vue')
                //         },
                //         {
                //             path: '/pages/crud',
                //             name: 'crud',
                //             component: () => import('@/views/pages/Crud.vue')
                //         },
                //         {
                //             path: '/documentation',
                //             name: 'documentation',
                //             component: () => import('@/views/pages/Documentation.vue')
                //         }
            ]
        },
        {
            path: '/',
            name: 'landing',
            component: () => import('@/views/pages/Landing.vue')
        },
        {
            path: '/product/details',
            name: 'productDetails',
            component: () => import('@/views/pages/ProductDetails.vue')
        },
        {
            path: '/all-products',
            name: 'allproduct',
            component: () => import('@/views/pages/AllProduct.vue')
        },
        {
            path: '/all-orders',
            name: 'allorder',
            component: () => import('@/views/pages/AllOrder.vue')
        },
        {
            path: '/add-to-cart',
            name: 'addToCart',
            component: () => import('@/views/pages/AddToCart.vue')
        },
        {
            path: '/pages/notfound',
            name: 'notfound',
            component: () => import('@/views/pages/NotFound.vue')
        },
        // Auth.Login
        {
            path: '/auth/login',
            name: 'login',
            component: () => import('@/views/pages/auth/Login.vue')
        },
        {
            path: '/auth/registration',
            name: 'registration',
            component: () => import('@/views/pages/auth/Registration.vue')
        },
        // user L / R
        {
            path: '/user/registration',
            name: 'registration',
            component: () => import('@/views/pages/user/Registration.vue')
        },
        {
            path: '/user/login',
            name: 'userLogin',
            component: () => import('@/views/pages/user/Login.vue')
        },

        //adtocart
        // {
        //     path: '/auth/addToCart',
        //     name: 'addToCart',
        //     component: () => import('@/views/pages/auth/AddToCart.vue')
        // },
        {
            path: '/auth/access',
            name: 'accessDenied',
            component: () => import('@/views/pages/auth/Access.vue')
        },
        {
            path: '/auth/error',
            name: 'error',
            component: () => import('@/views/pages/auth/Error.vue')
        }
    ]
});

export default router;
