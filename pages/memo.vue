<template>
  <div class="text-center h-[800px]">
    検索<br /><input
      type="text"
      class="border"
      placeholder="検索ワード"
    /><br />
    <button type="button">
      <img src="../static/newmemo.png" class="h-10" @click="openModal()" />
    </button>
    <br />
    <hr />
    <div class="relative h-[800px]">
      <!-- メモ一覧 -->
      <div class="w-[25%] h-[705px] border-r-2">
        <div
          class="bg-white p-7 top-0 shadow-md border-2 cursor-pointer hover:bg-gray-200 rounded-md w-[100%] relative overflow-y-scroll"
          v-for="memo of memos"
          v-bind:key="memo.id"
          @click="getDetail(memo.id)"
        >
          <h3
            class="absolute top-1 left-2 text-left text-xl text-gray-800 font-semibold w-[80%] overflow-ellipsis overflow-hidden"
          >
            {{ memo.title }}
          </h3>
          <p
            class="absolute text-gray-400 top-7 text-left left-4 w-[70%] overflow-ellipsis overflow-hidden"
          >
            {{ memo.contents }}
          </p>
          <p class="absolute bottom-1 right-1 text-xs text-gray-400">
            {{ memo.date }}
          </p>
        </div>
      </div>
      <!-- メモ詳細 -->
      <div
        class="absolute w-[75%] h-[800px] top-0 right-0 overflow-y-scroll"
        v-if="detailFlag"
      >
        タイトル<br />
        <input
          type="text"
          class="w-[80%] border-2"
          v-model="details.title"
        /><br />
        内容<br />
        <textarea
          name=""
          id=""
          cols="80"
          rows="23"
          class="border-2 w-[80%] resize-none"
          v-model="details.contents"
        ></textarea>
        <br />
        <button
          type="button"
          @click="updateMemo(details.id)"
          class="text-white py-2 px-4 rounded bg-blue-700"
        >
          登録
        </button>
        <button
          type="button"
          @click="deleteMemo(details.id)"
          class="text-white py-2 px-4 rounded bg-blue-700"
        >
          削除
        </button>
      </div>
    </div>
    <!-- childFalseModalを子から受け取って親のfalseModalを発火させる -->
    <new-memo-modal
      @childFalseModal="falseModal"
      @childGetMemo="getMemo"
      v-if="modalFlag"
      class="left-0 fixed z-10 top-0"
    ></new-memo-modal>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  useContext,
  useRouter,
  useStore,
} from "@nuxtjs/composition-api";
import format from "date-fns/esm/format";
import newMemoModal from "~/components/newMemoModal.vue";

export default defineComponent({
  components: { newMemoModal },
  setup() {
    const store = useStore();
    const { $axios } = useContext();
    const modalFlag = ref(false);
    const memos = ref(new Array());
    const router = useRouter();
    const loginFlag = store.getters.getLoginFlag;

    // ログインしていなければトップページに飛ばす
    if (loginFlag === false) {
      router.push("/");
    }
    // モーダルを開く
    const openModal = () => {
      modalFlag.value = true;
    };
    // モーダルを閉じる
    const falseModal = () => {
      modalFlag.value = false;
    };
    // 現在ログインしているユーザー情報を取得
    const user = store.getters.getLoginUser;
    // ログインしているユーザーIDからメモをとってくる
    const getMemo = async () => {
      const res = await $axios.get(
        `https://api-rks-generator.herokuapp.com/memo/memo/${user.id}`
      );
      memos.value = res.data;
      console.log(memos.value);
    };
    getMemo();

    // メモの一覧を押したときに詳細を表示する
    let details = ref("");
    // 初期は何も選択されていないので詳細画面には何も表示しない
    const detailFlag = ref(false);
    const getDetail = (id: number) => {
      // 配列の何番目に押したメモがあるか検索
      const index = memos.value.findIndex((memo) => memo.id === id);
      // 詳細用の変数に押したメモを代入する
      details.value = memos.value[index];
      console.log(details.value);
      // 詳細用の画面を表示
      detailFlag.value = true;
    };
    // 編集する
    const updateMemo = async (id: number) => {
      const res = await $axios.post(
        "https://api-rks-generator.herokuapp.com/memo/memo/update",
        {
          id: id,
          detail: details.value,
          date: format(new Date(), "yyyy/MM/dd"),
        }
      );
      console.log(res.data);
    };

    const deleteMemo = async (id: number) => {
      const res = await $axios.post(
        "https://api-rks-generator.herokuapp.com/memo/memo/delete",
        { id: id }
      );
      // 消したらdetailを非表示にする
      detailFlag.value = false;
      // 再度データベースからメモを取って来る
      getMemo();
    };

    return {
      modalFlag,
      openModal,
      falseModal,
      memos,
      getMemo,
      getDetail,
      details,
      detailFlag,
      updateMemo,
      deleteMemo,
    };
  },
});
</script>

<style></style>
