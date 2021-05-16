<template>
  <div>
    <h3>Профиль</h3>
    <hr :color="$style['hr-color-h2']" size="1" />

    <h4 class="font-weight-normal">Данные пользователя</h4>
    <hr :color="$style['hr-color-h3']" size="1" />

    <div :class="$style['container']">
      <div :class="$style['profile-item']">
        <b-form-group label="Тип пользователя">
          <v-select-input v-model="type.value" :options="type.options" />
        </b-form-group>
      </div>

      <div :class="$style['profile-item']">
        <b-form-group label="ФИО">
          <b-input v-model="name" />
        </b-form-group>
      </div>

      <div :class="$style['profile-item']">
        <b-form-group label="Адрес">
          <b-input v-model="address" />
        </b-form-group>
      </div>

      <div :class="$style['profile-item']">
        <b-form-group label="Телефон">
          <b-input-group>
            <b-form-input v-model="phoneNumber" readonly></b-form-input>
            <b-input-group-append>
              <b-button variant="primary">
                <img src="~/assets/svg/profile/edit.svg" />
              </b-button>
            </b-input-group-append>
          </b-input-group>
        </b-form-group>
      </div>

      <div :class="$style['profile-item']">
        <b-form-group label="Почта">
          <b-input-group>
            <b-form-input v-model="mail" readonly></b-form-input>
            <b-input-group-append>
              <b-button variant="primary">
                <img src="~/assets/svg/profile/edit.svg" />
              </b-button>
            </b-input-group-append>
          </b-input-group>
        </b-form-group>
      </div>
    </div>

    <h3 class="font-weight-normal">Данные ИП</h3>
    <hr :color="$style['hr-color-h3']" size="1" />

    <div :class="$style['container']">
      <div :class="$style['profile-item']">
        <b-form-group label="Краткое наименование организации">
          <b-input v-model="company.shortName" />
        </b-form-group>
      </div>

      <div :class="$style['profile-item']">
        <b-form-group label="Полное наименование организации">
          <b-input v-model="company.fullName" />
        </b-form-group>
      </div>

      <div :class="$style['profile-item']">
        <b-form-group label="Адрес организации">
          <b-input v-model="company.address" />
        </b-form-group>
      </div>

      <div :class="$style['profile-item']">
        <b-form-group label="Дата регистрации">
          <b-input v-model="company.registrationDate" />
        </b-form-group>
      </div>

      <div :class="$style['profile-item']">
        <b-form-group label="ФИО Руководителя">
          <b-input v-model="company.CEOName" />
        </b-form-group>
      </div>
    </div>

    <div :class="$style['container']">
      <div :class="$style['profile-item']">
        <b-form-group label="ИНН">
          <b-input v-model="company.INN" />
        </b-form-group>
      </div>

      <div :class="$style['profile-item']">
        <b-form-group label="КПП">
          <b-input v-model="company.KPP" />
        </b-form-group>
      </div>

      <div :class="$style['profile-item']">
        <b-form-group label="ОГРН">
          <b-input v-model="company.OGRN" />
        </b-form-group>
      </div>

      <div :class="$style['profile-item']">
        <b-form-group label="Расчётный счёт">
          <b-input v-model="company.checkingAccount" />
        </b-form-group>
      </div>

      <div :class="$style['profile-item']">
        <b-form-group label="Наименование банка">
          <b-input v-model="company.bankName" />
        </b-form-group>
      </div>
    </div>

    <div :class="$style['container']">
      <div :class="$style['profile-item']">
        <b-form-group label="Адрес банка">
          <b-input v-model="company.bankAddress" />
        </b-form-group>
      </div>

      <div :class="$style['profile-item']">
        <b-form-group label="Корреспондентский счёт">
          <b-input v-model="company.correspondentAccount" />
        </b-form-group>
      </div>

      <div :class="$style['profile-item']">
        <b-form-group label="БИК">
          <b-input v-model="company.BIK" />
        </b-form-group>
      </div>

      <div :class="$style['profile-item']"></div>
      <div :class="$style['profile-item']"></div>
    </div>

    <h3 class="font-weight-normal">Данные о подписке</h3>
    <hr :color="$style['hr-color-h3']" size="1" />

    <div :class="$style['container']">
      <div :class="$style['profile-item']">
        <b-form-group label="Количество пользователей">
          <b-input-group>
            <b-form-input v-model="userAmount" readonly></b-form-input>
            <b-input-group-append>
              <b-button variant="primary">
                <img src="~/assets/svg/profile/circled-plus.svg" />
              </b-button>
            </b-input-group-append>
          </b-input-group>
        </b-form-group>
      </div>

      <div :class="$style['profile-item']">
        <b-form-group label="Дата окончания подписки">
          <b-input-group>
            <b-form-input v-model="expireDate" readonly></b-form-input>
            <b-input-group-append>
              <b-button variant="primary">
                <img src="~/assets/svg/profile/refresh.svg" />
              </b-button>
            </b-input-group-append>
          </b-input-group>
        </b-form-group>
      </div>

      <div :class="[$style['profile-item'], $style['btn']]">
        <b-form-group>
          <b-button variant="outline-primary" block>Изменить пароль</b-button>
        </b-form-group>
      </div>

      <div :class="$style['profile-item']"></div>
      <div :class="$style['profile-item']"></div>
    </div>
  </div>
</template>

<script>
import VSelectInput from '~/components/helpers/form/VSelectInput.vue';

export default {
  layout: 'default',
  scrollToTop: true,

  components: {
    VSelectInput,
  },

  data() {
    return {
      type: {
        value: 1,
        options: [
          { value: 1, label: 'Физическое лицо' },
          { value: 2, label: 'ООО' },
          { value: 3, label: 'ИП' },
        ],
      },
      name: 'Сидоров Александр Валерьевич',
      address: 'г. Ставрополь, ул. Коста Хетагурова',
      phoneNumber: '+7 (999) 987 65 43',
      mail: 'testmail@gmail.com',
      company: {
        shortName: 'KonkursLab',
        fullName: 'Лаборатория Конкурсов',
        address: 'г. Ставрополь, ул. Коста Хетагурова',
        registrationDate: '14.02.2005',
        CEOName: 'Сидоров Александр Валерьевич',
        INN: '00010000100001',
        KPP: '0000000099',
        OGRN: '0880004008',
        checkingAccount: '0000000099',
        bankName: '0000000099',
        bankAddress: '0000000099',
        correspondentAccount: '00000000000000',
        BIK: '00000000000000',
      },
      userAmount: '3',
      expireDate: '23.02.2021',
    };
  },
};
</script>

<style module lang="scss">
@import '~/assets/scss/var.scss';
@import '~/assets/scss/module/profile.scss';
</style>
