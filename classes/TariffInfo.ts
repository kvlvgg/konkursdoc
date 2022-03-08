import { ApiPath } from '@/types/api-path';

type ServerTariffInfo = ApiPath['GET']['/companies/company/']['data']['tariff_info'];

export default class TariffInfo {
    tariffInfoId: number | null = null;
    dateStart: string | null = null;
    dateEnd: string | null = null;
    totalPrice: number | null = null;
    totalUsers: number | null = null;

    tariffId: number | null = null;
    tariffName: string | null = null;
    costCalculation: boolean | null = null;
    formationOfApplications: boolean | null = null;
    monthPrice: number | null = null;
    numberOfUsers: number | null = null;

    public get isRestricted() {
        if (!this.dateEnd) return true;
        return new Date(this.dateEnd) < new Date();
    }

    public static create(data: ServerTariffInfo | null) {
        return new TariffInfo(data);
    }

    constructor(data: ServerTariffInfo | null) {
        if (!data) return;

        this.tariffInfoId = data.id;
        this.dateStart = data.date_start;
        this.dateEnd = data.date_end;
        this.totalPrice = data.total_price;
        this.totalUsers = data.total_users;
        this.tariffId = data.tariff.id;
        this.tariffName = data.tariff.title;
        this.costCalculation = data.tariff.cost_calculation;
        this.formationOfApplications = data.tariff.formation_of_applications;
        this.monthPrice = data.tariff.month_price;
        this.numberOfUsers = data.tariff.number_of_users;
    }
}
