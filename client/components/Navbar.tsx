"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import logo from "../images/TAMAGUIT.png";
import { Heart } from "lucide-react";

const links = [
  { href: "/", label: "Accueil" },
  { href: "/a-propos", label: "À propos" },
  { href: "/nos-actions", label: "Nos actions" },
  { href: "/nos-events", label: "Nos événements" },
  { href: "/faq", label: "FAQ" },
  { href: "/benevole", label: "Bénévole" },
  { href: "/contact", label: "Contact" },
] as const;

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="navbar-container">
      <div className="navbar-content">
        <Link href="/" className="nav-logo nav-logo-text">
          <Image src={logo} alt="Tamaguit" width={160} height={80} priority />
        </Link>

        <nav className="nav-links-desktop" aria-label="Navigation principale">
          {links.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="nav-link"
              aria-current={pathname === href ? "page" : undefined}
            >
              {label}
            </Link>
          ))}
        </nav>

        <div className="nav-actions">
          <Link href="/subscribe" className="btn-join">
            <Heart size={18} />
            Rejoignez-nous
          </Link>
        </div>

        <button
          type="button"
          className="menu-toggle"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((v) => !v)}
        >
          Menu
        </button>
      </div>

      {open ? (
        <nav
          id="mobile-nav"
          className="mobile-menu"
          aria-label="Navigation mobile"
        >
          {links.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="mobile-link"
              onClick={() => setOpen(false)}
            >
              {label}
            </Link>
          ))}
          <Link
            href="/subscribe"
            className="mobile-link"
            onClick={() => setOpen(false)}
          >
            S&apos;inscrire
          </Link>
        </nav>
      ) : null}
    </header>
  );
}
