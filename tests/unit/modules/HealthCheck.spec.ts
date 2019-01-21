import { expect } from "chai";
import { HealthCheck } from "@/modules/HealthCheck"

describe.only('HealthCheck.ts', () => {
  context('Survey', ()=> {

    it('constructs a survey properly', () => {
      let survey: HealthCheck.Survey = new HealthCheck.Survey(1, [])
      expect(survey.questions).to.be.empty
      expect(survey.groupId).to.equal(1)
    })

    it('Survey Validator correctly validates a valid survey', () => {
      let survey: HealthCheck.Survey = new HealthCheck.Survey(1,[
        new HealthCheck.Question(0, "Some question", HealthCheck.Proficiency.Aware)
      ])
      expect(HealthCheck.SurveyValidator.validates(survey)).to.be.true
    })

    it('Survey Validator correctly validates an invalid survey', () => {
      let survey: HealthCheck.Survey = new HealthCheck.Survey(1,[
        new HealthCheck.Question(0, "Some question", HealthCheck.Proficiency.Unknown)
      ])
      expect(HealthCheck.SurveyValidator.validates(survey)).to.be.false
    })
  });
});