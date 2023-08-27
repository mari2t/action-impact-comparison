<!-- src/App.svelte -->
<script>
  let doMerits = "";
  let doDemerits = "";
  let notDoMerits = "";
  let notDoDemerits = "";
</script>

<div class="container">
  <div class="grid">
    <div>
      <h2 class="text-xl font-semibold">行う場合</h2>
      <label for="doMerits" class="block mt-4">メリット</label>
      <textarea
        id="doMerits"
        bind:value={doMerits}
        class="w-full h-24 p-2 border rounded"
      />

      <label for="doDemerits" class="block mt-4">デメリット</label>
      <textarea
        id="doDemerits"
        bind:value={doDemerits}
        class="w-full h-24 p-2 border rounded"
      />
    </div>

    <div>
      <h2 class="text-xl font-semibold">行わない場合</h2>
      <label for="notDoMerits" class="block mt-4">メリット</label>
      <textarea
        id="notDoMerits"
        bind:value={notDoMerits}
        class="w-full h-24 p-2 border rounded"
      />

      <label for="notDoDemerits" class="block mt-4">デメリット</label>
      <textarea
        id="notDoDemerits"
        bind:value={notDoDemerits}
        class="w-full h-24 p-2 border rounded"
      />
    </div>
  </div>

  <div class="mt-8">
    <h2 class="text-xl font-semibold">比較結果</h2>
    <p>行う場合のメリット: {doMerits}</p>
    <p>行う場合のデメリット: {doDemerits}</p>
    <p>行わない場合のメリット: {notDoMerits}</p>
    <p>行わない場合のデメリット: {notDoDemerits}</p>
  </div>
</div>
