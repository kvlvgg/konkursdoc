<template>
    <!-- 
    Данные стили не убирать без веской причины.
    Они нужны для Печати расчета.
    Печать понимает только инлайн стили и аттрибуты.

    border="1"
    cellspacing="0"
    cellpadding="0"
    style="border-collapse: collapse" 
    -->
    <b-table-simple
        ref="table-simple"
        border="1"
        cellspacing="0"
        cellpadding="0"
        style="border-collapse: collapse"
        table-variant="custom-simple"
        bordered
    >
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
                <b-th>Цена за единицу ({{ currency }})</b-th>
                <b-th>Общая цена ({{ currency }})</b-th>
            </b-tr>
        </b-thead>

        <b-tbody>
            <b-tr v-for="(item, i) in items" :key="i">
                <b-td>{{ item.order + 1 }}</b-td>
                <b-td>{{ item.catagory }}</b-td>
                <b-td>{{ item.manufacturer }}</b-td>
                <b-td>{{ item.provider }}</b-td>
                <b-td>{{ item.partNumber }}</b-td>
                <b-td :class="$style['white-space-no-wrap']">
                    {{ format3digit(item.resource, 'стр.') }}
                </b-td>
                <b-td>{{ item.color.map(x => x.name).join(', ') }}</b-td>
                <b-td>{{ item.amount }}</b-td>
                <b-td :class="$style['white-space-no-wrap']">
                    {{ getPrice(item).format() }}
                </b-td>
                <b-td :class="$style['white-space-no-wrap']">
                    {{ getPrice(item).multiply(item.amount).format() }}
                </b-td>
            </b-tr>
        </b-tbody>
        <b-tfoot>
            <b-tr class="font-weight-bold">
                <b-td />
                <b-td colspan="8" :class="$style['text-left']">Итого:</b-td>
                <b-td :class="$style['white-space-no-wrap']">
                    <!-- {{ getTotalCost(items, currency) }} -->
                </b-td>
            </b-tr>
        </b-tfoot>
    </b-table-simple>
</template>

<script lang="ts">
import { Mixins, Component, Prop } from 'vue-property-decorator';

import Format3Digit from '@/mixins/formatters/format3digit';
import Currency from '@/mixins/formatters/currency';
import print from '@/utils/print';

import SpecificationProduct from '@/classes/SpecificationProduct';

@Component
export default class Calculation extends Mixins(Format3Digit, Currency) {
    @Prop({ type: Array, default: () => [] }) items!: SpecificationProduct[];
    // TODO заменить на импортируемый тип
    @Prop({ type: String, default: null }) currency!: 'RUB' | 'USD';

    $refs!: {
        'table-simple': HTMLTableElement;
    };

    getPrice(item: SpecificationProduct) {
        return this.currencyJS[this.currency](item.prices[this.currency]);
    }

    Print() {
        print((this.$refs['table-simple'] as any).$el.outerHTML);
    }
}
</script>

<style module lang="scss">
.text-left {
    text-align: left !important;
}

.white-space-no-wrap {
    white-space: nowrap;
}
</style>
