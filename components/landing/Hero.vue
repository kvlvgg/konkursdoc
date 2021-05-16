<template>
  <section id="hero-block" :class="$style['hero']">
    <div class="container">
      <div :class="$style['hero-body']">
        <div :class="$style['hero-left']">
          <h1 class="font-weight-bold" :class="$style['hero-title']">
            <span class="text-primary">Уникальный сервис</span>
            <span
              >по подбору картриджей для оргтехники и формированию тендерной
              документации</span
            >
          </h1>

          <h2 class="font-weight-light" :class="$style['hero-subtitle']">
            KONKURSDOC ускоряет в 32 раза процесс формирования тендерной
            документации по расходным материалам для оргтехники
          </h2>

          <div>
            <b-button
              variant="gr-primary"
              :class="$style['hero-btn']"
              @click="$modal().showSignUp()"
              >Начать бесплатно</b-button
            >
          </div>
        </div>

        <div :class="$style['hero-right']">
          <h2 class="font-weight-bold" :class="$style['cartridge-title']">
            Подобрать картридж
          </h2>

          <form novalidate @submit.prevent="pickUp">
            <b-form-group>
              <v-select-input
                v-model="form.manufacturer"
                :options="form.manufacturerOptions"
                placeholder="Выбор производителя"
              />
            </b-form-group>

            <b-form-group>
              <b-input
                v-model="form.equipment"
                type="text"
                placeholder="Поиск по наименованию оборудования"
              ></b-input>
            </b-form-group>

            <b-form-group>
              <b-input
                v-model="form.cartridge"
                type="text"
                placeholder="Поиск по наименованию картриджа"
              ></b-input>
            </b-form-group>

            <div :class="$style['cartridge-form-control']">
              <b-button
                type="submit"
                variant="gr-primary"
                :class="$style['hero-btn']"
                >Найти</b-button
              >
            </div>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import VSelectInput from '~/components/helpers/form/VSelectInput.vue';

export default {
  components: {
    VSelectInput,
  },

  data() {
    return {
      form: {
        equipment: '',
        cartridge: '',
        manufacturer: null,
        manufacturerOptions: [
          { value: '1', label: 'Катридж 1' },
          { value: '2', label: 'Катридж 2' },
          { value: '3', label: 'Катридж 3' },
          { value: '4', label: 'Катридж 4' },
        ],
      },
    };
  },

  methods: {
    pickUp() {
      console.log('pickUp');
    },
  },
};
</script>

<style module lang="scss">
@import '~/assets/scss/var.scss';

.hero {
  padding: 170px 0 140px;
  background-repeat: no-repeat;
  background-position: left top;
  background-size: cover;
  background-image: url(~assets/image/landing/bg-hero.jpg);
}

.hero-body {
  display: flex;
}

.hero-left {
  flex: 1 0 50%;
  max-width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.hero-right {
  flex: 1 1 50%;
  max-width: 50%;
  padding: 2.5rem 1.5rem;
  margin: 0 0 0 8.333333%;
  background-color: $white;
  box-shadow: $box-shadow;
  border-radius: $border-radius;
}

.hero-title {
  font-size: 24px;
  line-height: 1.2em;
  color: #372b53;
  margin: 0 0 3rem 0;
}

.hero-subtitle {
  font-size: 16px;
  line-height: 1.2em;
  color: #372b53;
  margin: 0 0 3rem 0;
}

.hero-btn {
  padding-left: 3rem;
  padding-right: 3rem;
}

.cartridge-title {
  font-size: 24px;
  line-height: 1.2em;
  color: #372b53;
  margin: 0 0 2rem 0;
  text-align: center;
}

.cartridge-form-control {
  text-align: center;
}
</style>
