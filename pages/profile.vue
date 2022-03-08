<template>
    <div :class="$style['profile']">
        <b-tabs v-model="tabIndex" pills :content-class="$style['content']" @input="tabSwitched">
            <b-tab active :title-link-class="$style['title-link-class']">
                <template #title>Профиль</template>
                <IndividualProfile />
            </b-tab>

            <b-tab :title-link-class="$style['title-link-class']">
                <template #title>Компания</template>
                <CompanyProfile />
            </b-tab>

            <b-tab :title-link-class="$style['title-link-class']">
                <template #title> Пользователи</template>
                <Users />
            </b-tab>
        </b-tabs>
    </div>
</template>

<script>
import IndividualProfile from '~/components/profile/Individual.vue';
import CompanyProfile from '~/components/profile/Company.vue';
import Users from '~/components/profile/Users.vue';

export default {
    middleware: ['login'],
    layout: 'default',
    scrollToTop: true,
    name: 'profile',

    components: {
        IndividualProfile,
        CompanyProfile,
        Users,
    },

    data() {
        return {
            tabIndex: 0,
            tabNames: ['profile', 'company', 'members'],
        };
    },

    watch: {
        $route() {
            this.switchTab();
        },
    },

    mounted() {
        this.switchTab();
    },

    methods: {
        switchTab() {
            const index = this.tabNames.findIndex(x => x === this.$route.query.tab);
            if (index === -1) return;
            this.tabIndex = index;
        },

        tabSwitched(e) {
            this.$router.push({ query: { tab: this.tabNames[e] } });
        },
    },
};
</script>

<style module lang="scss">
@import '~/assets/scss/var.scss';

.profile {
    display: block;
    padding: 0 10px;
    color: $secondary-dark;
}

.content {
    padding: 1rem 1rem 0 1rem;
    margin-top: 1rem;
    background: #f8f8f8;
    border: 1px solid #dfd9ee;
    border-radius: 4px;
}

.title-link-class {
    margin-right: 1rem;
}
</style>
