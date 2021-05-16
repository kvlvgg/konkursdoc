<template>
  <div>
    <div class="font-weight-bold custom-modal-title">Создание проекта</div>

    <div class="custom-form-message sm">
      Создайте новый проект, либо замените<br />
      старый. Все сформированные документы<br />
      будут храниться в разделе “мои проекты”
    </div>

    <b-form-group>
      <v-select-input
        v-model="mode.value"
        :options="mode.options"
        placeholder="Выберете режим"
      />
    </b-form-group>

    <b-form-group>
      <b-input placeholder="Имя проекта" />
    </b-form-group>

    <div class="custom-modal-button">
      <b-button block variant="primary" @click="saveClick">
        Сохранить
      </b-button>
    </div>
  </div>
</template>

<script>
import VSelectInput from '~/components/helpers/form/VSelectInput.vue';

import ReplaceProjectFormModal from '~/components/workspace/project/modals/ReplaceProjectFormModal.vue';

export default {
  components: {
    VSelectInput,
  },
  data() {
    return {
      modals: {
        'replace-project': ReplaceProjectFormModal,
      },
      mode: {
        value: 1,
        options: [
          { value: 1, label: 'Новый проект' },
          { value: 2, label: 'Замена проекта' },
          // { value: 3, label: 'option 3' },
        ],
      },
      name: '',
    };
  },
  methods: {
    saveClick() {
      if (this.mode.value === 1)
        this.$store.dispatch('project/createProject', {
          mode: this.mode.options[this.mode.value],
          name: this.name,
        });
      if (this.mode.value === 2) this.$modal().show(ReplaceProjectFormModal);

      this.$emit('close');
    },
  },
};
</script>

<style module lang="scss">
@import '~/assets/scss/var.scss';
</style>
