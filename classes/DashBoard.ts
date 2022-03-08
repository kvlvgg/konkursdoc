import api from '@/utils/api';
import Project from '@/classes/Project';

import { ApiPath } from '@/types/api-path';
type ServerProjects = ApiPath['GET']['/projects/project/']['data'];

export default class DashBoard {
    projects: Project[];

    constructor(data: ServerProjects) {
        this.projects = data.map(x => Project.create(x));
    }

    public static create(data: ServerProjects) {
        return new DashBoard(data);
    }

    public static async load() {
        const response = await api.$get('/projects/project/');
        if (!response.success) return response.error;

        return response.data;
    }
}
