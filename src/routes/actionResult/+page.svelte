<script>
  import { username, issue, actionScores, inactionScores } from "../store";
  import { goto } from "$app/navigation";

  // actionScoresとinactionScoresのポイントを合計
  let actionSum = 0;
  let inactionSum = 0;

  $: actionSum = $actionScores.reduce(
    (acc, score) => acc + (score.points || 0),
    0
  );
  $: inactionSum = $inactionScores.reduce(
    (acc, score) => acc + (score.points || 0),
    0
  );

  // 推奨行動を決定
  let recommendedAction = "";
  if (actionSum > inactionSum) {
    recommendedAction = "行動したほうが良い";
  } else if (actionSum < inactionSum) {
    recommendedAction = "行動しないほうが良い";
  } else {
    recommendedAction = "行動してもしなくても良い";
  }

  // 前ページへ戻る
  function showComparison() {
    goto("/");
  }
</script>

<div class="container mx-auto pt-10 px-36">
  <!-- 見積書ヘッダー -->
  <div class="flex justify-center w-full">
    <div class="w-1/6">
      <h2
        class="text-2xl font-bold bg-gray-700 text-white p-2 rounded-sm text-center"
      >
        御見積書
      </h2>
    </div>
  </div>
  <div class="flex justify-end w-full mb-16">
    <div class="justify-start">
      <p class="text-sm">作成日: {new Date().toLocaleDateString()}</p>
    </div>
  </div>
</div>

<!-- 件名、有効期限 -->
<div>
  <h4 class="text-lg mb-4 relative underline-custom">
    {$username} 様
  </h4>
  <h4 class="text-lg mb-4 relative underline-custom">
    件名 : {$issue}
  </h4>
  <h4 class="text-lg mb-4 relative underline-custom">
    有効期限 : {new Date().toLocaleDateString()}
  </h4>
  <p>下記の通り御見積申し上げます。</p>
</div>

<!--　推奨行動 -->
<div class="mt-8">
  <h3 class="text-xl font-semibold mb-2 underline-custom">
    御見積行動 : {recommendedAction}
  </h3>
</div>

<div class="w-full">
  <!-- 行動する場合のデータ -->
  <h2 class="text-xl font-semibold mb-2">行動する場合</h2>
  <table class="min-w-full bg-white border border-gray-300">
    <thead class="bg-gray-100">
      <tr>
        <th class="py-2 px-4 border">カテゴリ</th>
        <th class="py-2 px-4 border">ポイント</th>
        <th class="py-2 px-4 border">メモ</th>
      </tr>
    </thead>
    <tbody>
      {#each $actionScores as score}
        <tr class="text-center">
          <td class="py-2 px-4 border">{score.category}</td>
          <td class="py-2 px-4 border">{score.points}</td>
          <td class="py-2 px-4 border">{score.note}</td>
        </tr>
      {/each}
    </tbody>
  </table>

  <!-- 行動しない場合のデータ -->
  <h2 class="text-xl font-semibold mt-8 mb-2">行動しない場合</h2>
  <table class="min-w-full bg-white border border-gray-300">
    <thead class="bg-gray-100">
      <tr>
        <th class="py-2 px-4 border">カテゴリ</th>
        <th class="py-2 px-4 border">ポイント</th>
        <th class="py-2 px-4 border">メモ</th>
      </tr>
    </thead>
    <tbody>
      {#each $inactionScores as score}
        <tr class="text-center">
          <td class="py-2 px-4 border">{score.category}</td>
          <td class="py-2 px-4 border">{score.points}</td>
          <td class="py-2 px-4 border">{score.note}</td>
        </tr>
      {/each}
    </tbody>
  </table>
</div>
