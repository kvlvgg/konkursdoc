<template>
    <div class="search-table">
        <div :class="$style['table-caption']">
            <div :class="$style['table-info']">
                <div class="font-weight-bold">Результаты поиска</div>
                <div :class="$style['table-summary']">Найдено: {{ search.total }}</div>
            </div>
        </div>

        <!-- no-local-sorting перестает переворачивать иконку сортировки
         не изменяется атрибут aria-sort в th -->

        <b-table
            v-virtual-scroll="loadNextChunk"
            table-variant="custom"
            sticky-header
            hover
            :fields="fields"
            :items="search.products"
            selectable
            select-mode="single"
            show-empty
            no-local-sorting
            :sort-by.sync="search.sortBy"
            :sort-desc="search.sortDesc === '-' ? true : false"
            @sort-changed="sortChanged"
        >
            <template #cell(rownum)="data">
                <div class="font-weight-bold">{{ data.index + 1 }}</div>
            </template>

            <template #cell(partNumber)="data">
                <PartNumberCell :item="data.item" :rownum="data.index" where="search" />
            </template>

            <template #cell(manufacturer)="data">
                {{ data.value }}
            </template>

            <template #cell(provider)="data">
                <SupplierCell :item="data.item" :rownum="data.index" where="search" />
            </template>

            <template #cell(price)="data">
                <!-- Так как в этом проекте на поиске нет currency-switcher, то по дефолту toCurrency="RUB" -->

                <PriceCell
                    :item="data.item"
                    :rownum="data.index"
                    where="search"
                    toCurrency="RUB"
                    @price-inputed="addPosition($event)"
                />
            </template>

            <template #cell(availableQuantity)="data">
                <span :class="data.value == 0 ? $style['color-red'] : ''">
                    {{ format3digit(data.value) }}
                </span>
            </template>

            <template #cell(amount)="data">
                <v-input-number
                    :value="data.value"
                    size="sm"
                    auto-width
                    @input="setProductProperty(data.item, 'amount', $event)"
                    @enter="addPosition(data.item)"
                />
            </template>

            <template #cell(add)="data">
                <b-button size="sm" variant="primary" block @click="addPosition(data.item)">
                    <span :class="$style['icon-plus']"></span>
                </b-button>
            </template>

            <template #empty>
                <div />
                <div v-if="!search.isLoading" :class="$style['table-empty']">
                    <div v-if="search.isFirstRequest">
                        <h2 :class="$style['inner-item']">Начните поиск</h2>
                        <div :class="$style['inner-item']">Заполните поля, расположенные выше, чтобы начать поиск</div>
                    </div>

                    <div v-else>
                        <h2 :class="$style['inner-item']">Нет результата</h2>

                        <div :class="$style['inner-item']">
                            Нам не удалось найти оборудование по Вашему запросу.<br />
                            Попробуйте изменить параметры поиска.
                        </div>
                    </div>
                </div>
            </template>
        </b-table>

        <Loader v-if="search.isLoading" :top="search.products.length === 0 ? '100px' : ''" disableBackground />
    </div>
</template>

<script lang="ts">
import { Mixins, Component, Prop } from 'vue-property-decorator';

import VInputNumber from '@/components/helpers/form/VInputNumber.vue';
import Loader from '@/components/helpers/others/Loader.vue';
import Format3Digit from '@/mixins/formatters/format3digit';

import SupplierCell from '@/components/workspace/project/helpers/cells/SupplierCell.vue';
import PartNumberCell from '@/components/workspace/project/helpers/cells/PartNumberCell.vue';
import PriceCell from '@/components/workspace/project/helpers/cells/PriceCell.vue';

import CreateProjectFormModal from '@/components/workspace/project/modals/CreateProjectFormModal.vue';

import Search from '@/classes/Search';
import SearchProduct from '@/classes/SearchProduct';

@Component({
    components: {
        VInputNumber,
        Loader,
        SupplierCell,
        PartNumberCell,
        PriceCell,
    },
})
export default class SearchTable extends Mixins(Format3Digit) {
    @Prop({ type: Boolean, default: false }) loading!: boolean;
    @Prop({ type: Array, default: null }) conditions!: any; // Array;
    @Prop({ type: Boolean, default: false }) buttonFilterTogglerVisible!: boolean;

    fields = [
        {
            key: 'rownum',
            label: '№',
            sortable: false,
        },
        {
            key: 'partNumber',
            label: 'Партномер',
            sortable: false,
            sortKey: 'part_number',
            tdClass: this.$style['td-partnumber'],
        },
        {
            key: 'manufacturer',
            label: 'Производ.',
            sortable: false,
            sortKey: 'manufacturer',
            tdClass: this.$style['td-vendor'],
        },
        {
            key: 'provider',
            label: 'Поставщик',
            sortable: false,
            sortKey: 'provider',
            tdClass: this.$style['td-supplier'],
        },
        {
            key: 'description',
            label: 'Описание',
            sortable: false,
            tdClass: this.$style['td-description'],
        },
        {
            key: 'price',
            label: 'Цена',
            sortable: true,
            sortKey: 'price_usd',
            tdClass: this.$style['td-price'],
        },
        {
            key: 'availableQuantity',
            label: 'Нал.',
            sortable: true,
            sortKey: 'available_quantity',
        },
        {
            key: 'amount',
            label: 'Кол-во',
            sortable: false,
            class: this.$style['td-amount'],
        },
        {
            key: 'add',
            label: 'Доб.',
            sortable: false,
            class: this.$style['td-add'],
        },
    ];

    get search(): Search {
        return this.$store.getters['project/search'];
    }

    created() {
        this.$store.commit('project/INITIALIZE_SEARCH');
    }

    loadNextChunk() {
        if (this.search.isLoading || this.search.endReached) return;
        this.$store.dispatch('project/loadNextSearchChunk');
    }

    /**
     * Установка контекста сортировки. Реальная сортировка приходит с бэкенда.
     * @param Object ctx контекст сортировки, приходящий из bootstrap-таблицы
     */
    async sortChanged(ctx: { sortBy: string; sortDesc: boolean }) {
        this.$store.commit('project/CLEAR_SEARCH');
        this.$store.commit('project/SET_SEARCH_OPTIONS', { sortBy: ctx.sortBy, sortDesc: ctx.sortDesc ? '-' : '' });
        await this.$store.dispatch('project/loadNextSearchChunk');
    }

    setProductProperty<K extends keyof SearchProduct, V extends SearchProduct[K]>(
        product: SearchProduct,
        key: K,
        value: V
    ) {
        this.$store.commit('project/SET_SEARCH_PRODUCT_PROPERTY', [product, key, value]);
    }

    /**
     * Клик по + (добавление позиции) в таблице
     */
    async addPosition(row: SearchProduct) {
        // TODO Переделать на декоратор после переделки на TS
        if (this.$company.tariffInfo.isRestricted) {
            this.$router.push(this.localePath({ name: 'profile', query: { tab: 'profile', payment: 'true' } }));
            return;
        }

        if (this.$store.getters['project/isNew'] && !(await this.$modal().show<boolean>(CreateProjectFormModal)))
            return;

        while (this.$store.getters['project/isNew']) await new Promise(resolve => setTimeout(resolve, 100));

        await this.$store.dispatch('project/addPositionToSpec', row);
        this.toast({ vendor: row.manufacturer, partnumber: row.partNumber });
    }

    /**
     * Вызов тоста для оповещения действия - Картридж добавлен в спецификацию
     * @param String toaster - расположение тоста
     * @param Object info - какой картридж добавлен { vendor, partnumber }
     * @return void
     */
    toast(info: { vendor: string; partnumber: string }) {
        this.$bvToast.toast(`${info.vendor} ${info.partnumber}`, {
            title: `Добавление картриджа в спецификацию`,
            toaster: 'b-toaster-top-right',
            variant: 'success',
            appendToast: false,
            noCloseButton: false,
            autoHideDelay: 1000,
        });
    }
}
</script>

<style module lang="scss">
@import '~/assets/scss/var.scss';
@import '~/assets/scss/module/icons/plus.scss';

.icon-plus {
    @include icon-plus();
    margin: 0 auto;
}

.table-caption {
    color: #797979;
    display: flex;
    justify-content: space-between;
    font-size: 120%;
    padding-top: 10px;

    @include media-breakpoint-down(xl) {
        padding-top: 8px;
    }

    @include media-breakpoint-down(lg) {
        padding-top: 4px;
    }
}

.table-info {
    display: flex;
    justify-items: flex-start;
    align-items: center;
    width: 50%;

    .table-summary {
        margin-left: 1rem;
        padding: 0.25rem;
        background-color: $secondary-dark;
        color: #efefef;
        border-radius: $border-radius;
        font-size: 80%;
    }
}

.table-right {
    display: flex;
}

.table-empty {
    color: #a6a6a6;
    .inner-item {
        margin: 1rem 0;
    }
}

.type-running-string {
    width: 120px;

    @include media-breakpoint-down(xl) {
        width: 100px;
    }

    @include media-breakpoint-down(lg) {
        width: 80px;
    }
}

// .td-type {
//   width: 120px;
//   text-align: left !important;
// }

.td-partnumber {
    width: 120px;
    text-align: left !important;
}

.td-vendor {
    text-align: left !important;
}

.td-supplier {
    text-align: left !important;
}

.td-description {
    min-width: 25em;
    max-width: 50em;
    padding-top: 5px !important;
    padding-bottom: 5px !important;

    word-wrap: break-word;
    text-align: left !important;
}

.td-price {
    width: 140px;
}

.td-amount {
    width: rem(1);
    white-space: nowrap;

    button {
        padding: 0;
    }
}

.td-add {
    width: 100px;
}

.filter-toggler {
    padding: 0;
    line-height: 1;
    width: 10rem;
    margin-left: 0.5rem;
    font-size: 85%;
    border: 1px solid;
    white-space: nowrap;
    overflow: hidden;
    transition: width 0.2s;

    &.hidden {
        width: 0rem;
        border: none;
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
</style>

<style lang="scss">
@import '~/assets/scss/var.scss';

.search-table {
    position: relative;

    --search-table-font-size: 100%;

    @media (max-width: 1250px) {
        --search-table-font-size: 95%;
    }

    input {
        font-size: var(--search-table-font-size);
    }

    font-size: var(--search-table-font-size);

    .b-table-sticky-header {
        max-height: calc(100vh - 212px) !important;

        @media (max-width: 1199.98px) {
            max-height: calc(100vh - 198px) !important;
        }
    }

    tr td {
        padding: 0 0.8rem;
    }
}
</style>
