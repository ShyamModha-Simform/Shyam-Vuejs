import { defineStore } from 'pinia';
import {
    addCarDetails,
    deleteCarDetails,
    getCarDetails,
    getCarDetailsById,
    loginUser,
    updataCarDetails,
    registerUser,
} from '../api/api';

const useCarDataStore = defineStore('carData', {
    state: () => {
        return {
            carDetails: [],
            selectedCarIdForDetails: null,
        };
    },
    getters: {
        async fetchCarDetailsById() {
            try {
                const response = await getCarDetailsById(this.selectedCarIdForDetails);
                return response;
            } catch (e) {
                alert("Couldn't able to get Car Details!");
            }
        },
    },
    actions: {
        async fetchAllCars() {
            const response = await getCarDetails();
            this.carDetails = [...response];
        },
        async addCar(newCar) {
            await addCarDetails(newCar);
            // After adding fetch all car details again
            await this.fetchAllCars();
        },
        async deleteCar(carId) {
            await deleteCarDetails(carId);
            // After deleting fetch all car details again
            await this.fetchAllCars();
        },
        async updateCar(editedCar) {
            await updataCarDetails(editedCar);
            // After updating fetch all car details again
            await this.fetchAllCars();
        },
        async userLogin(user) {
            const response = await loginUser(user);
            return response;
        },
        async userRegistration(user) {
            const repsonse = await registerUser(user);
            return repsonse;
        },
    },
});

export default useCarDataStore;
