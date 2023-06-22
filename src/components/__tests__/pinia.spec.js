import { setActivePinia, createPinia } from 'pinia';
import { beforeEach } from 'vitest';
import useAuthStore from '../../store/authStore';

describe('stores', () => {
    beforeEach(() => {
        setActivePinia(createPinia());
    });

    test('Is user Authenticated', async () => {
        const store = useAuthStore();

        expect(store.isAuthenticated).not.toBe(true);
        await store.userLogin({ email: 'xyz@gmail.com', password: '12345678#' });
        expect(store.isAuthenticated).toBe(true);
    });
});
