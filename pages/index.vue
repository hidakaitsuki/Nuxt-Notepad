<template>
  <div class="relative">
    <transition :appear="true">
      <div
        class="flex justify-center mx-auto bg-topimg bg-cover h-[100vh] bg-no-repeat"
      ></div>
    </transition>
    <h1
      class="text-[80px] text-white w-[100%] text-center absolute top-10 font-ui"
    >
      仕事もプライベートもすっきり整理
    </h1>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { defineComponent } from "@nuxtjs/composition-api";

export default defineComponent({
  setup() {},
});
</script>

<style scoped>
.v-enter-active {
  transition: opacity 2s;
}
.v-enter {
  opacity: 0;
}
.v-enter-to {
  opacity: 1;
}
</style>
