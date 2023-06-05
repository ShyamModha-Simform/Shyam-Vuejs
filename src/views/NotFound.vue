<template>
    <div class="not_found">
        <img src="../assests/404Error-pana.png" alt="" />
        <RouterLink :to="{ name: 'home' }">
            <BaseButton class="card" size="lg">Go Back To Home</BaseButton>
        </RouterLink>
    </div>
</template>

<script>
import BaseButton from '../components/BaseButton.vue';
export default {
    components: { BaseButton },
    name: 'NotFound',
};
</script>

<style scoped>
.not_found {
    color: red;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
.not_found > img {
    width: max(316px, 25%);
}
</style>
