import { Vue, Component } from 'vue-property-decorator';

@Component
export default class IsValidPassword extends Vue {
    isValidPassword(value: string) {
        return (
            !!value &&
            value.length >= 6 &&
            value.length <= 50 &&
            /[a-z]/.test(value) &&
            /[A-Z]/.test(value) &&
            /[0-9]/.test(value)
        );
    }
}
