import Vue from 'vue';
import VueLazyload from 'vue-lazyload';

export default () => {
    Vue.use(VueLazyload, {
        preLoad: 0,
        error: '',
        attempt: 3,
        lazyComponent: true,
        observer: true,
        throttleWait: 500,
    });
};
