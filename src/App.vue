<template>
    <ModalOverlay />
    <NavbarContainer />

    <RouterView v-slot="{ Component }">
        <Transition name="fade-pages" mode="out-in"> <component :is="Component" /></Transition>
    </RouterView>
</template>

<script>
import ModalOverlay from './components/Modal.vue';

export default {
    name: 'App',
    components: {
        ModalOverlay,
    },
};
</script>

<style scoped>
.fade-pages-enter-active,
.fade-pages-leave-active {
    transition: all 0.4s;
}

.fade-pages-enter-from,
.fade-pages-leave-to {
    opacity: 0;
    transform: translateY(4rem);
    /* Adjust the distance as needed */
}
</style>
