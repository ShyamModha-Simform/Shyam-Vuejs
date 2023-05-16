<template>
    <Loader v-if="isLoading" />
    <GalleryCardList v-else />
</template>

<script>
import { Loader } from '../Components';
import GalleryCardList from '../Components/GalleryCardList.vue';
import { store } from '../Store/store';
import { getCarDetails } from '../api/api';

export default {
    name: 'HomeView',
    components: {
        Loader,
        GalleryCardList,
    },
    data() {
        return {
            isLoading: true,
        };
    },
    created() {
        this.isLoading = true;
        setTimeout(async () => {
            store.carDetails = [...(await getCarDetails())];
            this.isLoading = false;
        }, 1000);
    },
};
</script>
