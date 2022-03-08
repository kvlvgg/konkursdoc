<template>
    <div :class="[$style.unit, isWhite && $style.unit_white]">
        <h2 v-if="title.length" :class="$style.title">{{ title }}</h2>
        <h3 v-if="subtitle.length" :class="$style.subtitle">{{ subtitle }}</h3>
    </div>
</template>

<script>
export default {
    props: {
        title: {
            type: String,
            default: '',
        },

        subtitle: {
            type: String,
            default: '',
        },

        isWhite: {
            type: Boolean,
            default: false,
        },
    },
};
</script>

<style module lang="scss">
.unit {
    position: relative;
    color: $dark-blue;
    padding: 0 0 rem(16) 0;
    margin: 0 0 rem(16) 0;
    text-align: center;

    &.unit_white {
        color: $white;
    }

    &:after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 15%;
        right: 15%;
        height: rem(1);
        background: linear-gradient(90deg, transparent 0%, #c4c4c4 50%, transparent 100%);
    }

    &:before {
        content: '';
        position: absolute;
        bottom: 0;
        left: 30%;
        right: 30%;
        height: rem(1);
        box-shadow: 0 0 rem(6) rgba(34, 21, 65, 0.25);
    }
}

.title {
    @include font(34, 34);
}

.subtitle {
    @include fontTTNormsRegular();
    @include font(18, 18);
    margin: rem(16) 0 0 0;
}
</style>
