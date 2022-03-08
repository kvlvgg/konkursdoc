export type Products = {
    data: {
        id: number;
        project: number;
        product: number;
        part_number: string;
        prices: {
            id: number;
            price: number;
            product: number;
            currency: {
                id: number;
                name: string;
                alpha3: string;
                numeric: string;
                precision: number;
            };
        }[];
        resource: number;
        resource_unit: string;
        filling: number;
        available_quantity: number;
        description: string;
        color: {
            id: number;
            name: string;
        }[];
        manufacturer: {
            id: number;
            name: string;
            isOriginal: true;
        };
        provider: {
            id: number;
            name: string;
            conversion: number;
        };
        category: {
            id: number;
            name: string;
        };
        subcategory: {
            id: number;
            name: string;
        };
        country: {
            id: number;
            name: string;
            alpha2: string;
            alpha3: string;
            numeric: string;
        };
        price_usd: number;
        updated_at: string;
        amount: number;
        order: number;
    };

    body: {
        project: number;
        product: number;
        amount?: number;
        order?: number;
        filling?: number;
    };
};
