import apiBasic from "../modules/api.basic";
import apiClient from "../modules/api.client";


class ServerService {
    async register(name, host, secret, email) {
        return await apiClient.post(`/servers/register`, {
            name: name,
            host: host,
            secret: secret,
            email: email
        });
    }

    async getMy() {
        return await apiClient.get('/servers/me');
    }

    async deleteMy() {
        return await apiClient.delete('/servers/me');
    }

    async updateMy(name, host, secret, email) {
        return await apiClient.patch(`/servers/me`, {
            name: name,
            host: host,
            secret: secret,
            email: email
        });
    }

    async getServer(id) {
        return await apiBasic.get(`/servers/${id}`);
    }

    async deleteServer(id) {
        return await apiBasic.delete(`/servers/${id}`);
    }

    async patchServer(id, name, host, secret, email) {
        return await apiBasic.patch(`/servers/${id}`, {
            name: name,
            host: host,
            secret: secret,
            email: email
        });
    }

    async getServerRegions(id) {
        return await apiBasic.get(`/servers/${id}/regions`);
    }

    async getServerRegion(id, world, x, z) {
        return await apiBasic.get(`/servers/${id}/regions/${world}/${x}/${z}`);
    }
}

export default new ServerService();