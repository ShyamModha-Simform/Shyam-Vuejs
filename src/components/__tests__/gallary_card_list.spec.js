import { shallowMount } from '@vue/test-utils';
import GalleryCardList from '../GalleryCardList.vue';
import GalleryCard from '../GalleryCard.vue';
import useCarDataStore from '../../store/carData';
import { createPinia } from 'pinia';

describe('GalleryCardList', async () => {
    const carStore = useCarDataStore(createPinia());
    await carStore.fetchAllCars();
    const wrapper = shallowMount(GalleryCardList, {
        data() {
            return {
                carDetails: [{}, {}],
            };
        },
        global: {
            // mocks: {
            //     $t: (mes) => mes,
            // },
            // plugins: [i18n],
        },
    });

    test('Renders the carlist', () => {
        expect(wrapper.findAllComponents(GalleryCard)).toHaveLength('3');
    });
});
