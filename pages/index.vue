<template>
  <div>
    <div
      class="flex justify-center mx-auto bg-topimg bg-cover h-[100vh] bg-no-repeat"
    ></div>
    <div>
      <!-- <button
        type="buton"
        class="bg-blue-700 hover:bg-blue-light text-white font-bold py-2 px-4 border-b-4 border-blue-dark hover:border-blue rounded"
      >
        <nuxt-link to="register" class="">会員登録</nuxt-link>
      </button>
      <button
        type="button"
        class="ml-10 bg-blue-700 hover:bg-blue-light text-white font-bold py-2 px-4 border-b-4 border-blue-dark hover:border-blue rounded"
      >
        ログイン
      </button> -->
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import {
  defineComponent,
  ref,
  useAsync,
  useContext,
  useStore,
} from "@nuxtjs/composition-api";

export default defineComponent({
  setup() {
    const { $axios } = useContext();
    const { store } = useContext();
    // SPAでのaxios
    // const getdata = async () => {
    //   const response = await $axios.get(
    //     "https://pokeapi.co/api/v2/pokemon/ditto"
    //   );
    //   console.log(response.data);
    // };
    // getdata();

    // // SSR・・・サーバーサイドレンダリング(初回アクセス時のみサーバーサイドで実行)
    // useAsync(async () => {
    //   const res = await $axios.get(
    //     "https://jsonplaceholder.typicode.com/posts/"
    //   );
    //   console.log(res.data);
    // });
  },
});
</script>
