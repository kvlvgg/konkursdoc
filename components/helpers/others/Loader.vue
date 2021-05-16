<template>
  <div v-if="visible" :class="$style['wrapper']" :style="`top: ${top}`">
    <svg
      :class="$style['spin']"
      viewBox="0 0 100 100"
      style="width: 80px; height: 80px"
    >
      <defs>
        <linearGradient id="Gradient" x1="50%" y1="0%" x2="50%" y2="100%">
          <stop offset="0%" stop-color="#A6A6A6"></stop>

          <stop offset="100%" stop-color="#C1C1C1" stop-opacity="0.2"></stop>
        </linearGradient>
      </defs>
      <circle
        :class="$style['circle']"
        cx="50"
        cy="50"
        r="30"
        fill="none"
      ></circle>
    </svg>
  </div>
</template>

<script>
export default {
  props: {
    visible: {
      type: Boolean,
      default: true,
    },
    top: {
      type: String,
      default: '0',
    },
  },
};
</script>

<style lang="scss" module>
.wrapper {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 2;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.1);
  border-radius: 8px;
}

.spin {
  animation: spin 2s linear infinite;
}

@keyframes spin {
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}

.circle {
  stroke: url(#Gradient);
  stroke-linecap: round;
  stroke-width: 10;
  stroke-dasharray: 130;
  stroke-dashoffset: -37;
}
</style>
