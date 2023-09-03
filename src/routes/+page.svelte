<script lang="ts">
  import { username, issue, actionScores, inactionScores } from "./store";
  import { goto } from "$app/navigation";

  interface ScoreInfo {
    action?: string; // ここをオプショナルにするか、必ず指定するようにします。
    category: string | null; // ここを string に変更
    points: number | null;
    note: string | null;
  }
  // 一時的な保存変数
  let actionPoints: number[] = [];
  let actionNotes: string[] = [];
  let inactionPoints: number[] = [];
  let inactionNotes: string[] = [];

  const actionCategories = [
    "成長・スキル向上",
    "問題解決",
    "人間関係",
    "金銭的利益",
    "心理的満足",
    "時間効率",
  ];

  const actionDetails = [
    "新しいスキルを習得したり、既存のスキルを向上させる可能性がある。",
    "現状にある問題や課題を解消する手段となる可能性がある。",
    "新しい人々と出会ったり、既存の関係を深めるチャンスがある。",
    "行動によって得られる財務的な報酬や節約。",
    "達成感や幸福感、自己実現など、心の側面での利点。",
    "将来的に時間を節約したり、より効率的な方法でタスクを完了できる。",
  ];

  const inactionCategories = [
    "リスク回避",
    "時間節約",
    "安定性",
    "精神的平和",
    "リソースの節約",
    "他の機会への集中",
  ];

  const inactionDetails = [
    "新たな問題やリスクを生む可能性が低くなる。",
    "現状維持には新しい投資や時間は必要ない場合が多い。",
    "既存の状況やルーチンが乱れることなく、安定した環境を保てる。",
    "新しい挑戦や変化によるストレスや不安がない。",
    "金銭、エネルギー、その他のリソースを節約できる。",
    "その行動をしないことで、他の重要な事項や機会に集中できる。",
  ];

  // 初期値の設定
  const initializeScores = (numOfCategories: number): number[] => {
    const arr: number[] = [];
    for (let i = 0; i < numOfCategories; i++) {
      arr.push(3); // 初期値は3に設定
    }
    return arr;
  };

  // 初期値の適用
  actionPoints = initializeScores(actionCategories.length);
  inactionPoints = initializeScores(inactionCategories.length);

  // データを保存
  function updateScore(
    action: string,
    categoryIndex: number,
    points: number,
    note: string
  ) {
    // カテゴリの名前を取得
    const categoryName =
      action === "action"
        ? actionCategories[categoryIndex]
        : inactionCategories[categoryIndex];

    if (action === "action") {
      // actionのスコアを更新
      actionScores.update((currentScores: ScoreInfo[]) => {
        const updatedScores = Array.isArray(currentScores)
          ? currentScores
          : [currentScores];

        if (!updatedScores[categoryIndex]) {
          updatedScores[categoryIndex] = {
            action,
            category: categoryName,
            points: null,
            note: null,
          };
        }
        updatedScores[categoryIndex] = {
          action,
          category: categoryName,
          points,
          note,
        };
        return [...updatedScores];
      });
    } else {
      // inactionのスコアを更新
      inactionScores.update((currentScores: ScoreInfo[]) => {
        const updatedScores = Array.isArray(currentScores)
          ? currentScores
          : [currentScores];

        if (!updatedScores[categoryIndex]) {
          updatedScores[categoryIndex] = {
            action,
            category: categoryName,
            points: null,
            note: null,
          };
        }
        updatedScores[categoryIndex] = {
          action,
          category: categoryName,
          points,
          note,
        };
        return [...updatedScores];
      });
    }
  }

  function saveData() {
    actionPoints.forEach((point, index) => {
      updateScore("action", index, point, actionNotes[index]);
    });

    inactionPoints.forEach((point, index) => {
      updateScore("inaction", index, point, inactionNotes[index]);
    });
  }

  function showResult() {
    saveData();
    goto("/actionResult");
  }
</script>

<div class="container mx-auto p-4 w-1/2">
  <div class="mb-4 flex">
    <div class="w-1/5">
      <label for="username" class="text-lg mb-2">ユーザー名: </label>
    </div>
    <input
      id="username"
      type="text"
      bind:value={$username}
      maxlength="30"
      class="border p-2 rounded w-3/5"
    />
  </div>
  <div class="mb-4 flex">
    <div class="w-1/5">
      <label for="issue" class="text-lg mb-2">悩み: </label>
    </div>

    <input
      id="issue"
      type="text"
      bind:value={$issue}
      maxlength="30"
      class="border p-2 rounded w-3/5"
    />
  </div>
</div>

<div class="container mx-auto p-4 w-3/4">
  <h2 class="text-2xl mb-4">行動することで得られるメリット</h2>
  {#each actionCategories as category, index}
    <div class="mb-4 flex">
      <div class="w-1/2">
        <p class="text-lg">{category}</p>
        <small class="text-gray-500">{actionDetails[index]}</small>
      </div>
      <div class="w-1/5">
        {#each [1, 2, 3, 4, 5] as num (num)}
          <label class="inline-flex items-center">
            <input
              type="radio"
              class="form-radio ml-1"
              value={num}
              bind:group={actionPoints[index]}
            />
            <span class="ml-2">{num}</span>
          </label>
        {/each}
      </div>

      <input
        type="text"
        placeholder="メモ"
        bind:value={actionNotes[index]}
        maxlength="30"
        class="border p-2 rounded ml-2 w-2/5"
      />
    </div>
  {/each}
</div>

<div class="container mx-auto p-4 w-3/4">
  <h2 class="text-2xl mb-4">行動しないことで得られるメリット</h2>
  {#each inactionCategories as category, index}
    <div class="mb-4 flex">
      <div class="w-1/2">
        <p class="text-lg">{category}</p>
        <small class="text-gray-500">{inactionDetails[index]}</small>
      </div>
      <div class="w-1/5">
        {#each [1, 2, 3, 4, 5] as num (num)}
          <label class="inline-flex items-center">
            <input
              type="radio"
              class="form-radio ml-1"
              value={num}
              bind:group={inactionPoints[index]}
            />
            <span class="ml-2">{num}</span>
          </label>
        {/each}
      </div>
      <input
        type="text"
        placeholder="メモ"
        bind:value={inactionNotes[index]}
        maxlength="30"
        class="border p-2 rounded ml-2 w-2/5"
      />
    </div>
  {/each}
</div>

<div class="flex my-4 justify-center align-middle text-center">
  <button
    class="bg-blue-500 hover:bg-blue-700 text-white p-4 mx-2 rounded"
    on:click={showResult}
  >
    比較結果を見る
  </button>
</div>
