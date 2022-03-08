<template>
    <div>
        <Hero />
        <Quality />
        <Mission />
        <!-- <Schema /> -->
        <Video />
        <Services />
        <!-- <Reviews /> -->
        <Partners />
        <Pricing />
    </div>
</template>

<script>
import Hero from '~/components/landing/Hero.vue';
import Quality from '~/components/landing/Quality.vue';
import Mission from '~/components/landing/Mission.vue';
// import Schema from '~/components/landing/Schema.vue';
import Video from '~/components/landing/Video.vue';
import Services from '~/components/landing/Services.vue';
// import Reviews from '~/components/landing/Reviews.vue';
import Partners from '~/components/landing/Partners.vue';
import Pricing from '~/components/landing/Pricing.vue';

export default {
    layout: 'landing',
    scrollToTop: true,

    components: {
        Hero,
        Quality,
        Mission,
        // Schema,
        Video,
        Services,
        // Reviews,
        Partners,
        Pricing,
    },

    created() {
        if (this.$route.query.mode !== 'login') return;
        this.$modal().showSignIn();
    },
};
</script>

<style lang="scss"></style>
