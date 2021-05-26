export const state = () => ({
  _isNewProject: null,
  _lastClickedPosition: null,
  _lastAddedPosition: null,
  _project: null,
  _specification: [],
  _documents: [],
  _currentDocumentName: null,
});

export const getters = {
  isNewProject: state => state._isNewProject,
  lastAddedPosition: state => state._lastAddedPosition,

  project: state => state._project,
  specification: state => state._specification,
  documents: state => state._documents,

  currentDocument: state =>
    state._documents.find(x => x.name === state._currentDocumentName),
};

export const mutations = {
  CLEAR_STORE(state) {
    state._isNewProject = null;
    // state._lastClickedPosition = null;
    state._project = null;
    state._specification = [];
    state._documents = [];
    state._currentDocumentName = null;
  },

  SET_NEW_MODE(state) {
    state._isNewProject = true;
  },

  LOAD_PROJECT(state, payload) {
    state._project = payload;
    state._specification = payload.specification;
    state._documents = payload.documents;
  },

  ADD_POSITION_TO_SPEC(state, payload) {
    payload.RowNum = state._specification.length + 1;
    state._specification.push(payload);
  },

  REMOVE_POSITION_FROM_SPEC(state, payload) {
    const index = state._specification.findIndex(
      x => x.RowNum === payload.RowNum
    );
    if (index !== -1) state._specification.splice(index, 1);
    state._specification.forEach((x, i) => (x.RowNum = i + 1));
  },

  SYNC_SPEC(state, payload) {
    const deepCopy = [];
    payload.forEach(x => deepCopy.push({ ...x }));
    state._specification.splice(0, state._specification.length, ...deepCopy);
  },

  LOAD_DOCUMENT(state, payload) {
    state._currentDocumentName = payload;
  },

  CREATE_DOCUMENT(state, payload) {
    state._documents.unshift(payload);
    if (!state._currentDocumentName) state._currentDocumentName = payload.name;
  },

  CASH_LAST_CLICKED_POSITION(state, payload) {
    state._lastClickedPosition = payload;
  },

  CASH_LAST_ADDED_POSITION(state, payload) {
    state._lastAddedPosition = payload;
  },
};

export const actions = {
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

  /**
   * Загружаем проект
   * @return  void
   */
  async loadProject({ state, commit, dispatch }, payload) {
    let project = null;

    await this.$axios({
      method: 'get',
      url: '/projects',
      baseURL: process.env['app-path'],
    }).then(res => {
      project = res.data.projects.find(x => x.name.endsWith(payload));
    });

    if (payload === '9999999')
      project = {
        name: '#9999999',
        cartridgeCount: 4,
        assignee: 'Андрей',
        documentsCount: 0,
        createDate: Date.now(),
        modifyDate: Date.now(),
        status: 'В работе',
        specification: [],
        documents: [],
      };

    commit('LOAD_PROJECT', project);
    if (state._lastClickedPosition)
      dispatch('addPositionToSpec', state._lastClickedPosition);
  },

  /**
   * Создаем проект
   * @return  void
   */
  createProject({ commit }, payload) {
    // вызов метода сохранения
    const newProjectId = '9999999';

    this.$router.push({
      name: 'project-id',
      params: { id: newProjectId },
    });
  },

  /**
   * Добавить позицию в спецификацию
   * @return void
   */
  addPositionToSpec({ commit }, payload) {
    const row = { ...payload };
    commit('ADD_POSITION_TO_SPEC', row);
    commit('CASH_LAST_ADDED_POSITION', row);
  },

  /**
   * Удалить позицию из спецификации
   * @return void
   */
  removePositionFromSpec({ commit }, payload) {
    commit('REMOVE_POSITION_FROM_SPEC', payload);
  },

  /**
   * v-model для таблицы спецификации и project.specification
   * @return void
   */
  syncSpec({ commit }, payload) {
    commit('SYNC_SPEC', payload);
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
  createDocument({ commit, getters }, payload) {
    const document = {
      items: [],
      createDate: Date.now(),
      documentType: payload.documentType,
      name: payload.name,
      extension: payload.documentType === 'Заявка' ? '.docx' : '.xslx',
    };
    getters.specification.forEach(x => document.items.push({ ...x }));
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
