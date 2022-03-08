<template>
    <div>
        <div class="font-weight-bold custom-modal-title">Создание проекта</div>

        <div class="custom-form-message sm">
            Создайте новый проект, либо замените<br />
            старый. Все сформированные документы<br />
            будут храниться в разделе “мои проекты”
        </div>

        <b-form-group>
            <v-select-input v-model="mode.value" :options="mode.options" placeholder="Выберете режим" />
        </b-form-group>

        <b-form-group>
            <b-input v-model="name" placeholder="Имя проекта" />
        </b-form-group>

        <div class="custom-modal-button">
            <b-button block variant="primary" @click="saveClick"> Сохранить </b-button>
        </div>
    </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

import VSelectInput from '~/components/helpers/form/VSelectInput.vue';
import ReplaceProjectFormModal from '~/components/workspace/project/modals/ReplaceProjectFormModal.vue';

import Project from '~/classes/Project';

@Component({
    components: {
        VSelectInput,
    },
})
export default class CreateProjectFormModal extends Vue {
    mode = {
        value: 1,
        options: [
            { value: 1, label: 'Новый проект' },
            { value: 2, label: 'Замена проекта' },
        ],
    };

    name = '';

    async saveClick() {
        const dto: Pick<Project, 'title' | 'status'> = {
            title: this.name,
            status: 'in_work',
        };

        if (this.mode.value === 1) {
            await this.$store.dispatch('project/createProject', dto);
            this.$emit('change', true);
        }
        if (this.mode.value === 2) this.$modal().show(ReplaceProjectFormModal);

        // if (this.mode.value === 1) this.$emit('change', true, dto);
        // if (this.mode.value === 2) this.$modal().show(ReplaceProjectFormModal);

        this.$emit('close');
    }
}
</script>

<style module lang="scss">
@import '~/assets/scss/var.scss';
</style>
