<template>
    <vForm class="form" :validation-schema="schema" @submit="handleFormSubmit">
        <div class="modal-header">
            <h1 class="modal-title fs-5 text-dark" id="staticBackdropLabel">
                {{ modalType === 'edit' ? 'Edit' : 'Add' }} Car Details
            </h1>
            <button
                type="reset"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
            ></button>
        </div>
        <div class="group">
            <vField
                name="carName"
                placeholder="‎"
                type="text"
                class="input"
                :validateOnInput="true"
                v-model="carToBeEdited.name"
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
                v-model="carToBeEdited.price"
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
                v-model="carToBeEdited.image"
            />
            <label for="url">Image URL</label>
            <ErrorMessage name="url" class="error_message" />
        </div>
        <div class="group">
            <vField
                name="carDetails"
                :bails="false"
                v-slot="{ field, errors }"
                v-model="carToBeEdited.details"
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
                <CircularLoader v-show="getIsLoaderStarted" />
                <span v-show="!getIsLoaderStarted">{{
                    modalType == 'edit' ? `Update` : `Submit`
                }}</span>
            </BaseButton>
        </div>
    </vForm>
</template>

<script>
import Swal from 'sweetalert2';
import BaseButton from './BaseButton.vue';
import useCarDataStore from '../Store/carData';
import useModalFormStore from '../Store/modalForm';
import { mapActions, mapState, mapWritableState } from 'pinia';
import CircularLoader from './CircularLoader.vue';

export default {
    name: 'InputForm',
    components: {
        BaseButton,
        CircularLoader,
    },
    data() {
        return {
            schema: {
                carName: 'required|alpha_spaces',
                price: 'required|integer',
                url: 'required|url:https://*',
                carDetails: 'required|min:30|max:120',
            },
        };
    },
    computed: {
        ...mapState(useCarDataStore, ['getIsLoaderStarted']),
        ...mapWritableState(useModalFormStore, {
            modalType: 'modalType',
            carToBeEdited: 'getSelectedCarForEditing',
        }),
    },
    methods: {
        ...mapActions(useCarDataStore, ['addCar', 'updateCar']),
        handleFormSubmit() {
            clearTimeout(this.submitTimer);
            this.submitTimer = setTimeout(async () => {
                await this.createCar();
            }, 300);
        },
        async createCar() {
            const temp = this.modalType;
            let res = {};
            if (temp !== 'edit') {
                res = await this.addCar(this.carToBeEdited);
            } else {
                // eslint-disable-next-line no-unused-vars
                res = await this.updateCar(this.carToBeEdited);
            }

            this.$el.querySelector('button[type=reset]').click();

            Swal.fire({
                title: `${temp === 'edit' ? 'Updated' : 'Created'} data`,
                html: `
              <div style="display: flex; align-items: center; justify-content: space-between;">
                <div>
                    <img src="${this.carToBeEdited.image}" alt="Logo" style="width: 300px;" />
                    <h3>${this.carToBeEdited.name}</h3>
                    <p>Price: ${this.carToBeEdited.price}</p>
                    <p>Details: ${this.carToBeEdited.details}</p>
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
            // this.carToBeEdited = {};
            console.log(this.$el, '======');
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
