<template>
  <div id="health-check-survey">
    <select v-model="groupId">
      <option v-for="group in groups" :key="group.id" :value="group.id">{{group.name}}</option>
    </select>
    <SurveyQuestion
      v-for="question in healthCheckSurvey.questions"
      :key="question.id"
      :question="question"
    />
    <button :disabled="surveyIncomplete" @click="complete">complete</button>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import { AppConfiguration as Configuration } from "@/AppConfiguration.ts";
import { HealthCheck } from "@/modules/HealthCheck";
import SurveyQuestion from "@/components/SurveyQuestion.vue";
import { mapActions, mapGetters } from "vuex";
import { AWS } from "@/modules/AWS";
@Component({
  components: {
    SurveyQuestion
  },
  computed: mapGetters("HealthCheckStore", [
    "healthCheckSurvey",
    "surveyIncomplete"
  ])
})
export default class HealthCheckSurvey extends Vue {
  groupId: number = 1;
  groups: any = [
    { id: 1, name: "FIT" },
    { id: 2, name: "ACCOUNT 2.0" },
    { id: 3, name: "A/V" }
  ];
  constructor() {
    super();
  }
  mounted() {
    let item = {
      id: "SomeSupercoolID",
      value: "SomesupercoolValue"
    };

    let lambda: AWS.Lambda = new AWS.Lambda();

    // lambda.getItems('MyTable')
    //   .then((response:any) => response.json())
    //   .then((response: any) => {
    //     console.log(response)
    //   });

    this.load();
  }

  @Watch("groupId")
  onGroupIdChanged(val: number, oldVal: number) {
    this.load();
  }

  complete() {
    this.$store.commit("HealthCheckStore/pushSurvey");
    this.$store.dispatch("HealthCheckStore/newSurvey", this.groupId);
  }

  load() {
    this.$store.dispatch("HealthCheckStore/newSurvey", this.groupId);
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
