<script lang="ts">
  import { issue, returned, selectedActions } from "../store";
  import { goto } from "$app/navigation";

  let recommendedAction = "";

  //　行動する、行動しない、どちらでもよいの回数をカウント
  $: {
    let actionCount = 0;
    let inactionCount = 0;

    // $selectedActionsはリアクティブな変数なので、
    // selectedActionsストアの値が変更された場合、このコードブロックが再実行されます。
    $selectedActions.forEach(({ action }) => {
      if (action === "行動する") {
        actionCount++;
      } else if (action === "行動しない") {
        inactionCount++;
      }
    });

    if (actionCount > inactionCount) {
      recommendedAction = "行動する";
    } else if (actionCount < inactionCount) {
      recommendedAction = "行動しない";
    } else {
      recommendedAction = "行動してもしなくてもどちらでもよい";
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

<div class="container mx-auto pt-12">
  <div class="flex justify-center w-full mb-8">
    <div class="bg-gray-700 text-white p-4 rounded">
      <h2 class="text-2xl font-bold text-center">比較結果</h2>
    </div>
  </div>

  <div class="flex justify-center">
    <div class="bg-white rounded-lg shadow-lg w-3/4 p-6">
      <p class="text-center text-xl mb-4 font-semibold">
        件名 : {$issue}
      </p>
      <h3 class="text-center text-xl font-semibold mb-4 text-blue-600">
        比較結果 : {recommendedAction}
      </h3>

      <table class="min-w-full bg-white border border-gray-300">
        <thead>
          <tr class="bg-gray-200 text-gray-600 uppercase text-sm">
            <th class="py-2 px-4 w-1/3">項目</th>
            <th class="py-2 px-4 w-1/3">行動する？しない？</th>
            <th class="py-2 px-4 w-1/3">メモ</th>
          </tr>
        </thead>
        <tbody>
          {#each $selectedActions as value, index}
            <tr class="text-gray-700">
              <td class="py-2 px-4 border">{value.category}</td>
              <td class="py-2 px-4 border">{value.action}</td>
              <td class="py-2 px-4 border">{value.memo}</td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  </div>
  <p class="text-lg text-center m-4">
    比較日 : {new Date().toLocaleDateString()}
  </p>

  <div class="flex my-8 justify-center">
    <button
      class="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 mx-2 rounded"
      on:click={showComparison}
    >
      比較画面に戻る
    </button>
    <button
      class="bg-green-500 hover:bg-green-700 text-white py-2 px-4 mx-2 rounded"
      on:click={startOver}
    >
      最初から考える
    </button>
  </div>
</div>

<style>
  .justify-center {
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
