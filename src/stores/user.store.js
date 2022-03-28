import {defineStore} from "pinia/dist/pinia";
import AuthService from "../services/auth.service";
import UserService from "../services/user.service";


export const useUserStore = defineStore('user', {
    state: () => ({
        accessToken: '',
        refreshToken: '',
        data: null
    }),
    getters: {
        isLoggedIn: state => !!state.accessToken && !!state.refreshToken,
    },
    actions: {
        async login(username, password) {
            let response = await AuthService.loginForAccessToken(username, password);
            this.accessToken = response.data.access_token;
            this.refreshToken = response.data.refresh_token;
            await this._load();
        },
        async refresh() {
            let response = await AuthService.refreshAccessToken(this.refreshToken);
            this.accessToken = response.data.access_token;
            this.refreshToken = response.data.refresh_token;
        },
        async _load() {
            let response = await UserService.getMe();
            this.data = response.data;
        },
        logout() {
            this.accessToken = '';
            this.refreshToken = '';
            this.data = null;
        }
    }
});
