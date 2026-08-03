let initialized = new WeakSet<HTMLElement>();

export async function initSearch(selector: string) {
  const container = document.querySelector<HTMLElement>(selector);

  if (!container) return;

  if (initialized.has(container)) return;
  initialized.add(container);

  const bundlePath = container.dataset.bundlePath;

  if (!bundlePath) return;

  // @ts-ignore
  const { PagefindUI } = await import("@pagefind/default-ui");

  const search = new PagefindUI({
    element: selector,
    bundlePath,
    showImages: true,
    showSubResults: false,
  });

  console.log("Pagefind initialized");

  // ========================================
  // Auto search dari ?q=
  // ========================================

  const params = new URLSearchParams(window.location.search);

  const query = params.get("q");

  if (query && selector === "#pagefind-search") {
    requestAnimationFrame(() => {
      setTimeout(() => {
        search.triggerSearch(query);
      }, 100);
    });
  }

  // Tunggu sampai input Pagefind dibuat
  requestAnimationFrame(() => {
    const input = container.querySelector<HTMLInputElement>(
      ".pagefind-ui__search-input"
    );

    if (!input) return;

    input.addEventListener("keydown", e => {
      if (e.key !== "Enter") return;

      // Hanya modal yang melakukan redirect
      if (selector !== "#pagefind-modal-search") return;

      e.preventDefault();

      const keyword = input.value.trim();

      if (!keyword) return;

      window.location.href = `/search?q=${encodeURIComponent(keyword)}`;
    });
  });
}

document.addEventListener("click", e => {
  const button = (e.target as HTMLElement).closest(".popular-search");

  if (!button) return;

  const value = button.getAttribute("data-search");

  if (!value) return;

  const input = document.querySelector<HTMLInputElement>(
    ".pagefind-ui__search-input"
  );

  if (!input) return;

  input.value = value;

  input.dispatchEvent(
    new Event("input", {
      bubbles: true,
    })
  );
});
