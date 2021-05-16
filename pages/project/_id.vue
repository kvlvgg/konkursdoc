<template>
  <div :class="$style['project']">
    <b-tabs
      v-model="tabIndex"
      :class="$style['project-tabs']"
      pills
      justified
      nav-wrapper-class="project-nav-wrapper"
    >
      <template v-if="!$store.getters['project/isNewProject']" #tabs-start>
        <b-button
          :class="$style['button-to-project']"
          :to="{ name: 'dashboard', params: { projectId: projectId } }"
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
            <div>Найдено: {{ totalSearchCartridges }}</div>
          </div>
        </template>

        <WorkSpace :taskPaneToggled="searchFilterToggled">
          <template #head>
            <SearchConditions @search="conditions = $event" />
          </template>

          <template #workspace>
            <SearchTable
              :conditions="conditions"
              :filters="filters"
              :buttonFilterTogglerVisible="!searchFilterToggled"
              @toggle-filter-on="searchFilterToggled = true"
              @after-search="totalSearchCartridges = $event"
            />
          </template>

          <template #taskpane>
            <SearchTaskPane
              :conditions="conditions"
              @toggle-filter-off="searchFilterToggled = false"
              @go-to-specification-tab="switchTab(1)"
              @filters-changed="filters = $event"
            />
          </template>
        </WorkSpace>
      </b-tab>

      <b-tab
        :disabled="
          $store.getters['project/isNewProject'] ||
          $store.getters['project/specification'].length === 0
        "
      >
        <template #title>
          <div class="project-nav-wrapper-item">
            <div><IconSpecification />Спецификация</div>
            <div>
              Добавлено: {{ $store.getters['project/specification'].length }}
            </div>
          </div>
        </template>

        <WorkSpace>
          <template #head>
            <SpecificationHeaderPane
              :currency="specificationCurrency"
              @document-created="switchTab(2)"
            />
          </template>
          <template #workspace>
            <SpecificationTable
              @currency-switched="specificationCurrency = $event"
            />
          </template>
        </WorkSpace>
      </b-tab>

      <b-tab
        :disabled="
          $store.getters['project/isNewProject'] ||
          $store.getters['project/documents'].length === 0
        "
        align="center"
      >
        <template #title>
          <div class="project-nav-wrapper-item">
            <div><IconDocumentation />Формирование документации</div>
            <div>
              Документы: {{ $store.getters['project/documents'].length }}
            </div>
          </div>
        </template>
        <DocumentTab />
      </b-tab>
    </b-tabs>
  </div>
</template>

<script>
import WorkSpace from '~/components/workspace/WorkSpace.vue';
import SearchConditions from '~/components/workspace/project/tabs/search/Conditions.vue';
import SearchTable from '~/components/workspace/project/tabs/search/Table.vue';
import SearchTaskPane from '~/components/workspace/project/tabs/search/TaskPane.vue';
import SpecificationTable from '~/components/workspace/project/tabs/specification/Table.vue';
import SpecificationHeaderPane from '~/components/workspace/project/tabs/specification/HeaderPane.vue';
import DocumentTab from '~/components/workspace/project/tabs/documents/Document.vue';

import IconSearch from '~/components/icons/IconSearch.vue';
import IconSpecification from '~/components/icons/project/IconSpecification.vue';
import IconDocumentation from '~/components/icons/IconDocumentation.vue';

export default {
  layout: 'default',
  scrollToTop: true,

  components: {
    WorkSpace,
    SearchConditions,
    SearchTable,
    SearchTaskPane,
    SpecificationTable,
    SpecificationHeaderPane,
    DocumentTab,

    IconSearch,
    IconSpecification,
    IconDocumentation,
  },

  data() {
    return {
      tabIndex: 0,
      projectId: '',
      conditions: [],
      filters: [],
      totalSearchCartridges: 0,
      searchFilterToggled: false,
      specificationCurrency: 'RUB',
    };
  },

  computed: {
    lastAddedPosition() {
      return this.$store.getters['project/lastAddedPosition'];
    },
  },

  watch: {
    lastAddedPosition(value) {
      this.toast({ vendor: value.Vendor, partnumber: value.Partnumber });
    },
  },

  created() {
    const commonData = {
      'countries': 'loadCountries',
      'vendors': 'loadVendors',
      'providers': 'loadProviders',
      'categories': 'loadCategories',
      'colors': 'loadColors',
    };

    for (const prop in commonData) {
      if (!this.$store.getters[`common/${prop}`])
        this.$store.dispatch(`common/${commonData[prop]}`);
    }

    this.$store.dispatch('project/clearStore');
    this.projectId = this.$route.params.id;
    if (this.projectId === 'new') this.$store.dispatch('project/setNewMode');
    else this.$store.dispatch('project/loadProject', this.projectId);
  },

  methods: {
    /**
     * Показывает модальное окно
     * @param id String
     * @returns void
     */
    showFormModal(id) {
      this.$bvModal.show(id);
    },
    /**
     * Переключение между вкладками
     * @param tabNum - номер вкладки
     * @returns void
     */
    switchTab(tabNum) {
      this.$nextTick(() => (this.tabIndex = tabNum));
    },

    /**
     * Вызов тоста для оповещения действия - Картридж добавлен в спецификацию
     * @param String toaster - расположение тоста
     * @param Object info - какой картридж добавлен { vendor, partnumber }
     * @return void
     */
    toast(info) {
      this.$bvToast.toast(`${info.vendor} ${info.partnumber}`, {
        title: `Добавление картриджа в спецификацию`,
        toaster: 'b-toaster-top-right',
        variant: 'success',
        appendToast: false,
        noCloseButton: true,
      });
    },
  },
};
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
