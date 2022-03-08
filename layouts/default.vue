<template>
    <div :class="$style.app">
        <NavigationBar :expanded="isNavBarExpanded" />

        <Toolbar @expand-nav-bar="isNavBarExpanded = !isNavBarExpanded" />

        <main :class="$style.main">
            <Nuxt />
        </main>
    </div>
</template>

<script>
import NavigationBar from '~/components/layout/default/NavigationBar.vue';
import Toolbar from '~/components/layout/default/Toolbar.vue';

export default {
    name: 'default',

    components: {
        NavigationBar,
        Toolbar,
    },

    data() {
        return {
            isNavBarExpanded: false,
        };
    },
};
</script>

<style module lang="scss">
.app {
    display: block;
    width: 100%;
    overflow: hidden;
    background-color: #efefef;
}

.main {
    display: flex;
    flex-direction: column;
}
</style>
