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
      <h1 class="text-5xl font-bold text-yellow-500 mb-8">LOGIN</h1>
      <div class="w-1/2 text-center">
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
        <p class="font-bold mt-5">
          会員登録は<nuxt-link
            to="/register"
            class="text-indigo-700 hover:text-yellow-500"
            >こちら</nuxt-link
          >
        </p>
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
    const login = async () => {
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
      }
    };
    return { login, email, password };
  },
});
</script>

<style></style>
