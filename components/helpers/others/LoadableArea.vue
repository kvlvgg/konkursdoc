<template>
    <div :class="$style.wrapper">
        <div>
            <slot />
        </div>

        <div v-if="isLoading" :class="$style['loader-overlay']" :style="loaderAreaStyle">
            <Loader disableBackground />
        </div>
    </div>
</template>

<script>
import Loader from '~/components/helpers/others/Loader.vue';

export default {
    components: {
        Loader,
    },

    props: {
        isLoading: {
            type: Boolean,
            default: false,
        },

        isLoaderForTable: {
            type: Boolean,
            default: false,
        },

        paddingTop: {
            type: String,
            default: '0',
        },
    },

    computed: {
        loaderAreaStyle() {
            return {
                top: this.topOffset ?? this.paddingTop,
                height: `calc(100% - ${this.topOffset ?? this.paddingTop})`,
                minHeight: '100px',
            };
        },

        topOffset() {
            // высота шапки таблицы (38px) + table-spacing: 0 0.5rem(8px)
            return this.isLoaderForTable ? '46px' : null;
        },
    },
};
</script>

<style module lang="scss">
.wrapper {
    position: relative;
}

.loader-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>
