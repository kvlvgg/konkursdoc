<template>
  <div :class="$style['project-preview']">
    <b-card :body-class="$style['content-class']">
      <b-tabs v-model="tabIndex" pills card justified>
        <b-tab :title-link-class="$style['title-link-class']" active>
          <template #title>
            <IconInfo :width="20" :height="20" />
            Информация
          </template>

          <InformationTab
            @go-to-specification-tab="tabIndex = 1"
            @go-to-document-tab="tabIndex = 2"
          />
        </b-tab>

        <b-tab :title-link-class="$style['title-link-class']">
          <template #title>
            <IconSpecification />
            Спецификация
          </template>

          <SpecificationTab />
        </b-tab>

        <b-tab :title-link-class="$style['title-link-class']">
          <template #title>
            <IconDocumentation />
            Документы
          </template>

          <DocumentsTab />
        </b-tab>

        <!-- <b-tab :title-link-class="$style['title-link-class']">
          <template #title>
            <IconChanges />
            Изменения
          </template>

          <ChangesTab />
        </b-tab> -->

        <!--
        <b-tab>
          <template #title>
            <IconKPExchanging />
            Обмен КП
          </template>
          <b-card-text align="center">Закладка Обмен КП</b-card-text>
        </b-tab>
        -->
      </b-tabs>
    </b-card>
  </div>
</template>

<script>
import IconInfo from '~/components/icons/dashboard/IconInfo.vue';
import IconSpecification from '~/components/icons/dashboard/IconSpecification.vue';
import IconDocumentation from '~/components/icons/IconDocumentation.vue';
// import IconChanges from '~/components/icons/dashboard/IconChanges.vue';
// import IconKPExchanging from '~/components/icons/dashboard/IconKPExchanging.vue';
import InformationTab from '~/components/workspace/dashboard/tabs/Information.vue';
import SpecificationTab from '~/components/workspace/dashboard/tabs/Specification.vue';
import DocumentsTab from '~/components/workspace/dashboard/tabs/Documents.vue';
// import ChangesTab from '~/components/workspace/dashboard/tabs/Changes.vue';

export default {
  components: {
    IconInfo,
    IconSpecification,
    IconDocumentation,
    // IconChanges,
    // IconKPExchanging,
    InformationTab,
    SpecificationTab,
    DocumentsTab,
    // ChangesTab,
  },
  data() {
    return {
      tabIndex: 0,
    };
  },
};
</script>

<style module lang="scss">
@import '~/assets/scss/var.scss';

.project-preview {
  background-color: #f8f8f8;
  border-radius: 4px;
}

.title-link-class {
  display: flex;
  align-items: center;
  justify-content: center;

  margin: 0.25rem;
}

.content-class {
  height: calc(100vh - 100px);
  padding: 0;
  background-color: #f8f8f8;

  @include media-breakpoint-down(xl) {
    height: calc(100vh - 80px);
  }

  @include media-breakpoint-down(lg) {
    height: calc(100vh - 60px);
  }

  a[role='tab'] {
    @media (max-width: 1515px) {
      font-size: 95%;
    }

    @media (max-width: 1475px) {
      font-size: 90%;
    }

    @media (max-width: 1440px) {
      font-size: 85%;
    }

    @media (max-width: 1250px) {
      font-size: 80%;
    }
  }
}
</style>
