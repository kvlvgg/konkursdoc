<template>
  <div :class="$style['quiz-content']">
    <div class="font-weight-bold" :class="$style['quiz-question']">
      {{ title }}
    </div>

    <div :class="$style['quiz-answers']">
      <div
        v-for="(item, i) in options"
        :key="i"
        class="font-weight-light"
        :class="[
          $style['quiz-answer-item'],
          isSelected(item) ? $style['selected'] : '',
        ]"
        @click="
          !multipleChoice
            ? handleSingleSelect(item)
            : handleMultipleSelect(item)
        "
      >
        <div :class="$style['quiz-answer-item-id']">{{ i + 1 }}</div>
        <div :class="$style['quiz-answer-item-text']">{{ item }}</div>
      </div>
    </div>

    <div :class="$style['quiz-block-control']">
      <b-button
        v-if="!isFirst"
        variant="outline-primary"
        @click="$emit('back')"
      >
        Назад
      </b-button>

      <b-button
        variant="gr-primary"
        :class="[
          $style['quiz-block-control-main'],
          isFirst ? $style['isfirst'] : '',
        ]"
        @click="next"
      >
        Далее
      </b-button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: [String, Array],
      default: '',
    },

    title: {
      type: String,
      default: '',
    },

    options: {
      type: Array,
      default: () => [],
    },

    multipleChoice: {
      type: Boolean,
      default: false,
    },

    isFirst: {
      type: Boolean,
      default: false,
    },

    selectionGroups: {
      type: Array,
      default: () => [],
    },
  },

  computed: {
    /**
     * Возвращает индексы выбранных пунктов в массиве options виде строки.
     * Например, если выбран первый и третий пункт, то результат - "02".
     * Работает только при множественном выборе.
     * @returns String
     */
    selectedIndexes() {
      if (!this.multipleChoice) return '';
      return this.value.reduce((a, v) => (a += this.options.indexOf(v)), '');
    },

    /**
     * Возвращает индекс текущей группы. Если хотя бы один элемент группы выбран,
     * она считается текущей группой.
     * @returns Number
     */
    currentGroupIndex() {
      const regExp = new RegExp(`[${this.selectedIndexes}]`, 'g');
      return this.selectionGroups.findIndex(x => regExp.test(x));
    },
  },

  methods: {
    /**
     * Если выбран ответ на текущий квиз, позволяет перейти к следующему.
     * @returns void
     */
    next() {
      if (typeof this.value === 'string' && !this.value) return;
      if (typeof this.value === 'object' && !this.value.length) return;
      this.$emit('next');
    },

    /**
     * Узнаем, является ли выбранным какой-то ответ
     * @return Boolean
     */
    isSelected(item) {
      return !this.multipleChoice
        ? item === this.value
        : this.value.includes(item);
    },

    /**
     * Обработка клика по ответу в случае одиночного выбора.
     * @returns void
     */
    handleSingleSelect(item) {
      if (this.value !== item) this.$emit('input', item);
      else this.$emit('input', '');
    },

    /**
     * Обрабатываем клик в случае множественного выбора.
     * @returns void
     */
    handleMultipleSelect(item) {
      if (!this.value.includes(item)) this.select(item);
      else this.deselect(item);
    },

    /**
     * Если ответ относится в текущей выбранной группе, добавлем его.
     * Если нет, то убираем выбор у всех элементов и выбирем кликнутый.
     * @returns void
     */
    select(item) {
      const belongs = this.belongsToCurrentGroup(item);

      if (belongs) this.$emit('input', [...this.value, item]);
      else this.$emit('input', [item]);
    },

    /**
     * Убираем ответ, по которому произошел клик.
     * @returns void
     */
    deselect(item) {
      this.$emit(
        'input',
        this.value.filter(x => x !== item)
      );
    },

    /**
     * Проверка на принадлежность к текущей выбранной группе.
     * fasle - если не принадлежит.
     * true - если принадлежит или selectionGroups не переданы (-1 === -1)
     */
    belongsToCurrentGroup(item) {
      const index = this.options.indexOf(item);
      const regExp = new RegExp(`[${index}]`, 'g');

      const groupIndex = this.selectionGroups.findIndex(x => regExp.test(x));
      return groupIndex === this.currentGroupIndex;
    },
  },
};
</script>

<style module lang="scss">
@import '~/assets/scss/var.scss';
@import '~/assets/scss/module/authModal.scss';

.quiz-content {
  margin: 0 auto 30px;
}

.quiz-question {
  font-size: 18px;
  color: #221541;
  margin: 0 0 30px;
  text-align: center;
  text-transform: uppercase;
}

.quiz-answers {
  display: flex;
  flex-direction: column;
  margin: 0 0 30px;
}

.quiz-answer-item {
  display: flex;
  align-items: center;
  color: #221541;
  background-color: $white;
  color: #221541;
  padding: 9px 10px;
  margin: 0 0 30px;
  box-shadow: $box-shadow;
  border-radius: 4px;
  cursor: pointer;

  &:last-child {
    margin-bottom: 0;
  }

  &.selected {
    background-image: linear-gradient(90deg, $primary 0%, $gr-primary 100%);
    color: $white;

    .quiz-answer-item-id {
      background-color: $white;
    }
  }
}

.quiz-answer-item-id {
  flex: 0 0 32px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 32px;
  height: 32px;
  font-size: 16px;
  background-color: #d2cfda;
  color: #26174b;
  border-radius: 50%;
}

.quiz-answer-item-text {
  margin: 0 0 0 1.25rem;
  text-align: left;
}

.quiz-block-control {
  display: flex;
}

.quiz-block-control-main {
  flex: 1 1 auto;
  margin: 0 0 0 1rem;

  &.isfirst {
    flex: none;
    margin: 0 auto;
    width: 75%;
  }
}
</style>
