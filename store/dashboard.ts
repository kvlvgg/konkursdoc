import { GetterTree, MutationTree, ActionTree, Module } from 'vuex';
import { RootState } from '.';

import DashBoard from '@/classes/DashBoard';
import Exception from '@/utils/Exception';

export const namespaced = true;

export type ModuleState = ReturnType<
    () => {
        dashboard: DashBoard | null;
    }
>;

export const state = () => ({
    dashboard: null,
});

export const getters: GetterTree<ModuleState, RootState> = {
    projects: state => state.dashboard?.projects ?? [],
};

export const mutations: MutationTree<ModuleState> = {
    LOAD_DASHBOARD(state, payload: DashBoard) {
        state.dashboard = payload;
    },
};

export const actions: ActionTree<ModuleState, RootState> = {
    async load({ commit }) {
        const result = await DashBoard.load();
        if (result instanceof Exception) return result;

        commit('LOAD_DASHBOARD', DashBoard.create(result));
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
