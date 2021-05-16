<template>
  <div :class="$style.marquee">
    <span
      ref="floatingElement"
      :class="[
        $style['animation'],
        shortStringAnimation ? $style['short-string-animation'] : '',
        longStringAnimation ? $style['long-string-animation'] : '',
      ]"
    >
      {{ value }}
    </span>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      default: '',
    },
  },

  data() {
    return {
      resizeObserver: null,

      shortStringAnimation: false,
      longStringAnimation: false,
    };
  },

  mounted() {
    const width = this.$refs.floatingElement.offsetWidth;

    if (width === 0) this.resizeObserver = this.createResizeObserver();
    else this.widthChanged();
  },

  methods: {
    createResizeObserver() {
      return new ResizeObserver(this.widthChanged).observe(
        this.$refs.floatingElement
      );
    },

    widthChanged() {
      const width = this.$refs.floatingElement.offsetWidth;

      this.shortStringAnimation = width > 150 && width < 200;
      this.longStringAnimation = width > 200;

      if (this.resizeObserver) this.resizeObserver.unobserve();
    },
  },
};
</script>

<style module lang="scss">
@import '~/assets/scss/var.scss';

@keyframes scroll {
  0% {
    transform: translateX(0);
    left: 0%;
  }
  100% {
    transform: translateX(-100%);
    left: 100%;
  }
}

.marquee {
  display: block;
  width: 100%;
  white-space: nowrap;
  overflow: hidden;

  & .animation {
    display: inline-block;
    position: relative;
    user-select: all;
  }
}

:global(.b-table-sticky-header):not(:global(.prevent-default-hover)) tr:hover,
tr:global(.b-table-row-selected),
tr:global(.spec-table-row-hover) {
  .marquee {
    .animation {
      padding-right: 0.5rem;
    }

    .short-string-animation {
      animation: scroll 1s infinite ease-in-out alternate;
    }

    .long-string-animation {
      animation: scroll 2s infinite ease-in-out alternate;
    }
  }
}
</style>
