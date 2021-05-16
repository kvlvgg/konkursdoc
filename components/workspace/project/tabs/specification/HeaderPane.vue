<template>
  <div :class="$style['header']">
    <div :class="$style['actions']">
      <div :class="$style['btn']">
        <b-button
          block
          variant="outline-primary"
          @click="showCreateDocumentModal('Заявка')"
        >
          Сформировать заявку
        </b-button>
      </div>

      <div :class="$style['btn']">
        <b-button
          block
          variant="outline-primary"
          @click="showCreateDocumentModal('Расчёт')"
        >
          Сформировать расчёт
        </b-button>
      </div>
    </div>

    <Panel
      header="Общая стоимость"
      headerColor="secondary-neutral"
      :class="$style['cost']"
      :headerPadding="10"
      :bodyPadding="0"
    >
      <div :class="$style['cost-numbers']">
        <div
          v-if="currency === 'RUB'"
          :class="[fontSize(totalCost), 'font-weight-bold']"
        >
          {{ format3digit(totalCost, '₽') }}
        </div>

        <div
          v-if="currency === 'USD'"
          :class="[fontSize(totalCost), 'font-weight-bold']"
        >
          {{ format3digit(totalCost / 26.04, '$') }}
        </div>

        <div v-if="currency === 'RUB'" :class="$style['font-size-110']">
          {{ format3digit(totalCost / 26.04, '$') }}
        </div>

        <div v-if="currency === 'USD'" :class="$style['font-size-110']">
          {{ format3digit(totalCost, '₽') }}
        </div>
      </div>
    </Panel>
  </div>
</template>

<script>
import Panel from '~/components/helpers/layout/Panel.vue';
import format3digit from '~/mixins/formatters/format3digit.js';

import CreateDocumentModal from '~/components/workspace/project/modals/CreateDocumentModal.vue';

export default {
  components: {
    Panel,
  },

  mixins: [format3digit],

  props: {
    currency: {
      type: String,
      default: null,
    },
  },

  data() {
    return {
      modals: {
        'create-document': CreateDocumentModal,
      },
    };
  },

  computed: {
    totalCost() {
      return this.$store.getters['project/specification'].reduce(
        (acc, x) => (x.Price ? x.Price * x.Amount + acc : acc),
        0
      );
    },
  },

  methods: {
    /**
     * Возвращет стиль с размером шрифта в зависимости от длины строки стоимости
     * @param Number cost - стоимость
     * @return String
     */
    fontSize(cost) {
      const length = cost.toString().length;

      if (length < 7) return this.$style['font-size-200'];
      if (length == 7) return this.$style['font-size-170'];
      return this.$style['font-size-140'];
    },

    /**
     * Открытие модального окна просмотра документа
     * @returns void
     */
    showCreateDocumentModal(type) {
      this.$modal()
        .show(this.modals['create-document'], { type })
        .then(x => (x ? this.$emit('document-created') : ''));
    },
  },
};
</script>

<style module lang="scss">
@import '~/assets/scss/var.scss';

.header {
  display: flex;
}

.actions {
  flex: 1 0;
  width: 100%;
  margin: 0 16px 10px 0;
  display: flex;
  align-items: center;
  padding: 1rem;
  background-color: #f8f8f8;
  border: 1px solid $secondary-lighter;
  border-radius: 4px;

  .btn {
    flex: 1 1 100%;

    &:first-child {
      margin-right: 1rem;
    }
  }
}

.cost {
  width: 340px;
  background-color: #f8f8f8;
  border-radius: 4px;
  box-shadow: $box-shadow;

  .cost-numbers {
    display: flex;
    justify-content: space-between;
    height: 50%;
    color: $white;
    background-color: $secondary-dark;

    div:first-child {
      padding: 0.5rem 1.5rem;
    }

    div:last-child {
      display: flex;
      align-items: flex-end;
      padding: 0.25rem 1.5rem;
      color: #ddd;
    }
  }
}

@each $font-size in (110, 140, 170, 200) {
  .font-size-#{$font-size} {
    font-size: #{$font-size + '%'};
  }
}
</style>
