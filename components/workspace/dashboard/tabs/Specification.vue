<template>
    <div class="dashboard-specification-table">
        <b-table
            :class="$style['cranch-header-box-shadow-white']"
            table-variant="custom"
            sticky-header
            :items="specificationItems"
            selectable
            select-mode="single"
        >
            <template #cell(Поставщик)="data">
                <div :class="$style['info']">
                    <span :id="`popover-dash-spec-supplier-${data.item['№']}`">
                        <IconInfo />
                    </span>

                    &nbsp;

                    <div :class="$style['container-overflow']">{{ data.value }}</div>

                    <b-popover
                        :target="`popover-dash-spec-supplier-${data.item['№']}`"
                        placement="bottomleft"
                        triggers="hover focus"
                        :custom-class="$style['popover-currency']"
                    >
                        Обновление прайса:<br />
                        14.08.2020
                    </b-popover>
                </div>
            </template>

            <template #cell(Партномер)="data">
                <div :class="$style['info']">
                    <span @click.stop="$bvModal.show('dash-spec-compatible-devices')">
                        <IconInfo />
                    </span>

                    &nbsp;

                    <div :class="$style['container-overflow']">{{ data.value }}</div>
                </div>
            </template>

            <template #cell(Resourse)="data">
                <div :class="$style['container-overflow']">
                    {{ format3digit(data.value, 'стр.') }}
                </div>
            </template>

            <template #cell(Цена)="data">
                <div class="font-weight-normal" :class="$style['container-overflow']">
                    <b-button :id="`popover-dash-spec-price-${data.item['№']}`" variant="link">
                        <span>
                            {{ format3digit(data.value, '₽', 2) }}
                        </span>
                    </b-button>
                </div>

                <b-popover
                    :target="`popover-dash-spec-price-${data.item['№']}`"
                    placement="bottomleft"
                    triggers="hover focus"
                    :custom-class="$style['popover-currency']"
                >
                    {{ format3digit(data.value, '₽', 2) }} <br /><br />
                    {{ format3digit(data.value / 26.04, '$', 2) }} <br /><br />
                    {{ 'Курс ЦБ +2%' }} <br />
                </b-popover>
            </template>
        </b-table>

        <div :class="$style['buttons']">
            <b-button variant="primary" size="sm">Добавить позицию</b-button>
            <b-button variant="outline-primary" size="sm">Подробнее</b-button>
        </div>

        <CompatibleDevicesModal id="dash-spec-compatible-devices" />
    </div>
</template>

<script>
import CompatibleDevicesModal from '~/components/workspace/project/modals/CompatibleDevicesModal.vue';
import IconInfo from '~/components/icons/IconInfo.vue';
import format3digit from '~/mixins/js-mixins/format3digit';

export default {
    components: {
        CompatibleDevicesModal,
        IconInfo,
    },

    mixins: [format3digit],

    data() {
        return {
            specificationItems: [],
        };
    },

    created() {
        this.specificationItems = [...Array(10).keys()].map(x => ({
            '№': x + 1,
            Тип: 'Картридж',
            Производитель: x % 2 === 0 ? 'Hewlett-Packard' : 'Brother',
            Поставщик: 'Ресурс Медиа',
            Партномер: 'Q2612A',
            Цвет: x % 2 === 0 ? 'Черный' : 'Цветной',
            Цена: `${x + 1}500`,
            Кол: x,
        }));
    },
};
</script>

<style module lang="scss">
@import '~/assets/scss/var.scss';

.info {
    display: flex;
    justify-content: center;
    align-items: center;
    line-height: 15px;
}

.buttons {
    display: flex;
    padding: 0.5rem;
    justify-content: center;
    align-items: center;

    button {
        width: 12rem;
    }

    button:not(:last-child) {
        margin-right: 0.5rem;
    }
}

.popover-currency {
    color: $secondary-dark;
}

.container-overflow {
    white-space: nowrap;
    /* overflow-x: auto; */
    text-overflow: ellipsis;
}

.cranch-header-box-shadow-white th {
    box-shadow: 0 -18px #f8f8f8 !important;
}
</style>

<style lang="scss">
@import '~/assets/scss/var.scss';

.dashboard-specification-table {
    .b-table-sticky-header {
        max-height: calc(100vh - 250px) !important;

        @media (max-width: 1399.98px) {
            max-height: calc(100vh - 220px) !important;
        }

        @media (max-width: 1199.98px) {
            max-height: calc(100vh - 200px) !important;
        }
    }

    td,
    th {
        font-size: 85%;

        .btn.btn-link {
            padding: 1px 6px;
        }
    }
}
</style>
