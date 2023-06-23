<template>
    <RectangularLoader v-if="getIsLoaderStarted" />
    <div class="page-wrapper px-2 py-2" v-else>
        <div class="back-button">
            <RouterLink :to="{ name: 'home' }">
                <BaseButton class="card" size="lg">back</BaseButton>
            </RouterLink>
        </div>

        <div class="detail-container">
            <div class="detail-left">
                <div class="detail-left__image__container">
                    <img :src="carDetail?.image" class="car__image" alt="..." />
                </div>
            </div>
            <div class="detail-right">
                <h1 class="card-title">{{ carDetail?.name }}</h1>
                <h4 class="card-text">Price:-{{ carDetail?.price }}</h4>
                <p class="description">{{ carDetail?.details }}</p>
            </div>
        </div>
    </div>
</template>

<script setup>
import { storeToRefs } from 'pinia';
import { useRoute } from 'vue-router';
import BaseButton from '../components/BaseButton.vue';
import RectangularLoader from '../components/RectangularLoader.vue';
import useCarDataStore from '../store/carData';

const carDataStore = useCarDataStore();
const route = useRoute();
const { getIsLoaderStarted, getDetailsOfSelectedCar: carDetail } = storeToRefs(carDataStore);
const { fetchCarDetailsById } = carDataStore;

fetchCarDetailsById(route.params.id);
</script>

<style scoped>
.page-wrapper {
    margin-block: max(10px, 5%);
    margin-inline: auto;
    width: max(350px, 70%);
    min-width: fit-content;
    max-width: 900px;
    display: flex;
    flex-direction: column;
    background: #d7dcdf;
}

.detail-container {
    width: 100%;
    height: 30rem;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #606d75;
}

.detail-left__image__container {
    display: flex;
    width: 400px;
    height: 400px;
    position: relative;
    justify-content: center;
    align-items: center;
}

.car__image {
    width: 90%;
    height: 90%;
    object-fit: cover;
    z-index: 1;
}

.detail-left__image__container::before {
    content: '';
    width: 35%;
    height: 55%;
    background: #606d75;
    position: absolute;
    top: 0;
    left: 0;
}
.detail-left__image__container::after {
    content: '';
    width: 35%;
    height: 55%;
    background: #606d75;
    position: absolute;
    right: 0;
    bottom: 0;
}
.detail-right {
    width: 25rem;
    height: 70%;
    margin-inline: 1rem;
}

.detail-right .description {
    word-wrap: break-word;
}

.back-button {
    width: 100%;
}
@media screen and (max-width: 900px) {
    .detail-container {
        flex-direction: column;
        height: fit-content;
    }

    .detail-right {
        margin-block: 1rem;
    }
}

@media screen and (max-width: 450px) {
    .detail-left__image__container {
        width: 300px;
        height: 300px;
    }
    .detail-right {
        width: 280px;
    }
}
</style>
