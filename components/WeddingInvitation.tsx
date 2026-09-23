"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";

import SaveTheDate from "@/components/SaveTheDate";
import Hero from "@/components/sections/Hero";
import RSVP from "@/components/sections/RSVP";
import GuestUpload from "@/components/sections/GuestUpload";
import Footer from "@/components/sections/Footer";
import Journal from "./Journal";
import PaperSeam from "@/components/PaperSeam";
import MeetTheCouple from "./sections/MeetTheCouple";
import Gallery from "./sections/Gallery";

export default function WeddingInvitation() {
  const [opened, setOpened] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const openInvitation = () => {
    setOpened(true);

    requestAnimationFrame(() => {
      document
        .getElementById("home")
        ?.scrollIntoView({ behavior: "smooth" });
    });
  };

  const links = [
    ["Our story", "story"],
    ["RSVP", "rsvp"],
    ["Photos", "upload"],
  ];

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#e9e4da]">
      {/* =========================================================
          ONE CONTINUOUS PAPER SHEET
          This moves naturally with the entire page.
          Do NOT make this fixed.
      ========================================================= */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        {/* Base crumpled paper */}
        <div
          className="absolute inset-0 bg-[#e9e4da] bg-[url('/crumpled-paper.jpg')] bg-repeat"
          style={{
            backgroundSize: "900px auto",
          }}
        />

        {/* Warm paper wash */}
        <div className="absolute inset-0 bg-[#eee9df]/48" />

        {/* Very subtle sand tone */}
        <div className="absolute inset-0 bg-[#d8c6a9]/[0.06] mix-blend-multiply" />

        {/* Fine paper grain */}
        <div
          className="absolute inset-0 opacity-[0.16] mix-blend-multiply"
          style={{
            backgroundImage:
              "radial-gradient(rgba(78,64,53,0.28) 0.45px, transparent 0.65px)",
            backgroundSize: "3px 3px",
          }}
        />
      </div>

      <AnimatePresence mode="wait">
        {!opened ? (
          <SaveTheDate key="save-date" onOpen={openInvitation} />
        ) : (
          <motion.div
            key="invitation"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.75,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {/* =====================================================
                NAVIGATION
            ===================================================== */}
            <header className="fixed left-0 right-0 top-0 z-50 px-4 pt-3 sm:px-6 lg:px-10">
              <div className="mx-auto flex max-w-6xl items-center justify-between rounded-[22px] border border-white/45 bg-[#f2ede2]/80 px-4 py-3 shadow-[0_10px_35px_rgba(62,54,43,.08)] backdrop-blur-xl">
                {/* Monogram */}
                <a
                  href="#home"
                  className="font-script text-3xl leading-none text-[#596041]"
                  aria-label="Back to home"
                >
                  A &amp; A
                </a>

                {/* Desktop navigation */}
                <nav className="hidden items-center gap-7 text-[11px] uppercase tracking-[.22em] text-[#4e4035] md:flex">
                  {links.map(([label, id]) => (
                    <a
                      key={id}
                      href={`#${id}`}
                      className="transition-colors hover:text-[#747a5a]"
                    >
                      {label}
                    </a>
                  ))}
                </nav>

                {/* Mobile menu */}
                <button
                  onClick={() => setMenuOpen((v) => !v)}
                  className="grid size-10 place-items-center rounded-full text-[#4e4035] md:hidden"
                  aria-label="Toggle navigation"
                  aria-expanded={menuOpen}
                >
                  {menuOpen ? <X size={19} /> : <Menu size={19} />}
                </button>
              </div>

              {/* Mobile navigation */}
              <AnimatePresence>
                {menuOpen && (
                  <motion.nav
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.2 }}
                    className="mx-auto mt-2 max-w-6xl rounded-[22px] border border-white/45 bg-[#f2ede2]/95 p-3 shadow-xl backdrop-blur-xl md:hidden"
                  >
                    {links.map(([label, id]) => (
                      <a
                        key={id}
                        href={`#${id}`}
                        onClick={() => setMenuOpen(false)}
                        className="block border-b border-[#4e4035]/10 px-4 py-3 text-[11px] uppercase tracking-[.22em] last:border-0"
                      >
                        {label}
                      </a>
                    ))}
                  </motion.nav>
                )}
              </AnimatePresence>
            </header>

            {/* =====================================================
                INVITATION PAGES
                All sections sit on the same continuous paper.
            ===================================================== */}

            <Hero />

            <PaperSeam />

            <MeetTheCouple />

            <PaperSeam />

            <Journal />

            <PaperSeam />

            <Gallery />

            <PaperSeam />

            <RSVP />

            <PaperSeam />

            <GuestUpload />

            <PaperSeam />

            <Footer />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}