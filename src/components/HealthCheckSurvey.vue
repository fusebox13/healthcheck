<template>
  <div id="health-check-survey">
    <SurveyQuestion 
    v-for="question in questions"
    :key="question.id"
    :question="question.text"/>
  </div>

</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { AppConfiguration as Configuration } from "@/AppConfiguration.ts";
import { HealthCheck } from "@/modules/HealthCheck";
import SurveyQuestion from "@/components/SurveyQuestion.vue";

@Component({
  components: {
    SurveyQuestion
  }
})
export default class HealthCheckSurvey extends Vue {
  questions: Array<HealthCheck.Question> = [];
  config: Configuration;

  constructor() {
    super();
    this.config = Configuration.getInstance();
  }

  mounted() {
    this.loadQuestions();
  }

  loadQuestions() {
    this.config.questions.forEach((question, index) => {
      this.questions.push(
        new HealthCheck.Question(
          index,
          question,
          HealthCheck.Proficiency.Unknown
        )
      );
    });
  }
}
</script>

<style scoped lang="scss">
#health-check-survey {
  ul {
    list-style-type: none;
  }
}
</style>
