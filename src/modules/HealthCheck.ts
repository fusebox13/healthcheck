export namespace HealthCheck {
  
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


