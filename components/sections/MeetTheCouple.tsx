"use client";

import { motion } from "framer-motion";
import { Heart, Sparkles } from "lucide-react";
import PaperSeam from "../PaperSeam";

type PersonProps = {
    name: string;
    role: string;
    image: string;
    page: string;
    eyebrow: string;
    description: string;
    details: {
        label: string;
        value: string;
    }[];
    note: string;
};

function PageNumber({
    number,
    label,
}: {
    number: string;
    label: string;
}) {
    return (
        <div className="pointer-events-none absolute bottom-5 left-5 right-5 sm:left-8 sm:right-8">
            <div className="flex items-center gap-3">
                <div className="flex shrink-0 items-center gap-2">
                    <span className="font-serif text-[6px] uppercase tracking-[0.22em] text-[#4e4035]/25">
                        Page
                    </span>

                    <span className="font-serif text-[11px] tracking-[0.12em] text-[#596041]/70">
                        {number}
                    </span>
                </div>

                <span className="h-px flex-1 bg-[#4e4035]/10" />

                <span className="hidden font-serif text-[7px] uppercase tracking-[0.3em] text-[#4e4035]/25 sm:block">
                    {label}
                </span>

                <span className="h-px flex-1 bg-[#4e4035]/10" />

                <span className="font-serif text-[6px] uppercase tracking-[0.2em] text-[#4e4035]/20">
                    A &amp; L
                </span>
            </div>
        </div>
    );
}

function Botanical({
    flip = false,
}: {
    flip?: boolean;
}) {
    return (
        <svg
            viewBox="0 0 260 340"
            fill="none"
            className={`h-auto w-[210px] sm:w-[250px] ${flip ? "-scale-x-100" : ""
                }`}
            aria-hidden="true"
        >
            <path
                d="M240 10C191 61 158 108 126 158C92 212 61 267 14 325"
                stroke="#596041"
                strokeWidth="1"
            />

            <path
                d="M199 56C216 40 230 28 245 19"
                stroke="#596041"
                strokeWidth="0.9"
            />

            <path
                d="M171 90C151 74 135 68 116 66"
                stroke="#596041"
                strokeWidth="0.9"
            />

            <path
                d="M145 132C164 123 180 122 196 126"
                stroke="#596041"
                strokeWidth="0.9"
            />

            <path
                d="M112 182C94 169 78 165 60 167"
                stroke="#596041"
                strokeWidth="0.9"
            />

            <path
                d="M80 235C96 228 111 230 125 237"
                stroke="#596041"
                strokeWidth="0.9"
            />

            <path
                d="M53 277C66 272 78 274 88 280"
                stroke="#596041"
                strokeWidth="0.9"
            />
        </svg>
    );
}

/* ============================================================
   PERSON SPREAD
============================================================ */

function PersonSpread({
    name,
    role,
    image,
    page,
    eyebrow,
    description,
    details,
    note,
}: PersonProps) {
    const isBride = role === "The Bride";

    return (
        <section
            className="
        relative
        overflow-hidden
        bg-[#e9e4da]
        px-5
        pb-20
        pt-16
        text-[#4e4035]
        sm:px-8
        sm:pb-24
        sm:pt-20
      "
        >
            {/* ========================================================
          LOCAL PAPER SURFACE
      ======================================================== */}

            <div className="pointer-events-none absolute inset-0">
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

            {/* ========================================================
          EDITORIAL ATMOSPHERE
      ======================================================== */}

            <div className="pointer-events-none absolute inset-0">
                {/* Giant background word */}

                <div
                    className="
            absolute
            left-1/2
            top-[4%]
            -translate-x-1/2
            whitespace-nowrap
            font-serif
            text-[clamp(80px,18vw,210px)]
            font-black
            uppercase
            leading-none
            tracking-[-0.08em]
            text-[#4e4035]/[0.035]
          "
                >
                    {isBride ? "Bride" : "Groom"}
                </div>

                {/* Newspaper vertical rules */}

                <div className="absolute bottom-14 left-[9%] top-14 hidden w-px bg-[#4e4035]/[0.055] lg:block" />

                <div className="absolute bottom-14 right-[9%] top-14 hidden w-px bg-[#4e4035]/[0.055] lg:block" />

                {/* Editorial vertical text */}

                <div
                    className="
            absolute
            left-[2.5%]
            top-[42%]
            hidden
            -rotate-90
            font-serif
            text-[5px]
            uppercase
            tracking-[0.3em]
            text-[#4e4035]/[0.18]
            lg:block
          "
                >
                    {isBride
                        ? "Portrait of the bride · archive no. 03"
                        : "Portrait of the groom · archive no. 04"}
                </div>

                <div
                    className="
            absolute
            right-[2.5%]
            bottom-[28%]
            hidden
            rotate-90
            font-serif
            text-[5px]
            uppercase
            tracking-[0.3em]
            text-[#4e4035]/[0.18]
            lg:block
          "
                >
                    Kerala · 2026 · The Wedding Post
                </div>

                {/* Small registration marks */}

                <span className="absolute left-[8%] top-12 h-3 w-3 border-l border-t border-[#4e4035]/10" />

                <span className="absolute right-[8%] top-12 h-3 w-3 border-r border-t border-[#4e4035]/10" />
            </div>

            {/* ========================================================
          BOTANICAL DETAIL
      ======================================================== */}

            <div
                className={`pointer-events-none absolute ${isBride ? "-right-16 top-[13%]" : "-left-16 bottom-[10%]"
                    } opacity-[0.09]`}
            >
                <Botanical flip={!isBride} />
            </div>

            {/* ========================================================
          TOP EDITORIAL HEADER
      ======================================================== */}

            <div className="relative z-10 mx-auto mb-12 max-w-6xl sm:mb-16">
                <div className="flex items-center gap-3">
                    <span className="font-serif text-[6px] uppercase tracking-[0.3em] text-[#4e4035]/30">
                        Volume 01
                    </span>

                    <span className="h-px flex-1 bg-[#4e4035]/10" />

                    <span className="font-serif text-[6px] uppercase tracking-[0.3em] text-[#4e4035]/30">
                        Personal Archive
                    </span>

                    <span className="h-px w-16 bg-[#4e4035]/10" />

                    <span className="font-serif text-[6px] uppercase tracking-[0.3em] text-[#596041]/55">
                        {page}
                    </span>
                </div>
            </div>

            {/* ========================================================
          MAIN CONTENT
      ======================================================== */}

            <div className="relative z-10 mx-auto w-full max-w-6xl">
                <div
                    className={`
            grid
            items-center
            gap-10
            lg:grid-cols-[0.92fr_1.08fr]
            lg:gap-16
            ${isBride ? "" : "lg:grid-cols-[1.08fr_0.92fr]"}
          `}
                >
                    {/* ====================================================
              IMAGE
          ==================================================== */}

                    <motion.div
                        initial={{
                            opacity: 0,
                            x: isBride ? -35 : 35,
                            rotate: isBride ? -2 : 2,
                        }}
                        whileInView={{
                            opacity: 1,
                            x: 0,
                            rotate: isBride ? -1.2 : 1.2,
                        }}
                        viewport={{
                            once: true,
                            amount: 0.2,
                        }}
                        transition={{
                            duration: 0.9,
                            ease: [0.22, 1, 0.36, 1],
                        }}
                        className={`
              relative
              mx-auto
              w-full
              max-w-[300px]
              ${isBride ? "lg:order-1" : "lg:order-2"}
            `}
                    >
                        {/* Back paper layer */}

                        <div
                            className={`
                absolute
                inset-0
                bg-[#d8c6a9]/35
                ${isBride
                                    ? "translate-x-3 translate-y-4 rotate-[3deg]"
                                    : "-translate-x-3 translate-y-4 rotate-[-3deg]"
                                }
              `}
                        />

                        {/* Olive archival layer */}

                        <div
                            className={`
                absolute
                inset-0
                bg-[#747a5a]/[0.10]
                ${isBride
                                    ? "-translate-x-2 translate-y-2 rotate-[-2deg]"
                                    : "translate-x-2 translate-y-2 rotate-[2deg]"
                                }
              `}
                        />

                        {/* Main photograph */}

                        <div className="relative bg-[#f2eee5] p-2.5 pb-10 shadow-[0_14px_30px_rgba(78,64,53,0.13)] sm:p-3 sm:pb-11">
                            <div className="relative aspect-[4/5] overflow-hidden bg-[#d5cec3]">
                                <img
                                    src={image}
                                    alt={name}
                                    className="
                    h-full
                    w-full
                    object-cover
                    grayscale-[32%]
                    sepia-[10%]
                    contrast-[0.92]
                    brightness-[0.96]
                    transition-transform
                    duration-1000
                    hover:scale-[1.025]
                  "
                                />

                                {/* Olive wash */}

                                <div className="pointer-events-none absolute inset-0 bg-[#747a5a]/[0.08] mix-blend-color" />

                                {/* Warm paper wash */}

                                <div className="pointer-events-none absolute inset-0 bg-[#d8c6a9]/[0.10] mix-blend-soft-light" />

                                {/* Photo grain */}

                                <div
                                    className="
                    pointer-events-none
                    absolute
                    inset-0
                    opacity-[0.18]
                    mix-blend-overlay
                  "
                                    style={{
                                        backgroundImage:
                                            "radial-gradient(rgba(255,255,255,0.45) 0.5px, transparent 0.6px)",
                                        backgroundSize: "3px 3px",
                                    }}
                                />

                                {/* Photo metadata */}

                                <span
                                    className="
                    absolute
                    bottom-2.5
                    left-2.5
                    font-serif
                    text-[6px]
                    uppercase
                    tracking-[0.2em]
                    text-white/70
                    drop-shadow-[0_1px_2px_rgba(0,0,0,0.25)]
                  "
                                >
                                    Fig. {isBride ? "03" : "04"} · Portrait
                                </span>
                            </div>

                            {/* Handwritten name */}

                            <div className="absolute bottom-1.5 left-0 right-0 text-center">
                                <p
                                    style={{
                                        fontFamily: '"Nesta Mastone", cursive',
                                    }}
                                    className="text-[24px] leading-none text-[#4e4035]/70 sm:text-[27px]"
                                >
                                    {name}
                                </p>
                            </div>
                        </div>

                        {/* Tape */}

                        <div
                            className={`
                absolute
                top-[-12px]
                z-20
                h-7
                w-16
                bg-[#d8c6a9]/45
                ${isBride
                                    ? "right-[-13px] rotate-[25deg]"
                                    : "left-[-13px] rotate-[-25deg]"
                                }
              `}
                        />

                        {/* Archive label */}

                        <div
                            className={`
                absolute
                -bottom-6
                ${isBride ? "left-1" : "right-1"
                                }
                font-serif
                text-[6px]
                uppercase
                tracking-[0.22em]
                text-[#4e4035]/35
              `}
                        >
                            Archive · A &amp; L · {page}
                        </div>
                    </motion.div>

                    {/* ====================================================
              PROFILE
          ==================================================== */}

                    <motion.div
                        initial={{
                            opacity: 0,
                            y: 25,
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
                            duration: 0.9,
                            delay: 0.12,
                            ease: [0.22, 1, 0.36, 1],
                        }}
                        className={`
              ${isBride ? "lg:order-2" : "lg:order-1"}
            `}
                    >
                        {/* Section label */}

                        <div className="flex items-center gap-3">
                            <span className="h-px w-9 bg-[#4e4035]/25" />

                            <span className="font-serif text-[7px] uppercase tracking-[0.35em] text-[#596041]/70">
                                {eyebrow}
                            </span>

                            <span className="font-serif text-[6px] uppercase tracking-[0.2em] text-[#4e4035]/35">
                                No. {page}
                            </span>
                        </div>

                        {/* Role */}

                        <p className="mt-6 font-serif text-[8px] uppercase tracking-[0.34em] text-[#4e4035]/45">
                            {role}
                        </p>

                        {/* Name */}

                        <h2
                            style={{
                                fontFamily: '"Nesta Mastone", cursive',
                            }}
                            className="
                mt-2
                text-[62px]
                leading-[0.82]
                tracking-[-0.025em]
                text-[#4e4035]
                sm:text-[82px]
                lg:text-[92px]
              "
                        >
                            {name}
                        </h2>

                        {/* Editorial divider */}

                        <div className="mt-6 flex items-center gap-3">
                            <span className="h-px w-12 bg-[#4e4035]/20" />

                            <Heart
                                size={9}
                                strokeWidth={1}
                                fill="currentColor"
                                className="text-[#747a5a]/60"
                            />

                            <span className="h-px w-12 bg-[#4e4035]/20" />
                        </div>

                        {/* Description */}

                        <p className="mt-7 max-w-[470px] font-serif text-[13px] leading-[1.9] text-[#4e4035]/68 sm:text-[14px]">
                            {description}
                        </p>

                        {/* ==================================================
                DETAILS
            ================================================== */}

                        <div className="mt-8 max-w-[470px] border-y border-[#4e4035]/10">
                            {details.map((detail, index) => (
                                <div
                                    key={detail.label}
                                    className={`
                    grid
                    grid-cols-[90px_1fr]
                    gap-5
                    py-3
                    ${index !== details.length - 1
                                            ? "border-b border-[#4e4035]/[0.07]"
                                            : ""
                                        }
                  `}
                                >
                                    <span className="font-serif text-[6px] uppercase tracking-[0.22em] text-[#596041]/60">
                                        {detail.label}
                                    </span>

                                    <span className="font-serif text-[9px] uppercase tracking-[0.13em] text-[#4e4035]/60">
                                        {detail.value}
                                    </span>
                                </div>
                            ))}
                        </div>

                        {/* ==================================================
                HANDWRITTEN NOTE
            ================================================== */}

                        <div className="mt-8 flex items-start gap-4">
                            <Sparkles
                                size={12}
                                strokeWidth={1}
                                className="mt-1 shrink-0 text-[#747a5a]/60"
                            />

                            <p
                                style={{
                                    fontFamily: '"Nesta Mastone", cursive',
                                }}
                                className="
                  max-w-[400px]
                  text-[21px]
                  leading-[1.15]
                  text-[#596041]/75
                  sm:text-[24px]
                "
                            >
                                {note}
                            </p>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Page footer */}

            <PageNumber
                number={page}
                label={
                    isBride
                        ? "Meet the Bride · The Wedding Post"
                        : "Meet the Groom · The Wedding Post"
                }
            />
        </section>
    );
}

/* ================================================================
   MAIN COMPONENT
================================================================ */

export default function MeetTheCouple() {
    return (
        <div
            id="meet-the-couple"
            className="relative overflow-hidden bg-[#e9e4da] text-[#4e4035]"
        >
            {/* ==========================================================
          BRIDE
      ========================================================== */}

            <PersonSpread
                name="Aneena"
                role="The Bride"
                image="/images/aneena.jpeg"
                page="02"
                eyebrow="Meet the bride"
                description="A short introduction about Aneena goes here. Tell the story in your own voice: the little things she loves, the people who know her best, and the details that make her unmistakably herself."
                details={[
                    {
                        label: "Known for",
                        value: "Her own little things",
                    },
                    {
                        label: "Favourite",
                        value: "Add something personal",
                    },
                    {
                        label: "Always",
                        value: "Add a meaningful detail",
                    },
                ]}
                note="She brings a little warmth into ordinary days."
            />

            <PaperSeam />

            {/* ==========================================================
          GROOM
      ========================================================== */}

            <PersonSpread
                name="Loyed"
                role="The Groom"
                image="/images/loyed.jpeg"
                page="03"
                eyebrow="Meet the groom"
                description="A short introduction about Loyed goes here. Add the little details that feel like him: what he enjoys, what his family would say about him, and the qualities that make his story his own."
                details={[
                    {
                        label: "Known for",
                        value: "His own little things",
                    },
                    {
                        label: "Favourite",
                        value: "Add something personal",
                    },
                    {
                        label: "Always",
                        value: "Add a meaningful detail",
                    },
                ]}
                note="He makes the familiar feel like something worth remembering."
            />
        </div>
    );
}