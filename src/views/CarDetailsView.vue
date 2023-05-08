<template>
  <div class="car-detail--container d-flex">
    <div class="container--left w-50">
      <h1>{{ carDetail.name }}</h1>
      <h4>Price: {{ carDetail.price }}</h4>
      <p>{{ carDetail.details }}</p>
    </div>
    <div class="container--right w-50">
      <img :src="carDetail.image" alt="Car Image" />
    </div>
  </div>
</template>

<script>
import { getCarDetailsById } from '../api/api'
export default {
  name: 'CarDetailsView',
  data() {
    return {
      carDetail: {}
    }
  },
  async mounted() {
    const res = await getCarDetailsById(this.$route.params.id)
    if (res.status !== 200) {
      alert("Couldn't able to fetch detail")
      return
    }
    this.carDetail = { ...res.data }
  }
}
</script>p

<style scoped>
h1,
h4,
p {
  color: #606d75;
}
h1{
    margin-block: 10px; 
}
p, h4{
    margin-block: 20px;
}
img{
    width: 100%;
}
.car-detail--container {
    display: flex;
    width: min(100%, 70rem);
    margin-inline: auto;
    background-color: whitesmoke;
    margin-top: 10%;
    padding: 1.5em 1.5em 1.5em 1.5em;
  box-sizing: border-box;
  border-radius: 10px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  transition: transform 0.2s ease-in-out;
}
</style>