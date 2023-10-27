<script lang="ts">
  import { issue, selectedActions, actionCategories } from "./store";
  import { onMount } from "svelte";
  import { goto } from "$app/navigation";

  // 一時的な保存変数
  let actionNotes: string[] = [];

  const actionDetails = [
    "スキルを習得できる",
    "貯金や資産が増える",
    "人間関係が広がる",
    "体調や精神面が良くなる",
  ];

  const inactionDetails = [
    "習得の時間を他に使う",
    "お金を使わずセーブする",
    "今の人間関係を維持する",
    "行動によるストレスが無い",
  ];

  const actionImage = [
    "action-skill.jpg",
    "action-money.jpg",
    "action-friendship.jpg",
    "action-health.jpg",
  ];

  const inactionImage = [
    "inaction-clock.jpg",
    "inaction-money.jpg",
    "inaction-friendship.jpg",
    "inaction-myself.jpg",
  ];

  onMount(() => {
    selectedActions.set(
      actionCategories.map((category) => ({
        category,
        action: "どちらでもない",
        memo: "",
      }))
    );

    // actionNotes を初期化
    actionNotes = new Array(actionCategories.length).fill("");
  });

  function updateAction(
    index: number,
    action: "行動する" | "どちらでもない" | "行動しない"
  ) {
    selectedActions.update((currentActions) => {
      const updatedActions = [...currentActions];
      updatedActions[index] = { ...updatedActions[index], action };
      return updatedActions;
    });
  }

  // 行動の選択とメモをstoreに保存
  function saveSelectedActionsAndNotes() {
    selectedActions.update((currentActions) => {
      return currentActions.map((action, index) => ({
        ...action,
        memo: actionNotes[index],
      }));
    });
    console.log($selectedActions);
  }

  // 結果画面遷移
  function showResult() {
    if (!$issue || $issue.trim() === "") {
      alert("悩みを入力してください");
      return;
    }
    // 行動の選択とメモをstoreに保存
    saveSelectedActionsAndNotes();
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
      <h2 class="text-2xl mb-4 font-bold text-center">
        行動する？行動しない？どちらの方が魅力的？
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
              <h2 class="card-title">{category}　に対する影響</h2>
              <p>行動するメリット：　{actionDetails[index]}　など…</p>
              <p>行動しないメリット：　{inactionDetails[index]}　など…</p>
              <div class="flex justify-center items-center">
                <label class="mx-2">
                  <input
                    type="radio"
                    value="行動する"
                    checked={$selectedActions[index].action === "行動する"}
                    on:change={() => updateAction(index, "行動する")}
                  />
                  行動する
                </label>
                <label class="mx-2">
                  <input
                    type="radio"
                    value="どちらでもない"
                    checked={$selectedActions[index].action ===
                      "どちらでもない"}
                    on:change={() => updateAction(index, "どちらでもない")}
                  />
                  どちらでもない
                </label>
                <label class="mx-2">
                  <input
                    type="radio"
                    value="行動しない"
                    checked={$selectedActions[index].action === "行動しない"}
                    on:change={() => updateAction(index, "行動しない")}
                  />
                  行動しない
                </label>
              </div>
              <input
                type="text"
                placeholder="メモ"
                bind:value={actionNotes[index]}
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
