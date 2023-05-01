<template>
  <ModalOverlay :modalType="modalType" :updateCarDetail="updateCarDetail" @render-car-list="renderCarList" />
  <NavbarContainer @open-add-form="openAddCarForm" />
  <GalleryCardList @open-edit-form="openEditForm" :carList="carList" />
</template>

<script>
import GalleryCardList from './Components/GalleryCardList.vue';
import ModalOverlay from "./Components/Modal.vue";
import { getCarDetails } from './api/api'

export default {
  name: "App",
  data() {
    return {
      updateCarDetail: {},
      modalType: 'add',
      carList: [],  // sending fetched data to GallaryCardList
    }
  },
  async mounted() {
    this.carList = [...await getCarDetails()];
  },
  components: {
    GalleryCardList,
    ModalOverlay,
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
      this.carList = [...await getCarDetails()];
    }
  }
}
</script>
