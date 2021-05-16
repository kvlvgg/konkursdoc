import currency from 'currency.js';

export default {
  methods: {
    USD: value =>
      currency(value, {
        precision: 2,
        symbol: '$',
        separator: ' ',
        pattern: `# !`,
        fromCents: true,
      }),
    RUB: value =>
      currency(value, {
        precision: 2,
        symbol: '₽',
        separator: ' ',
        pattern: `# !`,
        fromCents: true,
      }),
  },
};
