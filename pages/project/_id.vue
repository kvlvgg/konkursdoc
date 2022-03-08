<template>
    <div :class="$style['project']">
        <b-tabs
            v-model="tabIndex"
            :class="$style['project-tabs']"
            pills
            justified
            nav-wrapper-class="project-nav-wrapper"
            @input="tabSwitched"
        >
            <template v-if="!$store.getters['project/isNewProject']" #tabs-start>
                <b-button
                    :class="$style['button-to-project']"
                    :to="
                        localePath({
                            name: 'dashboard',
                            query: { projectId: projectId },
                        })
                    "
                    variant="outline-primary"
                    size="sm"
                >
                    <span :class="$style['icon-arrow-back']"></span> К проекту
                </b-button>
            </template>

            <b-tab active>
                <template #title>
                    <div class="project-nav-wrapper-item">
                        <div><IconSearch />Поиск</div>
                        <div>Найдено: {{ searchTotal }}</div>
                    </div>
                </template>

                <WorkSpace :taskPaneToggled="searchFilterToggled">
                    <template #head>
                        <SearchConditions />
                    </template>

                    <template #workspace>
                        <SearchTable
                            :buttonFilterTogglerVisible="!searchFilterToggled"
                            @toggle-filter-on="searchFilterToggled = true"
                        />
                    </template>
                </WorkSpace>
            </b-tab>

            <b-tab
                :disabled="
                    $store.getters['project/isNew'] || $store.getters['project/specificationProducts'].length === 0
                "
            >
                <template #title>
                    <div class="project-nav-wrapper-item">
                        <div><IconSpecification />Спецификация</div>
                        <div>Добавлено: {{ $store.getters['project/specificationProducts'].length }}</div>
                    </div>
                </template>

                <WorkSpace>
                    <template #head>
                        <SpecificationHeaderPane :currency="specificationCurrency" @document-created="switchTab(2)" />
                    </template>
                    <template #workspace>
                        <SpecificationTable @currency-switched="specificationCurrency = $event" />
                    </template>
                </WorkSpace>
            </b-tab>

            <b-tab
                :disabled="$store.getters['project/isNewProject'] || $store.getters['project/documents'].length === 0"
                align="center"
            >
                <template #title>
                    <div class="project-nav-wrapper-item">
                        <div><IconDocumentation />Формирование документации</div>
                        <div>Документы: {{ $store.getters['project/documents'].length }}</div>
                    </div>
                </template>
                <DocumentTab @go-to-specification-tab="switchTab(1)" />
            </b-tab>
        </b-tabs>
    </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import WorkSpace from '@/components/workspace/WorkSpace.vue';
import SearchConditions from '@/components/workspace/project/tabs/search/Conditions.vue';
import SearchTable from '@/components/workspace/project/tabs/search/Table.vue';
import SpecificationTable from '@/components/workspace/project/tabs/specification/Table.vue';
import SpecificationHeaderPane from '@/components/workspace/project/tabs/specification/HeaderPane.vue';
import DocumentTab from '@/components/workspace/project/tabs/documents/Document.vue';

import IconSearch from '@/components/icons/IconSearch.vue';
import IconSpecification from '@/components/icons/project/IconSpecification.vue';
import IconDocumentation from '@/components/icons/IconDocumentation.vue';

@Component({
    components: {
        WorkSpace,
        SearchConditions,
        SearchTable,
        SpecificationTable,
        SpecificationHeaderPane,
        DocumentTab,

        IconSearch,
        IconSpecification,
        IconDocumentation,
    },
    middleware: ['login'],
    layout: 'default',
    scrollToTop: true,
})
export default class Project extends Vue {
    tabIndex = 0;
    tabNames: ['search', 'spec', 'calculation'] = ['search', 'spec', 'calculation'];
    projectId = '';
    searchFilterToggled = false;
    specificationCurrency = 'RUB';

    get searchTotal(): number {
        return this.$store.getters['project/search']?.total ?? 0;
    }

    created() {
        this.loadCommonData();
        this.loadProject();
    }

    loadCommonData() {
        const commonData: { [key: string]: string } = {
            countries: 'loadCountries',
            vendors: 'loadVendors',
            providers: 'loadProviders',
            categories: 'loadCategories',
            colors: 'loadColors',
        };

        for (const prop in commonData) {
            const data = this.$store.getters[`common/${prop}`] ?? [];
            if (data.length === 0) this.$store.dispatch(`common/${commonData[prop]}`);
        }
    }

    async loadProject() {
        this.$store.dispatch('project/clearStore');

        this.projectId = this.$route.params.id;
        if (this.projectId !== 'new') await this.$store.dispatch('project/loadProject', this.projectId);
        this.switchTab();
    }

    /**
     * Переключение между вкладками
     * @param tabNum - номер вкладки
     * @returns void
     */
    switchTab(tabIndex?: number) {
        if (tabIndex) {
            this.tabIndex = tabIndex;
            return;
        }

        const index = this.tabNames.findIndex(x => x === this.$route.query.tab);
        if (index === -1) return;

        if (this.$store.getters['project/isNew']) this.tabIndex = 0;
        else this.tabIndex = index;
    }

    tabSwitched(index: number) {
        this.$router.push({ query: { tab: this.tabNames[index] } });
    }
}
</script>

<style module lang="scss">
@import '~/assets/scss/var.scss';
@import '~/assets/scss/module/icons/arrow-back.scss';

.icon-arrow-back {
    @include icon-arrow-back();
}

.project {
    padding: 0 20px;
}

.button-to-project {
    display: flex;
    justify-content: space-evenly;
    align-items: center;

    flex: 0 1 10%;
    margin: 0 1rem 0 0;
    font-size: 1rem;

    @include media-breakpoint-down(xl) {
        margin: 0 0.8rem 0 0;
        font-size: 0.9rem;
    }

    @include media-breakpoint-down(lg) {
        margin: 0 0.4rem 0 0;
        font-size: 0.8rem;
    }

    @media (max-width: 1050.98px) {
        font-size: 0.75rem;
    }
}
</style>
