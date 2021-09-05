import AppStore from '../AppStore';

describe('Testing general store for app.', () => {
    it('Set locale for app', () => {
        const locale = 'ru';
        const store = new AppStore();

        store.setLocale(locale);
        expect(store.getLocale()).toBe(locale);
    });
});
