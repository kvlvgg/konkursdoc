import { VueConstructor } from 'vue';

declare module modal {
    interface Modal {
        show<T>(component: VueConstructor, props?: Record<string, any>, events?: Record<string, Function>): Promise<T>;

        confirm: (config: {
            title: string;
            message: string;
            okString?: string;
            cancelString?: string;
        }) => Promise<boolean>;

        alert: (config: { title: string; message: string; okString?: string }) => void;

        error: (config: { title?: string; message: string; okString?: string }) => void;
    }
}

export default modal;
