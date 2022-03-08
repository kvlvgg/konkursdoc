<template>
    <div :class="$style['info']">
        <span :id="`popover-${where}-partnumber-${rownum}`">
            <IconInfo />
        </span>

        &nbsp;

        <div :class="$style['container-overflow']">
            <RunningString :value="item.partNumber" :class="$style['partnumber-running-string']" />
            <!-- {{ item.Partnumber }} -->
        </div>

        <b-popover
            :target="`popover-${where}-partnumber-${rownum}`"
            placement="bottomleft"
            triggers="hover focus"
            :custom-class="$style['popover']"
            boundary="viewport"
        >
            {{ item.description }}
        </b-popover>
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import IconInfo from '@/components/icons/IconInfo.vue';
import RunningString from '@/components/workspace/project/helpers/others/RunningString.vue';

import SearchProduct from '@/classes/SearchProduct';

@Component({
    components: {
        IconInfo,
        RunningString,
    },
})
export default class PartNumberCell extends Vue {
    @Prop({ type: Object, default: null }) item!: SearchProduct;
    @Prop({ type: Number, default: null }) rownum!: number;
    @Prop({ type: String, default: null }) where!: string;
}
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
