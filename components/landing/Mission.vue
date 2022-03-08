<template>
    <section
        id="mission-block"
        v-lazy:background-image="'/images/landing/mission/bg-mission.jpg'"
        :class="$style.mission"
    >
        <div class="container">
            <div :class="$style.body">
                <div :class="$style.left">
                    <div :class="$style.image_wrap">
                        <img
                            v-lazy="'/images/landing/mission/icon-mission.png'"
                            :class="$style.image"
                            alt="Пример приложения на ноутбуке"
                        />
                    </div>
                </div>

                <div :class="$style.right">
                    <h2 :class="$style.title">Наша миссия:</h2>

                    <div :class="$style.text">
                        Дать каждой компании инструмент автоматизации процессов формирования тендерной документации и
                        упростить взаимодействие организаторов и участников торгов
                    </div>

                    <b-button variant="primary" @click="$modal().showSignUp()">Начать бесплатно</b-button>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
export default {};
</script>

<style module lang="scss">
.mission {
    padding: rem(20) 0 rem(20);
    color: $black;
    background-repeat: no-repeat;
    background-position: left top;
    background-size: cover;
}

.body {
    display: flex;
    align-items: center;
}

.left {
    position: relative;
    flex: 1 0 50%;
    max-width: 50%;
    margin-right: 20px;
}

.image_wrap {
    max-width: 100%;
    max-height: 100%;
}
.image {
    width: auto;
    max-width: 100%;
    height: 100%;
    max-height: 100%;
}

.right {
    flex: 1 0 50%;
    max-width: 50%;
}

.title {
    @include font(26, 26);
    margin: 0 0 rem(24) 0;
}

.text {
    @include fontTTNormsRegular();
    @include font(16, 24);
    margin: 0 0 rem(24) 0;
}
</style>
