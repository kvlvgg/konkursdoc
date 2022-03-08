import { ActionContext, GetterTree, MutationTree, ActionTree, Module } from 'vuex';
import { RootState } from '.';

import Project from '@/classes/Project';
import Search, { SearchOptions, SearchConditions } from '@/classes/Search';
import SearchProduct from '@/classes/SearchProduct';
import Specification from '@/classes/Specification';
import SpecificationProduct, { UpdateProductDTO } from '@/classes/SpecificationProduct';
import Exception from '@/utils/Exception';

export const namespaced = true;

export type ModuleState = ReturnType<
    () => {
        project: Project | null;
        search: Search | null;
        specification: Specification | null;
        _documents: any[];
        _currentDocumentName: null;
    }
>;

export const state = () => ({
    project: null,
    search: null,
    specification: null,
    _documents: [],
    _currentDocumentName: null,
});

export const getters: GetterTree<ModuleState, RootState> = {
    isNew: state => !state.project && !state.specification,

    project: state => state.project,
    search: state => state.search,
    specification: state => state.specification ?? {},
    specificationProducts: state => state.specification?.products ?? [],
    documents: state => state._documents ?? [],

    currentDocument: state => state._documents.find(x => x.name === state._currentDocumentName),
};

export const mutations: MutationTree<ModuleState> = {
    CLEAR_STORE(state) {
        state.project = null;
        state.specification = null;
        state._documents = [];
        state._currentDocumentName = null;
    },

    INITIALIZE_SEARCH(state) {
        state.search = Search.create(state.search);
    },

    CLEAR_SEARCH(state) {
        if (!state.search) return;
        state.search.products = [];
    },

    SET_SEARCH_OPTIONS(state, options: SearchOptions) {
        if (!state.search) return;
        state.search.setOptions(options);
    },

    SET_SEARCH_CONDITIONS(state, conditions: SearchConditions) {
        if (!state.search) return;
        state.search.setConditions(conditions);
    },

    SEARCH_LOAD_NEXT_CHUNK(state, payload) {
        state.search?.addChunk(payload);
    },

    SET_SEARCH_IS_LOADING(state, payload: boolean) {
        if (!state.search) return;
        state.search.isLoading = payload;
    },

    SET_IS_FIRST_REQUEST(state, payload: boolean) {
        if (!state.search) return;
        state.search.isFirstRequest = payload;
    },

    SET_SEARCH_PRODUCT_PROPERTY<K extends keyof SearchProduct, V extends SearchProduct[K]>(
        state: ModuleState,
        [product, key, value]: [product: SearchProduct, key: K, value: V]
    ) {
        product[key] = value;
    },

    LOAD_PROJECT(state, payload) {
        state.project = payload;
        state._documents = payload.documents;
    },

    LOAD_SPECIFICATION(state, payload: Specification) {
        state.specification = payload;
    },

    ADD_POSITION_TO_SPEC(state, payload: SpecificationProduct) {
        state.specification?.products.push(payload);
    },

    UPDATE_SPEC_PRODUCT(state, payload: SpecificationProduct) {
        if (!state.specification) return;
        const index = state.specification.products.findIndex(x => x.id === payload.id);
        if (index === -1) return;
        state.specification.products.splice(index, 1, payload);
    },

    UPDATE_SPEC_PRODUCT_ORDER(state, payload: { product: SpecificationProduct; newIndex: number }) {
        if (!state.specification) return;
        const index = state.specification.products.findIndex(x => x.id === payload.product.id);
        if (index === -1) return;
        state.specification.products.splice(index, 1);
        state.specification.products.splice(payload.newIndex, 0, payload.product);
        state.specification.products.forEach((x, i) => (x.order = i));
    },

    DELETE_SPEC_PRODUCT(state, payload: SpecificationProduct) {
        if (!state.specification) return;
        const index = state.specification.products.findIndex(x => x.id === payload.id);
        if (index === -1) return;
        state.specification.products.splice(index, 1);
    },

    LOAD_DOCUMENT(state, payload) {
        state._currentDocumentName = payload;
    },

    CREATE_DOCUMENT(state, payload) {
        state._documents.unshift(payload);
        if (!state._currentDocumentName) state._currentDocumentName = payload.name;
    },
};

export const actions: ActionTree<ModuleState, RootState> = {
    /**
     * Сбрасываем хранилище
     * @return  void
     */
    clearStore({ commit }) {
        commit('CLEAR_STORE');
    },

    /**
     * Ставим флаг isNew, если проект новый
     * @return  void
     */
    setNewMode({ commit }) {
        commit('SET_NEW_MODE');
    },

    async loadNextSearchChunk({ state, commit }) {
        if (!state.search) return;

        commit('SET_SEARCH_IS_LOADING', true);
        const products = await Search.$loadNextChunk(state.search);
        commit('SET_SEARCH_IS_LOADING', false);

        commit('SET_IS_FIRST_REQUEST', false);

        if (!products) return false;
        commit('SEARCH_LOAD_NEXT_CHUNK', products);
    },

    /**
     * Загружаем проект
     * @return  void
     */
    async loadProject({ state, commit }, payload: string) {
        const [project, specification] = await Promise.all([Project.$load(payload), Specification.$load(payload)]);

        if (project instanceof Exception) return;
        if (specification instanceof Exception) return;

        commit('LOAD_PROJECT', Project.create(project));
        commit('LOAD_SPECIFICATION', Specification.create(specification));
    },

    /**
     * Создаем проект
     * @return  void
     */
    async createProject({}, payload: Pick<Project, 'title' | 'status'>) {
        const result = await Project.$create(payload);
        if (result instanceof Exception) return result;

        this.$router.push(this.localePath({ name: 'project-id', params: { id: result.id.toString() } }));
    },

    /**
     * Добавить позицию в спецификацию
     * @return void
     */
    async addPositionToSpec({ state, commit }, payload: SearchProduct) {
        if (!state.project) return;
        const result = await Specification.$addProduct(payload, state.project.id);
        if (result instanceof Exception) return result;

        commit('ADD_POSITION_TO_SPEC', SpecificationProduct.create(result));
    },

    async updateProductInSpec({ commit }, dto: UpdateProductDTO) {
        const result = await SpecificationProduct.$update(dto);
        if (result instanceof Exception) return result;

        // if ('order' in dto)
        //     commit('UPDATE_SPEC_PRODUCT_ORDER', {
        //         product: SpecificationProduct.create(result),
        //         newIndex: dto.order,
        //     });
        // else
        commit('UPDATE_SPEC_PRODUCT', SpecificationProduct.create(result));
    },

    async deleteProductInSpec({ commit }, payload: SpecificationProduct) {
        const result = await SpecificationProduct.$delete(payload);
        if (result instanceof Exception) return result;

        commit('DELETE_SPEC_PRODUCT', payload);
    },

    /**
     * Загружаем документ
     * @return void
     */
    loadDocument({ commit }, payload) {
        commit('LOAD_DOCUMENT', payload);
    },

    /**
     * Создать новый документ
     * @return void
     */
    createDocument({ state, commit }, payload) {
        const document = {
            items: <any>[],
            createDate: Date.now(),
            documentType: payload.documentType,
            currency: payload.currency,
            name: payload.name,
            extension: payload.documentType === 'Заявка' ? '.docx' : '.xslx',
        };
        state.specification?.products.forEach((x: any) => document.items.push({ ...x }));
        commit('CREATE_DOCUMENT', document);
        return true;
    },

    /**
     * Закэшировать последний клик по строке в таблице поиска
     * Нужен при создании проекта, когда еще нет спецификации и некуда сохранять позиции
     * @return void
     */
    cashLastClickedPosition({ commit }, payload) {
        commit('CASH_LAST_CLICKED_POSITION', { ...payload });
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
