import Vue from "vue";
import Vuex from "vuex";
import { HealthCheckStore } from '@/modules/vuex/HealthCheckStore';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  modules: {    
    HealthCheckStore,
  }
});
