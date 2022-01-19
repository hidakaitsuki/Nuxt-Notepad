<template>
  <div class="relative">
    <transition :appear="animation">
      <div
        class="flex justify-center mx-auto bg-topimg bg-cover h-[100vh] bg-no-repeat"
      ></div>
    </transition>
    <h1
      class="text-[80px] text-white w-[100%] text-center absolute top-10 font-ui"
    >
      仕事もプライベートもすっきり整理
    </h1>
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
    const animation = ref(false);
    animation.value = true;
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
    return { animation };
  },
});
</script>

<style scoped>
.v-enter-active {
  transition: opacity 2s;
}
.v-enter {
  opacity: 0;
}
.v-enter-to {
  opacity: 1;
}
</style>
