export default class StoreHelper {
    public static setProperty(entity: any, chain: string, value: any) {
        const propChain = chain.split('.');
        if (propChain.length === 1) {
            entity[propChain[0]] = value;
            return;
        }

        const firstProp = propChain.shift();
        this.setProperty(entity[firstProp!], propChain.join('.'), value);
    }
}
