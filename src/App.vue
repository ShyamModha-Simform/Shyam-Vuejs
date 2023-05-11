<template>
    <ModalOverlay />
    <NavbarContainer />
    <RouterView />
</template>

<script>
import ModalOverlay from './Components/Modal.vue';

export default {
    name: 'App',
    components: {
        ModalOverlay,
    },
};
</script>
