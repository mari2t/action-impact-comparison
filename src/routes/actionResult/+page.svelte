<script lang="ts">
  import {
    issue,
    returned,
    actionScores,
    inactionScores,
    setReturned,
  } from "../store";
  import { goto } from "$app/navigation";

  type Score = {
    points: number | null;
  };

  let actionSum = 0;
  let inactionSum = 0;
  let actionHexagonPoints = "";
  let inactionHexagonPoints = "";

  // ポイントを計算
  $: actionSum = $actionScores.reduce(
    (acc, score) => acc + (score.points || 0),
    0
  );
  $: inactionSum = $inactionScores.reduce(
    (acc, score) => acc + (score.points || 0),
    0
  );

  // ポイントから推奨行動を決定
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
  const svgCenterX = 250;
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
    setReturned(true);
    goto("/");
  }

  function startOver() {
    setReturned(false);
    goto("/");
  }
</script>

<div class="container mx-auto pt-10 px-36">
  <div class="flex justify-center w-full">
    <div class="w-3/4 md:w-1/6">
      <h2
        class="text-sm lg:text-2xl font-bold bg-gray-700 text-white p-2 rounded-sm text-center"
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
      <p class="text-md md:text-lg text-center mb-8 mt-4">
        比較日 : {new Date().toLocaleDateString()}
      </p>
      <p class="text-md md:text-lg text-center mb-4 font-bold">
        悩み: {$issue}
      </p>
      <h3
        class="text-md md:text-lg text-center font-semibold mb-2 underline-custom my-4"
      >
        比較結果 : {recommendedAction}
      </h3>
    </div>

    <!--　ヘキサゴン -->
    <div class="justify-center my-8">
      <div>
        <h3 class="text-center text-lg font-semibold">
          行動する場合のメリット(ポイント: {actionSum})
        </h3>
        <svg height="400" width="500" class="justify-center">
          <defs>
            <linearGradient
              id="gradientAction"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" style="stop-color:#96deda; stop-opacity:1" />
              <stop offset="100%" style="stop-color:#50c9c3; stop-opacity:1" />
            </linearGradient>
          </defs>
          <polygon
            points={actionHexagonPoints}
            style="fill:url(#gradientAction);stroke:#eceeef;stroke-width:1"
          />
          {#each categoryLabelCoordinates as coordinate, i}
            <text
              x={i < 3 ? coordinate.x - 0 : coordinate.x - 100}
              y={i < 3 ? coordinate.y + 30 : coordinate.y - 20}
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
        <h3 class="text-center text-lg font-semibold">
          行動しない場合のメリット(ポイント: {inactionSum})
        </h3>

        <svg height="400" width="500" class="justify-center">
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style="stop-color:#fad0c4; stop-opacity:1" />
              <stop offset="100%" style="stop-color:#ff9a9e; stop-opacity:1" />
            </linearGradient>
          </defs>
          <polygon
            points={inactionHexagonPoints}
            style="fill:url(#gradient);stroke:#eceeef;stroke-width:1"
          />
          {#each categoryLabelCoordinates as coordinate, i}
            <text
              x={i < 3 ? coordinate.x - 0 : coordinate.x - 100}
              y={i < 3 ? coordinate.y + 30 : coordinate.y - 20}
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
      <h2 class="text-xl font-semibold mb-2">行動する場合</h2>
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
                <td class="py-2 px-4 border">{score.note || "-"}</td>
              </tr>
            {/each}
          </tbody>
        </table>
      </div>

      <!-- 行動しない場合のデータ -->
      <h2 class="text-xl font-semibold mt-8 mb-2">行動しない場合</h2>
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
                <td class="py-2 px-4 border">{score.note || "-"}</td>
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
