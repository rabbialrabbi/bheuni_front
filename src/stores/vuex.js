import { createStore } from 'vuex';
import leads from '@/stores/modules/leads';
import applications from "@/stores/modules/applications";
import auth from  "@/stores/modules/auth";

const store = createStore({
  modules: {
    auth,
    leads,
    applications
  }
});

export default store;
