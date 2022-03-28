import apiBasic from "../modules/api.basic";


class ServerService {
    async getData(id) {
        return await apiBasic.get( '/servers', {
            params: {
                server_id: id
            },
            validateStatus: (status) => {
                return status < 400;
            }
        });
    }
}

export default new ServerService();