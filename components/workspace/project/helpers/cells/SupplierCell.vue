<template>
    <div :class="$style['info']">
        <span :id="`popover-${where}-supplier-${rownum}`">
            <IconInfo />
        </span>

        &nbsp;

        <div>{{ item.provider }}</div>

        <b-popover
            :target="`popover-${where}-supplier-${rownum}`"
            placement="bottomleft"
            triggers="hover focus"
            :custom-class="$style['popover']"
            boundary="viewport"
        >
            Обновление прайса:<br />
            {{ item.updateDate | date }}
        </b-popover>
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import IconInfo from '@/components/icons/IconInfo.vue';

import SearchProduct from '@/classes/SearchProduct';

@Component({
    components: {
        IconInfo,
    },
})
export default class ProviderCell extends Vue {
    @Prop({ type: Object, default: null }) item!: SearchProduct;
    @Prop({ type: Number, default: null }) rownum!: number;
    @Prop({ type: String, default: null }) where!: string;
}
</script>

<style module lang="scss">
@import './cell.scss';
</style>
