import Vue from 'vue';
import { Store } from 'vuex';
import User from '@/classes/User';

Vue.mixin({
    computed: {
        $user(): User {
            return (this.$store as Store<any>).getters['user/user'];
        },
    },
});
