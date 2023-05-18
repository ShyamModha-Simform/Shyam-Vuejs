import axios from 'axios';
import { defineStore } from 'pinia';

const actions = {
    async fetchAllCars() {
        try {
            this.isLoaderStarted = true;
            let responseData = await axios.get('https://testapi.io/api/dartya/resource/cardata');
            if (responseData.status === 200) {
                // Updating global state
                this.carsData = [...responseData.data.data];
            }
            this.isLoaderStarted = false;
            return responseData;
        } catch (e) {
            this.isLoaderStarted = false;
            alert("Couldn't able to get Car Details");
        }
    },
    async addCar(newCar) {
        try {
            this.isLoaderStarted = true;
            let responseData = await axios.post('https://testapi.io/api/dartya/resource/cardata', {
                ...newCar,
            });
            this.isLoaderStarted = false;
            if (responseData?.status === 201) {
                // After deleting fetch all car details again
                await this.fetchAllCars();
            }
            return responseData;
        } catch (e) {
            this.isLoaderStarted = false;
            alert("Couldn't able to post Data..");
        }
    },
    async deleteCar(carId) {
        try {
            let responseData = await axios.delete(
                `https://testapi.io/api/dartya/resource/cardata/${carId}`
            );
            return responseData;
        } catch (e) {
            alert("Couldn't able to delete Data..");
        }
        // After deleting fetch all car details again
    },
    async updateCar(editedCar) {
        try {
            this.isLoaderStarted = true;
            let responseData = await axios.put(
                `https://testapi.io/api/dartya/resource/cardata/${editedCar.id}`,
                {
                    ...editedCar,
                }
            );
            this.isLoaderStarted = false;
            if (responseData?.status === 200) {
                // After updating fetch all car details again
                await this.fetchAllCars();
            }
            return responseData;
        } catch (e) {
            this.isLoaderStarted = false;
            alert("Couldn't able to Update Data..");
        }
    },
    async fetchCarDetailsById() {
        try {
            this.isLoaderStarted = true;
            let responseData = await axios.get(`	
        https://testapi.io/api/dartya/resource/cardata/${this.selectedCarIdForDetails}`);
            this.isLoaderStarted = false;
            return responseData.data;
        } catch (e) {
            this.isLoaderStarted = false;
            alert("Couldn't able to fetch car details");
        }
    },
    async userLogin(user) {
        try {
            this.isLoaderStarted = true;
            let responseData = await axios.post(`https://testapi.io/api/dartya//login`, {
                ...user,
            });
            this.isLoaderStarted = false;
            return responseData;
        } catch (e) {
            this.isLoaderStarted = false;
            alert("Something went wrong! Couldn't able to Login user.");
        }
    },
    async userRegistration(user) {
        try {
            this.isLoaderStarted = true;
            let responseData = await axios.post(`https://testapi.io/api/dartya/resource/users`, {
                ...user,
            });
            this.isLoaderStarted = false;
            return responseData;
        } catch (e) {
            this.isLoaderStarted = false;
            alert("Something went wrong! Couldn't able to register user.");
        }
    },
};

const getters = {
    getCarDetails() {
        return this.carsData;
    },
    getSelectedCarIdForDetails() {
        return this.selectedCarIdForDetails;
    },
    getIsLoaderStarted() {
        return this.isLoaderStarted;
    },
    async getCarDetailsById() {
        return await this.fetchCarDetailsById();
    },
};

const useCarDataStore = defineStore('carData', {
    state: () => {
        return {
            carsData: [],
            selectedCarIdForDetails: null,
            isLoaderStarted: false,
        };
    },
    getters,
    actions,
});

export default useCarDataStore;
