<template>
  <LoaderContainer v-if="isLoading" />
  <GalleryCardList v-else />
</template>

<script>
import LoaderContainer from '../Components/Loader.vue'
import GalleryCardList from '../Components/GalleryCardList.vue'
import { store } from '../Store/store'
import { getCarDetails } from '../api/api'

export default {
  name: 'HomeView',
  components: {
    LoaderContainer,
    GalleryCardList
  },
  data() {
    return {
      isLoading: true
    }
  },
  created() {
    this.isLoading = true
    setTimeout(async () => {
      store.carDetails = [...(await getCarDetails())]
      this.isLoading = false
    }, 2000)
  }
}
</script>