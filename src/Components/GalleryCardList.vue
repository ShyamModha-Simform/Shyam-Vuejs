<template>
  <div class="container">
      <GalleryCard :carDetail="car" v-for="car in carDetails" :key="car.carName" @showPrice="displayPrice"/>
  </div>
</template>

<script>
import GalleryCard from './GalleryCard.vue'
import carDetails from '../assests/car-details.json'
import swal from 'sweetalert'

export default {
  name: 'GalleryCardList',
  data() {
    return {
      carDetails
    }
  },
  components: {
    GalleryCard
  },
  methods: {
    displayPrice(carPrice){
      swal("Unbeatable prices - indulge in your dream car today!",` For only $${carPrice}/-`);
    }
  },
}
</script>

