<template>
  <div class="font-weight-light">
    <div class="font-weight-bold custom-modal-title">Поиск цены</div>

    <div class="custom-form-message">
      Мы не смогли найти стоимость этой<br />
      позиции. Вы можете произвести поиск<br />
      вручную или указать цену.
    </div>

    <b-button block :class="$style['yandex-button']" @click="goToYandexMarket">
      <div>
        <div>Найти цену в Yandex Market</div>
        <div><IconSearch /></div>
      </div>
    </b-button>

    <b-form-group label="Ввод цены в ручную">
      <masked-input
        v-model="price"
        class="form-control"
        :mask="createMask"
        :guide="true"
        :placeholder="price && price.length === 0 ? '_' : '0 ₽'"
      />
    </b-form-group>

    <div>
      <b-button
        block
        variant="primary"
        class="custom-modal-button"
        @click="save"
      >
        Сохранить
      </b-button>
    </div>
  </div>
</template>

<script>
import MaskedInput from 'vue-text-mask';
import IconSearch from '~/components/icons/IconSearch.vue';

export default {
  components: {
    MaskedInput,
    IconSearch,
  },
  props: {
    resolve: {
      type: Function,
      default: null,
    },
    vendor: {
      type: String,
      default: null,
    },
    partNumber: {
      type: String,
      default: null,
    },
  },
  data() {
    return {
      price: '',
    };
  },
  methods: {
    /**
     * Парсим результат, резолвим ответ, закрываем модалку.
     * @returns
     */
    save() {
      // Все ради того, чтобы вернуть цену в центах или копейках.
      let price = this.price.replace(/[^\d.]/g, '') || 0;
      price = parseFloat(price).toFixed(2);
      price = price.replace(/[^\d]/g, '') || 0;
      price = parseInt(price);

      this.resolve(price);
      this.$emit('close');
    },
    /**
     * Открывает страницу Яндекс маркета
     * с данными Производителем и Партномером
     */
    goToYandexMarket() {
      window.open(
        `https://market.yandex.ru/search?text=${this.vendor}%20${this.partNumber}`,
        '_blank'
      );
    },
    /**
     * Маска для Input
     * @param value
     * @returns regexp
     */
    createMask(value) {
      const thousandsSeparatorSymbol = ' ';
      const decimalSymbol = '.';
      const currencySymbol = '₽';
      const integerLimit = 7;

      const validatedValue = value.replace(/[^\d^.]/gi, '');
      const indexOfDecimalSymbol = validatedValue.indexOf(decimalSymbol);

      const integer =
        indexOfDecimalSymbol === -1
          ? validatedValue
          : validatedValue.slice(0, indexOfDecimalSymbol);

      const integerLength =
        integer.length <= integerLimit ? integer.length : integerLimit;

      const mask = [];
      for (let i = 0; i < integerLength; i++) {
        if (i !== 0 && i % 3 === 0) mask.unshift(thousandsSeparatorSymbol);
        i === integerLength - 1 ? mask.unshift(/[1-9]/) : mask.unshift(/\d/);
      }

      if (indexOfDecimalSymbol !== -1)
        mask.splice(mask.length, 0, ...[/[.]/, /\d/, /\d/]);

      mask.splice(mask.length, 0, ...[' ', currencySymbol]);

      return mask;
    },
  },
};
</script>

<style module lang="scss">
@import '~/assets/scss/var.scss';

.yandex-button {
  background-color: #ffdb4d;
  border-color: #ffdb4d;
  color: #000028;

  div {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  svg {
    fill: #000028;
  }
}
</style>
