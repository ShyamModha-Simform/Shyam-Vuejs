<template>
  <main>
    <div class="container">
      <GalleryCard :carDetail="car" v-for="car in carDetails" :key="car.carName" @show-price="displayPrice"
        @edit-car-details="editDetails" @delete-car-details="deleteCar" />
    </div>
  </main>
</template>

<script>
import GalleryCard from './GalleryCard.vue'
import carDetails from '../assests/car-details.json'
import Swal from 'sweetalert2'

export default {
  name: 'GalleryCardList',
  data() {
    return {
      carDetails,
    }
  },
  components: {
    GalleryCard,
  },
  methods: {
    displayPrice(carPrice) {
      Swal.fire("Unbeatable prices - indulge in your dream car today!", ` For only $${carPrice}/-`)
    },
    editDetails(carDetail) {
      this.$emit('open-edit-form', carDetail)
    },
    deleteCar() {
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
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

