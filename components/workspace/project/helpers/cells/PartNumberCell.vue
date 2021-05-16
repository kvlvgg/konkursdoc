<template>
  <div :class="$style['info']">
    <span :id="`popover-${where}-partnumber-${item.RowNum}`">
      <IconInfo />
    </span>

    &nbsp;

    <div :class="$style['container-overflow']">
      <RunningString
        :value="item.Partnumber"
        :class="$style['partnumber-running-string']"
      />
      <!-- {{ item.Partnumber }} -->
    </div>

    <b-popover
      :target="`popover-${where}-partnumber-${item.RowNum}`"
      placement="bottomleft"
      triggers="hover focus"
      :custom-class="$style['popover']"
      boundary="viewport"
    >
      {{ item.Description }}
    </b-popover>
  </div>
</template>

<script>
import IconInfo from '~/components/icons/IconInfo.vue';
import RunningString from '~/components/workspace/project/helpers/others/RunningString.vue';

export default {
  components: {
    IconInfo,
    RunningString,
  },

  props: {
    item: {
      type: Object,
      default: null,
    },

    /**
     * Чтобы давать уникальные id
     */
    where: {
      type: String,
      default: '',
    },
  },
};
</script>

<style module lang="scss">
@import './cell.scss';

.partnumber-running-string {
  width: 150px;

  @include media-breakpoint-down(xl) {
    width: 120px;
  }

  @include media-breakpoint-down(lg) {
    width: 110px;
  }
}
</style>
