"use client";

import Image from "next/image";
import { motion } from "framer-motion";

type Photo = {
    src: string;
    alt: string;
};

const leftStrip: Photo[] = [
    {
        src: "/images/gallery/couple-gallery-1.webp",
        alt: "Aneena and Loyed",
    },
    {
        src: "/images/gallery/couple-gallery-2.webp",
        alt: "Aneena and Loyed together",
    },
    {
        src: "/images/gallery/couple-gallery-3.webp",
        alt: "Aneena and Loyed",
    },
];

const rightStrip: Photo[] = [
    {
        src: "/images/gallery/couple-gallery-4.webp",
        alt: "Aneena and Loyed",
    },
    {
        src: "/images/gallery/couple-gallery-5.webp",
        alt: "Aneena and Loyed together",
    },
    {
        src: "/images/gallery/couple-gallery-6.webp",
        alt: "Aneena and Loyed",
    },
];

function PageNumber() {
    return (
        <div className="pointer-events-none absolute bottom-4 left-5 right-5 sm:left-8 sm:right-8">
            <div className="flex items-center gap-2.5">
                <div className="flex shrink-0 items-center gap-1.5">
                    <span className="font-serif text-[5px] uppercase tracking-[0.22em] text-[#4e4035]/25">
                        Page
                    </span>

                    <span className="font-serif text-[11px] tracking-[0.12em] text-[#596041]/70">
                        05
                    </span>
                </div>

                <span className="h-px flex-1 bg-[#4e4035]/10" />

                <span className="hidden font-serif text-[6px] uppercase tracking-[0.28em] text-[#4e4035]/25 sm:block">
                    The Wedding Post · Photographs
                </span>

                <span className="h-px flex-1 bg-[#4e4035]/10" />

                <span className="font-serif text-[5px] uppercase tracking-[0.2em] text-[#4e4035]/20">
                    A &amp; L
                </span>
            </div>
        </div>
    );
}

function PhotoStrip({
    photos,
    rotation,
    label,
    side,
}: {
    photos: Photo[];
    rotation: number;
    label: string;
    side: "left" | "right";
}) {
    return (
        <motion.div
            initial={{
                opacity: 0,
                y: 25,
                rotate: rotation + (side === "left" ? -1.5 : 1.5),
            }}
            whileInView={{
                opacity: 1,
                y: 0,
                rotate: rotation,
            }}
            viewport={{
                once: true,
                amount: 0.2,
            }}
            transition={{
                duration: 0.8,
                ease: [0.22, 1, 0.36, 1],
            }}
            whileHover={{
                y: -5,
                rotate: rotation * 0.45,
                transition: {
                    duration: 0.3,
                    ease: "easeOut",
                },
            }}
            className="
                relative
                w-[min(36vw,230px)]
                sm:w-[min(27vw,260px)]
            "
        >
            {/* Soft shadow */}
            <div
                className="
                    absolute
                    inset-0
                    translate-x-2.5
                    translate-y-3
                    rounded-[1px]
                    bg-[#4e4035]/[0.13]
                    blur-[9px]
                "
                aria-hidden="true"
            />

            {/* Secondary paper shadow */}
            <div
                className="
                    absolute
                    inset-0
                    translate-x-[4px]
                    translate-y-[5px]
                    bg-[#4e4035]/[0.08]
                "
                aria-hidden="true"
            />

            {/* Actual Polaroid strip */}
            <div
                className="
                    relative
                    bg-[#f4f0e7]
                    px-[5%]
                    pb-[7%]
                    pt-[5%]
                    shadow-[0_7px_18px_rgba(78,64,53,0.12)]
                "
            >
                {/* Paper grain */}
                <div
                    className="
                        pointer-events-none
                        absolute
                        inset-0
                        opacity-[0.15]
                        mix-blend-multiply
                    "
                    style={{
                        backgroundImage:
                            "radial-gradient(rgba(78,64,53,0.25) 0.4px, transparent 0.6px)",
                        backgroundSize: "3px 3px",
                    }}
                />

                {/* Photos */}
                <div className="relative space-y-[5%]">
                    {photos.map((photo, index) => (
                        <motion.div
                            key={photo.src}
                            initial={{
                                opacity: 0,
                                scale: 0.975,
                            }}
                            whileInView={{
                                opacity: 1,
                                scale: 1,
                            }}
                            viewport={{
                                once: true,
                                amount: 0.3,
                            }}
                            transition={{
                                delay: 0.1 + index * 0.08,
                                duration: 0.5,
                            }}
                            className="
                                relative
                                aspect-[1.22/1]
                                overflow-hidden
                                bg-[#d8c6a9]
                            "
                        >
                            <Image
                                src={photo.src}
                                alt={photo.alt}
                                fill
                                sizes="(max-width: 640px) 30vw, 240px"
                                className="object-cover"
                            />

                            {/* Printed-photo aging */}
                            <div className="pointer-events-none absolute inset-0 bg-[#d8c6a9]/[0.08] mix-blend-multiply" />

                            {/* Fine print grain */}
                            <div
                                className="
                                    pointer-events-none
                                    absolute
                                    inset-0
                                    opacity-[0.07]
                                    mix-blend-screen
                                "
                                style={{
                                    backgroundImage:
                                        "radial-gradient(rgba(255,255,255,0.6) 0.45px, transparent 0.7px)",
                                    backgroundSize: "4px 4px",
                                }}
                            />
                        </motion.div>
                    ))}
                </div>

                {/* Strip caption */}
                <div className="relative mt-[7%] text-center">
                    <div className="mb-1 font-serif text-[5px] uppercase tracking-[0.3em] text-[#4e4035]/55 sm:text-[6px]">
                        The Wedding Of
                    </div>

                    <div
                        className="
                            text-[20px]
                            leading-[0.9]
                            text-[#4e4035]/90
                            sm:text-[24px]
                        "
                        style={{
                            fontFamily: '"Nesta Mastone", cursive',
                        }}
                    >
                        Loyed{" "}
                        <span className="text-[#747a5a]">
                            &amp;
                        </span>{" "}
                        Aneena
                    </div>

                    <div className="mt-1.5 font-serif text-[4px] uppercase tracking-[0.26em] text-[#4e4035]/40 sm:text-[5px]">
                        22 · 11 · 2026
                    </div>
                </div>
            </div>

            {/* Small archival label */}
            <div
                className={`
                    absolute
                    -bottom-6
                    ${side === "left"
                        ? "left-0"
                        : "right-0"
                    }
                    hidden
                    rotate-[-3deg]
                    sm:block
                `}
            >
                <span
                    className="text-[16px] text-[#596041]/65"
                    style={{
                        fontFamily:
                            '"Nesta Mastone", cursive',
                    }}
                >
                    {label}
                </span>
            </div>
        </motion.div>
    );
}

export default function Gallery() {
    return (
        <section
            id="gallery"
            className="
                relative
                overflow-hidden
                bg-[#e9e4da]
                px-5
                pb-20
                pt-14
                sm:px-8
                sm:pb-24
                sm:pt-20
            "
        >
            {/* =====================================================
                CONTINUOUS CRUMPLED PAPER
            ====================================================== */}

            <div className="pointer-events-none absolute inset-0">
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

                <div className="absolute inset-0 bg-[#d8c6a9]/[0.06] mix-blend-multiply" />

                <div
                    className="
                        absolute
                        inset-0
                        opacity-[0.14]
                        mix-blend-multiply
                    "
                    style={{
                        backgroundImage:
                            "radial-gradient(rgba(78,64,53,0.28) 0.45px, transparent 0.65px)",
                        backgroundSize: "3px 3px",
                    }}
                />
            </div>

            {/* =====================================================
                EDITORIAL BACKGROUND
            ====================================================== */}

            {/* Large faded title */}
            <div
                className="
                    pointer-events-none
                    absolute
                    -top-2
                    left-1/2
                    hidden
                    -translate-x-1/2
                    select-none
                    whitespace-nowrap
                    font-serif
                    text-[clamp(80px,17vw,230px)]
                    font-semibold
                    uppercase
                    leading-none
                    tracking-[-0.08em]
                    text-[#4e4035]/[0.025]
                    sm:block
                "
            >
                Photographs
            </div>

            {/* Vertical editorial text */}
            <div
                className="
                    pointer-events-none
                    absolute
                    left-3
                    top-1/2
                    hidden
                    -translate-y-1/2
                    -rotate-90
                    font-serif
                    text-[5px]
                    uppercase
                    tracking-[0.45em]
                    text-[#4e4035]/20
                    lg:block
                "
            >
                A VISUAL ARCHIVE OF TWO PEOPLE BECOMING ONE
            </div>

            <div
                className="
                    pointer-events-none
                    absolute
                    right-3
                    top-1/2
                    hidden
                    translate-y-1/2
                    rotate-90
                    font-serif
                    text-[5px]
                    uppercase
                    tracking-[0.45em]
                    text-[#4e4035]/20
                    lg:block
                "
            >
                22 · 11 · 2026 · PRIVATE COLLECTION
            </div>

            {/* =====================================================
                TOP NEWSPAPER RULE
            ====================================================== */}

            <div className="relative mx-auto mb-8 max-w-5xl sm:mb-11">
                <div className="flex items-center gap-2.5">
                    <span className="font-serif text-[5px] uppercase tracking-[0.28em] text-[#4e4035]/30">
                        Volume 01
                    </span>

                    <span className="h-px flex-1 bg-[#4e4035]/10" />

                    <span className="font-serif text-[5px] uppercase tracking-[0.28em] text-[#4e4035]/30">
                        22 November 2026
                    </span>
                </div>
            </div>

            {/* =====================================================
                HEADER
            ====================================================== */}

            <div className="relative mx-auto mb-10 max-w-5xl sm:mb-13">
                <div className="grid gap-5 md:grid-cols-[1fr_auto] md:items-end">
                    <div>
                        <div className="mb-3 flex items-center gap-2.5">
                            <span className="h-px w-7 bg-[#747a5a]/60" />

                            <span className="font-serif text-[6px] uppercase tracking-[0.32em] text-[#596041]/75">
                                The Gallery
                            </span>
                        </div>

                        <h2
                            className="
                                max-w-2xl
                                text-[clamp(48px,9vw,108px)]
                                leading-[0.74]
                                tracking-[-0.055em]
                                text-[#4e4035]
                            "
                            style={{
                                fontFamily:
                                    '"Nesta Mastone", cursive',
                            }}
                        >
                            A few
                            <br />
                            <span className="ml-[0.35em] text-[#596041]">
                                moments.
                            </span>
                        </h2>
                    </div>

                    <div className="max-w-[205px] border-l border-[#4e4035]/10 pl-3 md:pb-1">
                        <p className="font-serif text-[8px] uppercase leading-[1.7] tracking-[0.17em] text-[#4e4035]/45">
                            Photographs from the little moments
                            that brought us here.
                        </p>
                    </div>
                </div>
            </div>

            {/* =====================================================
                PHOTO STRIPS
            ====================================================== */}

            <div className="relative mx-auto max-w-4xl">
                {/* Faint centre registration mark */}
                <div
                    className="
                        pointer-events-none
                        absolute
                        left-1/2
                        top-1/2
                        hidden
                        h-24
                        w-px
                        -translate-x-1/2
                        -translate-y-1/2
                        bg-[#4e4035]/[0.055]
                        md:block
                    "
                />

                <div className="flex items-start justify-center gap-4 sm:gap-7 md:gap-12">
                    <PhotoStrip
                        photos={leftStrip}
                        rotation={-3.2}
                        label="the beginning"
                        side="left"
                    />

                    <PhotoStrip
                        photos={rightStrip}
                        rotation={3.1}
                        label="and everything after"
                        side="right"
                    />
                </div>

                {/* =================================================
                    HANDWRITTEN NOTE
                ================================================== */}

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
                        delay: 0.3,
                        duration: 0.6,
                    }}
                    className="mt-11 flex justify-center sm:mt-14"
                >
                    <div className="relative max-w-[300px] text-center">
                        <span
                            className="
                                text-[22px]
                                leading-none
                                text-[#596041]/65
                                sm:text-[27px]
                            "
                            style={{
                                fontFamily:
                                    '"Nesta Mastone", cursive',
                            }}
                        >
                            kept for the years ahead
                        </span>

                        <div className="mx-auto mt-2.5 h-px w-12 bg-[#747a5a]/30" />
                    </div>
                </motion.div>
            </div>

            {/* =====================================================
                BOTTOM EDITORIAL DETAILS
            ====================================================== */}

            <div className="relative mx-auto mt-14 max-w-5xl sm:mt-17">
                <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3">
                    <span className="h-px bg-[#4e4035]/10" />

                    <span className="font-serif text-[5px] uppercase tracking-[0.3em] text-[#4e4035]/25">
                        End of photographic archive
                    </span>

                    <span className="h-px bg-[#4e4035]/10" />
                </div>
            </div>

            {/* Page number */}
            <PageNumber />
        </section>
    );
}