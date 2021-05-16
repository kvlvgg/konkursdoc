export default {
  methods: {
    /**
     * Преобразует массив в строку.
     * Пример: array2ValueAndRestCount(['Черный', 'Красный', 'Желтый']) -> 'Черный, Красный и еще 1'
     * @param   Array array
     * @return  String
     */
    array2ValueAndRestCount(array) {
      const totalCount = array.length;
      if (totalCount < 3) return array.join(', ');
      return `${array[0]}, ${array[1]} и еще ${totalCount - 2}`;
    },
  },
};
