import api from "@/_helper/api";

export default {
  namespaced: true,
  state: {
    leads: [],
    activationModalStatus: false,
    statusUpdateModalStatus: false,
    counselors:[],
    assignedError:[],
    statusError:[]
  },
  getters: {
    allLeads: state => state.leads,
    counselorOptions: state => state.counselors.map(c => {
      return {title:c.name,value:c.id}
    }),

  },
  mutations: {
    SET_LEADS(state, leads) {
      state.leads = leads;
    },
    SET_COUNSELOR(state, counselors) {
      state.counselors = counselors;
    },
    ADD_LEAD(state, lead) {
      state.leads.push(lead);
    },
    UPDATE_LEAD_STATUS(state, { id, status }) {
      const lead = state.leads.find(lead => lead.id === id);
      if (lead) lead.status = status;
    }
  },
  actions: {
    async fetchLeads({ commit },config= {}) {
      try {
        const response = await api.get('/leads');
        commit('SET_LEADS', response.data.data);
      } catch (error) {
        console.error('Error fetching leads:', error);
      }
    },
    async fetchCounselor({ commit },config= {}) {
      try {
        const response = await api.get('/counselors');
        commit('SET_COUNSELOR', response.data.data);
      } catch (error) {
        console.error('Error fetching leads:', error);
      }
    },
    async assignCounselor({ commit,dispatch }, { cid, leadId }) {
      try {
        await api.put(`/leads/${leadId}`, { 'counselor_id':cid });
        dispatch('fetchLeads')
      } catch (error) {
        console.error('Error updating lead status:', error);
      }
    },
    async updateStatus({ commit,dispatch }, { status, leadId }) {
      try {
        await api.put(`/leads/${leadId}/status`, { 'status':status });
        dispatch('fetchLeads')
      } catch (error) {
        console.error('Error updating lead status:', error);
      }
    },
    async moveToApplication({ commit,dispatch }, { leadId }) {
      try {
        await api.post(`/leads/${leadId}/application`);
        dispatch('fetchLeads')
      } catch (error) {
        console.error('Error updating lead status:', error);
      }
    },
  },

};
