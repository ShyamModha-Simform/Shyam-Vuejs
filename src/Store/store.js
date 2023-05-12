import { reactive } from 'vue';

export let store = reactive({
    modalType: 'add',
    carDetails: [],
    carToBeEdited: {},
});
