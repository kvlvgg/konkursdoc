import { Vue, Component } from 'vue-property-decorator';

@Component
export default class Format3Digit extends Vue {
    /**
     * Преобразуем число к удобочитаемому формату
     * Пример: format3digit(123456, 'руб.') -> 123 456 руб.
     * @param   String  value
     * @param   String  measure
     * @return  String
     */
    format3digit(value: string | number, measure?: string, floatingPoint = 0) {
        if (!value) return `0 ${measure ?? ''}`;
        let result = '0';
        if (typeof value === 'number') result = value.toFixed(floatingPoint);
        if (typeof value === 'string') result = parseFloat(value).toFixed(floatingPoint);
        result = result.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ');
        return `${result} ${measure ?? ''}`;
    }
}
