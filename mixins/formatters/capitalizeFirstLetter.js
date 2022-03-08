export default {
    methods: {
        /**
         * Возвращает строку первый символ заглавный
         * @param   String s
         * @return  String
         */
        capitalizeFirstLetter(s) {
            return s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();
        },
    },
};
