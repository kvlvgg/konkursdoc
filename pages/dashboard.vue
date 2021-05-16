<template>
  <div :class="$style['dashboard']">
    <div :class="$style['projects']">
      <DashBoard />
    </div>

    <div :class="$style['project-preview']">
      <ProjectPreview />
    </div>
  </div>
</template>

<script>
import DashBoard from '~/components/workspace/dashboard/DashBoard.vue';
import ProjectPreview from '~/components/workspace/dashboard/ProjectPreview.vue';

export default {
  layout: 'default',
  scrollToTop: true,

  components: {
    DashBoard,
    ProjectPreview,
  },
};
</script>

<style module lang="scss">
@import '~/assets/scss/var.scss';

.dashboard {
  display: flex;
}

.projects {
  flex: 0 1 50%;
  padding: 0 10px 0 20px;
}

.project-preview {
  flex: 1 0 50%;
  padding: 0 20px 0 10px;
}
</style>
