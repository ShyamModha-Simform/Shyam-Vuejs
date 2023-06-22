<template>
    <nav class="navbar">
        <div class="d-flex justify-space-around align-center navbar__wrapper">
            <div class="navbar-logo-text">
                <RouterLink :to="{ name: 'home' }">
                    <h3>{{ headingContent }}</h3>
                </RouterLink>
                <h5>-{{ $t('tagline') }}</h5>
            </div>
            <!-- For larger screen size navigation links -->
            <div class="d-flex align-center justify-center">
                <div class="d-flex align-center" id="navbarNav" v-if="!isMobile">
                    <div class="user_detail" v-if="getIsAuthenticated">
                        <img class="user_logo" src="../assests/userlogo.png" alt="userlogo" />
                        <h4>{{ getLoggedInUserName }}</h4>
                    </div>
                    <ul class="d-flex flex-row align-center justify-center large__screen__navbar">
                        <li class="nav__links" v-if="getIsAuthenticated">
                            <RouterLink :to="{ name: 'home' }"> {{ $t('home') }} </RouterLink>
                        </li>
                        <li class="nav__links" v-if="getIsAuthenticated && getUserRole === 'admin'">
                            <RouterLink :to="{ name: 'admin_userList' }">
                                {{ $t('users') }}
                            </RouterLink>
                        </li>
                        <li class="nav__links" v-if="!getIsAuthenticated">
                            <RouterLink :to="{ name: 'login' }">{{ $t('login') }} </RouterLink>
                        </li>
                        <li class="nav__links" v-if="!getIsAuthenticated">
                            <RouterLink :to="{ name: 'register' }">
                                {{ $t('register') }}
                            </RouterLink>
                        </li>
                        <li class="nav__links" v-if="getIsAuthenticated">
                            <RouterLink :to="{ name: 'login' }" @click="handleLogout">
                                {{ $t('logout') }}
                            </RouterLink>
                        </li>
                    </ul>
                </div>
                <!-- i18n ICON -->
                <div class="text-white i18n" v-if="getIsAuthenticated">
                    <div class="text-white i18n" v-bind="props">
                        <img class="" src="../assests/i18n.png" alt="userlogo" />
                        <div class="navigation-dropdown">
                            <span
                                ><select v-model="$i18n.locale">
                                    <option
                                        v-for="(item, index) in items"
                                        :key="index"
                                        :value="item.value"
                                    >
                                        {{ item.title }}
                                    </option>
                                </select></span
                            >
                        </div>
                    </div>
                </div>
                <!-- MENU button -- for smaller screen size -->
                <div
                    id="hamburger_menu"
                    class="hamburger_container"
                    :class="{ open: drawer }"
                    @click.stop="toggleDrawer"
                    v-if="isMobile"
                >
                    <span class="hamburger_stick"></span>
                    <span class="hamburger_stick"></span>
                    <span class="hamburger_stick"></span>
                </div>
            </div>
        </div>
    </nav>

    <!-- Navigation DRAWER -- For smaller screen size -->
    <v-overlay v-model="drawer" location-strategy="connected" scroll-strategy="block">
        <div class="navigation__sidebar">
            <div class="user_detail">
                <img class="user_logo" src="../assests/userlogo.png" alt="userlogo" />
                <h4>{{ getLoggedInUserName }}</h4>
            </div>

            <v-divider></v-divider>
            <ul class="d-flex flex-column navbar__smaller__screen">
                <template v-if="getIsAuthenticated">
                    <RouterLink :to="{ name: 'home' }"
                        ><li
                            class="d-flex flex-fill list_item justify-center"
                            @click="toggleDrawer"
                        >
                            {{ $t('home') }}
                        </li></RouterLink
                    >
                    <RouterLink :to="{ name: 'admin_userList' }" v-if="getUserRole === 'admin'"
                        ><li
                            class="d-flex flex-fill list_item justify-center"
                            @click="toggleDrawer"
                        >
                            {{ $t('users') }}
                        </li></RouterLink
                    >
                    <RouterLink :to="{ name: 'login' }" @click="handleLogout">
                        <li class="d-flex flex-fill list_item justify-center" @click="toggleDrawer">
                            {{ $t('logout') }}
                        </li></RouterLink
                    >
                </template>
                <template v-if="!getIsAuthenticated">
                    <RouterLink :to="{ name: 'login' }">
                        <li class="d-flex flex-fill list_item justify-center" @click="toggleDrawer">
                            {{ $t('login') }}
                        </li></RouterLink
                    >

                    <RouterLink :to="{ name: 'register' }">
                        <li class="d-flex flex-fill list_item justify-center" @click="toggleDrawer">
                            {{ $t('register') }}
                        </li></RouterLink
                    >
                </template>
            </ul>
        </div>
    </v-overlay>
</template>

<script setup>
import { storeToRefs } from 'pinia';
import useAuthStore from '../store/authStore';
import { computed, ref, watch } from 'vue';
import { useDisplay } from 'vuetify';

const { width } = useDisplay();
const isMobile = ref(width.value < 700 ? true : false);
const drawer = ref(false);
const selected_locale = ref('en');
const items = [
    { title: 'English', value: 'en' },
    { title: 'Gujarati', value: 'gu' },
];

watch(width, () => {
    console.log('called');
    isMobile.value = width.value < 850 ? true : false;
});

const toggleDrawer = () => {
    drawer.value = !drawer.value;
};

const authStore = useAuthStore();
const { getIsAuthenticated, getLoggedInUserName, getUserRole } = storeToRefs(authStore);
const { handleLogout } = authStore;
const headingContent = 'Carpedia';
const tagLine = 'Your encyclopedia of all things automotive';
</script>

<style scoped>
.navbar {
    background-color: var(--header-background);
    width: 100%;
    position: sticky;
    top: 0;
    left: 0;
    z-index: 1;
}

.navigation__sidebar {
    position: absolute;
    background-color: whitesmoke;
    width: 250px;
    min-width: fit-content;
    height: 100vh;
}

.v-card {
    z-index: 2001;
}

.v-overlay {
    z-index: 5;
}

.navbar-logo-text {
    margin-left: 25px;
}
li {
    width: 100%;
    border: solid transparent;
}
.large__screen__navbar a {
    color: #8d989e;
    font-size: 22px;
    font-weight: 600;
    margin-inline: 10px;
}

/* For Smaller screen size */

.large__screen__navbar .router-link-active {
    color: white;
}

h3 {
    color: #fff;
    font-size: 35px;
    margin: 0;
    padding: 0;
    text-align: center;
}

h5 {
    color: #fff;
    padding: 0;
    margin-block: 0.5rem;
    text-align: center;
}

.container-fluid {
    display: flex;
    justify-content: space-around;
}

.user_logo {
    width: 2.5rem;
}

.user_detail {
    display: flex;
    align-items: center;
    margin: 0 20px;
    color: white;
    border-radius: 3rem;
    padding: 2px 0.8rem;
    gap: 0.5rem;
    background: #6b7a83;
    max-width: fit-content;
}

/* Hamburger -- Menu button */
.hamburger_container {
    margin-inline: 10px;
    display: none;
    width: 2.5rem;
    height: 2.5rem;
    cursor: pointer;
}

.hamburger_stick {
    margin-block: 0.5rem;
    width: 2.2rem;
    background-color: #ffffff;
    border-radius: 2px;

    display: block;
    height: 5px;
    width: 100%;
    border-radius: 9px;
    transform: rotate(0deg);
    transition: 0.25s ease-in-out;
}

.hamburger_container span:nth-child(1) {
    top: 5px;
    transform-origin: left center;
}

.hamburger_container span:nth-child(2) {
    top: 17px;
    transform-origin: left center;
}

.hamburger_container span:nth-child(3) {
    top: 25px;
    transform-origin: left center;
}

.hamburger_container.open span:nth-child(1) {
    transform: rotate(45deg) translate(9px, -9.5px);
}

.hamburger_container.open span:nth-child(2) {
    width: 0%;
    opacity: 0;
}

.hamburger_container.open span:nth-child(3) {
    transform: rotate(-45deg) translate(8px, 10px);
}

.nav__links {
    list-style-type: none;
}

.i18n {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    color: white;
    border-radius: 3rem;
    gap: 5px;
    padding: 0.2rem 0.4rem;
    background: #6b7a83;
    max-width: fit-content;
}
.i18n > img {
    width: 33px;
}

.navigation-dropdown select {
    text-decoration: underline;
    color: white;
    font-size: 15px;
    font-weight: 600;
    outline: none;
    padding: 5px;
    cursor: pointer;
}
select option {
    background-color: #646d75;
}

.navigation-dropdown-arrow {
    margin: 0 3px;
    color: white;
    transform: rotate(-90deg);
    transition: transform 0.2s ease-in-out;
}

.i18n:hover .navigation-dropdown-arrow {
    transform: rotate(-270deg);
}

@media screen and (max-width: 850px) {
    header {
        padding-block: 10px;
    }

    .user_detail {
        margin-block: 1rem;
    }
    hr {
        margin-block-end: 1rem;
    }

    .button {
        padding: 8px 20px;
    }

    .navbar h5 {
        display: none;
    }

    .navbarNav {
        display: none;
    }

    .hamburger_container {
        display: block;
    }

    .navbar__wrapper {
        justify-content: space-around !important;
    }

    .navbar__smaller__screen > a {
        width: 90%;
        color: #8d989e;
        padding: 0.5rem 0;
        display: block;
        flex-direction: row;
        font-weight: 600;
    }
    .navbar__smaller__screen > .router-link-active {
        background-color: #6b7a83;
        color: white;
        border: 1px solid #646d75;
        border-radius: 0% 2rem 2rem 0%;
    }
}
</style>
