<template>
  <nav class="navbar navbar-expand-lg">
    <div class="container justify-content-around">

      <h1 class="p-0">
        <div>
          <RouterLink :to="{ name: 'home' }">
            <h2>{{ headingContent }}</h2>
          </RouterLink>
          <h6>-{{ tagLine }}</h6>
        </div>
      </h1>

      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
        aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse justify-content-end" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item">
            <RouterLink :to="{ name: 'home' }">
              <BaseButton class="navbar" size="sm">
                <h4>Home</h4>
              </BaseButton>
            </RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink :to="{ name: 'login' }">
              <BaseButton class="navbar" size="lg">
                <h4>Login</h4>
              </BaseButton>
            </RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink :to="{ name: 'register' }">
              <BaseButton class="navbar" size="sm">
                <h4>Register</h4>
              </BaseButton>
            </RouterLink>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import BaseButton from './BaseButton.vue'

export default {
  name: 'NavbarContainer',
  components: {
    BaseButton
  },
  data() {
    return {
      headingContent: 'Carpedia',
      tagLine: 'Your encyclopedia of all things automotive'
    }
  },
}
</script>

<style scoped>
.navbar {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: sticky;
  top: 0;
  gap: 10;
  z-index: 100;
  background-color: var(--header-background);
}

.router-link-active>button {
  color: white
}

h2 {
  color: #fff;
  font-size: 45px;
  margin: 0;
  padding: 0;
  text-align: center;
}

h6 {
  color: #fff;
  padding: 0;
  margin-block: 1rem;
  text-align: center;
}

.container-fluid {
  display: flex;
  justify-content: space-around;
}

@media screen and (max-width: 600px) {
  header {
    padding-block: 10px;
  }

  .button {
    padding: 8px 20px;
  }

  .navbar h6 {
    display: none;
  }
}
</style>

