<template>
  <div :class="$style['multiple-choice-select']">
    <div class="form-control" :class="$style['sm']">
      <input
        :value="
          value.length !== 0
            ? array2ValueAndRestCount(
                options
                  .filter(x => value.some(y => x.value === y))
                  .map(x => x.label)
              )
            : placeholder
        "
        type="text"
        readonly
        :class="$style['input']"
      />

      <span :class="$style['cross']" @click="mutableValue = []">
        <svg
          width="12"
          height="12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M11.25 1.808L10.193.75 6 4.942 1.808.75.75 1.808 4.942 6 .75 10.193l1.058 1.057L6 7.058l4.193 4.192 1.057-1.057L7.058 6l4.192-4.192z"
            fill="#4B4862"
          />
        </svg>
      </span>

      <span
        :class="[$style['arrow'], collapsed ? $style['collapsed'] : '']"
        @click="collapsed ? show() : hide()"
      >
        <svg
          width="12"
          height="6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M.984.984h10.032L6 6 .984.984z" fill="#4B4862" />
        </svg>
      </span>
    </div>

    <div :class="[$style['options'], collapsed ? $style['collapsed'] : '']">
      <div v-for="(option, index) in options" :key="index">
        <b-form-checkbox
          :id="`checkbox-${index}`"
          v-model="mutableValue"
          :value="option.value"
          :class="$style['option']"
          size="sm"
        >
          {{ option.label }}
        </b-form-checkbox>
      </div>
    </div>
  </div>
</template>

<script>
import array2ValueAndRestCount from '~/mixins/formatters/array2ValueAndRestCount.js';

export default {
  name: 'v-multiple-select-input',

  mixins: [array2ValueAndRestCount],

  props: {
    value: {
      type: Array,
      default: () => [],
    },
    options: {
      type: Array,
      default: () => [],
    },
    placeholder: {
      type: String,
      default: 'Не выбрано',
    },
  },

  data() {
    return {
      mutableValue: [],
      collapsed: true,
    };
  },

  watch: {
    mutableValue() {
      this.$emit('input', this.mutableValue);
    },
  },

  mounted() {
    this.mutableValue = Array.from(this.value);
  },

  methods: {
    show() {
      document.addEventListener('mouseup', this.hideOnMouseClickOutSide);
      this.collapsed = false;
    },
    hide() {
      this.collapsed = true;
      document.removeEventListener('mouseup', this.hideOnMouseClickOutSide);
    },
    hideOnMouseClickOutSide(e) {
      let el = e.target;
      while (el !== this.$el && el != null) {
        el = el.parentElement;
      }
      if (!el) this.hide();
    },
  },
};
</script>

<style module lang="scss">
@import '~/assets/scss/var.scss';

.multiple-choice-select {
  position: relative;
}

.sm {
  height: $input-height-sm;
}

.input {
  border: none;
  background-color: $input-bg;
  width: 85%;
  font-size: 90%;
  color: $gray-700;
}

.arrow {
  position: absolute;
  top: 0;
  right: 0.75rem;
  height: 100%;
  display: flex;
  align-items: center;
  cursor: pointer;

  &:not(.collapsed) {
    transform: rotate(180deg);
  }
}

.cross {
  position: absolute;
  top: 0;
  right: 1.8rem;
  height: 100%;
  display: flex;
  align-items: center;
  cursor: pointer;
}

.options {
  position: absolute;
  z-index: 951;
  background-color: $input-bg;
  padding: 0.5rem 1rem;
  width: 100%;
  border: 1px solid #dddaed;
  border-radius: 4px;
  color: $secondary-dark;
  box-shadow: $box-shadow-sm;

  &.collapsed {
    display: none;
  }

  div:not(:last-child) {
    margin-bottom: 0.8rem;
  }
}
</style>
