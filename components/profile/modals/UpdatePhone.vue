<template>
    <div>
        <div class="font-weight-bold custom-modal-title">Изменение телефона</div>

        <div class="custom-form-message">Для смены телефона введите пароль и новый номер телефона</div>

        <b-form>
            <b-form-group>
                <password-input
                    v-model="password.value"
                    type="password"
                    placeholder="Введите пароль"
                    name="password"
                    :state="password.state"
                    :error="password.error"
                />
            </b-form-group>

            <b-form-group>
                <phone-input v-model.trim="phone.value" :state="phone.state" :error="phone.error" />
            </b-form-group>

            <b-form-group>
                <b-button class="custom-modal-button" block variant="gr-primary" @click="update">
                    Подтвердить
                </b-button>
            </b-form-group>
        </b-form>
    </div>
</template>

<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator';

import { ValidationForm, ValidationField } from '@/classes/layout/ValidationForm';
import PasswordInput from '@/components/helpers/form/PasswordInput.vue';
import PhoneInput from '@/components/helpers/form/PhoneInput.vue';
import isPhone from '@/mixins/checkers/isPhone';

@Component({
    components: {
        PasswordInput,
        PhoneInput,
    },
})
export default class UpdatePhone extends Mixins(isPhone) {
    password = new ValidationField<string>({
        value: '',
        validations: [
            {
                validate: (value: string) => !!value,
                error: 'Введите пароль',
            },
        ],
    });

    phone = new ValidationField<string>({
        value: '',
        validations: [
            {
                validate: (value: string) => this.isPhone(value),
                error: 'Введите корректный номер телефона',
            },
        ],
    });

    form = new ValidationForm([this.password, this.phone]);

    async update() {
        if (!this.form.refreshState().isValid) return;

        const [error] = await this.$store.dispatch('user/updateInfo', {
            password: this.password.value,
            phone_number: this.phone.value.replace(/[^+\d]/g, ''),
        });

        if (!error) {
            this.$emit('close');
            return;
        }

        this.$modal().error({ message: 'Неверный пароль' });
    }
}
</script>

<style></style>
