import { Store } from 'vuex';

export default async function ({ store }: { store: Store<any> }) {
    if (store.getters['auth/access_token']) await store.dispatch('user/loadCompanyInfo');
}
