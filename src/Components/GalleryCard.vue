<script>
import swal from 'sweetalert';  

export default {
  name: 'GalleryCard',
  props: ['carDetail'],
  methods: {
    showPrice(){
        swal("Unbeatable prices - indulge in your dream car today!",` For only $${this.carDetail.carPrice}/-`);
    }
  }
}
</script>

<template>
    <div class="card-1 card-div">
            <div class="like-icon-div">
                <label for="card-1-like" class="like-icon-div-child">
                    <input type="checkbox" id="card-1-like">
                    <i class="far fa-heart heart-empty"></i>
                    <i class="fas fa-heart heart-fill"></i>
                </label>
            </div>
            <div class="gow-img-div img-div">
                <img :src="carDetail.carImageLink" alt="god-of-war-figurine">
            </div>
            <div class="text-container">
                <h2 class="item-name">{{ carDetail.carName }}</h2>
                <p class="date">{{ carDetail.carDescription }}</p>
                <div class="pricing-and-cart">
                    <div class="pricing">
                        <a href="#" class="btn gray block circular" @click.prevent="showPrice">Show Price</a>
                    </div>
                </div>
            </div>
        </div>
</template>

<style scoped>
.like-icon-div-child:hover .heart-fill{
    opacity: 1;
    transform: scale(1);
}

.like-icon-div-child:hover .heart-empty{
    transition-delay: 0.25s;
    opacity: 0;
}

#card-1-like:checked ~ .heart-empty{ 
        opacity: 0;
}

#card-1-like:checked ~ .heart-fill{
    animation: like-animation 0.25s ease-in-out forwards;
}

#card-1-like:not(:checked) ~ .heart-fill{
    animation: unlike-animation 0.25s ease-in-out ;
}
</style>
