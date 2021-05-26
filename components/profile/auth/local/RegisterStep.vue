<template>
  <div>
    <div class="font-weight-bold custom-modal-title">Регистрация аккаунта</div>

    <b-form
      class="custom-modal-form"
      autocomplete="off"
      novalidate
      @submit.prevent="register"
    >
      <b-form-group>
        <b-input
          id="signup-lastname"
          v-model.trim="fields.lastname.rawValue"
          name="signup-lastname"
          type="text"
          autocomplete="off"
          placeholder="Фамилия"
          :state="fields.lastname.state"
        ></b-input>
        <b-form-invalid-feedback>
          {{ fields.lastname.error }}
        </b-form-invalid-feedback>
      </b-form-group>

      <b-form-group>
        <b-input
          id="signup-firstname"
          v-model.trim="fields.firstname.rawValue"
          name="signup-firstname"
          type="text"
          autocomplete="off"
          placeholder="Имя"
          :state="fields.firstname.state"
        ></b-input>
        <b-form-invalid-feedback>
          {{ fields.firstname.error }}
        </b-form-invalid-feedback>
      </b-form-group>

      <b-form-group>
        <b-input
          id="signup-middlename"
          v-model.trim="fields.middlename.rawValue"
          name="signup-middlename"
          type="text"
          autocomplete="off"
          placeholder="Отчество"
          :state="fields.middlename.state"
        ></b-input>
        <b-form-invalid-feedback>
          {{ fields.middlename.error }}
        </b-form-invalid-feedback>
      </b-form-group>

      <b-form-group>
        <phone-input
          v-model.trim="fields.phone.rawValue"
          :state="fields.phone.state"
          :error="fields.phone.error"
          name="signup-phone"
        />
      </b-form-group>

      <b-form-group>
        <b-input
          id="signup-email"
          v-model.trim="fields.email.rawValue"
          name="signup-email"
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
          name="signup-password"
        />
      </b-form-group>

      <p class="font-weight-light" :class="$style['confidential-policy']">
        Регистрируя аккаунт, Вы принимаете наши условия использования,
        <a class="btn-link" @click="InDev">политику конфиденциальности</a>
        и подписываетесь на рассылку новостей от KonkursDoc
      </p>

      <b-form-group>
        <div :class="$style['block-control']">
          <!-- <b-button variant="outline-primary" @click="back">Назад</b-button>
          <b-button
            type="submit"
            variant="gr-primary"
            :class="$style['block-control-main']"
          >
            Зарегистрироваться
          </b-button> -->

          <b-button type="submit" variant="gr-primary">
            Зарегистрироваться
          </b-button>
        </div>
      </b-form-group>
    </b-form>

    <div class="custom-modal-question font-weight-normal">
      <span class="align-middle">Есть аккаунт?</span>
      <b-button variant="link" size="sm" @click="goToLoginForm">Войти</b-button>
    </div>
  </div>
</template>

<script>
import PhoneInput from '~/components/helpers/form/PhoneInput.vue';
import PasswordInput from '~/components/helpers/form/PasswordInput.vue';

import isEmail from '~/mixins/checkers/isEmail.js';
import isPhone from '~/mixins/checkers/isPhone.js';
import capitalizeFirstLetter from '~/mixins/formatters/capitalizeFirstLetter.js';

export default {
  components: {
    PhoneInput,
    PasswordInput,
  },

  mixins: [isEmail, isPhone, capitalizeFirstLetter],

  props: {
    value: {
      type: Object,
      default: null,
    },
    serverErrors: {
      type: Object,
      default: null,
    },
  },

  data() {
    return {
      fields: {
        lastname: {
          rawValue: '',
          state: null,
          error: 'Введите данные',
          formatter: this.capitalizeFirstLetter,
          validation: value => !!value,
          get value() {
            return this.formatter(this.rawValue);
          },
          get isValid() {
            return this.validation(this.value);
          },
        },

        firstname: {
          rawValue: '',
          state: null,
          error: 'Введите данные',
          formatter: this.capitalizeFirstLetter,
          validation: value => !!value,
          get value() {
            return this.formatter(this.rawValue);
          },
          get isValid() {
            return this.validation(this.value);
          },
        },

        middlename: {
          rawValue: '',
          state: null,
          error: 'Введите данные',
          formatter: this.capitalizeFirstLetter,
          validation: value => !!value,
          get value() {
            return this.formatter(this.rawValue);
          },
          get isValid() {
            return this.validation(this.value);
          },
        },

        phone: {
          rawValue: '',
          state: null,
          error: 'Введите корректный номер телефона',
          formatter: value => value.replace(/[^+\d]/g, ''),
          validation: value => this.isPhone(value),
          get value() {
            return this.formatter(this.rawValue);
          },
          get isValid() {
            // для телефона пока значение из инпута
            return this.validation(this.rawValue);
          },
        },

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
      for (const f in this.fields) {
        this.fields[f].state = value[f] && value[f][0] ? false : null;
        this.fields[f].error =
          value[f] && value[f][0] ? value[f][0] : this.fields[f].error;
      }
    },
  },

  methods: {
    /**
     * Отправляем данные на регистрацию
     * @returns void
     */
    register() {
      const success = this.checkRegistrationData();
      if (!success) return;

      this.$emit('input', {
        lastname: this.fields.lastname.value,
        firstname: this.fields.firstname.value,
        middlename: this.fields.middlename.value,
        email: this.fields.email.value,
        phone_number: this.fields.phone.value,
        password: this.fields.password.value,
      });

      this.$emit('register');
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

    /**
     * Вернуться на шаг назад
     * @returns void
     */
    back() {
      this.$emit('back');
    },

    /**
     * Перейти к диалогу входа в систему
     * @returns void
     */
    goToLoginForm() {
      this.$emit('go-to-login-form');
    },

    /**
     * Заглушка
     */
    InDev() {
      alert('Функционал находится в разработке.');
    },
  },
};
</script>

<style module lang="scss">
@import '~/assets/scss/var.scss';

.block-control {
  display: flex;
  justify-content: center; // Если кнопка одна
}

.block-control-main {
  flex: 1 1 auto;
  margin: 0 0 0 1rem;
}

.confidential-policy {
  font-size: 12px;
  text-align: justify;

  @include media-breakpoint-down(xl) {
    text-align: center;
  }

  @include media-breakpoint-down(lg) {
    text-align: justify;
  }

  :global(.btn-link) {
    cursor: pointer;
  }
}
</style>
