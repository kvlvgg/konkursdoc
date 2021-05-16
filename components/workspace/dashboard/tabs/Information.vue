<template>
  <div :class="$style['wrapper']">
    <div :class="$style['caption']">
      <span>Название проекта</span>
      <span>#3320000003</span>
    </div>
    <div class="font-weight-light">
      <div :class="$style['item']">
        <div>
          Дата создания: <span class="font-weight-bold">24.11.2020</span>
        </div>

        <div :class="$style['grey']">
          Дата изменения: <span class="font-weight-bold">26.10.2020</span>
        </div>
      </div>

      <div :class="$style['item']">
        <div>Картриджей: <span class="font-weight-bold">24</span></div>

        <b-button
          variant="outline-primary"
          size="sm"
          @click="$emit('go-to-specification-tab')"
          >К списку</b-button
        >
      </div>

      <div :class="$style['item']">
        <div>Исполнитель: <span class="font-weight-bold">Андрей В.</span></div>

        <b-button variant="outline-primary" size="sm"
          >Добавить исполнителя</b-button
        >
      </div>

      <div :class="$style['item']">
        <div>Документы: <span class="font-weight-bold">4</span></div>

        <b-button
          variant="outline-primary"
          size="sm"
          @click="$emit('go-to-document-tab')"
        >
          Просмотреть документы
        </b-button>
      </div>

      <div :class="$style['item']">
        <div>Статус:</div>

        <div :class="$style['grey']">В работе</div>

        <!-- <b-button variant="link" size="sm">Что за статус?</b-button> -->
      </div>

      <div :class="$style['item']">
        <div>Общая стоимость:</div>

        <div :class="$style['grey']">125 040 ₽</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style module lang="scss">
@import '~/assets/scss/var.scss';

.wrapper {
  max-height: calc(100vh - 198px);
  overflow-y: auto;
  padding: 0 20px;

  @include media-breakpoint-down(xl) {
    max-height: calc(100vh - 174px);
  }

  @include media-breakpoint-down(lg) {
    max-height: calc(100vh - 146px);
  }
}

.caption {
  border-bottom: 1px solid $secondary-lighter;
  color: $secondary-dark;
  padding: 10px 0px;
  font-size: 14px;
  span:first-child {
    font-size: 20px;
    margin-right: 8px;
  }
}

.item {
  display: flex;
  height: 2.5rem;
  color: $secondary-dark;
  justify-content: space-between;
  align-items: center;
  background-color: white;
  padding: 10px;
  margin: 10px 0;
  box-shadow: $box-shadow-sm;
  border-radius: $border-radius;

  .grey {
    color: #a1a0ad;
  }

  button {
    height: 1.6rem;
    line-height: 0rem;
  }
}
</style>
