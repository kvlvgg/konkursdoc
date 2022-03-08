import { GetterTree, MutationTree, ActionTree, Module } from 'vuex';
import { RootState } from '.';

import User, { UpdatePasswordDTO, UpdateUserInfoDTO } from '@/classes/User';
import Company, { CompanyDTO } from '@/classes/Company';

export const namespaced = true;

export type ModuleState = ReturnType<
    () => {
        user: User | null;
        company: Company | null;
    }
>;

export const state = () => ({
    user: null,
    company: null,
});

export const getters: GetterTree<ModuleState, RootState> = {
    /**
     * Текущий пользователь
     * @return  Object
     */
    user: state => state.user,

    /**
     * Компания пользователя. Тут хранится информация по тарифам
     * @return  Object
     */
    company: state => state.company,
};

export const mutations: MutationTree<ModuleState> = {
    LOAD_CURRENT_USER_INFO(state, payload) {
        state.user = payload;
    },
    LOAD_COMPANY_INFO(state, payload) {
        state.company = payload;
        state.user?.setIsOwner(state.company?.isOwner(state.user?.id) ?? false);
    },
    UPDATE_COMPANY(state, paylaod) {
        state.company?.assignData(paylaod);
    },
};

export const actions: ActionTree<ModuleState, RootState> = {
    async load({ dispatch }) {
        await dispatch('loadCurrentUserInfo');
        await dispatch('loadCompanyInfo');
    },
    /**
     * Загружаем данные текущего пользователя
     * @return Object данные о текущем пользователе
     */
    async loadCurrentUserInfo({ commit }) {
        const user = await User.create();
        if (!(user instanceof User)) return;

        commit('LOAD_CURRENT_USER_INFO', user);
    },

    async updatePassword({ state }, dto: UpdatePasswordDTO) {
        return state.user?.updatePassword(dto);
    },

    async updateInfo({ state, dispatch }, dto: UpdateUserInfoDTO) {
        if (!state.user) return;

        const [success, error] = await state.user?.updateInfo(dto);
        if (success) dispatch('loadCurrentUserInfo');
        return [error];
    },

    async loadCompanyInfo({ commit }) {
        const company = await Company.create();
        if (!(company instanceof Company)) return;

        commit('LOAD_COMPANY_INFO', company);
    },

    async saveCompany({ state, commit }, entity: CompanyDTO) {
        const company = await state.company?.save(entity);
        if (company) commit('UPDATE_COMPANY', company);
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
