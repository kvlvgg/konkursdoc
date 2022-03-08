import Vue from 'vue';

const requireFilter = require.context('../filters', false, /\.(js)$/);
requireFilter.keys().forEach(fileName => {
    const filterConfig = requireFilter(fileName);
    const filterName = fileName
        .split('/')
        .pop()
        .replace(/\.\w+$/, '');

    Vue.filter(filterName, filterConfig.default || filterConfig);
});
