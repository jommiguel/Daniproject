(() => {
  "use strict";
  const read = (key, fallback = "") => {
    try {
      return localStorage.getItem(key) || fallback;
    } catch {
      return fallback;
    }
  };
  const save = (key, value) => {
    try {
      localStorage.setItem(key, value);
    } catch {
      document.querySelector("#toast").textContent =
        "O navegador não permite guardar. Podes continuar nesta página.";
    }
  };
  const menu = document.querySelector(".menu-toggle");
  const nav = document.querySelector("#site-nav");
  const closeMenu = () => {
    menu.setAttribute("aria-expanded", "false");
    menu.setAttribute("aria-label", "Abrir navegação");
    nav.classList.remove("open");
  };
  menu.addEventListener("click", () => {
    const expanded = menu.getAttribute("aria-expanded") !== "true";
    menu.setAttribute("aria-expanded", String(expanded));
    menu.setAttribute(
      "aria-label",
      expanded ? "Fechar navegação" : "Abrir navegação",
    );
    nav.classList.toggle("open", expanded);
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && nav.classList.contains("open")) {
      closeMenu();
      menu.focus();
    }
  });
  document.addEventListener("click", (event) => {
    if (!event.target.closest(".site-header")) closeMenu();
  });
  const header = document.querySelector(".site-header");
  addEventListener(
    "scroll",
    () => header.classList.toggle("scrolled", scrollY > 24),
    { passive: true },
  );

  // Reveal only offscreen elements, so content is always readable without JavaScript.
  if (
    "IntersectionObserver" in window &&
    !matchMedia("(prefers-reduced-motion: reduce)").matches
  ) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.remove("waiting");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.05 },
    );
    document
      .querySelectorAll("main .reveal, .page-content > section")
      .forEach((element) => {
        element.classList.add("reveal");
        if (element.getBoundingClientRect().top > innerHeight && !location.hash)
          element.classList.add("waiting");
        observer.observe(element);
      });
  }

  // Keep the original assistant selector as a native fallback.
  const select = document.querySelector("#tool-choice");
  if (select) {
    const picker = document.createElement("div");
    picker.className = "tool-picker";
    picker.setAttribute("role", "group");
    picker.setAttribute("aria-label", "Escolher assistente");
    const descriptions = {
      chatgpt: "Aprender e pensar em conversa",
      claude: "Trabalhar nos ficheiros do projeto",
      codex: "Implementar e rever no repositório",
    };
    [...select.options].forEach((option) => {
      const button = document.createElement("button");
      button.type = "button";
      const title = document.createElement("strong");
      title.textContent = option.text;
      const caption = document.createElement("small");
      caption.textContent = descriptions[option.value];
      button.append(title, caption);
      button.dataset.tool = option.value;
      button.setAttribute(
        "aria-pressed",
        String(select.value === option.value),
      );
      button.addEventListener("click", () => {
        select.value = option.value;
        select.dispatchEvent(new Event("change"));
        picker
          .querySelectorAll("button")
          .forEach((b) => b.setAttribute("aria-pressed", String(b === button)));
      });
      picker.append(button);
    });
    select.after(picker);
    select.hidden = true;
    document
      .querySelector(`label[for="${select.id}"]`)
      ?.setAttribute("hidden", "");
  }
  const search = document.querySelector("#prompt-search");
  if (search) {
    const filter = () => {
      const query = search.value.trim().toLocaleLowerCase("pt-PT");
      const items = [
        ...document.querySelectorAll(
          "#tool-prompts .prompt-station, #prompts > div",
        ),
      ];
      let count = 0;
      items.forEach((item) => {
        item.hidden = !item.textContent
          .toLocaleLowerCase("pt-PT")
          .includes(query);
        if (!item.hidden) count++;
      });
      document.querySelector("#search-status").textContent = count
        ? `${count} prompts disponíveis`
        : "Sem resultados. Experimenta outra palavra.";
    };
    search.addEventListener("input", filter);
    select.addEventListener("change", filter);
    filter();
  }
  const answer = document.querySelector("#interview-answer");
  const question = document.querySelector("#interview-question");
  if (answer && question) {
    const key = () => "manual-answer-v1-" + question.textContent.trim();
    answer.value = read(key());
    answer.addEventListener("input", () => save(key(), answer.value));
    document.querySelector("#interview-next").addEventListener("click", () => {
      answer.value = read(key());
      question.tabIndex = -1;
      question.focus();
    });
  }
  document.querySelector("#launch-reset")?.addEventListener(
    "click",
    (event) => {
      if (!confirm("Limpar as verificações da demonstração?"))
        event.stopImmediatePropagation();
    },
    true,
  );
})();
// Branded button groups retain native select values for the existing exercises.
(() => {
  document
    .querySelectorAll("main select:not(#tool-choice)")
    .forEach((select) => {
      const group = document.createElement("div");
      group.className = "choice-group";
      group.setAttribute("role", "group");
      const label = document.querySelector(`label[for="${select.id}"]`);
      group.setAttribute(
        "aria-label",
        label?.textContent.trim() || "Escolher opção",
      );
      [...select.options].forEach((option) => {
        const button = document.createElement("button");
        button.type = "button";
        button.textContent = option.textContent;
        button.setAttribute(
          "aria-pressed",
          String(select.value === option.value),
        );
        button.addEventListener("click", () => {
          select.value = option.value;
          select.dispatchEvent(new Event("change"));
          group
            .querySelectorAll("button")
            .forEach((item) =>
              item.setAttribute("aria-pressed", String(item === button)),
            );
        });
        group.append(button);
      });
      select.hidden = true;
      select.after(group);
    });
  const animation = document.querySelector("#process-animation");
  if (!animation) return;
  const play = document.querySelector("#motion-play");
  const status = document.querySelector("#motion-status");
  const stillSource = animation.getAttribute("src");
  const animatedSource = animation.dataset.animation || "assets/processo.gif";
  let playing = false;
  function setPlaying(next) {
    playing = next;
    animation.src = playing ? animatedSource : stillSource;
    play.setAttribute("aria-pressed", String(playing));
    play.textContent = playing ? "Parar animação" : "Reproduzir animação";
    status.textContent = playing
      ? "Animação em reprodução."
      : "Animação parada.";
  }
  play.addEventListener("click", () => setPlaying(!playing));
  document.querySelector("#motion-restart").addEventListener("click", () => {
    animation.src = stillSource;
    requestAnimationFrame(() => setPlaying(true));
  });
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) setPlaying(false);
  });
})();
