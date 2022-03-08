<template>
    <div :class="$style['multiple-choice-select']">
        <div class="form-control" :class="$style.sm">
            <input
                :value="
                    value.length !== 0
                        ? array2ValueAndRestCount(options.filter(x => value.some(y => x.value === y)).map(x => x.label))
                        : placeholder
                "
                type="text"
                readonly
                :class="[$style.input, value.length === 0 ? $style.placehoder : '']"
            />

            <span v-if="value.length !== 0" class="vs__clear" :class="$style['cross']" @click="mutableValue = []">
                <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10">
                    <path
                        d="M6.895455 5l2.842897-2.842898c.348864-.348863.348864-.914488 0-1.263636L9.106534.261648c-.348864-.348864-.914489-.348864-1.263636 0L5 3.104545 2.157102.261648c-.348863-.348864-.914488-.348864-1.263636 0L.261648.893466c-.348864.348864-.348864.914489 0 1.263636L3.104545 5 .261648 7.842898c-.348864.348863-.348864.914488 0 1.263636l.631818.631818c.348864.348864.914773.348864 1.263636 0L5 6.895455l2.842898 2.842897c.348863.348864.914772.348864 1.263636 0l.631818-.631818c.348864-.348864.348864-.914489 0-1.263636L6.895455 5z"
                    ></path>
                </svg>
            </span>

            <span :class="[$style['arrow'], collapsed ? $style['collapsed'] : '']" @click="collapsed ? show() : hide()">
                <svg width="12" height="6" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M.984.984h10.032L6 6 .984.984z" fill="#4B4862" />
                </svg>
            </span>
        </div>

        <div :class="[$style.options, collapsed ? $style.collapsed : '']">
            <div v-for="(option, index) in options" :key="index">
                <b-form-checkbox v-model="mutableValue" :value="option.value" :class="$style['option']">
                    {{ option.label }}
                </b-form-checkbox>
            </div>
        </div>
    </div>
</template>

<script>
import array2ValueAndRestCount from '~/mixins/formatters/array2ValueAndRestCount.js';

export default {
    name: 'v-multiple-select-input',

    mixins: [array2ValueAndRestCount],

    props: {
        value: {
            type: Array,
            default: () => [],
        },
        options: {
            type: Array,
            default: () => [],
        },
        placeholder: {
            type: String,
            default: 'Не выбрано',
        },
    },

    data() {
        return {
            mutableValue: [],
            collapsed: true,

            // crunch prevent first watcher acting
            isFirstTimeMutableValueChanging: true,
        };
    },

    watch: {
        mutableValue() {
            if (this.isFirstTimeMutableValueChanging) {
                this.isFirstTimeMutableValueChanging = false;
                return;
            }
            this.$emit('input', this.mutableValue);
        },
    },

    mounted() {
        this.mutableValue = Array.from(this.value);
    },

    methods: {
        show() {
            document.addEventListener('mouseup', this.hideOnMouseClickOutSide);
            this.collapsed = false;
        },
        hide() {
            this.collapsed = true;
            document.removeEventListener('mouseup', this.hideOnMouseClickOutSide);
        },
        hideOnMouseClickOutSide(e) {
            let el = e.target;
            while (el !== this.$el && el != null) {
                el = el.parentElement;
            }
            if (!el) this.hide();
        },
    },
};
</script>

<style module lang="scss">
@import '~/assets/scss/var.scss';

.multiple-choice-select {
    position: relative;
}

.sm {
    height: $input-height-sm;
}

.input {
    border: none;
    background-color: $input-bg;
    width: 85%;
    font-size: $input-font-size;
    color: $gray-700;
    padding: 0 2px;

    @include media-breakpoint-down(xl) {
        @include font-size($input-font-size * 0.85);
    }

    @include media-breakpoint-down(lg) {
        @include font-size($input-font-size * 0.75);
    }
}

.placehoder {
    color: #adb5c7;
}

.arrow {
    position: absolute;
    top: 0;
    right: 0.75rem;
    height: 100%;
    display: flex;
    align-items: center;
    cursor: pointer;

    &:not(.collapsed) {
        transform: rotate(180deg);
    }
}

.cross {
    position: absolute;
    top: 0;
    right: 1.5rem;
    height: 100%;
    display: flex;
    align-items: center;
    cursor: pointer;
}

.options {
    position: absolute;
    // overflow: auto;
    // max-height: 150px;
    z-index: 951;
    background-color: $input-bg;
    padding: 0.5rem 1rem;
    width: 100%;
    border: 1px solid #dddaed;
    border-radius: 4px;
    color: $secondary-dark;
    box-shadow: $box-shadow-sm;
    text-align: left;
    line-height: 1;

    &.collapsed {
        display: none;
    }

    div:not(:last-child) {
        margin-bottom: 0.8rem;
    }
}
</style>
