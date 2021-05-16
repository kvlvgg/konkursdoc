<template>
  <section id="quiz-block" :class="$style['quiz']">
    <div class="container">
      <div :class="$style['section-title-content']">
        <h2 :class="$style['section-title']">Начните бесплатно</h2>
        <h3 :class="$style['section-subtitle']">
          Ответьте на вопросы и получите полный доступ
        </h3>
      </div>

      <div :class="$style['quiz-content']">
        <div :class="$style['quiz-steps']">
          <div
            v-for="(item, index) in steps"
            :key="index"
            :class="[$style['quiz-step-item'], $style[stepActiveClass(item)]]"
          ></div>
        </div>

        <div :class="$style['quiz-question']">
          {{ questions[currentQuestion].text }}
        </div>

        <div :class="$style['quiz-answers']">
          <div
            v-for="(item, index) in answerOptions[currentQuestion]"
            :key="index"
            :class="[
              $style['quiz-answer-item'],
              $style[answerActiveClass(item)],
            ]"
            @click="selectAnswer(item)"
          >
            <div :class="$style['quiz-answer-item-id']">{{ item.id }}</div>
            <div :class="$style['quiz-answer-item-text']">{{ item.text }}</div>
          </div>
        </div>

        <div :class="$style['quiz-answer-action']">
          <b-button
            variant="gr-primary"
            :class="$style['quiz-answer-action-item']"
            @click="confirmAnswer"
            >{{ answerActionText }}</b-button
          >
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      // Шаги квиза
      // [{ id: 1, active: true }, { id: 2, active: false }]
      steps: [],

      numberQuestions: 0,

      // ответы на восросы квиза
      answers: {
        1: null,
        2: null,
      },

      // текущий вопрос, по умолчанию первый
      currentQuestion: 'company',

      // заголовки вопросов
      questions: {
        company: {
          question: 1,
          many: false,
          text: 'Какую компанию вы представляете?',
        },
        organizers: {
          question: 2,
          many: false,
          text: 'По какому ФЗ Вы проводите тендеры?',
        },
        participants: {
          question: 2,
          many: true,
          text: 'В рамках каких ФЗ Вы участвуете в тендерах',
        },
        willBeParticipants: {
          question: 2,
          many: true,
          text: 'На каком этапе Вы находитесь?',
        },
      },

      answerOptions: {
        // первый вопрос
        company: [
          {
            id: 1,
            select: false,
            val: 'organizers',
            text: 'Организаторы тендеров',
          },
          {
            id: 2,
            select: false,
            val: 'participants',
            text: 'Участники тендеров',
          },
          {
            id: 3,
            select: false,
            val: 'willBeParticipants',
            text: 'Планируем участвовать в тендерах',
          },
        ],

        // второй вопрос, если в первом отметили первый ответ
        organizers: [
          { id: 1, select: false, text: '44 ФЗ' },
          { id: 2, select: false, text: '223 ФЗ' },
          { id: 3, select: false, text: 'Коммерческие закупки' },
        ],

        // второй вопрос, если в первом отметили второй ответ
        participants: [
          { id: 1, select: false, text: '44 ФЗ' },
          { id: 2, select: false, text: '223 ФЗ' },
          { id: 3, select: false, text: 'Коммерческие закупки' },
        ],

        // второй вопрос, если в первом отметили третий ответ
        willBeParticipants: [
          { id: 1, select: false, text: 'Зарегистрировали юрлицо' },
          { id: 2, select: false, text: 'Получили ЭЦП' },
          {
            id: 3,
            select: false,
            text:
              'Прошли регистрацию на электронных площадках для проведения торгов',
          },
          { id: 4, select: false, text: 'Не один из вариантов' },
        ],
      },
    };
  },

  computed: {
    /**
     * Текст для кнопки управления вопросами
     * @return  String
     */
    answerActionText() {
      if (this.steps.length < 2) return 'Завершить';
      return this.steps[this.steps.length - 2].active ? 'Далее' : 'Завершить';
    },
  },

  created() {
    const steps = [];
    Object.keys(this.answers).forEach((k, i) => {
      // делаем активный первый вопрос
      if (i) steps.push({ id: i + 1, active: false });
      else steps.push({ id: i + 1, active: true });
    });

    this.steps = steps;
    this.numberQuestions = steps.length;
  },

  methods: {
    /**
     * Класс для активного шага вопроса
     * @return  String
     */
    stepActiveClass(item) {
      return item && item.active ? '_active' : '';
    },

    /**
     * Класс для активного ответа
     * @return  String
     */
    answerActiveClass(item) {
      return item && item.select ? '_active' : '';
    },

    /**
     * Выбираем ответ
     * @return  void
     */
    selectAnswer(item) {
      // множественный выбор ответов в вопросе
      const hasMany = this.questions[this.currentQuestion].many;
      if (hasMany) {
        this.answerOptions[this.currentQuestion].forEach(i => {
          if (i.id === item.id) i.select = !i.select;
        });
      } else {
        this.answerOptions[this.currentQuestion].forEach(i => {
          if (i.id === item.id) i.select = true;
          else i.select = false;
        });
      }
    },

    /**
     * Подтверждаем ответ
     * @return  void
     */
    confirmAnswer() {
      // текущий вопрос и ответ
      const currentQuest = this.questions[this.currentQuestion];
      const answer = this.answerOptions[this.currentQuestion].find(
        i => i.select === true
      );
      if (!currentQuest || !answer) return;

      // записываем вопрос и ответ
      this.answers[currentQuest.question] = {
        question: currentQuest.text,
        answer: answer.text,
      };

      if (this.numberQuestions > currentQuest.question) {
        // устанавливем следующий вопрос
        if (answer.val) this.currentQuestion = answer.val;

        const newQuest = this.questions[this.currentQuestion];
        // Установка шага вопроса
        this.steps.forEach(i => {
          if (i.id === newQuest.question) i.active = true;
          else i.active = false;
        });
      } else {
        // открываем модальное окно с регистрацией
        console.log('finish');
      }
    },
  },
};
</script>

<style module lang="scss">
@import '~/assets/scss/var.scss';
@import '~/assets/scss/module/lendingSection.scss';

.quiz {
  padding: 80px 0;
}

.quiz-content {
  max-width: 540px;
  width: 100%;
  margin: 50px auto 0;
}

.quiz-steps {
  display: flex;
  justify-content: center;
  margin: 0 0 30px;
}

.quiz-step-item {
  width: 44px;
  height: 13px;
  background-color: #c4c4c4;
  margin: 0 10px;
  border-radius: 8px;

  &._active {
    background-image: linear-gradient(90deg, $primary 0%, $gr-primary 100%);
  }
}

.quiz-question {
  font: $font-weight-bold 18px/1em $font-family-bold;
  color: #221541;
  margin: 0 0 30px;
  text-align: center;
  text-transform: uppercase;
}

.quiz-answers {
  display: flex;
  flex-direction: column;
  margin: 0 0 30px;
}

.quiz-answer-item {
  display: flex;
  align-items: center;
  font: $font-weight-regular 18px/1em $font-family-regular;
  background-color: $white;
  color: #221541;
  padding: 9px 10px;
  margin: 0 0 30px;
  box-shadow: $box-shadow;
  border-radius: 4px;
  cursor: pointer;

  &:last-child {
    margin-bottom: 0;
  }

  &._active {
    background-image: linear-gradient(90deg, $primary 0%, $gr-primary 100%);
    color: $white;

    .quiz-answer-item-id {
      background-color: $white;
    }
  }
}

.quiz-answer-item-id {
  flex: 0 0 32px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 32px;
  height: 32px;
  font-size: 16px;
  background-color: #d2cfda;
  color: #26174b;
  border-radius: 50%;
}

.quiz-answer-item-text {
  margin: 0 0 0 1.25rem;
}

.quiz-answer-action {
  text-align: center;
}

.quiz-answer-action-item {
  padding-left: 4rem;
  padding-right: 4rem;
}
</style>
