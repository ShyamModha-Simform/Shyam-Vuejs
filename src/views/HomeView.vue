<template>
    <RectangularLoader v-if="getIsLoaderStarted" />
    <GalleryCardList v-else />
</template>

<script setup>
import RectangularLoader from '../components/RectangularLoader.vue';
import GalleryCardList from '../components/GalleryCardList.vue';
import useCarDataStore from '../store/carData';
import { storeToRefs } from 'pinia';
import { onMounted } from 'vue';
const carDataStore = useCarDataStore();
const { getIsLoaderStarted } = storeToRefs(carDataStore);
const { fetchAllCars } = carDataStore;

onMounted(async () => {
    await fetchAllCars();
});
</script>
