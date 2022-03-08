<template>
    <div>
        <div class="font-weight-bold custom-modal-title">
            {{ title || 'Ошибка' }}
        </div>

        <div class="font-weight-light custom-form-message">
            {{ message }}
        </div>

        <b-form :class="$style.buttons">
            <b-button variant="gr-primary" @click="okClick">
                {{ okString || 'Закрыть' }}
            </b-button>
        </b-form>
    </div>
</template>

<script>
export default {
    props: {
        title: {
            type: String,
            default: null,
        },

        message: {
            type: String,
            default: null,
        },

        okString: {
            type: String,
            default: null,
        },
    },

    methods: {
        okClick() {
            this.$emit('change', true);
            this.$emit('close');
        },
    },
};
</script>

<style module lang="scss">
.buttons {
    display: flex;
    justify-content: center;

    button {
        width: 75%;
    }
}
</style>
