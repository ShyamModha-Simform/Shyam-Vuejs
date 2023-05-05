<template>
    <div class="form-container--login">
    <h1>Register</h1>

    <vForm class="form" :validation-schema="schema" @submit="createCar">
        <div class="group">
            <vField name="carName" placeholder="‎" type="text" class="input" :validateOnInput="true"
                v-model="store.carToBeEdited.name" />
            <label for="carName">Car Name </label>
            <ErrorMessage name="carName" class="error_message" />
        </div>

        <div class="group">
            <vField name="price" placeholder="‎" type="number" class="input" :validateOnInput="true"
                v-model="store.carToBeEdited.price" />
            <label for="price">Price</label>
            <ErrorMessage name="price" class="error_message" />
        </div>

        <div class="modal-footer">
            <BaseButton type="submit" class="card" size="w100">
                Register
            </BaseButton>
        </div>
    </vForm>
</div>
</template>
  
<script>
import { store } from '../Store/store'
import BaseButton from '../Components/BaseButton.vue'

export default {
    name: 'LoginForm',
    components: {
        BaseButton
    },
    data() {
        return {
            store,
            schema: {
                carName: 'required|alpha_spaces',
                price: 'required|integer',
            }
        }
    },
    methods: {
        resetForm() {

            this.$el.querySelector("button[type=reset]").click();
        }
    }
}
</script>
  
<style scoped>

.form-container--login{
    width: 316px;
    margin-inline: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
}

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
    width: 100%;
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    /* align-items: center; */
    
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

.error_message {
    color: red;
    position: relative;
}

.modal-footer {
    display: flex;
    flex-direction: row;

}
</style>
  