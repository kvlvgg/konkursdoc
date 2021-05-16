<template>
  <div class="phone-input-wrapper">
    <masked-input
      :id="id"
      ref="input"
      v-model="phone"
      type="text"
      :name="id"
      autocomplete="off"
      class="form-control phone-input"
      :class="stateClass"
      :state="state"
      :mask="[
        '+',
        '7',
        ' ',
        '(',
        /\d/,
        /\d/,
        /\d/,
        ')',
        ' ',
        /\d/,
        /\d/,
        /\d/,
        '-',
        /\d/,
        /\d/,
        '-',
        /\d/,
        /\d/,
      ]"
      :guide="true"
      :keepCharPositions="false"
      :showMask="true"
      @click="onClick"
      @blur="onBlur"
      @focus="onFocus"
      @input="onInput"
    ></masked-input>

    <b-form-invalid-feedback>{{ error }}</b-form-invalid-feedback>
  </div>
</template>

<script>
import MaskedInput from 'vue-text-mask';

export default {
  name: 'phone-input',

  components: {
    MaskedInput,
  },

  props: {
    value: {
      type: String,
      default: '',
    },

    state: {
      type: Boolean,
      default: null,
    },

    error: {
      type: String,
      default: '',
    },

    // Имя компонента для уникальности ID
    name: {
      type: String,
      default: '',
    },
  },

  data() {
    return {
      phone: '', // model
      cursorPosition: 1, // позиция курсора для ввода следующего числа
      id: 'phone-input', // Уникальный id инпута
    };
  },

  computed: {
    /**
     * Состояние валидации Bootstrap 4
     * @return  Boolean | null
     */
    stateClass() {
      const state = typeof this.state === 'boolean' ? this.state : null;
      if (state === true) return 'is-valid';
      else if (state === false) return 'is-invalid';
      return null;
    },
  },

  watch: {
    value() {
      this.phone = this.value;
    },

    phone(newValue, oldValue) {
      // позиция курсора
      const curPos = this.getCaretPosition(this.$refs.input.$el);
      const valLength = this.$refs.input.$el.value.indexOf('_');

      // можем менять уже введенные символы
      if (valLength != -1 && curPos.start > valLength) {
        this.$nextTick(() => {
          this.setCaretPosition(this.$refs.input.$el, this.cursorPosition);
        });
      }
    },
  },

  created() {
    if (this.name) this.id = `${this.id}-${this.name}`;
    if (this.value) this.phone = this.value.trim();
  },

  methods: {
    /**
     * Нажатие по полю
     * @return  void
     */
    onClick() {
      const curPos = this.getCaretPosition(this.$refs.input.$el);
      if (this.cursorPosition != -1 && curPos.start > this.cursorPosition) {
        this.onFocus();
      }
    },

    /**
     * Убираем фокус
     * @return  void
     */
    onBlur() {
      this.$emit('onBlur');
    },

    /**
     * Фокус
     * @return  void
     */
    onFocus() {
      this.$nextTick(() => {
        this.setCaretPosition(this.$refs.input.$el, this.cursorPosition);
      });
    },

    /**
     * Ввод данных
     * @return  void
     */
    onInput() {
      this.$emit('input', this.phone);
      this.cursorPosition = this.$refs.input.$el.value.indexOf('_');
    },

    /**
     * Получение позиции курсора / выделения
     * @param   Object  ctrl  объект
     * @return  Object
     */
    getCaretPosition(ctrl) {
      if (ctrl.selectionStart || ctrl.selectionStart == '0') {
        return { start: ctrl.selectionStart, end: ctrl.selectionEnd };
      }
      return { start: 0, end: 0 };
    },

    /**
     * Установка курсора в нужную позицию
     * http://blog.vishalon.net/index.php/javascript-getting-and-setting-caret-position-in-textarea/
     * @param   Object   ctrl  объект
     * @param   Integer  pos   позиция курсора
     * @return  void
     */
    setCaretPosition(ctrl, pos) {
      if (ctrl.setSelectionRange) {
        ctrl.focus();
        // FIX для изменения курсора в браузере на android
        setTimeout(function () {
          ctrl.setSelectionRange(pos, pos);
        }, 0);
      }
    },
  },
};
</script>

<style lang="scss">
/* fix для input group */
.phone-input-wrapper {
  position: relative;
  flex: 1 1 auto;
  min-width: 1%;
  margin-bottom: 0;
}

/* для изменения курсора android */
.phone-input {
  -webkit-user-modify: read-write;
}
</style>
