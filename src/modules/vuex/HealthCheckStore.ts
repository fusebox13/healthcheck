import {Module, VuexModule, Mutation, Action} from 'vuex-module-decorators'
import { HealthCheck } from '@/modules/HealthCheck';
import { AppConfiguration as Configuration } from "@/AppConfiguration.ts";

@Module({namespaced: true})
export class HealthCheckStore extends VuexModule {
  someString: string = 'yodawg'
  questions: Array<HealthCheck.Question> = []
  survey: HealthCheck.Survey = new HealthCheck.Survey(-1, [])
  surveyCollection: HealthCheck.SurveyCollection = new HealthCheck.SurveyCollection()
  config: Configuration = Configuration.getInstance()
  
  get questionsList() {
    return this.questions
  }

  get healthCheckSurvey() : HealthCheck.Survey {
    return this.survey
  }

  get surveyIncomplete() : boolean {
    return !HealthCheck.SurveyValidator.validates(this.survey)
  }
  
  @Mutation setProficiency({question, proficiency}:any) {
    if (this.survey.questions.length) {
      this.survey!.questions![question.id].proficiency = proficiency
    }
  }

  @Mutation updateQuestionsList(questions: Array<HealthCheck.Question>) {
    this.questions = questions;
  }

  @Mutation generateNewSurvey(groupId: number) {
    let questions: Array<HealthCheck.Question> = [];
    this.config.questions.forEach((question, index) => {
      questions.push(
        new HealthCheck.Question(
          index,
          question,
          HealthCheck.Proficiency.Unknown
        )
      );
    });
    this.survey = new HealthCheck.Survey(groupId, questions)
  }

  @Mutation pushSurvey(groupId: number) {
    this.surveyCollection.addSurvey(this.survey)
    console.log(this.surveyCollection.get(this.survey.groupId).length)
  }

  @Action({commit: 'updateQuestionsList'}) loadQuestions(questions: Array<HealthCheck.Question>) {
    return questions
  }

  @Action({commit: 'generateNewSurvey'}) newSurvey(groupId: number) {
    return groupId
  }
}