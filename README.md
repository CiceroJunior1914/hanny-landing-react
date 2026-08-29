# Landing Page Hanny Rekbaim — versão React

Componente único, sem dependências além do React (estilos inline + uma tag `<style>` para fontes e media queries).

## Uso

1. Copie `HannyLanding.jsx` para o seu projeto (Vite, Next.js, CRA).
2. Copie as fotos para a pasta pública: `public/assets/hanny-consultorio.png` e `public/assets/hanny-atendimento.png`.
   Se preferir outro caminho, ajuste `PHOTO_HERO` e `PHOTO_SOBRE` no topo do arquivo.
3. Renderize:

```jsx
import HannyLanding from "./HannyLanding";
export default function App() { return <HannyLanding />; }
```

### Next.js (App Router)
O componente usa `useState`/`useEffect`, então adicione `"use client";` na primeira linha do arquivo.

## O que já está incluído
- Header fixo com comportamento no scroll e menu mobile (hambúrguer abaixo de 860px)
- Hero com foto da cliente, CTAs e selo "a partir dos 2 anos"
- Posicionamento, Sobre, 4 cards de serviços, seção NR-01 (fundo petróleo), diferenciais
- Depoimentos com placeholders de autorização, Como funciona, FAQ accordion
- CTA final, footer e botão flutuante de WhatsApp
- Animações de entrada (IntersectionObserver) e hovers suaves

## Personalização rápida
- Paleta: objeto `C` no topo do arquivo
- Textos e listas: constantes `NAV`, `SERVICES`, `DIFF`, `STEPS`, `FAQ`, `TESTIMONIALS`
- WhatsApp: constante `WHATSAPP`
