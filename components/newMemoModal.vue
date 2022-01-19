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
          <input type="text " size="100" class="border-2" v-model="title" />
        </div>

        <div>
          <p>内容</p>
          <textarea
            type="text"
            class="border-2"
            rows="20"
            cols="100"
            v-model="contents"
          />
        </div>
        <div class="flex justify-center">
          <button
            class="mr-2 flex-no-shrink text-white py-2 px-4 rounded bg-blue-700 hover:bg-blue-500"
            type="button"
            @click="createMemo()"
          >
            新規作成
          </button>
          <button
            class="flex-no-shrink text-white py-2 px-4 rounded bg-blue-700 hover:bg-blue-500"
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
import {
  defineComponent,
  ref,
  useContext,
  useStore,
} from "@nuxtjs/composition-api";
import format from "date-fns/format";

export default defineComponent({
  setup(props, context) {
    const { $axios } = useContext();
    const store = useStore();
    // 入力されたタイトル
    const title = ref("");
    // 入力された内容
    const contents = ref("");
    // ログインしているユーザー情報を取得する
    const user = store.getters.getLoginUser;

    /**
     * メモを新規作成する
     */
    const createMemo = async () => {
      // 今の日付を取得
      const date = format(new Date(), "yyyy/MM/dd");
      const res = await $axios.post(
        "https://api-rks-generator.herokuapp.com/memo/memo",
        {
          title: title.value,
          contents: contents.value,
          date: date,
          user: user,
        }
      );
      // モーダルを閉じる（親のmodalFlagをfalseにさせる）
      context.emit("childFalseModal");
      // 新規作成時にメモ一覧をを再取得
      context.emit("childGetMemo");
    };

    /**
     * キャンセルする.
     */
    const childFalseModal = () => {
      // 親に"childFalseModal"としてメソッドを渡す
      context.emit("childFalseModal");
    };
    return { title, contents, childFalseModal, createMemo };
  },
});
</script>

<style></style>
