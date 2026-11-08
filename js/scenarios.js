(() => {
  const cases = [
    {
      title: "A IA pede uma chave de API",
      body: "O assistente sugere colocar uma chave diretamente no JavaScript do site para acelerar a integração.",
      options: [
        "Aceitar: é só uma demonstração.",
        "Não incluir segredos no código público; procurar alternativa segura.",
        "Esconder a chave num comentário.",
      ],
      correct: 1,
      why: "Uma chave num ficheiro servido ao navegador pode ser exposta. Para este MVP, podes trabalhar com dados locais e sem API.",
    },
    {
      title: "O filtro não funciona",
      body: "O botão “Entrevista” mostra candidaturas com outros estados. A IA diz que já corrigiu.",
      options: [
        "Pedir reprodução do erro, rever alterações e testar novamente.",
        "Confiar na IA e publicar.",
        "Eliminar o filtro para evitar o problema.",
      ],
      correct: 0,
      why: "Uma correção só está validada quando reproduzes o problema, verificas a alteração e confirmas que o erro desapareceu.",
    },
    {
      title: "O site fica apertado a 320 px",
      body: "No telemóvel, o formulário provoca scroll horizontal e o botão Guardar fica cortado.",
      options: [
        "Diminuir toda a tipografia até caber.",
        "Esconder campos importantes no telemóvel.",
        "Inspecionar larguras fixas, adaptar o layout e testar com teclado.",
      ],
      correct: 2,
      why: "Mobile-first exige que a interface se adapte ao espaço disponível sem perder legibilidade nem funcionalidade.",
    },
    {
      title: "Chegou a entrevista",
      body: "Perguntam-te: “Que parte do projeto fizeste tu e que parte foi feita pela IA?”",
      options: [
        "Dizer que fizeste tudo sozinho.",
        "Explicar decisões, prompts, revisões, testes e limitações com exemplos.",
        "Dizer que a IA fez tudo e que não sabes explicar.",
      ],
      correct: 1,
      why: "O teu contributo está em definir o problema, escolher soluções, verificar o resultado e conseguir explicar as decisões.",
    },
  ];
  let index = 0,
    answered = false;
  const title = document.getElementById("scenario-title"),
    body = document.getElementById("scenario-body"),
    choices = document.getElementById("scenario-choices"),
    feedback = document.getElementById("scenario-feedback"),
    next = document.getElementById("scenario-next");
  function draw() {
    answered = false;
    const c = cases[index];
    document.getElementById("scenario-progress").textContent =
      "Cenário " + (index + 1) + " de " + cases.length;
    title.textContent = c.title;
    body.textContent = c.body;
    feedback.textContent = "";
    next.hidden = true;
    choices.replaceChildren();
    c.options.forEach((option, n) => {
      const b = document.createElement("button");
      b.className = "button";
      b.type = "button";
      b.textContent = option;
      b.addEventListener("click", () => {
        if (answered) return;
        answered = true;
        feedback.textContent =
          (n === c.correct ? "Boa decisão. " : "Esta decisão tem riscos. ") +
          c.why;
        for (const child of choices.children) child.disabled = true;
        next.hidden = false;
        next.textContent =
          index === cases.length - 1 ? "Repetir desafios" : "Próximo cenário";
        next.focus();
      });
      choices.append(b);
    });
  }
  next.addEventListener("click", () => {
    index = (index + 1) % cases.length;
    draw();
    choices.querySelector("button")?.focus();
  });
  draw();
  const checks = [
    "Consigo explicar o problema e o utilizador em 30 segundos.",
    "Criei e testei uma candidatura com dados fictícios.",
    "Testei editar, filtrar, apagar e recarregar a página.",
    "Testei a interface com teclado e num ecrã pequeno.",
    "Revisei o código e consigo explicar uma decisão técnica.",
    "Confirmei que não há passwords, chaves ou dados pessoais no repositório.",
    "O README descreve funcionalidades, limitações e o papel da IA.",
    "Consigo apresentar o projeto em cinco minutos sem ler um guião.",
  ];
  const host = document.getElementById("launch-checks"),
    result = document.getElementById("launch-result"),
    key = "dani-launch-check-v1";
  let saved = [];
  try {
    saved = JSON.parse(localStorage.getItem(key) || "[]");
    if (!Array.isArray(saved)) saved = [];
  } catch {}
  function count() {
    const done = [...host.querySelectorAll("input")].filter(
      (x) => x.checked,
    ).length;
    result.textContent =
      done +
      " de " +
      checks.length +
      " verificações concluídas" +
      (done === checks.length
        ? " — pronto para uma demonstração de treino."
        : " — continua a testar antes de apresentar.");
    try {
      localStorage.setItem(
        key,
        JSON.stringify(
          [...host.querySelectorAll("input")].map((x) => x.checked),
        ),
      );
    } catch {}
  }
  checks.forEach((t, i) => {
    const l = document.createElement("label"),
      input = document.createElement("input"),
      span = document.createElement("span");
    input.type = "checkbox";
    input.checked = Boolean(saved[i]);
    input.addEventListener("change", count);
    span.textContent = t;
    l.append(input, span);
    host.append(l);
  });
  document.getElementById("launch-reset").addEventListener("click", () => {
    host.querySelectorAll("input").forEach((x) => (x.checked = false));
    count();
  });
  count();
})();
