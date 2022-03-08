<template>
    <section
        id="services-block"
        v-lazy:background-image="'/images/landing/services/bg-services.jpg'"
        :class="$style.services"
    >
        <div class="container">
            <Title title="Услуги и сервисы" subtitle="Попробуйте ителектуальный подбор расходных материалов" />

            <form novalidate :class="$style.control_header" @submit.prevent="find">
                <div :class="$style.control_header_item">
                    <b-input
                        v-model="equipment"
                        type="text"
                        placeholder="Поиск"
                        @change="getCurrentManufacturers"
                    ></b-input>
                </div>

                <div :class="$style.control_header_item">
                    <v-select-input
                        v-model="manufacturerId"
                        size="sm"
                        clearable
                        placeholder="Все производители"
                        :options="manufacturerSelectOptions"
                    ></v-select-input>
                </div>

                <div :class="[$style.control_header_item, $style['control_header_checkbox-item']]">
                    <b-form-checkbox v-model="isInStock" value="1" unchecked-value="0"> В наличии </b-form-checkbox>
                </div>

                <!-- <div :class="$style.control_header_item">
          <b-input
            v-model="cartridge"
            :disabled="!!equipment"
            type="text"
            placeholder="По наименованию оборудования"
          ></b-input>
        </div> -->

                <div :class="$style.control_header_btn">
                    <b-button type="submit" block variant="gr-primary">Найти</b-button>
                </div>
            </form>

            <div :class="$style.content">
                <div class="services-table">
                    <div :class="$style.table_caption">
                        <div :class="$style.table_info">
                            <h4>Результаты поиска</h4>
                            <div :class="$style.total">Найдено: {{ totalFound }}</div>
                        </div>
                    </div>

                    <b-table
                        v-virtual-scroll="lazyLoadOptions"
                        table-variant="custom"
                        sticky-header
                        hover
                        :fields="fields"
                        :items="cartridges"
                        selectable
                        select-mode="single"
                        show-empty
                        empty-text=""
                        no-local-sorting
                        :class="$style.table"
                        :sort-by.sync="sortBy"
                        :sort-desc="sortDesc === '-' ? true : false"
                        @sort-changed="sortChanged"
                    >
                        <template #cell(RowNum)="data">
                            <div class="font-weight-bold">{{ data.value }}</div>
                        </template>

                        <!-- <template #cell(Type)="data">
              <RunningString
                :value="data.value"
                :class="$style.type_running_string"
              />
            </template> -->

                        <template #cell(Partnumber)="data">
                            <PartNumberCell :item="data.item" where="search" />
                        </template>

                        <template #cell(Vendor)="data">
                            {{ data.value }}
                        </template>

                        <template #cell(Supplier)="data">
                            <SupplierCell :item="data.item" where="search" />
                        </template>

                        <template #cell(Description)="data">
                            <TextLimit
                                :text="data.value"
                                :chars="98"
                                moreBtn
                                @click:more="openDescription(data.value)"
                            />
                        </template>

                        <!-- <template #cell(Resourse)="data">
              <ResourseCell
                :isCustomResourse="data.item.IsCustomResourse"
                :resourse.sync="data.item.Resourse"
                :resourseMeasure.sync="data.item.ResourseMeasure"
                @enter="addPosition(data.item)"
              />
            </template>

            <template #cell(Color)="data">
              {{ data.value }}
            </template> -->

                        <template #cell(Price)="data">
                            <PriceCell :item="data.item" where="search" toCurrency="RUB" />
                        </template>

                        <!-- <template #cell(InStock)="data">
        <span :class="data.value == 0 ? $style['color-red'] : ''">
          {{ data.value }}
        </span>
      </template> -->

                        <template #cell(Amount)="data">
                            <v-input-number
                                v-model="data.item[data.field.key]"
                                size="sm"
                                auto-width
                                @enter="addPosition(data.item)"
                            />
                        </template>

                        <!-- <template #cell(Add)="data">
        <b-button
          size="sm"
          variant="primary"
          block
          @click="addPosition(data.item)"
        >
          <span :class="$style['icon-plus']"></span>
        </b-button>
      </template> -->

                        <template #empty>
                            <div v-if="!lazyLoadOptions.loadingInProgress" :class="$style.table_empty">
                                <template v-if="isFirstRequest">
                                    <h2 :class="$style.inner_item">Начните поиск</h2>
                                    <div :class="$style.inner_item">
                                        Заполните поля, расположенные выше, чтобы начать поиск
                                    </div>
                                </template>
                                <template v-else>
                                    <h2 :class="$style.inner_item">Нет результата</h2>
                                    <div :class="$style.inner_item">
                                        Нам не удалось найти оборудование по Вашему запросу.<br />
                                        Попробуйте изменить параметры поиска или добавьте позицию в ручную.
                                    </div>
                                </template>
                            </div>
                        </template>
                    </b-table>

                    <Loader v-if="lazyLoadOptions.loadingInProgress" :top="cartridges.length === 0 ? '100px' : ''" />
                </div>
            </div>

            <div :class="$style.control_footer">
                <b-button
                    :class="$style.control_footer__action"
                    variant="outline-primary"
                    @click="$modal().showSignUp()"
                    >Сформировать общий расчёт</b-button
                >
                <b-button
                    :class="$style.control_footer__action"
                    variant="outline-primary"
                    @click="$modal().showSignUp()"
                    >Сформировать расчёт по поставщикам</b-button
                >
            </div>
        </div>
    </section>
</template>

<script>
import Title from '~/components/landing/local/Title.vue';

import VInputNumber from '~/components/helpers/form/VInputNumber.vue';
import VSelectInput from '~/components/helpers/form/VSelectInput.vue';
import Loader from '~/components/helpers/others/Loader.vue';
import DescriptionModal from '~/components/landing/local/DescriptionModal.vue';

import SupplierCell from '~/components/workspace/project/helpers/cells/SupplierCell.vue';
import PartNumberCell from '~/components/workspace/project/helpers/cells/PartNumberCell.vue';
// import ResourseCell from '~/components/workspace/project/helpers/cells/ResourseCell.vue';
import PriceCell from '~/components/workspace/project/helpers/cells/PriceCell.vue';
// import RunningString from '~/components/workspace/project/helpers/others/RunningString.vue';
import TextLimit from '~/components/helpers/others/TextLmit.vue';

export default {
    components: {
        Title,

        VInputNumber,
        VSelectInput,
        Loader,

        SupplierCell,
        PartNumberCell,
        // ResourseCell,
        PriceCell,
        // RunningString,
        TextLimit,
    },

    data() {
        return {
            cartridges: [],

            equipment: '',
            manufacturers: [],
            currentManufacturersIds: [],
            sortBy: 'price',
            sortDesc: '',

            isFirstRequest: true,
            fields: [],
            lazyLoadOptions: {},
            totalFound: 0,
            limit: 30,
            offset: 0,

            isInStock: 0,
            manufacturerId: null,
        };
    },
    computed: {
        manufacturerSelectOptions() {
            let manufacturers = [];

            if (this.currentManufacturersIds.length > 0) {
                manufacturers = this.manufacturers.filter(elem => this.currentManufacturersIds.includes(elem.id));
            } else {
                manufacturers = this.manufacturers;
            }

            return manufacturers.map(elem => ({
                label: elem.name,
                value: elem.id,
            }));
        },
    },

    watch: {
        '$route.query.equipment': {
            handler(newValue) {
                if (newValue && newValue.length) {
                    this.equipment = newValue;
                    this.find();
                }
            },
            immediate: true,
        },
    },

    created() {
        const queryEquipment = this.$route.query.equipment || undefined;
        const queryCartridge = this.$route.query.cartridge || undefined;
        const queryIsInStock = this.$route.query.isInStock || undefined;
        const queryManufacturerId = this.$route.query.manufacturerId || undefined;

        if (queryEquipment) this.equipment = queryEquipment;
        if (queryCartridge) this.cartridge = queryCartridge;
        if (queryIsInStock) this.isInStock = queryIsInStock;
        if (queryManufacturerId) this.manufacturerId = queryManufacturerId;

        this.fields = [
            {
                key: 'RowNum',
                label: '№',
                sortable: false,
            },
            {
                key: 'Partnumber',
                label: 'Партномер',
                sortable: false,
                tdClass: this.$style.td_partnumber,
            },
            {
                key: 'Vendor',
                label: 'Производитель',
                sortable: true,
                sortKey: 'manufacturer',
                tdClass: this.$style.td_vendor,
            },
            {
                key: 'Supplier',
                label: 'Поставщик',
                sortable: true,
                sortKey: 'provider',
                tdClass: this.$style.td_supplier,
            },
            {
                key: 'Description',
                label: 'Описание',
                sortable: false,
                tdClass: this.$style.td_description,
            },
            {
                key: 'Price',
                label: 'Цена',
                sortable: true,
                sortKey: 'price',
                tdClass: this.$style.td_price,
            },
            // {
            //   key: 'InStock',
            //   label: 'Нал.',
            //   sortable: true,
            //   sortKey: 'available_quantity',
            // },
            {
                key: 'AvailableQuantity',
                label: 'Нал.',
                sortable: true,
                sortKey: 'available_quantity',
            },
            // {
            //   key: 'Add',
            //   label: 'Добавл.',
            //   sortable: false,
            //   class: this.$style['td_add'],
            // },
        ];

        this.lazyLoadOptions = {
            items: this.cartridges,
            requestFunc: this.reqCartridges,
            endReached: false,
            loadingInProgress: false,
        };

        this.getManufacturers();
    },

    methods: {
        /**
         * Отчищаем таблицу с результатами
         * @return  void
         */
        clearTable() {
            this.totalFound = 0;
            this.offset = 0;
            this.cartridges.splice(0, this.cartridges.length);
            this.lazyLoadOptions.endReached = false;
        },

        /**
         * Поиск через кнопку "найти"
         * @return  void
         */
        find() {
            this.clearTable();
            this.reqCartridges();
        },

        /**
         * Поиск картриджей
         * @return  void
         */
        reqCartridges() {
            const query = [];

            if (this.equipment) query.push(`part_number=${this.equipment}`);
            if (this.cartridge) query.push(`description=${this.cartridge}`);
            if (this.manufacturerId) {
                query.push(`manufacturer_id=${this.manufacturerId}`);
            }

            query.push(`available_quantity_min=${this.isInStock}`);
            query.push(`limit=${this.limit}`);
            query.push(`offset=${this.offset}`);
            query.push(`ordering=${this.sortBy}`);

            this.lazyLoadOptions.loadingInProgress = true;

            this.$axios.$get(`/products/product/?${query.join('&')}`).then(res => {
                const items = res.results.map((item, index) => {
                    const priceInRUB = item.prices?.find(x => x.currency.alpha3 === 'RUB');
                    const priceInUSD = item.prices?.find(x => x.currency.alpha3 === 'USD');

                    return {
                        Id: item.id,
                        RowNum: this.offset + index + 1,
                        Country: 'Китай',
                        Amount: '1',
                        // Add: 'Добавление',
                        Type: item.category.name,
                        Vendor: item.manufacturer.name,
                        Partnumber: item.part_number,
                        Supplier: item.provider.name,
                        Conversion: item.provider.conversion,
                        IsCustomResourse: item.resource === 0, // Если ресурс пришел с 0, то позволить пользователю указывать в ресурсе свои числа.
                        Resourse: item.resource,
                        ResourseMeasure: item.resource_unit,
                        Color: item.color.map(x => x.name).join(', '),
                        Percent: item.filling.toString(),
                        Prices: {
                            RUB: priceInRUB && priceInRUB.price,
                            USD: priceInUSD && priceInUSD.price,
                        },
                        // InStock: item.available_quantity,
                        PriceUpdateDate: item.updated_at,
                        Currency: 'RUB',
                        Description: item.description,
                        AvailableQuantity: item.available_quantity,
                    };
                });

                this.cartridges.splice(this.cartridges.length, 0, ...items);

                if (res.results.length < this.limit) this.lazyLoadOptions.endReached = true;

                this.lazyLoadOptions.loadingInProgress = false;
                this.isFirstRequest = false;
                this.totalFound = res.count;
                this.offset += this.limit;
            });
        },

        sortChanged(ctx) {
            this.sortBy = ctx.sortBy ? ctx.sortBy : 'price';
            this.sortDesc = ctx.sortDesc ? '-' : '';

            this.clearTable();
            this.reqCartridges();
        },

        async getManufacturers() {
            const { results } = await this.$axios.$get('/products/manufacturer/all');
            this.manufacturers = results;
        },

        async getCurrentManufacturers() {
            if (!this.equipment || this.equipment === '') return (this.currentManufacturersIds = []);

            const { manufacturer } = await this.$axios.$get(`/products/product-filters?part_number=${this.equipment}`);
            this.currentManufacturersIds = manufacturer.map(elem => elem.manufacturer_id);
        },

        openDescription(text) {
            this.$modal().show(DescriptionModal, { text });
        },
    },
};
</script>

<style module lang="scss">
@import '~/assets/scss/var.scss';
// @import '~/assets/scss/module/icons/plus.scss';

.services {
    padding: rem(70) 0 rem(80);
    background-repeat: no-repeat;
    background-position: left top;
    background-size: cover;
}

.control_header {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    margin-top: 40px;
}

.control_header_item {
    flex: 1 1;
}
.control_header_item ~ .control_header_item {
    margin-left: 14px;
}
.control_header_checkbox-item {
    max-width: max-content;
}

.control_header_btn {
    flex: 1 1 14%;
    max-width: 14%;
    margin-left: 14px;
}

.content {
    width: 100%;
    min-height: rem(205);
    background-color: #e5e5e5;
    border: rem(1) solid $secondary-lighter;
    border-radius: rem(4);
    padding: rem(4) rem(8) 0;
    margin: rem(30) 0;
}

.control_footer {
    display: flex;
    justify-content: center;
}
.control_footer__action {
    min-width: 20em;
}
.control_footer__action ~ .control_footer__action {
    margin-left: 20px;
}

/////////////////////////////////

// .icon-plus {
//   @include icon-plus();
//   margin: 0 auto;
// }

.table {
    tr:not(:global(.b-table-empty-row)) {
        height: rem(38);
    }
}

.table_caption {
    color: #797979;
    display: flex;
    justify-content: space-between;
    font-size: 120%;
    padding-top: rem(10);

    @include media-breakpoint-down(xl) {
        padding-top: rem(8);
    }

    @include media-breakpoint-down(lg) {
        padding-top: rem(4);
    }
}

.table_info {
    display: flex;
    justify-items: flex-start;
    align-items: center;
    width: 50%;
}

.total {
    margin-left: 1rem;
    padding: 0.25rem;
    background-color: $secondary-dark;
    color: #efefef;
    border-radius: $border-radius;
    font-size: 80%;
}

.table_empty {
    color: #a6a6a6;
}

.inner_item {
    margin: 1rem 0;
}

.type_running_string {
    width: rem(120);

    @include media-breakpoint-down(xl) {
        width: rem(100);
    }

    @include media-breakpoint-down(lg) {
        width: rem(80);
    }
}

.td_type {
    width: rem(120);
    text-align: left !important;
}

.td_vendor {
    text-align: left !important;
}

.td_supplier {
    text-align: left !important;
}

.td_partnumber {
    width: rem(120);
    text-align: left !important;
}
.td_description {
    min-width: rem(200);
    max-width: rem(250);
    padding-top: 5px !important;
    padding-bottom: 5px !important;

    line-height: 20px;
    word-wrap: break-word;
    text-align: left !important;
}

// .td_resourse {
//   min-width: rem(140);
//   width: rem(140);

//   @include media-breakpoint-down(xl) {
//     min-width: rem(130);
//     width: rem(130);
//   }

//   @include media-breakpoint-down(lg) {
//     min-width: rem(114);
//     width: rem(114);
//   }

//   input {
//     height: rem(28);

//     @include media-breakpoint-down(xl) {
//       height: rem(24);
//     }

//     @include media-breakpoint-down(lg) {
//       height: rem(22);
//     }
//   }
// }

// .td_color {
//   text-align: left !important;
// }

.td_price {
    width: rem(38);
}

.td_amount {
    width: rem(1);
    white-space: nowrap;

    button {
        padding: 0;
    }
}

// .td_add {
//   width: 100px;
// }

// .color-red {
//   color: #fb0000;
// }

.container-overflow {
    white-space: nowrap;
    text-overflow: ellipsis;
}
</style>

<style lang="scss">
.services-table {
    position: relative;

    --services-table-font-size: 100%;

    @media (max-width: 1250px) {
        --services-table-font-size: 95%;
    }

    input {
        font-size: var(--services-table-font-size);
    }

    font-size: var(--services-table-font-size);

    .b-table-sticky-header {
        max-height: rem(380) !important;
    }

    tr td {
        padding: 0 rem(12);
    }
}
</style>
