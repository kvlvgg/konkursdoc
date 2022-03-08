const getDefaultState = () => ({
    /**
     * Тип клиента
     */
    clientType: 'organizers',
    clientTypeOrganizers: 'organizers',
    clientTypeParticipants: 'participants',
});

export const state = () => getDefaultState();

export const getters = {};

export const mutations = {
    /**
     * Сбрасываем хранилище
     * @return  void
     */
    RESET_STORE(state) {
        state = Object.assign(state, getDefaultState());
    },

    /**
     * Устанавливаем тип клиента
     * @return  void
     */
    SET_CLIENT_TYPE(state, type) {
        state.clientType = type;
    },
};

export const actions = {
    /**
     * Устанавливаем тип клиента
     * @return  void
     */
    setClientType({ commit }, type) {
        commit('SET_CLIENT_TYPE', type);
    },
};
