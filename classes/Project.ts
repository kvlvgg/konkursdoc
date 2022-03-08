import api from '@/utils/api';

import Member from '@/classes/Member';
import { ApiPath } from '@/types/api-path';
type ServerProject = ApiPath['GET']['/projects/project/']['data'][number];

export default class Project {
    id: number;
    title: string;
    status: ServerProject['status'];
    createDate: string;
    editDate: string;
    documents: unknown[]; // типизировать позже, когда дойду до документов
    members: Member[];
    productsCount: number;
    documentsCount: number;
    totalPriceUsd: number;
    totalPriceRub: number;

    get statusOptions() {
        return {
            in_work: 'В работе',
            finished: 'Завершен',
        };
    }

    get displayStatus() {
        return this.statusOptions[this.status];
    }

    get assigneesShort() {
        const [first, ...rest] = this.members.map(x => x.shortname);

        return `${first}` + (rest.length > 0 ? `+ ${rest.length}` : '');
    }

    constructor(data: ServerProject) {
        this.id = data.id;
        this.title = data.title;
        this.status = data.status;
        this.createDate = data.created;
        this.editDate = data.edited;
        this.documents = data.documents;
        this.members = data.members.map(x => Member.create(x));
        this.productsCount = data.products_count;
        this.documentsCount = data.documents_count;
        this.totalPriceUsd = data.total_price_usd;
        this.totalPriceRub = data.total_price_rub;
    }

    public static create(data: ServerProject) {
        return new Project(data);
    }

    public static async $load(id: string) {
        const response = await api.$get(['/projects/project/{id}/', { id }]);
        if (!response.success) return response.error;

        return response.data;
    }

    public static async $create(dto: Pick<Project, 'title' | 'status'>) {
        const response = await api.$post('/projects/project/', dto);
        if (!response.success) return response.error;

        return response.data;
    }
}
