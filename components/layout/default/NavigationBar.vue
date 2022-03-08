<template>
    <div :class="[$style['navigation-bar'], $style[navBarClasses]]">
        <div>
            <nuxt-link exact to="/dashboard" :class="$style['navigation-bar__logo']">
                <div :class="$style['navigation-bar__logo_short']">
                    <img src="~assets/svg/navigation-bar/logo.svg" alt="KonkursDok logo" />
                </div>

                <div :class="$style['navigation-bar__logo_full']">
                    <img src="~assets/svg/navigation-bar/logo-text.svg" alt="KonkursDok logo" />
                </div>
            </nuxt-link>

            <NavBarMenuItem
                :link="
                    localePath({
                        name: 'project-id',
                        params: { id: 'new' },
                        active: '/project/new',
                    })
                "
                label="Поиск"
                image="icon-search"
            />

            <NavBarMenuItem link="/dashboard" label="Мои проекты" image="icon-my-projects" />

            <!--
      <NavBarMenuItem link="/dashboard" label="Запросы по КП" :hasNew="true">
        <template #image>
          <IconKpRequests />
        </template>
      </NavBarMenuItem>
      -->
        </div>
        <!-- <NavBarMenuItem
      link="/profile"
      label="Личный кабинет"
      image="icon-profile"
    /> -->
    </div>
</template>

<script>
import NavBarMenuItem from '~/components/layout/default/NavBarMenuItem.vue';
// import IconKpRequests from '~/components/icons/navigation-bar/IconKpRequests.vue';

export default {
    components: {
        NavBarMenuItem,
        // IconKpRequests,
    },

    props: {
        expanded: {
            type: Boolean,
            default: false,
        },
    },

    computed: {
        navBarClasses() {
            return this.expanded ? 'navigation-bar_expanded' : '';
        },
    },
};
</script>

<style module lang="scss">
@import '~/assets/scss/var.scss';

.navigation-bar {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 70px;
    float: left;
    height: 100vh;
    background-color: $secondary;
    box-shadow: $box-shadow;
    transition-property: width;
    transition-duration: 500ms;
    overflow: hidden;

    @include media-breakpoint-down(xl) {
        width: 50px;
    }

    @include media-breakpoint-down(lg) {
        width: 40px;
    }
}

.navigation-bar__logo {
    display: flex;
    align-items: center;
    height: 70px;

    @include media-breakpoint-down(xl) {
        height: 50px;
    }

    @include media-breakpoint-down(lg) {
        height: 40px;
    }
}

.navigation-bar__logo_short {
    flex: 0 0 70px;
    width: 70px;
    text-align: center;

    @include media-breakpoint-down(xl) {
        flex: 0 0 50px;
        width: 50px;

        img {
            height: 26px;
        }
    }

    @include media-breakpoint-down(lg) {
        flex: 0 0 40px;
        width: 40px;

        img {
            height: 18px;
        }
    }
}

.navigation-bar__logo_full {
    opacity: 0;
    visibility: hidden;
    transition: visibility 100ms, opacity 100ms;
}

.navigation-bar_expanded {
    width: 230px;

    .navigation-bar__logo_full {
        opacity: 1;
        visibility: visible;
        transition-duration: 2s;
    }
}
</style>
