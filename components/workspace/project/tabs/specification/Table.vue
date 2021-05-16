<template>
  <div class="specification">
    <div :class="$style['table-caption']">
      <div :class="$style['info']">
        <div class="font-weight-bold">Добавленные расходные материалы</div>

        <div :class="$style['table-summary']">В списке: {{ items.length }}</div>

        <div :class="$style['table-summary']">
          Всего:
          {{
            items.reduce((a, v) => a + (v.Amount ? parseInt(v.Amount) : 0), 0)
          }}
        </div>
      </div>

      <CurrencySwitcher v-model="currency" />
    </div>

    <b-table-simple
      table-variant="custom"
      sticky-header
      class="prevent-default-hover"
    >
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
        v-model="items"
        tag="tbody"
        handle=".custom-table-draggable-handle"
        ghost-class="custom-draggable-rows-ghost"
        chosen-class="custom-draggable-rows-chosen"
        drag-class="custom-draggable-rows-drag"
        easing="cubic-bezier(0.25, 1, 0.5, 1)"
        animation="150"
        @start="onDragStart"
        @end="onDragEnd"
      >
        <b-tr
          v-for="item in items"
          :key="item.Id"
          @mouseleave="onMouseLeave"
          @mouseenter="onMouseEnter"
        >
          <b-td :class="$style['mw-40']">
            <IconDragHandle />
          </b-td>

          <b-td
            :class="[$style['mw-40'], 'font-weight-bold']"
            v-text="item.RowNum"
          />

          <b-td :class="$style['td-type']">
            <RunningString
              :value="item.Type"
              :class="$style['type-running-string']"
            />
          </b-td>

          <b-td v-text="item.Vendor" />

          <b-td>
            <SupplierCell :item="item" where="spec" />
          </b-td>

          <b-td :class="$style['td-partnumber']">
            <PartNumberCell :item="item" where="spec" />
          </b-td>

          <b-td :class="$style['container-overflow']">
            {{ format3digit(item.Resourse, item.ResourseMeasure) }}
          </b-td>

          <b-td>
            {{ item.Color }}
          </b-td>

          <b-td :class="$style['td-percent']">
            <!-- masked-input помимо очевидной своей роли здесь несет в себе скрытую спонтанную миссию -->
            <!-- читай комментарий к функции syncSpec. Нужно обязательно учесть это при изменении maskInput -->

            <masked-input
              v-model="item.Percent"
              class="form-control"
              :mask="[/\d/, /\d/]"
              :guide="false"
              @input="syncSpec($event)"
            />
          </b-td>

          <b-td :class="$style['td-country']">
            <div :class="$style['country']" @click.stop>
              <VSelectCountry
                v-model="item.Country"
                size="sm"
                @input="syncSpec($event)"
              />
            </div>
          </b-td>

          <b-td>
            <PriceCell
              :item="item"
              where="spec"
              :toCurrency="currency"
              @price-inputed="
                item.Price = $event.Price;
                item.Currency = $event.Currency;
                syncSpec($event);
              "
            />
          </b-td>

          <b-td :class="item.InStock === 0 ? $style['color-red'] : ''">
            {{ item.InStock }}
          </b-td>

          <b-td :class="$style['td-amount']">
            <b-input v-model="item.Amount" @input="syncSpec($event)" />
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

<script>
import Draggable from 'vuedraggable';
import MaskedInput from 'vue-text-mask';
import IconDragColumnCaption from '~/components/icons/table/IconDragColumnCaption.vue';
import IconDragHandle from '~/components/icons/table/IconDragHandle.vue';
import IconDelete from '~/components/icons/dashboard/IconDelete.vue';
import CurrencySwitcher from '~/components/helpers/others/CurrencySwitcher.vue';
import VSelectCountry from '~/components/helpers/form/VSelectCountry.vue';
import format3digit from '~/mixins/formatters/format3digit.js';

import SupplierCell from '~/components/workspace/project/helpers/cells/SupplierCell.vue';
import PartNumberCell from '~/components/workspace/project/helpers/cells/PartNumberCell.vue';
import PriceCell from '~/components/workspace/project/helpers/cells/PriceCell.vue';

import RunningString from '~/components/workspace/project/helpers/others/RunningString.vue';

export default {
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

  mixins: [format3digit],

  data() {
    return {
      fields: [
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
      ],
      dragging: false,
      items: [],
      currency: 'RUB',
      timer: null,
      hoveredItem: null,
    };
  },

  computed: {
    positions() {
      return this.$store.getters['project/specification'];
    },
  },

  watch: {
    positions() {
      if (!this.positions || this.positions.length === this.items.length)
        return;
      const deepCopy = [];
      this.positions.forEach(x => deepCopy.push({ ...x }));
      this.items.splice(0, this.items.length, ...deepCopy);
    },
    currency() {
      this.$emit('currency-switched', this.currency);
    },
  },

  methods: {
    /**
     * Удаляем позицию из списка
     * @param Object позиция
     * @returns void
     */
    removePosition(row) {
      this.$store.dispatch('project/removePositionFromSpec', row);
    },
    /**
     * Обновляем спецификацию с задержкой в полсекунды, чтобы избежать троттлинга
     * По какой-то причине Mask-Input выбрасывает событие input для каждой строки в таблице
     * даже если изменяется не он сам, а b-input в этой же таблице.
     * Очень странной поведение.
     *
     * Пародоксально, но этот баг помогает синхронизировать записи в таблицы
     * со спецификацией стора при перемещении строк (drap-n-drop). Это следует иметь ввиду.
     */
    syncSpec(value) {
      if (!value) return;
      if (this.timer) clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        this.$store.dispatch('project/syncSpec', this.items);
      }, 500);
    },

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
    onMouseEnter(e) {
      if (this.dragging) return;
      if (this.hoveredItem) this.removeHoverClass(this.hoveredItem);

      this.addHoverClass(e.target);
      this.hoveredItem = e.target;
    },

    /**
     * Реализация hover. Убираем класс .spec-table-row-hover,
     * когда мышь вне строки.
     * @returns void
     */
    onMouseLeave(e) {
      if (this.dragging) return;
      this.removeHoverClass(e.target);
    },

    /**
     * На начало перетаскивания удаляем класс .spec-table-row-hover
     * со строки, откуда начали перетаскивать
     * @returns void
     */
    onDragStart(e) {
      this.removeHoverClass(e.target.children[e.oldIndex]);
      this.dragging = true;
    },

    /**
     * На окончание перетаскивания добавляем класс .spec-table-row-hover
     * на строку, куда перетащили. Выключаем this.dragging с задержкой.
     * Если перемещать строки быстро, то класс может неправильно добавиться.
     *
     * Пересчитываем RowNum.
     *
     * @returns void
     */
    onDragEnd(e) {
      this.items.forEach((x, i) => (x.RowNum = i + 1));
      this.addHoverClass(e.target.children[e.newIndex]);

      setTimeout(() => {
        this.dragging = false;
      }, 10);
    },

    /**
     * Добавляет к элементу класс .spec-table-row-hover
     * @returns void
     */
    addHoverClass(tr) {
      if (!tr) return;
      tr.classList.add('spec-table-row-hover');
    },

    /**
     * Удаляет к элементу класс .spec-table-row-hover
     * @returns void
     */
    removeHoverClass(tr) {
      if (!tr) return;
      tr.classList.remove('spec-table-row-hover');
    },
  },
};
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
