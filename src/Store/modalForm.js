import { defineStore } from 'pinia';

const useModalFormStore = defineStore('modalForm', {
    state: () => {
        return {
            modalType: 'add',
            selectedCarForEditing: {},
        };
    },
});

export default useModalFormStore;
