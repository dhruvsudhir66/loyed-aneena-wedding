"use client";

import { motion } from "framer-motion";
import { ArrowDown, CalendarDays, Heart, Star } from "lucide-react";

export default function SaveTheDate({ onOpen }: { onOpen: () => void }) {
  return (
    <motion.section
      className="
        relative
        flex
        min-h-[100svh]
        items-center
        justify-center
        overflow-hidden
        bg-[#e9e4da]
        px-5
        py-8
        text-[#4e4035]
        sm:px-8
        sm:py-12
      "
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.98, y: -18 }}
      transition={{ duration: 0.8 }}
    >
      {/* =========================================================
          CONTINUOUS CRUMPLED PAPER BACKGROUND
          Same visual language as Hero
      ========================================================== */}

      <div className="pointer-events-none absolute inset-0">
        {/* Base paper */}
        <div className="absolute inset-0 bg-[#e9e4da]" />

        {/* Crumpled paper */}
        <div
          className="
            absolute
            inset-0
            bg-[#e9e4da]
            bg-[url('/crumpled-paper.jpg')]
            bg-cover
            bg-center
            bg-no-repeat
          "
        />

        {/* Same warm wash as Hero */}
        <div className="absolute inset-0 bg-[#eee9df]/48" />

        {/* Same subtle sand tone */}
        <div
          className="
            absolute
            inset-0
            bg-[#d8c6a9]/[0.06]
            mix-blend-multiply
          "
        />

        {/* Same paper grain */}
        <div
          className="
            absolute
            inset-0
            opacity-[0.16]
            mix-blend-multiply
            [background-image:
              radial-gradient(
                rgba(78,64,53,0.28) 0.45px,
                transparent 0.65px
              )
            ]
            [background-size:3px_3px]
          "
        />
      </div>

      {/* =========================================================
          FAINT NEWSPAPER PRINTING IN THE PAPER ITSELF
      ========================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          inset-0
          overflow-hidden
          opacity-[0.7]
        "
      >
        {/* Giant faded masthead */}

        <div
          className="
            absolute
            left-1/2
            top-[6%]
            -translate-x-1/2
            whitespace-nowrap
            font-serif
            text-[clamp(75px,22vw,190px)]
            font-black
            uppercase
            leading-none
            tracking-[-0.08em]
            text-[#4e4035]/[0.025]
          "
        >
          Wedding Post
        </div>

        {/* Faint newspaper column */}

        <div
          className="
            absolute
            bottom-[7%]
            left-[11%]
            top-[8%]
            hidden
            w-px
            bg-[#4e4035]/[0.035]
            lg:block
          "
        />

        <div
          className="
            absolute
            bottom-[7%]
            right-[11%]
            top-[8%]
            hidden
            w-px
            bg-[#4e4035]/[0.035]
            lg:block
          "
        />

        {/* Faint editorial text left */}

        <div
          className="
            absolute
            left-[4%]
            top-[28%]
            hidden
            w-[110px]
            rotate-[-90deg]
            origin-left
            font-serif
            text-[5px]
            uppercase
            leading-[1.9]
            tracking-[0.18em]
            text-[#4e4035]/[0.09]
            lg:block
          "
        >
          <p>
            Two lives
            <br />
            one beginning
            <br />
            one story
            <br />
            many pages
          </p>
        </div>

        {/* Faint editorial text right */}

        <div
          className="
            absolute
            right-[4%]
            top-[54%]
            hidden
            w-[120px]
            rotate-90
            origin-right
            font-serif
            text-[5px]
            uppercase
            leading-[1.9]
            tracking-[0.18em]
            text-[#4e4035]/[0.09]
            lg:block
          "
        >
          <p>
            Special edition
            <br />
            Kerala
            <br />
            2026
            <br />
            A &amp; L
          </p>
        </div>

        {/* Tiny printed stars */}

        <span className="absolute left-[8%] top-[18%] font-serif text-[9px] text-[#596041]/[0.14]">
          ✦
        </span>

        <span className="absolute right-[9%] bottom-[17%] font-serif text-[9px] text-[#596041]/[0.14]">
          ✦
        </span>
      </div>

      {/* =========================================================
          MAIN NEWSPAPER SHEET

          Not a card anymore.
          It is a floating piece of old newspaper.
      ========================================================== */}

      <div className="relative z-10 w-full max-w-[500px]">
        <motion.article
          initial={{
            y: 28,
            opacity: 0,
            rotate: -1.2,
          }}
          animate={{
            y: 0,
            opacity: 1,
            rotate: -0.35,
          }}
          exit={{
            y: -30,
            opacity: 0,
            scale: 0.96,
          }}
          transition={{
            delay: 0.12,
            duration: 0.9,
            ease: [0.22, 1, 0.36, 1],
          }}
          onClick={onOpen}
          onKeyDown={(event) => {
            if (event.key === "Enter" || event.key === " ") {
              event.preventDefault();
              onOpen();
            }
          }}
          role="button"
          tabIndex={0}
          aria-label="Open wedding invitation"
          className="
            group
            relative
            cursor-pointer
            overflow-visible
            px-3
            py-3
            text-[#4e4035]
            transition-transform
            duration-500
            hover:-translate-y-1
            focus:outline-none
            focus-visible:ring-2
            focus-visible:ring-[#596041]/50
            sm:px-5
            sm:py-5
          "
        >
          {/* =====================================================
              PAPER UNDERLAY
          ====================================================== */}

          <div
            className="
              pointer-events-none
              absolute
              inset-[5%]
              rotate-[1.2deg]
              bg-[#d8cfc0]/25
              blur-[0.2px]
            "
          />

          {/* =====================================================
              PAPER TEXTURE OVER THE CONTENT
          ====================================================== */}

          <div
            className="
              pointer-events-none
              absolute
              inset-0
              opacity-[0.12]
              mix-blend-multiply
              [background-image:
                radial-gradient(
                  rgba(78,64,53,0.22) 0.45px,
                  transparent 0.65px
                )
              ]
              [background-size:3px_3px]
            "
          />

          {/* =====================================================
              TOP NEWSPAPER RULES
          ====================================================== */}

          <div className="relative z-10">
            <div className="mb-2 flex items-center gap-3">
              <span className="h-px flex-1 bg-[#4e4035]/20" />

              <span className="font-serif text-[6px] uppercase tracking-[0.32em] text-[#4e4035]/35">
                Special Edition
              </span>

              <span className="h-px flex-1 bg-[#4e4035]/20" />
            </div>

            {/* =================================================
                NEWSPAPER HEADER
            ================================================== */}

            <div className="border-y border-[#4e4035]/35 py-2.5">
              <div className="grid grid-cols-[64px_1fr_64px] items-center gap-2 sm:grid-cols-[78px_1fr_78px]">
                {/* Left */}

                <div
                  className="
                    text-center
                    font-serif
                    text-[6px]
                    uppercase
                    leading-[1.35]
                    tracking-[0.1em]
                    text-[#596041]/60
                    sm:text-[7px]
                  "
                >
                  <span className="block italic">The</span>
                  <span className="block italic">Wedding</span>
                  <span className="block italic">Edition</span>
                </div>

                {/* Masthead */}

                <div className="border-x border-[#4e4035]/20 px-2 text-center">
                  <h2
                    className="
                      font-serif
                      text-[25px]
                      font-black
                      leading-none
                      tracking-[-0.07em]
                      text-[#4e4035]/90
                      sm:text-[31px]
                    "
                  >
                    Wedding Post
                  </h2>
                </div>

                {/* Right */}

                <div
                  className="
                    text-center
                    font-serif
                    text-[6px]
                    uppercase
                    leading-[1.35]
                    tracking-[0.1em]
                    text-[#596041]/60
                    sm:text-[7px]
                  "
                >
                  <span className="block italic">Kerala</span>
                  <span className="block italic">Special</span>
                  <span className="block italic">Edition</span>
                </div>
              </div>
            </div>

            {/* =================================================
                METADATA
            ================================================== */}

            <div className="flex items-center justify-between border-b border-[#4e4035]/25 py-2 font-serif text-[6px] uppercase tracking-[0.12em] text-[#4e4035]/45 sm:text-[7px]">
              <span>Vol. 01 · No. 01</span>

              <span className="flex items-center gap-2 text-[#596041]/65">
                <Star size={7} fill="currentColor" />
                Save the Date
                <Star size={7} fill="currentColor" />
              </span>

              <span>Kerala · 2026</span>
            </div>

            {/* =================================================
                MAIN TITLE
            ================================================== */}

            <div className="py-6 text-center sm:py-8">
              <div className="flex items-center justify-center gap-3">
                <span className="h-px w-8 bg-[#4e4035]/20 sm:w-11" />

                <p className="font-serif text-[7px] uppercase tracking-[0.32em] text-[#596041]/65">
                  17 · 04 · 2027
                </p>

                <span className="h-px w-8 bg-[#4e4035]/20 sm:w-11" />
              </div>

              <h1
                style={{
                  fontFamily: '"Nesta Mastone", cursive',
                }}
                className="
                  mt-4
                  font-display
                  text-[53px]
                  font-medium
                  leading-[0.76]
                  tracking-[-0.05em]
                  text-[#4e4035]/90
                  sm:text-[66px]
                "
              >
                Save
              </h1>

              <div className="relative mt-[-1px]">
                <span
                  style={{
                    fontFamily: '"Nesta Mastone", cursive',
                  }}
                  className="
                    relative
                    z-10
                    font-script
                    text-[15px]
                    leading-none
                    text-[#747a5a]/85
                    sm:text-[54px]
                    ml-6
                  "
                >
                  the
                </span>
              </div>

              <h1
                style={{
                  fontFamily: '"Nesta Mastone", cursive',
                }}
                className="
                  mt-1
                  font-display
                  text-[42px]
                  font-medium
                  leading-[0.76]
                  tracking-[-0.05em]
                  text-[#4e4035]/90
                  sm:text-[66px]
                "
              >
                Date
              </h1>
            </div>

            {/* =================================================
                ARCHIVAL PHOTO CLIPPING
            ================================================== */}

            <div className="relative mx-auto w-[94%]">
              {/* Crooked paper underneath */}

              <div
                className="
                  pointer-events-none
                  absolute
                  -inset-2
                  rotate-[1.8deg]
                  bg-[#d7cdbd]/40
                "
              />

              <div
                className="
                  pointer-events-none
                  absolute
                  -inset-1
                  rotate-[-1deg]
                  bg-[#f0eadf]/65
                "
              />

              {/* Photo */}

              <div
                className="
                  relative
                  rotate-[-0.8deg]
                  bg-[#eee7dc]
                  p-2.5
                  pb-7
                  shadow-[0_12px_25px_rgba(78,64,53,0.12)]
                  sm:p-3
                  sm:pb-8
                "
              >
                <div className="relative overflow-hidden bg-[#596041]">
                  <img
                    src="/save-date.webp"
                    alt="Wedding couple"
                    className="
                      aspect-[4/3]
                      w-full
                      object-cover
                      grayscale-[48%]
                      sepia-[14%]
                      contrast-[0.9]
                      brightness-[0.94]
                      transition-transform
                      duration-700
                      group-hover:scale-[1.025]
                    "
                  />

                  {/* Sage ink wash */}

                  <div
                    className="
                      pointer-events-none
                      absolute
                      inset-0
                      bg-[#747a5a]/[0.12]
                      mix-blend-color
                    "
                  />

                  {/* Warm paper wash */}

                  <div
                    className="
                      pointer-events-none
                      absolute
                      inset-0
                      bg-[#d8c6a9]/[0.10]
                      mix-blend-soft-light
                    "
                  />

                  {/* Photograph grain */}

                  <div
                    className="
                      pointer-events-none
                      absolute
                      inset-0
                      opacity-[0.20]
                      mix-blend-overlay
                      [background-image:
                        radial-gradient(
                          rgba(255,255,255,0.45) 0.5px,
                          transparent 0.5px
                        )
                      ]
                      [background-size:3px_3px]
                    "
                  />
                </div>
              </div>

              {/* Tape */}

              <div
                className="
                  pointer-events-none
                  absolute
                  -right-4
                  -top-3
                  z-20
                  h-7
                  w-16
                  rotate-[27deg]
                  bg-[#d8c6a9]/35
                "
              />

              {/* Archive caption */}

              <span
                className="
                  absolute
                  -bottom-5
                  left-1
                  font-serif
                  text-[5px]
                  uppercase
                  tracking-[0.22em]
                  text-[#4e4035]/35
                "
              >
                Archive · A &amp; L · Fig. 01
              </span>
            </div>

            {/* =================================================
                NAMES
            ================================================== */}

            <div className="py-7 text-center sm:py-8">
              <h2
                style={{
                  fontFamily: '"Nesta Mastone", cursive',
                }}
                className="
                  text-[39px]
                  leading-none
                  tracking-[-0.02em]
                  text-[#4e4035]/85
                  sm:text-[48px]
                "
              >
                Loyed
                <span className="mx-2 text-[#747a5a]/70">&amp;</span>
                Aneena
              </h2>

              <div className="mt-4 flex items-center justify-center gap-3">
                <span className="h-px w-8 bg-[#4e4035]/20" />

                <Heart
                  size={9}
                  strokeWidth={1}
                  fill="currentColor"
                  className="text-[#747a5a]/60"
                />

                <span className="h-px w-8 bg-[#4e4035]/20" />
              </div>

              <p
                className="
                  mx-auto
                  mt-4
                  max-w-[310px]
                  text-[12px]
                  leading-[1.15]
                  text-[#596041]/65
                  sm:text-[23px]
                "
              >
                Together with our families, we invite you to celebrate the
                beginning of our forever.
              </p>
            </div>

            {/* =================================================
                FOOTER NEWSPAPER STRIP
            ================================================== */}

            <div className="border-t border-[#4e4035]/25 pt-2.5">
              <div className="flex items-center justify-between font-serif text-[6px] uppercase tracking-[0.16em] text-[#4e4035]/40 sm:text-[7px]">
                <span>22 November 2026</span>

                <span className="flex items-center gap-1.5 text-[#596041]/65">
                  <CalendarDays size={8} />
                  Kerala
                </span>

                <span>Wedding Edition</span>
              </div>
            </div>

            {/* Bottom editorial mark */}

            <div className="mt-3 flex items-center gap-3">
              <span className="h-px flex-1 bg-[#4e4035]/12" />

              <span className="font-serif text-[5px] uppercase tracking-[0.3em] text-[#4e4035]/25">
                A &amp; L · Special Edition
              </span>

              <span className="h-px flex-1 bg-[#4e4035]/12" />
            </div>
          </div>

          {/* =====================================================
              PAPER CORNERS / IMPERFECTIONS
          ====================================================== */}

          <div className="pointer-events-none absolute -left-1 top-[18%] h-14 w-2 rotate-[2deg] bg-[#d8c6a9]/10 blur-[2px]" />

          <div className="pointer-events-none absolute -right-1 bottom-[15%] h-20 w-2 rotate-[-3deg] bg-[#596041]/[0.06] blur-[2px]" />
        </motion.article>

        {/* =======================================================
            OPEN INVITATION
        ======================================================== */}

        <motion.button
          onClick={onOpen}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="
            group
            mx-auto
            mt-7
            flex
            items-center
            gap-3
            text-[9px]
            uppercase
            tracking-[0.32em]
            text-[#4e4035]/75
            sm:mt-8
          "
          aria-label="Open wedding invitation"
        >
          <span className="border-b border-[#4e4035]/30 pb-1 transition-colors group-hover:border-[#596041] group-hover:text-[#596041]">
            Open invitation
          </span>

          <ArrowDown
            size={13}
            className="animate-float transition-transform group-hover:translate-y-1"
          />
        </motion.button>
      </div>

      {/* =========================================================
          SMALL PAPER MARKS AROUND THE OUTSIDE
      ========================================================== */}

      <div className="pointer-events-none absolute left-5 top-8 hidden font-serif text-[5px] uppercase tracking-[0.25em] text-[#4e4035]/25 sm:block">
        A &amp; L
      </div>

      <div className="pointer-events-none absolute right-5 top-8 hidden font-serif text-[5px] uppercase tracking-[0.25em] text-[#4e4035]/25 sm:block">
        2026
      </div>

      <div className="pointer-events-none absolute bottom-7 left-5 hidden font-serif text-[5px] uppercase tracking-[0.25em] text-[#4e4035]/20 sm:block">
        Wedding Post
      </div>

      <div className="pointer-events-none absolute bottom-7 right-5 hidden font-serif text-[5px] uppercase tracking-[0.25em] text-[#4e4035]/20 sm:block">
        Kerala
      </div>
    </motion.section>
  );
}