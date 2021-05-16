<template>
  <section id="problems-block" :class="$style['problems']">
    <div class="container">
      <div :class="$style['section-title-content']">
        <h2 :class="$style['section-title']">Часто встречающиеся проблемы</h2>
        <h3 :class="$style['section-subtitle']">
          Проблемы, которые можно избежать, используя сервис KONKURS DOC
        </h3>
      </div>

      <div :class="$style['problems-list']">
        <div
          v-for="(item, index) in list"
          :key="index"
          :class="$style['problems-item']"
        >
          <div class="font-weight-bold" :class="$style['problems-item-header']">
            {{ item.title }}
          </div>
          <div class="font-weight-light" :class="$style['problems-item-body']">
            {{ item.text }}
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      listOrganizers: [
        {
          title:
            'Не успеваете провести тендер по закупке расходных материалов для оргтехники?',
          text:
            'KONKURSDOC ускоряет в 32 раза процесс формирования тендерной документации по расходным материалам для оргтехники',
        },
        {
          title: 'Нужно срочно собрать три коммерческих предложения?',
          text:
            'Сформируйте запросы на коммерческие предложения и отправьте ссылку поставщикам для оперативного ответа на запрос с помощью сервиса KONKURS DOC',
        },
        {
          title: 'Расчёт стоимости картриджей занимает много времени?',
          text:
            'Расчет стоимости картриджей на сайте KONKURDOC происходит в реальном времени на основании анализа цен ТОП - 10 поставщиков',
        },
        {
          title:
            'Из-за ошибки при составлении ТЗ пришлось вносить изменения в тендерную документацию?',
          text:
            'Гарантируем на 100% достоверность технических характеристик картриджей в Нашей базе, что позволит минимизировать вероятность возникновения ошибок при составлении заявок на участие в тендерах по поставке картриджей для оргтехники',
        },
      ],
      listParticipants: [
        {
          title:
            'Нужно срочно предоставить ответы на запросы коммерческих предложений?',
          text:
            'Подготовьте оперативно ответы на запросы КП с KONKURS DOC. Если запрос заказчика сформирован с помощью нашего сервиса подготовка КП займет 1 минуту',
        },
        {
          title:
            'Не успеваете подготовить документацию для участия в тендере на поставку расходных материалов для оргтехники?',
          text:
            'KONKURS DOC ускоряет в 32 раза процесс формирования тендерной документации по расходным материалам для оргтехники',
        },
        {
          title: 'Расчёт стоимости картриджей занимает много времени?',
          text:
            'Расчет стоимости картриджей на сайте KONKUR DOC происходит в реальном времени на основании анализа цен ТОП - 10 поставщиков',
        },
        {
          title:
            'Из-за ошибки при составлении заявки на участие в тендере Вас не допустили к аукциону?',
          text:
            'Гарантируем на 100% достоверность технических характеристик картриджей в Нашей базе, что позволит минимизировать вероятность возникновения ошибок при составлении заявок на участие в тендерах по поставке картриджей для оргтехники',
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
     * Перечень проблем и решений для разных типов клиентов
     * @return  Array
     */
    list() {
      if (this.clientType === this.clientTypeOrganizers) {
        return this.listOrganizers;
      }

      if (this.clientType === this.clientTypeParticipants) {
        return this.listParticipants;
      }

      return [];
    },
  },
};
</script>

<style module lang="scss">
@import '~/assets/scss/var.scss';
@import '~/assets/scss/module/lendingSection.scss';

.problems {
  padding: 70px 0 20px;
  background-repeat: no-repeat;
  background-position: left top;
  background-size: cover;
  background-image: url(~assets/image/landing/bg-problems.jpg);
}

.problems-list {
  display: flex;
  flex-direction: column;
  padding: 1rem 0 0 0;
}

.problems-item {
  margin: 0 0 2rem 0;
  background-color: $white;
  box-shadow: $box-shadow;
  border-radius: 20px 20px 8px 8px;

  &:last-child {
    margin-bottom: 0;
  }
}

.problems-item-header {
  font-size: 18px;
  line-height: 1em;
  padding: 0.625rem 2rem;
  background-color: #4a427d;
  color: $white;
  border-radius: 69px;
}

.problems-item-body {
  font-size: 14px;
  line-height: 1em;
  padding: 0.625rem 2rem;
}
</style>
