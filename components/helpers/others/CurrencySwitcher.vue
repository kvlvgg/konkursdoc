<template>
  <div :class="$style['table-currency-switcher']">
    <span>Цена в {{ value === 'RUB' ? 'рублях' : 'долларах' }}</span>

    <span
      :class="[$style['currency'], value === 'RUB' ? $style['active'] : '']"
      @click="$emit('input', 'RUB')"
    >
      ₽
    </span>

    <span
      :class="[$style['currency'], value === 'USD' ? $style['active'] : '']"
      @click="$emit('input', 'USD')"
    >
      $
    </span>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      default: null,
    },
  },
};
</script>

<style module lang="scss">
@import '~/assets/scss/var.scss';

.table-currency-switcher {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  font-size: 85%;

  .currency {
    border: 1px solid #797979;
    border-radius: $border-radius;
    color: #797979;
    margin-left: 4px;
    padding: 0.15rem 0.3rem;
    font-weight: 600;
    cursor: pointer;
  }

  .currency.active {
    border: 1px solid $primary;
    color: $primary;
  }
}
</style>
