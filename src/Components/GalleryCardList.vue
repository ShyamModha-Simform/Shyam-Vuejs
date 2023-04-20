<script>
import GalleryCard from './GalleryCard.vue'
import carDetails from '../assests/car-details.json'

export default {
  name: 'GalleryCardList',
  data() {
    return {
      carDetails
    }
  },
  components: {
    GalleryCard
  }
}
</script>

<template>
  <div class="container">
      <GalleryCard :carDetail="car" v-for="car in carDetails" :key="car.carName"/>
  </div>
</template>
