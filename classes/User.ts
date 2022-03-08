import api from '@/utils/api';
import { ApiPath } from '~/types/api-path';

type ServerUser = ApiPath['POST']['/users/get_current/']['data'];
export type UpdatePasswordDTO = ApiPath['POST']['/users/update_password/']['body'];
export type UpdateUserInfoDTO = ApiPath['PATCH']['/users/update_info/']['body'];

export default class User {
    private _id: number | null = null;
    private _email: string | null = null;
    private _firstname: string | null = null;
    private _middlename: string | null = null;
    private _lastname: string | null = null;
    private _phoneNumber: string | null = null;

    public isOwner = false;

    get id() {
        return this._id;
    }
    get email() {
        return this._email;
    }
    get firstname() {
        return this._firstname;
    }
    get middlename() {
        return this._middlename;
    }
    get lastname() {
        return this._lastname;
    }
    get phoneNumber() {
        return this._phoneNumber;
    }

    public setIsOwner(value: boolean) {
        this.isOwner = value;
    }

    public get fullname() {
        return `${this.lastname} ${this.firstname} ${this.middlename}`;
    }

    public async updatePassword(dto: UpdatePasswordDTO) {
        const response = await api.$post('/users/update_password/', dto);

        return [response.success, response.error];
    }

    public async updateInfo(dto: UpdateUserInfoDTO) {
        const response = await api.$patch('/users/update_info/', dto);

        return [response.success, response.error];
    }

    static async create() {
        const entity = new User();
        const user = await entity.load();

        return user;
    }

    private async load() {
        const response = await api.$post('/users/get_current/');
        if (!response.success) return response.error;

        this.assignData(response.data);
        return this;
    }

    private assignData(response: ServerUser) {
        this._id = response.id;
        this._email = response.email;
        this._firstname = response.firstname ?? '';
        this._middlename = response.middlename ?? '';
        this._lastname = response.lastname ?? '';
        this._phoneNumber = response.phone_number;
    }

    toJSON() {
        return { ...this };
    }
}
