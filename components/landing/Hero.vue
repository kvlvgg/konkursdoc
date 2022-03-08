<template>
    <section id="hero-block" v-lazy:background-image="'/images/landing/hero/bg-hero.jpg'" :class="$style.hero">
        <div class="container">
            <div :class="$style.body">
                <div :class="$style.title_wrap">
                    <h1 :class="$style.title">Надежный проводник в мире поставщиков IT оборудования</h1>

                    <h2 :class="$style.subtitle">
                        Агрегатор лучших цен на IT оборудование от производителей, дистрибьюторов и поставщиков
                    </h2>

                    <div>
                        <b-button
                            variant="gr-primary"
                            :class="['btn-rounded', $style.button]"
                            @click="$modal().showSignUp()"
                            >Начать бесплатно</b-button
                        >
                    </div>
                </div>

                <div :class="$style.form_wrap">
                    <h2 :class="$style.form_title">Найти оборудование</h2>

                    <form novalidate @submit.prevent="find">
                        <b-form-group>
                            <b-input v-model="equipment" type="text" placeholder="Поиск"></b-input>
                        </b-form-group>

                        <div :class="$style.button_control">
                            <b-button
                                type="submit"
                                variant="gr-primary"
                                :class="['btn-rounded', $style.button, $style.form__submit]"
                                >Найти</b-button
                            >
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import smoothscroll from '~/mixins/others/smoothscroll.js';

export default {
    mixins: [smoothscroll],

    data() {
        return {
            equipment: '',
        };
    },

    created() {
        const queryEquipment = this.$route.query.equipment || undefined;

        if (queryEquipment) this.equipment = queryEquipment;
    },

    methods: {
        find() {
            const equipment = this.equipment.length ? this.equipment : undefined;
            const queryEquipment = this.$route.query.equipment || undefined;

            if (equipment && equipment !== queryEquipment) {
                this.$router.replace({ query: { equipment } });
            }

            this.smoothScroll('services-block', 10);
        },
    },
};
</script>

<style module lang="scss">
.hero {
    padding: rem(170) 0 rem(140);
    background-repeat: no-repeat;
    background-position: left top;
    background-size: cover;
}

.body {
    display: flex;
}

.title_wrap {
    flex: 1 0 50%;
    max-width: 50%;
    display: flex;
    flex-direction: column;
    justify-content: center;
}

.form_wrap {
    flex: 1 1 50%;
    max-width: 50%;
    padding: rem(30) rem(30) rem(38) rem(30);
    margin: 0 0 0 rem(120);
    background-color: $white;
    box-shadow: $box-shadow;
    border-radius: rem(8);
}

.title {
    margin-bottom: 12px;
    @include font(24, 32);
}

.subtitle {
    max-width: 400px;
    margin-bottom: 28px;
    @include fontTTNormsRegular();
    @include font(16, 22);
}

.button {
    padding-left: rem(48);
    padding-right: rem(48);
}

.form_title {
    @include font(18, 24);
    color: $dark-blue;
    margin-bottom: 20px;
    text-align: center;
}

.button_control {
    text-align: center;
}

.form__submit {
    margin-top: 16px;
}
</style>
