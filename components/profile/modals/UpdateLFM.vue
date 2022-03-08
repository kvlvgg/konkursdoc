<template>
    <div>
        <div class="font-weight-bold custom-modal-title">Изменение ФИО</div>

        <div class="custom-form-message">Для смены данных введите пароль и новое ФИО</div>

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
                <b-input
                    v-model.trim="fullname.value"
                    type="text"
                    autocomplete="off"
                    placeholder="Новое ФИО"
                    :state="fullname.state"
                ></b-input>
                <b-form-invalid-feedback>
                    {{ fullname.error }}
                </b-form-invalid-feedback>
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
import { Vue, Component } from 'vue-property-decorator';

import { ValidationForm, ValidationField } from '@/classes/layout/ValidationForm';
import PasswordInput from '@/components/helpers/form/PasswordInput.vue';

@Component({
    components: {
        PasswordInput,
    },
})
export default class UpdateLFM extends Vue {
    password = new ValidationField<string>({
        value: '',
        validations: [
            {
                validate: (value: string) => !!value,
                error: 'Введите пароль',
            },
        ],
    });

    fullname = new ValidationField<string>({
        value: '',
        validations: [
            {
                validate: (value: string) => !!value.split(' ')[0],
                error: 'Введите фамилию',
            },
            {
                validate: (value: string) => !!value.split(' ')[1],
                error: 'Введите имя',
            },
            {
                validate: (value: string) => !!value.split(' ')[2],
                error: 'Введите отчество',
            },
        ],
    });

    form = new ValidationForm([this.password, this.fullname]);

    async update() {
        if (!this.form.refreshState().isValid) return;

        const [lastname, firstname, middlename] = this.fullname.value.split(' ');
        const [error] = await this.$store.dispatch('user/updateInfo', {
            password: this.password.value,
            lastname,
            firstname,
            middlename,
        });

        if (!error) {
            this.$emit('close');
            return;
        }

        this.$modal().error({ message: error.message });
    }
}
</script>

<style></style>
