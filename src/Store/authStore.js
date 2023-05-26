import { defineStore } from 'pinia';
import axios from 'axios';

function GENERATE_RANDOM_TOKEN(length) {
    const regex = /[A-Za-z0-9]/;
    let token = '';

    for (let i = 0; i < length; i++) {
        const randomChar = String.fromCharCode(Math.floor(Math.random() * 127));
        if (regex.test(randomChar)) {
            token += randomChar;
        } else {
            i--;
        }
    }

    return token;
}

const actions = {
    async userLogin(loginCredentials) {
        try {
            this.isLoaderStarted = true;

            let responseData = await axios.get(`	
            ${import.meta.env.VITE_BASE_LOGIN_URL}`);
            const userExists = responseData.data.data?.find((user) => {
                return (
                    user.email === loginCredentials.email &&
                    user.password === loginCredentials.password
                );
            });
            if (userExists) {
                this.username = userExists.name;
                sessionStorage.setItem('username', userExists.name);
                sessionStorage.setItem(
                    'token',
                    GENERATE_RANDOM_TOKEN(loginCredentials.password.length)
                );
                this.isLoaderStarted = false;
                this.isAuthenticated = true;
                return { status: 200, statusText: 'Logged in Successfully!' };
            } else {
                this.isLoaderStarted = false;
                alert('Invalid Credentials or User not found!');
                return { status: 401, statusText: 'Invalid Credentials' };
            }
        } catch (e) {
            this.isLoaderStarted = false;
            alert("Something went wrong! Couldn't able to Login user.");
        }
    },
    async userRegistration(user) {
        try {
            this.isLoaderStarted = true;
            let responseData = await axios.post(`${import.meta.env.VITE_BASE_LOGIN_URL}`, {
                ...user,
            });
            this.isLoaderStarted = false;
            return responseData;
        } catch (e) {
            this.isLoaderStarted = false;
            alert("Something went wrong! Couldn't able to register user.");
        }
    },
    handleLogout() {
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('username');
        this.username = null;
        this.isAuthenticated = false;
    },
};

const useAuthStore = defineStore('authStore', {
    state: () => {
        return {
            isAuthenticated: sessionStorage.getItem('token') ? true : false,
            isLoaderStarted: false,
            username: sessionStorage.getItem('username') || null,
        };
    },
    getters: {
        getIsAuthenticated() {
            return this.isAuthenticated;
        },
        getIsLoaderStarted() {
            return this.isLoaderStarted;
        },
        getLoggedInUserName() {
            return this.username;
        },
    },
    actions,
});

export default useAuthStore;
