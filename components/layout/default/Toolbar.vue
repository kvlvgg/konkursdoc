<template>
  <header :class="$style['toolbar']">
    <div
      :class="$style['icon-menu-expander']"
      @click="$emit('expand-nav-bar')"
    />

    <div :class="$style['content']">
      <div :class="$style['item']">
        <div :class="$style['currency']">
          USD ЦБ
          {{ formatCurrency($store.getters['common/exchangeRate'].USD.RUB) }}
        </div>
      </div>

      <!-- <div :class="$style['separator']" />

      <div
        :class="[$style['item'], $style['notifier']]"
        @click="notificationCount++"
      >
        <img src="~assets/svg/toolbar/notification.svg" alt="notification" />

        <div v-if="notificationCount" :class="$style['count']">
          {{ notificationCount }}
        </div>
      </div> -->

      <div :class="$style['separator']" />

      <nuxt-link exact to="/profile" :class="$style['item']">
        <img
          src="~assets/svg/toolbar/person.svg"
          alt="person"
          :class="$style['avatar']"
        />

        <div>
          <div :class="$style['name']">Александр</div>
          <div class="font-weight-light" :class="$style['role']">
            Организатор
          </div>
        </div>
      </nuxt-link>
    </div>
  </header>
</template>

<script>
import currency from 'currency.js';

export default {
  name: 'toolbar',

  data() {
    return {
      notificationCount: 0,
    };
  },

  created() {
    this.$store.dispatch('common/loadUSDtoRUBexchangeRate');
    this.$store.dispatch('common/loadRUBtoUSDexchangeRate');
  },

  methods: {
    formatCurrency(value) {
      return currency(value, {
        precision: 2,
        symbol: '$',
        separator: ' ',
        pattern: `# !`,
      }).format();
    },
  },
};
</script>

<style module lang="scss">
@import '~/assets/scss/var.scss';
@import '~/assets/scss/module/icons/menuExpander.scss';

.toolbar {
  display: flex;
  align-items: center;
  height: 70px;
  padding: 10px 50px 10px 10px;
  margin: 0 0 16px 0;
  background-color: #ffffff;
  border-bottom: 2px solid #ffcea0;
  box-shadow: $box-shadow;

  @include media-breakpoint-down(xl) {
    height: 50px;
    margin: 0 0 10px 0;
  }

  @include media-breakpoint-down(lg) {
    height: 40px;
    margin: 0 0 8px 0;
  }
}

.content {
  flex: 1 1 100%;
  display: flex;
  justify-content: flex-end;
  align-items: stretch;
}

.item {
  display: flex;
  justify-content: center;
  align-items: center;
}

.currency {
  padding: 0.5rem;
  color: $secondary-dark;
  font-size: 14px;
  border: 1px solid $secondary-dark;
  border-radius: $border-radius;

  @include media-breakpoint-down(xl) {
    font-size: 90%;
  }

  @include media-breakpoint-down(lg) {
    font-size: 80%;
  }
}

.notifier {
  position: relative;

  @include media-breakpoint-down(xl) {
    img {
      height: 20px;
    }
  }

  @include media-breakpoint-down(lg) {
    img {
      height: 16px;
    }
  }

  .count {
    position: absolute;
    top: 4px;
    left: 12px;
    color: #ffffff;
    background-color: $secondary;
    border-radius: 4px;
    border-radius: 5px;
    padding: 2px 3px;
    font-size: 10px;
  }
}

.avatar {
  padding: 6px;
  margin: 0 1rem 0 0;
  border: 1px solid $primary;
  border-radius: 4px;

  @include media-breakpoint-down(xl) {
    height: 30px;
  }

  @include media-breakpoint-down(lg) {
    height: 26px;
  }
}

.name {
  color: $secondary-dark;
  font-size: 18px;
  margin-bottom: 4px;

  @include media-breakpoint-down(xl) {
    font-size: 90%;
  }
}

.role {
  color: $secondary-dark;
  font-size: 12px;

  @include media-breakpoint-down(xl) {
    font-size: 90%;
  }
}

.separator {
  margin: 0 30px;
  border-left: 1px solid #c4c4c4;
}

.icon-menu-expander {
  margin: 0 0 0 10px;

  @include media-breakpoint-down(xl) {
    margin: 0;
  }

  @include media-breakpoint-down(lg) {
    margin: 0;
  }
}
</style>
