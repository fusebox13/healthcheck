<template>
  <div id="health-check-survey">
    <SurveyQuestion
      v-for="question in healthCheckSurvey.questions"
      :key="question.id"
      :question="question"
    />
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
  computed: mapGetters("HealthCheckStore", [
    "questionsList",
    "healthCheckSurvey"
  ])
})
export default class HealthCheckSurvey extends Vue {
  constructor() {
    super();
  }
  mounted() {
    this.load();
  }

  load() {
    this.$store.dispatch("HealthCheckStore/newSurvey", 1);
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
