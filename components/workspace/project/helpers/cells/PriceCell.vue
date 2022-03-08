<template>
    <div>
        <div class="font-weight-normal">
            <b-button :id="`popover-${where}-price-${rownum}`" variant="link">
                <!-- @click="onClick" -->
                <div :class="$style['container-overflow']">
                    <span v-if="!$company.tariffInfo.isRestricted">{{ getPrice(item, toCurrency) }}</span>
                    <span v-else>****</span>
                </div>
            </b-button>
        </div>

        <!-- v-if="!$company.tariffInfo.isRestricted && item.Price !== 0" -->
        <b-popover
            v-if="!$company.tariffInfo.isRestricted"
            :target="`popover-${where}-price-${rownum}`"
            placement="bottomleft"
            triggers="hover focus"
            :custom-class="$style['popover']"
            boundary="viewport"
        >
            {{ getPrice(item, 'RUB') }}
            <br /><br />
            {{ getPrice(item, 'USD') }}
            <br /><br />
            {{ `Курс ЦБ +${item.conversion}%` }} <br />
        </b-popover>
    </div>
</template>

<script lang="ts">
import { Mixins, Component, Prop } from 'vue-property-decorator';

import CurrencyMixin from '@/mixins/formatters/currency';
// import SearchingForPricesModal from '@/components/workspace/project/modals/SearchingForPricesModal.vue';

import SearchProduct from '@/classes/SearchProduct';
import { Currency } from '@/classes/Currency';

@Component
export default class PriceCell extends Mixins(CurrencyMixin) {
    @Prop({ type: Object, default: null }) item!: SearchProduct;
    @Prop({ type: String, default: null }) toCurrency!: Currency;
    @Prop({ type: Number, default: null }) rownum!: number;
    @Prop({ type: String, default: null }) where!: String;

    /**
     * По клику по ячейке показываем модальной окно поиска цены
     * @returns
     */
    // TODO еще не реализовано на бэке. Как закочат, прикрутить
    // onClick() {
    //     if (this.item.Price !== 0) return;
    //     const props = {
    //         vendor: this.item.Vendor,
    //         partNumber: this.item.Partnumber,
    //     };

    //     this.$modal().show(SearchingForPricesModal, props).then(this.afterCloseSearchingForPriceModal);
    // }

    /**
     * Обрабатывает данные, присланные модальным окном
     * @returns
     */
    // afterCloseSearchingForPriceModal(price) {
    //     if (!price) return;
    //     const copy = { ...this.item };
    //     copy.Price = price;
    //     copy.Currency = 'RUB';

    //     this.$emit('price-inputed', copy);
    // }

    /**
     * Получение цены продукта в заданной валюте.
     * @param Object item - продукт
     * @param string currency - заданная валюта
     * @returns string - Получаем цену, либо текст.
     */
    getPrice(item: SearchProduct, currency: Currency) {
        const price = item.prices[currency];

        if (price === 0) return 'Найти';
        return this.currencyJS[currency](price).format();
    }
}
</script>

<style module lang="scss">
@import './cell.scss';
</style>
