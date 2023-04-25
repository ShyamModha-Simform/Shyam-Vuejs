<template>
  <header>
    <NavbarContainer />
  </header>
  <main>
    <GalleryCardList />
  </main>
</template>

<script>
import GalleryCardList from './Components/GalleryCardList.vue';
  export default {
    name: "App",
    components: {
      GalleryCardList,
    }
  }
</script>


<style scoped>
 header{
    position: sticky;
    top: 0;
    z-index: 100;
 }
</style>
