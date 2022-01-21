<template>
  <div class="w-full h-[80vh] flex">
    <img
      src="https://images.unsplash.com/photo-1540569876033-6e5d046a1d77?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80"
      alt="background"
      class="object-cover object-center h-[80vh] w-7/12 hidden lg:block"
    />
    <div
      class="bg-white flex flex-col justify-center items-center w-full p-6 shadow-lg"
    >
      <h1 class="text-5xl font-bold text-yellow-500">LOGIN</h1>
      <div class="h-24 w-[100%] pt-4">
        <p
          class="text-red-500 text-center"
          v-for="error of errorMessage"
          :key="error"
        >
          {{ error }}
        </p>
      </div>
      <div class="text-center">
        <input
          type="text"
          name="username"
          placeholder="username"
          autocomplete="off"
          class="shadow-md border w-full h-10 px-3 py-2 text-yellow-500 focus:outline-none focus:border-orange-500 mb-8 rounded"
          v-model="email"
        />
        <input
          type="password"
          name="password"
          placeholder="password"
          autocomplete="off"
          class="shadow-md border w-full h-10 px-3 py-2 text-yellow-500 focus:outline-none focus:border-orange-500 mb-8 rounded"
          v-model="password"
        />
        <button
          class="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded text-lg focus:outline-none shadow"
          @click="login()"
        >
          Sign In
        </button>
        <br />
      </div>
    </div>
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

export default defineComponent({
  setup() {
    const { $axios } = useContext();
    const router = useRouter();
    const store = useStore();
    // 入力されたメールアドレス
    const email = ref("");
    // 入力されたパスワード
    const password = ref("");
    // エラーメッセージ
    const errorMessage = ref(new Array());

    /**
     * ログインする.
     */
    const login = async () => {
      // エラーがあるかのフラグ
      const errorFlag = ref(false);
      // クリックしたときに一度初期化する
      errorFlag.value = false;
      errorMessage.value = [];
      // メールアドレスが未入力のときのエラー
      if (email.value === "") {
        errorMessage.value.push("※メールアドレスを入力してください");
        errorFlag.value = true;
      }
      // パスワードが未入力のときのエラー
      if (password.value === "") {
        errorMessage.value.push("※パスワードを入力してください");
        errorFlag.value = true;
      }
      // エラーが一つでもあれば先に進めない
      if (errorFlag.value === true) {
        return;
      }

      const res = await $axios.post(
        "https://api-rks-generator.herokuapp.com/memo/login",
        { email: email.value, password: password.value }
      );
      //  APIにアクセスしstatusがsuccessならメモ帳の画面に進む
      if (res.data.status === "success") {
        store.commit("setLoginUser", res.data.data[0]);
        store.commit("loginFlag");
        router.push("/memo");
      } else {
        // アドレスとパスワードが不一致のときのエラー
        errorMessage.value.push("※" + res.data.message);
      }
    };
    return { login, email, password, errorMessage };
  },
});
</script>

<style></style>
