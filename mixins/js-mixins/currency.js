import currency from 'currency.js';

export default {
    methods: {
        /**
         * Рассчитывает общую стоимость позиций.
         * Позиция - рассходный материал-объект, которые отображаются в Спецификации и Расчете.
         * @param Array items - позиции
         * @param string toCurrency - к какой валюте привести
         * @returns int - сумма
         */
        getTotalCost(items, toCurrency) {
            return this[toCurrency](
                items.reduce((acc, x) => this[toCurrency](x.prices[toCurrency]).add(acc).intValue, 0)
            );
        },

        /**
         * Конвертация цены продукта в выбранную валюту.
         * @param int value - значение
         * @param string fromCurrency - изначальная валюта продукта, из которой производится конвертация
         * @param string toCurrency - валюта, к которой приводим значение.
         * @param string Conversion - наценка поставщика.
         */
        convertPrice(value, fromCurrency, toCurrency) {
            if (fromCurrency === toCurrency) return this[toCurrency](value);

            const rate = this.$store.getters['common/exchangeRate'][fromCurrency][toCurrency];

            return this[toCurrency](value).multiply(rate);
        },

        USD: value =>
            currency(value, {
                precision: 2,
                symbol: '$',
                separator: ' ',
                pattern: `# !`,
                fromCents: true,
                decimal: ',',
            }),

        RUB: value =>
            currency(value, {
                precision: 2,
                symbol: '₽',
                separator: ' ',
                pattern: `# !`,
                fromCents: true,
                decimal: ',',
            }),

        // getConvertedRate: (exchangeRate, conversion = 0) => {
        //   const rate = exchangeRate.toString();
        //   const match = rate.match(/\.[\d]+/);

        //   const floatingPoints = match && match[0] ? match[0].length - 1 : 0;
        //   return (exchangeRate * (1 + conversion / 100)).toFixed(floatingPoints);
        // },
    },
};
