<template>
  <section id="advantages-block" :class="$style['advantages']">
    <div class="container">
      <div :class="$style['section-title-content']">
        <h2 :class="$style['section-title']">Преимущества</h2>
        <h3 :class="$style['section-subtitle']">
          Почему выбирают Konkurs doc?
        </h3>
      </div>

      <div :class="$style['advantages-toggle']">
        <div
          :class="[
            $style['toggle-type-block'],
            $style['_50'],
            $style[typeClass],
          ]"
        >
          <b-button
            variant="link"
            :class="$style[organizersActiveClass]"
            @click="toggleOrganizers"
            >Организаторы</b-button
          >

          <b-button
            variant="link"
            :class="$style[participantsActiveClass]"
            @click="toggleParticipants"
            >Участники</b-button
          >
        </div>
      </div>

      <div class="font-weight-light" :class="$style['advantages-text']">
        <template v-if="clientType == clientTypeOrganizers">
          <span>Процесс формирования технического задания&nbsp;</span>
        </template>
        <template v-if="clientType == clientTypeParticipants">
          <span>Процесс формирования заявки&nbsp;</span>
        </template>
        <span class="font-weight-bold">до оптимизации&nbsp;</span>
        <span>занимает&nbsp;</span>
        <span class="font-weight-bold text-danger">2 часа 20 минут</span>
      </div>

      <div :class="$style['advantages-content']">
        <div :class="[$style['advantages-list'], $style['_other']]">
          <div
            v-for="(item, index) in otherList"
            :key="index"
            :class="$style['advantages-list-item']"
          >
            <div
              class="font-weight-light"
              :class="$style['advantages-list-item-index']"
            >
              <span>{{ index + 1 }}</span>
            </div>
            <div :class="$style['advantages-list-item-icon-wrap']">
              <img
                :src="item.image"
                :alt="item.text"
                :class="$style['advantages-list-item-icon']"
              />
            </div>
            <div
              class="font-weight-bold"
              :class="$style['advantages-list-item-time']"
            >
              <span>{{ item.time }}</span>
            </div>
            <div
              class="font-weight-bold"
              :class="$style['advantages-list-item-text']"
            >
              <span>{{ item.text }}</span>
            </div>
          </div>
        </div>

        <!-- <div :class="[$style['advantages-sum-time'], $style['_other']]">
          <div :class="$style['advantages-sum-time-content']">
            <svg
              width="27"
              height="27"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M13.5 0C6.056 0 0 6.056 0 13.5S6.056 27 13.5 27 27 20.944 27 13.5 20.944 0 13.5 0zm0 25.313c-6.514 0-11.812-5.3-11.812-11.813 0-6.514 5.298-11.812 11.812-11.812 6.514 0 11.813 5.298 11.813 11.812 0 6.514-5.3 11.813-11.813 11.813z"
                fill="#fff"
              />
              <path
                d="M14.344 5.063h-1.688v8.786l5.31 5.31 1.193-1.193-4.815-4.815V5.063z"
                fill="#fff"
              />
            </svg>
            <div
              class="font-weight-bold"
              :class="$style['advantages-sum-time-text']"
            >
              <span>2 часа 20 минут</span>
            </div>
          </div>
        </div> -->
      </div>

      <div :class="$style['advantages-separator']"></div>

      <div class="font-weight-light" :class="$style['advantages-text']">
        <template v-if="clientType == clientTypeOrganizers">
          <span>Процесс формирования технического задания&nbsp;</span>
        </template>
        <template v-if="clientType == clientTypeParticipants">
          <span>Процесс формирования заявки&nbsp;</span>
        </template>
        <span class="font-weight-bold"
          >с помощью сервиса KONKURS DOC&nbsp;</span
        >
        <span>занимает&nbsp;</span>
        <span class="font-weight-bold text-success">5 минут</span>
      </div>

      <div :class="$style['advantages-content']">
        <div :class="$style['advantages-list']">
          <div
            v-for="(item, index) in ourList"
            :key="index"
            :class="$style['advantages-list-item']"
          >
            <div
              class="font-weight-light"
              :class="$style['advantages-list-item-index']"
            >
              <span>{{ index + 1 }}</span>
            </div>
            <div :class="$style['advantages-list-item-icon-wrap']">
              <img
                :src="item.image"
                :alt="item.text"
                :class="$style['advantages-list-item-icon']"
              />
            </div>
            <div
              class="font-weight-bold"
              :class="$style['advantages-list-item-time']"
            >
              <span>{{ item.time }}</span>
            </div>
            <div
              class="font-weight-bold"
              :class="$style['advantages-list-item-text']"
            >
              <span>{{ item.text }}</span>
            </div>
          </div>
        </div>

        <!-- <div :class="$style['advantages-sum-time']">
          <div :class="$style['advantages-sum-time-content']">
            <svg
              width="27"
              height="27"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M13.5 0C6.056 0 0 6.056 0 13.5S6.056 27 13.5 27 27 20.944 27 13.5 20.944 0 13.5 0zm0 25.313c-6.514 0-11.812-5.3-11.812-11.813 0-6.514 5.298-11.812 11.812-11.812 6.514 0 11.813 5.298 11.813 11.812 0 6.514-5.3 11.813-11.813 11.813z"
                fill="#fff"
              />
              <path
                d="M14.344 5.063h-1.688v8.786l5.31 5.31 1.193-1.193-4.815-4.815V5.063z"
                fill="#fff"
              />
            </svg>
            <div
              class="font-weight-bold"
              :class="$style['advantages-sum-time-text']"
            >
              <span>5 минут</span>
            </div>
          </div>
        </div> -->
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      otherOrganizers: [
        {
          time: '20 МИН',
          image: '/images/advantages/other-1.png',
          text: 'Подбор картриджей для формирования ТЗ',
        },
        {
          time: '10 МИН',
          image: '/images/advantages/other-2.png',
          text: 'Расчёт стоимости картриджей',
        },
        {
          time: '20 МИН',
          image: '/images/advantages/other-3.png',
          text: 'Поиск технических характеристик',
        },
        {
          time: '60 МИН',
          image: '/images/advantages/other-4.png',
          text:
            'Составление описания картриджа в соответствии с законодательством РФ',
        },
        {
          time: '30 МИН',
          image: '/images/advantages/other-5.png',
          text: 'Формирование технического задания',
        },
      ],

      otherParticipants: [
        {
          time: '20 МИН',
          image: '/images/advantages/other-1.png',
          text: 'Подбор картриджей для формирования заявки',
        },
        {
          time: '10 МИН',
          image: '/images/advantages/other-2.png',
          text: 'Расчёт стоимости картриджей',
        },
        {
          time: '20 МИН',
          image: '/images/advantages/other-3.png',
          text: 'Поиск технических характеристик',
        },
        {
          time: '60 МИН',
          image: '/images/advantages/other-4.png',
          text:
            'Составление описания картриджа в соответствии с законодательством РФ',
        },
        {
          time: '30 МИН',
          image: '/images/advantages/other-5.png',
          text: 'Формирование заявки',
        },
      ],

      ourOrganizers: [
        {
          time: '4 МИН',
          image: '/images/advantages/our-1.png',
          text: 'Интеллектуальный подбор картриджей для формирования ТЗ',
        },
        {
          time: '1 МИН',
          image: '/images/advantages/our-2.png',
          text: 'Автоматический расчёт стоимости картриджей',
        },
        {
          time: '1 КЛИК',
          image: '/images/advantages/our-3.png',
          text:
            'Автоматическое формирование ТЗ в соответствии с законодательством РФ',
        },
      ],

      ourParticipants: [
        {
          time: '4 МИН',
          image: '/images/advantages/our-1.png',
          text: 'Интеллектуальный подбор картриджей для формирования заявки',
        },
        {
          time: '1 МИН',
          image: '/images/advantages/our-2.png',
          text: 'Автоматический расчёт стоимости картриджей',
        },
        {
          time: '1 КЛИК',
          image: '/images/advantages/our-3.png',
          text:
            'Автоматическое формирование заявки в соответствии с законодательством РФ',
        },
      ],
    };
  },

  computed: {
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
     * Класс для переключателя
     * @return  String
     */
    typeClass() {
      return `_${this.clientType}`;
    },

    /**
     * Класс для переключателя органироторы
     * @return  String
     */
    organizersActiveClass() {
      return this.clientType == this.clientTypeOrganizers ? '_active' : '';
    },

    /**
     * Класс для переключателя участники
     * @return  String
     */
    participantsActiveClass() {
      return this.clientType == this.clientTypeParticipants ? '_active' : '';
    },

    /**
     * Массив преимуществ другой компании
     * @return  Array
     */
    otherList() {
      return this.clientType == this.clientTypeOrganizers
        ? this.otherOrganizers
        : this.otherParticipants;
    },

    /**
     * Массив преимуществ нашей компании
     * @return  Array
     */
    ourList() {
      return this.clientType == this.clientTypeOrganizers
        ? this.ourOrganizers
        : this.ourParticipants;
    },
  },

  methods: {
    /**
     * Устанавливаем переключатель на - организаторы
     * @return  Void
     */
    toggleOrganizers() {
      this.$store.dispatch('landing/setClientType', this.clientTypeOrganizers);
    },

    /**
     * Устанавливаем переключатель на - участники
     * @return  Void
     */
    toggleParticipants() {
      this.$store.dispatch(
        'landing/setClientType',
        this.clientTypeParticipants
      );
    },
  },
};
</script>

<style module lang="scss">
@import '~/assets/scss/var.scss';
@import '~/assets/scss/module/lendingSection.scss';
@import '~/assets/scss/module/toggleType.scss';

.advantages {
  padding: 70px 0 60px;
  background-repeat: no-repeat;
  background-position: left top;
  background-size: cover;
  background-image: url(~assets/image/landing/bg-advantages.jpg);
}

.advantages-toggle {
  width: 292px;
  margin: 0 auto;
}

.advantages-content {
  position: relative;
}

.advantages-text {
  display: flex;
  justify-content: center;
  padding: 1rem 0 0 0;
  font-size: 18px;
  color: #333333;
  text-align: center;
}

.advantages-list {
  display: flex;
  justify-content: center;
  margin: 1.5rem -1rem 0;

  &._other {
    .advantages-list-item-time {
      background-color: #ff4242;

      &:before {
        background-color: #ff4242;
      }

      &:after {
        border-left-color: #ff4242;
      }
    }
  }
}

.advantages-list-item {
  position: relative;
  flex: 1 1 20%;
  max-width: 20%;
  display: flex;
  flex-direction: column;
  background-color: #f4f4f4;
  border-radius: $border-radius;
  box-shadow: $box-shadow;
  padding: 1.5rem 0 0.5rem;
  margin: 0 1rem;
  text-align: center;

  &:last-child {
    .advantages-list-item-time {
      &:before,
      &:after {
        display: none;
      }
    }
  }
}

.advantages-list-item-index {
  position: absolute;
  top: 12px;
  left: 14px;
  color: #4a427d;
}

.advantages-list-item-icon-wrap {
  margin: 0 0 2rem 0;
}

.advantages-list-item-icon {
  border-radius: 50%;
  box-shadow: $box-shadow;
}

.advantages-list-item-time {
  position: relative;
  font-size: 20px;
  background-color: #54a447;
  color: $white;
  padding: 8px;

  &:before,
  &:after {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    left: 100%;
  }

  &:before {
    background-color: #54a447;
    padding: 0 1rem 0 0;
  }

  &:after {
    width: 0;
    height: 0;
    border-top: 18px solid transparent;
    border-left: 1rem solid #54a447;
    border-bottom: 18px solid transparent;
    margin: 0 0 0 1rem;
  }
}

.advantages-list-item-text {
  flex: 1 1 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.5rem;
  font-size: 14px;
  color: #4a427d;
}

.advantages-sum-time {
  position: absolute;
  top: 50%;
  left: -1rem;
  transform: rotateZ(90deg) translateX(-50%);
  transform-origin: 0 0;
  white-space: nowrap;

  &._other {
    .advantages-sum-time-content {
      background-color: #ff4242;
    }
  }
}

.advantages-sum-time-content {
  display: flex;
  align-items: center;
  background-color: #54a447;
  color: $white;
  padding: 0.5rem 1rem;
  border-radius: 25px;
  box-shadow: $box-shadow;
}

.advantages-sum-time-text {
  margin: 0 0 0 0.5rem;
}

.advantages-separator {
  border-top: 1px solid #c1c1c1;
  margin: 1.5rem 0 0 0;
}
</style>
