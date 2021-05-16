<template>
  <b-table-simple table-variant="custom-simple" bordered>
    <b-thead>
      <b-tr>
        <b-th>№</b-th>
        <b-th>Тип</b-th>
        <b-th>Производитель</b-th>
        <b-th>Поставщик</b-th>
        <b-th>Партномер</b-th>
        <b-th>Ресурс</b-th>
        <b-th>Цвет</b-th>
        <b-th>Кол-во</b-th>
        <b-th>Цена за единицу (RUB)</b-th>
        <b-th>Общая цена (RUB)</b-th>
      </b-tr>
    </b-thead>

    <b-tbody>
      <b-tr v-for="(item, i) in items" :key="i">
        <b-td>{{ item.RowNum }}</b-td>
        <b-td>{{ item.Type }}</b-td>
        <b-td>{{ item.Vendor }}</b-td>
        <b-td>{{ item.Supplier }}</b-td>
        <b-td>{{ item.Partnumber }}</b-td>
        <b-td :class="$style['white-space-no-wrap']"
          >{{ format3digit(item.Resourse, 'стр.') }}
        </b-td>
        <b-td>{{ item.Color }}</b-td>
        <b-td>{{ item.Amount }}</b-td>
        <b-td :class="$style['white-space-no-wrap']">
          {{ formatCurrency(item.Price, item.Currency, 'RUB') }}</b-td
        >
        <b-td :class="$style['white-space-no-wrap']">
          {{ formatCurrency(item.Price * item.Amount, item.Currency, 'RUB') }}
        </b-td>
      </b-tr>
    </b-tbody>
    <b-tfoot>
      <b-tr class="font-weight-bold">
        <b-td></b-td>
        <b-td colspan="8" :class="$style['text-left']">Итого:</b-td>
        <b-td :class="$style['white-space-no-wrap']">
          {{
            formatCurrency(
              items.reduce((a, x) => a + x.Amount * x.Price, 0),
              items[0].Currency,
              'RUB'
            )
          }}
        </b-td>
      </b-tr>
    </b-tfoot>
  </b-table-simple>
</template>

<script>
import format3digit from '~/mixins/formatters/format3digit.js';
import currency from '~/mixins/formatters/currency.js';

export default {
  mixins: [format3digit, currency],

  props: {
    items: {
      type: Array,
      default: () => [],
    },
  },

  methods: {
    /**
     * Конвертация цены продукта в выбранную валюту.
     * @param int value - значение
     * @param string fromCurrency - изначальная валюта продукта, из которой производится конвертация
     * @param string toCurrency - валюта, к которой приводим значение.
     */
    formatCurrency(value, fromCurrency, toCurrency) {
      if (!value) return 'Найти';
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
.text-left {
  text-align: left !important;
}

.white-space-no-wrap {
  white-space: nowrap;
}
</style>
