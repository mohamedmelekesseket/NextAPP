import Link from "next/link";
import { Mail, Phone } from "lucide-react";
import FooterNewsletter from "./FooterNewsletter";

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
    >
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

const legalLinks = [
  { href: "/politique-confidentialite", label: "Politique de confidentialité" },
  { href: "/conditions-generales", label: "Conditions générales" },
] as const;

const usefulLinks = [
  { href: "/a-propos", label: "À propos" },
  { href: "/nos-actions", label: "Nos actions" },
  { href: "/nos-events", label: "Nos Events" },
  { href: "/faq", label: "Questions fréquentes" },
  { href: "/inscrire", label: "Devenir bénévole" },
  { href: "/contact", label: "Contact-nous" },
] as const;

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="footer-container">
        {/* Top row: logo + contact */}
        <div className="footer-top">
          <div className="footer-brand-block">
            <div className="footer-brand-text">
            <div className="footer-logo-mark" aria-hidden>
              ⵣ
            </div>
              {/* <span className="footer-logo-name">TAMAGUIT</span>
              <p className="footer-logo-tifinagh">ⵜⴰⵎⴰⴳⵓⵉⵜ</p> */}
              <div className="footer-logo-arc" aria-hidden />
            </div>
          </div>

          <div className="footer-contact-row">
            <div className="footer-contact-item">
              <Phone className="footer-contact-icon footer-contact-icon--phone" />
              <div>
                <p className="footer-contact-label">Appelez-nous</p>
                <a href="tel:+21671000000" className="footer-contact-value">
                  +216 71 000 000
                </a>
              </div>
            </div>
            <div className="footer-contact-item">
              <Mail className="footer-contact-icon footer-contact-icon--mail" />
              <div>
                <p className="footer-contact-label">E-mail</p>
                <a
                  href="mailto:info@tamaguit.org"
                  className="footer-contact-value"
                >
                  info@tamaguit.org
                </a>
              </div>
            </div>
            <div className="footer-contact-item">
              <FacebookIcon className="footer-contact-icon footer-contact-icon--social" />
              <div>
                <p className="footer-contact-label">Réseaux sociaux</p>
                <a
                  href="https://www.facebook.com/tamaguit"
                  className="footer-contact-value"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  facebook.com/tamaguit
                </a>
              </div>
            </div>
          </div>
        </div>

        <hr className="footer-rule" />

        {/* Three columns */}
        <div className="footer-columns">
          <div className="footer-col">
            <h3 className="footer-col-title">Mentions Légales</h3>
            <ul className="footer-link-list">
              {legalLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className="footer-bulleted-link">
                    <span className="footer-bullet" aria-hidden />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-col">
            <h3 className="footer-col-title">Liens utiles</h3>
            <ul className="footer-link-list">
              {usefulLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className="footer-bulleted-link">
                    <span className="footer-bullet" aria-hidden />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-col footer-col--news">
            <h3 className="footer-col-title">Recevoir les mises à jour</h3>
            <p className="footer-news-desc">
              Restez informé des dernières actualités de notre association
            </p>
            <FooterNewsletter />
          </div>
        </div>

        <p className="footer-copy">
          Copyright © {year}, TAMAGUIT. Developed by{" "}
          <span className="footer-copy-accent">TAMAGUIT</span>
        </p>
      </div>
    </footer>
  );
}
