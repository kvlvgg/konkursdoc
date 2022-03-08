import { NuxtAppOptions } from '@nuxt/types';
import { api } from '@/utils/api';

export default ({ app }: { app: NuxtAppOptions }) => {
  api.SetAxiosInstance(app.$axios);
  api.SetI18nInstance(app.i18n);
};
