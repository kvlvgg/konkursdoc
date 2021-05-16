<template>
  <div :class="$style['dashboard']">
    <div :class="$style['search']">
      <b-input placeholder="Поиск по проектам"></b-input>
    </div>
    <div :class="$style['projects']">
      <ProjectItem
        v-for="project in projects"
        :key="project.id"
        :class="$style['project-item']"
        :project="project"
        :selectedProject.sync="selectedProject"
      />
    </div>
  </div>
</template>

<script>
import ProjectItem from '~/components/workspace/dashboard/ProjectItem.vue';

export default {
  components: {
    ProjectItem,
  },
  data() {
    return {
      selectedProject: null,
      projects: [],
    };
  },
  created() {
    this.loadProjects().then(() => this.autoSelectProject());
  },
  methods: {
    /**
     * Загружаем проекты пользователя
     * @params void
     * @returns void
     */
    async loadProjects() {
      await this.$axios({
        method: 'get',
        url: '/projects',
        baseURL: process.env['app-path'],
      }).then(res => {
        this.projects = res.data.projects;
      });
    },
    /**
     * Если произошел переход по кнопке "К проекту" обратно на dashboard,
     * то делаем выделенным проект, от которого вернулись
     * @params void
     * @returns void
     */
    autoSelectProject() {
      if (!this.$route.params.projectId) return;
      const selectedProject = this.projects.find(
        x => x.name.substr(1) === this.$route.params.projectId
      );
      if (selectedProject) this.selectedProject = selectedProject;
    },
  },
};
</script>

<style module lang="scss">
@import '~/assets/scss/var.scss';
@import '~/assets/scss/module/scrollMarginLeft.scss';

.dashboard {
  padding-bottom: 20px;
  background-color: #f8f8f8;
  border-radius: 4px;
  height: calc(100vh - 100px);

  @include media-breakpoint-down(xl) {
    height: calc(100vh - 80px);
  }

  @include media-breakpoint-down(lg) {
    height: calc(100vh - 60px);
  }
}

.search {
  padding: 13px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #dfd9ee;

  @include media-breakpoint-down(xl) {
    padding: 12px;
  }

  @include media-breakpoint-down(lg) {
    padding: 13px;
  }
}

.projects {
  margin: 20px;
  overflow-y: auto;
  height: calc(100vh - 200px);

  @include scroll-margin-left;

  @include media-breakpoint-down(xl) {
    height: calc(100vh - 170px);
  }

  @include media-breakpoint-down(lg) {
    height: calc(100vh - 140px);
  }

  .project-item {
    margin: 10px 0;
  }

  .project-item:first-child {
    margin-top: 0;
  }
  .project-item:last-child {
    margin-bottom: 0;
  }
}
</style>
