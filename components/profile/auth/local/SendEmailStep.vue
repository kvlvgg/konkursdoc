<template>
  <div>
    <div class="font-weight-light custom-form-message">
      На Вашу почту будет отправлено письмо с кодом для восстановления пароля
    </div>

    <br />

    <b-form autocomplete="off" novalidate @submit.prevent="sendEmail">
      <b-form-group>
        <b-input
          id="request-pas-email"
          v-model="email.rawValue"
          name="request-pas-email"
          type="text"
          autocomplete="off"
          placeholder="Почта"
          :state="email.state"
        ></b-input>
        <b-form-invalid-feedback>
          {{ email.error }}
        </b-form-invalid-feedback>
      </b-form-group>

      <br />

      <b-form-group>
        <div class="custom-modal-button">
          <b-button type="submit" block variant="gr-primary">
            Подтвердить
          </b-button>
        </div>
      </b-form-group>
    </b-form>
  </div>
</template>

<script>
import isEmail from '~/mixins/checkers/isEmail.js';

export default {
  mixins: [isEmail],

  props: {
    value: {
      type: String,
      default: null,
    },
    serverErrors: {
      type: Object,
      default: null,
    },
  },

  data() {
    return {
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
     * Отправляем почту, на которую придет подтверждение
     * @returns void
     */
    sendEmail() {
      const success = this.checkRegistrationData();
      if (!success) return;

      this.$emit('input', this.email.value);

      this.$emit('send-email');
    },

    /**
     * Проверка заполнености данных
     * @return Boolean
     */
    checkRegistrationData() {
      let success = true;

      this.email.state = !this.email.isValid ? false : null;
      success = this.email.isValid;

      return success;
    },
  },
};
</script>

<style></style>
