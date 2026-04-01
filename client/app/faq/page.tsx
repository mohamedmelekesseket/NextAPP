"use client";
import { useState } from "react";

const faqLeft = [
  {
    question: "Pourquoi avons-nous créé l'association Tamaguit ?",
    answer:
      "L'association Tamaguit a été créée pour préserver et promouvoir l'identité culturelle amazighe en Tunisie, sensibiliser à ses richesses et défendre les droits de la communauté amazighe face aux défis de reconnaissance et de transmission.",
  },
  {
    question: "Quelle est notre mission ?",
    answer:
      "Notre mission est de protéger et valoriser la culture amazighe, de défendre les droits humains et de lutter contre toutes les formes de discrimination, en favorisant le dialogue et l'inclusion.",
  },
  {
    question: "Tamaguit est-elle une organisation politique ?",
    answer:
      "Non, Tamaguit est une organisation culturelle et sociale. Nous travaillons pour la préservation de l'identité amazighe et la défense des droits humains, sans affiliation politique.",
  },
  {
    question: "Qui sont les Amazighs en Tunisie ?",
    answer:
      "Les Amazighs sont les habitants autochtones de l'Afrique du Nord, y compris la Tunisie. Bien que leur présence soit ancienne, leur culture et leur langue ont été marginalisées. Aujourd'hui, ils luttent pour préserver leur identité.",
  },
  {
    question: "Quels types d'actions mène Tamaguit ?",
    answer:
      "Tamaguit mène des actions de sensibilisation, d'éducation et de mobilisation culturelle. Nous organisons des ateliers, des conférences et des campagnes pour défendre et promouvoir l'identité amazighe en Tunisie.",
  },
  {
    question: "Comment puis-je soutenir Tamaguit ?",
    answer:
      "Vous pouvez nous aider en rejoignant notre association, en participant à nos événements, en partageant notre message ou en faisant un don pour soutenir nos projets et initiatives.",
  },
];

const faqRight = [
  {
    question: "Puis-je devenir membre de Tamaguit ?",
    answer:
      "Oui, toute personne partageant nos valeurs et souhaitant contribuer à notre cause est la bienvenue. Vous pouvez nous rejoindre en tant que membre ou bénévole selon votre disponibilité et vos compétences.",
  },
  {
    question: "Comment l'association Tamaguit finance-t-elle ses activités ?",
    answer:
      "Nos actions sont financées par des dons, des partenariats et des événements de collecte de fonds. Chaque contribution nous aide à poursuivre notre mission de préservation et de promotion de la culture amazighe.",
  },
  {
    question: "Organisez-vous des événements pour promouvoir la culture amazighe ?",
    answer:
      "Oui, nous organisons des festivals, des conférences, des expositions et des ateliers éducatifs pour faire découvrir la richesse du patrimoine amazigh en Tunisie.",
  },
  {
    question: "L'amazigh est-il enseigné en Tunisie ?",
    answer:
      "Actuellement, la langue amazighe n'est pas intégrée au système éducatif officiel en Tunisie. Cependant, nous travaillons pour sa reconnaissance et proposons des ateliers d'apprentissage pour préserver son usage.",
  },
  {
    question: "Quels sont les défis majeurs pour la reconnaissance de l'identité amazighe en Tunisie ?",
    answer:
      "Les principaux défis incluent le manque de reconnaissance officielle, l'absence d'enseignement de la langue, ainsi que la nécessité de préserver et de transmettre les traditions face à la modernisation et à l'oubli.",
  },
  {
    question: "Comment puis-je suivre l'actualité de Tamaguit ?",
    answer:
      "Vous pouvez nous suivre sur nos réseaux sociaux, vous inscrire à notre newsletter ou visiter notre site web pour rester informé de nos actions et événements à venir.",
  },
];

function FaqItem({
  question,
  answer,
  isOpen,
  onClick,
}: {
  question: string;
  answer: string;
  isOpen: boolean;
  onClick: () => void;
}) {
  return (
    <div className={`faq-item${isOpen ? " faq-item--open" : ""}`} onClick={onClick}>
      <div className="faq-question">
        <span className="faq-question-text">{question}</span>
        <span className="faq-icon">{isOpen ? "−" : "+"}</span>
      </div>
      <div className="faq-answer-wrapper">
        <p className="faq-answer">{answer}</p>
      </div>
    </div>
  );
}

export default function FaqPage() {
  const [openLeft, setOpenLeft] = useState<number | null>(0);
  const [openRight, setOpenRight] = useState<number | null>(0);

  return (
    <main className="faq-page">
      <section className="faq-hero">
        <div className="faq-hero-inner">
          <h1 className="faq-hero-title">Faq</h1>
          <p className="faq-hero-breadcrumb">TAMAGUIT &gt; FAQ</p>
        </div>
      </section>

      <div className="faq-content">
      <div className="faq-grid">
        <div className="faq-column">
          {faqLeft.map((item, i) => (
            <FaqItem
              key={i}
              question={item.question}
              answer={item.answer}
              isOpen={openLeft === i}
              onClick={() => setOpenLeft(openLeft === i ? null : i)}
            />
          ))}
        </div>
        <div className="faq-column">
          {faqRight.map((item, i) => (
            <FaqItem
              key={i}
              question={item.question}
              answer={item.answer}
              isOpen={openRight === i}
              onClick={() => setOpenRight(openRight === i ? null : i)}
            />
          ))}
        </div>
      </div>
      </div>
    </main>
  );
}