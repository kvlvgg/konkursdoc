<template>
  <div>
    <div class="font-weight-bold custom-modal-title">Восстановление пароля</div>

    <SendEmailStep
      v-if="step === 'send-email'"
      v-model="steps['send-email'].value"
      :serverErrors="steps['send-email'].errors"
      @send-email="sendEmail"
    />

    <ResetPasswordStep
      v-if="step === 'reset-password'"
      v-model="steps['reset-password'].value"
      :serverErrors="steps['reset-password'].errors"
      @send-password="sendPassword"
      @send-email-again="sendEmail"
    />
  </div>
</template>

<script>
import SendEmailStep from '~/components/profile/auth/local/SendEmailStep.vue';
import ResetPasswordStep from '~/components/profile/auth/local/ResetPasswordStep.vue';

export default {
  components: {
    SendEmailStep,
    ResetPasswordStep,
  },

  data() {
    return {
      /**
       * шаги восстановления пароля
       * - send-email
       * - reset-password
       */
      step: 'send-email',

      steps: {
        'send-email': {
          id: 1,
          value: null,
          errors: null,
        },
        'reset-password': {
          id: 2,
          value: null,
          errors: null,
        },
      },
    };
  },

  methods: {
    /**
     * 1 шаг восстановления пароля - отправка почты (send-email)
     * 2 шаг восстановления пароля - отправка кода подтверждения и нового пароля (reset-password)
     * @param String value - send-email | reset-password
     * @return  void
     */
    setStep(value) {
      this.step = value;
    },

    /**
     * Изменение пароля
     * @return void
     */
    async sendPassword() {
      const response = await this.$store.dispatch('auth/passwordReset', {
        email: this.steps['send-email'].value,
        ...this.steps['reset-password'].value,
      });

      if (response.status != 'success') {
        this.steps['reset-password'].errors =
          typeof response === 'object' ? response : { code: [response] };
        return;
      }

      this.$emit('close');
      this.$store.dispatch('auth/proceedToPortal');
    },

    /**
     * Запрос на восстановление пароля
     * @return void
     */
    async sendEmail() {
      const response = await this.$store.dispatch('auth/requestPasswordReset', {
        email: this.steps['send-email'].value,
      });

      if (response.status != 'success') {
        this.steps['send-email'].errors =
          typeof response === 'object' ? response : { email: [response] };
        return;
      }

      this.setStep('reset-password');
    },

    /**
     * Проверка заполнености данных для восстановления
     * @return Boolean
     */
    checkResetData() {
      let success = true;

      if (!this.code || !this.code.length) {
        this.stateCode = false;
        this.errorCode = 'Введите данные';
        success = false;
      }

      if (!this.strongPassword) {
        this.statePass = false;
        this.errorPass =
          'Пароль должен содержать строчные и прописные латинские буквы, цифры и содержать не менее 6 символов';
        success = false;
      }

      return success;
    },
  },
};
</script>

<style></style>
