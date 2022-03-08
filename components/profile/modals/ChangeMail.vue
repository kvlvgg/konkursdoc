<template>
    <div>
        <div class="font-weight-bold custom-modal-title">Изменение почты</div>

        <div class="custom-form-message">Для смены почты введите пароль и адрес новой почты</div>

        <b-form>
            <b-form-group>
                <password-input type="password" placeholder="Введите пароль" name="password" />
            </b-form-group>

            <b-form-group>
                <b-input placeholder="Адрес новой почты" />
            </b-form-group>

            <b-form-group>
                <b-button class="custom-modal-button" type="submit" block variant="gr-primary"> Подтвердить </b-button>
            </b-form-group>
        </b-form>
    </div>
</template>

<script>
import PasswordInput from '~/components/helpers/form/PasswordInput.vue';
export default {
    components: { PasswordInput },
    data() {
        return { newMail: null, password: null };
    },
};
</script>

<style></style>
