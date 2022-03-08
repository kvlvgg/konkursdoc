<template>
    <div>
        <Progress :total="2" :currentStep="steps[step].id" />

        <!-- <QuizStep
      v-if="step === 'first-question'"
      v-model="steps['first-question'].value"
      :title="steps['first-question'].question"
      :options="steps['first-question'].options"
      isFirst
      @next="setStep('second-question')"
    />

    <QuizStep
      v-if="step === 'second-question'"
      v-model="steps['second-question'].value"
      :title="steps['second-question'].question"
      :options="steps['second-question'].options"
      :multipleChoice="steps['second-question'].multipleChoice"
      :selectionGroups="steps['second-question'].selectionGroups"
      @back="setStep('first-question')"
      @next="setStep('registration')"
    /> -->

        <RegisterStep
            v-if="step === 'registration'"
            v-model="steps.registration.value"
            :serverErrors="steps.registration.errors"
            @register="registration"
            @go-to-login-form="$modal().showSignIn()"
            @back="setStep('second-question')"
        />

        <ConfirmCodeStep
            v-if="step === 'confirmation'"
            v-model="steps.confirmation.value"
            :serverErrors="steps.confirmation.errors"
            @confirm="confirm"
            @send-again="sendAgain"
        />
    </div>
</template>

<script>
import Progress from '~/components/profile/auth/local/Progress.vue';
// import QuizStep from '~/components/profile/auth/local/QuizStep.vue';
import RegisterStep from '~/components/profile/auth/local/RegisterStep.vue';
import ConfirmCodeStep from '~/components/profile/auth/local/ConfirmCodeStep.vue';

export default {
    components: {
        Progress,
        // QuizStep,
        RegisterStep,
        ConfirmCodeStep,
    },

    data() {
        return {
            /**
             * Шаги регистрации
             * 1 - first-question    - первый вопрос квиза
             * 2 - second-question    - второй вопрос квиза
             * 3 - registration    - ввод данных для регистрации
             * 4 - confirmation  - подтверждение регистрации
             */
            step: 'registration',

            steps: {
                // При расскомментировании изменить id у объектов registration и confirmation
                // и изменить свойство total в компоненте Progress на 4

                // 'first-question': {
                //   id: 1,
                //   question: 'Какую компанию вы представляете?',
                //   options: ['Участники тендеров', 'Планируем участвовать в тендерах'],
                //   value: '',
                // },

                // 'second-question': {
                //   id: 2,
                //   key: () => this.steps['first-question'].value,

                //   get question() {
                //     return this[this.key()] && this[this.key()].question;
                //   },
                //   get options() {
                //     return this[this.key()] && this[this.key()].options;
                //   },
                //   get multipleChoice() {
                //     return this[this.key()] && this[this.key()].multipleChoice;
                //   },
                //   get selectionGroups() {
                //     return this[this.key()] && this[this.key()].selectionGroups;
                //   },
                //   get value() {
                //     return this[this.key()] && this[this.key()].value;
                //   },
                //   set value(value) {
                //     this[this.key()].value = value;
                //   },

                //   'Участники тендеров': {
                //     question: 'В рамках каких ФЗ Вы участвуете в тендерах?',
                //     options: ['44 ФЗ', '223 ФЗ', 'Коммерческие закупки'],
                //     multipleChoice: true,
                //     value: [],
                //   },

                //   'Планируем участвовать в тендерах': {
                //     question: 'На каком этапе Вы находитесь?',
                //     options: [
                //       'Зарегистрировали юрлицо',
                //       'Получили ЭЦП',
                //       'Прошли регистрацию на электронных площадках для проведения торгов',
                //       'Ни один из вариантов',
                //     ],
                //     multipleChoice: true,
                //     selectionGroups: ['012', '3'],
                //     value: [],
                //   },
                // },

                registration: {
                    id: 1,
                    value: null,
                    errors: null,
                },

                confirmation: {
                    id: 2,
                    value: null,
                    errors: null,
                },
            },
        };
    },

    methods: {
        /**
         * 1 шаг регистрации - первый вопрос квиза (first-question)
         * 2 шаг регистрации - второй вопрос квиза (second-question)
         * 3 шаг регистрации - ввод данных для регистрации (registration)
         * 4 шаг регистрации - подтверждение регистрации (confirmation)
         * @param String value - first-question | second-question | registration | confirmation
         * @return  void
         */
        setStep(value) {
            this.step = value;
        },

        /**
         * Регистрация аккаунта
         * @return  void
         */
        async registration() {
            const fields = {
                ...this.steps.registration.value,

                // quiz: [
                //   {
                //     question: this.steps['first-question'].question,
                //     answers: this.steps['first-question'].value,
                //   },
                //   {
                //     question: this.steps['second-question'].question,
                //     answers: this.steps['second-question'].value,
                //   },
                // ],
            };

            this.$emit('switch-loader', true);

            const response = await this.$store.dispatch('auth/register', fields);

            this.$emit('switch-loader', false);

            if (response.status !== 'success') {
                this.steps.registration.errors = { email: [response.message] };
                return;
            }

            this.setStep('confirmation');
        },

        /**
         * Подтверждение почтового ящика
         * @return void
         */
        async confirm() {
            const fields = {
                email: this.steps.registration.value.email,
                email_confirmation_code: this.steps.confirmation.value,
            };

            this.$emit('switch-loader', true);

            const response = await this.$store.dispatch('auth/confirmEmail', fields);

            this.$emit('switch-loader', false);

            if (response.status !== 'success') {
                this.steps.confirmation.errors = { code: [response.message] };
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
                email: this.steps.registration.value.email,
            };

            this.$emit('switch-loader', true);

            const response = await this.$store.dispatch('auth/sendEmailConfirmationCode', fields);

            this.$emit('switch-loader', false);

            if (response.status !== 'success') {
                this.steps.confirmation.errors = { code: [response.message] };
            }
        },
    },
};
</script>

<style></style>
