<template>
  <div>
    <div class="h-[80vh]">
      <div class="flex justify-center h-[100%] w-screen">
        <!-- Row -->
        <div class="w-full h-[100%] flex">
          <!-- Col -->
          <div class="w-[60%] h-auto bg-cover bg-registerimg"></div>
          <!-- Col -->
          <div class="w-[60%] bg-white p-36">
            <h3 class="text-5xl font-bold text-center text-yellow-500 mb-8">
              Create an Account!
            </h3>
            <div class="h-20">
              <p
                class="text-center text-red-500"
                v-for="error of errorMessage"
                :key="error"
              >
                {{ error }}
              </p>
            </div>
            <form class="px-8 pt-6 pb-8 mb-4 bg-white rounded">
              <div class="mb-7 md:mr-2 md:mb-0">
                <label
                  class="block mb-2 text-sm font-bold text-gray-700 w-10"
                  for="firstName"
                >
                  Name
                </label>
                <input
                  class="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                  id="firstName"
                  type="text"
                  placeholder="Name"
                  v-model="name"
                />
              </div>

              <div class="mt-4 mb-4">
                <label
                  class="block mb-2 text-sm font-bold text-gray-700"
                  for="email"
                >
                  Email
                </label>
                <input
                  class="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                  id="email"
                  type="email"
                  placeholder="Email"
                  v-model="email"
                />
              </div>
              <div class="mb-4 md:flex md:justify-between">
                <div class="mb-4 md:mr-2 md:mb-0">
                  <label
                    class="block mb-2 text-sm font-bold text-gray-700"
                    for="password"
                  >
                    Password
                  </label>
                  <input
                    class="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                    id="password"
                    type="password"
                    placeholder="******************"
                    v-model="password"
                  />
                  <!-- <p class="text-xs italic text-red-500">Please choose a password.</p> -->
                </div>
                <div class="md:ml-2">
                  <label
                    class="block mb-2 text-sm font-bold text-gray-700"
                    for="c_password"
                  >
                    Confirm Password
                  </label>
                  <input
                    class="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                    id="c_password"
                    type="password"
                    placeholder="******************"
                    v-model="c_password"
                  />
                </div>
              </div>
              <div class="mb-6 text-center">
                <button
                  class="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline"
                  type="button"
                  v-on:click="registration()"
                >
                  Register Account
                </button>
              </div>
              <hr class="mb-6 border-t" />
              <!-- <div class="text-center">
                <a
                  class="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800"
                  href="#"
                >
                  Forgot Password?
                </a>
              </div> -->
              <div class="text-center">
                <a
                  class="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800"
                  href="./index.html"
                >
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>
      <register-modal
        class="left-0 fixed z-10 top-0"
        v-if="modalfrag"
      ></register-modal>
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  useContext,
  useRouter,
} from "@nuxtjs/composition-api";
import registerModal from "~/components/registerModal.vue";

export default defineComponent({
  components: { registerModal },
  setup() {
    const name = ref("");
    const email = ref("");
    const password = ref("");
    const c_password = ref("");
    const { $axios } = useContext();
    const modalfrag = ref(false);
    const errorMessage = ref(new Array());
    const errorFlag = ref(false);

    const registration = async () => {
      errorMessage.value = [];
      errorFlag.value = false;
      if (name.value === "") {
        errorMessage.value.push("※名前を入力してください");
        errorFlag.value = true;
      }
      if (email.value === "") {
        errorMessage.value.push("※メールアドレスを入力してください");
        errorFlag.value = true;
      }
      if (password.value === "") {
        errorMessage.value.push("※パスワードを入力してください");
        errorFlag.value = true;
      }
      if (password.value !== c_password.value) {
        errorMessage.value.push("※パスワードと確認用パスワードが一致しません");
        errorFlag.value = true;
      }

      if (errorFlag.value === true) {
        return;
      }
      const res = await $axios.post(
        "https://api-rks-generator.herokuapp.com/memo/register",
        {
          name: name.value,
          email: email.value,
          password: password.value,
        }
      );
      console.log(res.data);
      if (res.data.status === "success") {
        modalfrag.value = true;
      } else {
        errorMessage.value.push("※" + res.data.message);
        errorFlag.value = true;
      }
    };
    return {
      name,
      email,
      password,
      c_password,
      registration,
      modalfrag,
      errorFlag,
      errorMessage,
    };
  },
});
</script>

<style></style>
