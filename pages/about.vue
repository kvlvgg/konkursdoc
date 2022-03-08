<template>
    <div>
        <nuxt-link :to="localePath('index')">main</nuxt-link>
    </div>
</template>

<script>
export default {
    layout: 'default',
    scrollToTop: true,
};
</script>

<style module lang="scss">
@import '~/assets/scss/var.scss';
</style>
