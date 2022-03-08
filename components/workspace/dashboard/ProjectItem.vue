<template>
    <div :class="[$style['project'], selectedClasses]" @click="$emit('project-selected', project.id)">
        <div :class="[$style['caption'], selectedClasses]">
            <span>Название проекта </span>
            <span>{{ project.title }}</span>

            <b-button
                :to="
                    localePath({
                        name: 'project-id',
                        params: { id: project.id.toString() },
                    })
                "
                variant="primary"
                size="sm"
                :class="$style['edit-button']"
            >
                <IconEdit />
            </b-button>
        </div>

        <div :class="$style['body']">
            <div :class="[$style['info'], selectedClasses]">
                <div><span>Картриджей:</span> {{ project.productsCount }}</div>
                <div><span>Исполнитель:</span> {{ project.assigneesShort }}</div>
                <div><span>Документы:</span> {{ project.documentsCount }}</div>
                <div><span>Дата создания:</span> {{ project.createDate | date }}</div>
                <div><span>Дата изменения:</span>{{ project.editDate | date }}</div>
                <div><span>Статус:</span>{{ project.displayStatus }}</div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import IconEdit from '@/components/icons/dashboard/IconEdit.vue';

import Project from '@/classes/Project';

@Component({
    components: {
        IconEdit,
    },
})
export default class ProjectItem extends Vue {
    @Prop({ type: Project, default: null }) project!: Project;
    @Prop({ type: Number, default: null }) selectedProjectId!: number;

    get selectedClasses() {
        return {
            [this.$style.selected]: this.selectedProjectId === this.project.id,
        };
    }
}
</script>

<style module lang="scss">
@import '~/assets/scss/var.scss';

.project {
    background-color: #eeeeee;
    border: 1px solid #dfd9ee;
    border-radius: 4px;
    cursor: pointer;
    @include hover() {
        background-color: $secondary-lightest;
    }

    &.selected {
        cursor: initial;
        background-color: $secondary-dark;
    }
}

.caption {
    color: $secondary-dark;
    padding: 6px 26px;
    font-size: 16px;

    span:first-child {
        font-size: 20px;
        margin-right: 8px;

        @include media-breakpoint-down(xl) {
            font-size: 18px;
        }

        @include media-breakpoint-down(lg) {
            font-size: 16px;
        }
    }

    .edit-button {
        opacity: 0;
        float: right;
        line-height: 1;
    }

    &.selected {
        color: #ffffff;

        .edit-button {
            opacity: 1;
        }
    }

    @include media-breakpoint-down(xl) {
        font-size: 14px;
        padding: 4px 16px;
    }

    @include media-breakpoint-down(lg) {
        font-size: 10px;
        padding: 2px 16px;
    }
}

.body {
    position: relative;
}

.info {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-items: center;
    padding: 0 0 0 20px;
    font-family: 'TTNorms-Regular', sans-serif !important;
    font-size: 14px;
    color: #797979;

    @include media-breakpoint-down(xl) {
        padding: 4px 14px;
    }

    @include media-breakpoint-down(lg) {
        padding: 2px 14px;
    }

    div {
        padding: 6px;
        min-width: 200px;
        width: 33%;
        font-weight: bold;

        @include media-breakpoint-down(xl) {
            padding: 4px;
        }

        @include media-breakpoint-down(lg) {
            padding: 3px;
        }
    }

    span {
        margin-right: 8px;
        font-weight: lighter;
    }

    &.selected {
        color: #ffffff;
    }
}

.actions-container {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;

    .actions {
        margin: auto;
        width: 16rem;
        display: flex;

        :not(:last-child) {
            margin: 0 0.5rem 0 0;
        }

        .archive {
            width: 3rem;
        }
    }
}
</style>
