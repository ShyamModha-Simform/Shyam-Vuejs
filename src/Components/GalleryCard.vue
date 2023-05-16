<template>
    <div class="card-1 card-div">
        <div class="img-div">
            <img :src="carDetail.image" alt="god-of-war-figurine" />
        </div>
        <div class="card-body-container">
            <h2 class="item-name">{{ carDetail.name }}</h2>
            <p class="date">{{ displayTrunkedDescription }}</p>
            <div class="pricing-and-cart">
                <div class="pricing">
                    <RouterLink :to="{ name: 'carDetailsById', params: { id: `${carDetail.id}` } }">
                        <BaseButton class="card"> Info </BaseButton>
                    </RouterLink>
                </div>
                <div>
                    <img
                        src="../assests/edit_icon.png"
                        class="edit-icon"
                        alt="editIcon"
                        @click="editCarDetails"
                        data-bs-toggle="modal"
                        data-bs-target="#shyam"
                    />
                    <img
                        src="../assests/delete_icon.png"
                        class="edit-icon pl-2"
                        alt="editIcon"
                        @click="deleteCarDetails"
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { store } from '../Store/store';
import BaseButton from './BaseButton.vue';

export default {
    name: 'GalleryCard',
    props: ['carDetail'],
    components: {
        BaseButton,
    },
    methods: {
        editCarDetails() {
            // Setting value in global store which will automatically reactive at other components
            store.modalType = 'edit';
            store.carToBeEdited = { ...this.carDetail };
            // we are passing object copy instead of reference
        },
        deleteCarDetails() {
            this.$emit('delete-car-details', this.carDetail.id, this.carDetail);
        },
    },
    computed: {
        displayTrunkedDescription() {
            return this.carDetail?.details?.slice(0, 200) + '...';
        },
    },
};
</script>

<style scoped>
/* Card Styling */
.card-div {
    width: 20em;
    min-height: 20em;
    display: flex;
    flex-direction: column;
    justify-items: center;
    align-items: center;
    background-color: var(--card-main-color);
    margin: 0.6em;
    box-sizing: border-box;
    border-radius: 10px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
    transition: transform 0.2s ease-in-out;
}

.img-div {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
    background-color: var(--card-1-secondary-color);
}

.img-div img {
    width: 20rem;
    height: 11rem;
    object-fit: cover;
}

.card-body-container {
    width: 100%;
    display: flex;
    flex-direction: column;
    padding: 0 1.5em;
    padding-top: 1em;
    padding-bottom: 1em;
    box-sizing: border-box;
}

.card-body-container .item-name {
    margin: 0.2em 0;
    text-align: center;
}

.card-body-container .item-name {
    font-size: 1.2em;
    font-weight: var(--title-font-weight);
    color: var(--heading-color);
}

.card-body-container .date {
    text-align: left;
    font-size: 0.9em;
    font-weight: var(--date-font-weight);
    color: var(--date-text-color);
}
.date {
    min-height: 86px;
}

.pricing-and-cart {
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin: 0.25em 0 0 0;
}

.pricing {
    display: flex;
    flex-direction: column;
    text-align: left;
}

.previous-price {
    font-size: 0.8rem;
    font-weight: var(--pricing-font-weight);
    color: var(--previous-price-text-color);
    text-decoration: line-through;
    text-align: left;
}

.current-price {
    color: var(--current-price-text-color);
    font-size: 1.3rem;
    font-weight: var(--pricing-font-weight);
    margin: 0;
}

.pricing-and-cart {
    width: 100%;
}

.edit-icon {
    width: 32px;
}
</style>
