import { GetCurrent } from '@/types/api/users/GetCurrent';
import { SendPasswordRecoveryCode } from '@/types/api/users/SendPasswordRecoveryCode';
import { UpdateInfo } from '@/types/api/users/UpdateInfo';
import { UpdatePassword } from '@/types/api/users/UpdatePassword';
import { Company } from '@/types/api/companies/Company';
import { Project } from '@/types/api/projects/Project';
import { Products } from '@/types/api/projects/Products';
import { Products as SearchProducts } from '@/types/api/products/Products';

type SuccessTrue = { success: true; status: undefined };
type SuccessFalse = { success: false; status: undefined };
type StatusFail = { status: 'fail'; success: undefined };
type StatusSuccess = { status: 'success'; success: undefined };

type Data<T> = { data: T };
type Message<T extends string> = { message: T | 'An error has occurred. Please try again later' };
type RequiredField<T extends string[]> = { [key in T[number]]?: 'Обязательное поле.' };

export type ApiPath = {
    GET: {
        '/companies/company/': {
            response:
                | (SuccessTrue & Data<Company['data']>)
                | (SuccessFalse & Message<'Учетные данные не были предоставлены.'>);
            data: Company['data'];
        };
        '/projects/project/': {
            response:
                | (SuccessTrue & Data<Project['data'][]>)
                | (SuccessFalse & Message<'Учетные данные не были предоставлены.'>);
            data: Project['data'][];
        };
        '/projects/project/{id}/': {
            response:
                | (SuccessTrue & Data<Project['data']>)
                | (SuccessFalse & Message<'Учетные данные не были предоставлены.'>);
            data: Project['data'];
        };
        '/projects/project/products/': {
            response:
                | (SuccessTrue & Data<Products['data'][]>)
                | (SuccessFalse & Message<'Учетные данные не были предоставлены.'>);
            // пока не знаю, как это типизировать
            // config: AxiosRequestConfig & { params: { project: number } };
            data: Products['data'][];
        };
        '/products/product/': {
            response: SearchProducts['data'];
            data: SearchProducts['data'];
        };
    };

    PUT: {
        '/companies/company/': {
            response:
                | (SuccessTrue & Data<Company['data']>)
                | (SuccessFalse & Message<'Учетные данные не были предоставлены.'>);
            data: Company['data'];
            body: Company['body'];
        };
    };

    POST: {
        '/users/get_current/': {
            response:
                | (StatusSuccess & Data<GetCurrent['data']>)
                | (SuccessFalse & Message<'Учетные данные не были предоставлены.'>);
            data: GetCurrent['data'];
            body: GetCurrent['body'];
        };

        // TODO покопаться в настройках i18n или попросить бэк изменить message, если не удастся это локализовать.
        '/users/send_password_recovery_code/': {
            response:
                | StatusSuccess
                | (StatusFail & Message<'User with email <email> not found'>)
                | RequiredField<['email']>;
            body: SendPasswordRecoveryCode['body'];
        };

        '/users/update_password/': {
            response:
                | (StatusSuccess & Data<UpdatePassword['data']>)
                | (StatusFail & Message<'Invalid password recovery code'>)
                | RequiredField<['email', 'password', 'password_recovery_code']>;
            data: UpdatePassword['data'];
            body: UpdatePassword['body'];
        };

        '/projects/project/': {
            // TODO типизировать неуспешный ответ
            response: SuccessTrue & Data<Project['data']>;
            body: Project['body'];
        };

        '/projects/project/products/': {
            response:
                | (SuccessTrue & Data<Products['data']>)
                | (SuccessFalse & Message<'Учетные данные не были предоставлены.'>);
            body: Products['body'];
        };
    };

    PATCH: {
        '/users/update_info/': {
            response:
                | (SuccessTrue & Data<UpdateInfo['data']>)
                | (SuccessFalse & Message<'Wrong password'>)
                | RequiredField<['password']>;
            data: UpdateInfo['data'];
            body: UpdateInfo['body'];
        };
        '/projects/project/products/': {
            // Но там не ответ вида { success: bool, data: Object | Array }. Попросить бэк изменить.
            response: Data<Products['data']> | (SuccessFalse & Message<'Учетные данные не были предоставлены.'>);
            data: Products['data'];
            body: Omit<Products['body'], 'product'> & { id: number };
        };
    };

    DELETE: {
        '/projects/project/products/': {
            response:
                | SuccessTrue
                | (SuccessFalse & Message<'Here is no product'>)
                | (SuccessFalse & Message<'Учетные данные не были предоставлены.'>);
            body: Pick<Products['data'], 'product' | 'project'>;
        };
    };
};
