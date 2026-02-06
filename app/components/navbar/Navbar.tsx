"use client";

import { useState, useMemo, useCallback } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { useLenis } from "lenis/react";
import { NavIcon } from "../../ui/CustomIcons";
import { useIntro } from "../../providers/intro-provider";
import { useLanguage } from "../../providers/language-provider";
import { GLOBAL } from "../../constants/portfolio";

export default function Navbar() {
  const { introFinished } = useIntro();
  const { t } = useLanguage();
  const lenis = useLenis();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = useCallback(() => setIsOpen((prev) => !prev), []);

  // Memoizujemy elementy nawigacji, aby nie przeliczać ich przy każdym toggleMenu
  const navItems = useMemo(() =>
    GLOBAL.navLinks.map((link) => ({
      href: link.href,
      key: link.key,
      label: t.nav[link.key as keyof typeof t.nav],
    })), [t]
  );

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, key: string) => {
    setIsOpen(false);

    if (key === "contact" || key === "footer") {
      e.preventDefault();
      lenis?.scrollTo("bottom", { duration: 1.5 });
    }
  };

  return (
    <header>
      <motion.div
        initial={false}
        animate={introFinished ? { y: 0 } : { y: -100 }}
        transition={{ duration: 0.2, ease: [0.65, 0, 0.35, 1] }}
        /* Ręczny invert na hover, o którym pisałeś */
        className="fixed top-5 right-5 md:top-7 md:right-7 z-50 transition-all duration-700 bg-zinc-200 rounded-sm "
      >
        <NavIcon isOpen={isOpen} onClick={toggleMenu} />
      </motion.div>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={toggleMenu}
              className="fixed inset-0 bg-neutral-900/30 backdrop-blur-sm z-30"
            />

            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-screen w-full max-w-[85%] md:max-w-100 bg-neutral-950 z-40 shadow-2xl flex flex-col justify-between pt-24 px-8 pb-10"
            >
              <nav>
                <ul className="flex flex-col space-y-6 text-zinc-200 text-3xl md:text-4xl font-semibold uppercase">
                  {navItems.map((item) => (
                    <li key={item.key} className="overflow-hidden">
                      <Link
                        href={item.href}
                        onClick={(e) => handleLinkClick(e, item.key)}
                        className="block transition-colors duration-300 hover:text-blue-600"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>

              <div className="flex gap-4 text-xs font-medium uppercase text-zinc-400">
                {Object.entries(GLOBAL.socials).map(([platform, url]) => (
                  <a
                    key={platform}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-colors duration-300 hover:text-blue-600"
                  >
                    {t.footer.links[platform as keyof typeof t.footer.links]}
                  </a>
                ))}
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}