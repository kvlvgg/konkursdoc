import show from './show';
import SignupFormModal from '~/components/profile/auth/SignupFormModal.vue';
import SigninFormModal from '~/components/profile/auth/SigninFormModal.vue';
import ConfirmModal from '~/components/helpers/modal/ConfirmModal.vue';
import AlertModal from '~/components/helpers/modal/AlertModal.vue';
import ErrorModal from '~/components/helpers/modal/ErrorModal.vue';

const openedModals = [];
let wrapperConfig = {};

function createId() {
    const modalId = `js-modal-${openedModals.length}`;
    openedModals.push(modalId);

    return modalId;
}

export default {
    install(Vue) {
        Vue.prototype.$modal = function () {
            /**
             * Открывает модальное окно с задержкой, присланной из closeAll
             * Возвращает Promise, который зарезолвится внутри компонента
             * @param  {...any} args - аргументы для комонента { component, props, events }
             * @returns Promise
             */
            this.show = async (...args) => {
                const delay = this.closeAll();
                const modalId = createId();

                await new Promise(resolve => setTimeout(() => resolve(), delay));
                const showPromise = show.call(this, modalId, wrapperConfig, ...args);
                wrapperConfig = {};
                return showPromise;
            };

            /**
             * Открывает модальное окно поверх другого, если уже открыто одно или несколько модальных окон.
             * @param  {...any} args - аргументы для комонента { component, props, events }
             * @returns Promise
             */
            this.showOverlay = (...args) => {
                const modalId = createId();
                return show.call(this, modalId, wrapperConfig, ...args);
            };

            /**
             * Если в конфиге null, то обертка не будет создана и ее можно встроить в сам компонент.
             * Пример this.$modal().noWrapper().show(Compnent);
             * @returns this - vue компонент
             */
            this.noWrapper = () => {
                wrapperConfig = null;
                return this;
            };

            /**
             * Конфигурирует обертку.
             * Пример this.$modal().wrapper({ class: this.$style.wrapper }).show(Compnent);
             * @param {Object} config - конфигурация модальной обретки.
             * @returns this - vue компонент
             */
            this.wrapper = config => {
                wrapperConfig = config;
                return this;
            };

            /**
             * Закрываем модальную форму по id
             * @param {*} modalId - id модальной формы, которую закрываем
             */
            this.close = modalId => {
                const index = openedModals.indexOf(modalId);
                openedModals.splice(index, 1);
                this.$bvModal.hide(modalId);
            };

            /**
             * Закрываем все окна и возвращаем задержку, после которой можно будет откыть следующее окно.
             * Возможно его следует доработать в случае множественного закрытия окон.
             * Но пока задачи с такой ситуацией еще не было реализовано.
             * @returns Number delay - задержку
             */
            this.closeAll = () => {
                const count = openedModals.length;
                openedModals.forEach(x => this.$bvModal.hide(x));
                openedModals.splice(0, count);

                return count * 200;
            };

            /**
             * Специальный метод для открытия окна регистрации
             * @returns void
             */
            this.showSignUp = () => this.show(SignupFormModal);

            /**
             * Специальный метод для открытия окна входа
             * @returns void
             */
            this.showSignIn = () => this.show(SigninFormModal);

            /**
             * Стандартное окно подтверждения
             * @returns void
             */
            this.confirm = (...args) => this.show(ConfirmModal, ...args);

            /**
             * Стандартное окно уведомления
             * @returns void
             */
            this.alert = (...args) => this.show(AlertModal, ...args);

            /**
             * Стандартное окно уведомления об ошибке
             * @returns void
             */
            this.error = (...args) => this.showOverlay(ErrorModal, ...args);

            return this;
        };
    },
};
