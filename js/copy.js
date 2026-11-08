document.querySelectorAll("[data-copy]").forEach((button) =>
  button.addEventListener("click", async () => {
    const t = button.getAttribute("data-copy");
    try {
      await navigator.clipboard.writeText(t);
      button.textContent = "Copiado";
    } catch {
      const el = document.createElement("textarea");
      el.value = t;
      document.body.append(el);
      el.select();
      try {
        document.execCommand("copy");
        button.textContent = "Copiado";
      } catch {
        button.textContent = "Seleciona o texto no exemplo";
      }
      el.remove();
    }
    setTimeout(() => {
      button.textContent = button.textContent.replace(
        "Copiado",
        "Copiar prompt",
      );
    }, 2200);
  }),
);
