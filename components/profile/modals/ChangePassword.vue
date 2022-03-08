<template>
    <div>
        <div class="font-weight-bold custom-modal-title">Изменение пароля</div>

        <div class="custom-form-message">Для смены пароля введите ваш старый и новый пароль</div>

        <b-form @submit.prevent="sendRecovery">
            <b-form-group>
                <password-input
                    v-model="oldPassword.value"
                    type="password"
                    placeholder="Старый пароль"
                    name="old-password"
                    :state="oldPassword.state"
                    :error="oldPassword.error"
                />
            </b-form-group>

            <b-form-group>
                <password-input
                    v-model="newPassword.value"
                    type="password"
                    placeholder="Новый пароль"
                    name="new-password"
                    :state="newPassword.state"
                    :error="newPassword.error"
                />
            </b-form-group>

            <b-form-group>
                <password-input
                    v-model="newPasswordConfirm.value"
                    type="password"
                    placeholder="Повторите пароль"
                    name="repeat-password"
                    :state="newPasswordConfirm.state"
                    :error="newPasswordConfirm.error"
                />
            </b-form-group>

            <b-form-group>
                <b-button class="custom-modal-button" type="submit" block variant="gr-primary"> Подтвердить </b-button>
            </b-form-group>
        </b-form>
    </div>
</template>

<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator';

import { ValidationForm, ValidationField } from '@/classes/layout/ValidationForm';
import isValidPassword from '@/mixins/checkers/isValidPassword';
import ConfirmCode from '@/components/profile/modals/ConfirmCode.vue';
import PasswordInput from '@/components/helpers/form/PasswordInput.vue';

@Component({
    components: { PasswordInput },
    // Хотел использовать так, но TS в этом случае не отрабатывает корректно.
    // mixins: [isValidPassword],
})
export default class UpdatePassword extends Mixins(isValidPassword) {
    oldPassword = new ValidationField<string>({
        value: '',
        validations: [
            {
                validate: (value: string) => !!value,
                error: 'Введите старый пароль',
            },
        ],
    });

    newPassword = new ValidationField<string>({
        value: '',
        validations: [
            {
                validate: (value: string) => !!value,
                error: 'Введите новый пароль',
            },
            {
                validate: this.isValidPassword,
                error: 'Пароль должен содержать строчные и прописные латинские буквы, цифры и содержать не менее 6 символов',
            },
        ],
    });

    newPasswordConfirm = new ValidationField<string>({
        value: '',
        validations: [
            {
                validate: (value: string) => !!value,
                error: 'Введите подтверждение нового пароля',
            },
            {
                validate: (value: string) => this.newPassword.value === value,
                error: 'Пароль не совпадает!',
            },
        ],
    });

    form = ValidationForm.create([this.oldPassword, this.newPassword, this.newPasswordConfirm]);

    async sendRecovery() {
        if (!this.form.refreshState().isValid) return;

        const [error, result] = await this.$store.dispatch('auth/sendPasswordRecoveryCode', this.$user.email);

        if (!result) {
            this.$modal().error({ message: error.message });
            return;
        }

        this.$modal().show(ConfirmCode, { password: this.newPassword.value });
    }
}
</script>
