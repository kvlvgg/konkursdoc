<template>
    <header :class="$style['header']">
        <div class="container" :class="$style['header-container']">
            <nav :class="$style['header-navbar']">
                <a href="#" @click.prevent="smoothScroll('hero-block', 0)">
                    <img
                        :class="$style['header-logo-img']"
                        width="232px"
                        height="29px"
                        src="~assets/svg/logo-row-color.svg"
                        alt="logo"
                    />
                </a>

                <div :class="$style['header-navbar-nav']">
                    <div :class="$style['header-navbar-item']">
                        <a
                            href="#"
                            :class="$style['header-navbar-link']"
                            @click.prevent="smoothScroll('mission-block', 10)"
                            >Наша миссия</a
                        >
                    </div>

                    <div :class="$style['header-navbar-item']">
                        <a
                            href="#"
                            :class="$style['header-navbar-link']"
                            @click.prevent="smoothScroll('services-block', 10)"
                            >Услуги</a
                        >
                    </div>
                    <!-- <div :class="$style['header-navbar-item']">
            <a
              href="#"
              :class="$style['header-navbar-link']"
              @click.prevent="smoothScroll('schema-block', 10)"
              >Обмен КП</a
            >
          </div> -->

                    <div :class="$style['header-navbar-item']">
                        <a
                            href="#"
                            :class="$style['header-navbar-link']"
                            @click.prevent="smoothScroll('video-block', 10)"
                            >Смотреть видео</a
                        >
                    </div>

                    <div :class="$style['header-navbar-item']">
                        <a
                            href="#"
                            :class="$style['header-navbar-link']"
                            @click.prevent="smoothScroll('partners-block', 10)"
                            >Партнёры</a
                        >
                    </div>

                    <div :class="$style['header-navbar-item']">
                        <a
                            href="#"
                            :class="$style['header-navbar-link']"
                            @click.prevent="smoothScroll('pricing-block', 10)"
                            >Тарифы</a
                        >
                    </div>
                </div>

                <div>
                    <b-button type="button" variant="gr-primary" @click="$modal().showSignUp()"> Регистрация </b-button>
                    <b-button
                        type="button"
                        variant="link"
                        class="font-weight-bold"
                        :class="$style['header-navbar-link-login']"
                        @click="$modal().showSignIn()"
                        >Войти</b-button
                    >
                </div>
            </nav>
        </div>
    </header>
</template>

<script>
import smoothscroll from '~/mixins/others/smoothscroll.js';

export default {
    mixins: [smoothscroll],
};
</script>

<style module lang="scss">
@import '~/assets/scss/var.scss';

.header {
    position: sticky;
    top: 0;
    left: 0;
    height: rem(60);
    width: 100%;
    padding: 0 rem(16);
    background-color: rgba(#f1f1f1, 0.9);
    backdrop-filter: blur(rem(10));
    overflow: hidden;
    z-index: 1000;
}

.header-container {
    height: 100%;
}

.header-navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 100%;
}

.header-logo-img {
    pointer-events: none;
    user-select: none;
}

.header-navbar-nav {
    display: none;

    @include media-breakpoint-up(lg) {
        display: flex;
    }
}

.header-navbar-item {
    display: flex;
    align-items: center;
    padding: rem(8);

    @include media-breakpoint-up(lg) {
        padding-left: rem(16);
        padding-right: rem(16);
    }
}

.header-navbar-link {
    color: #4f4f4f;
    text-decoration: none;

    @include hover-focus() {
        color: inherit;
        text-decoration: none;
    }
}

.header-navbar-link-login {
    color: #4f4f4f;

    @include hover-focus() {
        color: inherit;
        text-decoration: none;
    }
}
</style>
