<template>
  <div id="survey-question">
    <section>
      <span>{{question}}</span>
    </section>
    <section>
      <button
        v-for="(proficiency, index) in proficiencies"
        :key="index"
        @click="answer(proficiency)">
        {{proficiency}}
      </button>
    </section>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Emit } from "vue-property-decorator";
import { HealthCheck } from "@/modules/HealthCheck";
import { slice } from "lodash";
import { mapState, mapMutations } from "vuex";

@Component({
  methods: mapMutations("HealthCheckStore", ["setProficiency"]),
  computed: { ...mapState("HealthCheckStore", ["someString"]) }
})
export default class SurveyQuestion extends Vue {
  @Prop() private question!: string;
  @Prop() private questionId!: number;
  proficiencies: string[] = [];
  constructor() {
    super();
  }

  @Emit()
  answer(index: number) {
    this.setProficiency({
      questionId: this.questionId,
      proficiency: HealthCheck.Proficiency[index]
    });
  }

  mounted() {
    let proficiencies = Object.keys(HealthCheck.Proficiency);
    this.proficiencies = slice(proficiencies, proficiencies.length / 2 + 1);
  }
}
</script>

<style scoped lang="scss">
</style>
