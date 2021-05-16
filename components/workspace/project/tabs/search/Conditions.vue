<template>
  <div>
    <div :class="$style['filters']">
      <!-- <div :class="$style['filters-item']">
        <v-select-input
          v-model="conditions.vendor"
          :options="vendors"
          searchable
          placeholder="Производитель"
          :map-keydown="
            () => ({
              13: () => {
                search();
              },
            })
          "
        />
      </div> -->

      <div :class="$style['filters-item']" @keyup.enter="search">
        <b-input
          v-model.trim="conditions.partNumber"
          placeholder="Партномер расходных материалов"
        />
      </div>

      <div :class="$style['filters-item']" @keyup.enter="search">
        <b-input
          v-model.trim="conditions.category"
          placeholder="Партномер оборудования"
        />
      </div>

      <div
        :class="[
          $style['filters-item'],
          $style['checkboxes'],
          'font-weight-normal',
        ]"
        @keyup.enter="search"
      >
        <b-form-checkbox
          id="checkbox-in-stock"
          v-model="conditions.isInStock"
          name="checkbox-in-stock"
          value="1"
          unchecked-value="0"
        >
          Только в наличии
        </b-form-checkbox>

        <b-form-checkbox
          id="checkbox-is-compatible"
          v-model="conditions.isCompatible"
          name="checkbox-is-compatible"
        >
          Совместимые
        </b-form-checkbox>
      </div>

      <b-button
        variant="gr-primary"
        :class="$style['filters-button']"
        @click="search"
        @keyup.enter="search"
      >
        &ensp;&ensp; Найти &ensp;&ensp;
      </b-button>

      <b-button
        variant="outline-primary"
        :class="$style['filters-button']"
        @click="
          !$store.getters['project/isNewProject']
            ? $modal().show(modals['add-position'])
            : $modal().show(modals['create-project'])
        "
      >
        + Добавить позицию
      </b-button>
    </div>
  </div>
</template>

<script>
// import VSelectInput from '~/components/helpers/form/VSelectInput.vue';
import AddPositionFormModal from '~/components/workspace/project/modals/AddPositionFormModal.vue';
import CreateProjectFormModal from '~/components/workspace/project/modals/CreateProjectFormModal.vue';

export default {
  // components: {
  //   VSelectInput,
  // },

  data() {
    return {
      modals: {
        'add-position': AddPositionFormModal,
        'create-project': CreateProjectFormModal,
      },
      conditions: {
        vendor: null,
        category: null,
        partNumber: null,
        isCompatible: false,
        isInStock: 0,
      },
    };
  },

  // computed: {
  //   vendors() {
  //     if (!this.$store.getters['common/vendors']) return [];
  //     return this.$store.getters['common/vendors'].map(x => ({
  //       value: x.id,
  //       label: x.name,
  //     }));
  //   },
  // },

  methods: {
    search() {
      const argv = [];

      // if (this.conditions.vendor)
      //   argv.push(`manufacturer_id=${this.conditions.vendor}`);
      if (this.conditions.partNumber)
        argv.push(`part_number=${this.conditions.partNumber}`);
      if (this.conditions.category)
        argv.push(`description=${this.conditions.category}`);
      argv.push(`compatible=${this.conditions.isCompatible}`);
      argv.push(`available_quantity_min=${this.conditions.isInStock}`);

      this.$emit('search', argv);
    },
  },
};
</script>

<style module lang="scss">
@import '~/assets/scss/var.scss';

.filters {
  display: flex;
  justify-content: space-evenly;
  padding: 1rem 0;
  background-color: #f8f8f8;
  border: 1px solid $secondary-lighter;
  border-radius: 4px;

  @include media-breakpoint-down(xl) {
    padding: 0.7rem 0;
  }

  @include media-breakpoint-down(lg) {
    padding: 0.6rem 0;
  }
}

// .filters-btn {
//   width: 12%;
// }

.filters-item {
  flex: 1 1 25%;
  max-width: 25%;
}

.checkboxes {
  color: #6a6a6a;
  display: flex;
  align-items: center;
  justify-content: space-around;
}
</style>
