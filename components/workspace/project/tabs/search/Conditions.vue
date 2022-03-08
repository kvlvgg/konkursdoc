<template>
    <div :class="$style['filters']">
        <div :class="$style['filters-item']" @keyup.enter="$emit('search')">
            <b-input :value="conditions.description" placeholder="Поиск" @input="setCondition('description', $event)" />
        </div>

        <div :class="$style['filters-item']">
            <v-select-input
                :value="conditions.manufacturer_id"
                clearable
                placeholder="Все производители"
                :options="manufacturers"
                @input="setCondition('manufacturer_id', $event)"
            />
        </div>

        <div :class="$style['filters-item']">
            <v-select-input
                :value="conditions.provider_id"
                clearable
                placeholder="Все поставщики"
                :options="providers"
                @input="setCondition('provider_id', $event)"
            />
        </div>

        <div
            :class="[$style['filters-item'], $style['checkboxes'], 'font-weight-normal']"
            @keyup.enter="$emit('search')"
        >
            <b-form-checkbox
                id="checkbox-in-stock"
                :checked="conditions.available_quantity_min"
                name="checkbox-in-stock"
                value="1"
                unchecked-value="0"
                @input="setCondition('available_quantity_min', $event)"
            >
                В наличии
            </b-form-checkbox>
        </div>

        <b-button
            variant="gr-primary"
            :class="$style['filters-button']"
            @click="startSearch"
            @keyup.enter="startSearch"
        >
            Найти
        </b-button>
    </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import VSelectInput from '@/components/helpers/form/VSelectInput.vue';

import Search, { SearchConditions } from '@/classes/Search';

@Component({
    components: {
        VSelectInput,
    },
})
export default class Conditions extends Vue {
    get search(): Search | null {
        return this.$store.getters['project/search'];
    }

    get conditions(): SearchConditions {
        const conditions = this.search?.conditions;
        return {
            description: conditions?.description ?? null,
            manufacturer_id: this.manufacturers.find(x => x.value === conditions?.manufacturer_id)?.label ?? null,
            provider_id: this.providers.find(x => x.value === conditions?.provider_id)?.label ?? null,
            available_quantity_min: conditions?.available_quantity_min ?? '0',
        };
    }

    get manufacturers(): { label: string; value: number }[] {
        const manufacturers = this.$store.getters['common/vendors'] ?? [];

        return manufacturers.map((elem: { name: string; id: number }) => ({
            label: elem.name,
            value: elem.id,
        }));
    }

    get providers(): { label: string; value: number }[] {
        const providers = this.$store.getters['common/providers'] ?? [];

        return providers.map((elem: { name: string; id: number }) => ({
            label: elem.name,
            value: elem.id,
        }));
    }

    setCondition<K extends keyof SearchConditions, V extends SearchConditions[K]>(key: K, value: V) {
        if (!this.search) return;

        const conditions: SearchConditions = {
            ...this.search.conditions,
            [key]: value,
        };

        this.$store.commit('project/SET_SEARCH_CONDITIONS', conditions);
    }

    startSearch() {
        this.$store.commit('project/CLEAR_SEARCH');
        this.$store.dispatch('project/loadNextSearchChunk');
    }
}
</script>

<style module lang="scss">
@import '~/assets/scss/var.scss';

.filters {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    padding: 1rem 0;
    background-color: #f8f8f8;
    border: 1px solid $secondary-lighter;
    border-radius: 4px;

    @include media-breakpoint-down(xl) {
        padding: 0.7rem 0;
    }

    @include media-breakpoint-down(lg) {
        padding: 0.6rem 0;
    }
}

.filters-item {
    flex: 1 1 25%;
    max-width: 25%;
}
.filters-item ~ .filters-item {
    margin-left: 16px;
}

.filters-button {
    height: auto;
    margin-left: 20px;
    padding-left: 2em;
    padding-right: 2em;
    text-align: center;
}

.checkboxes {
    display: flex;
    align-items: center;
    justify-content: space-around;
    max-width: max-content;
    color: #6a6a6a;
}
</style>
