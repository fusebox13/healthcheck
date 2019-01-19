<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HealthCheckSurvey/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import HealthCheckSurvey from "@/components/HealthCheckSurvey.vue"; // @ is an alias to /src

@Component({
  components: {
    HealthCheckSurvey
  }
})
export default class Home extends Vue {}
</script>
