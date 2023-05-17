<template>
    <main>
        <div class="card-container--layer">
            <div class="add-car-container">
                <BaseButton
                    class="card"
                    size="lg"
                    @click="modalType = 'add'"
                    data-bs-toggle="modal"
                    data-bs-target="#backdrop-overlay-modal"
                >
                    Add
                </BaseButton>
            </div>
            <div class="card-container">
                <TransitionGroup name="fade" mode="out-in" appear>
                    <GalleryCard
                        v-for="(car, index) in carDetails"
                        :carDetail="car"
                        @delete-car-details="triggerDeleteCarHandler"
                        :key="car.id"
                        :style="{ transitionDelay: `${0.03 * index}s` }"
                    />
                </TransitionGroup>
            </div>
        </div>
    </main>
</template>

<script>
import GalleryCard from './GalleryCard.vue';

import Swal from 'sweetalert2';
import BaseButton from './BaseButton.vue';
import useCarDataStore from '../Store/carData';
import { mapActions, mapState, mapWritableState } from 'pinia';
import useModalFormStore from '../Store/modalForm';

export default {
    name: 'GalleryCardList',
    components: {
        GalleryCard,
        BaseButton,
    },
    computed: {
        ...mapState(useCarDataStore, ['carDetails']),
        ...mapWritableState(useModalFormStore, ['modalType']),
    },
    methods: {
        ...mapActions(useCarDataStore, ['deleteCar']),
        triggerDeleteCarHandler(carId, carToBeDeleted) {
            Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!',
            }).then(async (result) => {
                if (result.isConfirmed) {
                    try {
                        await this.deleteCar(carId);
                        Swal.fire(
                            `Deleted ${carToBeDeleted.name}!`,
                            'Your file has been deleted.',
                            'success'
                        );
                    } catch (e) {
                        alert('Something went wrong!');
                    }
                }
            });
        },
    },
};
</script>

<style scoped>
.card-container--layer {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 3em 1em 1em 1em;
}

.add-car-container {
    display: flex;
    width: 100%;
    flex-direction: row-reverse;
    padding-inline: 15%;
}

.fade-enter-active,
.fade-leave-active {
    opacity: 0.5;
    transition: all 0.5s ease-in-out;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
    transform: translateY(6rem);
}
.fade-enter-to,
.fade-leave-from {
    opacity: 1;
}
</style>
