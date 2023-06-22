import { RouterLinkStub, shallowMount } from '@vue/test-utils';
import GalleryCard from '../GalleryCard.vue';
import useCarDataStore from '../../store/carData';
import { createPinia } from 'pinia';
import { expect } from 'vitest';

describe('GalleryCard.Vue', async () => {
    const carStore = useCarDataStore(createPinia());
    // await carStore.fetchAllCars();
    const wrapper = shallowMount(GalleryCard, {
        props: {
            carDetail: { id: '253663' },
        },
        global: {
            components: { RouterLink: RouterLinkStub },
            mocks: {
                timepass: '12345678',
            },
        },
    });

    test('Renders dynamic car ID', () => {
        expect(wrapper.findComponent(RouterLinkStub).props().to).toEqual({
            name: 'carDetailsById',
            params: { id: '253663' },
        });
    });

    test('Rendering Mock data', () => {
        expect(wrapper.text()).toContain('12345678');
    });
});
