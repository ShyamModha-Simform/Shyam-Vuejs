<template>
    <Teleport to="#modal_overlay"><InputForm /></Teleport>
    <RectangularLoader v-if="getIsLoaderStarted" />
    <GalleryCardList v-else />
</template>

<script setup>
import InputForm from '../components/InputForm.vue';
import RectangularLoader from '../components/RectangularLoader.vue';
import GalleryCardList from '../components/GalleryCardList.vue';
import useCarDataStore from '../store/carData';
import { storeToRefs } from 'pinia';
const carDataStore = useCarDataStore();
const { getIsLoaderStarted } = storeToRefs(carDataStore);
const { fetchAllCars } = carDataStore;

fetchAllCars();
</script>
