import { RUB, USD } from '@/utils/currency';
import SearchProduct from '@/classes/SearchProduct';

import api from '@/utils/api';
import { ApiPath } from '@/types/api-path';
import { Prices } from '@/classes/Currency';

export type ServerProduct = ApiPath['GET']['/projects/project/products/']['data'][number];
export type UpdateProductDTO = ApiPath['PATCH']['/projects/project/products/']['body'];

export default class SpecificationProduct extends SearchProduct {
    project: number;
    product: number;
    amount: number;
    order: number;

    get totalCost(): Prices {
        return {
            RUB: RUB(this.prices.RUB).multiply(this.amount).intValue,
            USD: USD(this.prices.USD).multiply(this.amount).intValue,
        };
    }

    constructor(data: ServerProduct) {
        super(data);

        this.project = data.project;
        this.product = data.product;
        this.amount = data.amount;
        this.order = data.order;
    }

    public static create(data: ServerProduct) {
        return new SpecificationProduct(data);
    }

    public static async $update(dto: UpdateProductDTO) {
        const response = await api.$patch('/projects/project/products/', dto);
        if (!response.success) return response.error;

        return response.data;
    }

    public static async $delete(product: SpecificationProduct) {
        const response = await api.$delete('/projects/project/products/', {
            project: product.project,
            product: product.product,
        });
        if (!response.success) return response.error;

        return response.success;
    }
}
