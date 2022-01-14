<template>
  <div
    class="bg-no-repeat h-[500px] w-[60%] rounded-lg block mt-[200px] mb-20 mx-auto bg-loginimg"
  >
    <div class="flex justify-end mx-auto">
      <div class="bg-white w-1/2 h-[500px] flex justify-center items-center">
        <div>
          <form>
            <div>
              <span class="text-sm text-gray-900">Welcome back</span>
              <h1 class="text-2xl font-bold">Login to your account</h1>
            </div>
            <div class="my-3">
              <label class="block text-md mb-2" for="email">Email</label>
              <input
                class="px-4 w-full border-2 py-2 rounded-md text-sm outline-none"
                type="email"
                name="password"
                placeholder="email"
                v-model="email"
              />
            </div>
            <div class="mt-5">
              <label class="block text-md mb-2" for="password">Password</label>
              <input
                class="px-4 w-full border-2 py-2 rounded-md text-sm outline-none"
                type="password"
                name="password"
                placeholder="password"
                v-model="password"
              />
            </div>
            <div class="flex justify-between">
              <div>
                <input class="cursor-pointer" type="radio" name="rememberme" />
                <span class="text-sm">Remember Me</span>
              </div>
              <span class="text-sm text-blue-700 hover:underline cursor-pointer"
                >Forgot password?</span
              >
            </div>
            <div class="">
              <button
                class="mt-4 mb-3 w-full bg-green-500 hover:bg-green-400 text-white py-2 rounded-md transition duration-100"
                type="button"
                @click="login()"
              >
                Login now
              </button>
            </div>
          </form>
          <p class="mt-8">
            Dont have an account?
            <span class="cursor-pointer text-sm text-blue-600">
              Join free today</span
            >
          </p>
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
