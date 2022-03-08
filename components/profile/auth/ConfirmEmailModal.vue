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

    created() {
        this.sendAgain();
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
                this.confirmation.errors = { code: [response.message] };
                return;
            }

            this.$emit('close');
            this.$store.dispatch('auth/proceedToPortal');
        },

        /**
         * Отправляем код еще раз
         * @return  void
         */
        async sendAgain() {
            const fields = {
                email: this.email.trim().toLowerCase(),
            };

            this.$emit('switch-loader', true);

            const response = await this.$store.dispatch('auth/sendEmailConfirmationCode', fields);

            this.$emit('switch-loader', false);

            if (response.status !== 'success') {
                this.confirmation.errors = { code: [response.message] };
            }
        },
    },
};
</script>

<style></style>
