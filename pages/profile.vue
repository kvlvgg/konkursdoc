<template>
  <div :class="$style['profile']">
    <b-tabs pills :content-class="$style['content']">
      <b-tab active :title-link-class="$style['title-link-class']">
        <template #title>Профиль Физ. лицо</template>
        <IndividualProfile />
      </b-tab>

      <b-tab :title-link-class="$style['title-link-class']">
        <template #title>Профиль ИП</template>
        <IPProfile />
      </b-tab>

      <b-tab :title-link-class="$style['title-link-class']">
        <template #title> Профиль организация</template>
        <CompanyProfile />
      </b-tab>
    </b-tabs>
  </div>
</template>

<script>
import IndividualProfile from '~/components/profile/Individual.vue';
import IPProfile from '~/components/profile/IP.vue';
import CompanyProfile from '~/components/profile/Company.vue';

export default {
  layout: 'default',
  scrollToTop: true,

  components: {
    IndividualProfile,
    IPProfile,
    CompanyProfile,
  },
};
</script>

<style module lang="scss">
@import '~/assets/scss/var.scss';

.profile {
  display: block;
  padding: 0 10px;
  color: $secondary-dark;
}

.content {
  padding: 1rem 1rem 0 1rem;
  margin-top: 1rem;
  background: #f8f8f8;
  border: 1px solid #dfd9ee;
  border-radius: 4px;
}

.title-link-class {
  margin-right: 1rem;
}
</style>
