<template>
<!-- Modal -->
<div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5 text-dark" id="staticBackdropLabel">Add Car Details</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <UserInputForm />
      </div>
      
    </div>
  </div>
</div>
</template>

<script>

import UserInputForm from './UserInputForm.vue';

export default {
  name: 'BootstrapModal',
  data(){
    return {
      
    }
  },
  components: {
    UserInputForm,
  }
}

</script>