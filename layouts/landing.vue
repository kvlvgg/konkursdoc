<template>
    <div :class="$style.app">
        <Header />

        <main>
            <Nuxt />
        </main>

        <Footer />
    </div>
</template>

<script>
import Header from '~/components/layout/landing/Header.vue';
import Footer from '~/components/layout/landing/Footer.vue';

export default {
    components: {
        Header,
        Footer,
    },

    head() {
        const i18nSeo = this.$nuxtI18nHead();
        return { ...i18nSeo };
    },
};
</script>

<style module lang="scss">
.app {
    position: relative;
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    // display: block;
    width: 100%;
    // overflow: hidden;
}
</style>
