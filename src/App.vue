<template>
  <ModalOverlay :modalType="modalType" :updateCarDetail="updateCarDetail" @render-car-list="renderCarList" />
  <NavbarContainer @open-add-form="openAddCarForm" />
  <LoaderContainer v-if="isLoading" />
  <GalleryCardList v-else @open-edit-form="openEditForm" @render-car-list="renderCarList" :carList="carList" />
</template>

<script>
import GalleryCardList from './Components/GalleryCardList.vue';
import ModalOverlay from "./Components/Modal.vue";
import { getCarDetails } from './api/api'
import LoaderContainer from "./Components/Loader.vue"

export default {
  name: "App",
  data() {
    return {
      updateCarDetail: {},
      modalType: 'add',
      carList: [],  // sending fetched data to GallaryCardList
      isLoading: true,
    }
  },
  async mounted() {
    this.isLoading = true;
    this.carList = [...await getCarDetails()];
    this.isLoading = false;
  },
  components: {
    GalleryCardList,
    ModalOverlay,
    LoaderContainer,
  },
  methods: {
    async openEditForm(carDetail) {
      this.modalType = 'edit';
      this.updateCarDetail = carDetail;
    },
    openAddCarForm(type) {
      this.modalType = type
    },
    async renderCarList() {
      this.isLoading = true
      setTimeout(async () => {
        this.carList = [...await getCarDetails()];
        this.isLoading = false
      }, 2000)

    }
  }
}
</script>
