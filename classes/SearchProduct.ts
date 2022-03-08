import { ApiPath } from '@/types/api-path';
import { Prices } from '@/classes/Currency';
export type ServerProduct = ApiPath['GET']['/products/product/']['data']['results'][number];

export default class SearchProduct {
    id: number;
    country: string;
    catagory: string;
    subCategory: string;
    manufacturer: string;
    partNumber: string;
    provider: string;
    conversion: number;
    resource: number;
    resourceUnit: string;
    color: ServerProduct['color'];
    filling: number | string;
    prices: Prices;
    updateDate: string;
    availableQuantity: number;
    description: string;
    amount: number;

    constructor(data: ServerProduct) {
        const priceInRUB = data.prices.find(x => x.currency.alpha3 === 'RUB');
        const priceInUSD = data.prices.find(x => x.currency.alpha3 === 'USD');

        this.id = data.id;
        this.country = data.country.name;
        this.catagory = data.category.name;
        this.subCategory = data.subcategory.name;
        this.manufacturer = data.manufacturer.name;
        this.partNumber = data.part_number;
        this.provider = data.provider.name;
        this.conversion = data.provider.conversion;
        this.resource = data.resource;
        this.resourceUnit = data.resource_unit;
        this.color = data.color;
        this.filling = data.filling.toString();
        this.prices = {
            RUB: priceInRUB?.price ?? 0,
            USD: priceInUSD?.price ?? 0,
        };
        this.availableQuantity = data.available_quantity;
        this.updateDate = data.updated_at;
        this.description = data.description;
        this.amount = 1;
    }

    public static create(data: ServerProduct) {
        return new SearchProduct(data);
    }
}
