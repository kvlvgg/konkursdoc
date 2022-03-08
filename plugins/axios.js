export default function ({ $axios, store }) {
    $axios.onRequest(config => {
        const token = store.getters['auth/access_token'];
        if (token) config.headers.Authorization = `Bearer ${token}`;

        // // const isIndexPage = route.name === 'index';
        // // const routeName = route.name ? route.name.split('___') : '';
        // // const isIndexPage = routeName[0] === 'index';
        // if (env['api-path'] === config.baseURL && token) {
        //   config.headers.Authorization = `Bearer ${token}`;
        // }
        return config;
    });
}
