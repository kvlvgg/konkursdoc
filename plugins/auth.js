/* eslint-disable camelcase */

import Cookie from 'cookie';

export default async function ({ store, req, route, redirect }, inject) {
  /**
   * Авторизируем пользователя если есть токен
   */
  if (process.server) {
    const cookie = Cookie.parse(req.headers.cookie || '');
    const access_token = cookie.access_token || '';
    const refresh_token = cookie.refresh_token || '';

    if (access_token && refresh_token)
      await store.dispatch('auth/login', { access_token, refresh_token });
  }

  inject('auth', {
    get loggedIn() {
      return store.getters['auth/loggedIn'];
    },
  });

  if (route.name !== 'index' && !store.getters['auth/loggedIn']) {
    redirect({ path: '/', query: { mode: 'login' } });
  }
}
