import { GetterTree, MutationTree, ActionTree, StoreOptions } from 'vuex';
import auth from '@/store/auth';

export const state = () => {};

export type RootState = ReturnType<typeof state>;

export const getters: GetterTree<RootState, RootState> = {};

export const mutations: MutationTree<RootState> = {};

export const actions: ActionTree<RootState, RootState> = {
    async nuxtServerInit(context: any) {
        if ((process as any).server) {
            try {
                await Promise.all([context.dispatch('common/loadVendors')]);
            } catch (e) {
                console.log(e);
            }
        }
    },

    /**
     * Сбрасываем хранилище
     * @return  void
     */
    resetStore({ commit }) {
        commit('landing/RESET_STORE', null, { root: true });
    },
};

const store: StoreOptions<RootState> = {
    state,
    getters,
    mutations,
    actions,
    modules: {
        auth,
    },
};

export default store;
