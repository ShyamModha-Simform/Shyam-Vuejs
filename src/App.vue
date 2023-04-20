<script>
import GalleryCardList from './Components/GalleryCardList.vue';
import NavbarContainer from './Components/Navbar.vue';
  export default {
    name: "App",
    components: {
      GalleryCardList,
      NavbarContainer,
    }
  }
</script>

<template>
  <header>
    <NavbarContainer />
  </header>
  <main>
    <GalleryCardList />
  </main>
</template>

<style scoped>
 header{
    position: sticky;
    top: 0;
    z-index: 100;
 }
</style>
