import { expect } from "chai";
import { HealthCheck } from "@/modules/HealthCheck"

describe('HealthCheck.ts', () => {
  context('Survey', ()=> {

    it('constructs a survey properly', () => {
      let survey: HealthCheck.Survey = new HealthCheck.Survey(1, [])
      expect(survey.questions).to.be.empty
      expect(survey.groupId).to.equal(1)
    })
  });

  context('SurveyValidator', () => {
    
    it('correctly validates a valid survey', () => {
      let survey: HealthCheck.Survey = new HealthCheck.Survey(1,[
        new HealthCheck.Question(0, "Some question", HealthCheck.Proficiency.Aware)
      ])
      expect(HealthCheck.SurveyValidator.validates(survey)).to.be.true
    })

    it('correctly validates an invalid survey', () => {
      let survey: HealthCheck.Survey = new HealthCheck.Survey(1,[
        new HealthCheck.Question(0, "Some question", HealthCheck.Proficiency.Unknown)
      ])
      expect(HealthCheck.SurveyValidator.validates(survey)).to.be.false
    })
  })

  context('SurveyCollection', () => {
    let survey: HealthCheck.Survey;
    const groupId: number = 1;

    beforeEach(()=> {
      survey = new HealthCheck.Survey(groupId,[
        new HealthCheck.Question(0, "Some question", HealthCheck.Proficiency.Aware)
      ])
    })

    it('should add a new survey to a new collection for the groupId', () => {
      
      let surveyCollection: HealthCheck.SurveyCollection = new HealthCheck.SurveyCollection()
      surveyCollection.addSurvey(survey)
      expect(surveyCollection.get(groupId).length).to.equal(1)
    })

    it('should return an empty list if no surveys exist for the groupId', () => {
      let surveyCollection: HealthCheck.SurveyCollection = new HealthCheck.SurveyCollection()
      expect(surveyCollection.get(groupId).length).to.equal(0)
    })
  })

  context('SurveyCollectionAggregator', () => {
    let groupId: number = 1
    let surveyCollection: HealthCheck.SurveyCollection
    let firstSurvey: HealthCheck.Survey = new HealthCheck.Survey(groupId, [])
    let secondSurvey: HealthCheck.Survey = new HealthCheck.Survey(groupId, [])
    let thirdSurvey: HealthCheck.Survey = new HealthCheck.Survey(groupId, [])
    beforeEach(() => {
      surveyCollection = new HealthCheck.SurveyCollection()

      for (let i = 0; i < 10; i++) {
        firstSurvey.questions.push(new HealthCheck.Question(i,`Some question ${i}`, HealthCheck.Proficiency.None))
        secondSurvey.questions.push(new HealthCheck.Question(i,`Some question ${i}`, HealthCheck.Proficiency.Novice))
        thirdSurvey.questions.push(new HealthCheck.Question(i,`Some question ${i}`, HealthCheck.Proficiency.Aware))
      }
      surveyCollection.addSurvey(firstSurvey)
      surveyCollection.addSurvey(secondSurvey)
      surveyCollection.addSurvey(thirdSurvey)
    });

    it('should do stuff', () => {
      HealthCheck.SurveyCollectionAggregator.getAggregates(groupId, surveyCollection)
    });

  })
});