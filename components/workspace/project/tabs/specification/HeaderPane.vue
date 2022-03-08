<template>
    <div :class="$style['header']">
        <div :class="$style['actions']">
            <div :class="$style['btn']">
                <b-button block variant="outline-primary" @click="showCreateDocumentModal('Заявка')">
                    Сформировать заявку
                </b-button>
            </div>

            <div :class="$style['btn']">
                <b-button block variant="outline-primary" @click="showCreateDocumentModal('Расчёт')">
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
                <div>
                    <div :class="[fontSize(totalCost[currency]), 'font-weight-bold']">
                        {{ currencyJS[currency](totalCost[currency]).format() }}
                    </div>

                    <div :class="$style['font-size-110']">
                        {{ currencyJS[reverseCurrency](totalCost[reverseCurrency]).format() }}
                    </div>
                </div>
            </div>
        </Panel>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Mixins } from 'vue-property-decorator';
import Panel from '@/components/helpers/layout/Panel.vue';
import CreateDocumentModal from '@/components/workspace/project/modals/CreateDocumentModal.vue';
import CurrencyMixin from '@/mixins/formatters/currency';

import { Currency } from '@/classes/Currency';
import Specification from '@/classes/Specification';

@Component({
    components: {
        Panel,
    },
})
export default class SpecificationHeaderPane extends Mixins(CurrencyMixin) {
    @Prop({ type: String, default: null }) currency!: Currency;

    get totalCost() {
        const specification: Specification = this.$store.getters['project/specification'];
        return specification.totalCost ?? { RUB: 0, USD: 0 };
    }

    get reverseCurrency(): Currency {
        return this.currency === 'USD' ? 'RUB' : 'USD';
    }

    /**
     * Возвращет стиль с размером шрифта в зависимости от длины строки стоимости
     * @param Number cost - стоимость
     * @return String
     */
    fontSize(cost: number) {
        const length = cost.toString().length;

        if (length < 7) return this.$style['font-size-200'];
        if (length == 7) return this.$style['font-size-170'];
        return this.$style['font-size-140'];
    }

    /**
     * Открытие модального окна просмотра документа
     * @returns void
     */
    async showCreateDocumentModal(type: 'Заявка' | 'Расчёт') {
        const created = await this.$modal().show<boolean>(CreateDocumentModal, { type, currency: this.currency });
        if (!created) return;

        this.$emit('document-created');
    }
}
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
    background-color: #f8f8f8;
    border-radius: 4px;
    box-shadow: $box-shadow;

    .cost-numbers > div {
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
