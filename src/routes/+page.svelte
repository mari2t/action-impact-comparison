<script>
  let worryText = "";
  let inactionText = "";
  let actionText = "";

  let worryOutput = "";
  let inactionOutput = "";
  let actionOutput = "";

  function updateWorry() {
    worryOutput = worryText;
    worryText = "";
  }

  function updateInaction() {
    inactionOutput = inactionText;
    inactionText = "";
  }

  function updateAction() {
    actionOutput = actionText;
    actionText = "";
  }
</script>

<div class="text-center">
  <!-- 悩んでいること -->
  <div class="m-4">
    <label for="worry" class="mr-2">悩んでいること: </label>
    <input id="worry" type="text" class="border p-2" bind:value={worryText} />
    <button class="bg-gray-500 text-white p-2 ml-2" on:click={updateWorry}
      >OK</button
    >
    <div>{worryOutput}</div>
  </div>
</div>

<div class="flex h-screen">
  <div class="flex flex-col w-1/2 bg-blue-100">
    <!-- 行動しない場合 -->
    <div class="m-4">
      <label for="inaction" class="mr-2">行動しない場合: </label>
      <div class="flex">
        <img
          src="/src/lib/images/inaction-icon.png"
          alt="Inaction scenario"
          class="w-12 h-12"
        />
        <input
          id="inaction"
          type="text"
          class="border p-2"
          bind:value={inactionText}
        />
        <button
          class="bg-blue-500 text-white p-2 ml-2"
          on:click={updateInaction}>OK</button
        >
      </div>
      <div>{inactionOutput}</div>
    </div>
  </div>
  <div class="flex flex-col w-1/2 bg-[#f8e8ee]">
    <!-- 行動する場合 -->

    <div class="m-4">
      <label for="action" class="mr-2 text-center">行動する場合: </label>
      <div class="flex">
        <img
          src="/src/lib/images/action-icon.png"
          alt="Action scenario"
          class="w-12 h-12"
        />
        <input
          id="action"
          type="text"
          class="border p-2"
          bind:value={actionText}
        />
        <button class="bg-pink-500 text-white p-2 ml-2" on:click={updateAction}
          >OK</button
        >
      </div>
      <div>{actionOutput}</div>
    </div>
  </div>
</div>
