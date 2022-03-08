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
                :selectedProjectId="selectedProjectId"
                @project-selected="changePathQuery"
            />
        </div>
    </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import ProjectItem from '@/components/workspace/dashboard/ProjectItem.vue';

import Project from '@/classes/Project';

@Component({
    components: {
        ProjectItem,
    },
})
export default class DashBoard extends Vue {
    selectedProjectId: number | null = null;

    get projects(): Project[] {
        return this.$store.getters['dashboard/projects'];
    }

    created() {
        this.$store.dispatch('dashboard/load');
        this.loadProjects().then(() => this.autoSelectProject());
    }

    async loadProjects() {
        await this.$store.dispatch('dashboard/load');
        this.autoSelectProject();
    }

    changePathQuery(projectId: number) {
        this.selectedProjectId = projectId;
        this.$router.push({ query: { projectId: projectId.toString() } });
    }

    autoSelectProject() {
        if (typeof this.$route.query.projectId !== 'string') return;
        this.selectedProjectId = parseInt(this.$route.query.projectId ?? '');
    }
}
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
