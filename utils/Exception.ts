import { NuxtI18nInstance } from '@nuxtjs/i18n';
import { TranslateResult } from 'vue-i18n';

export default class Exception {
    message: TranslateResult | string;

    private i18nMissingEx = 'i18n instance is not set in api';
    private static i18n: NuxtI18nInstance | null = null;

    public static SetI18nInstance(i18nInstance: NuxtI18nInstance) {
        this.i18n = i18nInstance;
    }

    constructor(message: string) {
        this.message = Exception.i18n!.t(`error["${message}"]`);
    }
}
