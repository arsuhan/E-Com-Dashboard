<script setup>
// import { onMounted } from 'vue';
// import { useRouter } from 'vue-router';
// const router = useRouter();
// import { getDocs, query, where } from 'firebase/firestore';
// import { useFirestore } from 'vuefire';
// const db = useFirestore();
// import { collection } from 'firebase/firestore';

// onMounted(async () => {
//     console.log('router', router.path)
//     const email = sessionStorage.getItem('email');
//     const password = sessionStorage.getItem('password');
//     console.log('email and password', email, password);

//     const q = query(collection(db, 'users'), where('email', '==', email.value), where('password', '==', password.value));

//     let flag = false;
//     const querySnapshot = await getDocs(q);
//     if (querySnapshot) {
//         querySnapshot.forEach((doc) => {
//             console.log(doc.id, ' => ', doc.data());
//             flag = true;
//         });
//     }
//     console.log('router', router)
//     if (!flag) {
//         router.push('/auth/login');
//     }
// });
</script>

<template>
    <router-view />
</template>

<style scoped></style>
