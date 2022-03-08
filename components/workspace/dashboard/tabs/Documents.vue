<template>
    <div>
        <div :class="$style['caption']">
            <span>Название проекта</span>
            <span>#3320000003</span>
        </div>
        <b-table
            :class="$style['cranch-header-box-shadow-white']"
            :table-class="$style['table-class']"
            table-variant="custom"
            sticky-header="calc(100vh - 238px)"
            :fields="specificationFields"
            :items="specificationItems"
        >
            <template #cell(Документ)="data">
                <span :class="$style['document']">
                    <span :class="$style['icon-docx']" />
                    <!-- <img v-else src="~assets/svg/dashboard/warning.svg" alt="warning" /> -->
                    <span>{{ data.value }}</span>
                </span>
            </template>

            <template #cell(Исполнитель)="data">
                <div :class="$style['assignee']">{{ data.value }}</div>
            </template>

            <template #cell(Действия)>
                <div :class="$style['actions']">
                    <span :class="$style['icon-printer']" />
                    <span :class="$style['icon-pencil']" />
                    <span :class="$style['icon-download']" />
                    <span :class="$style['icon-trash']" />
                </div>
            </template>
        </b-table>
    </div>
</template>

<script>
export default {
    data() {
        return {
            specificationFields: [
                { key: 'Документ' },
                { key: 'Исполнитель' },
                { key: 'Создан' },
                { key: 'Изменён' },
                { key: 'Действия' },
            ],
            specificationItems: [],
        };
    },

    created() {
        this.specificationItems = [...Array(4).keys()].map(x => ({
            Документ: `Документ_00${x + 1}.${x !== 3 ? 'docx' : 'pdf'}`,
            Warning: x === 1,
            Исполнитель: 'Александр, Владимир и ещё 3',
            Создан: '26.10.2020',
            Изменён: '26.10.2020',
        }));
    },
};
</script>

<style module lang="scss">
@import '~/assets/scss/var.scss';
@import '~/assets/scss/module/icons/docx.scss';
@import '~/assets/scss/module/icons/printer.scss';
@import '~/assets/scss/module/icons/pencil.scss';
@import '~/assets/scss/module/icons/download.scss';
@import '~/assets/scss/module/icons/trash.scss';

.caption {
    border-bottom: 1px solid $secondary-lighter;
    color: $secondary-dark;
    padding: 10px 0px;
    font-size: 14px;
    span:first-child {
        font-size: 20px;
        margin-right: 8px;
    }
}

.table-class {
    tbody tr {
        box-shadow: $box-shadow-sm;
    }

    tbody tr td {
        color: $secondary-dark;
        font-weight: bold !important;
        font-size: 12px;
        padding: 0.5rem;
        border-image: none !important;
        border-color: #ffffff !important;

        &:not(:first-child) {
            border-left: none !important;
        }

        &:nth-last-child(2) {
            border-right: none !important;
        }
    }
}

.document {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    font-size: 14px;

    .icon-docx {
        @include icon-docx($secondary-dark);
        margin: 0 4px;
    }
}

.assignee {
    text-align: left;
}

.actions {
    display: flex;
    align-items: center;
    justify-content: center;

    span {
        margin: 0 4px;
    }

    .icon-printer {
        @include icon-printer($secondary-dark);
    }

    .icon-pencil {
        @include icon-pencil($secondary-dark);
    }

    .icon-download {
        @include icon-download($secondary-dark);
    }

    .icon-trash {
        @include icon-trash($secondary-dark);
    }
}

.cranch-header-box-shadow-white th {
    box-shadow: 0 -18px #ffffff !important;
}
</style>
