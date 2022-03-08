import api from '@/utils/api';

export default class Auth {
    public static async sendPasswordRecoveryCode(email: string) {
        const response = await api.$post('/users/send_password_recovery_code/', { email });

        return [response.error, response.success];
    }
}
