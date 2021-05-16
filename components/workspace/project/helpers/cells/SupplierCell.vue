<template>
  <div :class="$style['info']">
    <span :id="`popover-${where}-supplier-${item.RowNum}`">
      <IconInfo />
    </span>

    &nbsp;

    <div>{{ item.Supplier }}</div>

    <b-popover
      :target="`popover-${where}-supplier-${item.RowNum}`"
      placement="bottomleft"
      triggers="hover focus"
      :custom-class="$style['popover']"
      boundary="viewport"
    >
      Обновление прайса:<br />
      {{ new Date(item.PriceUpdateDate).toLocaleDateString('ru-RU') }}
    </b-popover>
  </div>
</template>

<script>
import IconInfo from '~/components/icons/IconInfo.vue';

export default {
  components: {
    IconInfo,
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
</style>
