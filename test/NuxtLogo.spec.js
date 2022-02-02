import { createLocalVue, mount } from "@vue/test-utils";
import NuxtLogo from "@/components/NuxtLogo.vue";
import Header from "@/components/Header.vue";
import Vuex from "vuex";
describe("NuxtLogo", () => {
  test("is a Vue instance", () => {
    const wrapper = mount(NuxtLogo);
    expect(wrapper.vm).toBeTruthy();
  });
});

describe("hesder", () => {
  test("existheader", () => {
    const localvue = createLocalVue();
    localvue.use(Vuex);
    const wrapper = mount(Header);
    const store = new MockedVuex();
    expect(wrapper.html()).toContain("Notepad");
  });
});
