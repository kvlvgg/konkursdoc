<template>
    <footer v-lazy:background-image="'/images/landing/layouts/footer/bg-footer.jpg'" :class="$style.footer">
        <div class="container">
            <div :class="$style.row">
                <div :class="$style.col">
                    <Logo />
                    <Rules />
                    <Copyright />
                </div>

                <div :class="$style.col">
                    <h3 :class="$style.title">Информация о копмании</h3>
                    <Nav :items="nav_2" />
                </div>

                <div :class="$style.col">
                    <h3 :class="$style.title">ООО «ИТДОК»</h3>
                    <Contacts />
                    <Socials />
                </div>
            </div>
        </div>
    </footer>
</template>

<script>
import Contacts from '~/components/layout/landing/footer/Contacts.vue';
import Copyright from '~/components/layout/landing/footer/Copyright.vue';
import Logo from '~/components/layout/landing/footer/Logo.vue';
import Nav from '~/components/layout/landing/footer/Nav.vue';
import Rules from '~/components/layout/landing/footer/Rules.vue';
import Socials from '~/components/layout/landing/footer/Socials.vue';

export default {
    components: {
        Contacts,
        Copyright,
        Logo,
        Nav,
        Rules,
        Socials,
    },

    data() {
        return {
            nav_2: [
                // { url: '/about', name: 'О компании', isLink: true, offsetTop: 10 },
                {
                    url: 'mission-block',
                    name: 'Наша миссия',
                    isLink: false,
                    offsetTop: 74,
                },
                {
                    url: 'partners-block',
                    name: 'Партнёры',
                    isLink: false,
                },
                {
                    url: 'video-block',
                    name: 'Смотреть видео',
                    isLink: false,
                },
                {
                    url: 'pricing-block',
                    name: 'Тарифы',
                    isLink: false,
                    offsetTop: 10,
                },
                {
                    url: 'services-block',
                    name: 'Сервисы',
                    isLink: false,
                    offsetTop: 10,
                },
                // { url: 'reviews-block', name: 'Отзывы', isLink: false, offsetTop: 10 },
            ],
        };
    },
};
</script>

<style module lang="scss">
.footer {
    padding: rem(32) 0 rem(56);
    color: $white;
    background-repeat: no-repeat;
    background-position: center center;
    background-size: cover;
}

.row {
    display: flex;
    justify-content: space-around;
}

.col {
    flex: 1 0 25%;
    max-width: 25%;
    display: flex;
    flex-direction: column;
    padding: 0 rem(16) 0 0;
    text-align: left;

    &:last-child {
        padding-right: 0;
        text-align: right;
    }
}

.title {
    @include font(16, 16);
    margin: 0 0 rem(20) 0;
    text-transform: uppercase;
}
</style>
