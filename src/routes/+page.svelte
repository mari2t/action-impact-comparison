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
    "スキルアップ",
    "家族・親族関係",
    "健康",
    "交友関係",
    "経済的状況",
    "興味・趣味",
  ];

  const actionDetails = [
    "資格やスキルを手に入れることで、キャリアが向上し収入が増加する可能性があります。",
    "家庭内のコミュニケーションが良くなり、精神的なサポートが増える可能性があります。",
    "体調が良く、精神的にも安定し、生活の質が向上する可能性があります。",
    "ネットワーキングが広がり、精神的な充足感が得られます。",
    "貯金や投資により、将来的な経済的安定を手に入れることができます。",
    "心の充足とリラクゼーションが得られ、時には新しい人々と出会うきっかけにもなります。",
  ];

  const inactionCategories = [
    "スキルアップ",
    "家族・親族関係",
    "健康",
    "交友関係",
    "経済的状況",
    "興味・趣味",
  ];

  const inactionDetails = [
    "学費や時間を節約し、それを他の活動や投資に使えます。",
    "自分自身の時間を確保でき、独立した生活を楽しむことができます。",
    "すぐには時間とお金を節約できますが、長期的には健康問題が出るリスクが高まります。",
    "人間関係のストレスを避けられ、自分自身に集中する時間が増えます。",
    "短期的な楽しみや体験にお金を使えますが、将来的なリスクが高まります。",
    "趣味にかかる時間や費用を節約し、それを他の必要な事項に振り向けることができます。",
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

<div class="container mx-auto p-4 w-3/4">
  <h2 class="text-2xl mb-4">行動することで得られるメリット</h2>
  {#each actionCategories as category, index}
    <div class="mb-4 flex">
      <div class="w-1/2">
        <p class="text-lg">{category}</p>
        <p class="text-gray-500">{actionDetails[index]}</p>
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
        <p class="text-gray-500">{inactionDetails[index]}</p>
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
