<template>
    <div :class="$style['panel']">
        <div v-if="collapsable || toggable">
            <h3 v-if="header && collapsable" v-b-toggle:collapse-filter-1 :class="headerClasses">
                <div>{{ header }}</div>
                <div>
                    <svg width="10" height="5" viewBox="0 0 10 5" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10 5L5 4.37114e-07L0 5L10 5Z" fill="#9F96B9" />
                    </svg>
                </div>
            </h3>

            <h3 v-if="header && toggable" :class="headerClasses" @click.stop="$emit('toggle')">
                <div>{{ header }}</div>

                <div>⏵</div>
            </h3>

            <b-collapse :id="'collapse-filter-1'" v-model="collapseVisible" accordion="collapse-filter-1">
                <div :class="bodyClasses">
                    <slot></slot>
                </div>
            </b-collapse>
        </div>

        <div v-else>
            <h3 v-if="header" :class="headerClasses">
                {{ header }}
            </h3>

            <div :class="bodyClasses">
                <slot></slot>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        toggable: { type: Boolean, default: false },
        collapsable: { type: Boolean, default: false },
        header: { type: String, default: null },
        headerColor: { type: String, default: 'secondary-light' },
        headerWeight: { type: String, default: 'normal' },
        headerPadding: { type: Number, default: null },
        bodyPadding: { type: Number, default: 14 },
    },
    data() {
        return {
            collapseVisible: true,
        };
    },
    computed: {
        headerClasses() {
            return [
                this.$style.header,
                this.$style[`color-${this.headerColor}`],
                `font-weight-${this.headerWeight}`,
                this.headerPadding !== null ? this.$style[`padding-${this.headerPadding}`] : '',
                this.collapseVisible ? this.$style.collapsed : '',
                this.toggable ? this.$style.toggable : '',
            ];
        },
        bodyClasses() {
            return [this.$style.body, this.$style[`padding-${this.bodyPadding}`]];
        },
    },
};
</script>

<style lang="scss" module>
@import '~/assets/scss/var.scss';

.panel {
    margin-bottom: 10px;
    background-color: $white;
    box-shadow: $box-shadow;
    border-radius: 4px;
}

.header {
    display: flex;
    justify-content: space-between;
    font-size: 18px;
    padding: 1rem;

    &.collapsed {
        border-bottom: 1px solid $secondary-light;
    }

    &:not(.collapsed) {
        svg {
            transform: rotate(-180deg);
        }
    }

    &.toggable {
        cursor: pointer;
    }

    @include media-breakpoint-down(xl) {
        font-size: 16px;
        padding: 0.7rem;
    }

    @include media-breakpoint-down(lg) {
        font-size: 14px;
        padding: 0.5rem;
    }
}

.body {
    color: $secondary-dark;
    line-height: 150%;
}

@each $padding in (0, 10, 14) {
    .padding-#{$padding} {
        padding: #{$padding}px;

        @include media-breakpoint-down(xl) {
            padding: #{$padding * 0.7}px;
        }
    }
}

@each $color, $code in (secondary-light: $secondary-light, secondary: $secondary, secondary-neutral: $secondary-neutral)
{
    .color-#{$color} {
        color: $code;
    }
}
</style>
