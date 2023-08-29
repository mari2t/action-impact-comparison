<script lang="ts">
  let worryText: string = "";
  let inactionText: string = "";
  let actionText: string = "";

  let worryOutputs: string[] = [];
  let inactionOutputs: string[] = [];
  let actionOutputs: string[] = [];

  let worryInput: HTMLInputElement;
  let inactionInput: HTMLInputElement;
  let actionInput: HTMLInputElement;

  function updateWorry() {
    worryOutputs = [...worryOutputs, worryText];
    worryText = "";
    worryInput.focus();
  }

  function updateInaction() {
    inactionOutputs = [...inactionOutputs, inactionText];
    inactionText = "";
    inactionInput.focus();
  }

  function updateAction() {
    actionOutputs = [...actionOutputs, actionText];
    actionText = "";
    actionInput.focus();
  }
</script>

<div class="text-center p-4">
  <!-- 悩んでいること -->
  <div class="m-4 p-2 rounded bg-gray-200 shadow">
    <label for="worry" class="text-lg font-semibold">悩んでいること: </label>
    <input
      id="worry"
      type="text"
      class="border p-2 rounded"
      bind:value={worryText}
      bind:this={worryInput}
    />
    <button
      class="bg-gray-700 text-white p-2 ml-2 rounded"
      on:click={updateWorry}>OK</button
    >
    <div>
      {#each worryOutputs as output}
        <img
          src="/src/lib/images/inaction-icon.png"
          alt="Inaction scenario"
          class="w-24 h-24 mx-2"
        />
        <p class="w-72 m-0 mt-1 py-2 px-4 rounded text-gray-900 bg-e0efff">
          {output}
        </p>
      {/each}
    </div>
  </div>
</div>

<div class="flex h-screen">
  <!-- 行動しない場合 -->
  <div class="flex flex-col w-2/3 p-4">
    <div class="m-4 p-2">
      <div class="flex justify-center my-2">
        <label for="inaction" class="text-lg font-semibold"
          >悪魔のささやき
        </label>
      </div>
      <div class="flex items-center">
        <img
          src="/src/lib/images/inaction-icon.png"
          alt="Inaction scenario"
          class="w-32 h-32 mx-2"
        />
        <input
          id="inaction"
          type="text"
          class="border-2 p-2 mx-2 rounded"
          bind:value={inactionText}
          bind:this={inactionInput}
        />
        <button
          class="bg-gray-700 text-white p-2 mx-2 rounded"
          on:click={updateInaction}>OK</button
        >
      </div>
      <div>
        {#each inactionOutputs as output}
          <p class="mt-2">{output}</p>
        {/each}
      </div>
    </div>
  </div>

  <!-- 行動する場合 -->
  <div class="flex flex-col w-2/3 p-2">
    <div class="m-4 p-2">
      <div class="flex justify-center my-2">
        <label for="action" class="text-lg font-semibold"
          >天使のささやき
        </label>
      </div>
      <div class="flex items-center">
        <img
          src="/src/lib/images/action-icon.png"
          alt="Action scenario"
          class="w-32 h-32 mx-2"
        />
        <input
          id="action"
          type="text"
          class="border p-2 mx-2 rounded border-2"
          bind:value={actionText}
          bind:this={actionInput}
        />
        <button
          class="bg-gray-700 text-white p-2 mx-2 rounded"
          on:click={updateAction}>OK</button
        >
      </div>
    </div>
    <div>
      {#each actionOutputs as output}
        <p class="mt-2 ml-12">{output}</p>
      {/each}
    </div>
  </div>
</div>
