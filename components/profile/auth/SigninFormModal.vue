<template>
    <div>
        <h2 class="custom-modal-title">Вход в аккаунт</h2>

        <b-form class="custom-modal-form" autocomplete="off" novalidate @submit.prevent="login">
            <b-form-group>
                <b-input
                    id="signin-email"
                    v-model.trim="fields.email.rawValue"
                    name="signin-email"
                    type="text"
                    autocomplete="off"
                    placeholder="Почта"
                    :state="fields.email.state"
                ></b-input>
                <b-form-invalid-feedback>
                    {{ fields.email.error }}
                </b-form-invalid-feedback>
            </b-form-group>

            <b-form-group>
                <password-input
                    v-model.trim="fields.password.value"
                    :state="fields.password.state"
                    :error="fields.password.error"
                    placeholder="Пароль"
                    name="signin-password"
                />
            </b-form-group>

            <b-form-group>
                <div class="custom-modal-button">
                    <b-button type="submit" block variant="gr-primary">Войти</b-button>
                </div>
            </b-form-group>
        </b-form>

        <div class="custom-modal-question">
            <b>Нет аккаунта?</b>
            <b-button variant="link" size="sm" @click="$modal().showSignUp()">
                <b>Зарегистрироваться</b>
            </b-button>
        </div>

        <div>
            <b-button variant="link" size="sm" @click="goRequestPasswordResetForm">
                <b>Забыли пароль?</b>
            </b-button>
        </div>
    </div>
</template>

<script>
import PasswordInput from '~/components/helpers/form/PasswordInput.vue';

import isEmail from '~/mixins/checkers/isEmail.js';
import PasswordResetModal from '~/components/profile/auth/PasswordResetModal.vue';
import ConfirmEmailFormModal from '~/components/profile/auth/ConfirmEmailModal.vue';

export default {
    components: {
        PasswordInput,
    },

    mixins: [isEmail],

    data() {
        return {
            fields: {
                email: {
                    rawValue: '',
                    state: null,
                    error: 'Введите корректный E-mail',
                    formatter: value => value.toLowerCase(),
                    validation: value => this.isEmail(value),
                    get value() {
                        return this.formatter(this.rawValue);
                    },
                    get isValid() {
                        return this.validation(this.value);
                    },
                },

                password: {
                    value: '',
                    state: null,
                    error: 'Введите данные',
                    validation: value => !!value.length,
                    get isValid() {
                        return this.validation(this.value);
                    },
                },
            },
        };
    },

    methods: {
        /**
         * Авторизация
         * @return void
         */
        async login() {
            if (!this.checkData()) return;

            const fields = {
                email: this.fields.email.value,
                password: this.fields.password.value,
            };

            this.$emit('switch-loader', true);

            const response = await this.$store.dispatch('auth/customerLogin', fields);

            this.$emit('switch-loader', false);

            if (response.status === 'not-confirmed') {
                this.goToConfirmEmailForm(this.fields.email.value);
                return;
            }

            if (response.status !== 'success') {
                this.setErrorState({
                    email: [response.message],
                    password: [response.message],
                });
                return;
            }

            this.$emit('close');
            this.$store.dispatch('auth/proceedToPortal');
        },

        /**
         * Проверка заполнености данных
         * @return Boolean
         */
        checkData() {
            let success = true;

            for (const f in this.fields) {
                this.fields[f].state = !this.fields[f].isValid ? false : null;
                success = !success ? success : this.fields[f].isValid;
            }

            return success;
        },

        /**
         * Устанавливаем ошибку
         * @return void
         */
        setErrorState(value) {
            for (const f in this.fields) {
                this.fields[f].state = value[f] && value[f][0] ? false : null;
                this.fields[f].error = value[f] && value[f][0] ? value[f][0] : this.fields[f].error;
            }
        },

        /**
         * Переход на форму восстановления пароля
         * @return  void
         */
        goRequestPasswordResetForm() {
            this.$modal().show(PasswordResetModal);
        },

        /**
         * Переход на форму регистрации
         * @return  void
         */
        goToConfirmEmailForm(email) {
            this.$modal().show(ConfirmEmailFormModal, { email });
        },
    },
};
</script>

<style></style>
