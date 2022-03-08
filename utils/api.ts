import { AxiosRequestConfig } from 'axios';
import { NuxtAxiosInstance } from '@nuxtjs/axios';
import { NuxtI18nInstance } from '@nuxtjs/i18n';

import Exception from '@/utils/Exception';

import { ApiPath } from '@/types/api-path';

export class api {
    private axiosMissingEx = 'Axios instance is not set in api';
    private i18nMissingEx = 'i18n instance is not set in api';
    private static axios: NuxtAxiosInstance | null = null;
    private static i18n: NuxtI18nInstance | null = null;

    public static SetAxiosInstance(axiosInstance: NuxtAxiosInstance) {
        this.axios = axiosInstance;
    }

    public static SetI18nInstance(i18nInstance: NuxtI18nInstance) {
        this.i18n = i18nInstance;
    }

    public async $get<
        URL extends keyof ApiPath['GET'],
        Response extends ApiPath['GET'][URL]['response'],
        Data extends Response extends { data: unknown } ? Response['data'] : never
    >(
        url: URL | [URL, Record<string, string>],
        config?: AxiosRequestConfig
    ): Promise<{ success: true; error: null; data: Data } | { success: false; error: Exception; data: null }> {
        if (!api.axios) throw new Error(this.axiosMissingEx);
        if (!api.i18n) throw new Error(this.i18nMissingEx);

        if (url instanceof Array) {
            const [_url, _params] = url;
            url = Object.entries(_params).reduce((acc, [k, v]) => acc.replace(new RegExp(`{${k}}`), v) as URL, _url);
        }

        const result = await api.axios
            .$get<Response>(url, config)
            .then(x => x)
            .catch(
                err =>
                    err?.response?.data ?? {
                        success: false,
                        message: 'An error has occurred. Please try again later',
                    }
            );

        let success = false;
        if ('success' in result) success = result.success === true;
        if ('status' in result) success = result.status === 'success';

        let error: Exception | null = null;
        if (!success && 'message' in result) error = new Exception(result.message);

        let data: Data | null = null;
        if ('data' in result) data = result['data'] as Data;

        if (!('data' in result) && !('message' in result)) {
            success = true;
            data = result;
        }

        return success
            ? { success: true, error: null, data: data as Data }
            : { success: false, error: error as Exception, data: null };
    }

    public async $post<
        URL extends keyof ApiPath['POST'],
        Response extends ApiPath['POST'][URL]['response'],
        Body extends ApiPath['POST'][URL]['body'],
        Data extends Response extends { data: unknown } ? Response['data'] : never
    >(
        url: URL,
        body?: Body,
        config?: AxiosRequestConfig
    ): Promise<{ success: true; error: null; data: Data } | { success: false; error: Exception; data: null }> {
        if (!api.axios) throw new Error(this.axiosMissingEx);
        if (!api.i18n) throw new Error(this.i18nMissingEx);

        const result = await api.axios
            .$post<Response>(url, body, config)
            .then(x => x)
            .catch(
                err =>
                    err?.response?.data ?? {
                        success: false,
                        message: 'An error has occurred. Please try again later',
                    }
            );

        let success = false;
        if ('success' in result) success = result.success === true;
        if ('status' in result) success = result['status'] === 'success';

        let error: Exception | null = null;
        if (!success && 'message' in result) error = new Exception(result.message);
        if (!success && 'data' in result && typeof result['data'] === 'string') error = new Exception(result['data']);

        let data: Data | null = null;
        if ('data' in result && typeof result['data'] !== 'string') data = result['data'] as Data;

        return success
            ? { success: true, error: null, data: data as Data }
            : { success: false, error: error as Exception, data: null };
    }

    public async $put<
        URL extends keyof ApiPath['PUT'],
        Response extends ApiPath['PUT'][URL]['response'],
        Body extends ApiPath['PUT'][URL]['body'],
        Data extends Response extends { data: unknown } ? Response['data'] : never
    >(
        url: URL,
        body?: Body,
        config?: AxiosRequestConfig
    ): Promise<{ success: true; error: null; data: Data } | { success: false; error: Exception; data: null }> {
        if (!api.axios) throw new Error(this.axiosMissingEx);
        if (!api.i18n) throw new Error(this.i18nMissingEx);

        const result = await api.axios
            .$put<Response>(url, body, config)
            .then(x => x)
            .catch(
                err =>
                    err?.response?.data ?? {
                        success: false,
                        message: 'An error has occurred. Please try again later',
                    }
            );

        let success = false;
        if ('success' in result) success = result.success === true;
        if ('status' in result) success = result['status'] === 'success';

        let error: Exception | null = null;
        if (!success && 'message' in result) error = new Exception(result.message);
        if (!success && 'data' in result && typeof result['data'] === 'string') error = new Exception(result['data']);

        let data: Data | null = null;
        if ('data' in result) data = result['data'] as Data;

        return success
            ? { success: true, error: null, data: data as Data }
            : { success: false, error: error as Exception, data: null };
    }

    public async $patch<
        URL extends keyof ApiPath['PATCH'],
        Response extends ApiPath['PATCH'][URL]['response'],
        Body extends ApiPath['PATCH'][URL]['body'],
        Data extends Response extends { data: unknown } ? Response['data'] : never
    >(
        url: URL,
        body?: Body,
        config?: AxiosRequestConfig
    ): Promise<{ success: true; error: null; data: Data } | { success: false; error: Exception; data: null }> {
        if (!api.axios) throw new Error(this.axiosMissingEx);
        if (!api.i18n) throw new Error(this.i18nMissingEx);

        const result = await api.axios
            .$patch<Response>(url, body, config)
            .then(x => x)
            .catch(
                err =>
                    err?.response?.data ?? {
                        success: false,
                        message: 'An error has occurred. Please try again later',
                    }
            );

        let success = false;
        if ('success' in result) success = result.success === true;
        if ('status' in result) success = result['status'] === 'success';

        let error: Exception | null = null;
        if (!success && 'message' in result) error = new Exception(result.message);
        if (!success && 'data' in result && typeof result['data'] === 'string') error = new Exception(result['data']);

        let data: Data | null = null;
        if ('data' in result && typeof result['data'] !== 'string') data = result['data'] as Data;

        if (!('data' in result) && !('message' in result)) {
            success = true;
            data = result;
        }

        return success
            ? { success: true, error: null, data: data as Data }
            : { success: false, error: error as Exception, data: null };
    }

    public async $delete<
        URL extends keyof ApiPath['DELETE'],
        Response extends ApiPath['DELETE'][URL]['response'],
        Body extends ApiPath['DELETE'][URL]['body'],
        Data extends Response extends { data: unknown } ? Response['data'] : never
    >(
        url: URL,
        body?: Body
    ): Promise<{ success: true; error: null; data: Data } | { success: false; error: Exception; data: null }> {
        if (!api.axios) throw new Error(this.axiosMissingEx);
        if (!api.i18n) throw new Error(this.i18nMissingEx);

        const result = await api.axios
            .$delete<Response>(url, { data: body })
            .then(x => x)
            .catch(
                err =>
                    err?.response?.data ?? {
                        success: false,
                        message: 'An error has occurred. Please try again later',
                    }
            );

        let success = false;
        if ('success' in result) success = result.success === true;
        if ('status' in result) success = result['status'] === 'success';

        let error: Exception | null = null;
        if (!success && 'message' in result) error = new Exception(result.message);
        if (!success && 'data' in result && typeof result['data'] === 'string') error = new Exception(result['data']);

        let data: Data | null = null;
        if ('data' in result && typeof result['data'] !== 'string') data = result['data'] as Data;

        if (!('data' in result) && !('message' in result)) {
            success = true;
            data = result;
        }

        return success
            ? { success: true, error: null, data: data as Data }
            : { success: false, error: error as Exception, data: null };
    }
}

const API = new api();

export default API;
