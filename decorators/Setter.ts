import { createDecorator } from 'vue-class-component';
import { Store } from 'vuex';

export default function Setter(setterType: string) {
    return createDecorator((options, key) => {
        if (!options.methods) options.methods = {};
        options.methods[key] = function (payload: any) {
            return (this.$store as Store<any>).commit(setterType, payload);
        };
    });
}
