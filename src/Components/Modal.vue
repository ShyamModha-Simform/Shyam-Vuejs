<template>
    <!-- Modal -->
    <div class="modal fade" id="shyam" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
        aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5 text-dark" id="staticBackdropLabel">{{ modalType === "edit" ? "Edit" : "Add"
                    }}
                        Car
                        Details {{ modalType }}</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <InputForm :modalType="modalType" :updateCarDetail="updateCarDetail" />
                </div>
            </div>
        </div>
    </div>
</template>
  
<script>
import InputForm from './InputForm.vue';

export default {
    name: 'ModalOverlay',
    props: ["modalType", "updateCarDetail"],
    data() {
        return {
        }
    },
    components: {
        InputForm
    },


}


</script>