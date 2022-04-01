import apiClient from "../modules/api.client";
import apiBasic from "../modules/api.basic";


class UserService {
    async getMe() {
        return await apiClient.get('/users/me');
    }

    async deleteMe() {
        return await apiClient.delete('/users/me');
    }

    async updateMe(username, password, email) {
        return await apiClient.patch('/users/me', {
            username: username,
            password: password,
            email: email
        });
    }

    async registerUser(username, password, email) {
        return await apiBasic.post( '/users/register', {
            username: username,
            password: password,
            email: email
        });
    }

    async getUser(id) {
        return await apiBasic.get(`/users/${id}`);
    }

    async deleteUser(id) {
        return await apiClient.delete(`/users/${id}`);
    }

    async updateUser(id, username, password, email) {
        return await apiClient.patch(`/users/${id}`, {
            username: username,
            password: password,
            email: email
        });
    }
}

export default new UserService();
