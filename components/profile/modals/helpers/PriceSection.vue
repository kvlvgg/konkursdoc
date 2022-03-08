<template>
    <div :class="$style['price-section']">
        <span class="font-weight-bold" :class="$style.price">
            {{ format3digit(price, '₽') }}
        </span>
        / месяц
    </div>
</template>

<script>
import format3digit from '~/mixins/js-mixins/format3digit';

export default {
    mixins: [format3digit],

    props: {
        price: {
            type: Number,
            default: 0,
        },
    },
};
</script>

<style module lang="scss">
.price-section {
    background: #4b4862;
    color: #fff;
    border-radius: rem(4);
    height: rem(53);
    display: flex;
    align-items: center;
    justify-content: center;

    .price {
        font-size: 24px;
    }
}
</style>
