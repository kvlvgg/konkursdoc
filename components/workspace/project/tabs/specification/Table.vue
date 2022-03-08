<template>
    <div class="specification">
        <div :class="$style['table-caption']">
            <div :class="$style['info']">
                <div class="font-weight-bold">Добавленные расходные материалы</div>
                <div :class="$style['table-summary']">В списке: {{ specification.productTypesCount }}</div>
                <div :class="$style['table-summary']">Всего: {{ specification.productsCount }}</div>
            </div>

            <CurrencySwitcher v-model="currency" />
        </div>

        <b-table-simple table-variant="custom" sticky-header class="prevent-default-hover">
            <b-thead>
                <b-tr>
                    <b-th v-for="field in fields" :key="field.key">
                        <div v-if="field.key === 'Dragger'">
                            <IconDragColumnCaption />
                        </div>

                        <div v-else :class="field.thClass">{{ field.label }}</div>
                    </b-th>
                </b-tr>
            </b-thead>

            <Draggable
                :value="products"
                tag="tbody"
                handle=".custom-table-draggable-handle"
                ghost-class="custom-draggable-rows-ghost"
                chosen-class="custom-draggable-rows-chosen"
                drag-class="custom-draggable-rows-drag"
                easing="cubic-bezier(0.25, 1, 0.5, 1)"
                animation="150"
                @change="setOrder"
                @start="onDragStart"
                @end="onDragEnd"
            >
                <b-tr
                    v-for="(item, i) in products"
                    :key="item.id"
                    @mouseleave="onMouseLeave"
                    @mouseenter="onMouseEnter"
                >
                    <b-td :class="$style['mw-40']">
                        <IconDragHandle />
                    </b-td>

                    <b-td :class="[$style['mw-40'], 'font-weight-bold']" v-text="item.order + 1" />

                    <b-td :class="$style['td-type']">
                        <RunningString :value="item.catagory" :class="$style['type-running-string']" />
                    </b-td>

                    <b-td v-text="item.manufacturer" />

                    <b-td>
                        <SupplierCell :item="item" where="spec" :rownum="i" />
                    </b-td>

                    <b-td :class="$style['td-partnumber']">
                        <PartNumberCell :item="item" where="spec" :rownum="i" />
                    </b-td>

                    <b-td :class="$style['container-overflow']">
                        {{ format3digit(item.resource, item.resourceUnit) }}
                    </b-td>

                    <b-td>
                        {{ item.color.map(x => x.name).join(', ') }}
                    </b-td>

                    <b-td :class="$style['td-percent']">
                        <!-- masked-input помимо очевидной своей роли здесь несет в себе скрытую спонтанную миссию -->
                        <!-- читай комментарий к функции syncSpec. Нужно обязательно учесть это при изменении maskInput -->

                        <b-input
                            v-maska="'#*'"
                            :value="item.filling"
                            @input="setProductProperty(item, 'filling', parseInt($event))"
                        />
                    </b-td>

                    <b-td :class="$style['td-country']">
                        <div :class="$style['country']" @click.stop>
                            <!-- Изменения данного поля еще не реализовано на бэкенд -->
                            <VSelectCountry :value="item.country" size="sm" />
                        </div>
                    </b-td>

                    <b-td>
                        <!-- Изменения данного поля еще не реализовано на бэкенд -->
                        <PriceCell :item="item" where="spec" :toCurrency="currency" :rownum="i" />
                        <!-- @price-inputed="
                                item.Price = $event.Price;
                                item.Currency = $event.Currency;
                                syncSpec($event);
                            " -->
                    </b-td>

                    <b-td :class="{ [$style['color-red']]: item.availableQuantity === 0 }">
                        {{ item.availableQuantity }}
                    </b-td>

                    <b-td :class="$style['td-amount']">
                        <b-input
                            v-maska="'#*'"
                            :value="item.amount"
                            @input="setProductProperty(item, 'amount', parseInt($event))"
                        />
                    </b-td>

                    <b-td>
                        <b-button
                            :class="$style['button-delete']"
                            size="sm"
                            block
                            variant="outline-primary"
                            @click="removePosition(item)"
                        >
                            <IconDelete />
                        </b-button>
                    </b-td>
                </b-tr>
            </Draggable>
        </b-table-simple>
    </div>
</template>

<script lang="ts">
import { Component, Watch, Mixins } from 'vue-property-decorator';
import Format3Digit from '@/mixins/formatters/format3digit';

import Draggable from 'vuedraggable';
import MaskedInput from 'vue-text-mask';
import IconDragColumnCaption from '@/components/icons/table/IconDragColumnCaption.vue';
import IconDragHandle from '@/components/icons/table/IconDragHandle.vue';
import IconDelete from '@/components/icons/dashboard/IconDelete.vue';
import CurrencySwitcher from '@/components/helpers/others/CurrencySwitcher.vue';
import VSelectCountry from '@/components/helpers/form/VSelectCountry.vue';

import SupplierCell from '@/components/workspace/project/helpers/cells/SupplierCell.vue';
import PartNumberCell from '@/components/workspace/project/helpers/cells/PartNumberCell.vue';
import PriceCell from '@/components/workspace/project/helpers/cells/PriceCell.vue';

import RunningString from '@/components/workspace/project/helpers/others/RunningString.vue';

import Specification from '@/classes/Specification';
import SpecificationProduct, { UpdateProductDTO } from '@/classes/SpecificationProduct';

@Component({
    components: {
        Draggable,
        MaskedInput,
        IconDragColumnCaption,
        IconDragHandle,
        IconDelete,
        CurrencySwitcher,
        VSelectCountry,

        PartNumberCell,
        SupplierCell,
        PriceCell,
        RunningString,
    },
})
export default class SpecificationTable extends Mixins(Format3Digit) {
    fields = [
        { key: 'Dragger', label: '' },
        { key: 'RowNum', label: '№' },
        { key: 'Type', label: 'Тип' },
        { key: 'Vendor', label: 'Производитель' },
        { key: 'Supplier', label: 'Поставщик' },
        { key: 'Partnumber', label: 'Партномер' },
        { key: 'Resourse', label: 'Ресурс' },
        { key: 'Color', label: 'Цвет' },
        { key: 'Percent', label: '%' },
        { key: 'Country', label: 'Страна' },
        { key: 'Price', label: 'Цена' },
        { key: 'InStock', label: 'Наличие' },
        {
            key: 'Amount',
            label: 'Кол-во',
            thClass: this.$style['container-overflow'],
        },
        { key: 'Delete', label: 'Удал.' },
    ];

    dragging = false;
    currency = 'RUB';
    timer: number | null = null;
    hoveredItem: HTMLTableRowElement | null = null;

    get specification(): Specification {
        return this.$store.getters['project/specification'];
    }

    get products(): SpecificationProduct[] {
        return this.$store.getters['project/specificationProducts'];
    }

    @Watch('currency')
    onCurrency() {
        this.$emit('currency-switched', this.currency);
    }

    /**
     * Удаляем позицию из списка
     * @param Object позиция
     * @returns void
     */
    removePosition(row: SpecificationProduct) {
        this.$store.dispatch('project/deleteProductInSpec', row);
    }

    setOrder(event: { moved: { element: SpecificationProduct; newIndex: number; oldIndex: number } }) {
        this.$store.commit('project/UPDATE_SPEC_PRODUCT_ORDER', {
            product: event.moved.element,
            newIndex: event.moved.newIndex,
        });
        this.setProductProperty(event.moved.element, 'order', event.moved.newIndex);
    }

    /**
     * Маска, при вводе некорректного значения выбрасывает подряд два события.
     * Чтобы избежать двух запрос на севрер, использваем таймер.
     * К тому же, это поможет избежать множественных запросов, если пользователь
     * вводит данные быстро.
     */
    setProductProperty<K extends keyof UpdateProductDTO, V extends UpdateProductDTO[K]>(
        product: SpecificationProduct,
        key: K,
        value: V
    ) {
        if (this.timer) clearTimeout(this.timer);
        this.timer = window.setTimeout(() => {
            const dto: UpdateProductDTO = { id: product.id, project: product.project, [key]: value };
            this.$store.dispatch('project/updateProductInSpec', dto);
        }, 200);
    }

    /**
     * Hover и drag-and-drop плохо дружат между собой.
     * Это - причина дальнейших плясок с бубном.
     * Приходится использовать не дефолтный hover, а имитировать его классом.
     * Плюс в ручную переставлять его после завершении операции перетаскивания.
     */

    /**
     * Реализация hover. Добавляем класс .spec-table-row-hover,
     * когда мышь внутри строки.
     * @returns void
     */
    onMouseEnter(e: MouseEvent & { target: HTMLTableRowElement }) {
        if (this.dragging) return;
        if (this.hoveredItem) this.removeHoverClass(this.hoveredItem);

        this.addHoverClass(e.target);
        this.hoveredItem = e.target;
    }

    /**
     * Реализация hover. Убираем класс .spec-table-row-hover,
     * когда мышь вне строки.
     * @returns void
     */
    onMouseLeave(e: MouseEvent & { target: HTMLTableRowElement }) {
        if (this.dragging) return;
        this.removeHoverClass(e.target);
    }

    /**
     * На начало перетаскивания удаляем класс .spec-table-row-hover
     * со строки, откуда начали перетаскивать
     * @returns void
     */
    // TODO типизировать event
    onDragStart(e: { item: HTMLTableRowElement }) {
        this.removeHoverClass(e.item);
        this.dragging = true;
    }

    /**
     * На окончание перетаскивания добавляем класс .spec-table-row-hover
     * на строку, куда перетащили. Выключаем this.dragging с задержкой.
     * Если перемещать строки быстро, то класс может неправильно добавиться.
     *
     * @returns void
     */
    // TODO типизировать event
    onDragEnd(e: { item: HTMLTableRowElement }) {
        this.addHoverClass(e.item);

        setTimeout(() => {
            this.dragging = false;
        }, 10);
    }

    /**
     * Добавляет к элементу класс .spec-table-row-hover
     * @returns void
     */
    // TODO типизировать tr
    addHoverClass(tr: HTMLTableRowElement) {
        if (!tr) return;
        tr.classList.add('spec-table-row-hover');
    }

    /**
     * Удаляет к элементу класс .spec-table-row-hover
     * @returns void
     */
    // TODO типизировать tr
    removeHoverClass(tr: HTMLTableRowElement) {
        if (!tr) return;
        tr.classList.remove('spec-table-row-hover');
    }
}
</script>

<style module lang="scss">
@import '~/assets/scss/var.scss';

.table-caption {
    color: #797979;
    display: flex;
    justify-content: space-between;
    font-size: 120%;
    padding-top: 10px;

    .info {
        display: flex;
        align-items: center;
    }

    @include media-breakpoint-down(xl) {
        padding: 8px 4px 0 4px;
    }

    @include media-breakpoint-down(lg) {
        padding: 4px 2px 0 2px;
    }
}

.table-summary {
    padding: 0.25rem;
    background-color: $secondary-dark;
    color: #efefef;
    font-size: 80%;
    border-left: 1px solid $secondary-lighter;
    border-right: 1px solid $secondary-lighter;

    &:nth-child(2) {
        border-top-left-radius: $border-radius;
        border-bottom-left-radius: $border-radius;
        border-left: none;
        margin-left: 1rem;
    }

    &:nth-child(3) {
        border-top-right-radius: $border-radius;
        border-bottom-right-radius: $border-radius;
        border-left: none;
        border-right: none;
    }
}

.button-delete {
    font-size: 120%;
    padding: 0 0 0.25rem 0;

    svg {
        fill: $primary;
    }

    &:hover svg,
    &:focus svg {
        fill: $white;
    }
}

.text-align-left {
    text-align: left !important;
}

.td-partnumber {
    width: 120px;
}

.td-type,
.type-running-string {
    width: 120px;

    @include media-breakpoint-down(xl) {
        width: 100px;
    }

    @include media-breakpoint-down(lg) {
        width: 80px;
    }
}

.td-percent {
    padding: 0.2rem 0.8rem !important;
    width: 30px;

    input {
        width: 30px;
        height: 30px;
        padding: 0;
        text-align: center;
    }
}

.td-country {
    width: 120px;
}

.country {
    padding: 0.2rem;
    max-width: 120px;
}

.td-amount {
    padding: 0.2rem 0.7rem !important;
    width: 70px;

    input {
        height: 30px;
        padding: 0;
        text-align: center;
    }

    @include media-breakpoint-down(xl) {
        padding: 0.2rem 0.5rem !important;
        width: 60px;
    }

    @include media-breakpoint-down(lg) {
        padding: 0.2rem 0.3rem !important;
        width: 40px;
    }
}

.color-red {
    color: #fb0000;
}

.container-overflow {
    white-space: nowrap;
    /* overflow-x: auto; */
    text-overflow: ellipsis;
}

// Для драггера и номера строки, чтобы они всегда были одного размера при любом разрешении
.mw-40 {
    min-width: 40px;
}
</style>

<style lang="scss">
@import '~/assets/scss/var.scss';

// констыль для работы драггера и ховера.
.spec-table-row-hover {
    background-color: $secondary-lightest;
}

.specification {
    .b-table-sticky-header {
        max-height: calc(100vh - 280px) !important;

        @media (max-width: 1399.98px) {
            max-height: calc(100vh - 234px) !important;
        }

        @media (max-width: 1199.98px) {
            max-height: calc(100vh - 208px) !important;
        }
    }

    @media (max-width: 1250px) {
        font-size: 90%;
    }

    tr td:nth-child(3),
    tr td:nth-child(4),
    tr td:nth-child(5),
    tr td:nth-child(6),
    tr td:nth-child(7),
    tr td:nth-child(8) {
        text-align: left !important;
        padding: 0.2rem 0.8rem;
    }

    tr td:last-child {
        padding: 0 1rem;
    }
}
</style>
