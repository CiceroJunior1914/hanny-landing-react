import React, { useEffect, useRef, useState } from "react";

/**
 * Landing page institucional — Hanny Rekbaim
 * Componente React único, sem dependências (estilos inline).
 * Coloque as fotos em: /assets/hanny-consultorio.png e /assets/hanny-atendimento.png
 * (ou ajuste as constantes PHOTO_HERO / PHOTO_SOBRE abaixo).
 */

const C = {
  ink: "#0F2E38",
  ink2: "#1C4B55",
  gold: "#B08A4A",
  goldLight: "#C9A96A",
  sand: "#E7D9BE",
  beige: "#F5F1E9",
  off: "#FBF9F5",
  card: "#FFFDFA",
  text: "#4C5F66",
  muted: "#7E8E94",
  faint: "#9AA8AD",
};

const serif = "'Cormorant Garamond', Georgia, serif";
const sans = "'Manrope', system-ui, sans-serif";
const mono = "'IBM Plex Mono', ui-monospace, monospace";

const PHOTO_HERO = `${import.meta.env.BASE_URL}assets/hanny-consultorio.png`;
const PHOTO_SOBRE = `${import.meta.env.BASE_URL}assets/hanny-atendimento.png`;
const WHATSAPP = "https://wa.me/5511951140220";

const NAV = [
  ["Início", "#inicio"],
  ["Sobre", "#sobre"],
  ["Serviços", "#servicos"],
  ["Atendimento", "#atendimento"],
  ["Depoimentos", "#depoimentos"],
  ["Contato", "#contato"],
];

const SERVICES = [
  {
    num: "01",
    shape: "50%",
    title: "Psicoterapia Infantil & Adolescente",
    text: "Atendimento presencial e online, com abordagem TCC e foco no desenvolvimento emocional de crianças, adolescentes e suas famílias.",
    cta: "Conhecer atendimento",
  },
  {
    num: "02",
    shape: "3px",
    title: "NR-01 para Empresas",
    text: "Atuação na gestão de riscos psicossociais e saúde mental no ambiente de trabalho.",
    cta: "Falar sobre NR-01",
  },
  {
    num: "03",
    shape: "3px 16px 3px 16px",
    title: "Psicologia Forense",
    text: "Avaliações e laudos psicológicos para contextos que exigem responsabilidade técnica e olhar especializado.",
    cta: "Saiba mais",
  },
  {
    num: "04",
    shape: "16px 16px 3px 16px",
    title: "Supervisão Clínica",
    text: "Espaço de troca e desenvolvimento técnico para profissionais da psicologia.",
    cta: "Conhecer supervisão",
  },
];

const DIFF = [
  ["01", "Abordagem TCC", "Método estruturado e baseado em evidências."],
  ["02", "Atendimento humanizado", "Escuta atenta ao contexto de cada família."],
  ["03", "Atuação em diferentes contextos", "Clínica, corporativa e forense."],
  ["04", "Experiência clínica e institucional", "Responsabilidade técnica em cada entrega."],
];

const STEPS = [
  ["01", "Primeiro contato", "Entre em contato pelo WhatsApp e conte um pouco sobre sua necessidade."],
  ["02", "Conversa inicial", "Vamos entender o contexto e identificar o melhor caminho para o acompanhamento."],
  ["03", "Início do acompanhamento", "Definimos a modalidade de atendimento e os próximos passos."],
];

const FAQ = [
  ["A partir de qual idade é realizado o atendimento?", "A partir dos 2 anos, conforme disponibilidade e avaliação da necessidade."],
  ["O atendimento pode ser online?", "Sim. Há atendimento presencial e online."],
  ["Como faço para agendar?", "O primeiro contato pode ser realizado pelo WhatsApp."],
  ["Vocês atendem por convênio?", "Informação a confirmar com a profissional."],
  ["Qual o valor da sessão?", "Informação a confirmar com a profissional."],
  ["Como funciona a consultoria em NR-01?", "Informação a confirmar conforme a necessidade e o perfil da organização."],
];

const TESTIMONIALS = [
  "Responsável · Atendimento infantil",
  "Empresa · Projeto NR-01",
  "Psicóloga · Supervisão clínica",
];

/* ---------- primitivos ---------- */

function Logo({ dark = false, size = 34, showTag = true }) {
  const stroke = dark ? "#F7F3EB" : C.ink;
  const accent = dark ? C.goldLight : C.gold;
  return (
    <span style={{ display: "flex", alignItems: "center", gap: 12 }}>
      <svg width={size} height={size} viewBox="0 0 40 40" fill="none" aria-hidden="true">
        <circle cx="20" cy="20" r="18.5" stroke={accent} strokeWidth="1" />
        <path d="M20 9.5 V30.5" stroke={stroke} strokeWidth="1.6" strokeLinecap="round" />
        <path d="M12 14.5 V20 a8 8 0 0 0 16 0 V14.5" stroke={stroke} strokeWidth="1.6" strokeLinecap="round" />
        <circle cx="20" cy="30.5" r="1.7" fill={accent} />
      </svg>
      <span style={{ display: "flex", flexDirection: "column", lineHeight: 1 }}>
        <span style={{ fontFamily: serif, fontSize: 20, fontWeight: 600, letterSpacing: ".045em", color: dark ? "#F7F3EB" : C.ink }}>
          HANNY REKBAIM
        </span>
        {showTag && (
          <span style={{ fontSize: 9.5, letterSpacing: ".26em", textTransform: "uppercase", color: dark ? "rgba(247,243,235,.6)" : "#8A9AA0", marginTop: 5 }}>
            Psicologia
          </span>
        )}
      </span>
    </span>
  );
}

function Button({ href, children, variant = "solid", style }) {
  const [hover, setHover] = useState(false);
  const base = {
    display: "inline-block",
    padding: variant === "ghost" ? "17px 30px" : "17px 32px",
    borderRadius: 999,
    fontSize: 14,
    fontWeight: 500,
    letterSpacing: ".02em",
    textDecoration: "none",
    transition: "background .3s ease, color .3s ease, border-color .3s ease, transform .3s ease",
    ...style,
  };
  const variants = {
    solid: {
      background: hover ? C.gold : C.ink,
      color: "#FBF9F5",
      border: `1px solid ${hover ? C.gold : C.ink}`,
      boxShadow: "0 12px 30px -14px rgba(15,46,56,.5)",
      transform: hover ? "translateY(-2px)" : "none",
    },
    ghost: {
      background: "transparent",
      color: hover ? C.gold : C.ink,
      border: `1px solid ${hover ? C.gold : "rgba(15,46,56,.22)"}`,
    },
    gold: {
      background: hover ? "#F7F3EB" : C.goldLight,
      color: C.ink,
      border: "1px solid transparent",
      fontWeight: 600,
      transform: hover ? "translateY(-2px)" : "none",
    },
  };
  return (
    <a
      href={href}
      style={{ ...base, ...variants[variant] }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {children}
    </a>
  );
}

function Eyebrow({ children, dark = false }) {
  return (
    <div style={{ fontSize: 11, letterSpacing: ".24em", textTransform: "uppercase", color: dark ? C.goldLight : "#8A7444", marginBottom: 20 }}>
      {children}
    </div>
  );
}

function Reveal({ children, delay = 0, as: Tag = "div", style, ...rest }) {
  const ref = useRef(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return setSeen(true);
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && (setSeen(true), io.unobserve(e.target))),
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <Tag
      ref={ref}
      style={{
        opacity: seen ? 1 : 0,
        transform: seen ? "translateY(0)" : "translateY(22px)",
        transition: `opacity .9s ease ${delay}s, transform .9s cubic-bezier(.22,1,.36,1) ${delay}s`,
        ...style,
      }}
      {...rest}
    >
      {children}
    </Tag>
  );
}

function ServiceCard({ s }) {
  const [hover, setHover] = useState(false);
  return (
    <article
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        background: C.card,
        border: `1px solid ${hover ? "rgba(176,138,74,.45)" : "rgba(15,46,56,.09)"}`,
        borderRadius: 6,
        padding: "34px 30px 30px",
        display: "flex",
        flexDirection: "column",
        minHeight: 340,
        transform: hover ? "translateY(-4px)" : "none",
        boxShadow: hover ? "0 26px 50px -34px rgba(15,46,56,.45)" : "none",
        transition: "transform .4s ease, box-shadow .4s ease, border-color .4s ease",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 26 }}>
        <span style={{ fontFamily: mono, fontSize: 11, letterSpacing: ".14em", color: C.gold }}>{s.num}</span>
        <span style={{ width: 30, height: 30, border: "1px solid rgba(176,138,74,.5)", borderRadius: s.shape, display: "block" }} />
      </div>
      <h3 style={{ fontFamily: serif, fontWeight: 500, fontSize: 24, lineHeight: 1.25, color: C.ink, margin: "0 0 16px" }}>{s.title}</h3>
      <p style={{ fontSize: 14.5, lineHeight: 1.75, color: "#5A6C72", margin: "0 0 28px", flex: 1, textWrap: "pretty" }}>{s.text}</p>
      <a
        href="#contato"
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: hover ? 14 : 8,
          fontSize: 13,
          fontWeight: 600,
          letterSpacing: ".06em",
          textTransform: "uppercase",
          color: hover ? C.gold : C.ink,
          textDecoration: "none",
          transition: "gap .3s ease, color .3s ease",
        }}
      >
        {s.cta} <span style={{ color: C.gold }}>→</span>
      </a>
    </article>
  );
}

function FaqItem({ q, a, open, onToggle }) {
  const [hover, setHover] = useState(false);
  return (
    <div style={{ borderBottom: "1px solid rgba(15,46,56,.13)" }}>
      <button
        onClick={onToggle}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        aria-expanded={open}
        style={{
          width: "100%",
          background: "transparent",
          border: 0,
          padding: "26px 4px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 20,
          textAlign: "left",
          cursor: "pointer",
          font: "inherit",
          color: hover ? C.gold : C.ink,
          transition: "color .25s ease",
        }}
      >
        <span style={{ fontSize: 16.5, fontWeight: 500, lineHeight: 1.5 }}>{q}</span>
        <span style={{ fontFamily: serif, fontSize: 26, color: C.gold, lineHeight: 1, flexShrink: 0 }}>{open ? "−" : "+"}</span>
      </button>
      <div
        style={{
          overflow: "hidden",
          maxHeight: open ? 240 : 0,
          opacity: open ? 1 : 0,
          transition: "max-height .45s cubic-bezier(.22,1,.36,1), opacity .35s ease",
        }}
      >
        <div style={{ padding: "0 60px 28px 4px", fontSize: 15, lineHeight: 1.8, color: "#5A6C72" }}>{a}</div>
      </div>
    </div>
  );
}

/* ---------- página ---------- */

export default function HannyLanding() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const section = { padding: "clamp(70px,8vw,110px) clamp(20px,4vw,48px)" };
  const wrap = { maxWidth: 1140, margin: "0 auto" };
  const h2 = { fontFamily: serif, fontWeight: 400, fontSize: "clamp(28px,3.4vw,44px)", lineHeight: 1.18, color: C.ink, margin: 0 };

  return (
    <div style={{ background: C.off, color: "#21343A", fontFamily: sans, overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=Manrope:wght@300;400;500;600;700&family=IBM+Plex+Mono&display=swap');
        html { scroll-behavior: smooth; }
        body { margin: 0; }
        ::selection { background: ${C.sand}; }
        @keyframes floatSoft { 0%,100% { transform: translateY(0) } 50% { transform: translateY(-10px) } }
        @media (max-width: 860px) { .hnr-nav { display: none !important } .hnr-burger { display: flex !important } }
      `}</style>

      {/* HEADER */}
      <header
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 60,
          background: scrolled ? "rgba(251,249,245,.94)" : "rgba(251,249,245,.82)",
          backdropFilter: "blur(14px)",
          borderBottom: "1px solid rgba(15,46,56,.07)",
          padding: scrolled ? "12px 0" : "20px 0",
          boxShadow: scrolled ? "0 10px 30px -22px rgba(15,46,56,.5)" : "none",
          transition: "padding .35s ease, box-shadow .35s ease, background .35s ease",
        }}
      >
        <div style={{ maxWidth: 1240, margin: "0 auto", padding: "0 clamp(20px,4vw,48px)", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 24 }}>
          <a href="#inicio" style={{ textDecoration: "none" }}><Logo /></a>

          <nav className="hnr-nav" style={{ display: "flex", alignItems: "center", gap: "clamp(14px,2.2vw,30px)" }}>
            {NAV.map(([label, href]) => (
              <a key={href} href={href} style={{ fontSize: 13.5, color: "#3E5259", textDecoration: "none" }}>{label}</a>
            ))}
            <Button href="#contato" style={{ padding: "13px 22px", fontSize: 13, boxShadow: "none" }}>Agende sua sessão</Button>
          </nav>

          <button
            className="hnr-burger"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Menu"
            style={{ display: "none", flexDirection: "column", gap: 5, background: "transparent", border: 0, padding: 10, cursor: "pointer" }}
          >
            <span style={{ width: 22, height: 1.5, background: C.ink, display: "block" }} />
            <span style={{ width: 22, height: 1.5, background: C.ink, display: "block" }} />
            <span style={{ width: 14, height: 1.5, background: C.gold, display: "block" }} />
          </button>
        </div>

        {menuOpen && (
          <div style={{ padding: "18px clamp(20px,4vw,48px) 24px", display: "flex", flexDirection: "column", gap: 4, borderTop: "1px solid rgba(15,46,56,.07)" }}>
            {NAV.map(([label, href]) => (
              <a key={href} href={href} onClick={() => setMenuOpen(false)} style={{ padding: "14px 0", fontSize: 16, color: C.ink, textDecoration: "none", borderBottom: "1px solid rgba(15,46,56,.07)" }}>
                {label}
              </a>
            ))}
            <Button href="#contato" style={{ marginTop: 14, textAlign: "center" }}>Agende sua sessão</Button>
          </div>
        )}
      </header>

      {/* HERO */}
      <section id="inicio" style={{ scrollMarginTop: 110, padding: "clamp(130px,14vw,190px) clamp(20px,4vw,48px) clamp(70px,8vw,110px)", position: "relative", background: `linear-gradient(180deg,${C.off} 0%,${C.beige} 100%)` }}>
        <div style={{ position: "absolute", top: 0, right: 0, width: "44%", height: "100%", background: "radial-gradient(ellipse at 70% 30%, rgba(176,138,74,.10), transparent 62%)", pointerEvents: "none" }} />
        <div style={{ maxWidth: 1240, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(340px,1fr))", gap: "clamp(40px,5vw,72px)", alignItems: "center", position: "relative" }}>
          <Reveal>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 26 }}>
              <span style={{ width: 34, height: 1, background: C.gold, display: "block" }} />
              <span style={{ fontSize: 11, letterSpacing: ".24em", textTransform: "uppercase", color: "#8A7444" }}>Psicóloga Infantil &amp; Adolescente</span>
            </div>
            <h1 style={{ fontFamily: serif, fontWeight: 400, fontSize: "clamp(40px,5.2vw,68px)", lineHeight: 1.08, letterSpacing: "-.01em", color: C.ink, margin: "0 0 26px" }}>
              Cuidado psicológico que acompanha <em style={{ color: C.ink2 }}>cada fase da vida.</em>
            </h1>
            <p style={{ fontSize: "clamp(15px,1.2vw,17.5px)", lineHeight: 1.75, color: C.text, maxWidth: 520, margin: "0 0 34px", textWrap: "pretty" }}>
              Psicóloga infantil e adolescente, especialista em Terapia Cognitivo-Comportamental, com atuação clínica, forense e corporativa.
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 14, marginBottom: 38 }}>
              <Button href="#contato">Agende sua sessão</Button>
              <Button href="#servicos" variant="ghost">Conheça meu trabalho</Button>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <span style={{ fontFamily: mono, fontSize: 11.5, letterSpacing: ".14em", color: "#8A9AA0" }}>CRP 06/184616</span>
              <span style={{ width: 1, height: 14, background: "rgba(15,46,56,.15)", display: "block" }} />
              <span style={{ fontSize: 11.5, letterSpacing: ".14em", textTransform: "uppercase", color: "#8A9AA0" }}>Presencial &amp; Online</span>
            </div>
          </Reveal>

          <Reveal delay={0.15} style={{ position: "relative" }}>
            <div style={{ position: "absolute", inset: "18px -18px -18px 18px", border: "1px solid rgba(176,138,74,.4)", borderRadius: "8px 120px 8px 8px" }} />
            <div style={{ position: "relative", borderRadius: "6px 120px 6px 6px", overflow: "hidden", aspectRatio: "4/5", background: "#E9E3D7", boxShadow: "0 40px 80px -50px rgba(15,46,56,.55)" }}>
              <img src={PHOTO_HERO} alt="Hanny Rekbaim em seu consultório" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "52% 22%", display: "block" }} />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(200deg, rgba(15,46,56,0) 55%, rgba(15,46,56,.16) 100%)" }} />
            </div>
            <div style={{ position: "absolute", bottom: -26, left: -26, background: C.off, border: "1px solid rgba(15,46,56,.09)", borderRadius: 4, padding: "18px 22px", boxShadow: "0 20px 40px -28px rgba(15,46,56,.4)", animation: "floatSoft 7s ease-in-out infinite" }}>
              <div style={{ fontFamily: serif, fontSize: 26, color: C.ink, lineHeight: 1 }}>2+</div>
              <div style={{ fontSize: 10, letterSpacing: ".18em", textTransform: "uppercase", color: "#8A9AA0", marginTop: 8 }}>Atendimento a partir<br />dos 2 anos</div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* POSICIONAMENTO */}
      <Reveal as="section" style={{ ...section, background: C.off }}>
        <div style={wrap}>
          <div style={{ maxWidth: 720, margin: "0 auto 64px", textAlign: "center" }}>
            <h2 style={{ ...h2, fontSize: "clamp(28px,3.4vw,42px)", marginBottom: 20 }}>Psicologia com olhar humano e atuação multidisciplinar.</h2>
            <p style={{ fontSize: 16, lineHeight: 1.8, color: "#5A6C72", margin: 0, textWrap: "pretty" }}>
              Um trabalho que une acolhimento, conhecimento técnico e diferentes perspectivas para cuidar de pessoas, famílias e organizações.
            </p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", gap: 2, background: "rgba(15,46,56,.09)", border: "1px solid rgba(15,46,56,.09)", borderRadius: 6, overflow: "hidden" }}>
            {[
              ["Atendimento presencial e online", "A partir dos 2 anos"],
              ["Terapia Cognitivo-Comportamental", "Abordagem baseada em evidências"],
              ["Atuação multidisciplinar", "Clínica, corporativo e forense"],
            ].map(([t, d]) => (
              <div key={t} style={{ background: C.card, padding: "38px 32px" }}>
                <span style={{ display: "block", width: 22, height: 1, background: C.gold, marginBottom: 20 }} />
                <div style={{ fontSize: 11, letterSpacing: ".2em", textTransform: "uppercase", color: C.ink, fontWeight: 600, lineHeight: 1.6 }}>{t}</div>
                <div style={{ fontSize: 14.5, color: "#6C7C82", marginTop: 12 }}>{d}</div>
              </div>
            ))}
          </div>
        </div>
      </Reveal>

      {/* SOBRE */}
      <section id="sobre" style={{ ...section, scrollMarginTop: 110, background: C.beige }}>
        <Reveal style={{ maxWidth: 1180, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(320px,1fr))", gap: "clamp(40px,5vw,80px)", alignItems: "center" }}>
          <div style={{ position: "relative" }}>
            <div style={{ borderRadius: "120px 6px 6px 6px", overflow: "hidden", aspectRatio: "5/6", background: "#E4DDCF", boxShadow: "0 34px 70px -46px rgba(15,46,56,.45)" }}>
              <img src={PHOTO_SOBRE} alt="Hanny Rekbaim durante atendimento" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "34% 40%", filter: "saturate(.94)", display: "block" }} />
            </div>
            <div style={{ position: "absolute", top: -14, right: -14, width: 88, height: 88, border: "1px solid rgba(176,138,74,.5)", borderRadius: "50%" }} />
          </div>
          <div>
            <Eyebrow>Sobre</Eyebrow>
            <h2 style={{ ...h2, fontSize: "clamp(30px,3.6vw,46px)", lineHeight: 1.15, marginBottom: 28 }}>Olá, eu sou <em>Hanny Rekbaim.</em></h2>
            <p style={{ fontSize: 16, lineHeight: 1.85, color: C.text, margin: "0 0 20px", textWrap: "pretty" }}>
              Sou psicóloga (CRP 06/184616), dedicada ao cuidado emocional de crianças e adolescentes através da Terapia Cognitivo-Comportamental.
            </p>
            <p style={{ fontSize: 16, lineHeight: 1.85, color: C.text, margin: "0 0 32px", textWrap: "pretty" }}>
              Além da atuação clínica, também desenvolvo meu trabalho na área corporativa, como gestora da NR-01, e na psicologia forense, ampliando minha atuação para diferentes contextos em que a saúde mental e o comportamento humano fazem diferença.
            </p>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 14, borderTop: "1px solid rgba(176,138,74,.45)", borderBottom: "1px solid rgba(176,138,74,.45)", padding: "16px 0", marginBottom: 34 }}>
              {["Acolhimento", "Técnica", "Propósito"].map((w, i) => (
                <React.Fragment key={w}>
                  {i > 0 && <span style={{ color: C.gold }}>+</span>}
                  <span style={{ fontSize: 11.5, letterSpacing: ".2em", textTransform: "uppercase", color: C.ink, fontWeight: 600 }}>{w}</span>
                </React.Fragment>
              ))}
            </div>
            <div>
              <a href="#servicos" style={{ display: "inline-flex", alignItems: "center", gap: 10, fontSize: 14, fontWeight: 500, color: C.ink, textDecoration: "none", borderBottom: "1px solid rgba(15,46,56,.25)", paddingBottom: 6 }}>
                Conheça minha trajetória <span style={{ color: C.gold }}>→</span>
              </a>
            </div>
          </div>
        </Reveal>
      </section>

      {/* SERVIÇOS */}
      <section id="servicos" style={{ ...section, scrollMarginTop: 110, background: C.off }}>
        <div style={{ maxWidth: 1240, margin: "0 auto" }}>
          <Reveal style={{ display: "flex", flexWrap: "wrap", alignItems: "flex-end", justifyContent: "space-between", gap: 24, marginBottom: 56 }}>
            <div style={{ maxWidth: 620 }}>
              <Eyebrow>Serviços</Eyebrow>
              <h2 style={{ ...h2, fontSize: "clamp(30px,3.6vw,46px)", lineHeight: 1.15 }}>Um olhar especializado para diferentes necessidades.</h2>
            </div>
            <div style={{ fontSize: 14.5, lineHeight: 1.75, color: "#6C7C82", maxWidth: 300 }}>
              Cada área de atuação com seu próprio caminho de contato — sem confusão para quem chega.
            </div>
          </Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(270px,1fr))", gap: "clamp(18px,2vw,26px)" }}>
            {SERVICES.map((s) => <ServiceCard key={s.num} s={s} />)}
          </div>
        </div>
      </section>

      {/* NR-01 */}
      <Reveal as="section" style={{ background: C.ink, padding: "clamp(76px,9vw,124px) clamp(20px,4vw,48px)", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: -120, right: -80, width: 420, height: 420, border: "1px solid rgba(176,138,74,.22)", borderRadius: "50%" }} />
        <div style={{ position: "absolute", bottom: -180, left: -100, width: 340, height: 340, border: "1px solid rgba(176,138,74,.14)", borderRadius: "50%" }} />
        <div style={{ ...wrap, position: "relative", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(320px,1fr))", gap: "clamp(40px,5vw,72px)", alignItems: "center" }}>
          <div>
            <Eyebrow dark>NR-01 · Empresas</Eyebrow>
            <h2 style={{ fontFamily: serif, fontWeight: 300, fontSize: "clamp(30px,3.8vw,48px)", lineHeight: 1.15, color: "#F7F3EB", margin: "0 0 24px" }}>
              Saúde mental também faz parte de uma organização saudável.
            </h2>
            <p style={{ fontSize: 16, lineHeight: 1.85, color: "rgba(247,243,235,.72)", margin: "0 0 38px", maxWidth: 520, textWrap: "pretty" }}>
              A atuação em NR-01 conecta saúde psicossocial, gestão e prevenção de riscos dentro das organizações.
            </p>
            <Button href="#contato" variant="gold">Quero conversar sobre NR-01</Button>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            {["Gestão de riscos psicossociais", "Conformidade com a norma", "Ambiente de trabalho mais saudável"].map((t, i) => (
              <div key={t} style={{ border: "1px solid rgba(201,169,106,.3)", borderRadius: 6, padding: "26px 28px", background: "rgba(255,255,255,.03)" }}>
                <div style={{ fontFamily: mono, fontSize: 11, color: C.goldLight, marginBottom: 12 }}>{`0${i + 1}`}</div>
                <div style={{ fontFamily: serif, fontSize: 22, color: "#F7F3EB" }}>{t}</div>
              </div>
            ))}
          </div>
        </div>
      </Reveal>

      {/* DIFERENCIAIS */}
      <Reveal as="section" style={{ ...section, background: C.off }}>
        <div style={wrap}>
          <h2 style={{ ...h2, marginBottom: 64, maxWidth: 620 }}>Por que escolher um acompanhamento especializado?</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: "clamp(30px,4vw,56px)" }}>
            {DIFF.map(([n, t, d]) => (
              <div key={n} style={{ borderTop: "1px solid rgba(15,46,56,.13)", paddingTop: 26 }}>
                <div style={{ fontFamily: serif, fontSize: 52, fontWeight: 300, color: C.gold, lineHeight: 1, marginBottom: 20 }}>{n}</div>
                <div style={{ fontSize: 17, color: C.ink, fontWeight: 500 }}>{t}</div>
                <div style={{ fontSize: 14, color: C.muted, marginTop: 10, lineHeight: 1.7 }}>{d}</div>
              </div>
            ))}
          </div>
        </div>
      </Reveal>

      {/* DEPOIMENTOS */}
      <section id="depoimentos" style={{ ...section, scrollMarginTop: 110, background: C.beige }}>
        <Reveal style={wrap}>
          <div style={{ textAlign: "center", maxWidth: 600, margin: "0 auto 56px" }}>
            <Eyebrow>Depoimentos</Eyebrow>
            <h2 style={h2}>Experiências que geram confiança.</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: 22 }}>
            {TESTIMONIALS.map((label) => (
              <div key={label} style={{ background: C.card, border: "1px dashed rgba(15,46,56,.2)", borderRadius: 6, padding: "34px 30px", minHeight: 230, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                <span style={{ fontFamily: serif, fontSize: 44, color: "#D8C79E", lineHeight: 0.6 }}>“</span>
                <div style={{ fontFamily: mono, fontSize: 12, lineHeight: 1.8, color: "#6C7C82" }}>Depoimento real — inserir mediante autorização da cliente.</div>
                <div style={{ borderTop: "1px solid rgba(15,46,56,.1)", paddingTop: 16, fontSize: 11, letterSpacing: ".16em", textTransform: "uppercase", color: C.faint }}>{label}</div>
              </div>
            ))}
          </div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 12, marginTop: 34 }}>
            <span style={{ width: 5, height: 5, borderRadius: "50%", background: C.gold, display: "block" }} />
            <span style={{ fontSize: 12.5, color: C.muted, lineHeight: 1.6, textAlign: "center" }}>
              Todos os relatos são publicados apenas com autorização expressa, preservando o sigilo profissional.
            </span>
          </div>
        </Reveal>
      </section>

      {/* COMO FUNCIONA */}
      <section id="atendimento" style={{ ...section, scrollMarginTop: 110, background: C.off }}>
        <Reveal style={wrap}>
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "flex-end", justifyContent: "space-between", gap: 24, marginBottom: 56 }}>
            <div>
              <Eyebrow>Como funciona</Eyebrow>
              <h2 style={{ ...h2, maxWidth: 520 }}>Três passos até o primeiro atendimento.</h2>
            </div>
            <Button href="#contato" style={{ padding: "16px 30px", boxShadow: "none" }}>Agendar atendimento</Button>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: 2, background: "rgba(15,46,56,.09)", border: "1px solid rgba(15,46,56,.09)", borderRadius: 6, overflow: "hidden" }}>
            {STEPS.map(([n, t, d]) => (
              <div key={n} style={{ background: C.card, padding: "40px 32px" }}>
                <div style={{ fontFamily: mono, fontSize: 11, color: C.gold, letterSpacing: ".14em", marginBottom: 22 }}>{n}</div>
                <div style={{ fontFamily: serif, fontSize: 23, color: C.ink, marginBottom: 14 }}>{t}</div>
                <div style={{ fontSize: 14.5, lineHeight: 1.75, color: "#5A6C72" }}>{d}</div>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      {/* FAQ */}
      <section style={{ ...section, background: C.beige }}>
        <Reveal style={{ maxWidth: 900, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <Eyebrow>Perguntas frequentes</Eyebrow>
            <h2 style={{ ...h2, fontSize: "clamp(28px,3.4vw,42px)" }}>Dúvidas comuns antes do primeiro contato.</h2>
          </div>
          <div style={{ borderTop: "1px solid rgba(15,46,56,.13)" }}>
            {FAQ.map(([q, a], i) => (
              <FaqItem key={q} q={q} a={a} open={open === i} onToggle={() => setOpen(open === i ? -1 : i)} />
            ))}
          </div>
        </Reveal>
      </section>

      {/* CTA FINAL */}
      <section id="contato" style={{ scrollMarginTop: 110, padding: "clamp(80px,9vw,130px) clamp(20px,4vw,48px)", background: `linear-gradient(180deg,${C.beige} 0%,#EDE7DC 100%)`, textAlign: "center" }}>
        <Reveal style={{ maxWidth: 760, margin: "0 auto" }}>
          <span style={{ display: "block", width: 1, height: 46, background: C.gold, margin: "0 auto 30px" }} />
          <h2 style={{ fontFamily: serif, fontWeight: 300, fontSize: "clamp(32px,4.4vw,58px)", lineHeight: 1.12, color: C.ink, margin: "0 0 24px" }}>
            Dar o primeiro passo também é uma forma de <em>cuidado.</em>
          </h2>
          <p style={{ fontSize: 16.5, lineHeight: 1.8, color: C.text, margin: "0 auto 40px", maxWidth: 520 }}>
            Seja para você, para sua família ou para sua organização, estou à disposição para conversar.
          </p>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 22 }}>
            <Button href={WHATSAPP} style={{ padding: "19px 42px", fontSize: 15 }}>Falar com Hanny</Button>
            <a href={WHATSAPP} style={{ fontFamily: mono, fontSize: 13, letterSpacing: ".1em", color: "#5A6C72", textDecoration: "none" }}>WhatsApp (11) 95114-0220</a>
          </div>
        </Reveal>
      </section>

      {/* FOOTER */}
      <footer style={{ background: C.ink, padding: "clamp(56px,6vw,84px) clamp(20px,4vw,48px) 36px", color: "#F7F3EB" }}>
        <div style={wrap}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(230px,1fr))", gap: 44, paddingBottom: 44, borderBottom: "1px solid rgba(247,243,235,.12)" }}>
            <div>
              <div style={{ marginBottom: 20 }}><Logo dark size={32} showTag={false} /></div>
              <div style={{ fontSize: 14, color: "rgba(247,243,235,.66)", lineHeight: 1.9 }}>
                Psicóloga<br />CRP 06/184616<br />Atendimento presencial e online
              </div>
            </div>
            <div>
              <div style={{ fontSize: 10.5, letterSpacing: ".22em", textTransform: "uppercase", color: C.goldLight, marginBottom: 20 }}>Navegação</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {NAV.filter((_, i) => i !== 3 && i !== 4).map(([label, href]) => (
                  <a key={href} href={href} style={{ fontSize: 14, color: "rgba(247,243,235,.72)", textDecoration: "none" }}>{label}</a>
                ))}
              </div>
            </div>
            <div>
              <div style={{ fontSize: 10.5, letterSpacing: ".22em", textTransform: "uppercase", color: C.goldLight, marginBottom: 20 }}>Contato</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                <a href={WHATSAPP} style={{ fontSize: 14, color: "rgba(247,243,235,.72)", textDecoration: "none" }}>WhatsApp (11) 95114-0220</a>
                <a href="#contato" style={{ fontSize: 14, color: "rgba(247,243,235,.72)", textDecoration: "none" }}>Instagram</a>
              </div>
            </div>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: 16, paddingTop: 26, fontSize: 11.5, color: "rgba(247,243,235,.45)", lineHeight: 1.7 }}>
            <span>Este site possui caráter informativo e não substitui avaliação psicológica.</span>
            <span>© 2026 Hanny Rekbaim · Todos os direitos reservados</span>
          </div>
        </div>
      </footer>

      {/* WHATSAPP FLUTUANTE */}
      <a
        href={WHATSAPP}
        style={{
          position: "fixed", bottom: 24, right: 24, zIndex: 70, background: C.ink, color: C.off,
          borderRadius: 999, padding: "15px 24px", fontSize: 13.5, fontWeight: 500, textDecoration: "none",
          display: "inline-flex", alignItems: "center", gap: 10,
          boxShadow: "0 18px 40px -18px rgba(15,46,56,.65)", border: "1px solid rgba(201,169,106,.5)",
        }}
      >
        <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#8FD07C", display: "block" }} />
        WhatsApp
      </a>
    </div>
  );
}
