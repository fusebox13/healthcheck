export namespace HealthCheck {

  export class SurveyCollection {
    private collection:Map<number, Array<Survey>>;

    constructor(){
      this.collection = new Map<number, Array<Survey>>()
    }
    

    addSurvey(survey: Survey){
      if (!this.collection.has(survey!.groupId)) {
        this.collection.set(survey!.groupId, new Array<Survey>())
      }
      this.collection.get(survey!.groupId)!.push(survey)
    }

    get(groupId: number) : Array<Survey> {
      if (!this.collection.has(groupId)) { return [] }
      return this.collection.get(groupId)!;
    }
  }

  export class SurveyCollectionAggregator {

    static getAggregates(groupId: number, collection: SurveyCollection) {
      collection.get(1).forEach(survey => {
        console.log(survey)
      })
    }

  }

  export class SurveyAggregate {
    
    
  }

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


