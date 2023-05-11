<template>
    <vForm class="form" :validation-schema="schema" @submit="handleFormSubmit">
        <div class="group">
            <vField
                name="carName"
                placeholder="‎"
                type="text"
                class="input"
                :validateOnInput="true"
                v-model="store.carToBeEdited.name"
            />
            <label for="carName">Car Name </label>
            <ErrorMessage name="carName" class="error_message" />
        </div>

        <div class="group">
            <vField
                name="price"
                placeholder="‎"
                type="number"
                class="input"
                :validateOnInput="true"
                v-model="store.carToBeEdited.price"
            />
            <label for="price">Price</label>
            <ErrorMessage name="price" class="error_message" />
        </div>

        <div class="group">
            <vField
                name="url"
                placeholder="‎"
                type="text"
                class="input"
                :validateOnInput="true"
                v-model="store.carToBeEdited.image"
            />
            <label for="url">Image URL</label>
            <ErrorMessage name="url" class="error_message" />
        </div>
        <div class="group">
            <vField
                name="carDetails"
                :bails="false"
                v-slot="{ field, errors }"
                v-model="store.carToBeEdited.details"
            >
                <textarea
                    type="text"
                    placeholder="‎"
                    id="comment"
                    class="textarea"
                    name="carDetails"
                    rows="3"
                    v-bind="field"
                />
                <div class="error_message" v-for="err in errors" :key="err">
                    {{ err }}
                </div>
            </vField>
            <label for="carDetails">Car Details</label>
        </div>
        <div class="modal-footer">
            <BaseButton type="reset" class="card" size="lg" data-bs-dismiss="modal"
                >Cancel</BaseButton
            >
            <BaseButton type="submit" class="card">
                {{ store.modalType === 'edit' ? `Update` : `Submit` }}
            </BaseButton>
        </div>
    </vForm>
</template>

<script>
import Swal from 'sweetalert2';
import { addCarDetails, getCarDetails, updataCarDetails } from '../api/api';
import { store } from '../Store/store';
import BaseButton from './BaseButton.vue';

export default {
    name: 'InputForm',
    components: {
        BaseButton,
    },
    data() {
        return {
            store,
            schema: {
                carName: 'required|alpha_spaces',
                price: 'required|integer',
                url: 'required|url:https://*',
                carDetails: 'required|min:30|max:120',
            },
        };
    },
    methods: {
        handleFormSubmit() {
            clearTimeout(this.submitTimer);
            this.submitTimer = setTimeout(async () => {
                await this.createCar();
            }, 300);
        },
        async createCar() {
            const temp = store.modalType;
            let res = {};
            if (temp !== 'edit') {
                res = await addCarDetails(store.carToBeEdited);
            } else {
                res = await updataCarDetails(store.carToBeEdited);
            }
            console.log(res);
            // rendering Car details once finish

            store.carDetails = await getCarDetails();

            this.$el.querySelector('button[type=reset]').click();

            Swal.fire({
                title: `${temp === 'edit' ? 'Updated' : 'Created'} data`,
                html: `
              <div style="display: flex; align-items: center; justify-content: space-between;">
                <div>
                    <img src="${store.carToBeEdited.image}" alt="Logo" style="width: 300px;" />
                    <h3>${store.carToBeEdited.name}</h3>
                    <p>Price: ${store.carToBeEdited.price}</p>
                    <p>Details: ${store.carToBeEdited.details}</p>
              </div>
              </div> `,
                showCloseButton: true,
                showConfirmButton: true,
                showCancelButton: false,
                focusConfirm: false,
                allowOutsideClick: false,
                allowEscapeKey: false,
            });
        },
        resetForm() {
            store.carToBeEdited = {};
            this.$el.querySelector('button[type=reset]').click();
        },
    },
};
</script>

<style scoped>
.card {
    background-color: #fff;
    border-radius: 10px;
    padding: 20px;
    width: 350px;
    display: flex;
    flex-direction: column;
}

.title {
    font-size: 24px;
    font-weight: 600;
    text-align: center;
}

.form {
    margin-top: 20px;
    display: flex;
    flex-direction: column;
}

.group {
    position: relative;
    margin-bottom: 20px;
}

.form .group label {
    font-size: 14px;
    color: rgb(99, 102, 102);
    position: absolute;
    top: -10px;
    left: 10px;
    background-color: #fff;
    transition: all 0.3s ease;
}

.form .group .input,
.form .group .textarea {
    padding: 10px;
    border-radius: 5px;
    border: 1px solid rgba(0, 0, 0, 0.2);
    outline: 0;
    width: 100%;
    background-color: transparent;
}

.form .group .input:placeholder-shown + label,
.form .group .textarea:placeholder-shown + label {
    top: 10px;
    background-color: transparent;
}

.form .group input:focus,
.form .group .textarea:focus {
    border-color: #3366cc;
}

.form .group .input:focus + label,
.form .group .textarea:focus + label {
    top: -10px;
    left: 10px;
    background-color: #fff;
    color: #3366cc;
    font-weight: 600;
    font-size: 14px;
}

.form .group .textarea {
    resize: none;
    height: 100px;
}

.error_message {
    color: red;
    position: relative;
    /* top: -20px; */
}

.modal-footer {
    display: flex;
    flex-direction: row;
}
</style>
