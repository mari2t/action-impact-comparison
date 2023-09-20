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
    "💴経済的状況",
    "🫶交友関係",
    "💪健康",
    "👪家族関係",
    "🎵興味・趣味",
  ];

  const actionDetails = [
    "スキルを手に入れることできる？",
    "貯金や資産が増える？",
    "人間関係が広がる？",
    "体調や精神面に対して良い？",
    "家族のコミュニケーションが良くなる？",
    "楽しさや面白さを体験できる？",
  ];

  const actionImage = [
    "action-skill.jpg",
    "action-money.jpg",
    "action-friendship.jpg",
    "action-health.jpg",
    "action-family.jpg",
    "action-joy.jpg",
  ];

  const inactionCategories = [
    "⌛時間",
    "💰お金",
    "🤝人間関係",
    "🏠環境の安定性",
    "🏃エネルギー",

    "😀変わらない自分",
  ];

  const inactionDetails = [
    "時間を他の重要なことに使える？",
    "お金を他の用途に使える？",
    "今の人間関係を維持できる？",
    "変化によるストレスが無い？",
    "エネルギーを節約できる？",
    "自分自身が変わらなくてもいい？",
  ];

  const inactionImage = [
    "inaction-clock.jpg",
    "inaction-money.jpg",
    "inaction-friendship.jpg",
    "inaction-circumstance.jpg",
    "inaction-energy.jpg",
    "inaction-myself.jpg",
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

<div class="container mx-auto p-4 w-1/2 bg-gray-200 my-8">
  <div class="my-4 flex">
    <div class="w-1/5">
      <label for="issue" class="text-3xl mb-2 font-bold">悩み: </label>
    </div>

    <input
      id="issue"
      type="text"
      bind:value={$issue}
      maxlength="30"
      class="border p-2 rounded w-2/3"
    />
  </div>
</div>

<div class="container mx-auto p-4 w-1/2 bg-blue-100 mb-8">
  <h2 class="text-2xl mb-4 font-bold text-center">
    行動することで得られるメリット
  </h2>
  <div class="">
    {#each actionCategories as category, index}
      <div class="card lg:card-side bg-base-100 shadow-xl m-4">
        <figure>
          <img
            src={`/src/lib/images/${actionImage[index]}`}
            alt={category}
            class="rounded-xl p-4 w-2/3"
          />
        </figure>
        <div class="card-body items-center text-center">
          <h2 class="card-title">{category}</h2>
          <p>{actionDetails[index]}</p>
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
            class="border rounded ml-2 w-4/5 p-2"
          />
        </div>
      </div>
    {/each}
  </div>
</div>

<div class="container mx-auto p-4 w-1/2 bg-red-100">
  <h2 class="text-2xl mb-4 font-bold text-center">
    行動しないことで得られるメリット
  </h2>
  <div class="">
    {#each inactionCategories as category, index}
      <div class="card lg:card-side bg-base-100 shadow-xl m-4">
        <figure>
          <img
            src={`/src/lib/images/${inactionImage[index]}`}
            alt={category}
            class="rounded-xl p-4 w-2/3"
          />
        </figure>
        <div class="card-body items-center text-center">
          <h2 class="card-title">{category}</h2>
          <p>{inactionDetails[index]}</p>
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
            class="border rounded ml-2 w-4/5 p-2"
          />
        </div>
      </div>
    {/each}
  </div>
</div>

<div class="flex my-4 justify-center align-middle text-center">
  <button
    class="bg-blue-500 hover:bg-blue-700 text-white p-4 mx-2 rounded"
    on:click={showResult}
  >
    比較結果を見る
  </button>
</div>
