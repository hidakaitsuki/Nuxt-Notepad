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
      <div class="w-[25%] h-[705px] border-2">
        <div
          class="bg-white p-6 shadow-md border-2 cursor-pointer hover:bg-gray-200 rounded-md w-[100%] relative"
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
      <div class="absolute w-[75%] h-[800px] top-0 right-0">
        {{ details.title }}
        {{ details.contents }}

        <button type="button">登録</button>
        <button type="button">削除</button>
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
    const getDetail = (id: number) => {
      // 配列の何番目に押したメモのがあるか検索
      const index = memos.value.findIndex((memo) => memo.id === id);
      details.value = memos.value[index];
      console.log(details.value);
    };

    return {
      modalFlag,
      openModal,
      falseModal,
      memos,
      getMemo,
      getDetail,
      details,
    };
  },
});
</script>

<style></style>
