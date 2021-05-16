<template>
  <div class="custom-modal-wrapper font-weight-light">
    <button
      class="close custom-close-button"
      type="button"
      @click="$emit('close')"
    >
      <IconClose />
    </button>

    <slot></slot>

    <Loader :visible="isLoaderVisible" />
  </div>
</template>

<script>
import IconClose from '~/components/icons/IconClose.vue';
import Loader from '~/components/helpers/others/Loader.vue';

export default {
  components: {
    IconClose,
    Loader,
  },

  data() {
    return {
      isLoaderVisible: false,
    };
  },

  mounted() {
    this.$children.forEach(x => {
      x.$on('switch-loader', $event => this.switchLoader($event));
    });
  },

  methods: {
    switchLoader(value) {
      this.isLoaderVisible = value;
    },
  },
};
</script>
