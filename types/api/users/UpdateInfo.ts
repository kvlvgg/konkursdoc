export type UpdateInfo = {
    body: {
        password?: string;
        firstname?: string;
        lastname?: string;
        middlename?: string;
        phone_number?: string;
    };
    data: Omit<UpdateInfo['body'], 'password'>;
};
