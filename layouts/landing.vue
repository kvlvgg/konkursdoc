<template>
  <div class="app-page">
    <Header />

    <main class="app-main">
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
};
</script>

<style lang="scss"></style>
