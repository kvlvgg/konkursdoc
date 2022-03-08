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
            <template #cell(Исполнитель)="data">
                <span :class="$style['assignee']">{{ data.value }}</span>
            </template>

            <template #cell(Изменения)="data">
                <span v-if="data.item['Действия'] === 'Загрузил документ'" :class="$style['document']">
                    <span :class="$style['icon-docx']" />
                    <span>{{ data.value }}</span>
                </span>
                <a v-else-if="data.item['Действия'] === 'Добавил 3 картриджа'" :class="$style['btn-to-list']">
                    К списку
                </a>
                <span v-else-if="data.item['Действия'] === 'Добавил испонителя'" :class="$style['document']">
                    <img src="~assets/svg/dashboard/person.svg" alt="document" />
                    <span>{{ data.value }}</span>
                </span>
                <span v-else>
                    {{ data.value }}
                </span>
            </template>
        </b-table>
    </div>
</template>

<script>
export default {
    data() {
        return {
            specificationFields: [{ key: 'Исполнитель' }, { key: 'Действия' }, { key: 'Изменения' }, { key: 'Дата' }],
            specificationItems: [],
        };
    },

    created() {
        this.specificationItems = [
            {
                Исполнитель: 'Александр В.',
                Действия: 'Добавил 3 картриджа',
                Изменения: 'К списку',
                Дата: '28.11.2020 16:45',
            },
            {
                Исполнитель: 'Андрей Б.',
                Действия: 'Загрузил документ',
                Изменения: 'Документ_004.pdf',
                Дата: '24.11.2020 22:01',
            },
            {
                Исполнитель: 'Валерий М.',
                Действия: 'Добавил испонителя',
                Изменения: 'Леонид А.',
                Дата: '28.11.2020 16:45',
            },
        ];
    },
};
</script>

<style module lang="scss">
@import '~/assets/scss/var.scss';
@import '~/assets/scss/module/icons/docx.scss';

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
    td,
    th {
        text-align: left;
    }

    tbody tr {
        box-shadow: $box-shadow-sm;
        height: 38px;
    }

    tbody tr td {
        color: $secondary-dark;
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
    font-weight: bold !important;

    .icon-docx {
        @include icon-docx($secondary-dark);
        height: 14px;
        margin: 0 8px 0 0;
    }
}

.assignee {
    font-weight: bold !important;
}

.btn-to-list {
    color: $primary;
}

.cranch-header-box-shadow-white th {
    box-shadow: 0 -18px #ffffff !important;
}
</style>
