import api from '@/utils/api';

import SearchProduct from '@/classes/SearchProduct';
import { ApiPath } from '@/types/api-path';

type ProductsResponse = ApiPath['GET']['/products/product/']['response'];
export type SearchOptions = { sortBy?: string; sortDesc?: '' | '-' };
export type SearchConditions = {
    description: string | null;
    manufacturer_id: number | string | null;
    provider_id: number | string | null;
    available_quantity_min: '0' | '1';
};

export default class Search {
    sortBy = 'price_usd';
    sortDesc: '' | '-' = '';
    conditions: SearchConditions = {
        description: null,
        manufacturer_id: null,
        provider_id: null,
        available_quantity_min: '0',
    };

    total = 0;
    isLoading = false;
    isFirstRequest = true;
    products: SearchProduct[] = [];

    get endReached() {
        return this.products.length >= this.total;
    }

    public setOptions(options?: SearchOptions) {
        this.sortBy = options?.sortBy ?? this.sortBy;
        this.sortDesc = options?.sortDesc ?? this.sortDesc;
    }

    public setConditions(conditions: SearchConditions) {
        this.conditions = conditions;
    }

    /**
     * Nuxt съедает все методы классов в сторе при перезагрузке страницы.
     * Поэтому, создаем новый поиск из предыдущего, который первратился в обычный объект (plainObject)
     */
    public static create(plainObject: Search | null) {
        if (!plainObject) return new Search();

        const search = new Search();
        search.setOptions({ sortBy: plainObject.sortBy, sortDesc: plainObject.sortDesc });
        search.setConditions(plainObject.conditions);
        search.products = plainObject.products;

        return search;
    }

    public static async $loadNextChunk(search: Search): Promise<ProductsResponse | false> {
        const response = await api.$get('/products/product/', {
            params: {
                limit: 30,
                offset: search.products.length,
                ordering: `${search.sortDesc}${search.sortBy}`,
                ...search.conditions,
            },
        });

        if (!response.success) return false;

        return response.data;
    }

    public addChunk(response: ProductsResponse) {
        this.total = response.count;
        this.products.push(...response.results.map(x => SearchProduct.create(x)));
    }

    toJSON() {
        return { ...this };
    }
}
