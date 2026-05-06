# 🥕 Dona Cenoura — Landing Page

Landing page simples, rápida e bonita para vender bolo de cenoura artesanal online. Construída em **HTML, CSS e JavaScript puros** (zero dependências, zero build).

## ✨ Demonstração

Abra o arquivo `index.html` direto no navegador, ou rode um servidor local:

```bash
# Python 3
python3 -m http.server 8000

# Node (com http-server)
npx http-server -p 8000

# Acesse http://localhost:8000
```

## 📁 Estrutura

```
bolo-cenoura/
├── index.html      # Estrutura semântica (HTML5)
├── styles.css      # Design tokens + componentes (CSS3)
├── script.js       # Interações (JS vanilla)
└── README.md       # Este arquivo
```

## 🎨 Boas práticas de UX/UI aplicadas

### UX
- **Hierarquia visual clara** — proposta de valor + CTA visível em <1s ("above the fold").
- **Microcopy persuasivo** — "fofinho", "fresquinho", "cobertura que escorre".
- **Prova social** — badge "+2.500 bolos entregues" e seção de depoimentos.
- **Redução de fricção** — "Como funciona" em 3 passos + FAQ.
- **CTAs múltiplos e contextuais** — todo card de produto leva ao formulário com sabor pré-selecionado.
- **Lei de Hick** — apenas 3 produtos, decisão fácil.
- **Feedback imediato** — validação inline ao sair do campo, máscara de telefone automática.
- **Canal preferido** — envio do pedido direto ao WhatsApp (alta taxa de conversão no Brasil).

### UI
- **Design tokens** centralizados em CSS variables (cores, tipografia, espaçamentos, raios, sombras).
- **Tipografia em par** — Fraunces (display, serifa amigável) + Inter (corpo, alta legibilidade).
- **Paleta apetitosa** — laranja cenoura + creme + chocolate (gera fome, transmite artesanal).
- **Espaçamento consistente** — escala 4px (4, 8, 12, 16, 24, 32, 48, 64, 96).
- **Hover/focus states** elegantes em todos os elementos interativos.
- **Animação sutil** — bolo flutuante no hero, sparkles nos sprinkles (com `prefers-reduced-motion` respeitado).

### Acessibilidade (WCAG 2.1 AA)
- HTML semântico (`<header>`, `<main>`, `<section>`, `<article>`, `<nav>`, `<footer>`).
- **Skip link** para usuários de teclado/leitor de tela.
- ARIA labels e `aria-expanded` no menu mobile.
- Contraste de texto ≥ 4.5:1 (verificado).
- Foco visível com `:focus-visible`.
- Labels associadas aos inputs + `aria-required`.
- Mensagens de erro com `role="alert"`.
- Respeita `prefers-reduced-motion`.

### Performance
- Sem frameworks, sem bundler — **HTML+CSS+JS estático**.
- `preconnect` para Google Fonts.
- CSS e JS minificáveis (basta um build opcional).
- Imagens substituídas por **CSS art** (bolo do hero é puro CSS) → zero requisições extras.
- Carrega em <1s em conexões 4G.

### SEO
- `<title>` e `<meta description>` otimizados.
- Open Graph para compartilhamento em redes sociais.
- Estrutura H1 → H2 → H3 hierárquica.
- `lang="pt-BR"` definido.

## 🔧 Como personalizar

### Trocar o número do WhatsApp
Em `script.js`, linha ~136, altere:
```js
const phoneNumber = '5511999999999'; // formato: 55 + DDD + número
```
E em `index.html`, nos links do footer e do botão flutuante.

### Trocar cores da marca
Em `styles.css`, ajuste as variáveis no `:root`:
```css
--color-primary: #E87A2C;       /* sua cor principal */
--color-primary-dark: #C9621A;  /* variante mais escura */
--color-accent: #5C8A3A;        /* cor de apoio */
```

### Trocar produtos / preços
Em `index.html`, edite a seção `#cardapio` e o `<select>` em `#pedido`.

### Trocar conteúdo
Hero, depoimentos, FAQ — todo o texto está em `index.html`, sem dependências de CMS.

## 🚀 Onde hospedar (grátis)

| Plataforma | Como subir |
|------------|------------|
| **Netlify** | Arrastar a pasta no painel |
| **Vercel**  | `vercel deploy` |
| **GitHub Pages** | Push para `main` → ativar Pages |
| **Cloudflare Pages** | Conectar repositório |

## 📋 Checklist antes de ir para produção

- [ ] Substituir o número do WhatsApp (3 lugares: `script.js`, footer, botão flutuante)
- [ ] Atualizar e-mail de contato no footer
- [ ] Conectar Instagram/TikTok reais
- [ ] Adicionar fotos reais dos bolos (substituir os emojis dos cards)
- [ ] Configurar domínio próprio
- [ ] Adicionar Google Analytics ou Plausible
- [ ] Testar em dispositivos reais (iOS Safari, Android Chrome)
- [ ] Adicionar política de privacidade e termos de uso

## 📝 Próximos passos sugeridos

1. **Galeria de fotos** dos bolos reais (lazy load).
2. **Cupom de primeiro pedido** (push de conversão).
3. **Integração com Pix** via API de pagamento (Mercado Pago, Pagar.me).
4. **Pixel do Facebook / Google Ads** para retargeting.
5. **Schema.org `Product`** para rich results no Google.

---

Feito com 🥕 e atenção aos detalhes.
