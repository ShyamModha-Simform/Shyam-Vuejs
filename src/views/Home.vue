<template>
    <Loader v-if="isLoading" />
    <GalleryCardList v-else />
</template>

<script>
import { Loader } from '../Components';
import GalleryCardList from '../Components/GalleryCardList.vue';
import useCarDataStore from '../Store/carData';
import { mapActions } from 'pinia';

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
    methods: {
        ...mapActions(useCarDataStore, ['fetchAllCars']),
    },
    created() {
        this.isLoading = true;
        setTimeout(async () => {
            await this.fetchAllCars();
            this.isLoading = false;
        }, 1000);
    },
};
</script>
