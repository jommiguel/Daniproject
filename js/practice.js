(() => {
  const steps = [
    [
      "Abre github.com",
      "Entra na tua conta GitHub no navegador.",
      "github.com · Sign in",
    ],
    [
      "Abre o menu de criação",
      "Procura o botão + no topo do GitHub e escolhe New repository.",
      "＋  →  New repository",
    ],
    [
      "Escolhe o nome",
      "Escreve um nome curto, por exemplo primeiro-projeto.",
      "Repository name: primeiro-projeto",
    ],
    [
      "Define a visibilidade",
      "Seleciona Public apenas se não incluíres dados pessoais ou segredos. Marca Add a README.",
      "◉ Public    ☑ Add a README",
    ],
    [
      "Cria e confirma",
      "Carrega em Create repository e verifica se o repositório aparece.",
      "Create repository",
    ],
  ];
  let i = 0;
  function draw() {
    document.getElementById("walk-counter").textContent =
      `Passo ${i + 1} de ${steps.length}`;
    document.getElementById("walk-title").textContent = steps[i][0];
    document.getElementById("walk-desc").textContent = steps[i][1];
    document.getElementById("walk-demo").textContent = steps[i][2];
    document.getElementById("walk-prev").disabled = i === 0;
    document.getElementById("walk-next").disabled = i === steps.length - 1;
  }
  document.getElementById("walk-prev").onclick = () => {
    i = Math.max(0, i - 1);
    draw();
  };
  document.getElementById("walk-next").onclick = () => {
    i = Math.min(steps.length - 1, i + 1);
    draw();
  };
  document.getElementById("walk-restart").onclick = () => {
    i = 0;
    draw();
  };
  draw();
  const questions = [
    {
      q: "Para que serve um commit no Git?",
      a: [
        "Guardar uma versão das alterações",
        "Publicar automaticamente um site",
        "Instalar o VS Code",
      ],
      correct: 0,
      why: "Um commit regista alterações no histórico do repositório.",
    },
    {
      q: "O que deves fazer antes de aceitar código gerado por IA?",
      a: ["Aceitar sem ler", "Rever, testar e compreender", "Apagar os testes"],
      correct: 1,
      why: "A responsabilidade pela qualidade continua a ser tua.",
    },
    {
      q: "Qual é uma boa regra para um design system?",
      a: [
        "Usar espaçamentos aleatórios",
        "Definir tokens reutilizáveis",
        "Repetir CSS em todos os botões",
      ],
      correct: 1,
      why: "Tokens centralizados ajudam a manter consistência.",
    },
    {
      q: "O que significa mobile-first?",
      a: [
        "Criar apenas para telemóvel",
        "Começar pelo ecrã pequeno e adaptar",
        "Esconder conteúdo no desktop",
      ],
      correct: 1,
      why: "A abordagem começa com as restrições de ecrãs pequenos e evolui.",
    },
    {
      q: "É seguro colocar uma chave de API num repositório público?",
      a: [
        "Sim, se estiver em JavaScript",
        "Sim, se o ficheiro tiver nome diferente",
        "Não, deve ficar fora do código público",
      ],
      correct: 2,
      why: "Segredos nunca devem ser expostos em repositórios públicos.",
    },
  ];
  let qi = 0,
    score = 0,
    answered = false;
  const host = document.getElementById("learning-quiz");
  function render() {
    const x = questions[qi];
    host.innerHTML = "";
    const card = document.createElement("div");
    card.className = "panel";
    const label = document.createElement("p");
    label.textContent = `Pergunta ${qi + 1} de ${questions.length} · ${score} certas`;
    card.append(label);
    const title = document.createElement("strong");
    title.textContent = x.q;
    card.append(title);
    const opts = document.createElement("div");
    opts.style.marginTop = "12px";
    opts.style.display = "grid";
    opts.style.gap = "8px";
    x.a.forEach((a, n) => {
      const b = document.createElement("button");
      b.className = "button";
      b.style.textAlign = "left";
      b.textContent = a;
      b.onclick = () => {
        if (answered) return;
        answered = true;
        score += n === x.correct ? 1 : 0;
        [...opts.children].forEach((v) => (v.disabled = true));
        feedback.textContent =
          (n === x.correct ? "Certo! " : "Ainda não. ") + x.why;
        next.hidden = false;
        next.focus();
      };
      opts.append(b);
    });
    card.append(opts);
    const feedback = document.createElement("p");
    feedback.setAttribute("role", "status");
    card.append(feedback);
    const next = document.createElement("button");
    next.className = "button";
    next.textContent =
      qi === questions.length - 1 ? "Ver resultado" : "Seguinte";
    next.hidden = true;
    next.onclick = () => {
      qi++;
      answered = false;
      if (qi === questions.length) {
        host.innerHTML = "";
        const end = document.createElement("p");
        end.textContent = `Resultado: ${score} de ${questions.length}. Revê as explicações e repete para consolidar.`;
        host.append(end);
        const retry = document.createElement("button");
        retry.className = "button";
        retry.textContent = "Repetir teste";
        retry.onclick = () => {
          qi = 0;
          score = 0;
          render();
          host.querySelector("button")?.focus();
        };
        host.append(retry);
      } else {
        render();
        host.querySelector("button")?.focus();
      }
    };
    card.append(next);
    host.append(card);
  }
  render();
})();
