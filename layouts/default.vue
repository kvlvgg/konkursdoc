<template>
  <div :class="['default-layout', 'app-page']">
    <NavigationBar :expanded="isNavBarExpanded" />

    <Toolbar @expand-nav-bar="isNavBarExpanded = !isNavBarExpanded" />

    <main class="app-main__workspace">
      <Nuxt />
    </main>
  </div>
</template>

<script>
import NavigationBar from '~/components/layout/default/NavigationBar.vue';
import Toolbar from '~/components/layout/default/Toolbar.vue';

export default {
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

<style lang="scss">
.default-layout {
  background-color: #e5e5e5;
}

.app-main__workspace {
  display: flex;
  flex-direction: column;
}
</style>
