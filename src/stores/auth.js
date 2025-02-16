import { defineStore } from 'pinia';
import { router } from '@/router';
import api from "@/_helper/api";

// const baseUrl = `${import.meta.env.VITE_API_URL}/users`;

export const useAuthStore = defineStore('auth',{
  state: () => ({
    user: [],
    errors:{}
  }),
  actions: {
    async login(params) {
      const res = await api.post(`/login`, params);
      let {user,token} = res.data.data
      this.user = user;
      localStorage.setItem('authToken', token);
      router.push('/');
    },
    async logout() {
      const res = await api.post(`/logout`);
      this.user = null;
      localStorage.removeItem('authToken');
      router.push('/auth/login');
    }
  }
});
