<template>
  <section id="faq-block" :class="$style['faq']">
    <div class="container">
      <div :class="$style['section-title-content']">
        <h2 :class="$style['section-title']">Часто задаваемые вопросы</h2>
      </div>

      <div :class="$style['faq-list']">
        <div
          v-for="(item, index) in list"
          :key="index"
          :class="$style['faq-item']"
        >
          <h3 v-b-toggle="item.collapseId" :class="$style['faq-item-title']">
            <span class="font-weight-normal" :class="$style['faq-item-link']">{{
              item.title
            }}</span>

            <div
              :class="[
                $style['faq-item-toggle'],
                $style[collapsItemClass(item)],
              ]"
            >
              <svg
                width="12"
                height="8"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1.41.59L6 5.17 10.59.59 12 2 6 8 0 2 1.41.59z"
                  fill="#000"
                />
              </svg>
            </div>
          </h3>

          <b-collapse :id="item.collapseId" accordion="collapse-faq">
            <div class="font-weight-light" :class="$style['faq-item-text']">
              {{ item.text }}
            </div>
          </b-collapse>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      list: [
        {
          collaps: false,
          collapseId: 'collapse-faq-0',
          title: 'Как работает KONKURS DOC?',
          text:
            'Наш сервис оптимизирует процессы поиска и подбора картриджей, расчёт стоимости, формирования технических заданий и заявок на участие в тендерах, что ускоряет процесс формирования тендерной документации в 32 раза',
        },
        {
          collaps: false,
          collapseId: 'collapse-faq-1',
          title: 'Какова вероятность, что найдётся нужный картридж?',
          text:
            'В нашей базе более 15000 моделей картриджей, которая ежедневно обновляется',
        },
        {
          collaps: false,
          collapseId: 'collapse-faq-2',
          title:
            'На сколько точны технические характеристики картриджей на сайте KONKURS DOC?',
          text:
            'Гарантируем на 100% достоверность технических характеристик картриджей в нашей базе. При выявлении несоответствий технических характеристик картриджей мы предоставим Вам полный доступ к сервису KONKURS DOC на 1 месяц бесплатно',
        },
        {
          collaps: false,
          collapseId: 'collapse-faq-3',
          title: 'Актуальна ли стоимость картриджей?',
          text:
            'Расчет стоимости картриджей на сайте KONKUR DOC происходит в реальном времени на основании анализа цен ТОП - 10 поставщиков',
        },
        {
          collaps: false,
          collapseId: 'collapse-faq-4',
          title:
            'Можно ли быть уверенным, что тендерная документация, составленная с помощью сервиса KONKURS DOC, будет соответствовать требованиям и законодательству РФ?',
          text:
            'Документация формируется на основе 15 летнего опыта экспертов в полном соответствии с законодательством РФ',
        },
      ],
    };
  },

  mounted() {
    this.$root.$on('bv::collapse::state', (collapseId, isJustShown) => {
      this.list.forEach(i => {
        if (i.collapseId === collapseId) i.collaps = isJustShown;
      });
    });
  },

  methods: {
    /**
     * Класс для открытого ответа
     * @return  String
     */
    collapsItemClass(item) {
      return item && item.collaps ? '_collaps' : '';
    },
  },
};
</script>

<style module lang="scss">
@import '~/assets/scss/var.scss';
@import '~/assets/scss/module/lendingSection.scss';

.faq {
  padding: 70px 0 80px;
  background-repeat: no-repeat;
  background-position: left top;
  background-size: cover;
  background-image: url(~assets/image/landing/bg-problems.jpg);
}

.faq-list {
  display: flex;
  flex-direction: column;
  margin: 0 8.333333%;
  padding: 1rem 0 0 0;
}

.faq-item {
  padding: 0 0 1rem 0;

  &:last-child {
    padding-bottom: 0;
  }
}

.faq-item-title {
  position: relative;
  padding: 0.657rem 2.5rem 0.657rem 1rem;
  background-color: #f6f6f6;
  box-shadow: $box-shadow;
  border-radius: 4px;
  overflow: hidden;

  &:before {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    width: 5px;
    background-color: #ff7b01;
  }
}

.faq-item-link {
  font-size: 16px;
  line-height: 1em;
}

.faq-item-text {
  font-size: 16px;
  line-height: 1.25em;
  padding: 0.5rem 1rem;
  margin: 0.5rem 0 0 0;
  background-color: white;
  border: 1px solid #b3b3b3;
  border-radius: 4px;
  overflow: hidden;
}

.faq-item-toggle {
  position: absolute;
  top: 43%;
  right: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.2s linear;

  &._collaps {
    transform: rotate(-180deg);
  }
}
</style>
