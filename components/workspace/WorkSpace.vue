<template>
    <div>
        <slot name="head"></slot>
        <div :class="$style['container-fluid']">
            <div :class="[$style['main'], !taskPaneToggled ? $style['w-100'] : '']">
                <slot name="workspace"></slot>
            </div>

            <div :class="[$style['taskpane'], !taskPaneToggled ? $style['hidden'] : '']">
                <slot name="taskpane"></slot>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        taskPaneToggled: {
            type: Boolean,
            default: false,
        },
    },
};
</script>

<style module lang="scss">
@import '~/assets/scss/var.scss';

.container-fluid {
    width: 100%;
    display: flex;
    position: relative;
}

.main {
    flex: 1 0 calc(100% - 260px);
    padding-right: 20px;
    max-width: calc(100% - 260px);
    overflow-y: auto;

    transition-property: padding-right;
    transition-duration: 0s;
    transition-delay: 0s;

    @include media-breakpoint-down(xl) {
        flex: 1 1 calc(100% - 230px);
        max-width: calc(100% - 230px);
    }

    @include media-breakpoint-down(lg) {
        flex: 1 1 calc(100% - 210px);
        max-width: calc(100% - 210px);
    }

    &.w-100 {
        max-width: 100%;
        padding-right: 0px;

        transition-delay: 0.2s;
    }
}

.taskpane {
    flex: 0 0 260px;
    max-width: 260px;

    transition-property: transform, max-width;
    transition-duration: 0.2s, 0s;
    transition-delay: 0.2s, 0s;

    @include media-breakpoint-down(xl) {
        max-width: 240px;
        flex: 0 0 240px;
    }

    @include media-breakpoint-down(lg) {
        max-width: 220px;
        flex: 0 0 220px;
    }

    &::-webkit-scrollbar-track {
        margin: 20px 0px;
    }

    &.hidden {
        max-width: 0px;
        flex: none;

        transition-delay: 0s, 0.2s;
        transform: translateX(280px);

        @include media-breakpoint-down(xl) {
            transform: translateX(260px);
        }

        @include media-breakpoint-down(lg) {
            transform: translateX(240px);
        }
    }
}

.taskpane-button-hidder {
    height: 40px;
    width: 40px;
    padding: 0;
    position: absolute;
    top: 20px;
    right: 0;
    z-index: 951;
}
</style>
