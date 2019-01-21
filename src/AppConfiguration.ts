import * as survey from './survey.json'

class AppConfiguration {

  private static instance: AppConfiguration

  public questions: string[];

  constructor(questions: string[]) {
    this.questions = questions
  }

  static getInstance() : AppConfiguration {
    if (!AppConfiguration.instance) {
      AppConfiguration.instance = new AppConfiguration(survey.questions)
    }
    return AppConfiguration.instance
  }
}

export { AppConfiguration }