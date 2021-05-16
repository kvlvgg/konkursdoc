<template>
  <b-input-group :class="[$style['input-group'], $style[size]]">
    <template #prepend>
      <b-button
        :size="size"
        variant="light"
        :class="$style['btn']"
        @click="onButtonClick('decrement')"
        @keydown.prevent
        @keyup.enter="$emit('enter')"
      >
        -
      </b-button>
    </template>

    <masked-input
      :value="value"
      :size="size"
      class="form-control"
      :class="$style['input']"
      :mask="[/\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/]"
      :guide="false"
      @input="onInput($event)"
      @keyup.enter="$emit('enter')"
    />

    <template #append>
      <b-button
        :size="size"
        variant="light"
        :class="$style['btn']"
        @click="onButtonClick('increment')"
        @keydown.prevent
        @keyup.enter="$emit('enter')"
      >
        +
      </b-button>
    </template>
  </b-input-group>
</template>

<script>
import MaskedInput from 'vue-text-mask';

export default {
  name: 'v-input-number',

  components: {
    MaskedInput,
  },

  props: {
    value: {
      type: [Number, String],
      default: 0,
    },

    /**
     * Размер элементов, по умолчанию обычный
     * - sm
     * - lg (пока отключен в стилях бутстрапа)
     */
    size: {
      type: String,
      default: '',
    },
  },

  methods: {
    /**
     * Изменение количества вручную
     * @return void
     */
    onInput(value) {
      this.$emit('input', value || '0');
    },
    /**
     * Изменение количества с помощью кнопок счетчика
     * @return void
     */
    onButtonClick(operation, event) {
      let value = this.value;
      if (operation === 'decrement' && value > 0) value--;
      if (operation === 'increment') value++;
      this.$emit('input', value.toString());
    },
  },
};
</script>

<style module lang="scss">
@import '~/assets/scss/var.scss';

.input-group {
  width: 140px;

  @include media-breakpoint-down(xl) {
    width: 120px;
  }

  &.sm {
    margin: 0 auto;

    input {
      height: 28px;
      border: 1px solid #dddaed !important;
      font-size: 100%;
    }

    .btn,
    .input {
      border-radius: 4px !important;
      margin: 0 2px;
    }

    // @include media-breakpoint-down(lg) {
    //   button {
    //     height: 1.4rem;
    //     line-height: 1;
    //   }
    // }
  }
}

.btn,
.input {
  border: 1px solid #dddaed;
}

.input {
  text-align: center;
}

.btn {
  box-shadow: none;
}

// .small button,
// .small input {
//   height: 32.8px;
//   line-height: 1;
//   border-radius: 4px !important;
//   margin: 0 2px;
// }

// .small button {
//   background-color: #ffffff;
//   box-shadow: $box-shadow-sm;
// }
</style>
