import { shallowMount } from '@vue/test-utils';
import GalleryCardList from '../GalleryCardList.vue';
import GalleryCard from '../GalleryCard.vue';
import useCarDataStore from '../../store/carData';
import { createPinia } from 'pinia';

describe('GalleryCardList', async () => {
    const carStore = useCarDataStore(createPinia());
    await carStore.fetchAllCars();
    const wrapper = shallowMount(GalleryCardList, {
        global: {
            // In case i use mount method then i have to mock $t() or register plugin
            // mocks: {
            //     $t: (mes) => mes,
            // },
            // plugins: [i18n],
        },
    });

    test('Renders the carlist', () => {
        expect(wrapper.findAllComponents(GalleryCard)).toHaveLength('2');
    });
});
