<template>
  <div>
    <div class="h-28 bg-white opacity-80 shadow-md bottom-0">
      <div>
        <img src="../static/logo.png" class="h-28 ml-2" />
      </div>
      <div class="">
        <h1 class="font-header text-8xl absolute right-[40%] top-0">
          Nuxt-Notepad
        </h1>
      </div>
      <div class="mt-10 left-2 absolute right-1 top-0 text-right">
        <nuxt-link to="/" class="font-ui font-bold pr-3"
          >トップページ</nuxt-link
        >
        <nuxt-link to="/register" class="font-ui font-bold pr-3">
          <img
            src="../static/registericon.jpg"
            class="h-5 inline-block mr-[-3px] mb-1"
            alt=""
          />
          会員登録</nuxt-link
        >
        <nuxt-link
          to="/login"
          class="font-ui font-bold pr-3"
          v-if="loginFlag === false"
          ><img
            src="../static/loginlogo.jpg"
            class="h-5 inline-block mr-[-8px] opacity-80"
            alt=""
          />
          ログイン</nuxt-link
        >

        <button
          id="logout"
          type="button"
          class="font-ui font-bold pr-3"
          v-if="loginFlag === true"
          @click="logOut()"
        >
          <img
            src="../static/logout.jpg"
            class="h-5 inline-block mr-[-5px]"
            alt=""
          />
          ログアウト
        </button>

        <nuxt-link
          to="/memo"
          class="mr-5 font-ui font-bold"
          v-if="loginFlag === true"
          ><img
            src="../static/headmemo.jpg"
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
