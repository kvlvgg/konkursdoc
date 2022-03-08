<template>
    <section
        id="advantages-block"
        v-lazy:background-image="'/images/landing/advantages/bg-advantages.jpg'"
        :class="$style['advantages']"
    >
        <div class="container">
            <Title title="Преимущества" subtitle="Почему выбирают Konkurs doc?" />

            <div :class="$style['advantages-toggle']">
                <div :class="[$style['toggle-type-block'], $style['_50'], $style[typeClass]]">
                    <b-button variant="link" :class="$style[organizersActiveClass]" @click="toggleOrganizers"
                        >Организаторы</b-button
                    >

                    <b-button variant="link" :class="$style[participantsActiveClass]" @click="toggleParticipants"
                        >Участники</b-button
                    >
                </div>
            </div>

            <div :class="$style['advantages-text-wrap']">
                <template v-if="clientType == clientTypeOrganizers">
                    <div class="font-weight-light" :class="$style['advantages-text']">
                        Процесс формирования технического задания
                        <span class="font-weight-bold">до оптимизации</span>
                    </div>
                </template>

                <template v-if="clientType == clientTypeParticipants">
                    <div class="font-weight-light" :class="$style['advantages-text']">
                        Процесс формирования заявки
                        <span class="font-weight-bold">до оптимизации</span>
                    </div>
                </template>

                <div :class="[$style['advantages-sum-time'], $style['_other']]">
                    <div :class="$style['advantages-sum-time-content']">
                        <svg width="27" height="27" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M13.5 0C6.056 0 0 6.056 0 13.5S6.056 27 13.5 27 27 20.944 27 13.5 20.944 0 13.5 0zm0 25.313c-6.514 0-11.812-5.3-11.812-11.813 0-6.514 5.298-11.812 11.812-11.812 6.514 0 11.813 5.298 11.813 11.812 0 6.514-5.3 11.813-11.813 11.813z"
                                fill="#fff"
                            />
                            <path d="M14.344 5.063h-1.688v8.786l5.31 5.31 1.193-1.193-4.815-4.815V5.063z" fill="#fff" />
                        </svg>
                        <div class="font-weight-bold" :class="$style['advantages-sum-time-text']">2 часа 20 минут</div>
                    </div>
                </div>
            </div>

            <div :class="[$style['advantages-list'], $style['_other']]">
                <div v-for="(item, index) in otherList" :key="index" :class="$style['advantages-list-item']">
                    <div class="font-weight-light" :class="$style['advantages-list-item-index']">
                        {{ index + 1 }}
                    </div>
                    <div :class="$style['advantages-list-item-icon-wrap']">
                        <img :src="item.image" :alt="item.text" :class="$style['advantages-list-item-icon']" />
                    </div>
                    <div class="font-weight-bold" :class="$style['advantages-list-item-time']">
                        {{ item.time }}
                    </div>
                    <div class="font-weight-bold" :class="$style['advantages-list-item-text']">
                        {{ item.text }}
                    </div>
                </div>
            </div>

            <!-- <div :class="$style['advantages-separator']"></div> -->

            <div :class="$style['advantages-text-wrap']">
                <template v-if="clientType == clientTypeOrganizers">
                    <div class="font-weight-light" :class="$style['advantages-text']">
                        Процесс формирования технического задания
                        <span class="font-weight-bold">с помощью сервиса KONKURS DOC</span>
                    </div>
                </template>

                <template v-if="clientType == clientTypeParticipants">
                    <div class="font-weight-light" :class="$style['advantages-text']">
                        Процесс формирования заявки
                        <span class="font-weight-bold">с помощью сервиса KonkursDoc</span>
                    </div>
                </template>

                <div :class="$style['advantages-sum-time']">
                    <div :class="$style['advantages-sum-time-content']">
                        <svg width="27" height="27" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M13.5 0C6.056 0 0 6.056 0 13.5S6.056 27 13.5 27 27 20.944 27 13.5 20.944 0 13.5 0zm0 25.313c-6.514 0-11.812-5.3-11.812-11.813 0-6.514 5.298-11.812 11.812-11.812 6.514 0 11.813 5.298 11.813 11.812 0 6.514-5.3 11.813-11.813 11.813z"
                                fill="#fff"
                            />
                            <path d="M14.344 5.063h-1.688v8.786l5.31 5.31 1.193-1.193-4.815-4.815V5.063z" fill="#fff" />
                        </svg>
                        <div class="font-weight-bold" :class="$style['advantages-sum-time-text']">5 минут</div>
                    </div>
                </div>
            </div>

            <div :class="$style['advantages-list']">
                <div v-for="(item, index) in ourList" :key="index" :class="$style['advantages-list-item']">
                    <div class="font-weight-light" :class="$style['advantages-list-item-index']">
                        {{ index + 1 }}
                    </div>
                    <div :class="$style['advantages-list-item-icon-wrap']">
                        <img :src="item.image" :alt="item.text" :class="$style['advantages-list-item-icon']" />
                    </div>
                    <div class="font-weight-bold" :class="$style['advantages-list-item-time']">
                        {{ item.time }}
                    </div>
                    <div class="font-weight-bold" :class="$style['advantages-list-item-text']">
                        {{ item.text }}
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import Title from '~/components/landing/local/Title.vue';

export default {
    components: {
        Title,
    },

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
                    text: 'Составление описания картриджа в соответствии с законодательством РФ',
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
                    text: 'Составление описания картриджа в соответствии с законодательством РФ',
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
                    text: 'Автоматическое формирование ТЗ в соответствии с законодательством РФ',
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
                    text: 'Автоматическое формирование заявки в соответствии с законодательством РФ',
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
            return this.clientType == this.clientTypeOrganizers ? this.otherOrganizers : this.otherParticipants;
        },

        /**
         * Массив преимуществ нашей компании
         * @return  Array
         */
        ourList() {
            return this.clientType == this.clientTypeOrganizers ? this.ourOrganizers : this.ourParticipants;
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
            this.$store.dispatch('landing/setClientType', this.clientTypeParticipants);
        },
    },
};
</script>

<style module lang="scss">
@import '~/assets/scss/module/toggleType.scss';

.advantages {
    padding: rem(70) 0 rem(60);
    background-repeat: no-repeat;
    background-position: left top;
    background-size: cover;
}

.advantages-toggle {
    width: rem(292);
    margin: 0 auto;
}

.advantages-text-wrap {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: rem(16) 0 0 0;
}

.advantages-text {
    font-size: 18px;
    color: #333333;
}

.advantages-list {
    display: flex;
    justify-content: center;
    margin: 2rem -2rem 0;

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
    border-radius: rem(4);
    box-shadow: $box-shadow;
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
    top: 10px;
    left: 14px;
    // color: #4a427d;
    color: rgba($white, 0.7);
    z-index: 1;
}

.advantages-list-item-icon-wrap {
    display: none;
    margin: 0 0 2rem 0;
}

.advantages-list-item-icon {
    border-radius: 50%;
    box-shadow: $box-shadow;
}

.advantages-list-item-time {
    position: relative;
    font-size: 20px;
    background-color: $green;
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
        background-color: $green;
        padding: 0 1rem 0 0;
    }

    &:after {
        width: 0;
        height: 0;
        border-top: 18px solid transparent;
        border-left: 1rem solid $green;
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
    color: $purple;
}

.advantages-sum-time {
    display: flex;
    justify-content: center;
    // padding: 50px 0 30px;

    &._other {
        .advantages-sum-time-content {
            background-color: #ff4242;
        }
    }
}

.advantages-sum-time-content {
    display: flex;
    align-items: center;
    background-color: $green;
    color: $white;
    padding: 0.5rem 1rem;
    border-radius: 25px;
    box-shadow: $box-shadow;
}

.advantages-sum-time-text {
    margin: 0 0 0 0.5rem;
}

// .advantages-separator {
//   border-top: 1px solid #c1c1c1;
// }
</style>
