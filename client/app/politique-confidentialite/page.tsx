"use client";

import { useEffect, useRef, useState } from "react";

const sections = [
  {
    id: "collecte",
    symbol: "ⵣ",
    title: "1. Collecte des données personnelles",
    content: `L'Association Tamaguit pour les droits, les libertés et la culture des Amazighs collecte uniquement les données personnelles que vous nous fournissez volontairement, notamment lors de votre adhésion, de vos dons, de votre inscription à nos événements ou de vos prises de contact via notre site web ou nos canaux officiels.\n\nCes données peuvent inclure : votre nom et prénom, votre adresse électronique, votre numéro de téléphone, votre adresse postale, et toute information complémentaire que vous choisissez de partager avec nous.`,
  },
  {
    id: "utilisation",
    symbol: "ⵜ",
    title: "2. Utilisation des données",
    content: `Vos données personnelles sont utilisées exclusivement dans le cadre des activités de l'association :\n\n— Gestion de votre adhésion et de votre relation avec l'association.\n— Communication relative à nos événements culturels, conférences et rassemblements.\n— Envoi de notre bulletin d'information (newsletter) si vous y avez consenti.\n— Traitement de vos dons et émission de reçus fiscaux.\n— Réponse à vos demandes et requêtes.\n\nNous ne procédons à aucun profilage ni à aucune prise de décision automatisée basée sur vos données.`,
  },
  {
    id: "partage",
    symbol: "ⵎ",
    title: "3. Partage et confidentialité",
    content: `L'Association Tamaguit s'engage fermement à ne jamais vendre, louer ou céder vos données personnelles à des tiers à des fins commerciales.\n\nVos informations peuvent être partagées uniquement dans les cas suivants :\n\n— Avec des prestataires techniques (hébergement, messagerie) liés par des obligations strictes de confidentialité.\n— Sur réquisition légale des autorités compétentes, dans le respect du cadre juridique en vigueur.\n— Avec votre consentement explicite et préalable pour tout autre usage.`,
  },
  {
    id: "conservation",
    symbol: "ⵏ",
    title: "4. Durée de conservation",
    content: `Vos données personnelles sont conservées pendant la durée nécessaire à l'accomplissement des finalités pour lesquelles elles ont été collectées :\n\n— Données des membres actifs : pour toute la durée de votre adhésion, puis archivées trois (3) ans après la fin de celle-ci.\n— Données des donateurs : dix (10) ans à compter de la transaction, conformément aux obligations comptables et fiscales.\n— Données de contact (formulaires, courriels) : deux (2) ans à compter de notre dernier échange.\n\nAu terme de ces délais, vos données sont supprimées ou anonymisées de manière irréversible.`,
  },
  {
    id: "droits",
    symbol: "ⵔ",
    title: "5. Vos droits",
    content: `Conformément à la réglementation applicable en matière de protection des données personnelles, vous disposez des droits suivants :\n\n— Droit d'accès : obtenir une copie de vos données personnelles que nous détenons.\n— Droit de rectification : corriger toute information inexacte ou incomplète.\n— Droit à l'effacement : demander la suppression de vos données dans les conditions prévues par la loi.\n— Droit d'opposition : vous opposer au traitement de vos données pour des raisons légitimes.\n— Droit à la portabilité : recevoir vos données dans un format structuré et lisible par machine.\n— Droit de retrait du consentement : à tout moment, sans que cela n'affecte la licéité des traitements antérieurs.\n\nPour exercer l'un de ces droits, contactez-nous à l'adresse indiquée ci-dessous.`,
  },
  {
    id: "cookies",
    symbol: "ⵓ",
    title: "6. Cookies et technologies similaires",
    content: `Notre site web peut utiliser des cookies techniques strictement nécessaires à son bon fonctionnement. Ces cookies ne collectent aucune donnée à caractère personnel permettant votre identification.\n\nNous n'utilisons pas de cookies publicitaires ni de traceurs de comportement à des fins commerciales. Des outils d'analyse d'audience anonymisés peuvent être utilisés pour améliorer l'expérience de navigation sur notre site ; dans ce cas, votre consentement sera sollicité préalablement.`,
  },
  {
    id: "securite",
    symbol: "ⵇ",
    title: "7. Sécurité des données",
    content: `L'Association Tamaguit met en œuvre toutes les mesures techniques et organisationnelles appropriées pour protéger vos données personnelles contre tout accès non autorisé, toute divulgation, toute altération ou toute destruction.\n\nCes mesures comprennent le chiffrement des transmissions de données, des accès restreints et sécurisés à nos systèmes, ainsi que des procédures internes de gestion de la confidentialité. En cas de violation de données susceptible d'affecter vos droits, vous en serez informé(e) dans les délais légaux requis.`,
  },
  {
    id: "contact",
    symbol: "ⵉ",
    title: "8. Nous contacter",
    content: `__contact_cards__`,
  },
];

const contactCards = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="28" height="28">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    ),
    color: "#D89A75",
    label: "Adresse de l'association",
    lines: ["99 Av. Habib Bourguiba", "Tunis, Tunisie"],
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="28" height="28">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.37 2 2 0 0 1 3.6 1.18h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.77a16 16 0 0 0 6 6l.96-.96a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21.73 16z" />
      </svg>
    ),
    color: "#D89A75",
    label: "Numéro de téléphone",
    lines: ["+216 71 000 000", "+216 98 000 000"],
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="28" height="28">
        <circle cx="12" cy="12" r="10" />
        <line x1="2" y1="12" x2="22" y2="12" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    ),
    color: "#D89A75",
    label: "Notre Contact en ligne",
    lines: ["contact@tamaguit.org", "tamaguit.org"],
  },
];

export default function PolitiqueConfidentialite() {
  const [visibleSections, setVisibleSections] = useState<Set<number>>(new Set());
  const [activeSection, setActiveSection] = useState<string>("collecte");
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);
  const headerRef = useRef<HTMLElement | null>(null);
  const [headerVisible, setHeaderVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setHeaderVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    sectionRefs.current.forEach((ref, i) => {
      if (!ref) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => new Set([...prev, i]));
            setActiveSection(sections[i].id);
          }
        },
        { threshold: 0.2 }
      );
      obs.observe(ref);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <main className="pc-main">
      {/* Ambient background motif */}
      <div className="pc-bgPattern" aria-hidden="true">
        <svg viewBox="0 0 800 800" xmlns="http://www.w3.org/2000/svg" className="pc-bgSvg">
          <g opacity="0.06">
            {[...Array(8)].map((_, r) =>
              [...Array(8)].map((_, c) => (
                <text
                  key={`${r}-${c}`}
                  x={c * 110 - 20}
                  y={r * 110 + 60}
                  fontSize="72"
                  fontFamily="serif"
                  fill="#8B2500"
                >
                  {["ⵣ", "ⵜ", "ⵎ", "ⵏ", "ⵔ", "ⵓ", "ⵇ", "ⵉ"][(r + c) % 8]}
                </text>
              ))
            )}
          </g>
        </svg>
      </div>

      {/* Header */}
      <header
        ref={(el) => { headerRef.current = el; }}
        className={`pc-header ${headerVisible ? "pc-headerVisible" : ""}`}
      >
        {/* <div className="pc-headerInner">
          <div className="pc-logoBlock">
            <span className="pc-logoSymbol">ⴰ</span>
            <div className="pc-logoText">
              <span className="pc-logoTitle">Tamaguit</span>
              <span className="pc-logoSub">ⵜⴰⵎⴰⴳⵓⵢⵜ</span>
            </div>
          </div>
          <div className="pc-headerDivider" />
          <div className="pc-headerMeta">
            <p className="pc-headerOrg">Association pour les droits, les libertés et la culture des Amazighs</p>
            <p className="pc-headerDoc">Politique de Confidentialité</p>
          </div>
        </div> */}
        <div className="pc-headerBar" />
      </header>

      <div className="pc-layout">
        {/* Sidebar navigation */}
        <nav className="pc-sidebar">
          <p className="pc-sidebarLabel">Navigation</p>
          <ul className="pc-navList">
            {sections.map((s) => (
              <li key={s.id}>
                <button
                  className={`pc-navItem ${activeSection === s.id ? "pc-navItemActive" : ""}`}
                  onClick={() => scrollTo(s.id)}
                >
                  <span className="pc-navSymbol">{s.symbol}</span>
                  <span className="pc-navText">{s.title.replace(/^\d+\.\s/, "")}</span>
                </button>
              </li>
            ))}
          </ul>
          <div className="pc-sidebarDeco">
            <svg viewBox="0 0 60 200" xmlns="http://www.w3.org/2000/svg">
              <line x1="30" y1="0" x2="30" y2="200" stroke="#C4622D" strokeWidth="1" strokeDasharray="4 6" opacity="0.4" />
              {[30, 70, 110, 150, 190].map((y) => (
                <circle key={y} cx="30" cy={y} r="3" fill="#C4622D" opacity="0.4" />
              ))}
            </svg>
          </div>
        </nav>

        {/* Main content */}
        <article className="pc-content">
          {/* Hero banner */}
          <div className={`pc-hero ${headerVisible ? "pc-heroVisible" : ""}`}>
            <div className="pc-heroGeometry" aria-hidden="true">
              <svg viewBox="0 0 500 120" xmlns="http://www.w3.org/2000/svg">
                <polygon points="0,0 500,0 480,120 20,120" fill="#C4622D" opacity="0.08" />
                <polygon points="30,0 470,0 450,80 50,80" fill="#8B2500" opacity="0.06" />
                <line x1="0" y1="60" x2="500" y2="60" stroke="#C4622D" strokeWidth="0.5" opacity="0.3" strokeDasharray="8 12" />
              </svg>
            </div>
            <h1 className="pc-heroTitle">Politique de Confidentialité</h1>
            <p className="pc-heroSubtitle">
              Association Tamaguit — Protection de vos données personnelles
            </p>
            <div className="pc-heroMeta">
              <span className="pc-heroBadge">Dernière mise à jour : Mars 2025</span>
              <span className="pc-heroBadge">Version 1.0</span>
            </div>
          </div>

          {/* Intro paragraph */}
          <div className={`pc-introBlock ${headerVisible ? "pc-introVisible" : ""}`}>
            <span className="pc-introQuote">ⵣ</span>
            <p className="pc-introText">
              L'Association Tamaguit accorde une importance fondamentale à la protection de votre vie privée et de vos données personnelles. La présente politique expose, en toute transparence, la manière dont nous collectons, utilisons, conservons et protégeons vos informations, conformément aux législations en vigueur.
            </p>
          </div>

          {/* Sections */}
          {sections.map((section, i) => (
            <section
              key={section.id}
              id={section.id}
              ref={(el) => { sectionRefs.current[i] = el; }}
              className={`pc-section ${visibleSections.has(i) ? "pc-sectionVisible" : ""}`}
              style={{ transitionDelay: `${i * 0.04}s` }}
            >
              <div className="pc-sectionHeader">
                <span className="pc-sectionSymbol">{section.symbol}</span>
                <h2 className="pc-sectionTitle">{section.title}</h2>
              </div>
              <div className="pc-sectionBody">
                {section.content === "__contact_cards__" ? (
                  <>
                    <p className="pc-sectionPara">
                      Pour toute question relative à cette politique de confidentialité, pour exercer vos droits ou pour signaler un problème, vous pouvez nous joindre via les coordonnées suivantes. Nous nous engageons à répondre dans un délai maximum de trente (30) jours.
                    </p>
                    <div className="pc-contactGrid">
                      {contactCards.map((card, ci) => (
                        <div key={ci} className="pc-contactCard">
                          <div className="pc-contactIconWrap" style={{ color: card.color }}>
                            {card.icon}
                            <span className="pc-contactCheck">
                              <svg viewBox="0 0 10 10" width="10" height="10" fill="none">
                                <circle cx="5" cy="5" r="5" fill="#2ecc71" />
                                <polyline points="2.5,5 4,7 7.5,3" stroke="white" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                              </svg>
                            </span>
                          </div>
                          <p className="pc-contactLabel">{card.label}</p>
                          {card.lines.map((line, li) => (
                            <p key={li} className="pc-contactLine">{line}</p>
                          ))}
                        </div>
                      ))}
                    </div>
                  </>
                ) : (
                  section.content.split("\n\n").map((para, pi) => (
                    <p key={pi} className="pc-sectionPara">
                      {para.split("\n").map((line, li) => (
                        <span key={li}>
                          {line}
                          {li < para.split("\n").length - 1 && <br />}
                        </span>
                      ))}
                    </p>
                  ))
                )}
              </div>
              <div className="pc-sectionDivider" aria-hidden="true" />
            </section>
          ))}

          {/* Footer note */}
          <footer className="pc-pageFooter">
            <div className="pc-footerSymbols" aria-hidden="true">
              {["ⵣ", "ⵜ", "ⵎ", "ⵏ", "ⵔ", "ⵓ", "ⵇ", "ⵉ"].map((s, i) => (
                <span
                  key={i}
                  className="pc-footerSymbol"
                  style={{ animationDelay: `${i * 0.15}s` }}
                >
                  {s}
                </span>
              ))}
            </div>
            <p className="pc-footerText">
              © {new Date().getFullYear()} Association Tamaguit pour les droits, les libertés et la culture des Amazighs. Tous droits réservés.
            </p>
            <p className="pc-footerTagline">ⴰⵎⵓⵏ ⵏ ⵉⵎⴰⵣⵉⵖⵏ — Ensemble pour les Amazighs</p>
          </footer>
        </article>
      </div>
    </main>
  );
}