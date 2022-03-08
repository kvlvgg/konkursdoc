import { Vue, Component } from 'vue-property-decorator';
import { USD, RUB } from '@/utils/currency';

@Component
export default class CurrencyMixin extends Vue {
    currencyJS = {
        USD,
        RUB,
    };
}
