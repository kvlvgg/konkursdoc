<template>
  <div>
    <div class="font-weight-normal">
      <b-button
        :id="`popover-${where}-price-${item.RowNum}`"
        variant="link"
        @click="onClick"
      >
        <div :class="$style['container-overflow']">
          {{ formatCurrency(item.Price, item.Currency, toCurrency) }}
        </div>
      </b-button>
    </div>
    <b-popover
      v-if="item.Price !== 0"
      :target="`popover-${where}-price-${item.RowNum}`"
      placement="bottomleft"
      triggers="hover focus"
      :custom-class="$style['popover']"
      boundary="viewport"
    >
      {{ formatCurrency(item.Price, item.Currency, 'RUB') }}
      <br /><br />
      {{ formatCurrency(item.Price, item.Currency, 'USD') }}
      <br /><br />
      {{ `Курс ЦБ +${item.Conversion}%` }} <br />
    </b-popover>
  </div>
</template>

<script>
import currency from '~/mixins/formatters/currency.js';
import SearchingForPricesModal from '~/components/workspace/project/modals/SearchingForPricesModal.vue';

export default {
  mixins: [currency],

  props: {
    item: {
      type: Object,
      default: null,
    },

    toCurrency: {
      type: String,
      default: '',
    },

    /**
     * Чтобы давать уникальные id
     */
    where: {
      type: String,
      default: '',
    },
  },

  methods: {
    /**
     * По клику по ячейке показываем модальной окно поиска цены
     * @returns
     */
    onClick() {
      if (this.item.Price !== 0) return;
      const props = {
        vendor: this.item.Vendor,
        partNumber: this.item.Partnumber,
      };

      this.$modal()
        .show(SearchingForPricesModal, props)
        .then(this.afterCloseSearchingForPriceModal);
    },

    /**
     * Обрабатывает данные, присланные модальным окном
     * @returns
     */
    afterCloseSearchingForPriceModal(price) {
      if (!price) return;
      const copy = { ...this.item };
      copy.Price = price;
      copy.Currency = 'RUB';

      this.$emit('price-inputed', copy);
    },

    /**
     * Конвертация цены продукта в выбранную валюту.
     * @param int value - значение
     * @param string fromCurrency - изначальная валюта продукта, из которой производится конвертация
     * @param string toCurrency - валюта, к которой приводим значение.
     */
    formatCurrency(value, fromCurrency, toCurrency) {
      if (value === 0) return 'Найти';
      if (fromCurrency === toCurrency) return this[toCurrency](value).format();

      if (fromCurrency === 'USD' && toCurrency === 'RUB')
        return this[toCurrency](value)
          .multiply(this.$store.getters['common/exchangeRate'].USD.RUB)
          .format();
      if (fromCurrency === 'RUB' && toCurrency === 'USD')
        return this[toCurrency](value)
          .multiply(this.$store.getters['common/exchangeRate'].RUB.USD)
          .format();
    },
  },
};
</script>

<style module lang="scss">
@import './cell.scss';
</style>
