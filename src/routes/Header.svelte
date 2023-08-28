<script>
  import logo from "$lib/images/icon.png";
  import github from "$lib/images/github.svg";
</script>

<header class="flex justify-between bg-gray-100 p-4 shadow-md">
  <div class="w-12 h-12">
    <a href="/">
      <img src={logo} alt="SvelteKit" class="w-12 h-12 object-contain" />
    </a>
  </div>
  <div class="flex items-center text-2xl font-bold">
    <p>Action Impact Comparison</p>
  </div>
  <div class="w-12 h-12">
    <a href="https://github.com/mari2t/action-impactc-comparison">
      <img src={github} alt="GitHub" class="w-8 h-8 object-contain" />
    </a>
  </div>
</header>
