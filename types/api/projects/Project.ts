export type Project = {
    data: {
        id: number;
        title: string;
        status: 'in_work' | 'finished';
        created: string;
        edited: string;
        documents: unknown[]; // типизировать позже, когда дойду до документов
        members: [
            {
                id: number;
                role: string;
                user: {
                    id: number;
                    firstname: string;
                    lastname: string;
                    middlename: string;
                    phone_number: string;
                    email: string;
                    date_joined: string;
                    last_login: string;
                };
            }
        ];
        products_count: number;
        documents_count: number;
        total_price_usd: number;
        total_price_rub: number;
    };

    body: {
        title: string;
        status?: 'in_work' | 'finished';
    };
};
