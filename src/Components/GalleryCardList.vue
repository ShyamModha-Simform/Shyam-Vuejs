<template>
    <main>
        <BaseButton class="card" size="lg" @click="openAddCarForm">
            Add
        </BaseButton>
        <div class="card-container">
            <GalleryCard :carDetail="car" v-for="car in store.carDetails" :key="car.name" @show-price="displayPrice"
                @delete-car-details="deleteCar" />
        </div>
    </main>
</template>

<script>
import GalleryCard from './GalleryCard.vue'

import Swal from 'sweetalert2'
import { deleteCarDetails, getCarDetails, } from '../api/api';
import { store } from '../Store/store';
import BaseButton from './BaseButton.vue';

export default {
    name: 'GalleryCardList',
    components: {
    GalleryCard,
    BaseButton
},
    data() {
        return {
            store,
        }
    },
    methods: {
        openAddCarForm() {
      store.modalType = 'add'
    },
        displayPrice(carPrice) {
            Swal.fire("Unbeatable prices - indulge in your dream car today!", ` For only $${carPrice}/-`)
        },
        deleteCar(carId, carToBeDeleted) {
            Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
            }).then(async (result) => {
                if (result.isConfirmed) {
                    let res = await deleteCarDetails(carId);
                    if (res.status !== 204) {
                        console.log(res.status, res.statusText)
                        alert("Couldn't able to delete car..")
                        return;
                    }
                    Swal.fire(
                        `Deleted ${carToBeDeleted.name}!`,
                        'Your file has been deleted.',
                        'success'
                    )
                    //rendered carList when car deleted
                    store.carDetails = await getCarDetails();

                }
            })
        }

    },
}
</script>