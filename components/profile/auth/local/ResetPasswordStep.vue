<template>
  <div>
    <div class="font-weight-light custom-form-message">
      Введите код указаный в письме и введите новый пароль
    </div>

    <b-form autocomplete="off" novalidate @submit.prevent="sendPassword">
      <b-form-group>
        <b-input
          id="request-pas-password"
          v-model="fields.code.value"
          name="request-pas-password"
          type="text"
          autocomplete="off"
          placeholder="Код"
          :state="fields.code.state"
        ></b-input>
        <b-form-invalid-feedback>
          {{ fields.code.error }}
        </b-form-invalid-feedback>
      </b-form-group>

      <b-form-group>
        <password-input
          v-model="fields.password.value"
          :state="fields.password.state"
          :error="fields.password.error"
          placeholder="Пароль"
          name="request-pas-code"
        />
      </b-form-group>

      <b-form-group>
        <div class="custom-modal-button">
          <b-button type="submit" block variant="gr-primary">
            Подтвердить
          </b-button>
        </div>
      </b-form-group>
    </b-form>

    <div v-if="showSendAgain" class="custom-modal-question font-weight-normal">
      <span class="align-middle">Не пришёл код? </span>
      <b-button variant="link" size="sm" @click="sendEmailAgain">
        Отправить повторно
      </b-button>
    </div>
  </div>
</template>

<script>
import PasswordInput from '~/components/helpers/form/PasswordInput.vue';

export default {
  components: {
    PasswordInput,
  },

  data() {
    return {
      fields: {
        code: {
          value: '',
          state: null,
          error: 'Введите код',
          validation: value => !!value,
          get isValid() {
            return this.validation(this.value);
          },
        },

        password: {
          value: '',
          state: null,
          error:
            'Пароль должен содержать строчные и прописные латинские буквы, цифры и содержать не менее 6 символов',
          validation: value =>
            value &&
            value.length >= 6 &&
            value.length <= 50 &&
            /[a-z]/.test(value) &&
            /[A-Z]/.test(value) &&
            /[0-9]/.test(value),
          get isValid() {
            return this.validation(this.value);
          },
        },
      },

      showSendAgain: true,
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
      this.email.state = value.email && value.email[0] ? false : null;
      this.email.error =
        value.email && value.email[0] ? value.email[0] : this.email.error;
    },
  },

  methods: {
    /**
     * Отправить код еще раз
     */
    sendEmailAgain() {
      this.showSendAgain = false;
      this.$emit('ssend-email-again');
    },

    /**
     * Отправляем почту, на которую придет подтверждение
     * @returns void
     */
    sendPassword() {
      const success = this.checkRegistrationData();
      if (!success) return;

      this.$emit('input', {
        password_recovery_code: this.fields.code.value,
        password: this.fields.password.value,
      });

      this.$emit('send-password');
    },

    /**
     * Проверка заполнености данных
     * @return Boolean
     */
    checkRegistrationData() {
      let success = true;

      for (const f in this.fields) {
        this.fields[f].state = !this.fields[f].isValid ? false : null;
        success = !success ? success : this.fields[f].isValid;
      }

      return success;
    },
  },
};
</script>

<style></style>
