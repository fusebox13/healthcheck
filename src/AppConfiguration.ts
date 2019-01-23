import * as survey from './survey.json'
import * as aws from './aws.json'

class AppConfiguration {

  private static instance: AppConfiguration

  public questions: string[];
  public aws: any = {
    rootUrl: '',
    apiKey: ''
  }

  constructor(questions: string[]) {
    this.questions = questions
    this.aws.rootUrl = aws.rootUrl
    this.aws.apiKey = aws.apiKey
  }

  static getInstance() : AppConfiguration {
    if (!AppConfiguration.instance) {
      AppConfiguration.instance = new AppConfiguration(survey.questions)
    }
    return AppConfiguration.instance
  }
}

export { AppConfiguration }