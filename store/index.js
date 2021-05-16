export const state = () => ({});

export const getters = {};

export const mutations = {};

export const actions = {
  nuxtServerInit() {},

  /**
   * Сбрасываем хранилище
   * @return  void
   */
  resetStore({ commit }) {
    commit('landing/RESET_STORE', null, { root: true });
  },
};
