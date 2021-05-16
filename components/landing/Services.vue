<template>
  <section id="services-block" :class="$style['services']">
    <div class="container">
      <div :class="$style['section-title-content']">
        <h2 :class="$style['section-title']">Услуги и сервисы</h2>
        <h3 :class="$style['section-subtitle']">
          Попробуйте ителектуальный подбор картриджей
        </h3>
      </div>

      <div :class="$style['services-control-top']">
        <div :class="$style['services-control-top-item']">
          <v-select-input
            v-model="form.manufacturer"
            :options="form.manufacturerOptions"
            :searchable="true"
            :state="state.manufacturer"
            :error="error.manufacturer"
            placeholder="Выбор производителя"
          />
        </div>

        <div :class="$style['services-control-top-item']">
          <b-input
            v-model="form.equipment"
            type="text"
            placeholder="По наименованию оборудования"
            :disabled="!!form.cartridge"
            :state="state.equipment"
          ></b-input>

          <b-form-invalid-feedback>{{
            error.equipment
          }}</b-form-invalid-feedback>
        </div>

        <div :class="$style['services-control-top-item']">
          <b-input
            v-model="form.cartridge"
            type="text"
            placeholder="По наименованию картриджа"
            :disabled="!!form.equipment"
            :state="state.cartridge"
          ></b-input>

          <b-form-invalid-feedback>{{
            error.cartridge
          }}</b-form-invalid-feedback>
        </div>

        <div :class="$style['services-control-top-btn']">
          <b-button
            block
            variant="outline-primary-custom"
            :disabled="
              !(!!form.manufacturer || !!form.equipment || !!form.cartridge)
            "
            @click="clearFilter"
            >Очистить</b-button
          >
        </div>

        <div :class="$style['services-control-top-btn']">
          <b-button block variant="gr-primary" @click="search">Найти</b-button>
        </div>
      </div>

      <div :class="$style['services-content']">
        <ServicesTable />
      </div>

      <div :class="$style['services-control-bottom']">
        <b-button variant="outline-primary" @click="$modal().showSignUp()"
          >Сформировать ТЗ</b-button
        >
        <b-button variant="outline-primary" @click="$modal().showSignUp()"
          >Сформировать заявку</b-button
        >
        <b-button variant="outline-primary" @click="$modal().showSignUp()"
          >Расчитать стоимость</b-button
        >
        <b-button variant="outline-primary" @click="$modal().showSignUp()"
          >Сформировать запрос на КП</b-button
        >
      </div>
    </div>
  </section>
</template>

<script>
import ServicesTable from '~/components/landing/ServicesTable.vue';
import VSelectInput from '~/components/helpers/form/VSelectInput.vue';

export default {
  components: {
    ServicesTable,
    VSelectInput,
  },

  data() {
    return {
      form: {
        manufacturer: null,
        manufacturerOptions: [
          { value: 1, label: 'производитель 1' },
          { value: 2, label: 'производитель 2' },
          { value: 3, label: 'hp 3' },
          { value: 4, label: 'производитель 4' },
        ],
        equipment: null,
        cartridge: null,
      },

      state: {
        manufacturer: null,
        equipment: null,
        cartridge: null,
      },

      error: {
        manufacturer: '',
        equipment: '',
        cartridge: '',
      },
    };
  },

  methods: {
    /**
     * Отчищаем фильтр поиска
     * @return  void
     */
    clearFilter() {
      this.form.manufacturer = null;
      this.form.equipment = null;
      this.form.cartridge = null;
    },

    /**
     * Поиск картриджей
     * @return  void
     */
    search() {
      console.log('search');

      this.resetState();

      if (!this.checkEnteredData()) return null;

      // TODO: запрос на обновление данных в таблицу
    },

    /**
     * Сброс ошибок
     * @return  void
     */
    resetState() {
      console.log('resetState');

      this.state.manufacturer = null;
      this.state.equipment = null;
      this.state.cartridge = null;
      this.error.manufacturer = '';
      this.error.equipment = '';
      this.error.cartridge = '';
    },

    /**
     * Проверка заполнености данных
     * @return Boolean
     */
    checkEnteredData() {
      console.log('checkEnteredData');

      let success = true;

      if (!this.form.manufacturer) {
        this.state.manufacturer = false;
        this.error.manufacturer = 'Введите данные';
        success = false;
      }

      if (
        (!this.form.equipment || !this.form.equipment.length) &&
        (!this.form.cartridge || !this.form.cartridge.length)
      ) {
        this.state.equipment = false;
        this.error.equipment = 'Введите данные';
        this.state.cartridge = false;
        this.error.cartridge = 'Введите данные';
        success = false;
      }

      return success;
    },
  },
};
</script>

<style module lang="scss">
@import '~/assets/scss/var.scss';
@import '~/assets/scss/module/lendingSection.scss';

.services {
  padding: 70px 0 80px;
  background-repeat: no-repeat;
  background-position: left top;
  background-size: cover;
  background-image: url(~assets/image/landing/bg-services.jpg);
}

.services-control-top {
  display: flex;
  justify-content: space-evenly;
}

.services-control-top-item {
  flex: 1 1 23%;
  max-width: 23%;
}

.services-control-top-btn {
  flex: 1 1 12%;
  max-width: 12%;
}

.services-content {
  border: 1px solid $secondary-lighter;
  border-radius: 4px;
  padding: 1rem;
  margin: 30px 0;
}

.services-control-bottom {
  display: flex;
  justify-content: space-evenly;
}
</style>
