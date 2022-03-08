<template>
    <div>
        <div class="font-weight-bold custom-modal-title">Приглашение пользователя</div>

        <div class="custom-form-message">Введите почту для отправки приглашения нового пользователя</div>

        <b-form @submit.prevent="submit">
            <b-form-group>
                <b-input v-model.trim="email" type="email" placeholder="Введите email" required :state="state" />
                <b-form-invalid-feedback>
                    {{ error }}
                </b-form-invalid-feedback>
            </b-form-group>

            <b-button class="custom-modal-button" type="submit" block variant="gr-primary"> Отправить </b-button>
        </b-form>
    </div>
</template>

<script>
export default {
    data() {
        return {
            email: null,
            state: null,
            error: null,
        };
    },

    methods: {
        async submit() {
            this.$emit('switch-loader', true);

            const res = await this.$axios
                .$post('companies/company/members/', {
                    member_email: this.email,
                })
                .then(res => res)
                .catch(err => {
                    return err && err.response && err.response.data
                        ? err.response.data
                        : {
                              statusCode: 400,
                              message: 'An error has occurred. Please try again later',
                          };
                });

            this.$emit('switch-loader', false);

            if (!res.success) {
                this.state = res.success ? null : false;
                this.error = this.$i18n.t(`error["${res.detail}"]`);

                return;
            }

            this.successToast();

            this.$emit('change', true);
            this.$emit('close');
        },

        successToast() {
            this.$root.$bvToast.toast(`Приглашение успешно отправлено`, {
                title: `Добавление нового пользователя`,
                toaster: 'b-toaster-top-right',
                variant: 'success',
                appendToast: false,
                noCloseButton: false,
                autoHideDelay: 2000,
            });
        },
    },
};
</script>

<style></style>
