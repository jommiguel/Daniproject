(() => {
  const interview = [
    [
      "Que problema resolve o teu projeto?",
      "Explica quem tem o problema, quando acontece e o que melhora com a tua solução.",
    ],
    [
      "Porque escolheste estas funcionalidades?",
      "Fala do MVP, das prioridades e do que decidiste deixar para depois.",
    ],
    [
      "Como utilizaste IA?",
      "Distingue os teus objetivos, decisões e validação das sugestões e código produzidos pela IA.",
    ],
    [
      "Como sabes que funciona?",
      "Descreve testes reais, casos de erro, mobile e acessibilidade. Não inventes resultados.",
    ],
    [
      "O que melhorarias numa segunda versão?",
      "Apresenta uma limitação concreta, uma melhoria e o motivo da prioridade.",
    ],
  ];
  let ii = 0;
  document.getElementById("interview-next").onclick = () => {
    ii = (ii + 1) % interview.length;
    document.getElementById("interview-count").textContent =
      `Pergunta ${ii + 1} de ${interview.length}`;
    document.getElementById("interview-question").textContent =
      interview[ii][0];
    document.getElementById("interview-hint").textContent = interview[ii][1];
    document.getElementById("interview-answer").value = "";
  };
})();
