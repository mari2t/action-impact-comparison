<script lang="ts">
  import {
    issue,
    returned,
    actionScores,
    inactionScores,
    setReturned,
  } from "./store";
  import { goto } from "$app/navigation";

  type ScoreInfo = {
    action?: string;
    category: string | null;
    points: number | null;
    note: string | null;
  };

  // 一時的な保存変数
  let actionPoints: number[] = [];
  let actionNotes: string[] = [];
  let inactionPoints: number[] = [];
  let inactionNotes: string[] = [];

  const actionCategories = [
    "1. 🚀スキルアップ",
    "2. 💴経済的状況",
    "3. 💪健康",
    "4. 🫶交友関係",
    "5. 👪家族関係",
    "6. 🎵興味・趣味",
  ];

  const actionDetails = [
    "スキルを手に入れることできる？",
    "貯金や資産が増える？",
    "体調や精神面に対して良い？",
    "人間関係が広がる？",
    "家族のコミュニケーションが良くなる？",
    "楽しさや面白さを体験できる？",
  ];

  const actionImage = [
    "action-skill.jpg",
    "action-money.jpg",
    "action-health.jpg",
    "action-friendship.jpg",
    "action-family.jpg",
    "action-joy.jpg",
  ];

  const inactionCategories = [
    "1. ⌛時間",
    "2. 💰お金",
    "3. 🤝人間関係",
    "4. 🏠環境の安定性",
    "5. 🏃エネルギー",
    "6. 😀変わらない自分",
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
  const initializeScores = (
    numOfCategories: number,
    action: "action" | "inaction"
  ): number[] => {
    if ($returned) {
      if (action === "action" && $actionScores.length > 0) {
        return $actionScores.map((score) => score.points || 0);
      } else if (action === "inaction" && $inactionScores.length > 0) {
        return $inactionScores.map((score) => score.points || 0);
      }
      setReturned(false);
    } else {
      // スコアをリセット
      resetScores(numOfCategories);
      setReturned(true);
    }

    return Array(numOfCategories).fill(3);
  };

  // スコアをリセットする関数
  const resetScores = (numOfCategories: number) => {
    const defaultScores = Array(numOfCategories).fill({
      action: "",
      category: null,
      points: 3,
      note: null,
    });
    actionScores.set(defaultScores);
    inactionScores.set(defaultScores);
    issue.set("");
  };

  // 初期化処理
  if (!$returned) {
    resetScores(actionCategories.length);
    resetScores(inactionCategories.length);
    setReturned(true);
  }

  // 初期値の適用
  actionPoints = initializeScores(actionCategories.length, "action");
  inactionPoints = initializeScores(inactionCategories.length, "inaction");

  // scoreの更新
  actionScores.subscribe(($actionScores) => {
    if ($actionScores.length > 0) {
      $actionScores.forEach((scoreInfo, index) => {
        if (scoreInfo.points !== null) {
          actionPoints[index] = scoreInfo.points;
        }
        if (scoreInfo.note !== null) {
          actionNotes[index] = scoreInfo.note;
        }
      });
    }
  });
  inactionScores.subscribe(($inactionScores) => {
    if ($inactionScores.length > 0) {
      $inactionScores.forEach((scoreInfo, index) => {
        if (scoreInfo.points !== null) {
          inactionPoints[index] = scoreInfo.points;
        }
        if (scoreInfo.note !== null) {
          inactionNotes[index] = scoreInfo.note;
        }
      });
    }
  });

  // データを保存
  function updateScore(
    action: string,
    categoryIndex: number,
    points: number,
    note: string
  ) {
    const categoryName =
      action === "action"
        ? actionCategories[categoryIndex]
        : inactionCategories[categoryIndex];

    if (action === "action") {
      actionScores.update((currentScores) => {
        const updatedScores = [...currentScores];
        updatedScores[categoryIndex] = {
          action,
          category: categoryName,
          points,
          note,
        };
        return updatedScores;
      });
    } else {
      inactionScores.update((currentScores) => {
        const updatedScores = [...currentScores];
        updatedScores[categoryIndex] = {
          action,
          category: categoryName,
          points,
          note,
        };
        return updatedScores;
      });
    }
  }

  // 各ポイント等保存
  function saveData() {
    const newActionPoints = [...actionPoints];
    const newActionNotes = [...actionNotes];
    newActionPoints.forEach((point, index) => {
      updateScore("action", index, point, newActionNotes[index]);
    });

    const newInactionPoints = [...inactionPoints];
    const newInactionNotes = [...inactionNotes];
    newInactionPoints.forEach((point, index) => {
      updateScore("inaction", index, point, newInactionNotes[index]);
    });
  }

  // 結果画面遷移
  function showResult() {
    if (!$issue || $issue.trim() === "") {
      alert("悩みを入力してください");
      return;
    }
    saveData();
    goto("/actionResult");
  }
</script>

<div class="container mx-auto p-4 w-3/5 bg-gray-200 my-8">
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

<div class="justify-center mt-4">
  <div class="container mx-auto p-4 bg-teal-100 mb-8 w-3/5">
    <h2 class="text-2xl mb-4 font-bold text-center">
      行動することで得られるメリット
    </h2>
    <div class="">
      {#each actionCategories as category, index}
        <div class="card lg:card-side bg-base-100 shadow-xl m-4">
          <figure>
            <img
              src={`/${actionImage[index]}`}
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
  <div class="container mx-auto p-4 bg-red-100 mb-8 w-3/5">
    <h2 class="text-2xl mb-4 font-bold text-center">
      行動しないことで得られるメリット
    </h2>
    <div class="">
      {#each inactionCategories as category, index}
        <div class="card lg:card-side bg-base-100 shadow-xl m-4">
          <figure>
            <img
              src={`/${inactionImage[index]}`}
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
</div>

<div class="flex my-4 justify-center align-middle text-center">
  <button
    class="bg-blue-500 hover:bg-blue-700 text-white p-4 mx-2 rounded"
    on:click={showResult}
  >
    比較結果を見る
  </button>
</div>

<style>
  .align-middle {
    align-items: center;
  }
</style>
