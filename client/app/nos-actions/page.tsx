"use client";

import { useEffect, useRef, useState } from "react";

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
    if (supportsScrollTimeline) return;
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
const CATEGORIES = [
  "Toutes",
  "Éducation",
  "Médical",
  "Nature",
  "Patrimoine",
  "Sensibilisation",
  "Social",
];

const actions = [
  {
    tags: ["Éducation", "Sensibilisation"],
    title: "Éducation et sensibilisation",
    desc: "Ateliers scolaires, conférences et supports pédagogiques pour transmettre la langue et la culture amazighe aux jeunes générations.",
  },
  {
    tags: ["Social"],
    title: "Promotion de l'économie sociale et solidaire",
    desc: "Accompagnement des artisans et entrepreneurs amazighs pour valoriser leur savoir-faire dans une économie inclusive.",
  },
  {
    tags: ["Patrimoine"],
    title: "Préservation du patrimoine amazigh",
    desc: "Collecte, archivage et diffusion des traditions orales, de l'artisanat et des symboles identitaires amazighs.",
  },
  {
    tags: ["Médical"],
    title: "Soutien pendant la pandémie de COVID-19",
    desc: "Distribution de masques, kits sanitaires et information en tamazight auprès des communautés rurales les plus vulnérables.",
  },
  {
    tags: ["Nature"],
    title: "Campagnes de plaidoyer",
    desc: "Actions de terrain et pétitions pour défendre les droits linguistiques et culturels amazighs auprès des institutions.",
  },
  {
    tags: ["Social"],
    title: "Représentation internationale",
    desc: "Participation aux forums ONU et aux réseaux berbères mondiaux pour porter la voix de la communauté amazighe tunisienne.",
  },
];

/* ─── Page ─── */
export default function NosActionsPage() {
  const [active, setActive] = useState("Toutes");

  const filtered = active === "Toutes"
    ? actions
    : actions.filter((a) => a.tags.includes(active));

  return (
    <main>

      {/* ══ HERO ══ */}
      <section className="hero">
        <div className="hero-texture" />
        <div className="hero-grain" />
        <div className="hero-content">
          <p className="hero-eyebrow">Association Culturelle Amazighe</p>
          <h1 className="hero-title">Nos Actions</h1>
          <div className="hero-divider" />
          <p className="hero-tagline">
            Tamaguit · <span>Ce que nous faisons</span>
          </p>
        </div>
      </section>

      {/* ══ FILTER BAR ══ */}
      <nav className="actions-filter" aria-label="Filtrer par catégorie">
        <div className="actions-filter-inner">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              className={`filter-btn${active === cat ? " active" : ""}`}
              onClick={() => setActive(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </nav>

      {/* ══ ACTIONS GRID ══ */}
      <section className="actions-section">
        <div className="actions-inner">
          <div className="actions-grid">
            {filtered.length === 0 ? (
              <p className="actions-empty">Aucune action dans cette catégorie.</p>
            ) : (
              filtered.map((action, i) => (
                <ScrollReveal
                  key={action.title}
                  animClass="animate-fade-up"
                  delay={`delay-${(i % 3) + 1}`}
                >
                  <article className="action-card">
                    <div className="action-tags">
                      {action.tags.map((tag) => (
                        <span key={tag} className="action-tag">{tag}</span>
                      ))}
                    </div>
                    <h2 className="action-title">{action.title}</h2>
                    <p className="action-desc">{action.desc}</p>
                    <div className="action-card-arrow">→</div>
                  </article>
                </ScrollReveal>
              ))
            )}
          </div>
        </div>
      </section>

    </main>
  );
}