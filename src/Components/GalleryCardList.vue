<template>
  <main>
    <div class="container">
      <GalleryCard :carDetail="car" v-for="car in carList" :key="car.name" @show-price="displayPrice"
        @edit-car-details="editDetails" @delete-car-details="deleteCar" />
    </div>
  </main>
</template>

<script>
import GalleryCard from './GalleryCard.vue'
// import carDetails from '../assests/car-details.json'
import Swal from 'sweetalert2'
import { deleteCarDetails, updataCarDetails } from '../api/api';

export default {
  name: 'GalleryCardList',
  props: ['carList'],
  data() {
    return {
      carDetails: [],
    }
  },
  components: {
    GalleryCard,
  },
  watch: {
    carList: {
      handler(newValue) {
        this.carDetails = [...newValue];
      }
    }
  },
  methods: {
    displayPrice(carPrice) {
      Swal.fire("Unbeatable prices - indulge in your dream car today!", ` For only $${carPrice}/-`)
    },
    editDetails(carDetail) {
      this.$emit('open-edit-form', carDetail)
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
          Swal.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          )
        }
      })
    }

  },
}
</script>

