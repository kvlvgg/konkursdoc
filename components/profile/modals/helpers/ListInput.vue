<template>
    <div :class="$style.wrapper">
        <v-input-number
            :value="value"
            size="small"
            :class="$style.input"
            :min="1"
            @input="$emit('input', $event)"
        ></v-input-number>

        <div class="font-weigth-light" :class="$style['feature-name']">
            {{ label }}
        </div>
    </div>
</template>

<script>
import VInputNumber from '~/components/helpers/form/VInputNumber.vue';
export default {
    components: {
        VInputNumber,
    },

    props: {
        label: {
            type: String,
            default: '',
        },
        value: {
            type: String,
            default: '3',
        },
    },
};
</script>

<style module lang="scss">
.wrapper {
    display: flex;
    justify-content: space-between;
}

.input,
.feature-name {
    height: rem(31);
    background: #f7f7f7;
    border-radius: rem(4);
    display: flex;
    align-items: center;
    justify-content: center;
}

.input {
    width: 24%;
    padding-right: 0;
    text-align: center;

    button {
        padding: 0;
        height: rem(30);
        width: rem(16);
        line-height: 1;
        box-shadow: 0px 0px 2px rgba(143, 134, 167, 0.14), 0px 2px 2px rgba(143, 134, 167, 0.12),
            0px 1px 3px rgba(143, 134, 167, 0.2);
        border-radius: 4px;
        border-top-left-radius: 4px !important;
        border-bottom-left-radius: 4px !important;
        border-top-right-radius: 4px !important;
        border-bottom-right-radius: 4px !important;
        border: 1px solid #dddaed;
        font-size: 16px;
    }

    input {
        padding: 0;
        height: rem(30);
    }
}

.feature-name {
    width: 72%;
    @include fontTTNormsRegular();
    justify-content: flex-start;
    padding-left: rem(5);
    font-size: 12px;
}
</style>
