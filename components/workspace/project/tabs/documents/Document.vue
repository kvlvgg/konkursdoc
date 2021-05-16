<template>
  <div :class="$style['document']">
    <div :class="[$style['info'], 'font-weight-light']">
      <Panel :bodyPadding="10">
        <div :class="[$style['header'], 'font-weight-bold']">
          Мой проект 001
        </div>
        <span v-if="currenctDocumentType === 'Заявка'">Заявка</span>
        <span v-if="currenctDocumentType === 'Расчёт'">Расчёт</span>
        001 &nbsp;&nbsp;<span :class="$style['number']">#0000001</span>
        <br />
        32 позиции
        <b-button variant="link">Показать список</b-button>
      </Panel>

      <!-- <Panel :bodyPadding="10">
        <div :class="$style['warning']">
          <IconWarning />
          <div>
            <span :class="[$style['primary'], 'font-weight-bold']"
              >Документ не актуален!
            </span>
            <br />
            Изменена спецификация
          </div>
        </div>
      </Panel> -->
    </div>

    <div :class="$style['editor']">
      <client-only v-if="currenctDocumentType === 'Заявка'">
        <jodit-editor
          ref="editor"
          v-model="content"
          :config="{
            theme: 'kd',
            showTooltipDelay: 100,
            editorCssClass: this.$style['jodit-document'],
          }"
        />
      </client-only>

      <Calculation
        v-if="currenctDocumentType === 'Расчёт'"
        ref="table"
        :items="items"
      />
    </div>

    <div class="invisible-scroll" :class="$style['actions']">
      <div class="font-weight-light">
        <Panel header="Работа с документами">
          <b-button
            v-if="currenctDocumentType === 'Заявка'"
            block
            variant="primary"
            size="sm"
            :class="$style['button']"
          >
            Редактировать
          </b-button>

          <b-button
            block
            variant="primary"
            size="sm"
            :class="$style['button']"
            @click="Print"
          >
            Распечатать
          </b-button>

          <b-button
            block
            variant="primary"
            size="sm"
            :class="$style['button']"
            @click="
              currenctDocumentType === 'Заявка' ? Export2Doc() : Export2Excel()
            "
          >
            Скачать
          </b-button>
        </Panel>

        <Panel header="Другие документы">
          <DocumentItem
            v-for="(doc, index) in $store.getters['project/documents']"
            :key="index"
            :isSelected="currentDocument.name === doc.name"
            :document="doc"
            @click="$store.dispatch('project/loadDocument', doc.name)"
          />

          <b-button
            block
            variant="outline-primary"
            size="sm"
            :class="$style['button']"
          >
            Показать все
          </b-button>

          <b-button block variant="primary" size="sm" :class="$style['button']">
            Загрузить документ
          </b-button>
        </Panel>
      </div>
    </div>
  </div>
</template>

<script>
import DocumentItem from './DocumentItem.vue';
import Calculation from './Calculation.vue';
import generateTemplate from './template.js';
import export2Excel from './export2Excel.js';
import Panel from '~/components/helpers/layout/Panel.vue';
// import IconWarning from '~/components/icons/document/IconWarning.vue';

export default {
  components: {
    // IconWarning,
    Panel,
    DocumentItem,
    Calculation,
  },

  data() {
    return {
      content: '',
      documentName: '',
    };
  },

  computed: {
    currentDocument() {
      return this.$store.getters['project/currentDocument'] || {};
    },
    items() {
      return this.currentDocument.items;
    },
    currenctDocumentType() {
      return this.currentDocument.documentType;
    },
  },

  watch: {
    items(value) {
      if (!value) return;
      this.content = generateTemplate(value);
    },
  },

  methods: {
    Export2Doc() {
      this.$refs.editor.Export2Doc(this.currentDocument.name);
    },
    Export2Excel() {
      export2Excel(this.$refs.table.$el, this.items, this.currentDocument.name);
    },
    Print() {
      this.$refs.editor.Print();
    },
  },
};
</script>

<style lang="scss" module>
@import '~/assets/scss/var.scss';

.document {
  display: flex;
  padding: 10px 0 0 0;
}

.info {
  min-width: 240px;
  margin-right: 20px;
  text-align: left;
  line-height: 1.5;
  color: #545454;

  @include media-breakpoint-down(xl) {
    min-width: 220px;
  }

  @include media-breakpoint-down(lg) {
    min-width: 210px;
  }

  button {
    padding: 0;
  }

  .header {
    font-size: 1.1rem;
    color: $secondary;
  }

  .number {
    font-size: 0.9rem;
    color: #ababab;
  }

  .warning {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .primary {
      color: $primary;
    }
  }
}

.editor {
  flex: 1 1 70%;

  table {
    font-size: 95%;
    width: 100%;

    th:nth-child(4) {
      width: 12%;
    }

    th:nth-child(5) {
      width: 40%;
    }

    @include media-breakpoint-down(xxl) {
      font-size: 80%;
    }

    @include media-breakpoint-down(xl) {
      font-size: 75%;
    }
  }
}

.jodit-document {
  max-height: calc(100vh - 260px);

  @include media-breakpoint-down(xl) {
    max-height: calc(100vh - 220px);
  }

  @include media-breakpoint-down(lg) {
    max-height: calc(100vh - 200px);
  }
}

.actions {
  min-width: 240px;
  margin-left: 20px;
  max-height: calc(100vh - 170px);

  @include media-breakpoint-down(xl) {
    max-height: calc(100vh - 130px);
    min-width: 220px;
  }

  @include media-breakpoint-down(lg) {
    max-height: calc(100vh - 110px);
    min-width: 210px;
  }

  .button:not(:first-child) {
    margin-top: 16px;

    @include media-breakpoint-down(xl) {
      margin-top: 12px;
    }

    @include media-breakpoint-down(lg) {
      margin-top: 10px;
    }
  }
}
</style>
