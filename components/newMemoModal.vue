<template>
  <div
    class="h-screen w-screen flex flex-col items-center justify-center bg-gray-400 bg-opacity-80 font-sans"
  >
    <div
      class="h-screen w-full absolute flex items-center justify-center bg-modal"
    >
      <div
        class="bg-white rounded shadow p-8 m-4 w-[80%] h-[80%] max-h-full text-center overflow-y-scroll"
      >
        <div class="mb-8">
          <p>タイトル</p>
          <input type="text " size="100" class="border-2" />
        </div>

        <div>
          <p>内容</p>
          <textarea type="text" class="border-2" rows="20" cols="100"/>
        </div>
        <div class="flex justify-center">
          <button
            class=" mr-2 flex-no-shrink text-white py-2 px-4 rounded bg-blue-700 hover:bg-teal-dark"
            type="button"

          >
            新規作成
          </button>
          <button
            class="flex-no-shrink text-white py-2 px-4 rounded bg-blue-700 hover:bg-teal-dark"
            type="button"
            @click="childFalseModal"
          >
            キャンセル
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "@nuxtjs/composition-api";

export default defineComponent({
  setup(props, context) {
    const childFalseModal = () => {
      // 親に"childFalseModal"としてメソッドを渡す
      context.emit("childFalseModal");
    };
    return { childFalseModal };
  },
});
</script>

<style></style>
