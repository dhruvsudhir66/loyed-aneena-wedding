"use client";

import { motion } from "framer-motion";
import { Heart } from "lucide-react";

function PageNumber({
  number,
  label,
}: {
  number: string;
  label: string;
}) {
  return (
    <div className="mt-9 border-t border-[#4e4035]/10 pt-3 sm:mt-11">
      <div className="flex items-center gap-2.5">
        {/* Page number */}
        <div className="flex shrink-0 items-center gap-1.5">
          <span className="font-serif text-[5px] uppercase tracking-[0.22em] text-[#4e4035]/25">
            Page
          </span>

          <span className="font-serif text-[11px] tracking-[0.12em] text-[#596041]/75">
            {number}
          </span>
        </div>

        {/* Rule */}
        <span className="h-px flex-1 bg-[#4e4035]/10" />

        {/* Center editorial label */}
        <span className="hidden font-serif text-[6px] uppercase tracking-[0.28em] text-[#4e4035]/25 sm:block">
          {label}
        </span>

        <span className="h-px flex-1 bg-[#4e4035]/10" />

        {/* Initials */}
        <span className="font-serif text-[5px] uppercase tracking-[0.2em] text-[#4e4035]/20">
          A &amp; L
        </span>
      </div>
    </div>
  );
}

export default function Journal() {
  return (
    <section
      id="journal"
      className="
        relative
        overflow-hidden
        bg-[#e9e4da]
        px-5
        pb-6
        pt-12
        text-[#4e4035]
        sm:px-8
        sm:pb-8
        sm:pt-16
      "
    >
      {/* =========================================================
          CRUMPLED PAPER BACKGROUND
      ========================================================== */}

      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[#e9e4da]" />

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

        <div className="absolute inset-0 bg-[#eee9df]/48" />

        <div
          className="
            absolute
            inset-0
            bg-[#d8c6a9]/[0.06]
            mix-blend-multiply
          "
        />

        <div
          className="
            absolute
            inset-0
            opacity-[0.14]
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
          EDITORIAL BACKGROUND
      ========================================================== */}

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Giant faded masthead */}
        <div
          className="
            absolute
            left-1/2
            top-[4%]
            -translate-x-1/2
            whitespace-nowrap
            font-serif
            text-[clamp(64px,14vw,160px)]
            font-black
            uppercase
            leading-none
            tracking-[-0.075em]
            text-[#4e4035]/[0.025]
          "
        >
          Journal
        </div>

        {/* Top rules */}
        <div className="absolute left-5 right-5 top-5 border-t border-[#4e4035]/10 sm:left-8 sm:right-8" />

        <div className="absolute left-5 right-5 top-[27px] border-t border-[#596041]/[0.08] sm:left-8 sm:right-8" />

        {/* Newspaper header */}
        <div
          className="
            absolute
            left-5
            right-5
            top-7
            flex
            items-center
            justify-between
            font-serif
            text-[5px]
            uppercase
            tracking-[0.28em]
            text-[#4e4035]/30
            sm:left-8
            sm:right-8
            sm:text-[6px]
          "
        >
          <span>Private Journal</span>

          <span className="hidden sm:block">
            The Wedding Post · Vol. 01 · No. 02
          </span>

          <span>Kerala · 2026</span>
        </div>

        {/* Side editorial marks */}
        <div className="absolute left-2 top-1/2 hidden -translate-y-1/2 -rotate-90 items-center gap-3 lg:flex">
          <span className="h-px w-8 bg-[#4e4035]/15" />

          <span className="font-serif text-[6px] uppercase tracking-[0.35em] text-[#4e4035]/25">
            A story in the making
          </span>

          <span className="h-px w-8 bg-[#4e4035]/15" />
        </div>

        <div className="absolute right-2 top-1/2 hidden translate-y-1/2 rotate-90 items-center gap-3 lg:flex">
          <span className="font-serif text-[6px] uppercase tracking-[0.35em] text-[#4e4035]/25">
            22 November 2026
          </span>

          <span className="h-px w-8 bg-[#4e4035]/15" />
        </div>

        {/* Column rules */}
        <div className="absolute bottom-10 left-[12%] top-10 hidden w-px bg-[#4e4035]/[0.04] lg:block" />

        <div className="absolute bottom-10 right-[12%] top-10 hidden w-px bg-[#4e4035]/[0.04] lg:block" />

        {/* Tiny stars */}
        <span className="absolute left-[9%] top-[17%] font-serif text-[10px] text-[#596041]/[0.16]">
          ✦
        </span>

        <span className="absolute right-[10%] bottom-[18%] font-serif text-[9px] text-[#596041]/[0.14]">
          ✦
        </span>
      </div>

      {/* =========================================================
          BOTANICAL DETAIL
      ========================================================== */}

      <div className="pointer-events-none absolute -right-20 top-8 opacity-[0.065]">
        <svg
          width="240"
          height="290"
          viewBox="0 0 260 320"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M244 10C199 63 166 111 134 167C104 219 70 271 15 310"
            stroke="#596041"
            strokeWidth="1"
          />

          <path
            d="M198 65C213 48 230 34 247 22"
            stroke="#596041"
            strokeWidth="1"
          />

          <path
            d="M174 94C154 78 137 72 119 70"
            stroke="#596041"
            strokeWidth="1"
          />

          <path
            d="M148 137C166 128 182 126 198 130"
            stroke="#596041"
            strokeWidth="1"
          />

          <path
            d="M113 190C95 177 79 174 62 176"
            stroke="#596041"
            strokeWidth="1"
          />

          <path
            d="M83 235C99 229 113 230 126 237"
            stroke="#596041"
            strokeWidth="1"
          />
        </svg>
      </div>

      {/* =========================================================
          MAIN CONTENT
      ========================================================== */}

      <div className="relative z-10 mx-auto w-full max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{
            once: true,
            amount: 0.12,
            margin: "0px 0px -8% 0px",
          }}
          transition={{
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="mx-auto w-full max-w-[820px]"
        >
          {/* =====================================================
              HEADER
          ====================================================== */}

          <div className="mb-6 text-center sm:mb-8">
            <div className="flex items-center justify-center gap-3">
              <span className="h-px w-8 bg-[#4e4035]/18" />

              <span className="font-serif text-[6px] uppercase tracking-[0.38em] text-[#596041]/60">
                From the journal
              </span>

              <span className="h-px w-8 bg-[#4e4035]/18" />
            </div>

            <p
              style={{
                fontFamily: '"Nesta Mastone", cursive',
              }}
              className="
                mt-2.5
                text-[23px]
                leading-none
                text-[#596041]/75
                sm:text-[28px]
              "
            >
              A little note from us
            </p>
          </div>

          {/* =====================================================
              JOURNAL METADATA
          ====================================================== */}

          <div className="mb-3 flex items-center justify-between px-1">
            <span className="font-serif text-[5px] uppercase tracking-[0.24em] text-[#4e4035]/30">
              The Wedding Journal
            </span>

            <span className="font-serif text-[5px] uppercase tracking-[0.24em] text-[#596041]/45">
              Vol. 01
            </span>

            <span className="font-serif text-[5px] uppercase tracking-[0.24em] text-[#4e4035]/30">
              22 · 11 · 2026
            </span>
          </div>

          {/* =====================================================
              PHOTO + FIRST HALF OF LETTER
          ====================================================== */}

          <motion.div
            initial={{
              opacity: 0,
              y: 14,
              rotate: -1,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
              rotate: -0.6,
            }}
            viewport={{
              once: true,
              amount: 0.18,
            }}
            transition={{
              duration: 0.8,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="
              relative
              mx-auto
              w-[94%]
              max-w-[650px]
              sm:w-[88%]
            "
          >
            {/* Offset paper layers */}

            <div className="absolute inset-0 translate-x-2.5 translate-y-2.5 rotate-[2deg] bg-[#747a5a]/[0.10]" />

            <div className="absolute inset-0 -translate-x-1.5 translate-y-1 rotate-[-1.7deg] bg-[#d8c6a9]/[0.18]" />

            {/* Main photograph paper */}

            <div className="relative bg-[#e6dfd3] p-2 shadow-[0_12px_26px_rgba(78,64,53,0.11)] sm:p-2.5">
              <div className="relative aspect-[4/3] overflow-hidden bg-[#d5cec3]">
                <img
                  src="/save-date.webp"
                  alt="A moment from Loyed and Aneena's story"
                  loading="lazy"
                  decoding="async"
                  className="
                    absolute
                    inset-0
                    h-full
                    w-full
                    object-cover
                    grayscale-[42%]
                    sepia-[13%]
                    contrast-[0.9]
                    brightness-[0.94]
                  "
                />

                {/* Sage archival wash */}
                <div className="pointer-events-none absolute inset-0 bg-[#747a5a]/[0.09] mix-blend-color" />

                {/* Warm wash */}
                <div className="pointer-events-none absolute inset-0 bg-[#d8c6a9]/[0.08] mix-blend-soft-light" />

                {/* Grain */}
                <div
                  className="
                    pointer-events-none
                    absolute
                    inset-0
                    opacity-[0.18]
                    mix-blend-overlay
                    [background-image:
                      radial-gradient(
                        rgba(255,255,255,0.45) 0.5px,
                        transparent 0.6px
                      )
                    ]
                    [background-size:3px_3px]
                  "
                />

                {/* =================================================
                    TEXT ON IMAGE
                ================================================== */}

                <motion.div
                  initial={{
                    opacity: 0,
                    y: 7,
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}
                  viewport={{ once: true }}
                  transition={{
                    delay: 0.25,
                    duration: 0.65,
                  }}
                  className="
                    absolute
                    bottom-[7%]
                    left-[5%]
                    z-10
                    w-[76%]
                    max-w-[360px]
                  "
                >
                  {/* Controlled paper patch */}
                  <div
                    className="
                      absolute
                      -inset-x-2.5
                      -inset-y-2.5
                      -z-10
                      bg-[#eee8dc]/[0.72]
                      backdrop-blur-[1px]
                    "
                  />

                  <div className="mb-1.5 flex items-center gap-2">
                    <span className="h-px w-5 bg-[#596041]/45" />

                    <span className="font-serif text-[5px] uppercase tracking-[0.26em] text-[#4e4035]/55">
                      A note from us
                    </span>
                  </div>

                  <p
                    style={{
                      fontFamily: '"Nesta Mastone", cursive',
                    }}
                    className="
                      text-[20px]
                      leading-[1.08]
                      text-[#4e4035]
                      drop-shadow-[0_1px_0_rgba(255,255,255,0.35)]
                      sm:text-[26px]
                      lg:text-[30px]
                    "
                  >
                    Somehow, somewhere along the way,
                    <br />
                    the ordinary days became our favourite ones.
                  </p>
                </motion.div>

                {/* Photo caption */}
                <div className="absolute bottom-[3%] right-[4%] z-10">
                  <span className="font-serif text-[4px] uppercase tracking-[0.18em] text-white/65 drop-shadow-[0_1px_2px_rgba(0,0,0,0.25)]">
                    Fig. 01 · A moment worth keeping
                  </span>
                </div>
              </div>

              {/* Photo metadata */}
              <div className="mt-1.5 flex items-center justify-between">
                <span className="font-serif text-[5px] uppercase tracking-[0.18em] text-[#4e4035]/30">
                  Archive · A &amp; L
                </span>

                <span className="font-serif text-[5px] uppercase tracking-[0.18em] text-[#4e4035]/30">
                  Journal No. 01
                </span>
              </div>
            </div>

            {/* Tape */}
            <div className="absolute -right-4 -top-3 z-20 h-7 w-16 rotate-[23deg] bg-[#d8c6a9]/40" />

            <div className="absolute -bottom-2.5 left-[18%] z-20 h-5 w-14 rotate-[-8deg] bg-[#d8c6a9]/25" />
          </motion.div>

          {/* =====================================================
              PAPER CONTINUATION
          ====================================================== */}

          <motion.div
            initial={{
              opacity: 0,
              y: 10,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
              amount: 0.2,
            }}
            transition={{
              delay: 0.12,
              duration: 0.7,
            }}
            className="
              relative
              mx-auto
              w-full
              max-w-[700px]
              px-4
              pb-1
              pt-7
              sm:px-8
              sm:pt-9
            "
          >
            {/* Small continuation label */}

            <div className="mb-4 flex items-center gap-2.5">
              <span className="h-px w-7 bg-[#4e4035]/18" />

              <span className="font-serif text-[5px] uppercase tracking-[0.26em] text-[#4e4035]/35">
                The next chapter
              </span>

              <span className="h-px flex-1 bg-[#4e4035]/10" />
            </div>

            {/* Remaining text */}

            <div className="grid gap-5 sm:grid-cols-[1fr_auto] sm:items-end sm:gap-8">
              <div>
                <div className="mt-3 flex items-center gap-2.5">
                  <Heart
                    size={9}
                    strokeWidth={1}
                    fill="currentColor"
                    className="text-[#747a5a]/65"
                  />

                  <span className="h-px w-8 bg-[#4e4035]/15" />

                  <p
                    style={{
                      fontFamily: '"Nesta Mastone", cursive',
                    }}
                    className="text-[19px] text-[#596041]/75 sm:text-[22px]"
                  >
                    Loyed &amp; Aneena
                  </p>
                </div>
              </div>

              {/* Small handwritten side note */}

              <div className="sm:max-w-[140px] sm:text-right">
                <p
                  style={{
                    fontFamily: '"Nesta Mastone", cursive',
                  }}
                  className="
                    text-[16px]
                    leading-[1.1]
                    text-[#596041]/55
                    sm:text-[18px]
                  "
                >
                  one page at a time,
                  <br />
                  one life together.
                </p>
              </div>
            </div>

            {/* Tiny editorial metadata */}

            <div className="mt-6 flex items-center justify-between border-t border-[#4e4035]/[0.08] pt-2.5">
              <span className="font-serif text-[5px] uppercase tracking-[0.2em] text-[#4e4035]/25">
                Journal entry no. 01
              </span>

              <span className="font-serif text-[5px] uppercase tracking-[0.2em] text-[#4e4035]/25">
                Kerala · 2026
              </span>
            </div>
          </motion.div>

          {/* =====================================================
              PAGE FOOTER
          ====================================================== */}

          <PageNumber
            number="04"
            label="Journal · The Wedding Post"
          />
        </motion.div>
      </div>
    </section>
  );
}