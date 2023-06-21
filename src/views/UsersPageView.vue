<template>
    <section class="table-container">
        <v-table class="v-table">
            <thead>
                <tr>
                    <th class="text-left">Name</th>
                    <th class="text-left">Email</th>
                    <th class="text-left">Role</th>
                    <th class="text-left">Gender</th>
                    <th class="text-left">DOB</th>
                    <th class="text-left">Age</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="user in getUserList" :key="user.id">
                    <td>{{ user.name }}</td>
                    <td>{{ user.email }}</td>
                    <td>{{ user.role }}</td>
                    <td>{{ user.gender }}</td>
                    <td>{{ user.dob }}</td>
                    <td>{{ user.age }}</td>
                </tr>
            </tbody>
        </v-table>
    </section>
</template>

<script setup>
import { storeToRefs } from 'pinia';
import useAuthStore from '../store/authStore';
const authStore = useAuthStore();
const { getUserList } = storeToRefs(authStore);
authStore.getAllUsers();
</script>

<style scoped>
th {
    font-size: 20px;
}
.table-container {
    overflow-x: auto;
    padding: 30px;
}
v-table {
    max-width: 1300px;
    min-width: 750px;
    margin-inline: auto;
    background: #f1f6f9;
}
</style>
