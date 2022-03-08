import { ApiPath } from '@/types/api-path';

type ServerMember = ApiPath['GET']['/companies/company/']['data']['members'][number];

export default class Member {
    memberId: number | null = null;
    role: string | null = null;
    userId: number | null = null;
    firstname: string | null = null;
    middlename: string | null = null;
    lastname: string | null = null;
    email: string | null = null;
    phoneNumber: string | null = null;
    registrationDate: string | null = null;
    lastLoginDate: string | null = null;

    get fullname() {
        return `${this.lastname ?? ''} ${this.firstname ?? ''} ${this.middlename ?? ''}`;
    }

    get shortname() {
        const lastname = this.lastname;
        const firstname = `${this.firstname?.[0]}.` ?? '';
        const middlename = `${this.middlename?.[0]}.` ?? '';

        return `${lastname ?? ''} ${firstname ?? ''} ${middlename ?? ''}`;
    }

    public static create(data: ServerMember) {
        return new Member(data);
    }

    constructor(data: ServerMember) {
        this.memberId = data.id;
        this.role = data.role;
        this.userId = data.user.id;
        this.firstname = data.user.firstname;
        this.middlename = data.user.middlename;
        this.lastname = data.user.lastname;
        this.email = data.user.email;
        this.phoneNumber = data.user.phone_number;
        this.registrationDate = data.user.date_joined;
        this.lastLoginDate = data.user.last_login;
    }
}
