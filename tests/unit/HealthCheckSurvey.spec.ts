import { expect } from "chai";
import { shallowMount } from "@vue/test-utils";
import HealthCheckSurvey from "@/components/HealthCheckSurvey.vue";
import SurveyQuestion from "@/components/SurveyQuestion.vue";
import { HealthCheckStore } from "@/modules/vuex/HealthCheckStore";
import Vuex from 'vuex';
import Vue from 'vue';

Vue.use(Vuex);


describe("HealthCheckSurvey.vue", () => {
  const store = new Vuex.Store({
    modules: {
      HealthCheckStore
    }
  })
  let subject: any

  beforeEach(async () => {
    subject = shallowMount(HealthCheckSurvey, {store})
    await Vue.nextTick()
  });

  it("should load a list of survey questions", () => {
    expect(subject.findAll(SurveyQuestion).wrappers.length).to.not.equal(0);
  });
});
 