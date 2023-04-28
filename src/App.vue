<template>
  <ModalOverlay :modalType="modalType" :updateCarDetail="updateCarDetail" />
  <NavbarContainer @open-add-form="openAddCarForm" />
  <GalleryCardList @open-edit-form="openEditForm" />
</template>

<script>
import GalleryCardList from './Components/GalleryCardList.vue';
import ModalOverlay from "./Components/Modal.vue";

export default {
  name: "App",
  data() {
    return {
      updateCarDetail: {},
      modalType: 'add',
    }
  },
  components: {
    GalleryCardList,
    ModalOverlay,
  },
  methods: {
    openEditForm(carDetail) {
      this.modalType = 'edit';
      this.updateCarDetail = carDetail;
    },
    openAddCarForm(type) {
      this.modalType = type
    }
  }
}
</script>
