(() => {
  const prompts = [
    [
      "Mentor para iniciantes",
      "Sou totalmente iniciante em VS Code, GitHub e programação. Ensina-me em português de Portugal, um passo de cada vez. Explica o objetivo, o que clicar, o resultado esperado e como corrigir erros. Não alteres ficheiros nem executes comandos destrutivos sem explicar e pedir autorização. No fim de cada passo, espera pela minha confirmação.",
    ],
    [
      "Definir o problema",
      "Quero criar um Gestor de Tarefas para organizar tarefas. Ajuda-me a escrever problema, utilizador, proposta de valor, funcionalidades mínimas e critérios de sucesso. Faz perguntas quando faltar contexto. Não programes ainda.",
    ],
    [
      "Código vanilla legível",
      "Revê este projeto para privilegiar JavaScript vanilla, funções pequenas, nomes claros e lógica explícita. Evita RegEx quando métodos simples de strings ou arrays forem mais legíveis. Evita dependências e abstrações desnecessárias. Explica as alterações, preserva o comportamento e indica como testar.",
    ],
    [
      "Design system e tokens",
      "Cria um design system pequeno, coerente e documentado. Define tokens semânticos para cores, superfícies, texto, bordas, espaçamentos em escala de 4/8 px, tipografia fluida, raios e estados. Centraliza tokens em CSS custom properties. Evita valores arbitrários e duplicação. Explica as escolhas antes de implementar.",
    ],
    [
      "Anti-AI slop visual",
      "Revê o design para eliminar padrões genéricos: cartões em excesso, riscas coloridas decorativas à esquerda ou no topo, gradientes gratuitos, sombras exageradas, ícones sem função e hierarquia repetitiva. Usa composição, tipografia, espaço em branco e conteúdo para criar hierarquia. Mantém simplicidade e personalidade visual.",
    ],
    [
      "Componentes reutilizáveis",
      "Identifica componentes repetidos e propõe variantes consistentes para botões, campos, feedback e navegação. Define estados default, hover, focus, disabled, loading e error quando aplicáveis. Evita abstrações prematuras; explica quando vale a pena reutilizar.",
    ],
    [
      "Mobile-first",
      "Audita o layout começando por 320 px e progredindo para tablet e desktop. Garante ausência de scroll horizontal, tamanhos de toque confortáveis, conteúdo legível e navegação simples. Sugere breakpoints apenas quando o conteúdo o exigir, não por hábito.",
    ],
    [
      "Acessibilidade WCAG 2.2 AA",
      "Audita semântica HTML, labels, mensagens de erro, foco visível, ordem de tabulação, contraste, alvos táteis e navegação por teclado. Usa WCAG 2.2 AA como objetivo e distingue verificações automáticas de testes manuais. Lista problemas por gravidade e ensina-me a reproduzir cada um.",
    ],
    [
      "Motion com propósito",
      "Propõe animações subtis que ajudem a perceber mudanças de estado, navegação e feedback. Evita movimento decorativo ou excessivo. Respeita prefers-reduced-motion e não escondas informação atrás de animações. Explica duração e intenção de cada transição.",
    ],
    [
      "Microcopy humano",
      "Revê textos, botões, labels, erros e estados vazios em português de Portugal. Prefere frases curtas, específicas, naturais e úteis. Evita jargão, frases robóticas e promessas vagas. Mostra antes/depois e explica as melhorias.",
    ],
    [
      "Ilustrações intencionais",
      "Antes de propor ilustrações, explica se são necessárias. Se forem, define função, estilo coerente, paleta limitada, proporções e consistência. Não uses ilustrações genéricas apenas para preencher espaço. Sugere alternativas textuais e acessíveis.",
    ],
    [
      "QA e regressões",
      "Faz uma revisão crítica de funcionalidades, usabilidade, segurança, responsive e acessibilidade. Não inventes testes realizados. Para cada problema, indica passos de reprodução, impacto, correção sugerida e teste de regressão. Pede autorização antes de alterar código.",
    ],
    [
      "README e documentação",
      "Ajuda-me a escrever um README claro: problema, público, funcionalidades, stack, instalação, execução, limitações, testes realizados e utilização de IA. Não inventes métricas, resultados ou competências.",
    ],
    [
      "Simulação de entrevista",
      "Simula uma entrevista entry-level relacionada com prompting e IA. Faz uma pergunta de cada vez sobre problema, decisões, prompts, testes, falhas, limitações e responsabilidade humana. Espera pela resposta e dá feedback objetivo com melhorias sem inventar experiência.",
    ],
  ];
  const host = document.getElementById("prompts");
  prompts.forEach(([title, prompt], i) => {
    const wrap = document.createElement("div");
    const head = document.createElement("div");
    head.className = "prompt-head";
    const h = document.createElement("h3");
    h.textContent = title;
    const btn = document.createElement("button");
    btn.className = "button";
    btn.textContent = "Copiar";
    btn.setAttribute("aria-label", "Copiar prompt: " + title);
    const pre = document.createElement("pre");
    pre.className = "prompt";
    pre.textContent = prompt;
    btn.addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText(prompt);
        btn.textContent = "Copiado";
        setTimeout(() => (btn.textContent = "Copiar"), 1800);
      } catch {
        btn.textContent = "Seleciona o texto para copiar";
      }
    });
    head.append(h, btn);
    wrap.append(head, pre);
    host.append(wrap);
  });
})();
