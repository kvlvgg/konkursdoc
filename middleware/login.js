export default function ({ app, redirect }) {
    if (!app.$auth.loggedIn()) {
        redirect(app.localePath({ name: 'index', query: { mode: 'login' } }));
    }
}
