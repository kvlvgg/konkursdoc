<template>
    <b-input-group :class="[$style.input_group, $style[size], autoWidth && $style.input_auto_width]">
        <template #prepend>
            <b-button
                :size="size"
                variant="light"
                :class="$style.button"
                @click="onButtonClick('decrement')"
                @keydown.prevent
                @keyup.enter="$emit('enter')"
                >-</b-button
            >
        </template>

        <masked-input
            :value="value.toString()"
            :size="value.toString().length"
            :class="['form-control', $style.input]"
            :mask="[/\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/]"
            :guide="false"
            @input="onInput($event)"
            @keyup.enter="$emit('enter')"
        />

        <template #append>
            <b-button
                :size="size"
                variant="light"
                :class="$style.button"
                @click="onButtonClick('increment')"
                @keydown.prevent
                @keyup.enter="$emit('enter')"
                >+</b-button
            >
        </template>
    </b-input-group>
</template>

<script>
import MaskedInput from 'vue-text-mask';

export default {
    name: 'v-input-number',

    components: {
        MaskedInput,
    },

    props: {
        value: {
            type: [Number, String],
            default: 0,
        },

        /**
         * Размер элементов, по умолчанию обычный
         * - sm
         * - lg (пока отключен в стилях бутстрапа)
         */
        size: {
            type: String,
            default: '',
        },

        /**
         * автоматическая ширина нужно стилизовать контейнер в том месте где выводится компонент
         */
        autoWidth: {
            type: Boolean,
            default: false,
        },
    },

    methods: {
        /**
         * Изменение количества вручную
         * @return void
         */
        onInput(value) {
            this.$emit('input', parseInt(value) || 0);
        },

        /**
         * Изменение количества с помощью кнопок счетчика
         * @return void
         */
        onButtonClick(operation, event) {
            let value = this.value;
            if (operation === 'decrement' && value > 0) value--;
            if (operation === 'increment') value++;
            this.$emit('input', value.toString());
        },
    },
};
</script>

<style module lang="scss">
@import '~/assets/scss/var.scss';

.input_group {
    flex-wrap: nowrap;

    &.sm {
        margin: 0 auto;

        input {
            height: rem(28);
            border: rem(1) solid #dddaed !important;
            font-size: 100%;

            @include media-breakpoint-down(xl) {
                height: rem(24);
            }

            @include media-breakpoint-down(lg) {
                height: rem(22);
            }
        }

        .button,
        .input {
            border-radius: rem(4) !important;
            margin: 0 rem(2);
        }
    }

    &.input_auto_width {
        .input {
            width: auto !important;
            flex: inherit !important;
        }
    }
}

.input {
    padding: 0 rem(4);
    text-align: center;
}

.button {
    border: rem(1) solid #dddaed;
    box-shadow: none;
}
</style>
