<template>
  <div id="health-check-survey">
    <SurveyQuestion 
    v-for="question in questionsList"
    :key="question.id"
    :question="question.text"
    :index="question.id"/>
  </div>

</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { AppConfiguration as Configuration } from "@/AppConfiguration.ts";
import { HealthCheck } from "@/modules/HealthCheck";
import SurveyQuestion from "@/components/SurveyQuestion.vue";
import { mapActions, mapGetters } from "vuex";
@Component({
  components: {
    SurveyQuestion
  },
  computed: mapGetters("HealthCheckStore", ["questionsList"]),
  methods: mapActions("HealthCheckStore", ["loadQuestions"])
})
export default class HealthCheckSurvey extends Vue {
  config: Configuration;

  constructor() {
    super();
    this.config = Configuration.getInstance();
  }

  mounted() {
    this.load();
  }

  load() {
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
    this.loadQuestions(questions);
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
