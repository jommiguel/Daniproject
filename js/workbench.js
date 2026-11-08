(() => {
  const pieces = [
    { id: "goal", text: "Definir o problema e o público" },
    { id: "repo", text: "Criar o repositório GitHub" },
    { id: "ai", text: "Pedir à IA uma primeira tarefa pequena" },
    { id: "test", text: "Abrir e testar no navegador" },
    { id: "publish", text: "Rever, fazer commit e publicar" },
  ];
  const shuffled = ["test", "ai", "goal", "publish", "repo"];
  let order = [],
    selected = null;
  const source = document.getElementById("flow-source"),
    slots = document.getElementById("flow-slots"),
    feedback = document.getElementById("flow-feedback");
  function makeChip(id) {
    const p = pieces.find((x) => x.id === id);
    const b = document.createElement("button");
    b.type = "button";
    b.className = "flow-chip";
    b.textContent = p.text;
    b.draggable = true;
    b.dataset.id = id;
    b.setAttribute("aria-pressed", String(selected === id));
    b.addEventListener("click", () => {
      selected = selected === id ? null : id;
      render();
      document.querySelector('.flow-chip[data-id="' + id + '"]')?.focus();
    });
    b.addEventListener("dragstart", (e) => {
      selected = id;
      e.dataTransfer.setData("text/plain", id);
      e.dataTransfer.effectAllowed = "move";
    });
    return b;
  }
  function place(id, index) {
    if (!pieces.some((p) => p.id === id)) return;
    order = order.filter((x) => x !== id);
    order.splice(Math.max(0, Math.min(index, order.length)), 0, id);
    selected = null;
    feedback.textContent = "";
    render();
    slots
      .querySelectorAll(".flow-slot")
      [Math.min(index + 1, 4)]?.querySelector("button")
      ?.focus();
  }
  function render() {
    source.replaceChildren();
    slots.replaceChildren();
    shuffled
      .filter((id) => !order.includes(id))
      .forEach((id) => source.append(makeChip(id)));
    for (let i = 0; i < 5; i++) {
      const slot = document.createElement("div");
      slot.className = "flow-slot";
      slot.dataset.index = String(i);
      const label = document.createElement("strong");
      label.textContent = String(i + 1).padStart(2, "0");
      slot.append(label);
      if (order[i]) {
        slot.append(makeChip(order[i]));
        const remove = document.createElement("button");
        remove.className = "button";
        remove.type = "button";
        remove.textContent = "×";
        remove.setAttribute("aria-label", "Retirar passo " + (i + 1));
        remove.addEventListener("click", () => {
          order.splice(i, 1);
          selected = null;
          feedback.textContent = "";
          render();
        });
        slot.append(remove);
      } else {
        const add = document.createElement("button");
        add.className = "button";
        add.type = "button";
        add.textContent = "Colocar aqui";
        add.setAttribute("aria-label", "Colocar passo na posição " + (i + 1));
        add.addEventListener("click", () => {
          if (selected) place(selected, i);
          else feedback.textContent = "Seleciona primeiro uma peça.";
        });
        slot.append(add);
      }
      slot.addEventListener("dragover", (e) => {
        e.preventDefault();
        slot.classList.add("dragover");
      });
      slot.addEventListener("dragleave", () =>
        slot.classList.remove("dragover"),
      );
      slot.addEventListener("drop", (e) => {
        e.preventDefault();
        slot.classList.remove("dragover");
        place(e.dataTransfer.getData("text/plain"), i);
      });
      slots.append(slot);
    }
  }
  document.getElementById("flow-check").addEventListener("click", () => {
    if (order.length !== 5) {
      feedback.textContent = "Ainda faltam " + (5 - order.length) + " passos.";
      return;
    }
    const expected = pieces.map((p) => p.id);
    const count = order.filter((id, i) => id === expected[i]).length;
    feedback.textContent =
      count === 5
        ? "Excelente! Os cinco passos estão na ordem certa. Agora explica porquê."
        : count +
          " de 5 passos na posição correta. Pensa no que tens de fazer antes de pedir código à IA.";
  });
  document.getElementById("flow-reset").addEventListener("click", () => {
    order = [];
    selected = null;
    feedback.textContent = "Podes tentar outra vez.";
    render();
  });
  render();
  const tasks = {
    form: "criar um formulário para registar uma tarefa, com título, descrição, prazo e estado",
    filter: "adicionar um filtro por estado (por fazer, em curso e concluída)",
    source:
      "criar uma secção de fontes com título, URL, data de consulta e nota de verificação",
    access:
      "melhorar labels, foco visível, mensagens de erro e navegação por teclado",
  };
  const goal = document.getElementById("prompt-goal"),
    level = document.getElementById("prompt-level"),
    output = document.getElementById("prompt-builder-output");
  function build() {
    output.textContent =
      "Sou iniciante. Estou a criar um projeto em HTML, CSS e JavaScript vanilla.\n\nObjetivo: " +
      tasks[goal.value] +
      ".\n\nRegras: código legível, sem dependências desnecessárias, mobile-first, acessibilidade e dados fictícios.\n\n" +
      (level.value === "guide"
        ? "Antes de editar ficheiros, explica o plano, mostra o que vais alterar e espera pela minha confirmação."
        : "Analisa os ficheiros existentes e sugere alterações concretas, mas não edites nada.") +
      "\n\nNo fim, diz-me como verificar o resultado e quais os casos de erro a testar. Não inventes testes realizados.";
  }
  goal.addEventListener("change", build);
  level.addEventListener("change", build);
  build();
  document
    .getElementById("prompt-builder-copy")
    .addEventListener("click", async () => {
      const t = output.textContent;
      try {
        await navigator.clipboard.writeText(t);
        document.getElementById("prompt-builder-feedback").textContent =
          "Prompt copiado. Cola-o no teu assistente de programação.";
      } catch {
        document.getElementById("prompt-builder-feedback").textContent =
          "Seleciona e copia o texto acima manualmente.";
      }
    });
  const input = document.getElementById("demo-label"),
    button = document.getElementById("demo-action"),
    code = document.getElementById("code-preview"),
    result = document.getElementById("demo-result");
  function sync() {
    const label = input.value.trim() || "Botão sem nome";
    button.textContent = label;
    code.textContent =
      '<button type="button">' +
      label
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;") +
      "</button>";
  }
  input.addEventListener("input", sync);
  button.addEventListener("click", () => {
    result.textContent =
      "Clique detetado! Numa app real, este evento poderia guardar dados.";
  });
  sync();
})();
