<template>
  <div>
    <div class="h-[80vh]">
      <div class="flex justify-center h-[100%] w-screen">
        <!-- Row -->
        <div class="w-full h-[100%] flex">
          <!-- Col -->
          <div class="w-full lg:w-[60%] h-auto bg-cover hidden lg:block lg:bg-registerimg"></div>
          <!-- Col -->
          <div class="w-full lg:w-[60%] bg-white lg:p-36">
            <h3 class=" mt-3 text-3xl lg:text-5xl font-bold text-center text-yellow-500 mb-3 lg:mb-8">
              Create an Account!
            </h3>
            <div class="h-10 lg:h-20">
              <p
                class="text-sm lg:text-lg text-center text-red-500"
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
      <!-- 会員登録完了のモーダル -->
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
    const { $axios } = useContext();
    // 入力された名前
    const name = ref("");
    // 入力されたメールアドレス
    const email = ref("");
    // 入力されたパスワード
    const password = ref("");
    // 入力された確認用パスワード
    const c_password = ref("");
    // 会員登録完了のモーダルを開くフラグ
    const modalfrag = ref(false);
    // エラーメッセージ
    const errorMessage = ref(new Array());
    // エラーがあるかのフラグ
    const errorFlag = ref(false);

    /**
     * 会員登録をする.
     */
    const registration = async () => {
      // クリックしたときに初期化する
      errorMessage.value = [];
      errorFlag.value = false;
      // 名前が未入力のときのエラー
      if (name.value === "") {
        errorMessage.value.push("※名前を入力してください");
        errorFlag.value = true;
      }
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
      // パスワードと確認用パスワードが未入力ときのエラー
      if (password.value !== c_password.value) {
        errorMessage.value.push("※パスワードと確認用パスワードが一致しません");
        errorFlag.value = true;
      }
      // 1つでもエラーがあれば先に進めない
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
      // APIに接続してstatusがsuccessなら会員登録完了のモーダルを開く
      if (res.data.status === "success") {
        modalfrag.value = true;
      } else {
        // メールアドレスが既に登録されているときのエラー
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
