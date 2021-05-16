<template>
  <div
    :class="[$style['doc-entry'], isSelected ? $style['selected'] : '']"
    @click="$emit('click')"
  >
    <!-- v-b-tooltip.hover.top="doc['Документ']" -->
    <div :class="$style['image']">
      <span
        v-if="document.extension === '.docx'"
        :class="$style['icon-docx']"
      />

      <span
        v-if="document.extension === '.xslx'"
        :class="$style['icon-xlsx']"
      />
    </div>

    <span :class="$style['name']">
      {{ `${document.name}${document.extension}` }}
    </span>

    <div :class="$style['image']">
      <span :class="$style['icon-printer']" />
    </div>

    <div :class="$style['image']">
      <span :class="$style['icon-download']" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    document: {
      type: Object,
      default: null,
    },
    isSelected: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style module lang="scss">
@import '~/assets/scss/var.scss';
@import '~/assets/scss/module/icons/xlsx.scss';
@import '~/assets/scss/module/icons/docx.scss';
@import '~/assets/scss/module/icons/printer.scss';
@import '~/assets/scss/module/icons/download.scss';

.doc-entry {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: $input-bg;
  border: 1px solid #dddaed;
  border-radius: 4px;
  font-size: 12px;
  cursor: pointer;

  &:not(:first-child) {
    margin-top: 8px;

    @include media-breakpoint-down(xl) {
      margin-top: 6px;
    }

    @include media-breakpoint-down(lg) {
      margin-top: 4px;
    }
  }

  .icon-xlsx {
    @include icon-xlsx($secondary-dark);
  }

  .icon-docx {
    @include icon-docx($secondary-dark);
  }

  .icon-printer {
    @include icon-printer($secondary-dark);
  }

  .icon-download {
    @include icon-download($secondary-dark);
  }

  @include hover() {
    background-color: $secondary-lightest;
  }

  &.selected {
    cursor: initial;
    background-color: $secondary-dark;
    color: #ffffff;

    .icon-xlsx {
      @include icon-xlsx(#ffffff);
    }

    .icon-docx {
      @include icon-docx(#ffffff);
    }

    .icon-printer {
      @include icon-printer(#ffffff);
    }

    .icon-download {
      @include icon-download(#ffffff);
    }
  }

  .image {
    width: 12%;
    padding: 6px;
    cursor: pointer;

    @include media-breakpoint-down(xl) {
      padding: 4px;
    }

    @include media-breakpoint-down(lg) {
      padding: 2px;
    }
  }

  .name {
    width: 60%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    text-align: left;
  }
}
</style>
