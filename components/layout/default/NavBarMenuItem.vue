<template>
    <nuxt-link
        exact
        :to="link"
        :class="[$style['link'], activeClass, image === 'icon-profile' ? $style['profile'] : '']"
    >
        <div :class="$style['icon']">
            <slot name="image">
                <div :class="$style[image]"></div>
            </slot>
        </div>

        <div v-if="hasNew" :class="$style['has-new']"></div>

        <div :class="$style['label']">{{ label }}</div>
    </nuxt-link>
</template>

<script>
export default {
    props: {
        link: {
            type: [String, Object],
            default: '/',
        },

        label: {
            type: String,
            default: '',
        },

        hasNew: {
            type: Boolean,
            default: false,
        },

        image: {
            type: String,
            default: '',
        },
    },

    computed: {
        activeClass() {
            const path = this.$route.path;
            const link = typeof this.link === 'object' ? this.link.active : this.link;
            if (path === link) return this.$style.active;
            return '';
        },
    },
};
</script>

<style module lang="scss">
@import '~/assets/scss/var.scss';
@import '~/assets/scss/module/icons/search.scss';
@import '~/assets/scss/module/icons/myProjects.scss';
@import '~/assets/scss/module/icons/profile.scss';

.link {
    position: relative;
    display: flex;
    align-items: center;
    height: 60px;
    color: #8079ad;
    cursor: pointer;

    &:hover,
    &.active {
        background-color: #4a427d;
        color: #ffdbba;
    }

    @include media-breakpoint-down(xl) {
        height: 50px;
    }

    @include media-breakpoint-down(lg) {
        height: 40px;
    }
}

.profile,
.profile:hover,
.profile.active {
    height: 40px;
    background-color: #954a2b;
    color: #f8f8f8;
}

.icon {
    flex: 0 0 70px;
    width: 70px;
    text-align: center;

    display: flex;
    justify-content: center;

    @include media-breakpoint-down(xl) {
        flex: 0 0 50px;
        width: 50px;
    }

    @include media-breakpoint-down(lg) {
        flex: 0 0 40px;
        width: 40px;
    }

    svg {
        fill: #8079ad;
    }
}

.has-new {
    position: absolute;
    top: 10px;
    left: 50px;
    background-color: $primary;
    width: 8px;
    height: 8px;
    border-radius: 100%;
}

.label {
    font-size: 18px;
    padding: 0 8px 0 0;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    visibility: visible;
    transition: visibility 2s, opacity 2s;
}
</style>
