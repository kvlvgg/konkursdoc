<template>
  <div class="invisible-scroll">
    <div :class="$style['task-pane']">
      <Panel
        header="Фильтр поиска"
        toggable
        @toggle="$emit('toggle-filter-off')"
      >
        <div :class="[$style['collapse-inner'], 'font-weight-light']">
          <b-form-group label="Тип расходных материалов">
            <v-select-input
              v-model="filters.category.value"
              :options="filters.category.options"
              size="sm"
              placeholder="Все типы"
              searchable
              clearable
            />
          </b-form-group>

          <b-form-group label="Наименование производителя">
            <v-select-input
              v-model="filters.vendor.value"
              :options="filters.vendor.options"
              size="sm"
              placeholder="Все производители"
              clearable
            />
          </b-form-group>

          <b-form-group label="Поставщик">
            <v-select-input
              v-model="filters.provider.value"
              :options="filters.provider.options"
              size="sm"
              placeholder="Все поставщики"
              clearable
            />
          </b-form-group>

          <b-form-group
            :label="`Ресурс: от ${resource.range[0]} до ${resource.range[1]}`"
          >
            <VSliderInput
              v-model="resource.range"
              range
              :min="resource.min"
              :max="resource.max"
              :disabled="resource.isDisabled"
            />
          </b-form-group>

          <b-form-group label="Цвет">
            <MultipleChoiceSelect
              v-model="filters.color.rawValue"
              :options="filters.color.options"
              placeholder="Все цвета"
            />
          </b-form-group>

          <b-button
            block
            size="sm"
            variant="primary"
            :class="$style['btn-submit']"
            @click="applyFiltes"
          >
            Применить фильтр
          </b-button>
        </div>
      </Panel>

      <div :class="$style['actions']">
        <b-button
          block
          variant="outline-primary"
          :class="$style['action-item']"
          :disabled="$route.params.id === 'new'"
          @click="$emit('go-to-specification-tab')"
        >
          К списку добавленных
        </b-button>
      </div>
    </div>
  </div>
</template>

<script>
import VSelectInput from '~/components/helpers/form/VSelectInput.vue';
import VSliderInput from '~/components/helpers/form/VSliderInput.vue';
import MultipleChoiceSelect from '~/components/helpers/form/VMultipleChoiceSelect.vue';
import Panel from '~/components/helpers/layout/Panel.vue';

export default {
  components: {
    VSliderInput,
    VSelectInput,
    MultipleChoiceSelect,
    Panel,
  },

  props: {
    conditions: {
      type: Array,
      default: null,
    },
  },

  data() {
    return {
      filteredList: null,

      filters: {
        category: {
          value: null,
          options: [],
          storeProp: 'categories',
          serverArrayName: 'category',
          serverField: 'category_id',
        },

        vendor: {
          value: null,
          options: [],
          storeProp: 'vendors',
          serverArrayName: 'manufacturer',
          serverField: 'manufacturer_id',
        },

        provider: {
          value: null,
          options: [],
          storeProp: 'providers',
          serverArrayName: 'provider',
          serverField: 'provider_id',
        },

        color: {
          rawValue: [],
          get value() {
            return this.rawValue.join(',') || null;
          },
          options: [],
          storeProp: 'colors',
          serverArrayName: 'color',
          serverField: 'color_id',
        },
      },

      resource: {
        min: 0,
        max: 0,
        range: [0, 0],
        get isDisabled() {
          return this.min === this.max;
        },
      },
    };
  },

  watch: {
    conditions() {
      this.$axios
        .$get(`/products/product-filters/?${this.conditions.join('&')}`)
        .then(res => {
          this.setFilters(res);
          this.setResourceRange(res);
        });
    },
  },

  methods: {
    applyFiltes() {
      const filters = [];

      for (const f in this.filters) {
        const filterValue = this.filters[f].value;
        const filterServerField = this.filters[f].serverField;

        if (filterValue) filters.push(`${filterServerField}=${filterValue}`);
      }

      filters.push(`resource_min=${this.resource.range[0]}`);
      filters.push(`resource_max=${this.resource.range[1]}`);

      this.$emit('filters-changed', filters);
    },

    setFilters(filteredList) {
      if (!filteredList) return;

      for (const f in this.filters) {
        const storeGetter = `common/${this.filters[f].storeProp}`;
        const serverArrayName = this.filters[f].serverArrayName;
        const serverField = this.filters[f].serverField;
        const list = filteredList[serverArrayName];

        this.filters[f].options = this.$store.getters[storeGetter]
          .filter(x => list.some(y => x.id === y[serverField]))
          .map(x => ({ value: x.id, label: x.name }));
      }
    },

    setResourceRange(filteredList) {
      if (!filteredList) return;

      const isMinChanged = this.resource.min !== filteredList.resource_min[0];
      const isMaxChanged = this.resource.max !== filteredList.resource_max[0];

      this.resource.min = filteredList.resource_min[0];
      this.resource.max = filteredList.resource_max[0];

      if (isMinChanged) this.resource.range[0] = filteredList.resource_min[0];
      if (isMaxChanged) this.resource.range[1] = filteredList.resource_max[0];
    },
  },
};
</script>

<style module lang="scss">
@import '~/assets/scss/var.scss';

.task-pane {
  margin: 1rem 0 0 0;
  overflow-y: auto;
  max-height: calc(100vh - 254px);

  @include media-breakpoint-down(xl) {
    max-height: calc(100vh - 194px);
  }

  @include media-breakpoint-down(lg) {
    max-height: calc(100vh - 170px);
  }
}

.collapse-inner {
  color: $secondary-dark;

  fieldset {
    margin-bottom: 0;
  }
}

.input-number {
  width: 50%;
}

.btn-submit {
  margin-top: 20px;
}

.actions {
  padding: 0.8rem;

  @include media-breakpoint-down(xl) {
    padding: 0.6rem;
  }

  @include media-breakpoint-down(lg) {
    padding: 0.4rem;
  }
}

.action-item:not(:last-child) {
  margin-bottom: 20px;

  @include media-breakpoint-down(xl) {
    margin-bottom: 14px;
  }

  @include media-breakpoint-down(lg) {
    margin-bottom: 10px;
  }
}
</style>
