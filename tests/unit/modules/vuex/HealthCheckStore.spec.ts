import { expect } from "chai";
import { HealthCheckStore } from '@/modules/vuex/HealthCheckStore';
import Vuex from 'vuex';
import Vue from 'vue';

Vue.use(Vuex)

describe('HealthCheckStore', () => {
  const store = new Vuex.Store({
    modules: {
      HealthCheckStore
    }
  })
  
  const subject = store.state.HealthCheckStore
  
  context('State', () => {
    it('should contain the correct initial state for someString', () => {
      expect(subject.someString).to.equal('yodawg');
    })
  });

});
