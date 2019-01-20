import { expect } from "chai";
import { shallowMount } from "@vue/test-utils";
import HealthCheckSurvey from "@/components/HealthCheckSurvey.vue";

describe("HealthCheckSurvey.vue", () => {
  it("should properly load the questions from the config", () => {
    const subject = shallowMount(HealthCheckSurvey);
    expect(subject.text()).to.equal(3)
  });
});
 