import { defineStore } from "pinia";

export const useSettingsStore = defineStore("settings", {
  state: () => ({
    loginPage: "/login",
    afterLoginPage: "/",
  }),
  getters: {},
  actions: {},
});
