"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowDown, Heart } from "lucide-react";

const WEDDING_DATE = new Date("2026-11-22T00:00:00+05:30");

type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

function getTimeLeft(): TimeLeft {
  const difference = WEDDING_DATE.getTime() - Date.now();

  if (difference <= 0) {
    return {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    };
  }

  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference / (1000 * 60)) % 60),
    seconds: Math.floor((difference / 1000) % 60),
  };
}

/* ================================================================
   COUNTDOWN
================================================================ */

function Countdown() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(getTimeLeft);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setTimeLeft(getTimeLeft());
    }, 1000);

    return () => window.clearInterval(interval);
  }, []);

  const items = [
    { value: timeLeft.days, label: "Days" },
    { value: timeLeft.hours, label: "Hours" },
    { value: timeLeft.minutes, label: "Minutes" },
    { value: timeLeft.seconds, label: "Seconds" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay: 0.3 }}
      className="mx-auto mt-7 w-full max-w-[450px] md:mx-0"
    >
      {/* Small handwritten heading */}

      <div className="mb-1 flex items-center justify-center gap-3 md:justify-start">
        <span className="h-px w-6 bg-[#4e4035]/18" />

        <span
          style={{ fontFamily: '"Nesta Mastone", cursive' }}
          className="text-[13px] leading-none text-[#596041]/65"
        >
          Until we meet at the altar
        </span>

        <span className="h-px w-6 bg-[#4e4035]/18" />
      </div>

      {/* Torn paper */}

      <div className="relative mx-auto w-full">
        <img
          src="/countdown-paper.jpg"
          alt=""
          aria-hidden="true"
          className="
          countdown-paper-mask
            pointer-events-none
            absolute
            left-1/2
            top-1/2
            h-[155%]
            w-[145%]
            max-w-none
            -translate-x-1/2
            -translate-y-1/2
            object-fill
            opacity-[0.42]
            mix-blend-multiply
            contrast-[0.75]
            brightness-[1.08]
            sepia-[8%]
          "
          style={{
            WebkitMaskImage: "url('/countdown-paper.jpg')",
            maskImage: "url('/countdown-paper.jpg')",

            WebkitMaskSize: "100% 100%",
            maskSize: "100% 100%",

            WebkitMaskPosition: "center",
            maskPosition: "center",

            WebkitMaskRepeat: "no-repeat",
            maskRepeat: "no-repeat",
          }}
        />

        <div
          className="
            pointer-events-none
            absolute
            left-[8%]
            right-[8%]
            top-[18%]
            bottom-[18%]
            bg-[#eee8dc]/30
            mix-blend-screen
          "
        />

        <div className="relative px-9 py-6 sm:px-11 sm:py-7">
          {/* Top information */}

          <div className="flex items-center justify-between">
            <span
              className="
                font-serif
                text-[5.5px]
                uppercase
                tracking-[0.28em]
                text-[#4e4035]/35
              "
            >
              A &amp; L
            </span>

            <span
              className="
                font-serif
                text-[5.5px]
                uppercase
                tracking-[0.28em]
                text-[#4e4035]/35
              "
            >
              22 · 11 · 2026
            </span>
          </div>

          {/* Divider */}

          <div className="my-2.5 flex items-center gap-2">
            <span className="h-px flex-1 bg-[#4e4035]/9" />

            <span className="text-[5px] text-[#747a5a]/40">✦</span>

            <span className="h-px flex-1 bg-[#4e4035]/9" />
          </div>

          {/* Countdown */}

          <div className="flex items-start">
            {items.map((item, index) => (
              <div key={item.label} className="flex flex-1 items-start">
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    delay: 0.35 + index * 0.06,
                    duration: 0.4,
                  }}
                  className="flex-1 text-center"
                >
                  <span
                    style={{ fontFamily: '"Nesta Mastone", cursive' }}
                    className="
                      block
                      font-[var(--font-nesta)]
                      text-[15px]
                      font-bold
                      leading-[0.9]
                      tracking-[-0.02em]
                      text-[#596041]
                      sm:text-[31px]
                    "
                  >
                    {String(item.value).padStart(2, "0")}
                  </span>

                  <span
                    className="
                      mt-1
                      block
                      font-[var(--font-nesta)]
                      text-[9px]
                      font-normal
                      leading-none
                      tracking-[0.08em]
                      text-[#4e4035]/45
                      sm:text-[10px]
                    "
                  >
                    {item.label}
                  </span>
                </motion.div>

                {index < items.length - 1 && (
                  <span
                    className="
                      mt-0.5
                      h-7
                      border-l
                      border-dotted
                      border-[#4e4035]/12
                    "
                  />
                )}
              </div>
            ))}
          </div>

          {/* Handwritten footer */}

          <div className="mt-2.5 flex items-center gap-2.5">
            <span className="h-px flex-1 bg-[#4e4035]/8" />
            <span className="h-px flex-1 bg-[#4e4035]/8" />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ================================================================
   HERO
================================================================ */

export default function Hero() {
  const scrollToNext = () => {
    document
      .getElementById("our-story")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="
        relative
        min-h-[100svh]
        overflow-hidden
        bg-[#e9e4da]
        px-5
        py-12
        text-[#4e4035]
        sm:px-8
        sm:py-16
      "
    >
      {/* =========================================================
          CRUMPLED PAPER BACKGROUND
      ========================================================== */}

      <div className="pointer-events-none absolute inset-0">
        {/* Actual crumpled paper */}

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

        {/* Warm paper wash */}

        <div className="absolute inset-0 bg-[#eee9df]/48" />

        {/* Slight sand tone */}

        <div className="absolute inset-0 bg-[#d8c6a9]/[0.06] mix-blend-multiply" />

        {/* Paper grain */}

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
          NEWSPAPER EDITORIAL LAYER
          
          Everything here is intentionally subtle.
          The crumpled paper remains the primary visual.
      ========================================================== */}

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* -------------------------------------------------------
            GIANT FADED MASTHEAD
        -------------------------------------------------------- */}

        <div
          className="
            absolute
            left-1/2
            top-[7%]
            -translate-x-1/2
            whitespace-nowrap
            font-serif
            text-[clamp(62px,14vw,180px)]
            font-black
            uppercase
            leading-none
            tracking-[-0.075em]
            text-[#4e4035]/[0.035]
          "
        >
          Wedding Post
        </div>

        {/* -------------------------------------------------------
            TOP NEWSPAPER RULE
        -------------------------------------------------------- */}

        <div
          className="
            absolute
            left-5
            right-5
            top-5
            border-t
            border-[#4e4035]/10
            sm:left-8
            sm:right-8
          "
        />

        <div
          className="
            absolute
            left-5
            right-5
            top-[27px]
            border-t
            border-[#596041]/[0.08]
            sm:left-8
            sm:right-8
          "
        />

        {/* -------------------------------------------------------
            NEWSPAPER HEADER
        -------------------------------------------------------- */}

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
            text-[6px]
            uppercase
            tracking-[0.28em]
            text-[#4e4035]/30
            sm:left-8
            sm:right-8
            sm:text-[7px]
          "
        >
          <span>Special Edition</span>

          <span className="hidden sm:block">
            The Wedding Post · Vol. 01 · No. 01
          </span>

          <span>Kerala · 2026</span>
        </div>

        {/* -------------------------------------------------------
            LEFT VERTICAL NEWSPAPER MARK
        -------------------------------------------------------- */}

        <div
          className="
            absolute
            left-2
            top-1/2
            hidden
            -translate-y-1/2
            -rotate-90
            items-center
            gap-3
            lg:flex
          "
        >
          <span className="h-px w-8 bg-[#4e4035]/15" />

          <span className="font-serif text-[6px] uppercase tracking-[0.35em] text-[#4e4035]/25">
            A story in the making
          </span>

          <span className="h-px w-8 bg-[#4e4035]/15" />
        </div>

        {/* -------------------------------------------------------
            RIGHT VERTICAL ISSUE MARK
        -------------------------------------------------------- */}

        <div
          className="
            absolute
            right-2
            top-1/2
            hidden
            translate-y-1/2
            rotate-90
            items-center
            gap-3
            lg:flex
          "
        >
          <span className="font-serif text-[6px] uppercase tracking-[0.35em] text-[#4e4035]/25">
            22 November 2026
          </span>

          <span className="h-px w-8 bg-[#4e4035]/15" />
        </div>

        {/* -------------------------------------------------------
            FAINT NEWSPAPER COLUMN RULES
        -------------------------------------------------------- */}

        <div
          className="
            absolute
            bottom-16
            left-[12%]
            top-16
            hidden
            w-px
            bg-[#4e4035]/[0.045]
            lg:block
          "
        />

        <div
          className="
            absolute
            bottom-16
            right-[12%]
            top-16
            hidden
            w-px
            bg-[#4e4035]/[0.045]
            lg:block
          "
        />

        {/* -------------------------------------------------------
            FAINT EDITORIAL TEXT - LEFT
        -------------------------------------------------------- */}

        <div
          className="
            absolute
            bottom-[13%]
            left-[5%]
            hidden
            w-[115px]
            rotate-[-90deg]
            origin-left
            font-serif
            text-[5px]
            uppercase
            leading-[1.8]
            tracking-[0.18em]
            text-[#4e4035]/[0.12]
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

        {/* -------------------------------------------------------
            FAINT EDITORIAL TEXT - RIGHT
        -------------------------------------------------------- */}

        <div
          className="
            absolute
            right-[5%]
            top-[31%]
            hidden
            w-[120px]
            rotate-90
            origin-right
            font-serif
            text-[5px]
            uppercase
            leading-[1.8]
            tracking-[0.18em]
            text-[#4e4035]/[0.12]
            lg:block
          "
        >
          <p>
            A new chapter
            <br />
            begins here
            <br />
            Kerala
            <br />
            2026
          </p>
        </div>

        {/* -------------------------------------------------------
            LITTLE EDITORIAL STARS
        -------------------------------------------------------- */}

        <span className="absolute left-[9%] top-[19%] font-serif text-[10px] text-[#596041]/[0.18]">
          ✦
        </span>

        <span className="absolute right-[10%] bottom-[21%] font-serif text-[9px] text-[#596041]/[0.16]">
          ✦
        </span>

        {/* -------------------------------------------------------
            BOTTOM NEWSPAPER RULE
        -------------------------------------------------------- */}

        <div
          className="
            absolute
            bottom-9
            left-5
            right-5
            border-t
            border-[#4e4035]/10
            sm:left-8
            sm:right-8
          "
        />
      </div>

      {/* =========================================================
          SUBTLE BOTANICAL DETAIL
      ========================================================== */}

      <div className="pointer-events-none absolute -right-24 -top-20 opacity-[0.09]">
        <svg
          width="320"
          height="320"
          viewBox="0 0 300 300"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M290 15C226 67 179 124 126 187C83 237 48 267 10 286"
            stroke="#596041"
            strokeWidth="1.1"
          />

          <path
            d="M231 62C249 41 270 27 291 18"
            stroke="#596041"
            strokeWidth="1"
          />

          <path
            d="M204 96C182 76 164 67 145 63"
            stroke="#596041"
            strokeWidth="1"
          />

          <path
            d="M172 133C194 124 211 123 229 127"
            stroke="#596041"
            strokeWidth="1"
          />

          <path
            d="M140 171C120 157 101 151 84 151"
            stroke="#596041"
            strokeWidth="1"
          />

          <path
            d="M106 211C127 204 144 205 160 212"
            stroke="#596041"
            strokeWidth="1"
          />
        </svg>
      </div>

      {/* =========================================================
          MAIN CONTENT
      ========================================================== */}

      <div className="relative z-10 mx-auto flex min-h-[calc(100svh-6rem)] w-full max-w-5xl items-center">
        <div
          className="
            grid
            w-full
            items-center
            gap-9
            md:grid-cols-[0.8fr_1.2fr]
            md:gap-12
            lg:grid-cols-[0.78fr_1.22fr]
            lg:gap-16
          "
        >
          {/* =====================================================
              CHILDHOOD PHOTO
          ====================================================== */}

          <motion.div
            initial={{
              opacity: 0,
              y: 18,
              rotate: -2,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
              rotate: -1.5,
            }}
            viewport={{
              once: true,
              amount: 0.3,
            }}
            transition={{
              duration: 0.85,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="mx-auto w-full max-w-[245px] sm:max-w-[270px]"
          >
            {/* Editorial photo label */}

            <div className="mb-3 flex items-center gap-3">
              <span className="h-px w-7 bg-[#4e4035]/25" />

              <span className="font-serif text-[7px] uppercase tracking-[0.3em] text-[#4e4035]/45">
                From the beginning
              </span>

              <span className="ml-auto font-serif text-[6px] uppercase tracking-[0.2em] text-[#596041]/40">
                Fig. 01
              </span>
            </div>

            <div className="relative">
              {/* Back paper */}

              <div
                className="
                  absolute
                  inset-0
                  translate-x-[-7px]
                  translate-y-[7px]
                  rotate-[4deg]
                  bg-[#ddd6ca]/75
                "
              />

              {/* Photograph */}

              <div
                className="
                  relative
                  bg-[#f4efe6]
                  p-2.5
                  pb-8
                  shadow-[0_12px_28px_rgba(78,64,53,0.13)]
                "
              >
                <div className="relative overflow-hidden bg-[#d5cec3]">
                  <img
                    src="/hero-cropped.jpeg"
                    alt="A childhood photograph of Aneena and Loyed"
                    className="
                      aspect-[4/5]
                      w-full
                      object-cover
                      object-center
                      grayscale-[48%]
                      sepia-[12%]
                      contrast-[0.88]
                      brightness-[0.94]
                    "
                  />

                  <div className="pointer-events-none absolute inset-0 bg-[#747a5a]/[0.06] mix-blend-multiply" />

                  <div
                    className="
                      pointer-events-none
                      absolute
                      inset-0
                      opacity-25
                      mix-blend-multiply
                      [background-image:
                        radial-gradient(
                          rgba(78,64,53,0.32) 0.5px,
                          transparent 0.7px
                        )
                      ]
                      [background-size:3px_3px]
                    "
                  />
                </div>

                <p
                  style={{ fontFamily: '"Nesta Mastone", cursive' }}
                  className="
                    absolute
                    bottom-1
                    left-0
                    right-0
                    text-center
                    text-[18px]
                    text-[#4e4035]/60
                  "
                >
                  Loyed &amp; Aneena
                </p>
              </div>

              {/* Tape */}

              <div
                className="
                  absolute
                  -right-4
                  -top-3
                  h-8
                  w-16
                  rotate-[29deg]
                  bg-[#d8c6a9]/40
                  shadow-sm
                "
              />

              {/* Small newspaper caption */}

              <span
                className="
                  absolute
                  -bottom-6
                  left-0
                  font-serif
                  text-[6px]
                  uppercase
                  tracking-[0.18em]
                  text-[#4e4035]/30
                "
              >
                Archive · A &amp; L
              </span>
            </div>
          </motion.div>

          {/* =====================================================
              MAIN HERO
          ====================================================== */}

          <motion.div
            initial={{
              opacity: 0,
              y: 20,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
              amount: 0.3,
            }}
            transition={{
              duration: 0.9,
              delay: 0.12,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="text-center md:text-left"
          >
            {/* Newspaper-style section heading */}

            <div className="flex items-center justify-center gap-3 md:justify-start">
              <span className="h-px w-8 bg-[#4e4035]/25" />

              <span className="font-serif text-[8px] uppercase tracking-[0.34em] text-[#4e4035]/45">
                Our beginning
              </span>

              <span className="font-serif text-[6px] uppercase tracking-[0.18em] text-[#596041]/35">
                No. 01
              </span>
            </div>

            {/* Date */}

            <p
              className="
                mt-5
                font-serif
                text-[9px]
                uppercase
                tracking-[0.3em]
                text-[#4e4035]/45
              "
            >
              22 · 11 · 2026
            </p>

            {/* Small newspaper headline */}

            <div className="mt-2 flex items-center justify-center gap-2 md:justify-start">
              <span className="font-serif text-[6px] uppercase tracking-[0.25em] text-[#596041]/40 mb-3">
                A special edition
              </span>

              <span className="h-px w-5 bg-[#596041]/20" />

              <span className="font-serif text-[6px] uppercase tracking-[0.25em] text-[#596041]/40">
                Kerala
              </span>
            </div>

            {/* =================================================
                MAIN TITLE
            ================================================== */}

            <h1
              style={{ fontFamily: '"Nesta Mastone", cursive' }}
              className="
                mt-4
                font-[var(--font-nesta)]
                text-[48px]
                font-normal
                leading-[0.82]
                tracking-[-0.025em]
                text-[#4e4035]
                sm:text-[82px]
                lg:text-[98px]
              "
            >
              Loyed
              <span className="mx-2 text-[30px] text-[#747a5a]/75 sm:mx-3">
                &amp;
              </span>
              Aneena
            </h1>

            {/* Divider */}

            <div className="mt-5 flex items-center justify-center gap-3 md:justify-start">
              <span className="h-px w-10 bg-[#4e4035]/20" />

              <Heart
                size={10}
                strokeWidth={1}
                fill="currentColor"
                className="text-[#747a5a]/60"
              />

              <span className="h-px w-10 bg-[#4e4035]/20" />
            </div>

            {/* Countdown */}

            <Countdown />

            {/* Small newspaper footer */}

            <div className="mt-6 flex items-center justify-center gap-3 md:justify-start">
              <span className="font-serif text-[6px] uppercase tracking-[0.24em] text-[#4e4035]/25">
                The Wedding Post
              </span>

              <span className="h-px w-5 bg-[#4e4035]/15" />

              <span className="font-serif text-[6px] uppercase tracking-[0.24em] text-[#4e4035]/25">
                Est. 2026
              </span>
            </div>

            {/* Scroll */}
          </motion.div>
        </div>
      </div>

      {/* =========================================================
    PAGE FOOTER
========================================================= */}

      <div
        className="
    pointer-events-none
    absolute
    bottom-5
    left-5
    right-5
    z-30
    sm:left-8
    sm:right-8
  "
      >
        <div className="flex items-center gap-3">
          {/* Page number */}

          <div className="flex shrink-0 items-center gap-2">
            <span
              className="
          font-serif
          text-[6px]
          uppercase
          tracking-[0.22em]
          text-[#4e4035]/25
        "
            >
              Page
            </span>

            <span
              className="
          font-serif
          text-[10px]
          tracking-[0.12em]
          text-[#596041]/50
        "
            >
              01
            </span>
          </div>

          {/* Left rule */}

          <span className="h-px flex-1 bg-[#4e4035]/10" />

          {/* Publication label */}

          <span
            className="
        hidden
        font-serif
        text-[7px]
        uppercase
        tracking-[0.3em]
        text-[#4e4035]/25
        sm:block
      "
          >
            A &amp; L · Special Edition
          </span>

          {/* Right rule */}

          <span className="h-px flex-1 bg-[#4e4035]/10" />

          {/* Year */}

          <span
            className="
        shrink-0
        font-serif
        text-[6px]
        uppercase
        tracking-[0.2em]
        text-[#4e4035]/20
      "
          >
            2026
          </span>
        </div>
      </div>
    </section>
  );
}