export default {
    methods: {
        /**
         * Проверяем строку, является ли она номером телефона
         * @param   String  s
         * @return  Boolean
         */
        isPhone(s) {
            return s && !s.includes('_');
        },
    },
};
