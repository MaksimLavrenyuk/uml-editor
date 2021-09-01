import { observable, makeObservable, action } from 'mobx';
import { AppType } from './types';
import { AppLocales } from '../locales/types';

class AppStore implements AppType {
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
