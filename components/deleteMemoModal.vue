<template>
  <div>
    <div
      class="h-screen w-screen flex flex-col items-center justify-center bg-gray-400 bg-opacity-80 font-sans"
    >
      <div
        class="h-screen w-full absolute flex items-center justify-center bg-modal"
      >
        <div
          class="!bg-white rounded shadow p-8 m-4 max-w-xs max-h-full text-center overflow-y-scroll"
        >
          <div class="mb-4"></div>
          <div class="mb-8">
            <p>削除してよろしいですか？</p>
          </div>
          <div class="flex justify-center">
            <button
              class="mr-2 flex-no-shrink text-white py-2 px-4 rounded bg-blue-700"
              type="button"
              @click="deleteMemo()"
            >
              削除
            </button>
            <button
              class="flex-no-shrink text-white py-2 px-4 rounded bg-blue-700"
              type="button"
              @click="cancel()"
            >
              キャンセル
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  useContext,
  useRouter,
  useStore,
} from "@nuxtjs/composition-api";

export default defineComponent({
  props: {
    // メモID
    id: Number,
  },
  setup(props, context) {
    const store = useStore();
    const router = useRouter();
    const { $axios } = useContext();
    /**
     * メモを削除する.
     * @param id -削除するメモID
     */
    const deleteMemo = async (id: number) => {
      const res = await $axios.post(
        "https://api-rks-generator.herokuapp.com/memo/memo/delete",
        { id: props.id }
      );
      // 削除したことを親に伝える（詳細を非表示、再度メモを取得する処理を発火させる）
      context.emit("deleted");
    };

    /**
     * 削除をキャンセルする.
     */
    const cancel = () => {
      // 親に"childFalseModal"としてメソッドを渡す
      context.emit("childFalseModal");
    };
    return { cancel, deleteMemo };
  },
});
</script>

<style></style>
