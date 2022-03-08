<template>
    <div :class="$style.profile">
        <div :class="$style['header-pane']">
            <h3>Список пользователей</h3>
            <b-button variant="outline-primary" :disabled="!$user.isOwner" @click="inviteUser">
                + Добавить пользователя
            </b-button>
        </div>

        <hr :color="$style['hr-color-h2']" size="1" />

        <LoadableArea :isLoading="isLoading" isLoaderForTable>
            <b-table
                :class="[$style.table, $style['cranch-header-box-shadow-white']]"
                table-variant="custom"
                sticky-header
                hover
                :fields="fields"
                :items="$company.members"
                selectable
                select-mode="single"
                show-empty
                no-local-sorting
            >
                <template #cell(shortName)="{ item }">
                    {{ item.fullname | shortName }}
                </template>

                <template #cell(registrationDate)="{ item }">
                    {{ item.registrationDate | date }}
                </template>

                <template #cell(phoneNumber)="{ item }">
                    {{ item.phoneNumber | phone }}
                </template>

                <template #cell(action)="{ item }">
                    <b-button
                        :class="$style['button-delete']"
                        size="sm"
                        block
                        :disabled="!$user.isOwner"
                        @click="deleteUser(item.memberId)"
                    >
                        <IconDelete />
                    </b-button>
                </template>

                <template #empty>
                    <div class="font-weight-bold" :class="$style['table__empty']">
                        <span v-if="$company.members.length === 0"> Пользователей не найдено </span>
                    </div>
                </template>
            </b-table>
        </LoadableArea>
    </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

import LoadableArea from '~/components/helpers/others/LoadableArea.vue';
import IconDelete from '~/components/icons/dashboard/IconDelete.vue';
import InviteUser from '~/components/profile/modals/InviteUser.vue';

@Component({
    components: {
        LoadableArea,
        IconDelete,
    },
})
export default class Users extends Vue {
    isLoading = false;
    fields = [
        { key: 'shortName', label: 'Имя', sortable: false },
        { key: 'email', label: 'Почта', sortable: false },
        { key: 'phoneNumber', label: 'Телефон', sortable: false },
        { key: 'registrationDate', label: 'Дата регистрации', sortable: false },
        { key: 'action', label: 'Действия', sortable: false },
    ];

    modals = {
        'invite-user': InviteUser,
    };

    async inviteUser() {
        // TODO Переделать на декоратор после переделки на TS
        if (this.$company.tariffInfo.isRestricted) {
            this.$router.push(this.localePath({ name: 'profile', query: { tab: 'profile', payment: 'true' } }));
            return;
        }
        const result = await this.$modal().show<boolean>(this.modals['invite-user']);
        if (!result) return;

        this.isLoading = true;
        this.$store.dispatch('user/loadCompanyInfo');
        this.isLoading = false;
    }

    async deleteUser(id: number) {
        const result = await this.$modal().confirm({
            title: 'Удаление',
            message: 'Вы действительно хотите удалить пользователя?',
            okString: 'Удалить',
        });

        if (!result) return;

        this.isLoading = true;

        await this.$axios.$delete(`/companies/company/members/?id=${id}`);
        await this.$store.dispatch('user/loadCompanyInfo');

        this.isLoading = false;
    }
}
</script>

<style module lang="scss">
@import '~/assets/scss/var.scss';
@import '~/assets/scss/module/profile.scss';
.header-pane {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
}

.button-delete {
    font-size: 120%;
    padding: 0 0 0.25rem 0;
    width: 32px;
    margin: auto;
    border-color: #ff7a00;
    border-radius: 0.2rem;

    &:hover {
        background-color: #ff7a00;
    }

    svg {
        fill: $primary;
    }

    &:hover svg {
        fill: $white;
    }
}

.table {
    td {
        padding-left: 1rem;
        text-align: left;
    }
}

.table__empty {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100px;
    font-size: 120%;
    color: #a6a6a6;
}

:global(.b-table-sticky-header) {
    max-height: calc(100vh - 230px);
}

:global(.tab-content) {
    height: calc(100vh - 130px);
}

.cranch-header-box-shadow-white th {
    box-shadow: 0 -18px #f8f8f8 !important;
}
</style>
