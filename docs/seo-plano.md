# Plano de SEO e desempenho: Elétrica Sabiá

Foco: aparecer no Google para serviços elétricos, manutenção predial, climatização e caminhão Munck em **Matão-SP e região**.

## Diagnóstico (auditoria de 26/11/2026)

| Área | Situação encontrada | Impacto |
|---|---|---|
| Estrutura | Site de página única (HTML/CSS/JS puro), bom conteúdo e HTML semântico (`header`, `main`, `section`, `article`, `footer`, um único `h1`) | Positivo |
| Metadados | Título e descrição existiam, mas sem `canonical`, `robots`, Twitter Card e com `og:image` relativa (redes sociais não exibem) | Médio |
| Dados estruturados | Nenhum JSON-LD. O Google não tinha sinal explícito de empresa local, endereço, telefone, serviços ou FAQ | **Alto** |
| sitemap.xml / robots.txt | Não existiam | Médio |
| Imagens | ~1,8 MB de imagens na página; `caminhao_2.png` com 1,1 MB e `hero-bg.png` (na verdade JPEG) com 900 KB. Sem `width/height` (causa CLS) e sem `loading="lazy"` | **Alto** (Core Web Vitals no celular) |
| CSS | `style.css` carregava 5 módulos via `@import` em cascata (download em série atrasa a 1ª pintura) | Médio |
| Font Awesome | Folha completa (~100 KB) bloqueando a renderização | Médio |
| Bug | Imagem de fundo do topo apontava para caminho errado (`css/assets/...`) e gerava erro 404 | Baixo |
| Acessibilidade | FAQ e filtros sem `aria-expanded`/`aria-pressed`, ícones lidos por leitores de tela, sem link "pular para o conteúdo", formulário sem `autocomplete` | Médio |
| Domínio | Nenhum domínio de produção no repositório; assumido `eletricasabia.com.br` (mesmo do e-mail) | **Confirmar** |

## O que já foi feito (PR desta etapa)

1. **SEO técnico**: título e descrição focados em "instalações elétricas", "caminhão Munck" e "Matão-SP"; `canonical`, `robots`, `hreflang`, `geo.*`, Open Graph com URL absoluta e imagem 1200×630, Twitter Card, manifest e ícones.
2. **SEO local / dados estruturados** (JSON-LD `Electrician` + `HVACBusiness`): razão social, CNPJ, endereço, telefone, e-mail, fundação 1997, área atendida (Matão e cidades vizinhas), Facebook, catálogo com os 17 serviços do site e `FAQPage` com as 5 perguntas visíveis.
3. **sitemap.xml** (com imagens) e **robots.txt**.
4. **Performance**: imagens convertidas para WebP com fallback (~1,8 MB → ~0,6 MB, já contando a imagem de fundo que antes nem carregava), `width/height` + `lazy` nas imagens, CSS dos módulos em paralelo, Font Awesome não bloqueante, `defer` no JS, correção do 404 da imagem de fundo.
5. **Acessibilidade**: link "pular para o conteúdo" (só aparece com Tab), ARIA no FAQ e nos filtros, ícones decorativos ocultos de leitores de tela, `autocomplete` no formulário, respeito a `prefers-reduced-motion`.

Nada no visual ou nas funcionalidades foi alterado (comparação de capturas antes/depois em desktop e celular).

## Próximas etapas, por prioridade

### Prioridade 1: depende do Gustavo (maior impacto em busca local)
1. **Confirmar o domínio de produção** (se não for `https://eletricasabia.com.br/`, trocar em `index.html`, `robots.txt` e `sitemap.xml`).
2. **Perfil da Empresa no Google (Google Business Profile)**: criar ou reivindicar em business.google.com com exatamente o mesmo nome, endereço e telefone do site (NAP). Categoria principal "Eletricista"; secundárias "Empresa de manutenção predial", "Serviço de ar-condicionado", "Serviço de guindaste". Adicionar fotos reais, horário, área de atendimento e o link do site. É o fator nº 1 para aparecer no mapa ("eletricista em Matão").
3. **Google Search Console**: adicionar a propriedade (de preferência "Domínio", verificada por DNS), enviar `sitemap.xml` e pedir indexação da página inicial.
4. **Confirmar as cidades atendidas** listadas no JSON-LD (Matão, Araraquara, São Carlos, Américo Brasiliense, Taquaritinga, Itápolis, Ibitinga, Dobrada, Santa Ernestina, Gavião Peixoto, Nova Europa, Motuca) e o **horário de funcionamento** (para incluir no schema).
5. **Avaliações no Google**: pedir a clientes atuais que avaliem o perfil.
6. **Citações locais**: cadastrar o mesmo NAP em diretórios (Apontador, Guia Mais, TeleListas, Facebook, LinkedIn da empresa, associação comercial de Matão).

### Prioridade 2: conteúdo (próximo PR, se aprovado)
Hoje tudo está em uma única página, o que limita o ranqueamento para buscas específicas. Recomendo criar páginas dedicadas, com texto próprio, fotos e FAQ:
- `/instalacoes-eletricas-industriais-matao-sp/`
- `/manutencao-eletrica-industrial/` (inclui SPDA, subestações, banco de capacitores)
- `/manutencao-predial-facilities/`
- `/ar-condicionado-pmoc/`
- `/caminhao-munck-matao-sp/`
- (opcional) páginas por cidade só se houver conteúdo real (obras atendidas, clientes da cidade)

Outros ajustes de conteúdo: incluir "Matão-SP" no `h1` ou subtítulo do topo, uma seção curta de "Cidades atendidas" e um portfólio de obras com fotos.

### Prioridade 3: monitoramento
- Search Console: acompanhar impressões, cliques e posição para "eletricista Matão", "caminhão munck Matão", "manutenção predial Araraquara" etc.
- Google Analytics 4 (ou Vercel/Cloudflare Web Analytics, mais leve): medir cliques no WhatsApp como conversão.
- PageSpeed Insights mensal (meta: LCP < 2,5 s, CLS < 0,1, INP < 200 ms no celular).

### Prioridade 4: técnicos opcionais
- Substituir o Font Awesome completo por um subconjunto/SVG só com os ícones usados (~100 KB → ~10 KB).
- Auto-hospedar as fontes do Google.
- Cabeçalhos de cache longos para `/assets/` na hospedagem.
- Remover imagens não usadas de `assets/images/` (cabos, canaleta, corredor, painel*, construcao 1/2/3/5, equipe, caminhao.jpeg, institutional.png).
