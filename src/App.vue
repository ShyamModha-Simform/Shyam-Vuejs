<template>
  <BootstrapModal />
  <header>
    <NavbarContainer />
      <button type="button" class="button" @click.prevent="showPrice" data-bs-toggle="modal" data-bs-target="#staticBackdrop">Add Car</button>
  </header>
  <main>
      <GalleryCardList />
    </main>
</template>

<script>
import GalleryCardList from './Components/GalleryCardList.vue';
import BootstrapModal from './Components/BootstrapModal.vue'


  export default {
    name: "App",
    data(){
      return {
        showModal: false,
      }
    },
    components: {
      GalleryCardList,
      BootstrapModal
    },
    methods: {
      closeModal(){
        this.showModal = false;
      }
    }
  }
</script>


<style scoped>
 header{
  width: 100%;
    position: sticky;
    top: 0;
    display: flex;
    gap: 10;
    z-index: 100;
    justify-content: space-around;
 }

 .button {
    display: inline-block;
    outline: 0;
    border: 0;
    cursor: pointer;
    font-weight: 600;
    color: #fff;
    font-size: 20px;
    /* height: 38px; */
    padding: 8px 24px;
    border: 1px solid #fff;
    border-radius: 50px;
    /* background-color: #B2B4B3; */
    background: transparent;
    box-shadow: 0 4px 11px 0 rgb(37 44 97 / 15%), 0 1px 3px 0 rgb(93 100 148 / 20%);
    transition: all .2s ease-out;         
}

.button:disabled {
    background-color: rgb(174, 181, 185);
    cursor: not-allowed;
}
</style>
