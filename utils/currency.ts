import currency from 'currency.js';

const RUB = (value: number) =>
    currency(value, {
        precision: 2,
        symbol: '₽',
        separator: ' ',
        pattern: `# !`,
        fromCents: true,
        decimal: ',',
    });

const USD = (value: number) =>
    currency(value, {
        precision: 2,
        symbol: '$',
        separator: ' ',
        pattern: `# !`,
        fromCents: true,
        decimal: ',',
    });

export { RUB, USD };
