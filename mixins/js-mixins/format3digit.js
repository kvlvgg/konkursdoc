export default {
    methods: {
        /**
         * Преобразуем число к удобочитаемому формату
         * Пример: format3digit(123456, 'руб.') -> 123 456 руб.
         * @param   String  value
         * @param   String  measure
         * @return  String
         */
        format3digit(value, measure, floatingPoint = 0) {
            if (!value) return `0 ${measure}`;
            let result = '0';
            if (typeof value === 'number') result = value.toFixed(floatingPoint);
            if (typeof value === 'string') result = parseFloat(value).toFixed(floatingPoint);
            result = result.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ');
            return `${result} ${measure}`;
        },
    },
};
