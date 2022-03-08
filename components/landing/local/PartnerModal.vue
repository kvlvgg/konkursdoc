<template>
    <div>
        <img :class="$style.img" :src="partner.img" :alt="partner.alt" />
        <!-- eslint-disable-next-line -->
    <div :class="$style.content" v-html="partner.content"></div>
    </div>
</template>

<script>
export default {
    props: {
        // eslint-disable-next-line
    partner: {
            required: true,
        },
    },
};
</script>

<style module lang="scss">
.img {
    max-width: 100%;
    margin-bottom: 20px;
}
.content {
    text-align: left;
}
.content b {
    font-weight: bold;
}
</style>
