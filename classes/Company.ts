import api from '@/utils/api';
import Member from '@/classes/Member';
import TariffInfo from '@/classes/TariffInfo';

import { ApiPath } from '@/types/api-path';
type ServerCompany = ApiPath['GET']['/companies/company/']['data'];
type ServerCompanyDTO = ApiPath['PUT']['/companies/company/']['body'];

export type CompanyType = ServerCompany['type'];

export type CompanyDTO = {
    type: ServerCompany['type'] | null;
    shortName: string | null;
    fullName: string | null;
    address: string | null;
    registrationDate: string | null;
    INN: string | null;
    KPP: string | null;
    OGRN: string | null;
    checkingAccount: string | null;
    bankName: string | null;
    bankAddress: string | null;
    correspondentAccount: string | null;
    BIC: string | null;
};

export default class Company {
    id: number | null = null;
    type: ServerCompany['type'] | null = null;
    shortName: string | null = null;
    fullName: string | null = null;
    address: string | null = null;
    registrationDate: string | null = null;
    INN: string | null = null;
    KPP: string | null = null;
    OGRN: string | null = null;
    checkingAccount: string | null = null;
    bankName: string | null = null;
    bankAddress: string | null = null;
    correspondentAccount: string | null = null;
    BIC: string | null = null;

    tariffInfo: TariffInfo = {} as TariffInfo;
    members: Member[] = [];

    public get isNaturalPerson() {
        return this.type === 'natural_person';
    }

    public isOwner(userId?: number | null) {
        if (!userId) return false;
        return this.members.some(x => x.userId === userId && x.role === 'owner');
    }

    public static async create() {
        const entity = new Company();
        const company = await entity.load();

        return company;
    }

    private async load() {
        const response = await api.$get('/companies/company/');
        if (!response.success) return response.error;

        this.assignData(response.data);
        return this;
    }

    public async save(entity: CompanyDTO) {
        const response = await api.$put('/companies/company/', this.toServerObject(entity));
        if (!response.success) return response.error;

        return response.data;
    }

    private toServerObject(entity: CompanyDTO): ServerCompanyDTO {
        return {
            type: entity.type,
            short_name: entity.shortName,
            full_name: entity.fullName,
            address: entity.address,
            registration_date: entity.registrationDate,
            inn: entity.INN,
            kpp: entity.KPP,
            ogrn: entity.OGRN,
            checking_account: entity.checkingAccount,
            bank_name: entity.bankName,
            bank_address: entity.bankAddress,
            correspondent_account: entity.correspondentAccount,
            bic: entity.BIC,
        };
    }

    public assignData(response: ServerCompany) {
        this.id = response.id;
        this.type = response.type;
        this.shortName = response.short_name;
        this.fullName = response.full_name;
        this.address = response.address;
        this.registrationDate = response.registration_date;
        this.INN = response.inn;
        this.KPP = response.kpp;
        this.OGRN = response.ogrn;
        this.checkingAccount = response.checking_account;
        this.bankName = response.bank_name;
        this.bankAddress = response.bank_address;
        this.correspondentAccount = response.correspondent_account;
        this.BIC = response.bic;

        this.tariffInfo = TariffInfo.create(response.tariff_info);
        this.members = response.members.map(x => Member.create(x));
    }

    toJSON() {
        return { ...this };
    }
}
