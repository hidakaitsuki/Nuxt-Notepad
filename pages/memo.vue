<template>
  <div class="text-center">
    検索<br /><input
      type="text"
      class="border"
      placeholder="検索ワード"
    /><br />
    <button type="button">
      <img src="../static/newmemo.png" class="h-10" @click="openModal()" />
    </button>

    <div class="bg-white p-6 shadow-md border-2 rounded-md w-[20%]">
      <h3 class="text-xl text-gray-800 font-semibold mb-3">greek salad</h3>
      <p class="mb-2">10 minutes to make</p>
      <p class="my-4">blah blah blah</p>
      <button
        class="text-lg font-semibold text-gray-700 bg-indigo-100 px-4 py-1 block mx-auto rounded-md"
      >
        Cook This
      </button>
    </div>
    <!-- childFalseModalを子から受け取って親のfalseModalを発火させる -->
    <new-memo-modal
      @childFalseModal="falseModal"
      v-if="modalFlag"
      class="left-0 fixed z-10 top-0"
    ></new-memo-modal>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, useStore } from "@nuxtjs/composition-api";
import newMemoModal from "~/components/newMemoModal.vue";

export default defineComponent({
  components: { newMemoModal },
  setup() {
    const store = useStore();
    const modalFlag = ref(false);
    const openModal = () => {
      modalFlag.value = true;
    };
    const falseModal = () => {
      modalFlag.value = false;
    };

    return { modalFlag, openModal, falseModal };
  },
});
</script>

<style></style>
