import { createStore } from 'vuex';
import leads from '@/stores/modules/leads';
import applications from "@/stores/modules/applications";

const store = createStore({
  modules: {
    leads,
    applications
  }
});

export default store;
