export type UpdatePassword = {
    body: {
        email: string;
        password: string;
        password_recovery_code: string;
    };

    data: {
        access_token: string;
    };
};
