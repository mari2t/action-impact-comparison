<script lang="ts">
  import {
    issue,
    returned,
    actionScores,
    inactionScores,
    setReturned,
    selectedActions,
  } from "./store";
  import { goto } from "$app/navigation";

  interface ScoreInfo {
    action?: string;
    category: string | null;
    points: number | null;
    note: string | null;
  }
  // 一時的な保存変数
  let actionPoints: number[] = [];
  let actionNotes: string[] = [];
  let inactionPoints: number[] = [];
  let inactionNotes: string[] = [];

  const actionCategories = [
    "🚀能力",
    "💴経済的状況",
    "🫶交友関係",
    "💪健康",
    "🎵楽しみ",
  ];

  const actionDetails = [
    "スキルを手に入れることできる？",
    "貯金や資産が増える？",
    "人間関係が広がる？",
    "体調や精神面に対して良い？",
    "楽しさや面白さを体験できる？",
  ];

  const actionImage = [
    "action-skill.jpg",
    "action-money.jpg",
    "action-friendship.jpg",
    "action-health.jpg",
    "action-joy.jpg",
  ];

  const inactionImage = [
    "inaction-clock.jpg",
    "inaction-money.jpg",
    "inaction-friendship.jpg",
    "inaction-circumstance.jpg",
    "inaction-myself.jpg",
  ];

  // 結果画面遷移
  function showResult() {
    if (!$issue || $issue.trim() === "") {
      alert("悩みを入力してください");
      return;
    }

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

<div class="flex justify-center w-full mt-4">
  <div class="flex w-2/3 justify-center align-middle">
    <div class="container mx-4 p-4 bg-gradient-teal200-white-red200 mb-8">
      <h2 class="text-2xl mb-4 font-bold text-center">行動を比較する</h2>
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
              <div class=" mx-auto flex justify-center items-center">
                <label>
                  <input
                    type="radio"
                    bind:group={$selectedActions[index]}
                    value="行動する"
                  />
                  行動する
                </label>

                <label>
                  <input
                    type="radio"
                    bind:group={$selectedActions[index]}
                    value="考え中"
                  />
                  考え中
                </label>

                <label>
                  <input
                    type="radio"
                    bind:group={$selectedActions[index]}
                    value="行動しない"
                  />
                  行動しない
                </label>
              </div>
              <input
                type="text"
                placeholder="メモ"
                bind:value={actionNotes[index]}
                maxlength="30"
                class="border rounded ml-2 w-4/5 p-2"
              />
            </div>
            <figure>
              <img
                src={`/src/lib/images/${inactionImage[index]}`}
                alt={category}
                class="rounded-xl p-4 w-2/3"
              />
            </figure>
          </div>
        {/each}
      </div>
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
