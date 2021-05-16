import show from './show';
import SignupFormModal from '~/components/profile/auth/SignupFormModal.vue';
import SigninFormModal from '~/components/profile/auth/SigninFormModal.vue';

const openedModals = [];

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
        return show.call(this, modalId, ...args);
      };

      /**
       * Открывает модальное окно поверх другого, если уже открыто одно или несколько модальных окон.
       * @param  {...any} args - аргументы для комонента { component, props, events }
       * @returns Promise
       */
      this.showOverlay = (...args) => {
        const modalId = createId();
        return show.call(this, modalId, ...args);
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

      return this;
    };
  },
};
