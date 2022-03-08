<template>
    <ul :class="$style.list">
        <li v-for="(item, index) in items" :key="index" :class="$style.item">
            <template v-if="item.isLink">
                <nuxt-link :to="localePath(item.url)" :class="$style.link">{{ item.name }}</nuxt-link>
            </template>
            <template v-else>
                <a href="#" :class="$style.link" @click.prevent="smoothScroll(item.url, item.offsetTop)">{{
                    item.name
                }}</a>
            </template>
        </li>
    </ul>
</template>

<script>
import smoothscroll from '~/mixins/others/smoothscroll.js';

export default {
    mixins: [smoothscroll],

    props: {
        items: {
            type: Array,
            require: true,
            default: () => [],
        },
    },
};
</script>

<style module lang="scss">
@import '~/assets/scss/var.scss';

.list {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
}

.item {
    width: 47%;
    margin: 0 0 rem(16) 0;

    &:last-child {
        margin-bottom: 0;
    }
}

.link {
    @include font(16, 16);
    color: $white;
    text-decoration: underline;

    @include hover-focus() {
        color: inherit;
        text-decoration: none;
        text-shadow: 0 0 rem(8) rgba($white, 0.5);
    }
}
</style>
