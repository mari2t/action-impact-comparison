<script lang="ts">
  import { issue, actionScores, inactionScores } from "./store";
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
    "🚀スキルアップ",
    "👪家族関係",
    "💪健康",
    "🫶交友関係",
    "💴経済的状況",
    "🎵興味・趣味",
  ];

  const actionDetails = [
    "資格やスキルを手に入れることできるかも？",
    "家族のコミュニケーションが良くなるかも？",
    "体調や精神面に対して良いかも？。",
    "人間関係が広がるかも？",
    "貯金や資産が増えるかも？",
    "楽しさや面白さを体験できるかも？",
  ];

  const inactionCategories = [
    "⌛時間",
    "🏠環境の安定性",
    "💰お金",
    "🏃エネルギー",
    "🤝人間関係",
    "😀以前の自分",
  ];

  const inactionDetails = [
    "挑戦する時間を他の重要なことに使えるかも？",
    "変化によるストレスを経験しなくて良いかも？",
    "お金を他の用途に使えるかも？",
    "エネルギーを節約できるかも？",
    "人間関係によるストレスを経験しなくてもいいかも？",
    "自分自身が変わらなくてもいいかも？",
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
        console.log($inactionScores);
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
  <div class="my-4 flex">
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

<div class="container mx-auto p-4 w-3/5">
  <h2 class="text-2xl mb-4">行動することで得られるメリット</h2>
  {#each actionCategories as category, index}
    <div class="mb-4 flex bg-teal-50 p-2">
      <div class="w-1/3">
        <p class="text-lg">{category}</p>
        <p class="text-gray-500">{actionDetails[index]}</p>
      </div>
      <div class="w-1/5 mx-auto flex justify-center items-center">
        {#each [1, 2, 3, 4, 5] as num (num)}
          <label class="inline-flex items-center">
            <input
              type="radio"
              class="form-radio ml-2"
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
        class="border p-2 rounded ml-2 w-1/3"
      />
    </div>
  {/each}
</div>

<div class="container mx-auto p-4 w-3/5">
  <h2 class="text-2xl mb-4">行動しないことで得られるメリット</h2>
  {#each inactionCategories as category, index}
    <div class="mb-4 flex bg-red-50 p-2">
      <div class="w-1/3">
        <p class="text-lg">{category}</p>
        <p class="text-gray-500">{inactionDetails[index]}</p>
      </div>
      <div class="w-1/5 mx-auto flex justify-center items-center">
        {#each [1, 2, 3, 4, 5] as num (num)}
          <label class="inline-flex items-center">
            <input
              type="radio"
              class="form-radio ml-2"
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
        class="border rounded ml-2 w-1/3 p-2"
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
