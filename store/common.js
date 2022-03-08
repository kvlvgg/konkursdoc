export const state = () => ({
    _countries: null,
    _exchangeRate: {
        USD: {
            RUB: 0,
        },
        RUB: {
            USD: 0,
        },
    },
    _vendors: null,
    _providers: null,
    _categories: null,
    _colors: null,
});

export const getters = {
    countries: state => state._countries ?? [],
    exchangeRate: state => state._exchangeRate,
    vendors: state => state._vendors ?? [],
    providers: state => state._providers ?? [],
    categories: state => state._categories ?? [],
    colors: state => state._colors ?? [],
};

export const mutations = {
    CLEAR_STORE(state) {
        state._countries = null;
    },
    LOAD_COUNTRIES(state, payload) {
        state._countries = payload;
    },
    LOAD_USD_TO_RUB_EXCHANGE_RATE(state, payload) {
        state._exchangeRate.USD.RUB = payload;
    },
    LOAD_RUB_TO_USD_EXCHANGE_RATE(state, payload) {
        state._exchangeRate.RUB.USD = payload;
    },
    LOAD_VENDORS(state, payload) {
        state._vendors = payload;
    },
    LOAD_PROVIDERS(state, payload) {
        state._providers = payload;
    },
    LOAD_CATEGORIES(state, payload) {
        state._categories = payload;
    },
    LOAD_COLORS(state, payload) {
        state._colors = payload;
    },
};

export const actions = {
    /**
     * Сбрасываем хранилище
     * @returns  void
     */
    clearStore({ commit }) {
        commit('CLEAR_STORE');
    },

    /**
     * Загружаем список стран
     * @returns void
     */
    loadCountries({ commit }) {
        const tasks = [
            this.$axios.$get('/common/country/?limit=100'),
            this.$axios.$get('/common/country/?limit=100&offset=100'),
        ];

        Promise.all(tasks).then(res => {
            const countries = [];
            res.forEach(x => countries.splice(countries.length, 0, ...x.results));

            commit('LOAD_COUNTRIES', countries);
        });
    },

    /**
     * Загружаем курс доллара к рублю
     * @returns void
     */
    loadExchangeRate({ commit }) {
        const axios = this.$axios.create();
        axios.setToken(false);
        axios({
            method: 'get',
            url: '/daily_json.js',
            baseURL: 'https://www.cbr-xml-daily.ru',
        }).then(res => {
            const rate = res.data.Valute.USD.Value;
            const USDtoRUB = rate;
            const RUBtoUSD = Math.round((1 / rate) * 1000000) / 1000000;

            commit('LOAD_USD_TO_RUB_EXCHANGE_RATE', USDtoRUB);
            commit('LOAD_RUB_TO_USD_EXCHANGE_RATE', RUBtoUSD);
        });
    },

    /**
     * Загружаем производителей
     * @returns void
     */
    loadVendors({ commit }) {
        const vendors = [];
        this.$axios.$get('/products/manufacturer/all').then(res => {
            res.results.forEach(x => vendors.push(x));
            commit('LOAD_VENDORS', vendors);
        });
    },

    /**
     * Загружаем поставщиков
     * @returns void
     */
    loadProviders({ commit }) {
        const providers = [];
        this.$axios.$get('/products/provider/all').then(res => {
            res.results.forEach(x => providers.push(x));
            commit('LOAD_PROVIDERS', providers);
        });
    },

    /**
     * Загружаем категории товаров
     * @returns void
     */
    loadCategories({ commit }) {
        const tasks = [
            this.$axios.$get('/products/category/?limit=100'),
            this.$axios.$get('/products/category/?limit=100&offset=100'),
        ];

        Promise.all(tasks).then(res => {
            const categories = [];
            res.forEach(x => categories.splice(categories.length, 0, ...x.results));

            commit('LOAD_CATEGORIES', categories);
        });
    },

    /**
     * Загружаем цвета
     * @returns void
     */
    loadColors({ commit }) {
        const colors = [];
        this.$axios.$get('/products/color/?limit=100').then(res => {
            res.results.forEach(x => colors.push(x));
            commit('LOAD_COLORS', colors);
        });
    },
};
