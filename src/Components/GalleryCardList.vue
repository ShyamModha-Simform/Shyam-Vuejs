<template>
    <main>
        <div class="card-container--layer">
            <div class="add-car-container">
                <BaseButton
                    class="card"
                    size="lg"
                    @click="openAddCarForm"
                    data-bs-toggle="modal"
                    data-bs-target="#shyam"
                >
                    Add
                </BaseButton>
            </div>
            <transition-group class="card-container" name="fade" tag="div">
                <GalleryCard
                    :carDetail="car"
                    v-for="car in store.carDetails"
                    :key="car.name"
                    @delete-car-details="deleteCar"
                />
            </transition-group>
        </div>
    </main>
</template>

<script>
import GalleryCard from './GalleryCard.vue';

import Swal from 'sweetalert2';
import { deleteCarDetails, getCarDetails } from '../api/api';
import { store } from '../Store/store';
import BaseButton from './BaseButton.vue';

export default {
    name: 'GalleryCardList',
    components: {
        GalleryCard,
        BaseButton,
    },
    data() {
        return {
            store,
        };
    },
    methods: {
        openAddCarForm() {
            store.modalType = 'add';
        },
        deleteCar(carId, carToBeDeleted) {
            Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!',
            }).then(async (result) => {
                if (result.isConfirmed) {
                    let res = await deleteCarDetails(carId);
                    if (res.status !== 204) {
                        console.log(res.status, res.statusText);
                        alert("Couldn't able to delete car..");
                        return;
                    }
                    Swal.fire(
                        `Deleted ${carToBeDeleted.name}!`,
                        'Your file has been deleted.',
                        'success'
                    );
                    //rendered carList when car deleted
                    store.carDetails = await getCarDetails();
                }
            });
        },
    },
};
</script>

<style scoped>
.card-container--layer {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 3em 1em 1em 1em;
}

.add-car-container {
    display: flex;
    width: 100%;
    flex-direction: row-reverse;
    padding-inline: 15%;
}

.fade-enter-active,
.fade-leave-active {
    opacity: 0.5;
    transition: all 0.5s;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
    transform: translateY(5rem);
    /* Adjust the distance as needed */
}

.fade-enter-to,
.fade-leave-from {
    opacity: 1;
    transform: translateY(0);
}
</style>
