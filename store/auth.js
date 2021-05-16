/* eslint-disable camelcase */

import jsCookie from 'js-cookie';

/**
 * Удаление кук
 * @param   Array   items   ['name1', 'name2', 'name3']
 * @param   Object  options
 * @returns void
 */
function removeCookie(items, options = {}) {
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
function setCookie(items, options = {}) {
  if (typeof items !== 'object') return;
  if (process.env.domain) options.domain = `.${process.env.domain}`;
  Object.keys(items).forEach(key => {
    jsCookie.set(key, items[key], options);
  });
}

export const state = () => ({
  /**
   * Токен пользователя для API
   * @type String
   */
  access_token: null,

  refresh_token: null,
});

export const getters = {
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

export const mutations = {
  /**
   * Устанавливаем токен авторизации
   * @param   String  token
   * @return  void
   */
  SET_ACCESS_TOKEN: (state, token) => (state.access_token = token),

  /**
   * Устанавливаем токен авторизации
   * @param   String  token
   * @return  void
   */
  SET_REFRESH_TOKEN: (state, token) => (state.refresh_token = token),

  /**
   * Отчистка токена авторизации
   * @return  void
   */
  CLEAR_TOKENS(state) {
    state.access_token = null;
    state.refresh_token = null;
  },
};

export const actions = {
  /**
   * Запрос на восстановление пароля
   * @param   Object  fields
   * @return  String  Текст ошибки или пустая строка
   */
  async requestPasswordReset(a = {}, fields) {
    const res = await this.$axios
      .$post('/users/send_password_recovery_code/', fields)
      .then(res => {
        return res;
      })
      .catch(err => {
        return err && err.response && err.response.data
          ? err.response.data
          : {
              statusCode: 400,
              message: 'Произошла ошибка. Повторите попытку позже',
            };
      });

    return res.hasOwnProperty('message') ? res.message : res;
  },

  /**
   * Изменение пароля
   * @param   Object  fields
   * @return  String  Текст ошибки или пустая строка
   */
  async passwordReset({ dispatch }, fields) {
    const res = await this.$axios
      .$post('/users/update_password/', fields)
      .then(res => {
        return res;
      })
      .catch(err => {
        return err && err.response && err.response.data
          ? err.response.data
          : {
              statusCode: 400,
              message: 'Произошла ошибка. Повторите попытку позже',
            };
      });

    if (res.status === 'success') await dispatch('login', res.data);

    return res.hasOwnProperty('message') ? res.message : res;
  },

  /**
   * Регистрация пользователя
   * @param   Object  fields
   * @return  String  Текст ошибки или пустая строка
   */
  async register(a = {}, fields) {
    const res = await this.$axios
      .$post('/users/register/', fields)
      .then(res => {
        return res;
      })
      .catch(err => {
        return err && err.response && err.response.data
          ? err.response.data
          : {
              statusCode: 400,
              message: 'Произошла ошибка. Повторите попытку позже',
            };
      });

    return res.hasOwnProperty('message') ? res.message : res;
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
      .then(res => {
        return res;
      })
      .catch(err => {
        return err && err.response && err.response.data
          ? err.response.data
          : {
              statusCode: 400,
              message: 'Произошла ошибка. Повторите попытку позже',
            };
      });

    if (res.status === 'success') await dispatch('login', res.data);

    return res.hasOwnProperty('message') ? res.message : res;
  },

  /**
   * Запрос кода для подтверждения почты
   * @param   Object  fields
   * @return  String  Текст ошибки или пустая строка
   */
  async sendEmailConfirmationCode(a = {}, fields) {
    const res = await this.$axios
      .$post('/users/send_email_confirmation_code/', fields)
      .then(res => {
        return res;
      })
      .catch(err => {
        return err && err.response && err.response.data
          ? err.response.data
          : {
              statusCode: 400,
              message: 'Произошла ошибка. Повторите попытку позже',
            };
      });

    return res.hasOwnProperty('message') ? res.message : res;
  },

  /**
   * Вход в систему
   * Получение токена по логину и паролю
   * @param   Object  fields
   * @return  String | Boolean  Текст ошибки или пустая строка
   */
  async customerLogin({ dispatch }, fields) {
    const res = await this.$axios
      .$post('/users/obtain_token_pair/', fields)
      .then(res => {
        return res;
      })
      .catch(err => {
        return err && err.response && err.response.data
          ? err.response.data
          : {
              statusCode: 400,
              message: 'Произошла ошибка. Повторите попытку позже',
            };
      });

    if (res.status === 'success') await dispatch('login', res.data);

    return res.hasOwnProperty('message') ? res.message : res;
  },

  /**
   * Вход в систему
   * @param   String  token
   * @return  void
   */
  login({ dispatch }, tokens) {
    dispatch('setTokens', tokens);
  },

  /**
   * Выходим из системы
   * @return  void
   */
  logout({ dispatch }) {
    const path = this.$nuxt.localePath('index');
    dispatch('clearToken');
    dispatch('resetStore', null, { root: true });
    this.$router.push(path);
  },

  /**
   * Устанавливаем токен авторизации
   * @param   String  token
   * @return  void
   */
  setTokens({ commit, state }, tokens) {
    const { access_token, refresh_token } = tokens;

    commit('SET_ACCESS_TOKEN', access_token);
    setCookie({ access_token }, { expires: 7 });

    commit('SET_REFRESH_TOKEN', refresh_token);
    setCookie({ refresh_token }, { expires: 7 });
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
  proceedToPortal() {
    this.$router.push({ name: 'project-id', params: { id: 'new' } });
  },
};
