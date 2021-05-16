<template>
  <div>
    <button type="button" class="close modal-content-btn-close" @click="close">
      <IconClose />
    </button>

    <div class="font-weight-bold custom-modal-title">
      {{ title }}
    </div>

    <div class="font-weight-light custom-form-message">
      {{ message }}
    </div>

    <b-form class="custom-modal-form" autocomplete="off" novalidate>
      <b-form-group>
        <div class="custom-modal-button">
          <b-button block variant="gr-primary" @click="resolvePromise(true)">
            Подтвердить
          </b-button>
        </div>
      </b-form-group>

      <b-form-group>
        <div class="custom-modal-button">
          <b-button
            block
            variant="outline-primary"
            @click="resolvePromise(false)"
          >
            Отмена
          </b-button>
        </div>
      </b-form-group>
    </b-form>
  </div>
</template>

<script>
import IconClose from '~/components/icons/IconClose.vue';

export default {
  components: {
    IconClose,
  },

  props: {
    modalId: {
      type: String,
      default: '',
    },
    title: {
      type: String,
      default: '',
    },
    message: {
      type: String,
      default: '',
    },
    resolve: {
      type: Function,
      default: () => {},
    },
  },

  methods: {
    resolvePromise(value) {
      this.resolve(value);
      this.$bvModal.hide(this.modalId);
    },
    close() {
      this.resolve(false);
      this.$bvModal.hide(this.modalId);
    },
  },
};
</script>

<style></style>
