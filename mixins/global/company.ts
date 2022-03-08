import Vue from 'vue';
import { Store } from 'vuex';
import Company from '@/classes/Company';

Vue.mixin({
    computed: {
        $company(): Company {
            return (this.$store as Store<any>).getters['user/company'];
        },
    },
});
