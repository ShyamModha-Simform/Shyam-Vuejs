<template>
    <Loader v-if="getIsLoaderStarted" />
    <GalleryCardList v-else />
</template>

<script>
import { Loader } from '../Components';
import GalleryCardList from '../Components/GalleryCardList.vue';
import useCarDataStore from '../Store/carData';
import { mapActions, mapState } from 'pinia';

export default {
    name: 'HomeView',
    components: {
        Loader,
        GalleryCardList,
    },
    computed: {
        ...mapState(useCarDataStore, ['getIsLoaderStarted']),
    },
    methods: {
        ...mapActions(useCarDataStore, ['fetchAllCars']),
    },
    async created() {
        await this.fetchAllCars();
    },
};
</script>
