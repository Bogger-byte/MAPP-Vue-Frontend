import { defineStore } from "pinia/dist/pinia";
import AuthService from "../services/auth.service";
import UserService from "../services/user.service";
import { useStorage } from "@vueuse/core";


export const useUserStore = defineStore('user', {
    state: () => ({
        accessToken: useStorage("accessToken", ''),
        refreshToken: useStorage("refreshToken", ''),
        data: null
    }),
    getters: {
        isLoggedIn: state => !!state.accessToken && !!state.refreshToken,
        getData: async state => {
            if (state.data === null) {
                let response = await UserService.getMe();
                state.data = response.data;
            }
            return state.data;
        }
    },
    actions: {
        async login(username, password) {
            let response = await AuthService.loginForAccessToken(username, password);
            this.accessToken = response.data.access_token;
            this.refreshToken = response.data.refresh_token;
        },
        async refresh() {
            let response = await AuthService.refreshAccessToken(this.refreshToken);
            this.accessToken = response.data.access_token;
            this.refreshToken = response.data.refresh_token;
        },
        logout() {
            this.accessToken = '';
            this.refreshToken = '';
            this.data = null;
        }
    }
});
