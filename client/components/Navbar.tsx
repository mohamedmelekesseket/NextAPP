"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import logo from "../images/TAMAGUIT.png";
import { Heart } from "lucide-react";

const links = [
  { href: "/", label: "Accueil" },
  { href: "/a-propos", label: "À propos" },
  { href: "/nos-actions", label: "Nos actions" },
  { href: "/nos-events", label: "Nos événements" },
  { href: "/contact", label: "Contact" },
] as const;

function isActiveNavLink(href: string, pathname: string | null) {
  if (!pathname) return false;
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollDelta = currentScrollY - lastScrollY.current;

      if (currentScrollY < 10) {
        setIsVisible(true);
      } else if (Math.abs(scrollDelta) > 6) {
        setIsVisible(scrollDelta < 0);
      }

      lastScrollY.current = currentScrollY;
    };

    lastScrollY.current = window.scrollY;
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={`navbar-container font-sans ${
        isVisible ? "navbar-visible" : "navbar-hidden"
      }`}
    >
      <div className="navbar-content">
        <Link href="/" className="nav-logo nav-logo-text">
          <Image
            src={logo}
            alt="Tamaguit"
            width={160}
            height={80}
            priority
          />
        </Link>

        <nav className="nav-links-desktop" aria-label="Navigation principale">
          {links.map(({ href, label }) => {
            const active = isActiveNavLink(href, pathname);
            return (
              <Link
                key={href}
                href={href}
                className={active ? "nav-link nav-link-active" : "nav-link"}
                aria-current={active ? "page" : undefined}
              >
                {label}
              </Link>
            );
          })}
        </nav>

        <div className="nav-actions">
          <Link href="/inscrire" className="btn-join">
            <Heart size={18} />
            Rejoignez-nous
          </Link>
        </div>

        {/* <button
          type="button"
          className="menu-toggle"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((v) => !v)}
        >
          Menu
        </button> */}
      </div>

      <nav
        id="mobile-nav"
        className="mobile-menu"
        aria-label="Navigation mobile"
        aria-hidden={!isVisible}
        style={{
          opacity: isVisible ? 1 : 0,
          visibility: isVisible ? "visible" : "hidden",
          transition: "opacity 0.28s ease, visibility 0.28s ease",
        }}
      >
        {links.map(({ href, label }) => {
          const active = isActiveNavLink(href, pathname);
          return (
            <Link
              key={href}
              href={href}
              className={active ? "mobile-link mobile-link-active" : "mobile-link"}
              aria-current={active ? "page" : undefined}
              onClick={() => setOpen(false)}
            >
              {label}
            </Link>
          );
        })}
        <Link
          href="/inscrire"
          className="mobile-link"
          onClick={() => setOpen(false)}
        >
          S&apos;inscrire
        </Link>
      </nav>
    </header>
  );
}
