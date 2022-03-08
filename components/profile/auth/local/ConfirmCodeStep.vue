<template>
    <div>
        <h2 class="custom-modal-title">Завершите регистрацию</h2>

        <div class="custom-form-message">
            На Вашу почту было отправлено письмо для подтверждения регистрации аккаунта
        </div>

        <div class="custom-form-message">Введите код указаный в письме</div>

        <b-form class="custom-modal-form" autocomplete="off" novalidate @submit.prevent="confirm">
            <b-form-group>
                <b-input
                    v-model.trim="code.value"
                    type="text"
                    autocomplete="off"
                    placeholder="Код"
                    :state="code.state"
                ></b-input>
                <b-form-invalid-feedback>{{ code.error }}</b-form-invalid-feedback>
            </b-form-group>

            <b-form-group>
                <div class="custom-modal-button">
                    <b-button type="submit" block variant="gr-primary">Подтвердить</b-button>
                </div>
            </b-form-group>
        </b-form>

        <div v-if="isSendAgainVisible" class="custom-modal-question">
            <b>Не пришёл код?</b>
            <b-button variant="link" size="sm" @click="sendAgain">
                <b>Отправить повторно</b>
            </b-button>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        value: {
            type: String,
            default: '',
        },

        serverErrors: {
            type: Object,
            default: null,
        },
    },

    data() {
        return {
            code: {
                value: '',
                state: null,
                error: 'Введите код',
                validation: value => !!value,
                get isValid() {
                    return this.validation(this.value);
                },
            },

            isSendAgainVisible: true,
        };
    },

    watch: {
        /**
         * Если после отправки полей на регистрацию с сервера пришла ошибка,
         * то устанавливаем их вместо текущих дефолтных ошибок.
         * @param Object value, где названия свойств соотвествует отправленным на сервер полям.
         * @returns void
         */
        serverErrors(value) {
            this.code.state = value.code && value.code[0] ? false : null;
            this.code.error = value.code && value.code[0] ? value.code[0] : this.code.error;
        },
    },

    methods: {
        confirm() {
            this.code.state = !this.code.isValid ? false : null;
            if (!this.code.isValid) return;

            this.$emit('input', this.code.value);
            this.$emit('confirm');
        },

        sendAgain() {
            this.isSendAgainVisible = false;
            this.code.state = null;
            this.$emit('send-again');
        },
    },
};
</script>

<style></style>
