export type Company = {
    data: {
        id: number;
        type: 'company' | 'sp' | 'natural_person';
        full_name: string | null;
        short_name: string | null;
        form: string | null;
        address: string | null;
        inn: string | null;
        kpp: string | null;
        ogrn: string | null;
        checking_account: string | null;
        bic: string | null;
        bank_name: string | null;
        bank_address: string | null;
        correspondent_account: string | null;
        registration_date: string | null;

        members: {
            id: number;
            role: /*'owner'*/ string;
            user: {
                id: number;
                firstname: string | null;
                lastname: string | null;
                middlename: string | null;
                phone_number: string | null;
                email: string | null;
                date_joined: string | null;
                last_login: string | null;
            };
        }[];

        tariff_info: {
            id: number;
            date_start: string | null;
            date_end: string | null;
            total_price: number | null;
            total_users: number | null;
            tariff: {
                id: number | null;
                cost_calculation: boolean | null;
                formation_of_applications: boolean | null;
                month_price: number | null;
                number_of_users: number | null;
                title: string | null;
            };
        };
    };

    body: {
        type: string | null;
        short_name: string | null;
        full_name: string | null;
        address: string | null;
        registration_date: string | null;
        inn: string | null;
        kpp: string | null;
        ogrn: string | null;
        checking_account: string | null;
        bank_name: string | null;
        bank_address: string | null;
        correspondent_account: string | null;
        bic: string | null;
    };
};
