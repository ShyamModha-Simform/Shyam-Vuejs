<template>
    <div class="card-1 card-div">

        <div class="img-div">
            <img :src="carDetail.image" alt="god-of-war-figurine">
        </div>
        <div class="text-container">
            <h2 class="item-name">{{ carDetail.name }}</h2>
            <p class="date">{{ displayTrunkedDescription() }}</p>
            <div class="pricing-and-cart">
                <div class="pricing">
                    <button class="button" @click.prevent="showPrice" :disabled="carDetail.price === undefined">{{
                        carDetail.price === undefined ? 'Available Soon' : 'Show Price' }}</button>
                </div>
                <div>
                    <img src="../assests/edit_icon.png" class="edit-icon" alt="editIcon" @click="editCarDetails"
                        data-bs-toggle="modal" data-bs-target="#shyam" />
                    <img src="../assests/delete_icon.png" class="edit-icon pl-2" alt="editIcon" @click="deleteCarDetails" />
                </div>

            </div>
        </div>
    </div>
</template>

<script>
import { store } from '../Store/store';

export default {
    name: 'GalleryCard',
    props: ['carDetail'],
    methods: {
        showPrice() {
            this.$emit("show-price", this.carDetail.price);
        },
        editCarDetails() {
            // Setting value in global store which will automatically reactive at other components
            store.modalType = "edit";
            store.carToBeEdited = { ...this.carDetail }
            // we are passing object copy instead of reference
        },
        deleteCarDetails() {
            this.$emit("delete-car-details", this.carDetail.id)
        },
        displayTrunkedDescription() {
            return this.carDetail?.details?.slice(0, 200) + "...";
        }
    },

}

</script>


<style scoped>
.like-icon-div {
    padding: 1em 1em 0 1em;
    width: 100%;
    box-sizing: border-box;
    text-align: right;
    font-size: 1.5em;
    color: var(--heart-icon-color);
    border-radius: 10px 10px 0 0;
    display: flex;
    justify-content: flex-end;
}

.like-icon-div-child {
    /* background-color: yellow; */
    width: 1em;
    height: 1em;
    position: relative;
    z-index: 3;
    cursor: pointer;
}

.heart-empty {
    position: absolute;
    left: 0;
    opacity: 1;
}

.heart-fill {
    position: absolute;
    left: 0;
    opacity: 0;
    transform: scale(0);
    transition: transform 0.25s ease-in-out, opacity 0.2s ease-in-out;
}

.like-icon-div-child:hover .heart-fill {
    opacity: 1;
    transform: scale(1);
}

.like-icon-div-child:hover .heart-empty {
    transition-delay: 0.25s;
    opacity: 0;
}

#card-1-like:checked~.heart-empty {
    opacity: 0;
}

#card-1-like:checked~.heart-fill {
    animation: like-animation 0.25s ease-in-out forwards;
}

#card-1-like:not(:checked)~.heart-fill {
    animation: unlike-animation 0.25s ease-in-out;
}


.button {
    display: inline-block;
    outline: 0;
    border: 0;
    cursor: pointer;
    font-weight: 600;
    color: #fff;
    font-size: 14px;
    height: 38px;
    padding: 8px 24px;
    border-radius: 50px;
    background-color: rgb(96, 109, 117);
    box-shadow: 0 4px 11px 0 rgb(37 44 97 / 15%), 0 1px 3px 0 rgb(93 100 148 / 20%);
    transition: all .2s ease-out;
}

.button:disabled {
    background-color: rgb(174, 181, 185);
    cursor: not-allowed;
}

.edit-icon {
    width: 32px;
}
</style>
