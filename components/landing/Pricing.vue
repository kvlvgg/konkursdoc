<template>
    <section
        id="pricing-block"
        v-lazy:background-image="'/images/landing/pricing/bg-pricing.jpg'"
        :class="$style.pricing"
    >
        <div class="container">
            <Title title="Тарифные планы" subtitle="Выберите подходящий тарифный план" />

            <div :class="$style['pricing-toggle']">
                <div :class="[$style['toggle-type-block'], $style['_33'], $style[typeClass]]">
                    <b-button
                        variant="link"
                        size="sm"
                        :class="$style[oneMonthActiveClass]"
                        @click="currentPrice = 'oneMonth'"
                        >Месяц</b-button
                    >

                    <b-button
                        variant="link"
                        size="sm"
                        :class="$style[threeMonthActiveClass]"
                        @click="currentPrice = 'threeMonth'"
                        >3 месяца</b-button
                    >

                    <b-button
                        variant="link"
                        size="sm"
                        :class="$style[oneYearActiveClass]"
                        @click="currentPrice = 'oneYear'"
                        >Год</b-button
                    >
                </div>
            </div>

            <div :class="$style['list']">
                <div :class="$style['item']">
                    <div :class="$style['item-header']">
                        <h3 :class="$style['item-header-name']">Бесплатный</h3>
                        <div :class="$style['item-header-row']">
                            <div :class="$style['item-header-price']">
                                {{ price[currentPrice].free }}
                            </div>
                            <svg
                                :class="$style['item-header-currency']"
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
                            <div :class="$style['item-header-period']">/месяц</div>
                        </div>
                    </div>
                    <ul :class="$style['item-body']">
                        <li
                            v-for="(item, index) in freeServiceList"
                            :key="index"
                            :class="[$style['item-body-item'], $style[serviceListClass(item)]]"
                        >
                            {{ item.text }}
                        </li>
                    </ul>
                    <div :class="$style['item-control']">
                        <b-button block variant="gr-primary" @click="$modal().showSignUp()">Попробовать</b-button>
                    </div>
                </div>

                <div :class="$style['item']">
                    <div :class="$style['item-header']">
                        <h3 :class="$style['item-header-name']">Поставщик</h3>
                        <div :class="$style['item-header-row']">
                            <div :class="$style['item-header-price']">
                                {{ price[currentPrice].organizer }}
                            </div>
                            <svg
                                :class="$style['item-header-currency']"
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
                            <div :class="$style['item-header-period']">/месяц</div>
                        </div>
                    </div>
                    <ul :class="$style['item-body']">
                        <li
                            v-for="(item, index) in organizerServiceList"
                            :key="index"
                            :class="[$style['item-body-item'], $style[serviceListClass(item)]]"
                        >
                            {{ item.text }}
                        </li>
                    </ul>
                    <div :class="$style['item-control']">
                        <b-button block variant="gr-primary" @click="$modal().showSignUp()">Начать бесплатно</b-button>
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

            freeServiceList: [
                { active: true, text: 'Поиск IT оборудования' },
                { active: false, text: 'Информация о ценах наличие на складах.' },
                { active: false, text: 'Автоматический расчет стоимости' },
                { active: false, text: 'Формирование списка для запроса поставщикам' },
                { active: false, text: 'Без доп. пользователей' },
            ],
            organizerServiceList: [
                { active: true, text: 'Поиск IT оборудования' },
                { active: true, text: 'Информация о ценах наличие на складах.' },
                { active: true, text: 'Автоматический расчет стоимости' },
                { active: true, text: 'Формирование списка для запроса поставщикам' },
                { active: true, text: 'Без доп. пользователей' },
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
@import '~/assets/scss/module/toggleType.scss';

.pricing {
    padding: rem(70) 0 rem(30);
    background-repeat: no-repeat;
    background-position: left top;
    background-size: cover;
    box-shadow: $box-shadow;
}

.pricing-toggle {
    width: rem(351);
    margin: 0 auto rem(24);
}

.list {
    display: flex;
    justify-content: space-evenly;
    margin: 0 rem(-16);
}

.item {
    flex: 1 1 33%;
    max-width: 33%;
    margin: 0 rem(16) rem(32);
    display: flex;
    flex-direction: column;
}

.item-header {
    padding: rem(20) rem(30);
    background-image: linear-gradient(100deg, #221541 1%, #381f75 100%);
    color: $white;
    border-radius: rem(8) rem(8) 0 0;
}

.item-header-name {
    @include font(22, 22);
    margin: 0 0 rem(16) 0;
}

.item-header-row {
    display: flex;
    align-items: flex-end;
}

.item-header-price {
    @include fontTTNormsBold();
    @include font(50, 50);
}

.item-header-currency {
    margin: 0 0 rem(4) rem(6);
}

.item-header-period {
    @include font(22, 33);
    color: #73629b;
}

.item-body {
    flex: auto;
    padding: rem(30) rem(30) rem(36);
    margin: 0 0 rem(24) 0;
    background-color: $white;
    border-radius: 0 0 rem(8) rem(8);
    box-shadow: $box-shadow;
}

.item-body-item {
    @include fontTTNormsRegular();
    @include font(18, 18);
    padding: 0 0 0 rem(24);
    margin: 0 0 rem(20) 0;
    background-repeat: no-repeat;
    background-position: left rem(2);

    &:last-child {
        margin: 0;
    }

    &._active {
        color: $green;
        background-size: rem(14);
        background-image: url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTgiIGhlaWdodD0iMTQiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CiAgPHBhdGggZD0iTTYgMTEuMTdMMS44MyA3IC40MSA4LjQxIDYgMTQgMTggMiAxNi41OS41OSA2IDExLjE3eiIgZmlsbD0iIzU0QTQ0NyIvPgo8L3N2Zz4K');
    }

    &._not {
        color: #939393;
        background-size: rem(12);
        background-image: url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTQiIGhlaWdodD0iMTQiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CiAgPHBhdGggZD0iTTE0IDEuNDFMMTIuNTkgMCA3IDUuNTkgMS40MSAwIDAgMS40MSA1LjU5IDcgMCAxMi41OSAxLjQxIDE0IDcgOC40MSAxMi41OSAxNCAxNCAxMi41OSA4LjQxIDcgMTQgMS40MXoiIGZpbGw9IiM5MzkzOTMiLz4KPC9zdmc+Cg==');
    }
}

.item-control {
    padding: 0 rem(30);
}
</style>
