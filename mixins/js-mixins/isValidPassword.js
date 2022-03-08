// TODO после перевода на TS удалить

export default {
    methods: {
        isValidPassword(value) {
            return (
                value &&
                value.length >= 6 &&
                value.length <= 50 &&
                /[a-z]/.test(value) &&
                /[A-Z]/.test(value) &&
                /[0-9]/.test(value)
            );
        },
    },
};
