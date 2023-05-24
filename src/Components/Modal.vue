<template>
    <!-- Modal -->
    <div
        class="modal fade"
        id="backdrop-overlay-modal"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabindex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
    >
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-body">
                    <InputForm />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import InputForm from './InputForm.vue';
import { mapState } from 'pinia';
import useModalFormStore from '../Store/modalForm';

export default {
    name: 'ModalOverlay',
    components: {
        InputForm,
    },
    computed: {
        ...mapState(useModalFormStore, {
            modalType: 'getModalType',
        }),
    },
};
</script>
