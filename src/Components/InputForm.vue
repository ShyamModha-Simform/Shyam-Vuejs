<template>
    <vForm class="form" :validation-schema="schema" @submit="createCar">
        <div class="group">
            <vField name="carName" placeholder="‎" type="text" class="input" :validateOnInput="true"
                v-model="car.carName" />
            <label for="carName">Car Name </label>
            <ErrorMessage name="carName" class="error_message" />
        </div>
        <!-- {{ type === 'edit' ? 'Undefined' : showEditForm }} -->

        <div class="group">
            <vField name="price" placeholder="‎" type="number" class="input" :validateOnInput="true"
                v-model="car.carPrice" />
            <label for="price">Price</label>
            <ErrorMessage name="price" class="error_message" />
        </div>

        <div class="group">
            <vField name="url" placeholder="‎" type="text" class="input" :validateOnInput="true"
                v-model="car.carImageLink" />
            <label for="url">Image URL</label>
            <ErrorMessage name="url" class="error_message" />
        </div>
        <div class="group">
            <vField name="carDetails" :bails="false" v-slot="{ field, errors }" v-model="car.carDescription">
                <textarea type="text" placeholder="‎" id="comment" class="textarea" name="carDetails" rows="3"
                    v-bind="field" />
                <div class="error_message" v-for="err in errors" :key="err">
                    {{ err }}
                </div>
            </vField>
            <label for="carDetails">Car Details</label>
        </div>
        <div class="modal-footer">
            <button type="reset" class="btn btn-secondary" data-bs-dismiss="modal"
                @click="clearEditFormState">Cancel</button>
            <button type="submit" class="btn btn-primary">
                {{ modalType === "edit" ? `Update` : `Submit` }}
            </button>
        </div>
    </vForm>
</template>

<script>
import Swal from 'sweetalert2'

export default {
    name: 'InputForm',
    props: ['modalType', 'updateCarDetail'],
    data() {

        return {
            schema: {
                carName: 'required|alpha_spaces',
                price: 'required|integer',
                url: 'required',
                carDetails: 'required|min:30|max:120'
            },
            car: {
                carName: this.updateCarDetail.carName || "",
                carPrice: Number,
                carDescription: "",
                carImageLink: "",
            },
        }
    },
    watch: {
        updateCarDetail: {
            handler(newVal) {
                this.car = newVal
            }
        }
    },
    methods: {
        createCar() {
            this.$el.querySelector('button[type=reset]').click()
            // swal("Car Details added Successfully", `Car Name: ${this.carName}`);
            Swal.fire({
                title: `Car Details added Successfully!`,
                html: `
                <div style="display: flex; align-items: center; justify-content: space-between;">
                <div>
                    <img src="${this.car.carImageLink}" alt="Logo" style="width: 300px;" />
                    <h3>${this.car.carName}</h3>
                    <p>Price: ${this.car.carPrice}</p>
                    <p>Details: ${this.car.carDescription}</p>
                </div>
                </div>
  `,
                showCloseButton: true,
                showConfirmButton: true,
                showCancelButton: false,
                focusConfirm: false,
                allowOutsideClick: false,
                allowEscapeKey: false
            })
        },
        clearEditFormState() {
            this.$el.querySelector("form")
        }
    }
}
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
    /* margin-bottom: 20px; */
    outline: 0;
    width: 100%;
    background-color: transparent;
}

.form .group .input:placeholder-shown+label,
.form .group .textarea:placeholder-shown+label {
    top: 10px;
    background-color: transparent;
}

.form .group input:focus,
.form .group .textarea:focus {
    border-color: #3366cc;
}

.form .group .input:focus+label,
.form .group .textarea:focus+label {
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

.form button {
    background-color: #606d75;
    color: #fff;
    border: none;
    border-radius: 5px;
    padding: 10px;
    font-size: 16px;
    cursor: pointer;
    transition: all 0.3s ease;
}

.form button:hover {
    background-color: #849199;
}

.error_message {
    color: red;
    position: relative;
    /* top: -20px; */
}
</style>
