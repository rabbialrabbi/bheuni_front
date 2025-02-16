import { createStore } from 'vuex';
import leads from './modules/leads';

const store = createStore({
  modules: {
    leads
  }
});

export default store;
