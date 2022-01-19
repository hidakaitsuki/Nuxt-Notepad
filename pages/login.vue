<template>
  <div class="w-full h-[80vh] flex">
    <img
      src="https://images.unsplash.com/photo-1540569876033-6e5d046a1d77?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80"
      alt="background"
      class="object-cover object-center h-[80vh] w-7/12"
    />
    <div
      class="bg-white flex flex-col justify-center items-center w-5/12 shadow-lg"
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
    const email = ref("");
    const password = ref("");
    const router = useRouter();
    const store = useStore();
    const errorMessage = ref(new Array());
    const login = async () => {
      const errorFlag = ref(false);
      errorFlag.value = false;
      errorMessage.value = [];
      if (email.value === "") {
        errorMessage.value.push("※メールアドレスを入力してください");
        errorFlag.value = true;
      }
      if (password.value === "") {
        errorMessage.value.push("※パスワードを入力してください");
        errorFlag.value = true;
      }
      if (errorFlag.value === true) {
        return;
      }
      const res = await $axios.post(
        "https://api-rks-generator.herokuapp.com/memo/login",
        { email: email.value, password: password.value }
      );
      console.log(res.data);
      if (res.data.status === "success") {
        store.commit("setLoginUser", res.data.data[0]);
        store.commit("loginFlag");
        console.log(store.getters.getLoginUser);
        console.log(store.getters.getLoginFlag);
        router.push("/memo");
      } else {
        errorMessage.value.push("※" + res.data.message);
      }
    };
    return { login, email, password, errorMessage };
  },
});
</script>

<style></style>
