<template>
    <section
        id="reviews-block"
        v-lazy:background-image="'/images/landing/reviews/bg-reviews.jpg'"
        :class="$style.reviews"
    >
        <div class="container">
            <Title title="Отзывы Наших клиентов" is-white />

            <div :class="$style.list_wrap">
                <div :class="$style.list">
                    <div :class="$style.item">
                        <div :class="$style.icon_wrap">
                            <img v-lazy="'/svg/landing/reviews/1.svg'" width="62" height="52" alt="Icon" />
                        </div>
                        <h3 :class="$style.title">Vimeo</h3>
                        <div :class="$style.text">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Orci fermentum feugiat scelerisque
                            ac faucibus donec nam. Nulla metus, platea curabitur molestie adipiscing nec, elementum.
                        </div>
                    </div>

                    <div :class="$style.item">
                        <div :class="$style.icon_wrap">
                            <img v-lazy="'/svg/landing/reviews/2.svg'" width="52" height="52" alt="Icon" />
                        </div>
                        <h3 :class="$style.title">Behance</h3>
                        <div :class="$style.text">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Orci fermentum feugiat scelerisque
                            ac faucibus donec nam. Nulla metus, platea curabitur molestie adipiscing nec, elementum.
                        </div>
                    </div>

                    <div :class="$style.item">
                        <div :class="$style.icon_wrap">
                            <img v-lazy="'/svg/landing/reviews/3.svg'" width="58" height="40" alt="Icon" />
                        </div>
                        <h3 :class="$style.title">Discord</h3>
                        <div :class="$style.text">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Orci fermentum feugiat scelerisque
                            ac faucibus donec nam. Nulla metus, platea curabitur molestie adipiscing nec, elementum.
                        </div>
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
};
</script>

<style module lang="scss">
.reviews {
    padding: rem(70) 0 rem(80);
    color: $white;
    background-repeat: no-repeat;
    background-position: left top;
    background-size: cover;
    background-attachment: fixed;
}

.list_wrap {
    margin: rem(112) 8.33% 0;
}

.list {
    display: flex;
    margin: 0 rem(-16);
    padding: rem(16) 0 0 0;
}

.item {
    flex: 1 1 33.33%;
    width: 33.33%;
    padding: 0 rem(16) rem(16);
    margin: 0 rem(16) rem(16);
    background-color: $white;
    color: $body-color;
    border-radius: rem(4);
}

.icon_wrap {
    height: rem(108);
    width: rem(108);
    margin: rem(-54) auto 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: $white;
    border: rem(6) solid #493d7b;
    border-radius: 50%;
}

.title {
    @include font(24, 38);
    color: $white;
    margin: rem(16) 0 0;
    background-color: #221541;
    box-shadow: $box-shadow;
    border-radius: rem(38);
    text-align: center;
}

.text {
    @include fontTTNormsRegular();
    @include font(14, 16);
    margin: rem(24) 0 0 0;
}
</style>
