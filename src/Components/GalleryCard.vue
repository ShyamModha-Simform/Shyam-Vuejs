<template>
  <div class="card-1 card-div">
    <div class="img-div">
      <img :src="carDetail.image" alt="god-of-war-figurine" />
    </div>
    <div class="text-container">
      <h2 class="item-name">{{ carDetail.name }}</h2>
      <p class="date">{{ displayTrunkedDescription }}</p>
      <div class="pricing-and-cart">
        <div class="pricing">
          <RouterLink :to="{name: 'carDetailsById', params: {id: `${carDetail.id}`}}">
            <BaseButton
            class="card"
            >
            Info
          </BaseButton>
          </RouterLink>
          
        </div>
        <div>
          <img
            src="../assests/edit_icon.png"
            class="edit-icon"
            alt="editIcon"
            @click="editCarDetails"
            data-bs-toggle="modal"
            data-bs-target="#shyam"
          />
          <img
            src="../assests/delete_icon.png"
            class="edit-icon pl-2"
            alt="editIcon"
            @click="deleteCarDetails"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { store } from '../Store/store'
import BaseButton from './BaseButton.vue'

export default {
  name: 'GalleryCard',
  props: ['carDetail'],
  components: {
    BaseButton
  },
  methods: {
    showPrice() {
      this.$emit('show-price', this.carDetail.price)
    },
    editCarDetails() {
      // Setting value in global store which will automatically reactive at other components
      store.modalType = 'edit'
      store.carToBeEdited = { ...this.carDetail }
      // we are passing object copy instead of reference
    },
    deleteCarDetails() {
      this.$emit('delete-car-details', this.carDetail.id, this.carDetail)
    }
  },
  computed: {
    displayTrunkedDescription() {
      return this.carDetail?.details?.slice(0, 200) + '...'
    }
  }
}
</script>

<style scoped>
.like-icon-div {
  padding: 1em 1em 0 1em;
  width: 100%;
  box-sizing: border-box;
  text-align: right;
  font-size: 1.5em;
  color: var(--heart-icon-color);
  border-radius: 10px 10px 0 0;
  display: flex;
  justify-content: flex-end;
}

.like-icon-div-child {
  width: 1em;
  height: 1em;
  position: relative;
  z-index: 3;
  cursor: pointer;
}

.heart-empty {
  position: absolute;
  left: 0;
  opacity: 1;
}

.heart-fill {
  position: absolute;
  left: 0;
  opacity: 0;
  transform: scale(0);
  transition: transform 0.25s ease-in-out, opacity 0.2s ease-in-out;
}

.like-icon-div-child:hover .heart-fill {
  opacity: 1;
  transform: scale(1);
}

.like-icon-div-child:hover .heart-empty {
  transition-delay: 0.25s;
  opacity: 0;
}

#card-1-like:checked ~ .heart-empty {
  opacity: 0;
}

#card-1-like:checked ~ .heart-fill {
  animation: like-animation 0.25s ease-in-out forwards;
}

#card-1-like:not(:checked) ~ .heart-fill {
  animation: unlike-animation 0.25s ease-in-out;
}

.edit-icon {
  width: 32px;
}
</style>
