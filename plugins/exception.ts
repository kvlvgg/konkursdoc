import { NuxtAppOptions } from '@nuxt/types';
import Exception from '@/utils/Exception';

export default ({ app }: { app: NuxtAppOptions }) => {
    Exception.SetI18nInstance(app.i18n);
};
