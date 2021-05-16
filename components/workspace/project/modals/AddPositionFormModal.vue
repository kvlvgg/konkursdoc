<template>
  <div :class="$style['wrapper']">
    <div class="font-weight-bold custom-modal-title">Добавить позицию</div>

    <div class="custom-form-message">
      Если поиск не дал результатов, Вы<br />
      можете добавить позицию вручную,<br />
      заполнив соответствующие поля.
    </div>

    <b-form-group label="Тип">
      <b-input v-model="type" />
    </b-form-group>

    <b-form-group label="Производитель">
      <v-select-input v-model="vendor" :options="vendors" searchable />
    </b-form-group>

    <b-form-group label="Партномер">
      <b-input v-model="partNumber" />
    </b-form-group>

    <b-form-group>
      <div :class="$style['col-2']">
        <b-form-group label="Ресурс">
          <b-input v-model="resourse" />
        </b-form-group>

        <b-form-group label="Цвет">
          <b-input v-model="color" />
        </b-form-group>
      </div>
    </b-form-group>

    <b-form-group label="Страна производитель">
      <VSelectCountry v-model="country" />
    </b-form-group>

    <b-form-group label="Цена">
      <b-input v-model.number="price" />
    </b-form-group>

    <b-form-group label="Количество">
      <b-input v-model="amount" />
    </b-form-group>

    <div class="custom-modal-button mt-1">
      <b-button block variant="primary" @click="addPosition">
        Добавить
      </b-button>
    </div>
  </div>
</template>

<script>
import VSelectInput from '~/components/helpers/form/VSelectInput.vue';
import VSelectCountry from '~/components/helpers/form/VSelectCountry.vue';

export default {
  components: {
    VSelectInput,
    VSelectCountry,
  },

  data() {
    return {
      type: null,
      vendor: null,
      partNumber: null,
      resourse: null,
      color: null,
      country: null,
      price: '',
      amount: '',
    };
  },

  computed: {
    computedVendor() {
      return this.vendors.find(x => x.value === this.vendor) || {};
    },
    vendors() {
      if (!this.$store.getters['common/vendors']) return [];
      return this.$store.getters['common/vendors'].map(x => ({
        value: x.id,
        label: x.name,
      }));
    },
  },

  methods: {
    /**
     * Добавление позиции в спецификацию
     * @param void
     * @return void
     */
    addPosition() {
      this.$store.dispatch('project/addPositionToSpec', {
        Type: this.type,
        Vendor: this.computedVendor.label,
        Partnumber: this.partNumber,
        Supplier: null,
        Resourse: this.resourse,
        Color: this.color,
        Percent: null,
        Country: this.country,
        Price: parseInt((this.price || 0).toFixed(2).replace(/[^\d]/, '')),
        InStock: null,
        Amount: this.amount,
        Currency: 'RUB',
      });

      this.$emit('close');
    },
  },
};
</script>

<style module lang="scss">
@import '~/assets/scss/var.scss';

.wrapper {
  :global(.form-group) {
    margin: 0;
  }
}

.col-2 {
  display: flex;
  justify-content: space-between;

  :global(.form-group) {
    width: 48%;
  }
}
</style>
