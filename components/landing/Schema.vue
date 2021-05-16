<template>
  <section id="schema-block" :class="$style['schema']">
    <div class="container">
      <div :class="$style['section-title-content']">
        <h2 :class="$style['section-title']">
          Обмен коммерческими предложениями
        </h2>
        <h3 :class="$style['section-subtitle']">
          Посмотрите как легко обмениваться КП
        </h3>
      </div>
      <div :class="$style['schema-image-wrap']">
        <img
          :class="$style['schema-image']"
          src="~assets/image/landing/item-schema.png"
          alt="Обмен коммерческими предложениями"
        />
      </div>
    </div>
  </section>
</template>

<script>
export default {};
</script>

<style module lang="scss">
@import '~/assets/scss/var.scss';
@import '~/assets/scss/module/lendingSection.scss';

.schema {
  padding: 70px 0 100px;
}

.schema-image-wrap {
  display: flex;
  padding: 1.5rem 0 0 0;
}

.schema-image {
  width: 100%;
  pointer-events: none;
  user-select: none;
}
</style>
