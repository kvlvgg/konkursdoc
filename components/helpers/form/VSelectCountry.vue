<template>
  <div class="country-select">
    <v-select-input
      :value="value"
      :options="isReducedCountryList ? reducedCountries : allCountries"
      :size="size"
      placeholder="Страна"
      searchable
      :appendToBody="true"
      :calculatePosition="saveStateAndCalcPosition"
      @search="countrySearch"
      @input="inputValue"
    />
  </div>
</template>

<script>
import VSelectInput from '~/components/helpers/form/VSelectInput.vue';

export default {
  components: {
    VSelectInput,
  },
  props: {
    value: {
      type: String,
      default: null,
    },
    size: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      dropdownInitialState: null,
      isReducedCountryList: true,
    };
  },
  computed: {
    reducedCountries() {
      return this.$store.getters['common/countries']
        .filter(x => ['Китай', 'Россия', 'Япония'].includes(x.name))
        .map(x => ({
          value: x.id,
          label: x.name,
        }));
    },
    allCountries() {
      return this.$store.getters['common/countries'].map(x => ({
        value: x.id,
        label: x.name,
      }));
    },
  },
  methods: {
    /**
     * Обработка выбора
     * @param int - id страны.
     * @returns void
     */
    inputValue(value) {
      const country = this.$store.getters['common/countries'].find(
        x => x.id === value
      );
      if (!country) return;
      this.$emit('input', country.name);
    },
    /**
     * Если среди 3 самых часто выбираемых стран нет той,
     * которая начинается на введенную в поиск строку, то
     * показываем пользователю полный список
     * @param String - введення в поиск строка
     * @returns void
     */
    countrySearch(value) {
      // Надо скрыть элемент, но при этом оставить его в DOM,
      // чтобы затем в calcPosition считать его высоту,
      // и переместить наверх, иначе на мгновение происходит
      // overflow страницы и можно заметить скролл.
      this.dropdownInitialState.dropdownList.style.visibility = 'hidden';
      this.dropdownInitialState.dropdownList.style.top = '0';

      // Изменяем список стран, если нужно
      this.isReducedCountryList = this.reducedCountries.some(x =>
        x.label.startsWith(value)
      );

      // Пересчитываем позицию и делаем снова видимым
      // Если не использовать setTimeout или $nextTick
      // позиция будет расчитана слишком рано, до того, как
      // очиститься стэк вызовов. Нам надо, чтобы отработала реактивность Vue
      setTimeout(() => {
        this.calcPosition(this.dropdownInitialState);
        this.dropdownInitialState.dropdownList.style.visibility = 'visible';
      }, 0);
    },
    /**
     * Сохраняем ссылки на элементы выпадающего списка и компонент в целом.
     * @param DOMElement dropdownList - <ul>
     * @param VueComponent component - Vue-select
     * @param Object ...{ width, top, left } - некоторые переменные с предрасчитанной позицией. Я ее тут не использовал.
     * @returns void
     */
    saveStateAndCalcPosition(dropdownList, component, { width, top, left }) {
      this.dropdownInitialState = { dropdownList, component };
      this.calcPosition(this.dropdownInitialState);
      setTimeout(() => {
        this.calcPosition(this.dropdownInitialState);
      }, 0);
    },
    /**
     * Расчет позиции выпадающего списка
     * @param Object state - { dropdownList, component }
     */
    calcPosition(state) {
      // Считываем высоту выпадающего списка, затем убираем из DOM.
      // Я не знаю, почему, но позиция списка расчитывается лучше,
      // если его убрать, а потом вернуть в DOM.
      const height = state.dropdownList.offsetHeight;
      state.dropdownList.style.display = 'none';

      // Позиционируем выпадающий список
      const rect = state.component.$el.getBoundingClientRect();
      state.dropdownList.style.top = this.calcY(height, rect);
      state.dropdownList.style.left = `${rect.left}px`;

      // Добавляем класс для изменения скролла
      state.dropdownList.classList.add(this.$style.dropdown);
      // Возвращаем список обратно в DOM
      state.dropdownList.style.display = 'block';
    },
    /**
     * Расчет позиции выпадающего списка по вертикали
     * @param int height - высота выпадающего списка
     * @param Object rect - boundingClientRect родительского элемента, относительно которого расчитываем позицию.
     * @returns String - позиция по вертикали в пикселях
     */
    calcY(height, rect) {
      const isAvailableSpaceEnough = height + rect.bottom < window.innerHeight;

      if (isAvailableSpaceEnough) return `${rect.bottom}px`;
      return `${rect.top - height}px`;
    },
  },
};
</script>

<style module lang="scss">
.dropdown {
  width: fit-content;
  max-height: 300px;
  z-index: 1051;

  &::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }

  &::-webkit-scrollbar-track {
    background: initial;
  }

  &::-webkit-scrollbar-track,
  &::-webkit-scrollbar-thumb {
    border-radius: 4px;
  }
}
</style>

<style lang="scss">
.country-select {
  div[size='sm'] .vs__dropdown-toggle {
    height: 2rem;
    line-height: 1;
    padding: 0.1rem 0.3rem;

    @media (max-width: 1399.98px) {
      height: 1.8rem;
    }

    @media (max-width: 1199.98px) {
      height: 1.5rem;
    }
  }

  .vs__selected-options {
    width: 90%;
  }

  .vs__selected {
    overflow: hidden;
    display: inline-block;
    line-height: 1.7;

    @media (max-width: 1399.98px) {
      line-height: 2;
    }
  }

  .vs__search {
    position: absolute;
    height: 100%;
    width: 100%;
  }
}
</style>
