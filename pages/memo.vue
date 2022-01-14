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
    <br />
    <div
      class="bg-white p-6 shadow-md border-2 rounded-md w-[20%] h-[200px]"
      v-for="memo of memos"
      v-bind:key="memo.id"
    >
      <h3 class="text-xl text-gray-800 font-semibold mb-3">{{ memo.tite }}</h3>
      <p class="mb-2">{{ memo.contents }}</p>
      <p class="my-4">{{ memo.date }}</p>
      <button
        class="text-lg font-semibold text-gray-700 bg-indigo-100 px-4 py-1 block mx-auto rounded-md"
      >
        Cook This
      </button>
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
    return { modalFlag, openModal, falseModal, memos, getMemo };
  },
});
</script>

<style></style>
