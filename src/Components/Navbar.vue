<template>
  <div>
    <h1>{{ headingContent }}</h1>
    <h5>-{{ tagLine }}</h5>
  </div>
</template>

<script>
export default {
  name: 'NavbarContainer',
  data() {
    return {
      headingContent: 'Carpedia',
      tagLine: 'Your encyclopedia of all things automotive'
    }
  }
}
</script>


