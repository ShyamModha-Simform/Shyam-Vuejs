<template>
  
  <div class="car-card-container">
    <div>
    <RouterLink :to="{name:'home'}">
      <BaseButton class="card" size="lg">back</BaseButton>
    </RouterLink>
  </div>
  <div class="car-detail--container">

  
    <div class="container--left w-50">
      <h1>{{ carDetail.name }}</h1>
      <h4>Price: {{ carDetail.price }}</h4>
      <p>{{ carDetail.details }}</p>
    </div>
    <div class="container--right w-50">
      <img :src="carDetail.image" alt="Car Image" />
    </div>
  </div>
  </div>
</template>

<script>
import { getCarDetailsById } from '../api/api'
import BaseButton from '../Components/BaseButton.vue'
export default {
  name: 'CarDetailsView',
  components: {
    BaseButton,
  },
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
.car-card-container{
  display: flex;
  flex-direction: column;
    width: min(100%, 70rem);
    margin-inline: auto;
    margin-top: 10%;
}

.car-card-container > button {
  margin-right: 10px;
}
.car-detail--container {
  display: flex;
  background-color: whitesmoke;
  padding: 1.5em 1.5em 1.5em 1.5em;
  box-sizing: border-box;
  border-radius: 10px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  transition: transform 0.2s ease-in-out;
}
</style>