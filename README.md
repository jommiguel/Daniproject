# Dani Launchpad

Academia estática em português de Portugal, preparada para publicação numa pasta. Não precisa de instalação, conta, API, servidor de aplicação ou compilação.

## Publicar no Netlify Drop

1. Extrai `dani-launchpad.zip`.
2. Abre o Netlify Drop na tua conta.
3. Arrasta a pasta `dani-launchpad`, que contém `index.html` diretamente na raiz.
4. Quando o Netlify devolver o endereço, abre-o e confirma a navegação, os exercícios e a atualização de uma página interior.

O site ainda não foi publicado por esta entrega. Não há configuração de redirecionamento necessária: as sete páginas são ficheiros HTML reais.

## Páginas

| Ficheiro | Conteúdo |
| --- | --- |
| index.html | Painel inicial, progresso real, continuar percurso |
| aprender.html | Instalação, GitHub, VS Code, IA, produto, construção, testes e publicação |
| laboratorio.html | Ordenação, construtor de prompts, código interativo, cenários, quiz, simulação GitHub e checklist |
| prompts.html | Biblioteca, pesquisa e seleção de ChatGPT, Claude Code ou Codex |
| projetos.html | Comparação de ideias, escolha e notas do problema |
| perfil.html | Formação, competências transferíveis e exercícios de treino |
| entrevistas.html | Simulação, respostas guardadas e apresentação de cinco minutos |

## Pré-visualizar

Abre `index.html` para consultar o site. Para testar todas as funcionalidades, incluindo copiar prompts e persistência consistente entre páginas, serve a pasta por HTTP:

```sh
python3 -m http.server 4173
```

Abre `http://localhost:4173`. No site publicado, usa HTTPS.

## Editar

Os próprios ficheiros entregues são o código-fonte, sem build. `studio.css` contém os componentes e `premium.css` define a navbar, imagens e controlos personalizados. `base.css` conserva os estilos dos exercícios da V10. A pasta `js/` contém os módulos dos exercícios, quizzes, prompts e progresso. `studio.js` acrescenta menu, pesquisa, seleção de assistente, movimento e persistência de projeto e respostas.

Cada página contém apenas o seu conteúdo, sem cópias ocultas das restantes páginas. Os módulos da pasta `js/` são carregados só onde são necessários. O progresso usa os mesmos 43 índices da V10 e mantém o estado entre páginas.

Não há fontes, ícones ou scripts carregados de CDN. As ligações de aprendizagem externas conservam os recursos da V10; a atualidade das interfaces desses serviços não foi auditada nesta entrega.

## Dados e privacidade

Progresso, escolha do assistente, projeto, notas e respostas são guardados apenas no armazenamento local do navegador. Não há telemetria nem envio de respostas para uma IA. A pesquisa e os exercícios correm localmente. O seletor adapta prompts; não estabelece uma ligação aos assistentes.

O progresso V10 mantém a chave e a ordem originais, mas só pode ser reutilizado na mesma origem. Mudar de um ficheiro local para um domínio Netlify ou mudar de domínio não transporta os dados automaticamente. Limpar dados do navegador elimina o progresso.

## Movimento e acessibilidade

Navbar translúcida com cor de fundo de reserva. Revelação de secções ao fazer scroll. Transições entre documentos nos navegadores que suportam View Transitions; navegação normal nos restantes. `prefers-reduced-motion` desativa o movimento. Menu operável com teclado e Escape. O exercício de ordenação oferece botões além de drag and drop.

Consulta `VALIDACAO.md` para os testes realmente executados e as limitações.


## Imagens e animações

`assets/learning.webp` e `assets/lab.webp` são imagens originais geradas para este guia e otimizadas para carregamento local. `assets/processo.gif` é uma demonstração animada com reprodução voluntária, paragem e repetição. Não reproduz automaticamente. O favicon tem versões SVG, PNG de 32 px e ícone de 192 px.
