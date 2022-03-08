import { GetterTree, MutationTree, ActionTree, Module } from 'vuex';
import { RootState } from '.';

import jsCookie, { CookieAttributes } from 'js-cookie';

import Auth from '@/classes/Auth';

export const namespaced = true;

/**
 * Удаление кук
 * @param   Array   items   ['name1', 'name2', 'name3']
 * @param   Object  options
 * @returns void
 */
function removeCookie(items: string[], options: CookieAttributes = {}) {
    if (!Array.isArray(items)) return;
    if (process.env.domain) options.domain = `.${process.env.domain}`;
    items.forEach(name => {
        jsCookie.remove(name, options);
    });
}

/**
 * Создание кук
 * @param   Object  items   { Key: Val }
 * @param   Object  options
 * @returns void
 */
function setCookie(items: Record<string, string>, options: CookieAttributes = {}) {
    if (typeof items !== 'object') return;
    if (process.env.domain) options.domain = `.${process.env.domain}`;
    Object.keys(items).forEach(key => {
        jsCookie.set(key, items[key], options);
    });
}

export type ModuleState = ReturnType<
    () => {
        access_token: string | null;
        refresh_token: string | null;
    }
>;

export const state = () => ({
    /**
     * Токен пользователя для API
     * @type String
     */
    access_token: null,
    refresh_token: null,
});

export const getters: GetterTree<ModuleState, RootState> = {
    /**
     * Статус авторизации пользователя
     * @return  Boolean
     */
    loggedIn: state => !!state.access_token,

    /**
     * Токен авторизации
     * @return  String
     */
    access_token: state => state.access_token,

    /**
     * Токен авторизации
     * @return  String
     */
    refresh_token: state => state.refresh_token,
};

export const mutations: MutationTree<ModuleState> = {
    SET_ACCESS_TOKEN: (state, token) => (state.access_token = token),

    SET_REFRESH_TOKEN: (state, token) => (state.refresh_token = token),

    CLEAR_TOKENS(state) {
        state.access_token = null;
        state.refresh_token = null;
    },
};

export const actions: ActionTree<ModuleState, RootState> = {
    /**
     * Запрос на восстановление пароля
     * @param   Object  fields
     * @return  Object
     */
    async sendPasswordRecoveryCode({}, email: string) {
        return await Auth.sendPasswordRecoveryCode(email);
    },

    /**
     * Изменение пароля
     * @param   Object  fields
     * @return  Object
     */
    async passwordReset({ dispatch }, fields) {
        const res = await this.$axios
            .$post('/users/update_password/', fields)
            .then(res => res)
            .catch(err => {
                return err && err.response && err.response.data
                    ? err.response.data
                    : {
                          statusCode: 400,
                          message: 'An error has occurred. Please try again later',
                      };
            });

        if (res.status === 'success') {
            await dispatch('login', res.data);
        }

        if (res.hasOwnProperty('message')) {
            res.message = this.$i18n.t(`error["${res.message}"]`);
        }

        return res;
    },

    /**
     * Регистрация пользователя
     * @param   Object  fields
     * @return  Object
     */
    async register({}, fields) {
        const res = await this.$axios
            .$post('/users/register/', fields)
            .then(res => res)
            .catch(err => {
                return err && err.response && err.response.data
                    ? err.response.data
                    : {
                          statusCode: 400,
                          message: 'An error has occurred. Please try again later',
                      };
            });

        if (res.hasOwnProperty('message')) {
            res.message = this.$i18n.t(`error["${res.message}"]`);
        }

        return res;
    },

    /**
     * Проверка почтового ящика
     * через ввод проверочного кода
     * @param   Object fields
     * @return  String  Текст ошибки или пустая строка
     */
    async confirmEmail({ dispatch }, fields) {
        const res = await this.$axios
            .$post('/users/confirm_email/', fields)
            .then(res => res)
            .catch(err => {
                return err && err.response && err.response.data
                    ? err.response.data
                    : {
                          statusCode: 400,
                          message: 'An error has occurred. Please try again later',
                      };
            });

        if (res.status === 'success') {
            await dispatch('login', res.data);
        }

        if (res.hasOwnProperty('message')) {
            res.message = this.$i18n.t(`error["${res.message}"]`);
        }

        return res;
    },

    /**
     * Запрос кода для подтверждения почты
     * @param   Object  fields
     * @return  String  Текст ошибки или пустая строка
     */
    async sendEmailConfirmationCode({}, fields) {
        const res = await this.$axios
            .$post('/users/send_email_confirmation_code/', fields)
            .then(res => res)
            .catch(err => {
                return err && err.response && err.response.data
                    ? err.response.data
                    : {
                          statusCode: 400,
                          message: 'An error has occurred. Please try again later',
                      };
            });

        if (res.hasOwnProperty('message')) {
            res.message = this.$i18n.t(`error["${res.message}"]`);
        }

        return res;
    },

    /**
     * Вход в систему
     * Получение токена по логину и паролю
     * @param   Object  fields
     * @return  String | Boolean  Текст ошибки или пустая строка
     */
    async customerLogin({ dispatch }, fields) {
        const res = await this.$axios
            .$post('/users/obtain_token/', fields)
            .then(res => res)
            .catch(err => {
                return err && err.response && err.response.data
                    ? err.response.data
                    : {
                          statusCode: 400,
                          message: 'An error has occurred. Please try again later',
                      };
            });

        if (res.status === 'success') {
            await dispatch('login', res.data);
        }

        if (res.hasOwnProperty('message')) {
            if (res.message === 'Email is not confirmed') {
                res.status = 'not-confirmed';
            }

            res.message = this.$i18n.t(`error["${res.message}"]`);
        }

        return res;
    },

    /**
     * Вход в систему
     * @param   String  token
     * @return  void
     */
    async login({ dispatch }, tokens) {
        await dispatch('setTokens', tokens);
    },

    /**
     * Выходим из системы
     * @return  void
     */
    logout({ dispatch }) {
        dispatch('clearToken');
        dispatch('resetStore', null, { root: true });
        const path = this.localePath('index');
        this.$router.push(path);
    },

    /**
     * Устанавливаем токен авторизации
     * @param   String  token
     * @return  void
     */
    setTokens({ commit }, tokens) {
        const { access_token, refresh_token } = tokens;

        if (access_token !== undefined) {
            commit('SET_ACCESS_TOKEN', access_token);
            this.$axios.setToken(access_token, 'Bearer');
            setCookie({ access_token }, { expires: 7 });
        }

        if (refresh_token !== undefined) {
            commit('SET_REFRESH_TOKEN', refresh_token);
            setCookie({ refresh_token }, { expires: 7 });
        }
    },

    /**
     * Отчистка токена авторизации
     * @return  void
     */
    clearToken({ commit }) {
        commit('CLEAR_TOKENS');
        this.$axios.setToken(false);
        removeCookie(['access_token'], { expires: 7 });
        removeCookie(['refresh_token'], { expires: 7 });
    },

    /**
     * Перекидываем клиента на страницу поиска после авторизации
     * @return void
     */
    async proceedToPortal({ dispatch }) {
        await dispatch('user/load', null, { root: true });
        const path = this.localePath({ name: 'project-id', params: { id: 'new' } });
        this.$router.push(path);
    },
};

const storeModule: Module<ModuleState, RootState> = {
    namespaced,
    state,
    getters,
    mutations,
    actions,
};

export default storeModule;
