<template>
  <ConfirmCodeStep
    v-model="confirmation.value"
    :serverErrors="confirmation.errors"
    @confirm="confirm"
    @send-again="sendAgain"
  />
</template>

<script>
import ConfirmCodeStep from '~/components/profile/auth/local/ConfirmCodeStep';

export default {
  components: {
    ConfirmCodeStep,
  },

  props: {
    email: {
      type: String,
      default: '',
      required: true,
    },
  },

  data() {
    return {
      confirmation: {
        value: null,
        errors: null,
      },
    };
  },

  methods: {
    /**
     * Подтверждение почтового ящика
     * @return void
     */
    async confirm() {
      const fields = {
        email: this.email,
        email_confirmation_code: this.confirmation.value,
      };

      const response = await this.$store.dispatch('auth/confirmEmail', fields);

      if (response.status !== 'success') {
        this.confirmation.errors =
          typeof response === 'object' ? response : { code: [response] };
        return;
      }

      if (!this.$auth.loggedIn) return;

      this.$emit('close');
      this.$store.dispatch('auth/proceedToPortal');
    },

    /**
     * Отправляем код еще раз
     * @return  void
     */
    async sendAgain() {
      this.code.state = null;
      this.code.error = '';

      const fields = {
        data: {
          email: this.email.trim().toLowerCase(),
        },
      };

      const status = await this.$store.dispatch(
        'auth/sendEmailConfirmationCode',
        fields
      );

      if (status) {
        this.code.error = status;
      } else {
        this.showSendAgain = false;
      }
    },
  },
};
</script>
