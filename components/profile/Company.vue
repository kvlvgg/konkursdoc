<template>
    <div :class="[$style.profile, $style.company]">
        <h3>Компания</h3>
        <hr :color="$style['hr-color-h2']" size="1" />

        <h4 class="font-weight-normal">Данные компании</h4>
        <hr :color="$style['hr-color-h3']" size="1" />

        <div v-if="typeValue === 'Юридическое лицо'" :class="$style.container">
            <div :class="$style['profile-item']">
                <b-form-group v-if="$company.isNaturalPerson && $user.isOwner" label="Тип организации">
                    <v-select-input v-model="company.type" :options="typeOptions" />
                </b-form-group>

                <b-form-group v-else label="Тип организации">
                    <b-input :value="typeValue" readonly />
                </b-form-group>
            </div>

            <div :class="$style['profile-item']">
                <b-form-group label="Краткое наименование организации">
                    <b-input v-model="company.shortName" :readonly="!$company.isNaturalPerson || !$user.isOwner" />
                </b-form-group>
            </div>

            <div :class="$style['profile-item']">
                <b-form-group label="Полное наименование организации">
                    <b-input v-model="company.fullName" :readonly="!$company.isNaturalPerson || !$user.isOwner" />
                </b-form-group>
            </div>

            <div :class="$style['profile-item']">
                <b-form-group label="Адрес организации">
                    <b-input v-model="company.address" :readonly="!$user.isOwner" />
                </b-form-group>
            </div>

            <div :class="$style['profile-item']">
                <b-form-group label="Дата регистрации">
                    <b-input :value="company.registrationDate | date" readonly />
                </b-form-group>
            </div>

            <div :class="$style['profile-item']">
                <b-form-group label="ИНН">
                    <b-input v-model="company.INN" :readonly="!$company.isNaturalPerson || !$user.isOwner" />
                </b-form-group>
            </div>

            <div :class="$style['profile-item']">
                <b-form-group label="КПП">
                    <b-input v-model="company.KPP" :readonly="!$company.isNaturalPerson || !$user.isOwner" />
                </b-form-group>
            </div>

            <div :class="$style['profile-item']">
                <b-form-group label="ОГРН">
                    <b-input v-model="company.OGRN" :readonly="!$company.isNaturalPerson || !$user.isOwner" />
                </b-form-group>
            </div>

            <div :class="$style['profile-item']">
                <b-form-group label="Расчётный счёт">
                    <b-input v-model="company.checkingAccount" :readonly="!$user.isOwner" />
                </b-form-group>
            </div>

            <div :class="$style['profile-item']">
                <b-form-group label="Наименование банка">
                    <b-input v-model="company.bankName" :readonly="!$user.isOwner" />
                </b-form-group>
            </div>

            <div :class="$style['profile-item']">
                <b-form-group label="Адрес банка">
                    <b-input v-model="company.bankAddress" :readonly="!$user.isOwner" />
                </b-form-group>
            </div>

            <div :class="$style['profile-item']">
                <b-form-group label="Корреспондентский счёт">
                    <b-input v-model="company.correspondentAccount" :readonly="!$user.isOwner" />
                </b-form-group>
            </div>

            <div :class="$style['profile-item']">
                <b-form-group label="БИК">
                    <b-input v-model="company.BIC" :readonly="!$user.isOwner" />
                </b-form-group>
            </div>

            <div :class="$style['profile-item']" />
            <div :class="$style['profile-item']" />
        </div>

        <div v-if="typeValue === 'Индивидуальный предприниматель'" :class="$style.container">
            <div :class="$style['profile-item']">
                <b-form-group v-if="$company.isNaturalPerson && $user.isOwner" label="Тип организации">
                    <v-select-input v-model="company.type" :options="typeOptions" />
                </b-form-group>

                <b-form-group v-else label="Тип организации">
                    <b-input :value="typeValue" readonly />
                </b-form-group>
            </div>

            <div :class="$style['profile-item']">
                <b-form-group label="Наименование ИП">
                    <b-input v-model="company.shortName" :readonly="!$company.isNaturalPerson || !$user.isOwner" />
                </b-form-group>
            </div>

            <div :class="$style['profile-item']">
                <b-form-group label="Адрес ИП">
                    <b-input v-model="company.address" :readonly="!$user.isOwner" />
                </b-form-group>
            </div>

            <div :class="$style['profile-item']">
                <b-form-group label="Дата регистрации">
                    <b-input :value="company.registrationDate | date" readonly />
                </b-form-group>
            </div>

            <div :class="$style['profile-item']">
                <b-form-group label="ИНН">
                    <b-input v-model="company.INN" :readonly="!$company.isNaturalPerson || !$user.isOwner" />
                </b-form-group>
            </div>

            <div :class="$style['profile-item']">
                <b-form-group label="ОГРНИП">
                    <b-input v-model="company.OGRN" :readonly="!$company.isNaturalPerson || !$user.isOwner" />
                </b-form-group>
            </div>

            <div :class="$style['profile-item']">
                <b-form-group label="Расчётный счёт">
                    <b-input v-model="company.checkingAccount" :readonly="!$user.isOwner" />
                </b-form-group>
            </div>

            <div :class="$style['profile-item']">
                <b-form-group label="Наименование банка">
                    <b-input v-model="company.bankName" :readonly="!$user.isOwner" />
                </b-form-group>
            </div>

            <div :class="$style['profile-item']">
                <b-form-group label="Адрес банка">
                    <b-input v-model="company.bankAddress" :readonly="!$user.isOwner" />
                </b-form-group>
            </div>

            <div :class="$style['profile-item']">
                <b-form-group label="Корреспондентский счёт">
                    <b-input v-model="company.correspondentAccount" :readonly="!$user.isOwner" />
                </b-form-group>
            </div>

            <div :class="$style['profile-item']">
                <b-form-group label="БИК">
                    <b-input v-model="company.BIC" :readonly="!$user.isOwner" />
                </b-form-group>
            </div>

            <div :class="$style['profile-item']" />
            <div :class="$style['profile-item']" />
            <div :class="$style['profile-item']" />
        </div>

        <div v-if="typeValue === 'Физическое лицо'" :class="$style.container">
            <div :class="$style['profile-item']">
                <b-form-group v-if="$user.isOwner" label="Тип организации">
                    <v-select-input v-model="company.type" :options="typeOptions" />
                </b-form-group>

                <b-form-group v-else label="Тип организации">
                    <b-input :value="typeValue" readonly />
                </b-form-group>
            </div>

            <div :class="$style['profile-item']">
                <b-form-group label="ФИО пользователя">
                    <b-input :value="$user.fullname" readonly />
                </b-form-group>
            </div>

            <div :class="$style['profile-item']">
                <b-form-group label="Телефон">
                    <b-input :value="$user.phoneNumber" readonly />
                </b-form-group>
            </div>

            <div :class="$style['profile-item']">
                <b-form-group label="Почта">
                    <b-input :value="$user.email" readonly />
                </b-form-group>
            </div>

            <div :class="$style['profile-item']">
                <b-form-group label="Дата регистрации">
                    <b-input :value="company.registrationDate | date" readonly />
                </b-form-group>
            </div>

            <div :class="$style['profile-item']" />
        </div>

        <div :class="$style['container']">
            <b-button :class="[$style['profile-item'], $style.button]" :disabled="!isDirty" @click="save">
                Сохранить
            </b-button>
        </div>
    </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

import VSelectInput from '@/components/helpers/form/VSelectInput.vue';
import RenewalSubscribeModal from '@/components/profile/modals/RenewalSubscribe.vue';
import ExtensionOfSub from '@/components/profile/modals/ExtensionOfSubscribtion.vue';
import ChangePassword from '@/components/profile/modals/ChangePassword.vue';

import { CompanyType, CompanyDTO } from '@/classes/Company';

@Component({
    components: {
        VSelectInput,
    },
})
export default class Company extends Vue {
    readonly modals = {
        'renewal-subscribe-modal': RenewalSubscribeModal,
        'extension-of-sub': ExtensionOfSub,
        'change-password': ChangePassword,
    };

    readonly typeOptions: { value: CompanyType; label: string }[] = [
        { value: 'company', label: 'Юридическое лицо' },
        { value: 'sp', label: 'Индивидуальный предприниматель' },
        { value: 'natural_person', label: 'Физическое лицо' },
    ];

    company: CompanyDTO = {} as CompanyDTO;

    get isDirty() {
        return Object.entries(this.company).some(([k, v]) => this.$company[k as keyof CompanyDTO] !== v);
    }

    get typeValue() {
        return this.typeOptions.find(x => x.value === this.company.type)?.label;
    }

    created() {
        this.company = { ...this.$company };
    }

    async save() {
        await this.$store.dispatch('user/saveCompany', this.company);
        this.toast();
    }

    toast() {
        this.$bvToast.toast(`Данные успешно изменены`, {
            title: `Сохранение`,
            toaster: 'b-toaster-top-right',
            variant: 'success',
            appendToast: false,
            noCloseButton: false,
            autoHideDelay: 1000,
        });
    }
}
</script>

<style module lang="scss">
@import '~/assets/scss/var.scss';
@import '~/assets/scss/module/profile.scss';

.profile-item {
    width: 15.666%;
    min-width: 275px;
}

.button {
    background: #ff7a00;
    color: #fff;

    border-radius: 4px;
    margin-top: 1rem;
    margin-bottom: 2rem;
    &:disabled {
        background: #c8c8c8;
        color: initial;
    }
}
</style>
