<template>
  <div
    class="h-screen w-screen flex flex-col items-center justify-center bg-gray-400 bg-opacity-80 font-sans"
  >
    <div
      class="h-screen w-full absolute flex items-center justify-center bg-modal"
    >
      <div
        class="bg-white rounded shadow p-8 m-4 max-w-xs max-h-full text-center overflow-y-scroll"
      >
        <div class="mb-4">
          <h1>Welcome!</h1>
        </div>
        <div class="mb-8">
          <p>
           会員登録が完了しました！
          </p>
        </div>
        <div class="flex justify-center">
          <nuxt-link to="login">
            <button
              class="flex-no-shrink text-white py-2 px-4 rounded bg-blue-700 hover:bg-teal-dark"
              type="button"
            >
              ログイン画面へ
            </button>
          </nuxt-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "@nuxtjs/composition-api";

export default defineComponent({});
</script>

<style></style>
