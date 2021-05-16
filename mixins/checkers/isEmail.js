export default {
  methods: {
    /**
     * Проверяем строку, является ли она почтовым ящиком
     * @param   String  s
     * @return  Boolean
     */
    isEmail(s) {
      const EMAIL_REGEX = /(\<|^)[\w\d._%+-]+@(?:[\w\d-]+\.)+(\w{2,})(\>|$)/i;
      return EMAIL_REGEX.test(s);
    },
  },
};
