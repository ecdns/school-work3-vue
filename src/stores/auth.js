import { defineStore } from "pinia";
import { LocalStorage } from "quasar";
import { api } from "src/boot/axios";
import CryptoJS from "crypto-js";

var encryptionKey = 'enzoCestLeplusbeauEtLeoAussiEtViveLe69';

export const useAuthStore = defineStore("auth", {
  state: () => ({
    token: LocalStorage.getItem("token"),
    me: null,
  }),
  getters: {
    isAuthenticated: (state) => !!state.token,
    getUser: (state) => !!state.me
  },
  actions: {
    login(email, password) {
/*      password = CryptoJS.AES.encrypt(password, encryptionKey).toString()*/
      return api.post('/user/login', { email, password })
        .then(res => {
          this.setToken(res.data.jwt);
          return this.loadUserData();
        });
    },
    logout() {
      this.token = null;
      this.me = null;
      LocalStorage.remove('token');
      LocalStorage.remove('refreshToken');
    },
    loadUserData(cached = true) {
      return new Promise((resolve, reject) => {
        if (!cached || !this.me) {
          return api.get('/user/me', {
            headers: {
              'Authorization': `Bearer ${this.getToken()}`
            }
          }
          ).then(res => {
            this.setMe(res.data);
            return resolve(this.me);
          }, (error) => {
            return reject(error);
          })
        }
        return resolve(this.me);
      });

    },
    setToken(token) {
      this.token = token;
      LocalStorage.set("token", token);
    },
    getToken() {
      return LocalStorage.getItem("token")
    },
    setRefreshToken(refreshToken) {
      LocalStorage.set("refreshToken", refreshToken);
    },
    getRefreshToken() {
      return LocalStorage.getItem("refreshToken");
    },
    setMe(me) {
      this.me = me;
    },
    setCacheDirty() {
      this.me = null;
    }
  },
});

