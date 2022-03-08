<template>
    <div :class="$style.profile">
        <h3>Профиль</h3>
        <hr :color="$style['hr-color-h2']" size="1" />

        <h4 class="font-weight-normal">Данные пользователя</h4>
        <hr :color="$style['hr-color-h3']" size="1" />

        <div :class="$style['container']">
            <div :class="$style['profile-item']">
                <b-form-group label="ФИО">
                    <b-input-group>
                        <b-form-input :value="$user.fullname" readonly />
                        <b-input-group-append>
                            <b-button variant="primary" @click="$modal().show(modals['change-fio'])">
                                <img src="~/assets/svg/profile/edit.svg" />
                            </b-button>
                        </b-input-group-append>
                    </b-input-group>
                </b-form-group>
            </div>

            <div :class="$style['profile-item']">
                <b-form-group label="Телефон">
                    <b-input-group>
                        <b-form-input :value="$user.phoneNumber" readonly />
                        <b-input-group-append>
                            <b-button variant="primary" @click="$modal().show(modals['change-phone'])">
                                <img src="~/assets/svg/profile/edit.svg" />
                            </b-button>
                        </b-input-group-append>
                    </b-input-group>
                </b-form-group>
            </div>

            <div :class="$style['profile-item']">
                <b-form-group label="Почта">
                    <b-input-group>
                        <b-form-input :value="$user.email" readonly />
                        <b-input-group-append>
                            <b-button variant="primary" @click="$modal().show(modals['change-mail'])">
                                <img src="~/assets/svg/profile/edit.svg" />
                            </b-button>
                        </b-input-group-append>
                    </b-input-group>
                </b-form-group>
            </div>

            <div :class="$style['profile-item']"></div>
            <div :class="$style['profile-item']"></div>
        </div>

        <h4 class="font-weight-normal">Данные о подписке</h4>
        <hr :color="$style['hr-color-h3']" size="1" />

        <div :class="$style['container']">
            <div :class="$style['profile-item']">
                <b-form-group label="Тип тарифа">
                    <b-input-group>
                        <b-form-input :value="$company.tariffInfo.tariffName" readonly />
                        <b-input-group-append>
                            <b-button variant="primary">
                                <img src="~/assets/svg/profile/info_outline.svg" />
                            </b-button>
                        </b-input-group-append>
                    </b-input-group>
                </b-form-group>
            </div>

            <div :class="$style['profile-item']">
                <b-form-group label="Дата окончания подписки">
                    <b-input-group>
                        <b-form-input :value="$company.tariffInfo.dateEnd | date" readonly />
                        <b-input-group-append>
                            <b-button variant="primary" @click="$modal().show(modals['renewal-subscribe-modal'])">
                                <img src="~/assets/svg/profile/refresh.svg" />
                            </b-button>
                        </b-input-group-append>
                    </b-input-group>
                </b-form-group>
            </div>

            <div :class="$style['profile-item']">
                <b-form-group label="Количество пользователей">
                    <b-input-group>
                        <b-form-input :value="$company.tariffInfo.totalUsers" readonly />
                        <b-input-group-append>
                            <b-button variant="primary" @click="$modal().show(modals['extension-of-sub'])">
                                <img src="~/assets/svg/profile/circled-plus.svg" />
                            </b-button>
                        </b-input-group-append>
                    </b-input-group>
                </b-form-group>
            </div>

            <div :class="[$style['profile-item'], $style['btn']]">
                <b-form-group>
                    <b-button variant="outline-primary" block @click="$modal().show(modals['change-password'])">
                        Изменить пароль
                    </b-button>
                </b-form-group>
            </div>

            <div :class="$style['profile-item']"></div>
            <div :class="$style['profile-item']"></div>
        </div>
    </div>
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator';
import RenewalSubscribeModal from '~/components/profile/modals/RenewalSubscribe.vue';
import ExtensionOfSub from '~/components/profile/modals/ExtensionOfSubscribtion.vue';
import ChangePassword from '~/components/profile/modals/ChangePassword.vue';
import UpdateLFM from '~/components/profile/modals/UpdateLFM.vue';
import UpdatePhone from '~/components/profile/modals/UpdatePhone.vue';
import ChangeMail from '~/components/profile/modals/ChangeMail.vue';

@Component
export default class Profile extends Vue {
    modals = {
        'renewal-subscribe-modal': RenewalSubscribeModal,
        'extension-of-sub': ExtensionOfSub,
        'change-password': ChangePassword,
        'change-fio': UpdateLFM,
        'change-phone': UpdatePhone,
        'change-mail': ChangeMail,
    };

    @Watch('$route')
    onRouter() {
        if (this.$route.query.payment) this.openRenewalSubscribe();
    }

    mounted() {
        if (this.$route.query.payment) this.openRenewalSubscribe();
    }

    openRenewalSubscribe() {
        this.$modal().show(this.modals['renewal-subscribe-modal']);
    }
}
</script>

<style module lang="scss">
@import '~/assets/scss/var.scss';
@import '~/assets/scss/module/profile.scss';

.profile-item input[readonly] {
    background-color: #fff;
}
</style>
