<template>
    <section
        id="quality-block"
        v-lazy:background-image="'/images/landing/quality/bg-quality.jpg'"
        :class="$style.quality"
    >
        <div class="container">
            <div :class="$style.list">
                <div :class="$style.item">
                    <img v-lazy="'/svg/landing/quality/1.svg'" width="60" height="60" alt="Icon" />
                    <h3 :class="$style.title">Интеллектуальный подбор товаров</h3>
                </div>

                <div :class="$style.item">
                    <img v-lazy="'/svg/landing/quality/2.svg'" width="60" height="60" alt="Icon" />
                    <h3 :class="$style.title">
                        <div>Поиск лучших цен</div>
                        <div>по наличию</div>
                    </h3>
                </div>

                <div :class="$style.item">
                    <img v-lazy="'/svg/landing/quality/3.svg'" width="60" height="60" alt="Icon" />
                    <h3 :class="$style.title">Расчёт стоимости подобранных товаров</h3>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
export default {};
</script>

<style module lang="scss">
.quality {
    padding: rem(60) 0;
    color: $white;
    background-repeat: no-repeat;
    background-position: left top;
    background-size: cover;
    background-attachment: fixed;
}

.list {
    display: flex;
    justify-content: space-evenly;
}

.item {
    flex: 1 0 25%;
    max-width: 25%;
    text-align: center;
}

.title {
    margin: rem(16) 0 0 0;
}
</style>
