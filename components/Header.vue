<template>
  <div>
    <div class="h-32 bg-white opacity-80 shadow-md bottom-0">
      <div>
        <img src="../static/logo.png" class="h-32 ml-2" />
      </div>
      <div class="">
        <h1 class="font-header text-8xl absolute right-[40%] top-0">
          Nuxt-Notepad
        </h1>
      </div>
      <div class="mt-7 left-2 absolute right-1 top-0 text-right">
        <nuxt-link to="/" class="font-ui font-bold pr-3"
          >トップページ</nuxt-link
        >
        <nuxt-link to="/register" class="font-ui font-bold pr-3"
          >会員登録</nuxt-link
        >
        <nuxt-link
          to="/login"
          class="font-ui font-bold pr-3"
          v-if="loginFlag === false"
          ><img
            src="../static/loginlogo.jpg"
            class="h-5 inline-block mr-[-10px]"
            alt=""
          />
          ログイン</nuxt-link
        >
        <button
          type="button"
          class="font-ui font-bold pr-3"
          v-if="loginFlag === true"
          @click="logOut()"
        >
          ログアウト
        </button>
        <nuxt-link
          to="/memo"
          class="mr-5 font-ui font-bold"
          v-if="loginFlag === true"
          ><img
            src="../static/memo.jpg"
            class="h-5 inline-block"
            alt=""
          />メモ帳</nuxt-link
        >
      </div>
    </div>
    <!-- childFalseModalを子から受け取って親のfalseModalを発火させる -->
    <logout-modal
      class="left-0 fixed z-10 top-0 bottom-0"
      @childFalseModal="falseModal"
      v-if="modalFlag === true"
    ></logout-modal>
  </div>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  ref,
  useStore,
} from "@nuxtjs/composition-api";
import logoutModal from "./logoutModal.vue";

export default defineComponent({
  components: { logoutModal },
  setup() {
    const store = useStore();
    const modalFlag = ref(false);
    const loginFlag = computed(() => store.getters.getLoginFlag);
    const logOut = () => {
      modalFlag.value = true;
    };
    const falseModal = () => {
      modalFlag.value = false;
    };
    return { loginFlag, logOut, modalFlag, falseModal };
  },
});
</script>

<style></style>
