import { Vue, Component } from 'vue-property-decorator';

@Component
export default class IsValidPassword extends Vue {
    /**
     * Проверяем строку, является ли она номером телефона
     * @param   String  s
     * @return  Boolean
     */
    isPhone(s: string) {
        return !!s && !s.includes('_');
    }
}
