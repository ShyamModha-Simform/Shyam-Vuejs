<template>
    <v-row justify="center" class="form__container">
        <v-dialog v-model="dialog" persistent width="600">
            <v-card>
                <v-card-text>
                    <v-container>
                        <div class="">
                            <vForm
                                class="form"
                                :validation-schema="schema"
                                @submit="handleFormSubmit"
                            >
                                <div class="d-flex mb-5 text-blue-grey-darken-2">
                                    <h2 class="Form__type" id="staticBackdropLabel">
                                        {{ modalType === 'edit' ? 'Edit' : 'Add' }}
                                        Car Details
                                    </h2>
                                </div>
                                <div class="group">
                                    <vField
                                        name="carName"
                                        placeholder="‎"
                                        type="text"
                                        class="input"
                                        :validateOnInput="true"
                                        v-model.lazy="selectedCarForEditing.name"
                                    />
                                    <label for="carName">Car Name<span>*</span></label>
                                    <ErrorMessage name="carName" class="error_message" />
                                </div>

                                <div class="group">
                                    <vField
                                        name="price"
                                        placeholder="‎"
                                        type="number"
                                        class="input"
                                        :validateOnInput="true"
                                        v-model="selectedCarForEditing.price"
                                    />
                                    <label for="price">Price<span>*</span></label>
                                    <ErrorMessage name="price" class="error_message" />
                                </div>

                                <div class="group">
                                    <vField
                                        name="url"
                                        placeholder="‎"
                                        type="text"
                                        class="input"
                                        :validateOnInput="true"
                                        v-model="selectedCarForEditing.image"
                                    />
                                    <label for="url">Image URL<span>*</span></label>
                                    <ErrorMessage name="url" class="error_message" />
                                </div>
                                <div class="group">
                                    <vField
                                        name="carDetails"
                                        :bails="false"
                                        v-slot="{ field, errors }"
                                        v-model="selectedCarForEditing.details"
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
                                    <label for="carDetails">Car Details <span>*</span></label>
                                </div>
                                <small>*Indicates required field</small>
                                <div class="d-flex justify-end align-center">
                                    <BaseButton
                                        type="reset"
                                        class="card"
                                        size="lg"
                                        @click="closeModalForm"
                                        ref="closeForm"
                                        >Cancel</BaseButton
                                    >
                                    <BaseButton type="submit" class="card">
                                        <CircularLoader v-show="buttonLoader" />
                                        <span class="submit__button_text" v-show="!buttonLoader">{{
                                            modalType == 'edit' ? `Update` : `Submit`
                                        }}</span>
                                    </BaseButton>
                                </div>
                            </vForm>
                        </div>
                    </v-container>
                </v-card-text>
            </v-card>
        </v-dialog>
    </v-row>
</template>

<script setup>
import Swal from 'sweetalert2';
import BaseButton from './BaseButton.vue';
import useCarDataStore from '../store/carData';
import useModalFormStore from '../store/modalForm';
import { storeToRefs } from 'pinia';
import CircularLoader from './CircularLoader.vue';
import { ref } from 'vue';

const schema = {
    carName: 'required|alpha_spaces',
    price: 'required|integer',
    url: 'required|url:https://*',
    carDetails: 'required|min:30|max:120',
};

const carDataStore = useCarDataStore();
const modalFormStore = useModalFormStore();

const { addCar, updateCar } = carDataStore;
const { openModal: dialog, modalType, selectedCarForEditing } = storeToRefs(modalFormStore);

const closeForm = ref(null);
let submitFormTimer = null;
let buttonLoader = ref(false);

function handleFormSubmit() {
    clearTimeout(submitFormTimer);
    submitFormTimer = setTimeout(async () => {
        await createCar();
    }, 300);
}

async function createCar() {
    const temp = modalType.value;
    buttonLoader.value = true;

    let res =
        temp !== 'edit'
            ? await addCar(selectedCarForEditing.value)
            : await updateCar(selectedCarForEditing.value);

    if (res?.status == 201 || res?.status == 200) {
        closeModalForm();
        Swal.fire({
            title: `${temp === 'edit' ? 'Updated' : 'Created'} data`,
            html: `
              <div style="display: flex; align-items: center; justify-content: space-between;">
                <div>
                    <img src="${selectedCarForEditing.value.image}" alt="Logo" style="width: 300px;" />
                    <h3>${selectedCarForEditing.value.name}</h3>
                        <p>Price: ${selectedCarForEditing.value.price}</p>
                    <p>Details: ${selectedCarForEditing.value.details}</p>
              </div>
              </div> `,
            showCloseButton: true,
            showConfirmButton: true,
            showCancelButton: false,
            focusConfirm: false,
            allowOutsideClick: false,
            allowEscapeKey: false,
        });
        selectedCarForEditing.value = {};
    }
    buttonLoader.value = false;
}

const closeModalForm = () => {
    dialog.value = false;
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

label span {
    font-weight: 700;
}

.form .group .input:placeholder-shown + label,
.form .group .textarea:placeholder-shown + label {
    top: 10px;
    background-color: transparent;
}

.form .group input:focus,
.form .group .textarea:focus {
    border-color: #606d75;
}

.form .group .input:focus + label,
.form .group .textarea:focus + label {
    top: -10px;
    left: 10px;
    background-color: #fff;
    color: #606d75;
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
