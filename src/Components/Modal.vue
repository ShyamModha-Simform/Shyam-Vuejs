<template>
    <!-- Modal -->
    <div class="modal fade" id="shyam" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
        aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5 text-dark" id="staticBackdropLabel">{{ store.modalType === "edit" ?
                        "Edit" :
                        "Add"
                    }}
                        Car
                        Details</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"
                        @click="resetForm"></button>
                </div>
                <div class="modal-body">
                    <InputForm ref="child" />
                </div>
            </div>
        </div>
    </div>
</template>
  
<script>
import InputForm from './InputForm.vue';
import { store } from '../Store/store';

export default {
    name: 'ModalOverlay',
    data() {
        return {
            store
        }
    },
    components: {
        InputForm
    },
    methods: {
        resetForm() {
            this.$refs.child.resetForm();
        }
    }
}


</script>