<template>
  <div id="survey-question">
    <section id="question">
      <span data-qa="question-text">{{question.text}}</span>
    </section>
    <section id="proficiency-buttons">
      <!-- TODO: Clean this up -->
      <button
        v-for="(proficiency, index) in proficiencies"
        :class="{selected: isActive(index + 1), new: true}"
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
  computed: { ...mapState("HealthCheckStore", ["someString"]) }
})
export default class SurveyQuestion extends Vue {
  @Prop() private question!: HealthCheck.Question;
  proficiencies: string[] = [];
  constructor() {
    super();
  }

  @Emit()
  answer(proficiency: HealthCheck.Proficiency) {
    proficiency = proficiency || HealthCheck.Proficiency.Unknown;
    //mapActions cannot be used with Typescript currently
    this.$store.commit("HealthCheckStore/setProficiency", {
      question: this.question,
      proficiency: HealthCheck.Proficiency[proficiency]
    });
  }

  isActive(proficiency: number) {
    //TODO: This is an ugly side effect of improperly using enums.
    //with vuex. There must be a better way to enforce type

    return proficiency === this.question.proficiency;
  }

  extractProficiencies(): Array<string> {
    let proficiencies = Object.keys(HealthCheck.Proficiency);
    return slice(proficiencies, proficiencies.length / 2 + 1);
  }

  mounted() {
    this.proficiencies = this.extractProficiencies();
  }
}
</script>

<style scoped lang="scss">
#survey-question {
  #proficiency-buttons {
    button {
      &.selected {
        color: red;
      }
    }
  }
}
</style>
