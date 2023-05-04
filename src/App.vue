<template>
  <ModalOverlay />
  <NavbarContainer />
  <LoaderContainer v-if="isLoading" />
  <GalleryCardList v-else />
</template>

<script>
import GalleryCardList from './Components/GalleryCardList.vue';
import ModalOverlay from "./Components/Modal.vue";
import { getCarDetails } from './api/api'
import LoaderContainer from "./Components/Loader.vue"
import { store } from './Store/store';

export default {
  name: "App",
  data() {
    return {
      isLoading: true,
    }
  },
  async mounted() {
    this.isLoading = true;
    store.carDetails = [...await getCarDetails()];
    this.isLoading = false;
  },
  components: {
    GalleryCardList,
    ModalOverlay,
    LoaderContainer,
  },
}
</script>
