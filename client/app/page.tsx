"use client";

import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  motion,
  useInView,
  useMotionValue,
  useSpring,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import { ChevronUp, Heart, Sprout, Users } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import AMF from "../images/amazighflag.png";
import TNF from "../images/tunisiaflag.jpg";
import fier from "../images/fier.png";
import photo1 from "../images/galerie1.jpg";
import photo2 from "../images/galerie2.jpg";
import photo3 from "../images/galerie3.png";

// ─── Reusable animation variants ───────────────────────────────────────────

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1], delay },
  }),
};

const fadeLeft = {
  hidden: { opacity: 0, x: -50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

const fadeRight = {
  hidden: { opacity: 0, x: 50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.05 },
  },
};

const cardVariant = {
  hidden: { opacity: 0, y: 32, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};

// ─── Gallery items (defined outside component, no hooks) ───────────────────

const galleryItems = [
  { src: photo1, alt: "Événement social 2023", tag: "Social" },
  { src: photo2, alt: "Préservation du patrimoine", tag: "Patrimoine" },
  { src: photo3, alt: "Préservation du patrimoine", tag: "Patrimoine" },
];

// ─── Animated counter hook ─────────────────────────────────────────────────

function useAnimatedCount(target: number, inView: boolean) {
  const motionVal = useMotionValue(0);
  const springVal = useSpring(motionVal, { stiffness: 60, damping: 18 });
  const rounded = useTransform(springVal, (v) => Math.round(v));
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    const unsub = rounded.on("change", (v) => setDisplay(v));
    return unsub;
  }, [rounded]);

  useEffect(() => {
    if (inView) motionVal.set(target);
  }, [inView, target, motionVal]);

  return display;
}

// ─── ImpactCard ────────────────────────────────────────────────────────────

function ImpactCard({
  ringClass,
  icon,
  rawValue,
  suffix,
  label,
}: {
  ringClass: string;
  icon: ReactNode;
  rawValue: number;
  suffix: string;
  label: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const count = useAnimatedCount(rawValue, inView);

  return (
    <motion.div
      ref={ref}
      className="home-impact__card"
      variants={cardVariant}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      whileHover={{
        y: -10,
        scale: 1.04,
        transition: { type: "spring", stiffness: 300, damping: 20 },
      }}
    >
      <motion.div
        className={`home-impact__ring ${ringClass}`}
        initial={{ rotate: -15, scale: 0.7, opacity: 0 }}
        whileInView={{ rotate: 0, scale: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2, ease: "backOut" }}
      >
        {icon}
      </motion.div>
      <motion.div
        className="home-impact__value"
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.35 }}
      >
        {count}
        {suffix}
      </motion.div>
      <motion.div
        className="home-impact__label"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        {label}
      </motion.div>
    </motion.div>
  );
}

// ─── ValueCard ─────────────────────────────────────────────────────────────

function ValueCard({
  title,
  text,
  href,
}: {
  title: string;
  text: string;
  href: string;
}) {
  return (
    <motion.article
      className="value-card"
      variants={cardVariant}
      whileHover={{
        y: -8,
        boxShadow: "0 24px 48px -12px rgba(0,0,0,0.18)",
        transition: { type: "spring", stiffness: 260, damping: 18 },
      }}
    >
      <h3>{title}</h3>
      <p className="value-card__text">{text}</p>
      <Link href={href} className="value-card__more">
        Read More
      </Link>
    </motion.article>
  );
}

// ─── ActionTeaser ──────────────────────────────────────────────────────────

function ActionTeaser({ tag, title }: { tag: string; title: string }) {
  return (
    <motion.div
      variants={cardVariant}
      whileHover={{
        scale: 1.03,
        transition: { type: "spring", stiffness: 280, damping: 18 },
      }}
    >
      <Link href="/nos-actions" className="home-actions__card">
        <motion.span
          className="home-actions__tag"
          initial={{ opacity: 0, x: -12 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.15 }}
        >
          {tag}
        </motion.span>
        <h3 className="home-actions__card-title">{title}</h3>
      </Link>
    </motion.div>
  );
}

// ─── Page ──────────────────────────────────────────────────────────────────

export default function HomePage() {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);   // ← moved here

  useEffect(() => {
    const onScroll = () => setShowScrollTop(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <main className="page-home">
      {/* 1. HERO */}
      <section className="hero-section">
        <div className="hero-section__bg" aria-hidden />
        <div className="hero-section__overlay" aria-hidden />
        <div className="container hero-section__inner">
          <motion.div
            className="hero-section__content"
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.p
              className="hero-kicker"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <span className="hero-kicker__line" aria-hidden />
              <span>Rejoignez Tamaguit</span>
            </motion.p>
            <h1 className="hero-title">
              {["Préservez", "l'héritage", "amazigh"].map((word, i) => (
                <motion.span
                  key={word}
                  style={{ display: "block" }}
                  initial={{ opacity: 0, y: 28 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 0.4 + i * 0.14,
                    duration: 0.6,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  {word}
                </motion.span>
              ))}
            </h1>
            <motion.p
              className="hero-lead"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9, duration: 0.7 }}
            >
              Nous unissons celles et ceux qui partagent la passion de
              l&apos;identité amazighe et les équipons pour défendre les droits
              humains et combattre toute forme de discrimination.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* 2. ABOUT */}
      <section className="section-padding home-about">
        <div className="container home-about__grid">
          <motion.div
            className="about-collage"
            variants={fadeLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
          >
            <div className="about-collage__yaz" aria-hidden>
              <motion.span
                className="about-collage__yaz-symbol"
                initial={{ opacity: 0, rotate: -20, scale: 0.6 }}
                whileInView={{ opacity: 1, rotate: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2, ease: "backOut" }}
              >
                ⵣ
              </motion.span>
            </div>
            <div className="about-collage__tn">
              <Image
                src={TNF}
                alt="Drapeau tunisien"
                width={320}
                height={320}
                className="about-collage__img"
              />
            </div>
            <div className="about-collage__flag">
              <Image
                src={AMF}
                alt="Drapeau amazigh"
                fill
                className="about-collage__img about-collage__img--cover"
                sizes="(max-width: 1024px) 90vw, 520px"
              />
            </div>
          </motion.div>

          <motion.div
            className="home-about__text"
            variants={fadeRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
          >
            <p className="home-about__label">
              <span className="home-about__label-line" aria-hidden />
              QUI SOMMES NOUS ?
            </p>
            <h2 className="home-about__heading">
              Association Tamaguit pour les droits, les libertés et la culture
              des Amazighs.
            </h2>
            <motion.p
              className="home-about__years"
              initial={{ opacity: 0, scale: 0.85 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3, ease: "backOut" }}
            >
              <span className="home-about__years-muted">Existe depuis</span>{" "}
              <span className="home-about__years-strong">8+ ANS</span>
            </motion.p>
            <p className="home-about__body">
              L&apos;Association Tamaguit est une organisation de la société
              civile œuvrant pour la promotion et la protection des droits
              humains, des libertés fondamentales et de la culture amazighe en
              Tunisie. Elle s&apos;engage à préserver et valoriser
              l&apos;identité, la langue et le patrimoine des Amazighs, tout en
              contribuant au renforcement de la diversité culturelle, de la
              citoyenneté et de l&apos;égalité.
            </p>
            <motion.div
              className="home-about__actions"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.45 }}
            >
              <Link href="/a-propos" className="btn-magenta">
                SAVOIR PLUS
              </Link>
              <Link href="/a-propos" className="btn-outline-muted">
                NOS VALEURS
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 3. IMPACT */}
      <section className="home-impact section-padding">
        <div className="container">
          <motion.h2
            className="home-impact__title"
            variants={fadeUp}
            custom={0}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
          >
            Notre Impact en Chiffres
          </motion.h2>
          <motion.p
            className="home-impact__intro"
            variants={fadeUp}
            custom={0.1}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
          >
            Grâce à l&apos;engagement de notre communauté et à nos actions, nous
            contribuons chaque jour à préserver l&apos;identité amazighe, à
            défendre les droits humains et à lutter contre toutes les formes de
            discrimination. Découvrez l&apos;impact que nous avons accompli
            ensemble.
          </motion.p>
          <motion.div
            className="home-impact__grid"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
          >
            <ImpactCard
              ringClass="home-impact__ring--magenta"
              icon={<Heart className="home-impact__icon" strokeWidth={1.5} />}
              rawValue={10000}
              suffix="+"
              label="Abonnées"
            />
            <ImpactCard
              ringClass="home-impact__ring--coral"
              icon={<Sprout className="home-impact__icon" strokeWidth={1.5} />}
              rawValue={50}
              suffix="+"
              label="Bénévole"
            />
          </motion.div>
        </div>
      </section>

      {/* 4. VALUES */}
      <section className="section-padding home-values">
        <div className="container">
          <motion.h2
            className="home-values__title"
            variants={fadeUp}
            custom={0}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
          >
            Nos Valeurs
          </motion.h2>
          <motion.p
            className="home-values__intro"
            variants={fadeUp}
            custom={0.1}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
          >
            Chez Tamaguit, nous célébrons l&apos;héritage amazigh tunisien en
            promouvant la culture, l&apos;égalité et le dialogue pour bâtir un
            avenir harmonieux et inclusif.
          </motion.p>
          <motion.div
            className="values-grid"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
          >
            <ValueCard
              title="Transparence et responsabilité"
              text="Nous agissons avec transparence et responsabilité dans la gestion de nos activités et ressources. La confiance est la base de toute organisation ou mouvement communautaire. C'est pourquoi nous nous engageons à travailler avec"
              href="/a-propos"
            />
            <ValueCard
              title="Identité culturelle"
              text="Nous croyons en la richesse et la diversité de la culture amazighe et nous nous engageons à la préserver et à la promouvoir. L'héritage amazigh est une part intégrante du patrimoine tunisien, avec"
              href="/a-propos"
            />
            <ValueCard
              title="Justice et égalité"
              text="Tous les êtres humains sont égaux en dignité et en droits, sans distinction d'origine ethnique, de langue, de religion ou de tout autre statut. La justice et l'égalité constituent les piliers fondamentaux de"
              href="/a-propos"
            />
            <ValueCard
              title="Dialogue et tolérance"
              text="Nous favorisons le dialogue interculturel et la compréhension mutuelle entre les différentes communautés. La Tunisie est un pays riche de sa diversité, où plusieurs cultures, langues et traditions se croisent. Le dialogue est"
              href="/a-propos"
            />
            <ValueCard
              title="Engagement communautaire"
              text="Nous encourageons la participation active des membres de la communauté dans nos initiatives et actions. La culture amazighe ne peut perdurer sans l'implication des personnes qui la portent. C'est pourquoi nous incitons chacun"
              href="/a-propos"
            />
            <ValueCard
              title="Solidarité et entraide"
              text="Nous croyons en la force de la solidarité pour préserver et promouvoir l'identité amazighe. En soutenant nos communautés, en valorisant nos traditions et en travaillant ensemble, nous renforçons notre culture et défendons nos"
              href="/a-propos"
            />
          </motion.div>
        </div>
      </section>

      {/* 5. NOS ACTIONS */}
      <section className="section-padding home-actions">
        <div className="container">
          <div className="home-actions__header">
            <motion.div
              variants={fadeUp}
              custom={0}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
            >
              <h2 className="home-actions__title">Nos Actions</h2>
              <p className="home-actions__desc">
                L&apos;association Tamaguit mène diverses actions alignées sur
                ses objectifs principaux, qui incluent la promotion des droits
                de l&apos;homme, la préservation de la culture amazighe et la
                lutte contre les discriminations. Voici un aperçu des actions
                entreprises
              </p>
            </motion.div>
            <div className="home-actions__arrows" aria-hidden />
          </div>
          <motion.div
            className="home-actions__grid"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
          >
            <ActionTeaser tag="SOCIAL" title="Représentation internationale" />
            <ActionTeaser tag="MEDICAL" title="Soutien pendant la pandémie de COVID-19" />
            <ActionTeaser tag="PATRIMOINE" title="Préservation du patrimoine amazigh" />
            <ActionTeaser tag="EDUCATION SENSIBILISATION" title="EDUCATION ET SENSIBILISATION" />
            <ActionTeaser tag="SOCIAL" title="Promotion de l'économie sociale et solidaire" />
            <ActionTeaser tag="NATURE" title="Campagnes de plaidoyer" />
          </motion.div>
        </div>
      </section>

      {/* 6. JOIN */}
      <section className="section-padding container">
        <motion.div
          className="join-split"
          variants={fadeUp}
          custom={0}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
        >
          <div className="join-content">
            <motion.span
              className="join-badge"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: 0.15, ease: "backOut" }}
            >
              Rejoignez-nous
            </motion.span>
            <motion.h2
              className="join-heading"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: 0.25 }}
            >
              Devenez un fier bénévole
            </motion.h2>
            <p className="join-body">
              Notre équipe a un besoin essentiel de bénévoles dévoués, prêts à
              consacrer leur temps et leur énergie pour soutenir notre mission.
              Si vous êtes jeune, dynamique et animé par le désir d&apos;aider
              et d&apos;apporter un changement positif, nous serions ravis de
              vous accueillir parmi nous. Chaque action compte : que ce soit
              pour promouvoir la culture amazighe, organiser des événements,
              sensibiliser aux droits de notre communauté ou soutenir nos divers
              projets, votre engagement sera une pierre précieuse à
              l&apos;édifice. L&apos;implication des bénévoles est au cœur de
              notre réussite, et ensemble, nous pouvons préserver notre
              patrimoine, tout en construisant un avenir plus inclusif et
              solidaire.
            </p>
            <motion.div
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              style={{ display: "inline-block" }}
            >
              <Link href="/inscrire" className="btn-primary join-cta">
                <Users size={18} /> POSTULER ICI
              </Link>
            </motion.div>
          </div>
          <motion.div
            className="join-img-wrapper"
            initial={{ opacity: 0, scale: 0.92, x: 40 }}
            whileInView={{ opacity: 1, scale: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <Image
              src={fier}
              alt="Équipe Tamaguit"
              width={fier.width}
              height={fier.height}
              className="join-img"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </motion.div>
        </motion.div>
      </section>

      {/* 7. GALERIE PHOTOS */}
      <section className="section-padding home-gallery">
        <div className="container">
          <motion.div
            className="home-gallery__header"
            variants={fadeUp}
            custom={0}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
          >
            <p className="home-about__label">
              <span className="home-about__label-line" aria-hidden />
              NOS MOMENTS
            </p>
            <h2 className="home-gallery__title">
              <em>Galerie</em> Photos
            </h2>
          </motion.div>

          <motion.div
            className="home-gallery__grid"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
          >
            {galleryItems.map((item, i) => (
              <motion.div
                key={i}
                className="gallery-item"
                variants={cardVariant}
                whileHover={{ scale: 1.03, transition: { type: "spring", stiffness: 280, damping: 18 } }}
                onClick={() => setLightboxIndex(i)}
              >
                <div className="gallery-item__img-wrap">
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    className="gallery-item__img"
                    sizes="(max-width: 768px) 50vw, 33vw"
                  />
                </div>
                {/* overlay handled via CSS :hover — no whileHover needed here */}
                <div className="gallery-item__overlay">
                  <span className="gallery-item__tag">{item.tag}</span>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            className="home-gallery__cta"
            variants={fadeUp}
            custom={0.2}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
          >
            <Link href="/galerie" className="btn-outline-muted">
              VOIR TOUTES LES PHOTOS
            </Link>
          </motion.div>
        </div>

        {/* Lightbox */}
        <AnimatePresence>
          {lightboxIndex !== null && (
            <motion.div
              className="gallery-lightbox"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setLightboxIndex(null)}
            >
              <motion.div
                className="gallery-lightbox__inner"
                initial={{ scale: 0.88, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.88, opacity: 0 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                onClick={(e) => e.stopPropagation()}
              >
                <Image
                  src={galleryItems[lightboxIndex].src}
                  alt={galleryItems[lightboxIndex].alt}
                  width={900}
                  height={600}
                  className="gallery-lightbox__img"
                />
                <button
                  className="gallery-lightbox__close"
                  onClick={() => setLightboxIndex(null)}
                  aria-label="Fermer"
                >
                  ✕
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* Scroll-to-top */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            type="button"
            className="scroll-top"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            aria-label="Retour en haut"
            initial={{ opacity: 0, scale: 0.6, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.6, y: 20 }}
            transition={{ duration: 0.3, ease: "backOut" }}
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.9 }}
          >
            <ChevronUp size={22} strokeWidth={2.5} />
          </motion.button>
        )}
      </AnimatePresence>
    </main>
  );
}