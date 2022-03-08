import { RUB, USD } from '@/utils/currency';
import api from '@/utils/api';

import SpecificationProduct, { ServerProduct } from '@/classes/SpecificationProduct';
import SearchProduct from '@/classes/SearchProduct';

export default class Specification {
    products: SpecificationProduct[];

    get totalCost() {
        return {
            RUB: this.products.reduce((acc, curr) => RUB(acc).add(curr.totalCost.RUB).intValue, 0),
            USD: this.products.reduce((acc, curr) => USD(acc).add(curr.totalCost.USD).intValue, 0),
        };
    }

    get productTypesCount() {
        return this.products.length;
    }

    get productsCount() {
        return this.products.reduce((acc, curr) => acc + (curr.amount ? curr.amount : 0), 0);
    }

    constructor(data: ServerProduct[]) {
        this.products = data.map(SpecificationProduct.create);
    }

    public static create(data: ServerProduct[]) {
        return new Specification(data);
    }

    public static async $load(id: string) {
        const response = await api.$get('/projects/project/products/', { params: { project: id } });
        if (!response.success) return response.error;

        return response.data;
    }

    public static async $addProduct(product: SearchProduct, projectId: number) {
        const response = await api.$post('/projects/project/products/', {
            project: projectId,
            product: product.id,
            amount: product.amount,
        });

        if (!response.success) return response.error;

        return response.data;
    }
}
