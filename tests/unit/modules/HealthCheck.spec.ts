import { expect } from "chai";
import { HealthCheck } from "@/modules/HealthCheck"

describe('HealthCheck.ts', () => {
  context('Survey', ()=> {

    it('constructs a survey properly', () => {
      let survey: HealthCheck.Survey = new HealthCheck.Survey(1, [])
      expect(survey.questions).to.be.empty
      expect(survey.groupId).to.equal(1)
    });
  });
});