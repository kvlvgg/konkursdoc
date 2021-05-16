<template>
  <div>
    <Hero />
    <Quality />
    <Advantages />
    <Mission />
    <Problems />
    <Schema />
    <Video />
    <FAQ />
    <Services />
    <Reviews />
    <Pricing />
  </div>
</template>

<script>
import Hero from '~/components/landing/Hero.vue';
import Quality from '~/components/landing/Quality.vue';
import Advantages from '~/components/landing/Advantages.vue';
import Mission from '~/components/landing/Mission.vue';
import Problems from '~/components/landing/Problems.vue';
import Schema from '~/components/landing/Schema.vue';
import Video from '~/components/landing/Video.vue';
import FAQ from '~/components/landing/FAQ.vue';
import Services from '~/components/landing/Services.vue';
import Reviews from '~/components/landing/Reviews.vue';
import Pricing from '~/components/landing/Pricing.vue';

export default {
  layout: 'landing',
  scrollToTop: true,

  components: {
    Hero,
    Quality,
    Advantages,
    Mission,
    Problems,
    Schema,
    Video,
    FAQ,
    Services,
    Reviews,
    Pricing,
  },

  created() {
    if (this.$route.query.mode !== 'login') return;
    this.$modal().showSignIn();
  },
};
</script>

<style lang="scss"></style>
