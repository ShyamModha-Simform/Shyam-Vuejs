import { mount } from '@vue/test-utils';
import { createPinia, setActivePinia } from 'pinia';
import { describe } from 'vitest';
import InputForm from '../InputForm.vue';
import useModalFormStore from '../../store/modalForm';
import SetupVeeValidate from '../../plugins/SetupVeeValidate';

describe('InputForm.vue', () => {
    setActivePinia(createPinia());
    const modalFormStore = useModalFormStore();

    const wrapper = mount(InputForm, {
        global: {
            plugins: [SetupVeeValidate],
            mocks: {
                modalType: 'add',
            },
        },
    });

    test('Checking modal type', () => {
        expect(wrapper.find('.Form__type').text()).toContain('Add Car Details');
    });

    test('Checking button inner text', () => {
        expect(wrapper.find('.submit__button_text').text()).toContain('Submit');
    });
});
