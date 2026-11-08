# Validação da entrega

Data: 8 de novembro de 2026.

## Resultado

Sete páginas navegáveis. Título inicial: «Guia para o Dani boy». Retirados o subtítulo inicial e a frase «Sem pressa. Com provas do que aprendeste.». Simplificados os títulos das restantes páginas e dos atalhos.

## Verificações executadas

- Chrome: sete páginas em 320, 375, 390, 768 e 1440 px. Sem scroll horizontal nem erros JavaScript nos percursos testados.
- Brave: sete páginas a 390 px, menu e cenário interativo. Sem erros JavaScript.
- Progresso de tarefas persistente após recarregar. Ordem e chave de armazenamento compatíveis com V10 na mesma origem.
- Assistente persistente, pesquisa de prompts e estado sem resultados.
- Escolha de projeto, notas e respostas da entrevista persistentes.
- Simulação GitHub, resposta ao quiz, cenário, ordenação correta dos cinco passos e alteração do botão na demonstração de código.
- Menu móvel, Escape e preferência de movimento reduzido.
- Ligações locais: ficheiros e âncoras existentes.
- JavaScript validado sintaticamente. Formatação de HTML, CSS e JavaScript; uma propriedade CSS por linha.

## Acessibilidade

Auditoria automática com axe-core, regras WCAG 2 A/AA, 2.1 AA, 2.2 AA e regras automatizáveis AAA. Zero violações detetadas nas sete páginas, incluindo os detalhes expandidos a 1280 px. A verificação a 390 px também terminou sem violações após as correções.

Verificações adicionais: salto para conteúdo, seleção e colocação de passos por teclado, retenção de foco após seleção, abertura e fecho do menu com teclado. Textos com espaçamento aumentado (altura de linha 1,5; letras 0,12 em; palavras 0,16 em; parágrafos 2 em) não provocaram overflow horizontal nas sete páginas a 320 px.

Corrigidos: área de prompt com scroll sem acesso por teclado, contraste de elementos de demonstração e títulos, perda de foco ao selecionar peças e ao avançar em exercícios. Foco visível, margens para evitar sobreposição da navbar, alternativa ao arrasto e suporte a cores forçadas.

### Contraste dos pares principais

| Texto / fundo | Rácio |
| --- | --- |
| Branco / fundo principal | 18,79:1 |
| Texto secundário / superfície | 11,31:1 |
| Laranja / fundo principal | 8,86:1 |
| Texto do botão / laranja | 8,41:1 |
| Título de projeto / painel | 9,48:1 |
| Número de página / fundo principal | 9,85:1 |

Estes pares ultrapassam o limiar de 7:1 para texto normal do critério AAA 1.4.6. Referência: [WCAG 2.2, W3C](https://www.w3.org/TR/WCAG22/).

## Limitações

Os resultados automáticos e os testes de teclado não constituem uma certificação de conformidade integral AA ou AAA. Falta validação humana completa com leitor de ecrã e utilizadores de tecnologias de apoio. Não foi executado um percurso completo em Safari ou Firefox. A tentativa WebKit ficou bloqueada por incompatibilidade entre o navegador instalado e o protocolo de automação; não é contabilizada como teste aprovado.

Os conteúdos e recursos externos da V10 foram preservados; não foi revalidada a atualidade de todos os passos das ferramentas externas. Não foram feitos push, deploy nem testes de um endereço público. Não há simulação de avaliação por IA: quizzes têm correção local e a entrevista oferece pistas para autoavaliação.


## Revisão de navegação e identidade

Conteúdo e módulos separados por página, sem regiões com cópias ocultas. Navbar redesenhada para desktop e telemóvel. Controlos de escolha apresentados como grupos de botões identificados, caixas de seleção personalizadas e foco visível. Duas imagens originais WebP e favicon em três formatos. GIF de demonstração com controlos explícitos, sem reprodução automática.

Repetidos os testes de 35 combinações de largura e página, os percursos funcionais, e as auditorias automáticas AA/AAA com detalhes abertos após esta revisão: sem violações detetadas.
