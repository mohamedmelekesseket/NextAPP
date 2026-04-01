"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

/* ─────────────────────────────────────────────────────────
   CountUp — animates a number from 0 → target on scroll into view
───────────────────────────────────────────────────────── */
function CountUp({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const duration = 1400;
          const step = target / (duration / 16);
          let current = 0;
          const timer = setInterval(() => {
            current += step;
            if (current >= target) { setCount(target); clearInterval(timer); }
            else setCount(Math.floor(current));
          }, 16);
        }
      },
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [target]);

  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
}

/* ─────────────────────────────────────────────────────────
   ScrollReveal — CSS scroll-driven + IntersectionObserver fallback
───────────────────────────────────────────────────────── */
function ScrollReveal({
  children,
  animClass = "animate-fade-up",
  delay = "",
}: {
  children: React.ReactNode;
  animClass?: string;
  delay?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const triggered = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const supportsScrollTimeline = CSS.supports("animation-timeline", "view()");
    if (supportsScrollTimeline) return; // CSS handles it

    // Fallback for browsers without scroll-driven animations
    el.style.opacity = "0";
    el.style.transform = "translateY(36px)";
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !triggered.current) {
          triggered.current = true;
          el.style.opacity = "";
          el.style.transform = "";
          el.classList.add(animClass);
          if (delay) el.classList.add(delay);
        }
      },
      { threshold: 0.12, rootMargin: "-60px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [animClass, delay]);

  return (
    <div ref={ref} className={["reveal", animClass, delay].filter(Boolean).join(" ")}>
      {children}
    </div>
  );
}

/* ─── Data ─── */
const values = [
  {
    icon: "🔥",
    title: "Identité culturelle",
    text: "Nous croyons en la richesse et la diversité de la culture amazighe et nous nous engageons à la préserver et à la promouvoir. L'héritage amazigh est une part intégrante du patrimoine tunisien.",
  },
  {
    icon: "🤝",
    title: "Engagement communautaire",
    text: "Nous encourageons la participation active des membres de la communauté dans nos initiatives et actions. La culture amazighe ne peut perdurer sans l'implication des personnes qui la portent.",
  },
  {
    icon: "💬",
    title: "Dialogue et tolérance",
    text: "Nous favorisons le dialogue interculturel et la compréhension mutuelle entre les différentes communautés. La Tunisie est un pays riche de sa diversité.",
  },
];

/* ─── Page ─── */
export default function AProposPage() {
  // Injected via <style> because autoprefixer strips WebkitBoxOrient from inline styles
  const clampStyle = `
    .value-card__text {
      display: -webkit-box;
      -webkit-line-clamp: 7;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
  `;
  const [activeValue, setActiveValue] = useState<null | { title: string; text: string }>(
    null
  );

  useEffect(() => {
    if (!activeValue) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveValue(null);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [activeValue]);

  const closeModal = () => setActiveValue(null);

  return (
    <main>
      <style dangerouslySetInnerHTML={{ __html: clampStyle }} />
      {activeValue ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={activeValue.title}
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) closeModal();
          }}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(17, 24, 39, 0.55)",
            backdropFilter: "blur(2px)",
            display: "grid",
            placeItems: "center",
            zIndex: 9999,
            padding: "24px",
          }}
        >
          <div
            style={{
              width: "min(720px, 92vw)",
              background: "#fff",
              borderRadius: "10px",
              boxShadow: "0 18px 60px rgba(0,0,0,0.25)",
              border: "1px solid rgba(0,0,0,0.06)",
              padding: "34px 32px",
              textAlign: "center",
            }}
          >
            <h3
              style={{
                margin: 0,
                fontSize: "22px",
                fontWeight: 800,
                color: "#8a1538",
              }}
            >
              {activeValue.title}
            </h3>
            <p
              style={{
                margin: "14px auto 0",
                maxWidth: "56ch",
                color: "#6b7280",
                lineHeight: 1.7,
                fontSize: "14px",
              }}
            >
              {activeValue.text}
            </p>
            <button
              type="button"
              onClick={closeModal}
              style={{
                marginTop: "22px",
                background: "transparent",
                border: "none",
                color: "#1f4b7a",
                textDecoration: "underline",
                cursor: "pointer",
                fontWeight: 600,
              }}
            >
              Fermer
            </button>
          </div>
        </div>
      ) : null}

      {/* ══ HERO ══ */}
      <section className="hero">
        <div className="hero-texture" />
        <div className="hero-grain" />
        <div className="hero-content">
          <p className="hero-eyebrow">Association Culturelle Amazighe</p>
          <h1 className="hero-title">À Propos</h1>
          <div className="hero-divider" />
          <p className="hero-tagline">
            Tamaguit · Tunisie · <span>Depuis 2017</span>
          </p>
        </div>
      </section>

      {/* ══ INTRO ══ */}
      <section className="intro">
        <ScrollReveal animClass="animate-fade-up" delay="delay-1">
          <div className="section-label">8 Ans d'expérience</div>
        </ScrollReveal>

        <ScrollReveal animClass="animate-fade-up" delay="delay-2">
          <h2 className="intro-heading">
            Association Tamaguit pour les droits, les libertés et la culture des{" "}
            <em>Amazighs.</em>
          </h2>
        </ScrollReveal>

        <div className="intro-cols">
          <ScrollReveal animClass="animate-fade-up" delay="delay-3">
            <p className="intro-text">
              Nous sommes une organisation fondée en 2017, basée à Tunisie. Notre mission
              principale est de promouvoir et de préserver l'identité culturelle amazighe,
              de défendre les droits de l'homme, et de lutter contre toutes les formes de
              discrimination.
            </p>
          </ScrollReveal>
          <ScrollReveal animClass="animate-fade-up" delay="delay-4">
            <p className="intro-text">
              À travers la sensibilisation, l'éducation et l'action communautaire, nous
              œuvrons pour la reconnaissance et la transmission du riche patrimoine amazigh
              aux générations futures.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* ══ MISSION ══ */}
      <section className="mission">
        <div className="mission-inner">

          <ScrollReveal animClass="animate-slide-left" delay="delay-1">
            <div className="mission-img-wrap">
              <div className="mission-img-frame">
                <div className="mission-img-inner">Communauté Amazighe</div>
              </div>
              <div className="mission-img-accent" />
            </div>
          </ScrollReveal>

          <ScrollReveal animClass="animate-slide-right" delay="delay-2">
            <div>
              <div className="section-label">Notre Mission</div>
              <h2 className="mission-heading">
                Ensemble, préservons l'identité
                <em>amazighe</em>
              </h2>
              <p className="mission-sub">Nous agissons pour la culture et les droits humains</p>
              <p className="mission-text">
                Notre mission est de préserver et promouvoir l'identité amazighe en Tunisie,
                tout en défendant les droits humains et en luttant contre toute forme de
                discrimination. À travers la sensibilisation, l'éducation et l'action
                communautaire, nous œuvrons pour la reconnaissance et la transmission du
                riche patrimoine amazigh aux générations futures.
              </p>
              <div className="stats-grid">
                {[
                  { icon: "𐰀", num: 500,  suffix: "+", label: "Parle de l'amazigh" },
                  { icon: "👥", num: 1200, suffix: "+", label: "Communauté engagée" },
                ].map((s) => (
                  <div key={s.label} className="stat-card">
                    <div className="stat-icon">{s.icon}</div>
                    <div className="stat-number"><CountUp target={s.num} suffix={s.suffix} /></div>
                    <div className="stat-label">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>

        </div>
      </section>

      {/* ══ VALUES ══ */}
      <section className="values-section">
        <div className="values-inner">

          <ScrollReveal animClass="animate-fade-up" delay="delay-1">
            <div className="values-label-inner">Ce qui nous guide</div>
          </ScrollReveal>
          <ScrollReveal animClass="animate-fade-up" delay="delay-2">
            <h2 className="values-heading">Nos Valeurs</h2>
          </ScrollReveal>
          <ScrollReveal animClass="animate-fade-up" delay="delay-3">
            <p className="values-desc">
              Chez Tamaguit, nous célébrons l'héritage amazigh tunisien en promouvant la
              culture, l'égalité et le dialogue.
            </p>
          </ScrollReveal>

          <div className="values-grid">
            <ValueCard
              title="Transparence et responsabilité"
              text="Nous agissons avec transparence et responsabilité dans la gestion de nos activités et ressources. La confiance est la base de toute organisation ou mouvement communautaire. C'est pourquoi nous nous engageons à travailler avec honnêteté, à rendre des comptes sur nos actions et à garantir que nos ressources soient utilisées de manière éthique et efficace. Chaque initiative que nous lançons est guidée par des principes de clarté et d'intégrité afin de garantir un impact positif et durable. Nous encourageons également la participation de tous dans la prise de décision et l'évaluation de nos actions, car c'est ensemble que nous pouvons avancer vers un avenir plus juste et équilibré."
              onReadMore={(payload) => setActiveValue(payload)}
            />
            <ValueCard
              title="Identité culturelle"
              text="Nous croyons en la richesse et la diversité de la culture amazighe et nous nous engageons à la préserver et à la promouvoir. L'héritage amazigh est une part intégrante du patrimoine tunisien, avec sa langue, ses traditions, son artisanat et ses valeurs ancestrales qui témoignent d'une histoire millénaire. Malheureusement, cette culture a souvent été marginalisée ou peu mise en valeur. Il est donc primordial de redonner à cette identité la place qu'elle mérite en favorisant l'apprentissage de la langue amazighe, en encourageant les initiatives artistiques et culturelles, et en mettant en lumière les contributions des Amazighs à l'histoire et à la société tunisienne."
              onReadMore={(payload) => setActiveValue(payload)}
            />
            <ValueCard
              title="Justice et égalité"
              text="Tous les êtres humains sont égaux en dignité et en droits, sans distinction d'origine ethnique, de langue, de religion ou de tout autre statut. La justice et l'égalité constituent les piliers fondamentaux de notre engagement envers la communauté amazighe en Tunisie. Nous croyons fermement que chaque individu, quelle que soit son origine, doit avoir accès aux mêmes opportunités et être traité avec le même respect. Cette valeur est d'autant plus importante dans un contexte où les minorités culturelles et ethniques sont souvent marginalisées. En prônant l'égalité, nous aspirons à créer une société où chaque voix est entendue et chaque personne est reconnue dans sa pleine humanité."
              onReadMore={(payload) => setActiveValue(payload)}
            />
            <ValueCard
              title="Dialogue et tolérance"
              text="Nous favorisons le dialogue interculturel et la compréhension mutuelle entre les différentes communautés. La Tunisie est un pays riche de sa diversité, où plusieurs cultures, langues et traditions se croisent. Le dialogue est la clé pour mieux se comprendre, dépasser les préjugés et construire un avenir harmonieux. Nous croyons qu'en encourageant les échanges et en promouvant une culture de respect mutuel, nous pouvons réduire les tensions et favoriser une coexistence pacifique entre toutes les composantes de la société. Nos initiatives visent à créer des espaces de discussion, à sensibiliser à la richesse des différentes identités culturelles et à encourager les collaborations entre communautés."
              onReadMore={(payload) => setActiveValue(payload)}
            />
            <ValueCard
              title="Engagement communautaire"
              text="Nous encourageons la participation active des membres de la communauté dans nos initiatives et actions. La culture amazighe ne peut perdurer sans l'implication des personnes qui la portent. C'est pourquoi nous incitons chacun à jouer un rôle actif dans la promotion et la préservation de cette identité. Que ce soit par le biais d'activités culturelles, de formations, de recherches historiques ou d'initiatives locales, nous voulons que chaque membre de la communauté puisse contribuer à la valorisation de l'héritage amazigh. Nous croyons en la force de l'action collective et en l'importance de transmettre nos valeurs aux nouvelles générations."
              onReadMore={(payload) => setActiveValue(payload)}
            />
            <ValueCard
              title="Solidarité et entraide"
              text="Nous croyons en la force de la solidarité pour préserver et promouvoir l'identité amazighe. En soutenant nos communautés, en valorisant nos traditions et en travaillant ensemble, nous renforçons notre culture et défendons nos droits. Chaque action, aussi petite soit-elle, contribue à la transmission de notre héritage et à la reconnaissance de notre identité"
              onReadMore={(payload) => setActiveValue(payload)}
            />
          </div>

        </div>
      </section>

    </main>
  );
}


function ValueCard({
  title,
  text,
  onReadMore,
}: {
  title: string;
  text: string;
  onReadMore: (payload: { title: string; text: string }) => void;
}) {
  return (
    <motion.article className="value-card" whileHover={{ y: -8 }}>
      <h3>{title}</h3>
      <p className="value-card__text">
        {text}
      </p>
      <button
        type="button"
        className="value-card__more"
        onClick={() => onReadMore({ title, text })}
        style={{
          background: "transparent",
          border: "none",
          padding: 0,
          cursor: "pointer",
        }}
      >
        Read More
      </button>
    </motion.article>
  );
}