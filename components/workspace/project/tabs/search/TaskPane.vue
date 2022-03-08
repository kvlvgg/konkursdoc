<template>
    <div class="invisible-scroll">
        <div :class="$style['task-pane']">
            <Panel header="Фильтр поиска" toggable @toggle="$emit('toggle-filter-off')">
                <div :class="[$style['collapse-inner'], 'font-weight-light']">
                    <legend class="col-form-label">Расходные материалы</legend>
                    <b-form-group>
                        <v-select-input
                            v-model="filters.category.value"
                            :options="filters.category.options"
                            size="sm"
                            placeholder="Все типы"
                            searchable
                            clearable
                            @input="onFilterChanged"
                        />
                    </b-form-group>

                    <legend class="col-form-label">Производитель</legend>
                    <b-form-group>
                        <v-select-input
                            v-model="filters.vendor.value"
                            :options="filters.vendor.options"
                            size="sm"
                            placeholder="Все производители"
                            searchable
                            clearable
                            @input="onFilterChanged"
                        />
                    </b-form-group>

                    <legend class="col-form-label">Поставщик</legend>
                    <b-form-group>
                        <v-select-input
                            v-model="filters.provider.value"
                            :options="filters.provider.options"
                            size="sm"
                            placeholder="Все поставщики"
                            searchable
                            clearable
                            @input="onFilterChanged"
                        />
                    </b-form-group>

                    <legend class="col-form-label">Ресурс</legend>
                    <div :class="$style.resource">
                        <b-input v-model="resource.min" block @input="onFilterChangeDebounce" />
                        <span />
                        <b-input v-model="resource.max" block @input="onFilterChangeDebounce" />
                    </div>

                    <legend class="col-form-label">Цвет</legend>
                    <b-form-group>
                        <MultipleChoiceSelect
                            v-model="filters.color.rawValue"
                            :options="filters.color.options"
                            placeholder="Все цвета"
                            @input="onFilterChanged"
                        />
                    </b-form-group>
                </div>
            </Panel>

            <div v-if="$store.getters['project/specificationProducts'].length" :class="$style['actions']">
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
import MultipleChoiceSelect from '~/components/helpers/form/VMultipleChoiceSelect.vue';
import Panel from '~/components/helpers/layout/Panel.vue';

export default {
    components: {
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
            filtersQueryParams: [],

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
                    // По какой-то причине поле сменило название с color_id на color
                    serverField: 'color',
                },
            },

            resource: {
                min: null,
                max: null,
            },

            debounceTimer: null,
        };
    },

    watch: {
        conditions() {
            this.applyFilters();
            this.loadProductFilters();
        },
    },

    methods: {
        onFilterChangeDebounce() {
            if (this.debounceTimer) clearTimeout(this.debounceTimer);
            this.debounceTimer = setTimeout(() => {
                this.onFilterChanged();
                clearTimeout(this.debounceTimer);
            }, 1000);
        },

        onFilterChanged() {
            this.applyFilters();
            this.loadProductFilters();

            this.$emit('loading');
        },

        applyFilters() {
            this.filtersQueryParams = [];

            for (const f in this.filters) {
                const filterValue = this.filters[f].value;
                const filterServerField = this.filters[f].serverField;

                if (filterValue) this.filtersQueryParams.push(`${filterServerField}=${filterValue}`);
            }

            if (this.resource.min) this.filtersQueryParams.push(`resource_min=${this.resource.min}`);
            if (this.resource.max) this.filtersQueryParams.push(`resource_max=${this.resource.max}`);

            this.$emit('input', this.filtersQueryParams);
        },

        loadProductFilters() {
            const queryParams = [...this.conditions, ...this.filtersQueryParams];

            this.$axios.$get(`/products/product-filters/?${queryParams.join('&')}`).then(res => {
                this.setFilters(res);
            });
        },

        setFilters(filteredList) {
            if (!filteredList) return;

            for (const f in this.filters) {
                const storeGetter = `common/${this.filters[f].storeProp}`;
                const serverArrayName = this.filters[f].serverArrayName;
                const serverField = this.filters[f].serverField;
                const list = filteredList[serverArrayName];

                this.filters[f].options = this.$store.getters[storeGetter]
                    .filter(x => list.some(y => x.id === y[serverField]) || x.id === this.filters[f].value)
                    .map(x => ({ value: x.id, label: x.name }));
            }
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

.resource {
    display: flex;
    span {
        width: 2rem;
    }
    input {
        height: $input-height-sm;
    }
}
</style>
