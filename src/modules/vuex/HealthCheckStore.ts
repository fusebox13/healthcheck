import {Module, VuexModule, Mutation, Action} from 'vuex-module-decorators'
import { HealthCheck } from '@/modules/HealthCheck';

@Module({namespaced: true})
export class HealthCheckStore extends VuexModule {
  someString: string = 'yodawg'
  questions: Array<HealthCheck.Question> = []
  
  get questionsList() {
    return this.questions
  }
  
  @Mutation populate(payload: string) { this.someString = payload}
  
  @Mutation setProficiency({index, proficiency}:any) {
    this.questions[index].proficiency = proficiency
  }

  @Mutation updateQuestionsList(questions: Array<HealthCheck.Question>) {
    this.questions = questions;
  }

  @Action({commit: 'updateQuestionsList'}) loadQuestions(questions: Array<HealthCheck.Question>) {
    return questions
  }
}