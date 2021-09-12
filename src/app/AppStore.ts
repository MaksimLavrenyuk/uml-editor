import { observable, makeObservable, action } from 'mobx';
import { AppLocales } from '../locales/i18n';

class AppStore {
    @observable
    private env: { locale: AppLocales } = {
        locale: 'ru',
    };

    constructor() {
        makeObservable(this);
    }

    getLocale(): AppLocales {
        return this.env.locale;
    }

    @action
    setLocale(locale: AppLocales) {
        this.env.locale = locale;
    }
}

export default AppStore;
