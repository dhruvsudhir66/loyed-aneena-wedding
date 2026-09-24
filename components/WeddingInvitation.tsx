"use client";

import { useEffect, useState, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowUpRight,
  Menu,
  Volume2,
  VolumeX,
  X,
} from "lucide-react";

import SaveTheDate from "@/components/SaveTheDate";
import Hero from "@/components/sections/Hero";
import RSVP from "@/components/sections/RSVP";
import GuestUpload from "@/components/sections/GuestUpload";
import Footer from "@/components/sections/Footer";
import Journal from "./Journal";
import PaperSeam from "@/components/PaperSeam";
import MeetTheCouple from "@/components/sections/MeetTheCouple";
import Gallery from "@/components/sections/Gallery";
import Venue from "@/components/sections/Venue";

const links = [
  ["Our story", "story"],
  ["Where & when", "venue"],
  ["RSVP", "rsvp"],
  ["Photos", "upload"],
] as const;

export default function WeddingInvitation() {
  const [opened, setOpened] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [isMuted, setIsMuted] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  /* =========================================================
     OPEN INVITATION
  ========================================================= */

  const openInvitation = () => {
    setOpened(true);
    setIsMuted(false);

    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.muted = false;

      audioRef.current.play().catch(() => {
        // Browser prevented playback.
      });
    }

    requestAnimationFrame(() => {
      document
        .getElementById("home")
        ?.scrollIntoView({
          behavior: "smooth",
        });
    });
  };

  /* =========================================================
     MUSIC TOGGLE
  ========================================================= */

  const toggleMute = () => {
    if (!audioRef.current) return;

    const nextMuted = !audioRef.current.muted;

    audioRef.current.muted = nextMuted;
    setIsMuted(nextMuted);
  };

  /* =========================================================
     ACTIVE SECTION
  ========================================================= */

  useEffect(() => {
    if (!opened) return;

    const sectionIds = [
      "home",
      "story",
      "venue",
      "rsvp",
      "upload",
    ];

    const updateActiveSection = () => {
      const marker = window.scrollY + window.innerHeight * 0.28;

      let current = "home";

      for (const id of sectionIds) {
        const element = document.getElementById(id);

        if (!element) continue;

        if (element.offsetTop <= marker) {
          current = id;
        }
      }

      setActiveSection(current);
    };

    updateActiveSection();

    window.addEventListener("scroll", updateActiveSection, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", updateActiveSection);
    };
  }, [opened]);

  /* =========================================================
     CLOSE MENU ON DESKTOP
  ========================================================= */

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  /* =========================================================
     PREVENT PAGE SCROLL WHEN MENU IS OPEN
  ========================================================= */

  useEffect(() => {
    if (!menuOpen) return;

    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [menuOpen]);

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#e9e4da]">
      {/* =========================================================
          WEDDING MUSIC
      ========================================================= */}

      <audio
        ref={audioRef}
        src="/music/Until_I_Found_You.mpeg"
        preload="auto"
        loop
      />

      {/* =========================================================
          ONE CONTINUOUS PAPER SHEET
      ========================================================= */}

      <div className="pointer-events-none absolute inset-0 -z-10">
        <div
          className="absolute inset-0 bg-[#e9e4da] bg-[url('/crumpled-paper.jpg')] bg-repeat"
          style={{
            backgroundSize: "900px auto",
          }}
        />

        <div className="absolute inset-0 bg-[#eee9df]/48" />

        <div className="absolute inset-0 bg-[#d8c6a9]/[0.06] mix-blend-multiply" />

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
        {/* =======================================================
            SAVE THE DATE
        ======================================================= */}

        {!opened ? (
          <SaveTheDate
            key="save-date"
            onOpen={openInvitation}
          />
        ) : (
          <motion.div
            key="invitation"
            initial={{
              opacity: 0,
              y: 16,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.65,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {/* ===================================================
                NAVIGATION
            =================================================== */}

            <header
              className="
                fixed
                left-0
                right-0
                top-0
                z-50
                px-3
                pt-2
                sm:px-5
                sm:pt-2.5
                lg:px-8
              "
            >
              {/* =================================================
                  COMPACT PAPER NAVBAR
              ================================================= */}

              <div
                className="
                  relative
                  mx-auto
                  max-w-5xl
                  overflow-hidden
                  border
                  border-[#4e4035]/[0.10]
                  bg-[#eee9df]/[0.84]
                  px-3.5
                  py-2
                  shadow-[0_5px_18px_rgba(78,64,53,0.07)]
                  backdrop-blur-[2px]
                  sm:px-4
                "
                style={{
                  clipPath:
                    "polygon(0 0, 5% 1%, 10% 0, 15% 1%, 20% 0, 25% 1%, 30% 0, 35% 1%, 40% 0, 45% 1%, 50% 0, 55% 1%, 60% 0, 65% 1%, 70% 0, 75% 1%, 80% 0, 85% 1%, 90% 0, 95% 1%, 100% 0, 100% 93%, 95% 92%, 90% 94%, 85% 92%, 80% 94%, 75% 92%, 70% 94%, 65% 92%, 60% 94%, 55% 92%, 50% 94%, 45% 92%, 40% 94%, 35% 92%, 30% 94%, 25% 92%, 20% 94%, 15% 92%, 10% 94%, 5% 92%, 0 93%)",
                }}
              >
                {/* Paper texture */}
                <div
                  className="
                    pointer-events-none
                    absolute
                    inset-0
                    opacity-[0.52]
                  "
                  style={{
                    backgroundImage:
                      "url('/crumpled-paper.jpg')",
                    backgroundSize: "650px auto",
                    backgroundRepeat: "repeat",
                  }}
                />

                {/* Soft paper wash */}
                <div className="pointer-events-none absolute inset-0 bg-[#f2ede2]/25" />

                {/* Fine grain */}
                <div
                  className="
                    pointer-events-none
                    absolute
                    inset-0
                    opacity-[0.08]
                    mix-blend-multiply
                  "
                  style={{
                    backgroundImage:
                      "radial-gradient(rgba(78,64,53,0.3) 0.4px, transparent 0.65px)",
                    backgroundSize: "3px 3px",
                  }}
                />

                {/* =================================================
                    NAV CONTENT
                ================================================= */}

                <div className="relative z-10 flex h-9 items-center justify-between">
                  {/* -----------------------------------------------
                      MONOGRAM
                  ----------------------------------------------- */}

                  <a
                    href="#home"
                    onClick={() => setMenuOpen(false)}
                    className="
                      group
                      relative
                      flex
                      h-8
                      w-[62px]
                      shrink-0
                      items-center
                      justify-start
                      overflow-visible
                      outline-none
                    "
                    aria-label="Back to home"
                  >
                    <img
                      src="/images/logo.png"
                      alt="L & A"
                      className="
                        block
                        h-[31px]
                        w-[58px]
                        object-contain
                        object-left
                        opacity-[0.88]
                        transition-all
                        duration-300
                        group-hover:opacity-100
                        group-hover:scale-[1.03]
                      "
                    />
                  </a>

                  {/* -----------------------------------------------
                      DESKTOP NAV
                  ----------------------------------------------- */}

                  <nav className="hidden items-center md:flex">
                    <div className="flex items-center gap-0.5">
                      {links.map(([label, id], index) => {
                        const isActive =
                          activeSection === id;

                        return (
                          <a
                            key={id}
                            href={`#${id}`}
                            className={`
                              group
                              relative
                              flex
                              items-center
                              gap-1.5
                              px-2.5
                              py-1.5
                              font-serif
                              text-[7px]
                              uppercase
                              tracking-[0.2em]
                              transition-colors
                              duration-200
                              ${isActive
                                ? "text-[#596041]"
                                : "text-[#4e4035]/60 hover:text-[#596041]"
                              }
                            `}
                          >
                            <span
                              className={`
                                text-[4px]
                                tracking-[0.12em]
                                transition-opacity
                                ${isActive
                                  ? "opacity-60"
                                  : "opacity-20 group-hover:opacity-40"
                                }
                              `}
                            >
                              {String(index + 1).padStart(
                                2,
                                "0"
                              )}
                            </span>

                            <span>{label}</span>

                            <span
                              className={`
                                absolute
                                bottom-0.5
                                left-2.5
                                right-2.5
                                h-px
                                origin-left
                                bg-[#747a5a]/45
                                transition-transform
                                duration-300
                                ${isActive
                                  ? "scale-x-100"
                                  : "scale-x-0 group-hover:scale-x-100"
                                }
                              `}
                            />
                          </a>
                        );
                      })}
                    </div>

                    {/* Tiny date marker */}
                    <div className="ml-2 flex items-center gap-1.5 border-l border-[#4e4035]/10 pl-3">
                      <span className="font-serif text-[4px] uppercase tracking-[0.2em] text-[#4e4035]/30">
                        22
                      </span>

                      <span className="h-2 w-px bg-[#4e4035]/12" />

                      <span className="font-serif text-[4px] uppercase tracking-[0.2em] text-[#4e4035]/30">
                        11
                      </span>

                      <span className="h-2 w-px bg-[#4e4035]/12" />

                      <span className="font-serif text-[4px] uppercase tracking-[0.2em] text-[#4e4035]/30">
                        26
                      </span>
                    </div>
                  </nav>

                  {/* -----------------------------------------------
                      RIGHT CONTROLS
                  ----------------------------------------------- */}

                  <div className="flex items-center gap-2">
                    {/* =============================================
                        MUSIC CONTROL
                    ============================================= */}

                    <button
                      type="button"
                      onClick={toggleMute}
                      className="
                        group
                        relative
                        flex
                        h-8
                        items-center
                        gap-1.5
                        border
                        border-[#596041]/35
                        bg-[#596041]/[0.10]
                        px-2.5
                        text-[#596041]
                        shadow-[0_2px_6px_rgba(78,64,53,0.045)]
                        transition-all
                        duration-200
                        hover:border-[#596041]/55
                        hover:bg-[#596041]/[0.16]
                        active:translate-y-px
                      "
                      aria-label={
                        isMuted
                          ? "Unmute music"
                          : "Mute music"
                      }
                      aria-pressed={isMuted}
                    >
                      {/* Tiny status line */}
                      <span
                        className={`
                          absolute
                          bottom-0
                          left-2.5
                          right-2.5
                          h-px
                          origin-left
                          bg-[#596041]/45
                          transition-transform
                          duration-300
                          ${isMuted
                            ? "scale-x-0"
                            : "scale-x-100"
                          }
                        `}
                      />

                      <span
                        className="
                          relative
                          grid
                          size-5
                          place-items-center
                          border
                          border-[#596041]/20
                          bg-[#eee9df]/45
                        "
                      >
                        {isMuted ? (
                          <VolumeX
                            size={13}
                            strokeWidth={1.35}
                          />
                        ) : (
                          <Volume2
                            size={13}
                            strokeWidth={1.35}
                          />
                        )}
                      </span>

                      <span className="hidden font-serif text-[5px] uppercase tracking-[0.22em] sm:inline">
                        {isMuted ? "Muted" : "Music"}
                      </span>
                    </button>

                    {/* =============================================
                        MOBILE MENU BUTTON
                    ============================================= */}

                    <button
                      onClick={() =>
                        setMenuOpen((value) => !value)
                      }
                      className="
                        relative
                        grid
                        size-8
                        place-items-center
                        overflow-hidden
                        border
                        border-[#596041]/30
                        bg-[#596041]
                        text-[#f2ede2]
                        shadow-[0_2px_7px_rgba(78,64,53,0.08)]
                        transition-transform
                        active:translate-y-px
                        md:hidden
                      "
                      aria-label={
                        menuOpen
                          ? "Close navigation"
                          : "Open navigation"
                      }
                      aria-expanded={menuOpen}
                    >
                      <span
                        className="
                          pointer-events-none
                          absolute
                          inset-0
                          opacity-[0.10]
                          mix-blend-screen
                        "
                        style={{
                          backgroundImage:
                            "url('/crumpled-paper.jpg')",
                          backgroundSize: "450px auto",
                        }}
                      />

                      <span className="relative z-10">
                        {menuOpen ? (
                          <X
                            size={15}
                            strokeWidth={1.25}
                          />
                        ) : (
                          <Menu
                            size={15}
                            strokeWidth={1.25}
                          />
                        )}
                      </span>
                    </button>
                  </div>
                </div>
              </div>

              {/* =================================================
                  MOBILE MENU
                  Compact olive paper insert
              ================================================= */}

              <AnimatePresence>
                {menuOpen && (
                  <motion.div
                    initial={{
                      opacity: 0,
                      y: -6,
                      scale: 0.985,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                      scale: 1,
                    }}
                    exit={{
                      opacity: 0,
                      y: -5,
                      scale: 0.985,
                    }}
                    transition={{
                      duration: 0.24,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="
                      absolute
                      left-1/2
                      top-[53px]
                      z-50
                      w-[calc(100vw-28px)]
                      max-w-[350px]
                      -translate-x-1/2
                    "
                  >
                    {/* shadow */}
                    <div className="absolute inset-0 translate-y-1.5 bg-[#4e4035]/15 blur-[8px]" />

                    <nav
                      className="
                        relative
                        overflow-hidden
                        bg-[#596041]
                        px-5
                        pb-5
                        pt-4
                        text-[#f2ede2]
                      "
                      style={{
                        clipPath:
                          "polygon(0 0, 8% 1%, 16% 0, 24% 1%, 32% 0, 40% 1%, 48% 0, 56% 1%, 64% 0, 72% 1%, 80% 0, 88% 1%, 100% 0, 100% 94%, 92% 93%, 84% 95%, 76% 93%, 68% 95%, 60% 93%, 52% 95%, 44% 93%, 36% 95%, 28% 93%, 20% 95%, 12% 93%, 0 94%)",
                      }}
                    >
                      {/* texture */}
                      <div
                        className="
                          pointer-events-none
                          absolute
                          inset-0
                          opacity-[0.11]
                          mix-blend-screen
                        "
                        style={{
                          backgroundImage:
                            "url('/crumpled-paper.jpg')",
                          backgroundSize: "650px auto",
                        }}
                      />

                      {/* grain */}
                      <div
                        className="
                          pointer-events-none
                          absolute
                          inset-0
                          opacity-[0.08]
                          mix-blend-screen
                        "
                        style={{
                          backgroundImage:
                            "radial-gradient(rgba(242,237,226,0.5) 0.45px, transparent 0.7px)",
                          backgroundSize: "3px 3px",
                        }}
                      />

                      <div className="relative z-10">
                        {/* tiny header */}
                        <div className="flex items-center gap-2">
                          <span className="font-serif text-[4px] uppercase tracking-[0.3em] text-[#f2ede2]/45">
                            The Wedding Post
                          </span>

                          <span className="h-px flex-1 bg-[#f2ede2]/15" />

                          <span className="font-serif text-[4px] tracking-[0.2em] text-[#f2ede2]/40">
                            L &amp; A
                          </span>
                        </div>

                        {/* links */}
                        <div className="mt-3 border-t border-[#f2ede2]/12">
                          {links.map(
                            ([label, id], index) => (
                              <motion.a
                                key={id}
                                href={`#${id}`}
                                onClick={() =>
                                  setMenuOpen(false)
                                }
                                initial={{
                                  opacity: 0,
                                  x: -6,
                                }}
                                animate={{
                                  opacity: 1,
                                  x: 0,
                                }}
                                transition={{
                                  delay:
                                    0.035 +
                                    index * 0.035,
                                  duration: 0.2,
                                  ease: [
                                    0.22,
                                    1,
                                    0.36,
                                    1,
                                  ],
                                }}
                                className="
                                  group
                                  flex
                                  items-center
                                  gap-3
                                  border-b
                                  border-[#f2ede2]/12
                                  py-2.5
                                "
                              >
                                <span className="font-serif text-[5px] tracking-[0.15em] text-[#d8c6a9]/60">
                                  {String(index + 1).padStart(
                                    2,
                                    "0"
                                  )}
                                </span>

                                <span className="flex-1 font-serif text-[8px] uppercase tracking-[0.22em] text-[#f2ede2]/90">
                                  {label}
                                </span>

                                <ArrowUpRight
                                  size={10}
                                  strokeWidth={1.1}
                                  className="
                                    text-[#d8c6a9]/50
                                    transition-transform
                                    duration-200
                                    group-hover:translate-x-0.5
                                    group-hover:-translate-y-0.5
                                  "
                                />
                              </motion.a>
                            )
                          )}
                        </div>

                        {/* tiny handwritten note */}
                        <div className="mt-3 flex items-center justify-between">
                          <span
                            className="rotate-[-2deg] text-[13px] text-[#d8c6a9]/70"
                            style={{
                              fontFamily:
                                '"Nesta Mastone", cursive',
                            }}
                          >
                            take your time.
                          </span>

                          <span className="font-serif text-[4px] uppercase tracking-[0.22em] text-[#f2ede2]/25">
                            22 · 11 · 26
                          </span>
                        </div>
                      </div>
                    </nav>
                  </motion.div>
                )}
              </AnimatePresence>
            </header>

            {/* ===================================================
                INVITATION PAGES
            =================================================== */}

            <Hero />

            <PaperSeam />

            <MeetTheCouple />

            <PaperSeam />

            <Journal />

            <PaperSeam />

            <Gallery />

            <PaperSeam />

            <Venue />

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