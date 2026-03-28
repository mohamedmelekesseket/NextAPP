import Link from "next/link";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div>
          <p className="footer-brand">Mon asso</p>
          <p className="footer-tagline">
            Association — liens utiles ci-dessous.
          </p>
        </div>
        <nav className="footer-nav">
          <Link href="/contact" className="footer-link">
            Contact
          </Link>
          <Link href="/faq" className="footer-link">
            FAQ
          </Link>
          <Link href="/subscribe" className="footer-link">
            Newsletter
          </Link>
        </nav>
      </div>
      <p className="footer-copy">
        © {new Date().getFullYear()} — Tous droits réservés.
      </p>
    </footer>
  );
}
