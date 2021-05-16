/*
  //// TODO Рефактор этой директивы. Нужно многое знать об ее внутреннем устройтсве, чтобы ей пользоваться
  Использование:
    Данная директива реализует возможность ленивой загрузки на таблицу bootstrap-vue.
    В нее нужно передать объект вида { items, requestFunc, endReached }.
    items - массив объектов-строк, передаваемый в таблицу. Объект должен изменяться только
    с помощью функций, свойственных массивам (push, pop, slice, splice), а не присваиванием, иначе, будет потеряна ссылка на массив.
    requestFunc - функция, запрашивающая данные. Должна принимать один аргумент - количество уже запрошенных строк.
    endReached - если выше упомянутая функция вернула 0 записей, то устанавливать значение в true.
    И наоборот, если начинается зарос данных с другими аргументами, то поставить свойство в false.

  Пример:
      <b-table
        v-virtual-scroll="lazyLoadOptions"
      />

      created() {
        this.lazyLoadOptions = {
          items: this.cartridges,
          requestFunc: this.reqCartridges,
          endReached: false,
        };
      }
*/

import Vue from 'vue';

Vue.directive('virtual-scroll', {
  bind(el, binding, vnode) {
    const options = binding.value;
    if (!options.requestFunc) return;

    const tableWrapper = el;
    const table = tableWrapper.querySelector('table');

    tableWrapper.addEventListener('scroll', function () {
      if (options.endReached) return;

      const tableWrapperBottom = tableWrapper.getBoundingClientRect().bottom;
      const tableBottom = table.getBoundingClientRect().bottom;
      const isEndOfItemsIsClose = tableBottom - 200 < tableWrapperBottom;

      if (
        isEndOfItemsIsClose &&
        !options.loadingInProgress &&
        options.items.length !== 0
      ) {
        options.requestFunc(options.items.length);
      }
    });
  },
});
