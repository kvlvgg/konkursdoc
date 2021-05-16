<template>
  <section id="pricing-block" :class="$style['pricing']">
    <div class="container">
      <div :class="$style['section-title-content']">
        <h2 :class="$style['section-title']">Тарифные планы</h2>
        <h3 :class="$style['section-subtitle']">
          Выберите подходящий тарифный план
        </h3>
      </div>

      <div :class="$style['pricing-toggle']">
        <div
          :class="[
            $style['toggle-type-block'],
            $style['_33'],
            $style[typeClass],
          ]"
        >
          <b-button
            variant="link"
            :class="$style[oneMonthActiveClass]"
            @click="currentPrice = 'oneMonth'"
            >1 месяц</b-button
          >

          <b-button
            variant="link"
            :class="$style[threeMonthActiveClass]"
            @click="currentPrice = 'threeMonth'"
            >3 месяца</b-button
          >

          <b-button
            variant="link"
            :class="$style[oneYearActiveClass]"
            @click="currentPrice = 'oneYear'"
            >1 год</b-button
          >
        </div>
      </div>

      <div :class="$style['pricing-list']">
        <div :class="$style['pricing-item']">
          <div :class="$style['pricing-item-header']">
            <div
              class="font-weight-bold"
              :class="$style['pricing-item-header-name']"
            >
              Бесплатный
            </div>
            <div :class="$style['pricing-item-header-row']">
              <div
                class="font-weight-bold"
                :class="$style['pricing-item-header-price']"
              >
                {{ price[currentPrice].free }}
              </div>
              <svg
                :class="$style['pricing-item-header-currency']"
                width="31"
                height="36"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11.501 16.762V7.509h7.007c1.367 0 2.49.464 3.393 1.343.88.903 1.343 2.026 1.343 3.393 0 1.27-.464 2.344-1.343 3.223-.903.879-2.026 1.294-3.393 1.294H11.5zm7.007 5.981c3.662 0 6.616-1.025 8.862-3.076 2.246-2.05 3.37-4.59 3.37-7.666 0-3.052-1.148-5.64-3.443-7.788C25.002 2.064 22.097.99 18.605.99h-14.6v15.772H.247v5.981h3.76v2.759H.246v6.006h3.76V36H11.5v-4.492h10.498v-6.006H11.501v-2.759h7.007z"
                  fill="#fff"
                />
              </svg>
              <div
                class="font-weight-light"
                :class="$style['pricing-item-header-period']"
              >
                /месяц
              </div>
            </div>
          </div>
          <div :class="$style['pricing-item-body']">
            <div
              v-for="(item, index) in freeServiceList"
              :key="index"
              class="font-weight-light"
              :class="[
                $style['pricing-item-body-item'],
                $style[serviceListClass(item)],
              ]"
            >
              {{ item.text }}
            </div>
          </div>
          <div :class="$style['pricing-item-control']">
            <b-button block variant="gr-primary" @click="$modal().showSignUp()"
              >Начать бесплатно</b-button
            >
          </div>
        </div>

        <template v-if="clientType === clientTypeOrganizers">
          <div :class="$style['pricing-item']">
            <div :class="$style['pricing-item-header']">
              <div
                class="font-weight-bold"
                :class="$style['pricing-item-header-name']"
              >
                Организатор
              </div>
              <div :class="$style['pricing-item-header-row']">
                <div
                  class="font-weight-bold"
                  :class="$style['pricing-item-header-price']"
                >
                  {{ price[currentPrice].organizer }}
                </div>
                <svg
                  :class="$style['pricing-item-header-currency']"
                  width="31"
                  height="36"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M11.501 16.762V7.509h7.007c1.367 0 2.49.464 3.393 1.343.88.903 1.343 2.026 1.343 3.393 0 1.27-.464 2.344-1.343 3.223-.903.879-2.026 1.294-3.393 1.294H11.5zm7.007 5.981c3.662 0 6.616-1.025 8.862-3.076 2.246-2.05 3.37-4.59 3.37-7.666 0-3.052-1.148-5.64-3.443-7.788C25.002 2.064 22.097.99 18.605.99h-14.6v15.772H.247v5.981h3.76v2.759H.246v6.006h3.76V36H11.5v-4.492h10.498v-6.006H11.501v-2.759h7.007z"
                    fill="#fff"
                  />
                </svg>
                <div
                  class="font-weight-light"
                  :class="$style['pricing-item-header-period']"
                >
                  /месяц
                </div>
              </div>
            </div>
            <div :class="$style['pricing-item-body']">
              <div
                v-for="(item, index) in organizerServiceList"
                :key="index"
                class="font-weight-light"
                :class="[
                  $style['pricing-item-body-item'],
                  $style[serviceListClass(item)],
                ]"
              >
                {{ item.text }}
              </div>
            </div>
            <div :class="$style['pricing-item-control']">
              <b-button
                block
                variant="gr-primary"
                @click="$modal().showSignUp()"
                >Приобрести</b-button
              >
            </div>
          </div>
        </template>

        <template v-if="clientType === clientTypeParticipants">
          <div :class="$style['pricing-item']">
            <div :class="$style['pricing-item-header']">
              <div
                class="font-weight-bold"
                :class="$style['pricing-item-header-name']"
              >
                Участник
              </div>
              <div :class="$style['pricing-item-header-row']">
                <div
                  class="font-weight-bold"
                  :class="$style['pricing-item-header-price']"
                >
                  {{ price[currentPrice].participant }}
                </div>
                <svg
                  :class="$style['pricing-item-header-currency']"
                  width="31"
                  height="36"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M11.501 16.762V7.509h7.007c1.367 0 2.49.464 3.393 1.343.88.903 1.343 2.026 1.343 3.393 0 1.27-.464 2.344-1.343 3.223-.903.879-2.026 1.294-3.393 1.294H11.5zm7.007 5.981c3.662 0 6.616-1.025 8.862-3.076 2.246-2.05 3.37-4.59 3.37-7.666 0-3.052-1.148-5.64-3.443-7.788C25.002 2.064 22.097.99 18.605.99h-14.6v15.772H.247v5.981h3.76v2.759H.246v6.006h3.76V36H11.5v-4.492h10.498v-6.006H11.501v-2.759h7.007z"
                    fill="#fff"
                  />
                </svg>
                <div
                  class="font-weight-light"
                  :class="$style['pricing-item-header-period']"
                >
                  /месяц
                </div>
              </div>
            </div>
            <div :class="$style['pricing-item-body']">
              <div
                v-for="(item, index) in participantServiceList"
                :key="index"
                class="font-weight-light"
                :class="[
                  $style['pricing-item-body-item'],
                  $style[serviceListClass(item)],
                ]"
              >
                {{ item.text }}
              </div>
            </div>
            <div :class="$style['pricing-item-control']">
              <b-button
                block
                variant="gr-primary"
                @click="$modal().showSignUp()"
                >Приобрести</b-button
              >
            </div>
          </div>
        </template>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      currentPrice: 'oneMonth',

      price: {
        oneMonth: {
          free: '0',
          organizer: '1 000',
          participant: '2 000',
        },
        threeMonth: {
          free: '0',
          organizer: '833',
          participant: '1 650',
        },
        oneYear: {
          free: '0',
          organizer: '650',
          participant: '1 500',
        },
      },

      freeServiceListOrganizers: [
        { active: true, text: 'Подбор катриджей' },
        { active: false, text: 'Автоматический расчёт стоимости' },
        { active: false, text: 'Обмен КП' },
        { active: false, text: 'Формирование ТЗ' },
        { active: false, text: 'Без доп. пользователей' },
      ],
      freeServiceListParticipants: [
        { active: true, text: 'Подбор катриджей' },
        { active: false, text: 'Автоматический расчёт стоимости' },
        { active: false, text: 'Обмен КП' },
        { active: false, text: 'Формирование заявок' },
        { active: false, text: 'Без доп. пользователей' },
      ],
      organizerServiceList: [
        { active: true, text: 'Подбор катриджей' },
        { active: true, text: 'Автоматический расчёт стоимости' },
        { active: true, text: 'Формирование запросов на предоставление КП' },
        { active: true, text: 'Формирование ТЗ' },
        { active: true, text: '1 Пользователь' },
      ],
      participantServiceList: [
        { active: true, text: 'Подбор катриджей' },
        { active: true, text: 'Автоматический расчёт стоимости' },
        { active: true, text: 'Предоставление ответов на запросы КП' },
        { active: true, text: 'Формирование заявок' },
        { active: true, text: '3 пользователя' },
      ],
    };
  },

  computed: {
    /**
     * Класс для переключателя
     * @return  String
     */
    typeClass() {
      return `_${this.currentPrice}`;
    },

    /**
     * Класс для переключателя 1 месяц
     * @return  String
     */
    oneMonthActiveClass() {
      return this.currentPrice == 'oneMonth' ? '_active' : '';
    },

    /**
     * Класс для переключателя 3 месяца
     * @return  String
     */
    threeMonthActiveClass() {
      return this.currentPrice == 'threeMonth' ? '_active' : '';
    },

    /**
     * Класс для переключателя 1 год
     * @return  String
     */
    oneYearActiveClass() {
      return this.currentPrice == 'oneYear' ? '_active' : '';
    },

    /**
     * Тип клиента
     * @return  String
     */
    clientType() {
      return this.$store.state.landing.clientType;
    },

    /**
     * Тип клиента - организатор
     * @return  String
     */
    clientTypeOrganizers() {
      return this.$store.state.landing.clientTypeOrganizers;
    },

    /**
     * Тип клиента - участник
     * @return  String
     */
    clientTypeParticipants() {
      return this.$store.state.landing.clientTypeParticipants;
    },

    /**
     * Услуги бесплатного тарифа для разных типов клиентов
     * @return  Array
     */
    freeServiceList() {
      if (this.clientType === this.clientTypeOrganizers) {
        return this.freeServiceListOrganizers;
      }

      if (this.clientType === this.clientTypeParticipants) {
        return this.freeServiceListParticipants;
      }

      return [];
    },
  },

  methods: {
    /**
     * Класс для услуги тарифа (имеется или нет)
     * @return  String
     */
    serviceListClass(item) {
      return item && item.active ? '_active' : '_not';
    },
  },
};
</script>

<style module lang="scss">
@import '~/assets/scss/var.scss';
@import '~/assets/scss/module/lendingSection.scss';
@import '~/assets/scss/module/toggleType.scss';

.pricing {
  padding: 70px 0 30px;
  background-repeat: no-repeat;
  background-position: left top;
  background-size: cover;
  background-image: url(~assets/image/landing/bg-pricing.jpg);
  box-shadow: $box-shadow;
}

.pricing-toggle {
  width: 351px;
  margin: 0 auto 1.5rem;
}

.pricing-list {
  display: flex;
  justify-content: space-evenly;
  margin: 0 -1rem;
}

.pricing-item {
  flex: 1 1 26%;
  max-width: 26%;
  margin: 0 1rem 2rem;
  display: flex;
  flex-direction: column;
}

.pricing-item-header {
  padding: 20px 30px;
  background-image: linear-gradient(99.33deg, #221541 0.96%, #381f75 97.63%);
  color: $white;
  border-radius: 8px 8px 0 0;
}

.pricing-item-header-name {
  font-size: 18px;
  line-height: 1em;
  margin: 0 0 1rem 0;
}

.pricing-item-header-row {
  display: flex;
  align-items: flex-end;
}

.pricing-item-header-price {
  font-size: 42px;
  line-height: 1em;
}

.pricing-item-header-currency {
  margin: 0 0 4px 6px;
}

.pricing-item-header-period {
  font-size: 22px;
  line-height: 1.5em;
  color: #73629b;
}

.pricing-item-body {
  flex: auto;
  padding: 20px 30px 15px;
  margin: 0 0 1.5rem 0;
  background-color: $white;
  border-radius: 0 0 8px 8px;
  box-shadow: $box-shadow;
}

.pricing-item-body-item {
  font-size: 16px;
  line-height: 1em;
  padding: 0 0 0 1.5rem;
  margin: 0 0 1.25rem 0;
  background-repeat: no-repeat;
  background-position: left 2px;

  &:last-child {
    margin: 0;
  }

  &._active {
    color: #54a447;
    background-size: 14px;
    background-image: url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTgiIGhlaWdodD0iMTQiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CiAgPHBhdGggZD0iTTYgMTEuMTdMMS44MyA3IC40MSA4LjQxIDYgMTQgMTggMiAxNi41OS41OSA2IDExLjE3eiIgZmlsbD0iIzU0QTQ0NyIvPgo8L3N2Zz4K');
  }

  &._not {
    color: #939393;
    background-size: 12px;
    background-image: url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTQiIGhlaWdodD0iMTQiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CiAgPHBhdGggZD0iTTE0IDEuNDFMMTIuNTkgMCA3IDUuNTkgMS40MSAwIDAgMS40MSA1LjU5IDcgMCAxMi41OSAxLjQxIDE0IDcgOC40MSAxMi41OSAxNCAxNCAxMi41OSA4LjQxIDcgMTQgMS40MXoiIGZpbGw9IiM5MzkzOTMiLz4KPC9zdmc+Cg==');
  }
}

.pricing-item-control {
  padding: 0 30px;
}
</style>
