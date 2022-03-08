import Cookie from 'cookie';

export default async function ({ store, req }, inject) {
    /**
     * Авторизируем пользователя если есть токен
     */
    if (process.server) {
        const cookie = Cookie.parse(req.headers.cookie || '');
        const accessToken = cookie.access_token || '';
        const refreshToken = cookie.refresh_token || '';

        // TODO: refreshToken пока нету
        // if (accessToken && refreshToken)
        if (accessToken)
            await store.dispatch('auth/login', {
                access_token: accessToken,
                refresh_token: refreshToken,
            });
    }

    inject('auth', { loggedIn: () => store.getters['auth/loggedIn'] });
}
