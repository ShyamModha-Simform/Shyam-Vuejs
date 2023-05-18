import axios from 'axios';

const getCarDetails = async () => {
    try {
        let responseData = await axios.get('https://testapi.io/api/dartya/resource/cardaa');
        return responseData.data.data;
    } catch (e) {
        alert("Couldn't able to get Car Details");
    }
};

const addCarDetails = async (data) => {
    try {
        let responseData = await axios.post('https://testapi.io/api/dartya/resource/cardata', {
            ...data,
        });
        return responseData;
    } catch (e) {
        alert("Couldn't able to post Data..");
    }
};

const deleteCarDetails = async (id) => {
    try {
        let responseData = await axios.delete(
            `https://testapi.io/api/dartya/resource/cardata/${id}`
        );
        return responseData;
    } catch (e) {
        alert("Couldn't able to delete Data..");
    }
};

const updataCarDetails = async (data) => {
    try {
        let responseData = await axios.put(
            `https://testapi.io/api/dartya/resource/cardata/${data.id}`,
            {
                ...data,
            }
        );
        return responseData;
    } catch (e) {
        alert("Couldn't able to Update Data..");
    }
};

const loginUser = async (data) => {
    try {
        let responseData = await axios.post(`https://testapi.io/api/dartya//login`, {
            ...data,
        });
        return responseData;
    } catch (e) {
        alert("Something went wrong! Couldn't able to Login user.");
    }
};

const registerUser = async (data) => {
    try {
        let responseData = await axios.post(`https://testapi.io/api/dartya/resource/users`, {
            ...data,
        });
        return responseData;
    } catch (e) {
        alert("Something went wrong! Couldn't able to register user.");
    }
};

const getCarDetailsById = async (id) => {
    try {
        let responseData = await axios.get(`	
    https://testapi.io/api/dartya/resource/cardata/${id}`);

        return responseData.data;
    } catch (e) {
        alert("Couldn't able to fetch car details");
    }
};

export {
    getCarDetails,
    addCarDetails,
    deleteCarDetails,
    updataCarDetails,
    loginUser,
    registerUser,
    getCarDetailsById,
};
