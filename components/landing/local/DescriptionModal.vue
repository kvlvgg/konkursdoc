<template>
    <div :class="$style['description']">{{ text }}</div>
</template>

<script>
export default {
    props: {
        text: {
            type: String,
            required: true,
        },
    },
};
</script>

<style lang="scss" module>
.description {
    line-height: 20px;
    word-wrap: break-word;
}
</style>
