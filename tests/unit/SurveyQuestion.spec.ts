import { expect } from "chai";
import { shallowMount, createLocalVue } from "@vue/test-utils"
import SurveyQuestion from "@/components/SurveyQuestion.vue"
import { HealthCheckStore } from "@/modules/vuex/HealthCheckStore"
import { HealthCheck } from "@/modules/HealthCheck"
import Vuex from 'vuex'
import Vue from 'vue'

const localVue = createLocalVue()
localVue.use(Vuex)

describe.only("HealthCheckSurvey.vue", () => {
  
  const store = new Vuex.Store({
    modules: {
      HealthCheckStore
    }
  })

  let subject: any

  const fakeQuestion: HealthCheck.Question =
    new HealthCheck.Question(0, 'Some Question?', HealthCheck.Proficiency.Unknown)


  beforeEach(async () => {
    subject = shallowMount(SurveyQuestion, {
      propsData: {
        question: fakeQuestion
      },
      store,
      localVue
    })
    subject.vm.$store.dispatch('HealthCheckStore/newSurvey', 2)
    await Vue.nextTick()
  })

  context('Survey Question', () => {
    it("should load a list of survey questions", () => {
      expect(subject.find("[data-qa=question-text]").text()).to.equal(fakeQuestion.text);
    })
  })

  context('Proficiency Buttons', () => {
    it('should load a list of buttons to select proficiencies', () => {
      const buttons = subject.findAll('button')
      let expectedProficiences = subject.vm.extractProficiencies(HealthCheck.Proficiency)
      for (let i = 0; i < expectedProficiences.length; i++) {
        expect(buttons.at(i).text()).to.equal(expectedProficiences[i])
      }
    })
  
    it('does not include the null case "Unknown" button', () => {
      let expectedProficiences = subject.vm.extractProficiencies()
      expect(expectedProficiences).to.not.contain(HealthCheck.Proficiency[0])
    })

    //TODO: Tests implementation details, could not get the test to work any other way
    it('should select a button when it is clicked', async () => {
      const buttons = subject.findAll('button')
      buttons.wrappers[0].trigger('click')
      expect(subject.vm.$store.state.HealthCheckStore.survey.questions[0].proficiency).to.equal(1);
    })
  })

  
})
 