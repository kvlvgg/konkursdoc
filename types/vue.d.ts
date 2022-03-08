import Vue from 'vue';
import Vuex from 'vuex';
import Modal from './modal';
import Axios from '@nuxtjs/axios';
import VueRouter from 'vue-router';
import NuxtI18n from '@nuxtjs/i18n';
import User from '@/classes/User';
import Company from '~/classes/Company';
import BvToast from 'bootstrap-vue';

declare module 'vue/types/vue' {
    interface Vue {
        // $i18n: typeof i18n;
        // $r(key: string, map?: { [key: string]: string }): string;
        // $api: typeof api;
        // $apiv2: typeof newapi;
        // $user: typeof user;
        // $alert: typeof alert;
        // $confirm: typeof confirm;
        // $toast: typeof toast;
        // $switchPageLoader: typeof switchPageLoader;
        // $detail: typeof detail;
        // $debug: boolean;
        // $isIE: boolean;
        // $bus: Bus;
        $style: { [key: string]: string };
        $modal: () => Modal.Modal;
        $auth: { loggedIn: () => boolean };
        $user: User;
        $company: Company;
    }
}

declare module 'vuex/types/index' {
    interface Store<S> {
        $router: VueRouter;
    }
}
