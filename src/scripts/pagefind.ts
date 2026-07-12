let initialized = new WeakSet<HTMLElement>();

export async function initSearch(selector: string) {
  const container = document.querySelector<HTMLElement>(selector);

  if (!container) return;

  if (initialized.has(container)) return;
  initialized.add(container);

  const bundlePath = container.dataset.bundlePath;
  if (!bundlePath) return;

  const params = new URLSearchParams(window.location.search);

  // @ts-expect-error
  const { PagefindUI } = await import("@pagefind/default-ui");

  const search = new PagefindUI({
    element: selector,
    bundlePath,

    showImages: false,
    showSubResults: false,

    processTerm(term: string) {
      params.set("q", term);
      history.replaceState(history.state, "", "?" + params.toString());
      return term;
    },
  });

  console.log("PagefindUI created");

  const query = params.get("q");

  console.log("query =", query);

  if (query) {
    setTimeout(() => {
      console.log("Triggering search:", query);
      search.triggerSearch(query);

      console.log("triggerSearch called");
    }, 300);
  }

  requestAnimationFrame(() => {
    const input = container.querySelector<HTMLInputElement>(
      ".pagefind-ui__search-input"
    );

    if (!input) return;

    input.addEventListener("keydown", e => {
      if (e.key !== "Enter") return;

      e.preventDefault();

      const value = input.value.trim();

      if (!value) return;

      window.location.href = `/search?q=${encodeURIComponent(value)}`;
    });
  });
}
