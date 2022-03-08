<template>
    <div class="phone-input-wrapper">
        <vue-tel-input
            :key="renderKey"
            v-model="phone"
            :name="id"
            autocomplete="off"
            :class="stateClass"
            :state="state"
            mode="international"
            :dynamicPlaceholder="true"
            inputClasses="form-control"
            wrapperClasses="tell-input-wrapper"
            :defaultCountry="country"
            :onlyCountries="[country]"
            :dropdownOptions="null"
            :inputOptions="{ showDialCode: true }"
            :maxLen="Number(16)"
            validCharactersOnly
            @blur="onBlur"
            @input="onInput"
            @country-changed="onCountryChanged"
        ></vue-tel-input>

        <b-form-invalid-feedback>{{ error }}</b-form-invalid-feedback>
    </div>
</template>

<script>
import { VueTelInput } from 'vue-tel-input';

export default {
    name: 'phone-input',

    components: {
        VueTelInput,
    },

    props: {
        value: {
            type: String,
            default: '',
        },

        state: {
            type: Boolean,
            default: null,
        },

        error: {
            type: String,
            default: '',
        },

        // Имя компонента для уникальности ID
        name: {
            type: String,
            default: '',
        },
    },

    data() {
        return {
            renderKey: 1,
            phone: '', // model
            country: 'RU',
            id: 'phone-input', // Уникальный id инпута
        };
    },

    computed: {
        /**
         * Состояние валидации Bootstrap 4
         * @return  Boolean | null
         */
        stateClass() {
            const state = typeof this.state === 'boolean' ? this.state : null;
            if (state === true) return 'is-valid';
            else if (state === false) return 'is-invalid';
            return null;
        },
    },

    watch: {
        value() {
            this.phone = this.value;
        },

        country() {
            this.phone = '';
            this.renderKey = this.renderKey + 1;
        },
    },

    created() {
        if (this.name) this.id = `${this.id}-${this.name}`;
        if (this.value) this.phone = this.value.trim();
    },

    methods: {
        /**
         * Убираем фокус
         * @return  void
         */
        onBlur() {
            this.$emit('onBlur');
        },

        /**
         * Ввод данных
         * @return  void
         */
        onInput() {
            this.$emit('input', this.phone);
        },

        onCountryChanged(value) {
            if (!this.phone) this.phone = `+${value.dialCode}`;
        },
    },
};
</script>

<style lang="scss">
/* fix для input group */
.phone-input-wrapper {
    position: relative;
    flex: 1 1 auto;
    min-width: 1%;
    margin-bottom: 0;
}

.tell-input-wrapper {
    &.is-invalid {
        border-color: $danger !important;
    }
}
</style>
