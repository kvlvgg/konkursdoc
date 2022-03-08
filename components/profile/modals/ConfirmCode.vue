<template>
    <div>
        <div class="font-weight-bold custom-modal-title">Код подтверждения</div>

        <div class="custom-form-message">Введите код указаный в письме и введите новый пароль</div>

        <b-form @submit.prevent="updatePassword">
            <b-form-group>
                <b-input v-model.trim="passwordRecoveryCode" placeholder="Код" :state="state" />
                <b-form-invalid-feedback>
                    {{ error }}
                </b-form-invalid-feedback>
            </b-form-group>

            <b-form-group>
                <b-button class="custom-modal-button" type="submit" block variant="gr-primary"> Подтвердить </b-button>
            </b-form-group>

            <div class="custom-modal-question">
                <b>Не пришёл код? </b>
                <b-button variant="link" size="sm">
                    <b>Отправить повторно</b>
                </b-button>
            </div>
        </b-form>
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { UpdatePasswordDTO } from '@/classes/User';

@Component
export default class ConfirmCode extends Vue {
    @Prop({ type: String, default: '' }) password!: string;

    passwordRecoveryCode = '';
    state: boolean | null = null;
    error = '';

    async updatePassword() {
        if (!this.$user.email) return;

        const dto: UpdatePasswordDTO = {
            email: this.$user.email,
            password: this.password,
            password_recovery_code: this.passwordRecoveryCode,
        };
        const [success, error] = await this.$store.dispatch('user/updatePassword', dto);

        if (success) {
            this.$emit('close');
            return;
        }

        this.state = false;
        this.error = error.message;
    }
}
</script>

<style></style>
