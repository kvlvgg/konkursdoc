<template>
    <div :class="$style['text-limit']">
        {{ sliceText }}
        <span v-if="!isFull && moreBtn" :class="$style['text-limit__more']" @click="$emit('click:more')"
            >Подробнее</span
        >
    </div>
</template>

<script>
export default {
    props: {
        text: {
            type: String,
            required: true,
        },
        chars: {
            type: [String, Number],
            required: true,
        },
        moreBtn: {
            type: Boolean,
            default: false,
        },
    },
    emits: ['click:more'],

    computed: {
        sliceText() {
            const text = this.onlyText.slice(0, this.chars);
            return this.onlyText.length > text.length ? text + '...' : text;
        },
        onlyText() {
            // удаляем все html теги
            return this.text.replace(/<\/?[a-zA-Z]+>/gi, '');
        },
        isFull() {
            return this.onlyText.length === this.sliceText.length;
        },
    },
};
</script>

<style lang="scss" module>
.text-limit__more {
    color: $primary;
}
.text-limit b {
    font-weight: bold;
}
</style>
