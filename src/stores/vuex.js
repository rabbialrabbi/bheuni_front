import { createStore } from 'vuex';

const store = createStore({
  state: {
    user: null,   // Stores authenticated user data
    leads: [],    // Stores all leads
  },

  mutations: {
    SET_USER(state, user) {
      state.user = user;
    },
    SET_LEADS(state, leads) {
      state.leads = leads;
    },
    ADD_LEAD(state, lead) {
      state.leads.push(lead);
    },
  },

  actions: {
    login({ commit }, userData) {
      commit('SET_USER', userData);
    },

    fetchLeads({ commit }) {
      // Simulating an API call
      const dummyLeads = [
        { id: 1, name: "John Doe", status: "In Progress" },
        { id: 2, name: "Jane Smith", status: "New" },
      ];
      commit('SET_LEADS', dummyLeads);
    },

    addLead({ commit }, lead) {
      commit('ADD_LEAD', lead);
    },
  },

  getters: {
    getUser: state => state.user,
    getLeads: state => state.leads,
  }
});

export default store;
