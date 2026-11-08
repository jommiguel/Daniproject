(() => {
  const phases = [
    [
      "preparar",
      "Preparar o computador",
      "Ajuda-me a instalar VS Code, Git e Node.js LTS no meu sistema operativo. Explica cada passo para um iniciante, indica os sites oficiais e como confirmar as versões. Não assumas que já sei usar o terminal.",
    ],
    [
      "github",
      "Criar o GitHub",
      "Guia-me para criar uma conta GitHub e um repositório público chamado primeiro-projeto, com README. Explica o significado de cada opção, sem pedir palavras-passe nem dados privados.",
    ],
    [
      "vscode",
      "Abrir o projeto no VS Code",
      "Explica como clonar o repositório por HTTPS usando Git: Clone no VS Code. Diz-me o que devo ver no explorador de ficheiros e como corrigir erros comuns de autenticação.",
    ],
    [
      "ia",
      "Escolher o assistente",
      "Ajuda-me a escolher entre Claude Code, Codex e ChatGPT para um projeto HTML/CSS/JS. Explica a diferença entre um chat e um agente com acesso aos ficheiros, permissões e como confirmar alterações antes de aceitar.",
    ],
    [
      "produto",
      "Definir o MVP",
      "Quero um Gestor de Tarefas para organizar tarefas, prazos e estados. Faz-me cinco perguntas de produto, depois propõe um MVP de três funcionalidades e critérios de aceitação simples. Não cries código ainda.",
    ],
    [
      "construir",
      "Criar o projeto",
      "Constrói comigo o Gestor de Tarefas com HTML semântico, CSS e JavaScript vanilla. Divide em tarefas pequenas. Começa pelo formulário e lista. Explica cada ficheiro e como testar no navegador. Espera pela minha confirmação antes de avançar.",
    ],
    [
      "testar",
      "Testar e corrigir",
      "Cria uma checklist de QA para o Gestor de Tarefas: campos vazios, texto longo, edição, filtros, localStorage, teclado, contraste, 320 px e mensagens de erro. Distingue testes sugeridos de testes efetivamente executados.",
    ],
    [
      "publicar",
      "Publicar sem expor dados",
      "Guia-me para rever o diff, fazer commit e push no GitHub e ativar GitHub Pages para um site estático. Verifica comigo se não há chaves, tokens ou dados pessoais. Explica como testar o link público.",
    ],
    [
      "entrevista",
      "Defender o projeto",
      "Faz uma entrevista simulada de nível júnior sobre o meu Gestor de Tarefas. Uma pergunta de cada vez. Avalia clareza, decisões humanas, uso responsável da IA, testes e limitações. Não inventes experiência.",
    ],
    [
      "academia",
      "Consolidar aprendizagem",
      "Cria um plano de estudo de sete dias, 25 minutos por dia, para aprender Git, HTML, CSS, JavaScript, prompting e QA. Cada dia deve ter uma tarefa, um teste de compreensão e um resultado demonstrável.",
    ],
    [
      "ideias",
      "Definir o primeiro projeto",
      "Ajuda-me a escolher um problema simples para o meu primeiro projeto. Pergunta quem vai usá-lo, qual é a dificuldade atual e quais são as três funcionalidades essenciais.",
    ],
    [
      "skills",
      "Treinar competências de IA",
      "Propõe um exercício prático de prompting, verificação de fontes e pensamento crítico. Dá critérios de avaliação, mas não resolvas o exercício antes de eu tentar.",
    ],
  ];
  const extras = [
    [
      "Mentor paciente",
      "Explica o conceito como se fosse a primeira vez que o vejo. Dá um exemplo, pede-me para repetir por palavras minhas e corrige apenas o que estiver errado.",
    ],
    [
      "Explicar um erro",
      "Vou colar um erro. Explica o que significa em português simples, identifica a causa provável, propõe uma verificação de cada vez e não alteres ficheiros sem autorização.",
    ],
    [
      "Rever um commit",
      "Ajuda-me a rever as alterações antes de fazer commit. Resume o que mudou, identifica riscos e sugere uma mensagem de commit curta e informativa.",
    ],
    [
      "Auditar design",
      "Revê a interface com foco em hierarquia visual, tipografia, tokens de 4/8 px, estados interativos, mobile-first, acessibilidade WCAG 2.2 AA e movimento reduzido. Evita cartões decorativos e padrões genéricos.",
    ],
    [
      "Explicar código",
      "Explica este código linha a linha, sem jargão desnecessário. Identifica entradas, saídas e efeitos. Se usares uma abstração ou expressão regular, explica por que é necessária e oferece alternativa legível.",
    ],
    [
      "Treinar entrevista",
      "Pergunta-me por que escolhi cada funcionalidade e como validei o resultado da IA. Avalia a resposta de 0 a 10 e propõe uma versão melhor sem inventar competências.",
    ],
    [
      "Verificar factos",
      "Analisa o texto que vou fornecer e separa factos verificáveis, interpretações e incertezas. Pede fontes primárias e datas. Não inventes links nem referências.",
    ],
    [
      "Evoluir o projeto",
      "Sugere três melhorias de baixo esforço e alto valor para o meu projeto, cada uma com hipótese, critério de aceitação, teste e risco.",
    ],
  ];
  const select =
    document.getElementById("tool-choice") || document.createElement("select");
  if (!select.options.length) {
    for (const [value, label] of [
      ["chatgpt", "ChatGPT"],
      ["claude", "Claude Code"],
      ["codex", "Codex"],
    ])
      select.add(new Option(label, value));
  }
  const container = document.getElementById("tool-prompts");
  const explanation = document.getElementById("tool-explanation");
  const intro = {
    claude:
      "Estou a usar Claude Code dentro da pasta do projeto. Antes de executar comandos ou alterar ficheiros, apresenta o plano e pede a minha confirmação. ",
    codex:
      "Estou a usar Codex no contexto do repositório. Primeiro lê e explica; antes de qualquer alteração ou comando, apresenta o plano e pede confirmação. ",
    chatgpt:
      "Estou a conversar com o ChatGPT e vou aplicar os passos manualmente no VS Code. Não afirmes que acedeste aos meus ficheiros ou executaste comandos. Dá instruções copiáveis e pede-me para confirmar os resultados. ",
  };
  const desc = {
    claude:
      "Agente de programação: pode analisar e editar ficheiros com as permissões que lhe deres. Confirma sempre o que vai fazer.",
    codex:
      "Agente de programação: pode trabalhar no repositório conforme o ambiente e as permissões. Revê o diff e os comandos.",
    chatgpt:
      "Mentor em conversa: explica passos e fornece código e prompts. Para mudar ficheiros locais, copias as instruções ou usas uma ferramenta ligada ao projeto.",
  };
  function full(prompt) {
    return (
      intro[select.value] +
      prompt +
      " No fim, dá-me uma checklist simples de verificação e uma pergunta para confirmar que compreendi."
    );
  }
  function build() {
    if (explanation) explanation.textContent = desc[select.value];
    if (container) {
      container.replaceChildren();
      const title = document.createElement("h3");
      title.textContent =
        "Biblioteca adaptada · " + select.options[select.selectedIndex].text;
      container.append(title);
      [...phases, ...extras.map(([t, p]) => ["", t, p])].forEach(
        ([id, title, prompt], idx) => {
          const block = document.createElement("div");
          block.className = "prompt-station";
          const h = document.createElement("h3");
          h.textContent =
            (idx < phases.length
              ? "Etapa " + String(idx + 1).padStart(2, "0") + " · "
              : "Extra · ") + title;
          block.append(h);
          const pre = document.createElement("pre");
          pre.textContent = full(prompt);
          block.append(pre);
          const b = document.createElement("button");
          b.type = "button";
          b.className = "button";
          b.textContent =
            "Copiar para " + select.options[select.selectedIndex].text;
          b.onclick = () => copy(pre.textContent, b);
          block.append(b);
          container.append(block);
        },
      );
    }
    document.querySelectorAll(".step-prompt").forEach((block) => {
      const data = phases.find((p) => p[0] === block.dataset.phase);
      if (!data) return;
      const pre = block.querySelector("pre");
      pre.textContent = full(data[2]);
      block.querySelector("button").onclick = (e) =>
        copy(pre.textContent, e.currentTarget);
    });
  }
  async function copy(t, b) {
    const original = b.textContent;
    try {
      await navigator.clipboard.writeText(t);
      b.textContent = "Copiado";
    } catch {
      const ta = document.createElement("textarea");
      ta.value = t;
      document.body.append(ta);
      ta.select();
      try {
        document.execCommand("copy");
        b.textContent = "Copiado";
      } catch {
        b.textContent = "Seleciona e copia o texto acima";
      }
      ta.remove();
    }
    setTimeout(() => {
      b.textContent = original;
    }, 1800);
  }
  select.addEventListener("change", () => {
    try {
      localStorage.setItem("manual-assistant-choice", select.value);
    } catch {}
    build();
  });
  try {
    const saved = localStorage.getItem("manual-assistant-choice");
    if (["claude", "codex", "chatgpt"].includes(saved)) select.value = saved;
  } catch {}
  build();
})();
