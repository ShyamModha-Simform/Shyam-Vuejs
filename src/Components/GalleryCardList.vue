<template>
    <main>
        <div class="container">
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

export default {
    name: 'GalleryCardList',
    components: {
        GalleryCard,
    },
    data() {
        return {
            store,
        }
    },
    methods: {
        displayPrice(carPrice) {
            Swal.fire("Unbeatable prices - indulge in your dream car today!", ` For only $${carPrice}/-`)
        },
        deleteCar(carId) {
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
                        'Deleted!',
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

