<script lang="ts">
  import { issue, actionScores, inactionScores } from "../store";
  import { goto } from "$app/navigation";

  interface ScoreInfo {
    category: string;
    points: number;
    note: string;
  }

  type Score = {
    points: number | null;
  };

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

  //　ヘキサゴン
  function generateIrregularHexagonPoints(
    scores: Score[],
    centerX: number,
    centerY: number,
    coordinates: { x: number; y: number }[] = []
  ): string {
    if (scores.length !== 6) {
      console.warn("6つのカテゴリに対するポイントが必要です");
      return "";
    }

    const angles = [0, 60, 120, 180, 240, 300];
    coordinates.length = 0; // 配列をリセット

    return angles
      .map((angle, i) => {
        const radius = (scores[i].points || 0) * 20;
        const x = Math.cos((Math.PI / 180) * angle) * radius + centerX;
        const y = Math.sin((Math.PI / 180) * angle) * radius + centerY;
        coordinates.push({ x, y }); // 座標を配列に保存
        return `${x},${y}`;
      })
      .join(" ");
  }

  let actionHexagonPoints = "";
  let inactionHexagonPoints = "";

  $: if ($actionScores.length === 6) {
    actionHexagonPoints = generateIrregularHexagonPoints(
      $actionScores,
      150,
      150,
      actionCoordinates
    );
  }

  $: if ($inactionScores.length === 6) {
    inactionHexagonPoints = generateIrregularHexagonPoints(
      $inactionScores,
      150,
      150,
      inactionCoordinates // このように渡す
    );
  }

  // ヘキサゴン　文字列
  let actionCoordinates: { x: number; y: number }[] = [];
  let inactionCoordinates: { x: number; y: number }[] = [];

  $: if ($actionScores.length === 6) {
    actionHexagonPoints = generateIrregularHexagonPoints(
      $actionScores,
      150,
      150,
      actionCoordinates
    );
  }

  $: if ($inactionScores.length === 6) {
    inactionHexagonPoints = generateIrregularHexagonPoints(
      $inactionScores,
      150,
      150,
      inactionCoordinates
    );
  }
  // この関数内でカテゴリ名用の座標も計算
  function generateCategoryLabelCoordinates(
    scores: Score[],
    centerX: number,
    centerY: number,
    labelCoordinates: { x: number; y: number }[] = []
  ): void {
    const angles = [0, 60, 120, 180, 240, 300];
    labelCoordinates.length = 0; // 配列をリセット

    angles.forEach((angle, i) => {
      const radius = 120; // カテゴリ名の表示位置の半径（要調整）
      const x = Math.cos((Math.PI / 180) * angle) * radius + centerX;
      const y = Math.sin((Math.PI / 180) * angle) * radius + centerY;
      labelCoordinates.push({ x, y }); // 座標を配列に保存
    });
  }

  let categoryLabelCoordinates: { x: number; y: number }[] = [];
  $: generateCategoryLabelCoordinates(
    $actionScores,
    150,
    150,
    categoryLabelCoordinates
  );

  // SVGの中心座標
  const svgCenterX = 200;
  const svgCenterY = 200;

  $: if ($actionScores.length === 6) {
    actionHexagonPoints = generateIrregularHexagonPoints(
      $actionScores,
      svgCenterX,
      svgCenterY,
      actionCoordinates
    );
  }

  $: if ($inactionScores.length === 6) {
    inactionHexagonPoints = generateIrregularHexagonPoints(
      $inactionScores,
      svgCenterX,
      svgCenterY,
      inactionCoordinates
    );
  }

  $: generateCategoryLabelCoordinates(
    $actionScores,
    svgCenterX,
    svgCenterY,
    categoryLabelCoordinates
  );

  //　ページ遷移
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
        比較結果
      </h2>
    </div>
  </div>
</div>

<div class="justify-center">
  <div class="w-1/2 m-0">
    <!-- 件名、有効期限 -->
    <div>
      <h4 class="text-lg mb-4 mt-8 relative underline-custom">
        件名 : {$issue}
      </h4>
      <h4 class="text-lg mb-4 relative underline-custom">
        作成日時 : {new Date().toLocaleDateString()}
      </h4>
      <p>比較結果は下記の通りとなりました。</p>
    </div>

    <!--　推奨行動 -->
    <div class="mt-8">
      <h3 class="text-xl font-semibold mb-2 underline-custom my-8">
        比較結果 : {recommendedAction}
      </h3>
    </div>

    <!--　ヘキサゴン -->
    <div class="justify-center my-8">
      <div>
        <h3 class="text-center font-bold">行動する場合</h3>
        <svg height="400" width="400">
          <polygon
            points={actionHexagonPoints}
            style="fill:#64c7cc;stroke:#eceeef;stroke-width:1"
          />
          {#each categoryLabelCoordinates as coordinate, i}
            <text
              x={i < 3 ? coordinate.x + 10 : coordinate.x - 60}
              y={i < 3 ? coordinate.y + 20 : coordinate.y - 20}
              font-family="Verdana"
              font-size="14"
              class="m-2">{$actionScores[i].category}</text
            >
            <line
              x1={actionCoordinates[i].x}
              y1={actionCoordinates[i].y}
              x2={coordinate.x}
              y2={coordinate.y}
              stroke="black"
            />
          {/each}
        </svg>
      </div>

      <div>
        <h3 class="text-center font-bold">行動しない場合</h3>
        <svg height="400" width="400">
          <polygon
            points={inactionHexagonPoints}
            style="fill:#FF0000;stroke:#eceeef;stroke-width:1"
          />
          {#each categoryLabelCoordinates as coordinate, i}
            <text
              x={i < 3 ? coordinate.x + 10 : coordinate.x - 60}
              y={i < 3 ? coordinate.y + 20 : coordinate.y - 20}
              font-family="Verdana"
              font-size="14"
              class="m-2">{$inactionScores[i].category}</text
            >
            <line
              x1={inactionCoordinates[i].x}
              y1={inactionCoordinates[i].y}
              x2={coordinate.x}
              y2={coordinate.y}
              stroke="black"
            />
          {/each}
        </svg>
      </div>
    </div>

    <div class="w-full">
      <!-- 行動する場合のデータ -->
      <h2 class="text-xl font-semibold mb-2">
        行動する場合 (合計ポイント: {actionSum})
      </h2>
      <div class="">
        <table class="min-w-full bg-white border border-gray-300 w-3/5">
          <thead class="bg-gray-100">
            <tr>
              <th class="py-2 px-4 border w-2/5">カテゴリ</th>
              <th class="py-2 px-4 border w-1/5">ポイント</th>
              <th class="py-2 px-4 border w-2/5">メモ</th>
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
      </div>

      <!-- 行動しない場合のデータ -->
      <h2 class="text-xl font-semibold mt-8 mb-2">
        行動しない場合 (合計ポイント: {inactionSum})
      </h2>
      <div class="">
        <table class="min-w-full bg-white border border-gray-300">
          <thead class="bg-gray-100">
            <tr>
              <th class="py-2 px-4 border w-2/5">カテゴリ</th>
              <th class="py-2 px-4 border w-1/5">ポイント</th>
              <th class="py-2 px-4 border w-2/5">メモ</th>
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
</div>

<style>
  .justify-center {
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
