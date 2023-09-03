<script>
  import Header from "./Header.svelte";
  import "../app.css";
</script>

<div class="custom-bg">
  <Header />

  <main>
    <slot />
  </main>

  <footer>
    <p>© 2023 - Present mari2t All rights reserved.</p>
  </footer>
</div>

<style>
  footer {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 12px;
  }

  @media (min-width: 480px) {
    footer {
      padding: 12px 0;
    }
  }
</style>
