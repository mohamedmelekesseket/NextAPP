import type { ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import { Users, Heart, ArrowRight } from "lucide-react";
import AMF from "../images/amazighflag.png";
import TNF from "../images/tunisiaflag.jpg";

export default function HomePage() {
  return (
    <>
      <section className="hero">
        <div className="container">
          <div className="hero-content animate-home-fade-in-up">
            <span className="hero-tag">— Rejoignez Tamaguit</span>
            <h1>Préservez l&apos;héritage amazigh</h1>
            <p className="hero-lead">
              Nous unissons celles et ceux qui partagent la passion de
              l&apos;identité amazighe et les équipons pour défendre les droits
              humains.
            </p>
            <Link
              href="/join"
              className="btn-join"
              style={{ width: "fit-content", padding: "15px 40px" }}
            >
              Devenir Bénévole
            </Link>
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container about-grid">
          <div className="image-stack animate-home-fade-in-left">
            <Image
              src={TNF}
              alt="Culture"
              className="img-large"
              width={640}
              height={350}
              sizes="(max-width: 900px) 90vw, 40vw"
            />
            <Image
              src={AMF}
              alt="Tunisie"
              className="img-small"
              width={480}
              height={250}
              sizes="(max-width: 900px) 70vw, 35vw"
            />
          </div>

          <div className="animate-home-fade-in-up animation-delay-sm">
            <span className="hero-tag" style={{ color: "var(--primary-teal)" }}>
              Qui sommes-nous ?
            </span>
            <h2 className="title-large">
              Association Tamaguit pour les droits, les libertés et la culture
              des Amazighs.
            </h2>
            <p className="text-body-muted">
              L&apos;Association Tamaguit est une organisation de la société
              civile ouvrant pour la promotion et la protection des droits humains
              et de la culture amazighe en Tunisie.
            </p>
            <div className="row-buttons">
              <Link href="/about" className="btn-join">
                Savoir Plus
              </Link>
              <Link href="/values" className="btn-outline">
                Nos Valeurs <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section
        className="section-padding"
        style={{ backgroundColor: "#f9f9f9" }}
      >
        <div className="container text-center">
          <div className="animate-home-fade-in-up animation-delay-md">
            <h2 className="title-impact">Notre Impact en Chiffres</h2>
            <p className="text-caption-muted">
              Grâce à l&apos;engagement de notre communauté, nous contribuons
              chaque jour à préserver l&apos;identité.
            </p>
          </div>

          <div className="stats-grid">
            <StatCard
              number="10K+"
              label="Abonnées"
              icon={<Heart color="#e91e63" />}
            />
            <StatCard
              number="8+"
              label="Ans d'expérience"
              icon={<Users color="var(--primary-teal)" />}
            />
            <StatCard
              number="50+"
              label="Bénévoles"
              icon={<Users color="orange" />}
            />
          </div>
        </div>
      </section>
    </>
  );
}

function StatCard({
  number,
  label,
  icon,
}: {
  number: string;
  label: string;
  icon: ReactNode;
}) {
  return (
    <div className="stat-card">
      <div className="circle-progress">{icon}</div>
      <div className="stat-number">{number}</div>
      <div className="stat-label">{label}</div>
    </div>
  );
}
