<template>
    <div>
        <div class="custom-modal-title font-weight-bold">Создание документа</div>

        <div class="custom-form-message sm">
            Создайте новый документ либо замените<br />
            старый. Все сформированные документы<br />
            будут храниться в разделе “мои проекты”
        </div>

        <b-form-group>
            <v-select-input
                v-model="createOptions.value"
                :options="createOptions.options"
                placeholder="Производитель"
            />
        </b-form-group>

        <b-form-group>
            <b-input v-model="name" placeholder="000000001" :state="valid ? null : false" />

            <b-form-invalid-feedback :state="valid">
                {{ error }}
            </b-form-invalid-feedback>
        </b-form-group>

        <b-form-group>
            <b-input :value="type" readonly />
        </b-form-group>

        <div class="custom-modal-button">
            <b-button block variant="primary" @click="btnOk"> Сформировать </b-button>
        </div>
    </div>
</template>

<script>
import VSelectInput from '~/components/helpers/form/VSelectInput.vue';

export default {
    components: {
        VSelectInput,
    },
    props: {
        type: {
            type: String,
            default: null,
            required: true,
        },
        currency: {
            type: String,
            default: null,
        },
        resolve: {
            type: Function,
            default: null,
        },
    },
    data() {
        return {
            createOptions: {
                value: 1,
                options: [
                    { value: 1, label: 'Новый документ' },
                    { value: 2, label: 'option 2' },
                    { value: 3, label: 'option 3' },
                ],
            },

            name: null,
            valid: true,
        };
    },
    computed: {
        isDuplicate() {
            if (!this.$store.getters['project/documents']) return false;
            return this.$store.getters['project/documents'].some(x => x.name === this.name);
        },
        error() {
            return this.isDuplicate ? 'Документ с таким именем уже существует' : 'Введите название документа';
        },
    },
    methods: {
        /**
         * Клик по кнопке сформировать
         * @returns void
         */
        btnOk() {
            if (!this.name || this.isDuplicate) this.valid = false;
            else this.valid = true;

            if (!this.valid) return;

            const created = this.$store.dispatch('project/createDocument', {
                documentType: this.type,
                currency: this.currency,
                name: this.name,
            });
            if (!created) return;
            this.$store.dispatch('project/loadDocument', this.name);
            this.resolve(true);
            this.$emit('close');
        },
    },
};
</script>

<style module lang="scss">
@import '~/assets/scss/var.scss';
</style>
