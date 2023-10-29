<script lang="ts">
  import { issue, returned, selectedActions } from "../store";
  import { goto } from "$app/navigation";

  let actionSum = 0;
  let inactionSum = 0;

  let recommendedAction = "";
  $: {
    if (actionSum > inactionSum) {
      recommendedAction = "行動したほうが良い";
    } else if (actionSum < inactionSum) {
      recommendedAction = "行動しないほうが良い";
    } else {
      recommendedAction = "どちらでも良い";
    }
  }

  //　ページ遷移
  function showComparison() {
    returned.set(true);
    goto("/");
  }

  function startOver() {
    issue.set("");
    goto("/");
  }
</script>

<div class="container mx-auto pt-10 px-36">
  <div class="flex justify-center w-full">
    <div class="w-1/6">
      <h2
        class="text-2xl font-bold bg-gray-700 text-white p-2 rounded-sm text-center"
      >
        比較結果
      </h2>
    </div>
  </div>
</div>

<div class="justify-center">
  <div class="w-1/2 m-0">
    <!--　推奨行動 -->
    <div class="w-1-2 flex-col">
      <p class="text-lg text-center mb-8 mt-4">
        比較日 : {new Date().toLocaleDateString()}
      </p>
      <p class=" text-center text-xl mb-4 font-bold">
        件名 : {$issue}
      </p>
      <h3 class=" text-center text-xl font-semibold mb-2 underline-custom my-4">
        比較結果 : {recommendedAction}
      </h3>
      <table>
        <thead>
          <tr>
            <th>項目</th>
            <th>行動</th>
            <th>メモ</th>
          </tr>
        </thead>
        <tbody>
          {#each $selectedActions as value, index}
            <tr>
              <td>{value.category}</td>
              <td>{value.action}</td>
              <td>{value.memo}</td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  </div>
</div>

<div class="flex my-4 justify-center align-middle text-center">
  <button
    class="bg-blue-500 hover:bg-blue-700 text-white p-4 mx-2 rounded"
    on:click={showComparison}
  >
    比較画面に戻る
  </button>
  <button
    class="bg-green-500 hover:bg-green-700 text-white p-4 mx-2 rounded"
    on:click={startOver}
  >
    最初から考える
  </button>
</div>

<style>
  .justify-center {
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
