<template>
    <div>
        <h1>404</h1>
        <p>The page you are looking for is not available.</p>
    </div>
</template>

<script>
export default {
    name: 'NotFound',
};
</script>

<style scoped>
div {
    color: red;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
}
</style>
