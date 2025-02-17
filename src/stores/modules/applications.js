import api from "@/_helper/api";

export default {
  namespaced: true,
  state: {
    applications: [],
    totalApplications: 0,
    statusUpdateModalStatus: false,
    statusError:[]
  },
  mutations: {
    SET_APPLICATION(state, application) {
      state.applications = application;
    },
    SET_TOTAL_APPLICATION(state, totalApplications) {
      state.totalApplications = totalApplications;
    },
  },
  actions: {
    async fetchApplications({ commit },config= {}) {
      try {
        const response = await api.get('/application');
        commit('SET_APPLICATION', response.data.data);
        commit('SET_TOTAL_APPLICATION', response.data.meta.total);
      } catch (error) {
        console.error('Error fetching application:', error);
      }
    },
    async updateStatus({ commit,dispatch }, { status, applicationId }) {
      try {
        await api.put(`/application/${applicationId}`, { 'status':status });
        dispatch('fetchApplications')
      } catch (error) {
        console.error('Error updating lead status:', error);
      }
    },
  },

};
