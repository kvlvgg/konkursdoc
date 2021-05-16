<template>
  <footer :class="$style['footer']">
    <div class="container">
      <div :class="$style['footer-row']">
        <div :class="$style['footer-col']">
          <div :class="$style['footer-logo']">
            <img
              :class="$style['footer-logo-icon']"
              src="~assets/svg/logo-row-white.svg"
              alt="logo"
            />
          </div>

          <div :class="$style['footer-text']">
            <nuxt-link exact to="/" :class="$style['footer-nav-link']"
              >Пользовательское соглашение</nuxt-link
            >
            <span>и</span>
            <nuxt-link exact to="/" :class="$style['footer-nav-link']"
              >политика конфиденциальности 152 ФЗ</nuxt-link
            >
          </div>

          <div :class="$style['footer-copyright']">
            © 2020 ООО «KONKURS DOC»
          </div>
        </div>

        <div :class="$style['footer-col']">
          <div class="font-weight-bold" :class="$style['footer-nav-title']">
            Популярные категории
          </div>
          <nav :class="$style['footer-nav']">
            <div :class="$style['footer-nav-item']">
              <a
                href="#"
                :class="$style['footer-nav-link']"
                @click.prevent="smoothScroll('faq-block')"
                >Часто задаваемые вопросы</a
              >
            </div>

            <div :class="$style['footer-nav-item']">
              <a
                href="#"
                :class="$style['footer-nav-link']"
                @click.prevent="smoothScroll('video-block')"
                >Смотреть видео</a
              >
            </div>

            <div :class="$style['footer-nav-item']">
              <a
                href="#"
                :class="$style['footer-nav-link']"
                @click.prevent="smoothScroll('advantages-block')"
                >Преимущества</a
              >
            </div>

            <div :class="$style['footer-nav-item']">
              <a
                href="#"
                :class="$style['footer-nav-link']"
                @click.prevent="smoothScroll('schema-block')"
                >Обмен КП</a
              >
            </div>

            <div :class="$style['footer-nav-item']">
              <a
                href="#"
                :class="$style['footer-nav-link']"
                @click.prevent="smoothScroll('hero-block')"
                >Главная</a
              >
            </div>
          </nav>
        </div>

        <div :class="$style['footer-col']">
          <div class="font-weight-bold" :class="$style['footer-nav-title']">
            Информация о копмании
          </div>
          <nav :class="$style['footer-nav']">
            <div :class="$style['footer-nav-item']">
              <nuxt-link exact to="/about" :class="$style['footer-nav-link']"
                >О компании</nuxt-link
              >
            </div>

            <div :class="$style['footer-nav-item']">
              <a
                href="#"
                :class="$style['footer-nav-link']"
                @click.prevent="smoothScroll('mission-block')"
                >Наша миссия</a
              >
            </div>

            <div :class="$style['footer-nav-item']">
              <a
                href="#"
                :class="$style['footer-nav-link']"
                @click.prevent="smoothScroll('services-block')"
                >Услуги</a
              >
            </div>

            <div :class="$style['footer-nav-item']">
              <a
                href="#"
                :class="$style['footer-nav-link']"
                @click.prevent="smoothScroll('pricing-block')"
                >Тарифы</a
              >
            </div>

            <div :class="$style['footer-nav-item']">
              <a
                href="#"
                :class="$style['footer-nav-link']"
                @click.prevent="smoothScroll('reviews-block')"
                >Отзывы</a
              >
            </div>
          </nav>
        </div>

        <div :class="$style['footer-col']">
          <div class="font-weight-bold" :class="$style['footer-nav-title']">
            ООО «KONKURS DOC»
          </div>

          <nav :class="$style['footer-nav']">
            <div :class="$style['footer-nav-item']">
              <a href="tel:+79653438937" :class="$style['footer-nav-link']"
                >8 (965) 343-89-37</a
              >
            </div>

            <div :class="$style['footer-nav-item']">
              <a
                href="mailto:info@konkursdoc.com"
                :class="$style['footer-nav-link']"
                >info@konkursdoc.com</a
              >
            </div>
          </nav>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
import smoothscroll from '~/mixins/others/smoothscroll.js';

export default {
  mixins: [smoothscroll],
};
</script>

<style module lang="scss">
@import '~/assets/scss/var.scss';

.footer {
  padding: 2rem 0 3.5rem;
  color: $white;
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
  background-image: url(~assets/image/bg-footer.jpg);
}

.footer-row {
  display: flex;
}

.footer-col {
  flex: 1 0 25%;
  max-width: 25%;
  padding: 0 1rem 0 0;
  text-align: left;

  &:last-child {
    padding-right: 0;
    text-align: right;
  }
}

.footer-logo {
  padding: 0 0 1rem 0;
}

.footer-logo-icon {
  max-width: 100%;
}

.footer-text {
  font-size: 14px;
}

.footer-copyright {
  font-size: 14px;
  padding: 2rem 0 0 0;
}

.footer-nav-title {
  padding: 0 0 1.25rem 0;
  text-transform: uppercase;
}

.footer-nav {
  display: flex;
  flex-direction: column;
}

.footer-nav-item {
  padding: 0 0 1rem 0;

  &:last-child {
    padding-bottom: 0;
  }
}

.footer-nav-link {
  color: $white;
  text-decoration: none;

  @include hover-focus() {
    color: inherit;
    text-decoration: none;
    text-shadow: 0 0 0.5rem rgba($white, 0.5);
  }
}
</style>
