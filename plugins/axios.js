export default function ({ $axios, store, env, route }) {
  $axios.onRequest(config => {
    const token = store.getters['auth/access_token'];
    const isIndexPage = route.name === 'index';

    if (!isIndexPage && env['api-path'] === config.baseURL && token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  });
}
