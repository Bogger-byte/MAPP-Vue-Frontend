import apiBasic from "../modules/api.basic";


class AuthService {
     async loginForAccessToken(username, password) {
         let formData = new FormData();
         formData.append('grant_type', 'password');
         formData.append('username', username);
         formData.append('password', password);
         formData.append('scope', 'DEFAULT_USER');
         formData.append('client_id', null);
         formData.append('client_secret', null);
         return await apiBasic.post('/oauth/jwt/token', formData, {
             headers: {
                 'Content-Type': 'application/x-www-form-urlencoded'
             }
         });
    }

    async refreshAccessToken(refreshToken) {
         return await apiBasic.post('/oauth/jwt/refresh', {}, {
             headers: {
                 refresh_token: refreshToken
             }
        });
    }
}

export default new AuthService();
