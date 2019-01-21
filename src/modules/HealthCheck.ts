export namespace HealthCheck {

  export class Survey {
    groupId: number
    questions: Array<Question>

    constructor(groupId: number, questions: Array<Question>) {
      this.groupId = groupId
      this.questions = questions
    }
  }

  export class SurveyValidator {

    static validates(survey: Survey) {
      for(let i = 0; i < survey.questions.length; i++) {
        if (survey.questions[i].proficiency === 0) { return false }
      }
      return true
    }
  }
  
  export class Question {
    id: number
    text: string
    proficiency: Proficiency
    constructor(id: number, text: string, proficiency: Proficiency) {
      this.id = id;
      this.text = text
      this.proficiency = proficiency;
    }
  }
  
  export enum Proficiency {
    Unknown,
    None,
    Aware,
    Novice,
    Intermediate,
    Advanced,
    Expert
  }
}


