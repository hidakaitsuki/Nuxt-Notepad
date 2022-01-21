<template>
  <div>
    <div class="h-28 bg-white shadow-md bottom-0 relative">
      <img
        src="../static/logo.png"
        class="h-28 ml-2 cursor-pointer"
        @click="top()"
      />
      <nuxt-link to="/">
        <h1
          class="absolute top-0 w-full h-full flex justify-center items-center font-header text-4xl lg:text-8xl lg:top-[-10px]"
        >
          Notepad
        </h1>
      </nuxt-link>
      <div class="mt-10 absolute right-1 top-0 text-right hidden lg:block">
        <nuxt-link
          to="/memo"
          class="mr-10 font-ui font-bold"
          v-if="loginFlag === true"
          ><img
            src="../static/headmemo.jpg"
            class="h-5 inline-block"
            alt=""
          />メモ帳</nuxt-link
        >
        <nuxt-link to="/register" class="font-ui font-bold pr-3 mr-5">
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
      </div>
      <!-- スマホ用 -->
      <div
        class="float-right h-28 w-[25%] text-xs absolute right-1 top-3 lg:hidden"
      >
        <div class="w-full m-auto">
          <nuxt-link
            to="/memo"
            class="mr-10 font-ui font-bold"
            v-if="loginFlag === true"
            ><img
              src="../static/headmemo.jpg"
              class="h-4 inline-block"
              alt=""
            />メモ帳</nuxt-link
          >
        </div>
        <div class="w-full mt-3">
          <nuxt-link to="/register" class="font-ui font-bold pr-3">
            <img
              src="../static/registericon.jpg"
              class="h-4 inline-block mr-[-3px] mb-1"
              alt=""
            />
            会員登録</nuxt-link
          >
        </div>
        <div class="w-full mt-3">
          <nuxt-link
            to="/login"
            class="font-ui font-bold pr-3"
            v-if="loginFlag === false"
            ><img
              src="../static/loginlogo.jpg"
              class="h-4 inline-block mr-[-5px] lg:mr-[-8px] opacity-80"
              alt=""
            />
            ログイン</nuxt-link
          >
        </div>
        <div class="w-full mt-3">
          <button
            id="logout"
            type="button"
            class="font-ui font-bold"
            v-if="loginFlag === true"
            @click="logOut()"
          >
            <img
              src="../static/logout.jpg"
              class="h-4 inline-block mr-[-5px]"
              alt=""
            />
            ログアウト
          </button>
        </div>
      </div>
    </div>
    <!-- childFalseModalを子から受け取って親のfalseModalを発火させる -->
    <logout-modal
      class="left-0 fixed z-10 top-0 bottom-0"
      @childFalseModal="falseModal"
      v-if="logoutModalFlag === true"
    ></logout-modal>
  </div>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  ref,
  useRouter,
  useStore,
} from "@nuxtjs/composition-api";
import logoutModal from "./logoutModal.vue";

export default defineComponent({
  components: { logoutModal },
  setup() {
    const store = useStore();
    // ログアウトモーダルのフラグ
    const logoutModalFlag = ref(false);
    // ログインしているユーザーのフラグ(computedで変更される度に受け取る)
    const loginFlag = computed(() => store.getters.getLoginFlag);

    /**
     *ログアウトするモーダルを開く.
     */
    const logOut = () => {
      logoutModalFlag.value = true;
    };
    /**
     * ログアウトするモーダルを閉じる.
     */
    const falseModal = () => {
      logoutModalFlag.value = false;
    };

    const router = useRouter();
    /**
     * topページに飛ばす.
     */
    const top = () => {
      router.push("/");
    };
    return { loginFlag, logOut, logoutModalFlag, falseModal, top };
  },
});
</script>

<style></style>
