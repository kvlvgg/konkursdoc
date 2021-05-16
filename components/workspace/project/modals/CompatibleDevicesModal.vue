<template>
  <b-modal :id="id" size="sm" hide-header hide-footer centered>
    <div class="modal-content-only font-weight-light">
      <button
        type="button"
        class="close modal-content-btn-close"
        @click="$bvModal.hide(id)"
      >
        <IconClose />
      </button>

      <div class="font-weight-bold custom-modal-title">
        Совместимые устройства
      </div>

      <br />
      <br />

      <b-button :class="$style['button']" variant="link" block>
        Название 1
      </b-button>

      <b-button :class="$style['button']" variant="link" block>
        Среднее название 1
      </b-button>

      <b-button :class="$style['button']" variant="link" block>
        Очень длинное название 1
      </b-button>

      <b-button :class="$style['button']" variant="link" block>
        Название 2
      </b-button>

      <b-button :class="$style['button']" variant="link" block>
        Среднее название 2
      </b-button>

      <b-button :class="$style['button']" variant="link" block>
        Очень длинное название 2
      </b-button>

      <b-button :class="$style['button']" variant="link" block>
        Название 3
      </b-button>

      <b-button :class="$style['button']" variant="link" block>
        Среднее название 3
      </b-button>

      <b-button :class="$style['button']" variant="link" block>
        Очень длинное название 3
      </b-button>
    </div>
  </b-modal>
</template>

<script>
import IconClose from '~/components/icons/IconClose.vue';

export default {
  components: {
    IconClose,
  },
  props: {
    id: {
      type: String,
      default: null,
      requierd: true,
    },
  },
};
</script>

<style module lang="scss">
@import '~/assets/scss/var.scss';

.button {
  padding: 0;
  text-align: left;
}
</style>
