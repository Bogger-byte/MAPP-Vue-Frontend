import apiClient from "../modules/api.client";
import apiBasic from "../modules/api.basic";


class UserService {
    async register(username, password, email) {
        return await apiBasic.post( '/users/register', {
            username: username,
            password: password,
            email: email
        });
    }
    async getMe() {
        return await apiClient.get('/users/me');
    }
    async getData(id) {
        return await apiBasic.get('/users', {
            params: {
                user_id: id
            }
        });
    }
}

export default new UserService();
