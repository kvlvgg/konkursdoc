<template>
  <section id="mission-block" :class="$style['mission']">
    <div class="container">
      <div :class="$style['mission-wrap']">
        <div :class="$style['mission-left']">
          <div :class="$style['mission-image-wrap']">
            <img
              :class="$style['mission-image']"
              src="~assets/image/landing/item-mission.png"
              alt="Наша миссия"
            />
          </div>
        </div>
        <div :class="$style['mission-right']">
          <h2 class="font-weight-bold" :class="$style['mission-title']">
            Наша миссия:
          </h2>
          <div class="font-weight-light" :class="$style['mission-text']">
            Дать каждой компании инструмент автоматизации процессов формирования
            тендерной документации по расходным материалам для оргтехники и
            упростить взаимодействие организаторов и участников торгов
          </div>
          <b-button variant="primary" @click="$modal().showSignUp()"
            >Начать бесплатно</b-button
          >
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {};
</script>

<style module lang="scss">
@import '~/assets/scss/var.scss';

.mission {
  padding: 70px 0 50px;
  color: $white;
  background-repeat: no-repeat;
  background-position: left top;
  background-size: cover;
  background-image: url(~assets/image/landing/bg-mission.jpg);
  background-attachment: fixed;
}

.mission-wrap {
  display: flex;
}

.mission-left {
  position: relative;
  flex: 1 0 50%;
  max-width: 50%;
}

.mission-image-wrap {
  position: absolute;
  top: -60px;
  bottom: -90px;
  left: 0;
}

.mission-image {
  height: 100%;
  width: auto;
}

.mission-right {
  flex: 1 0 50%;
  max-width: 50%;
}

.mission-title {
  font-size: 26px;
  line-height: 1em;
  margin: 0 0 2rem 0;
}

.mission-text {
  font-size: 16px;
  line-height: 1.25em;
  margin: 0 0 2rem 0;
}
</style>
