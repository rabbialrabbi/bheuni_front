import api from "@/_helper/api";
import {router} from "@/router";
import {useCookie} from "@/_helper/useCookie";

export default {
  namespaced: true,
  state: {
  },
  mutations: {
    SET_APPLICATION(state, application) {
      state.applications = application;
    },
  },
  actions: {
    async logout({ commit },config= {}) {
      try {
        const res = await api.post(`/logout`);
        useCookie('userAbilityRules').value = ''
        useCookie('userData').value = ''
        useCookie('authToken').value = ''
        router.push('/auth/login');
      } catch (error) {
        console.error('Error fetching application:', error);
      }
    },
  },

};
