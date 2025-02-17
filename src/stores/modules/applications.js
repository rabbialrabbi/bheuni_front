import api from "@/_helper/api";

export default {
  namespaced: true,
  state: {
    application: [],
    statusUpdateModalStatus: false,
    statusError:[]
  },
  mutations: {
    SET_APPLICATION(state, application) {
      state.application = application;
    },
  },
  actions: {
    async fetchApplications({ commit },config= {}) {
      try {
        const response = await api.get('/application');
        commit('SET_APPLICATION', response.data.data);
      } catch (error) {
        console.error('Error fetching application:', error);
      }
    },
    async updateStatus({ commit,dispatch }, { status, leadId }) {
      try {
        await api.put(`/application/${leadId}/status`, { 'status':status });
        dispatch('fetchApplications')
      } catch (error) {
        console.error('Error updating lead status:', error);
      }
    },
  },

};
