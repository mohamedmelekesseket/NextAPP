"use client";

import Image from "next/image";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";
import photo1 from '../../images/galerie1.jpg';
import photo2 from "../../images/galerie2.jpg";
import photo3 from "../../images/galerie3.png";
import photo4 from "../../images/galerie4.jpg";
import photo5 from "../../images/galerie5.jpg";
import photo6 from "../../images/galerie6.jpg";
import photo7 from "../../images/galerie7.jpg";
import photo8 from "../../images/galerie8.jpg";
import photo9 from "../../images/galerie9.jpg";

// ─── Types ────────────────────────────────────────────────────────────────────

type GalleryItem = {
  src: string;
  alt: string;
  tag: string;
  year: string;
  span?: "wide" | "tall" | "normal";
};

// ─── Data ────────────────────────────────────────────────────────────────────

const galleryItems: GalleryItem[] = [
  { src: photo1, alt: "Événement social 2023",           tag: "Social",     year: "2023", span: "wide" },
  { src: photo2, alt: "Préservation du patrimoine",       tag: "Patrimoine", year: "2023", span: "tall" },
  { src: photo3, alt: "Conférence internationale",        tag: "Éducation",  year: "2022"               },
  { src: photo4, alt: "Célébration Yennayer 2970",        tag: "Culture",    year: "2020"               },
  { src: photo5, alt: "Atelier de formation",             tag: "Formation",  year: "2023", span: "wide" },
  { src: photo6, alt: "Campagne nature",                  tag: "Nature",     year: "2022"               },
  { src: photo7, alt: "Soutien communautaire",            tag: "Social",     year: "2021", span: "tall" },
  { src: photo8, alt: "Festival amazigh",                 tag: "Culture",    year: "2023"               },
  { src: photo9, alt: "Plaidoyer et droits",              tag: "Droits",     year: "2022"               },
//   { src: photo, alt: "Solidarité COVID-19",              tag: "Medical",    year: "2020", span: "wide" },
//   { src: photo, alt: "Réunion des bénévoles",            tag: "Social",     year: "2023"               },
//   { src: photo, alt: "Exposition culturelle",            tag: "Culture",    year: "2022"               },
];

const ALL_TAGS = ["Tout", "Social", "Patrimoine", "Éducation", "Culture", "Formation", "Nature", "Droits", "Medical"];

// ─── Animation variants ───────────────────────────────────────────────────────

const itemVariant = {
  hidden:  { opacity: 0, scale: 0.93, y: 28 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
  exit:    { opacity: 0, scale: 0.9, y: -12, transition: { duration: 0.28 } },
};

// ─── GalleryCard ─────────────────────────────────────────────────────────────

function GalleryCard({
  item,
  onClick,
}: {
  item: GalleryItem;
  index: number;
  onClick: () => void;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.article
      className={`g-card g-card--${item.span ?? "normal"}`}
      variants={itemVariant}
      initial="hidden"
      animate="visible"
      exit="exit"
      layout
      onClick={onClick}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      whileHover={{ y: -8, transition: { type: "spring", stiffness: 280, damping: 20 } }}
    >
      <div className="g-card__media">
        <Image
          src={item.src}
          alt={item.alt}
          fill
          className="g-card__img"
          sizes="(max-width: 768px) 50vw, 33vw"
        />

        {/* Hover overlay */}
        <motion.div
          className="g-card__overlay"
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            className="g-card__zoom"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: hovered ? 1 : 0.5, opacity: hovered ? 1 : 0 }}
            transition={{ duration: 0.3, ease: "backOut" }}
          >
            <ZoomIn size={24} strokeWidth={1.5} />
          </motion.div>
        </motion.div>

        {/* Tag badge */}
        <motion.span
          className="g-card__badge"
          animate={{ y: hovered ? 0 : 6, opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        >
          {item.tag}
        </motion.span>
      </div>

      {/* Caption always visible */}
      <div className="g-card__caption">
        <p className="g-card__alt">{item.alt}</p>
        <span className="g-card__year">{item.year}</span>
      </div>
    </motion.article>
  );
}

// ─── Lightbox ────────────────────────────────────────────────────────────────

function Lightbox({
  items,
  index,
  onClose,
  onPrev,
  onNext,
  onGoTo,
}: {
  items: GalleryItem[];
  index: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  onGoTo: (i: number) => void; // ✅ FIX: proper thumbnail navigation prop
}) {
  const item = items[index];

  return (
    <motion.div
      className="lb"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      onClick={onClose}
    >
      {/* Counter */}
      <motion.div
        className="lb__counter"
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
      >
        {index + 1} / {items.length}
      </motion.div>

      {/* Close */}
      <motion.button
        className="lb__close"
        onClick={onClose}
        aria-label="Fermer"
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1, ease: "backOut" }}
        whileTap={{ scale: 0.9 }}
      >
        <X size={20} strokeWidth={2} />
      </motion.button>

      {/* Main image */}
      <motion.div
        className="lb__inner"
        key={index}
        initial={{ opacity: 0, scale: 0.86, y: 24 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.86 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="lb__img-wrap">
          <Image
            src={item.src}
            alt={item.alt}
            fill
            className="lb__img"
            sizes="90vw"
          />
        </div>
        <div className="lb__meta">
          <span className="lb__tag">{item.tag}</span>
          <p className="lb__alt">{item.alt}</p>
          <span className="lb__year">{item.year}</span>
        </div>
      </motion.div>

      {/* Prev */}
      <motion.button
        className="lb__nav lb__nav--prev"
        onClick={(e) => { e.stopPropagation(); onPrev(); }}
        aria-label="Photo précédente"
        whileHover={{ x: -4, scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <ChevronLeft size={30} strokeWidth={1.5} />
      </motion.button>

      {/* Next */}
      <motion.button
        className="lb__nav lb__nav--next"
        onClick={(e) => { e.stopPropagation(); onNext(); }}
        aria-label="Photo suivante"
        whileHover={{ x: 4, scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <ChevronRight size={30} strokeWidth={1.5} />
      </motion.button>

      {/* Thumbnail strip */}
      <motion.div
        className="lb__strip"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        onClick={(e) => e.stopPropagation()}
      >
        {items.map((it, i) => (
          <motion.button
            key={it.alt}
            className={`lb__thumb${i === index ? " lb__thumb--active" : ""}`} // ✅ FIX 1: was `photo` (undefined variable)
            onClick={() => onGoTo(i)} // ✅ FIX 2: actually navigates to the clicked thumbnail
            whileHover={{ scale: 1.08 }}
          >
            <Image src={it.src} alt={it.alt} fill className="lb__thumb-img" sizes="80px" />
          </motion.button>
        ))}
      </motion.div>
    </motion.div>
  );
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default function GaleriePage() {
  const [activeTag, setActiveTag] = useState("Tout");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const heroRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY       = useTransform(scrollYProgress, [0, 1], ["0%", "28%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  const filtered = activeTag === "Tout"
    ? galleryItems
    : galleryItems.filter((i) => i.tag === activeTag);

  const openLightbox = (filteredIndex: number) => {
    const item = filtered[filteredIndex];
    const trueIndex = galleryItems.findIndex((g) => g.alt === item.alt);
    setLightboxIndex(trueIndex);
  };

  const closeLightbox = () => setLightboxIndex(null);
  const prevPhoto = () =>
    setLightboxIndex((i) => (i !== null ? (i - 1 + galleryItems.length) % galleryItems.length : 0));
  const nextPhoto = () =>
    setLightboxIndex((i) => (i !== null ? (i + 1) % galleryItems.length : 0));
  const goToPhoto = (i: number) => setLightboxIndex(i); // ✅ FIX: direct navigation handler

  return (
    <main className="page-galerie">

      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <section className="g-hero" ref={heroRef}>
        <div className="events-hero-triangle" />

        <motion.div className="g-hero__bg" style={{ y: heroY }} aria-hidden />
        <div className="g-hero__overlay" aria-hidden />

        <motion.span
          className="g-hero__yaz"
          initial={{ opacity: 0, scale: 0.4, rotate: -40 }}
          animate={{ opacity: 0.07, scale: 1, rotate: 0 }}
          transition={{ duration: 1.4, ease: "backOut" }}
          aria-hidden
        >ⵣ</motion.span>

        <motion.div className="g-hero__content" style={{ opacity: heroOpacity }}>
          <motion.p
            className="g-hero__kicker"
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <span className="g-hero__kicker-line" aria-hidden />
            NOS MOMENTS
          </motion.p>

          {/* <h1 className="g-hero__title">
            {["Galerie", "Photos"].map((word, i) => (
              <motion.span
                key={word}
                className={i === 0 ? "g-hero__title--italic" : ""} // ✅ FIX 1: was `photo` (undefined variable)
                style={{ display: "block" }}
                initial={{ opacity: 0, y: 36 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + i * 0.15, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
              >
                {word}
              </motion.span>
            ))}
          </h1> */}

          <motion.p
            className="g-hero__sub"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.85, duration: 0.7 }}
          >
            Découvrez les moments forts de l&apos;Association Tamaguit — actions,
            événements culturels et rencontres communautaires.
          </motion.p>

          <motion.div
            className="g-hero__stats"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.05, duration: 0.6 }}
          >
            {[
              { num: `${galleryItems.length}+`, label: "Photos" },
              { num: "8",                       label: "Catégories" },
              { num: "8+",                      label: "Années" },
            ].map((s, i) => (
              <div key={s.label} className="g-hero__stats-group">
                {i > 0 && <div className="g-hero__stats-divider" aria-hidden />}
                <div className="g-hero__stat">
                  <span className="g-hero__stat-num">{s.num}</span>
                  <span className="g-hero__stat-label">{s.label}</span>
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          className="g-hero__scroll-hint"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
        >
          <motion.div
            className="g-hero__scroll-dot"
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
          />
        </motion.div>
      </section>

      {/* ── FILTER ────────────────────────────────────────────────────────── */}
      <section className="g-filter">
        <div className="container">
          <motion.div
            className="g-filter__tabs"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          >
            {ALL_TAGS.map((tag) => (
              <motion.button
                key={tag}
                className={`g-filter__tab${activeTag === tag ? " g-filter__tab--active" : ""}`} // ✅ FIX 1: was `photo`
                onClick={() => setActiveTag(tag)}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                {tag}
                {activeTag === tag && (
                  <motion.span
                    className="g-filter__underline"
                    layoutId="underline"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </motion.button>
            ))}
          </motion.div>

          <motion.p
            className="g-filter__count"
            key={activeTag}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.35 }}
          >
            {filtered.length} photo{filtered.length > 1 ? "s" : ""} {/* ✅ FIX 1: was `photo` */}
          </motion.p>
        </div>
      </section>

      {/* ── GRID ──────────────────────────────────────────────────────────── */}
      <section className="g-section section-padding">
        <div className="container">
          <motion.div className="g-masonry" layout>
            <AnimatePresence mode="popLayout">
              {filtered.map((item, i) => (
                <GalleryCard
                  key={item.alt}
                  item={item}
                  index={i}
                  onClick={() => openLightbox(i)}
                />
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* ── LIGHTBOX ──────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <Lightbox
            items={galleryItems}
            index={lightboxIndex}
            onClose={closeLightbox}
            onPrev={prevPhoto}
            onNext={nextPhoto}
            onGoTo={goToPhoto} // ✅ FIX: pass the direct navigation handler
          />
        )}
      </AnimatePresence>
    </main>
  );
}