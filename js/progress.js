(() => {
  const taskCount = 43;
  const key = "dani-launchpad-v2";
  const links = [
    ...Array(4).fill("aprender.html#preparar"),
    ...Array(4).fill("aprender.html#github"),
    ...Array(3).fill("aprender.html#vscode"),
    ...Array(3).fill("aprender.html#ia"),
    ...Array(4).fill("aprender.html#produto"),
    ...Array(6).fill("aprender.html#construir"),
    ...Array(5).fill("aprender.html#testar"),
    ...Array(4).fill("aprender.html#publicar"),
    ...Array(5).fill("entrevistas.html#entrevista"),
    ...Array(5).fill("entrevistas.html#treino-entrevista"),
  ];
  let completed = [];
  function read() {
    try {
      const value = JSON.parse(localStorage.getItem(key) || "[]");
      completed = Array.isArray(value)
        ? value.slice(0, taskCount).map(Boolean)
        : [];
    } catch {
      completed = [];
    }
  }
  function render() {
    document.querySelectorAll(".task input").forEach((input) => {
      input.checked = Boolean(completed[Number(input.dataset.taskIndex)]);
    });
    const done = completed.filter(Boolean).length;
    const counter = document.getElementById("counter");
    if (counter) counter.textContent = `${done} / ${taskCount} tarefas`;
    const percent = Math.round((done / taskCount) * 100);
    const fill = document.getElementById("fill");
    if (fill) fill.style.width = `${percent}%`;
    document
      .getElementById("progress")
      ?.setAttribute("aria-valuenow", String(percent));
    const next = document.getElementById("continue");
    if (next) {
      const index = links.findIndex((_, i) => !completed[i]);
      next.href = links[index] || "aprender.html";
      next.firstChild.textContent = done
        ? index === -1
          ? "Rever o percurso "
          : "Continuar o percurso "
        : "Começar o percurso ";
    }
  }
  function persist() {
    try {
      localStorage.setItem(key, JSON.stringify(completed));
    } catch {
      const toast = document.getElementById("toast");
      if (toast)
        toast.textContent = "O navegador não permite guardar o progresso.";
    }
    render();
  }
  read();
  render();
  document.querySelectorAll(".task input").forEach((input) => {
    input.addEventListener("change", () => {
      const checked = input.checked;
      read();
      completed[Number(input.dataset.taskIndex)] = checked;
      persist();
    });
  });
  document.getElementById("reset")?.addEventListener("click", () => {
    if (!confirm("Apagar o progresso das tarefas neste navegador?")) return;
    completed = [];
    persist();
  });
  addEventListener("storage", (event) => {
    if (event.key === key) {
      read();
      render();
    }
  });
})();
