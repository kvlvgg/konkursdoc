<template>
  <div :class="$style['quiz-steps']">
    <div
      v-for="i in total"
      :key="i"
      :class="[
        $style['quiz-step-item'],
        currentStep >= i ? $style['_active'] : '',
      ]"
    ></div>
  </div>
</template>

<script>
export default {
  props: {
    total: {
      type: Number,
      default: 0,
    },
    currentStep: {
      type: Number,
      default: 0,
    },
  },
};
</script>

<style module lang="scss">
@import '~/assets/scss/var.scss';

.quiz-steps {
  display: flex;
  justify-content: center;
  pointer-events: none;
}

.quiz-step-item {
  width: 44px;
  height: 13px;
  background-color: #c4c4c4;
  margin: 0 10px;
  border-radius: 8px;

  &._active {
    background-image: linear-gradient(90deg, $primary 0%, $gr-primary 100%);
  }
}
</style>
