<template>
  <div class="search-table">
    <div :class="$style['table-caption']">
      <div :class="$style['table-info']">
        <div class="font-weight-bold">Результаты поиска</div>

        <div :class="$style['table-summary']">Найдено: {{ totalFound }}</div>
      </div>

      <div :class="$style['table-right']">
        <CurrencySwitcher v-model="currency" />

        <b-button
          :class="[
            $style['filter-toggler'],
            !buttonFilterTogglerVisible ? $style['hidden'] : '',
          ]"
          variant="outline-primary"
          @click="$emit('toggle-filter-on')"
        >
          ⏴Фильтр поиска
        </b-button>
      </div>
    </div>

    <!-- no-local-sorting перестает переворачивать иконку сортировки
         не изменяется атрибут aria-sort в th -->

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
      no-local-sorting
      :sort-by.sync="sortBy"
      :sort-desc="sortDesc === '-' ? true : false"
      @sort-changed="sortChanged"
    >
      <template #cell(RowNum)="data">
        <div class="font-weight-bold">{{ data.value }}</div>
      </template>

      <template #cell(Type)="data">
        <RunningString
          :value="data.value"
          :class="$style['type-running-string']"
        />
      </template>

      <template #cell(Vendor)="data">
        <div>{{ data.value }}</div>
      </template>

      <template #cell(Supplier)="data">
        <SupplierCell :item="data.item" where="search" />
      </template>

      <template #cell(Partnumber)="data">
        <PartNumberCell :item="data.item" where="search" />
      </template>

      <template #cell(Resourse)="data">
        <div v-if="data.value !== 0" :class="$style['container-overflow']">
          {{ format3digit(data.value, data.item.ResourseMeasure) }}
        </div>
      </template>

      <template #cell(Percent)="data">
        <masked-input
          v-model="data.item[data.field.key]"
          class="form-control"
          :class="$style['percent']"
          :mask="[/\d/, /\d/]"
          :guide="false"
        />
      </template>

      <template #cell(Price)="data">
        <PriceCell
          :item="data.item"
          where="search"
          :toCurrency="currency"
          @price-inputed="addPosition($event)"
        />
      </template>

      <template #cell(InStock)="data">
        <span :class="data.value == 0 ? $style['color-red'] : ''">
          {{ data.value }}
        </span>
      </template>

      <template #cell(Country)="data">
        <div :class="$style['country']" @click.stop>
          <VSelectCountry v-model="data.item[data.field.key]" size="sm" />
        </div>
      </template>

      <template #cell(Amount)="data">
        <v-input-number
          v-model="data.item[data.field.key]"
          size="sm"
          @enter="addPosition(data.item)"
        />
      </template>

      <template #cell(Add)="data">
        <b-button
          size="sm"
          variant="primary"
          block
          @click="addPosition(data.item)"
        >
          <span :class="$style['icon-plus']"></span>
        </b-button>
      </template>

      <template #empty>
        <div></div>
        <div
          v-if="!lazyLoadOptions.loadingInProgress"
          :class="$style['table-empty']"
        >
          <div v-if="isFirstRequest">
            <h2 :class="$style['inner-item']">Начните поиск</h2>

            <div :class="$style['inner-item']">
              Заполните поля, расположенные выше, чтобы начать поиск
            </div>
          </div>

          <div v-else>
            <h2 :class="$style['inner-item']">Нет результата</h2>

            <div :class="$style['inner-item']">
              Нам не удалось найти оборудование по Вашему запросу.<br />
              Попробуйте изменить параметры поиска или добавьте позицию в
              ручную.
            </div>

            <b-button
              :class="$style['inner-item']"
              variant="outline-primary"
              @click="
                !$store.getters['project/isNewProject']
                  ? $modal().show(modals['add-position'])
                  : $modal().show(modals['create-project'])
              "
            >
              + Добавить позицию
            </b-button>
          </div>
        </div>
      </template>
    </b-table>

    <Loader
      v-if="lazyLoadOptions.loadingInProgress"
      :top="cartridges.length === 0 ? '100px' : ''"
    />
  </div>
</template>

<script>
import MaskedInput from 'vue-text-mask';
import VInputNumber from '~/components/helpers/form/VInputNumber.vue';
import Loader from '~/components/helpers/others/Loader.vue';
import VSelectCountry from '~/components/helpers/form/VSelectCountry.vue';
import CurrencySwitcher from '~/components/helpers/others/CurrencySwitcher.vue';
import format3digit from '~/mixins/formatters/format3digit.js';

import SupplierCell from '~/components/workspace/project/helpers/cells/SupplierCell.vue';
import PartNumberCell from '~/components/workspace/project/helpers/cells/PartNumberCell.vue';
import PriceCell from '~/components/workspace/project/helpers/cells/PriceCell.vue';
import RunningString from '~/components/workspace/project/helpers/others/RunningString.vue';

import AddPositionFormModal from '~/components/workspace/project/modals/AddPositionFormModal.vue';
import CreateProjectFormModal from '~/components/workspace/project/modals/CreateProjectFormModal.vue';

export default {
  components: {
    MaskedInput,
    VInputNumber,
    Loader,
    VSelectCountry,
    CurrencySwitcher,

    SupplierCell,
    PartNumberCell,
    PriceCell,
    RunningString,
  },

  mixins: [format3digit],

  props: {
    conditions: {
      type: Array,
      default: null,
    },
    filters: {
      type: Array,
      default: null,
    },
    buttonFilterTogglerVisible: {
      type: Boolean,
      default: true,
    },
  },

  data() {
    return {
      modals: {
        'add-position': AddPositionFormModal,
        'create-project': CreateProjectFormModal,
      },
      limit: 30,
      totalFound: 0,
      sortBy: 'price',
      sortDesc: '',
      fields: [],
      isFirstRequest: true,
      cartridges: [],
      vendorsList: [],
      lazyLoadOptions: {},
      currency: 'RUB',
    };
  },

  watch: {
    conditions() {
      this.clearTable();
      this.reqCartridges();
    },
    filters() {
      this.clearTable();
      this.reqCartridges();
    },
  },

  created() {
    this.fields = [
      {
        key: 'RowNum',
        label: '№',
        sortable: false,
      },
      {
        key: 'Type',
        label: 'Тип',
        sortable: true,
        sortKey: 'category',
        class: this.$style['td-type'],
      },
      {
        key: 'Vendor',
        label: 'Производ.',
        sortable: true,
        sortKey: 'manufacturer',
      },
      {
        key: 'Supplier',
        label: 'Поставщик',
        sortable: true,
        sortKey: 'provider',
      },
      {
        key: 'Partnumber',
        label: 'Партномер',
        sortable: false,
        sortKey: 'part_number',
        class: this.$style['td-partnumber'],
      },
      {
        key: 'Resourse',
        label: 'Ресурс',
        sortable: true,
        sortKey: 'resource',
      },
      {
        key: 'Color',
        label: 'Цвет',
        sortable: true,
        sortKey: 'color',
      },
      {
        key: 'Percent',
        label: '%',
        sortable: false,
      },
      {
        key: 'Country',
        label: 'Страна',
        sortable: false,
        class: this.$style['td-country'],
      },
      {
        key: 'Price',
        label: 'Цена',
        sortable: true,
        sortKey: 'price',
      },
      {
        key: 'InStock',
        label: 'Налич.',
        sortable: true,
        sortKey: 'available_quantity',
      },
      {
        key: 'Amount',
        label: 'Кол-во',
        sortable: false,
      },
      {
        key: 'Add',
        label: 'Добавл.',
        sortable: false,
      },
    ];

    this.lazyLoadOptions = {
      items: this.cartridges,
      requestFunc: this.reqCartridges,
      endReached: false,
      loadingInProgress: false,
    };
  },

  methods: {
    /**
     * Установка контекста сортировки. Реальная сортировка приходит с бэкенда.
     * @param Object ctx контекст сортировки, приходящий из bootstrap-таблицы
     * @returns void
     */
    sortChanged(ctx) {
      this.sortBy = ctx.sortBy ? ctx.sortBy : 'price';
      this.sortDesc = ctx.sortDesc ? '-' : '';

      this.clearTable();
      this.reqCartridges();
    },

    /**
     * Клик по + (добавление позиции) в таблице
     * @param Object row - строка
     * @returns void
     */
    addPosition(row) {
      this.$store.dispatch('project/cashLastClickedPosition', row);

      !this.$store.getters['project/isNewProject']
        ? this.$store.dispatch('project/addPositionToSpec', row)
        : this.$modal().show(this.modals['create-project']);
    },

    // region После присоединения бекенда удалить
    reqCartridges(offset = 0) {
      this.lazyLoadOptions.loadingInProgress = true;
      const path = this.buildRESTQuery(offset);

      this.$axios.$get(path).then(res => {
        this.totalFound = res.count;

        const items = res.results.map((x, i) => {
          const item = this.toClientEntity(x);

          Object.assign(item, {
            RowNum: i + offset + 1,
          });

          return item;
        });

        this.cartridges.splice(this.cartridges.length, 0, ...items);
        if (res.results.length < this.limit)
          this.lazyLoadOptions.endReached = true;
        this.$emit('after-search', this.cartridges.length);
        this.lazyLoadOptions.loadingInProgress = false;

        this.isFirstRequest = false;
      });
    },

    clearTable() {
      this.cartridges.splice(0, this.cartridges.length);
      this.lazyLoadOptions.endReached = false;
    },

    buildRESTQuery(offset) {
      const query = [];

      this.conditions.forEach(x => query.push(x));
      this.filters.forEach(x => query.push(x));
      query.push(`limit=${this.limit}`);
      query.push(`offset=${offset}`);
      query.push(`ordering=${this.sortDesc}${this.sortBy}`);

      return `/products/product/?${query.join('&')}`;
    },

    toClientEntity(serverEntity) {
      const clientEntity = {};
      Object.assign(clientEntity, {
        Id: serverEntity.id,
        Country: serverEntity.provider.name === 'NV Print' ? 'Китай' : '',
        Amount: '1',
        Add: 'Добавление',
        Type: serverEntity.category.name,
        Vendor: serverEntity.manufacturer.name,
        Partnumber: serverEntity.part_number,
        Supplier: serverEntity.provider.name,
        Conversion: serverEntity.provider.conversion,
        Resourse: serverEntity.resource,
        ResourseMeasure: serverEntity.resource_unit,
        Color: serverEntity.color && serverEntity.color.name,
        Percent: serverEntity.filling.toString(),
        Price: serverEntity.price,
        InStock: serverEntity.available_quantity,
        PriceUpdateDate: serverEntity.updated_at,
        Currency: serverEntity.currency.alpha3,
        Description: serverEntity.description,
      });

      return clientEntity;
    },

    // end region
  },
};
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

.td-partnumber {
  width: 120px;
}

.td-country {
  width: 120px;
}

.country {
  padding: 0.2rem;
  max-width: 120px;
}

.percent {
  width: 30px;
  height: 30px;
  padding: 0;
  text-align: center;
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

  @media (max-width: 1470px) and (min-width: 1399.98px) {
    --search-table-font-size: 85%;
  }

  @media (max-width: 1250px) {
    --search-table-font-size: 95%;
  }

  input {
    font-size: var(--search-table-font-size);
  }

  font-size: var(--search-table-font-size);

  .b-table-sticky-header {
    max-height: calc(100vh - 266px) !important;

    @media (max-width: 1399.98px) {
      max-height: calc(100vh - 212px) !important;
    }

    @media (max-width: 1199.98px) {
      max-height: calc(100vh - 184px) !important;
    }
  }

  tr td:nth-child(2),
  tr td:nth-child(3),
  tr td:nth-child(4),
  tr td:nth-child(5),
  tr td:nth-child(6),
  tr td:nth-child(7) {
    text-align: left !important;
    padding: 0.2rem 0.8rem;
  }

  tr td:nth-child(8) {
    padding: 0.2rem 0.8rem;
    width: 30px;
  }

  tr td:nth-child(9) {
    padding: 0;
  }

  tr td:nth-child(9) input,
  tr td:nth-child(10) button,
  tr td:nth-child(12) button {
    padding: 0;
  }

  tr td:last-child {
    padding: 0 1rem;
  }
}
</style>
