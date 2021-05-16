<template>
  <header :class="$style['header']">
    <div class="container" :class="$style['header-container']">
      <nav :class="$style['header-navbar']">
        <a href="#" @click.prevent="smoothScroll('hero-block')">
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
              @click.prevent="smoothScroll('advantages-block')"
            >
              Преимущества
            </a>
          </div>

          <div :class="$style['header-navbar-item']">
            <a
              href="#"
              :class="$style['header-navbar-link']"
              @click.prevent="smoothScroll('schema-block')"
            >
              Обмен КП
            </a>
          </div>

          <div :class="$style['header-navbar-item']">
            <a
              href="#"
              :class="$style['header-navbar-link']"
              @click.prevent="smoothScroll('video-block')"
            >
              Смотреть видео
            </a>
          </div>

          <div :class="$style['header-navbar-item']">
            <a
              href="#"
              :class="$style['header-navbar-link']"
              @click.prevent="smoothScroll('services-block')"
            >
              Услуги
            </a>
          </div>

          <div :class="$style['header-navbar-item']">
            <a
              href="#"
              :class="$style['header-navbar-link']"
              @click.prevent="smoothScroll('pricing-block')"
            >
              Тарифы
            </a>
          </div>
        </div>

        <div>
          <b-button
            type="button"
            variant="gr-primary"
            @click="$modal().showSignUp()"
          >
            Регистрация
          </b-button>
          <b-button
            type="button"
            variant="link"
            class="font-weight-bold"
            :class="$style['header-navbar-link-login']"
            @click="$modal().showSignIn()"
          >
            Войти
          </b-button>
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
  position: fixed;
  top: 0;
  left: 0;
  height: 60px;
  width: 100%;
  padding: 0 1rem;
  background-color: rgba(#f1f1f1, 0.9);
  backdrop-filter: blur(10px);
  overflow: hidden;
  z-index: 5;
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
  padding: 0.5rem;

  @include media-breakpoint-up(lg) {
    padding-left: 1rem;
    padding-right: 1rem;
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
