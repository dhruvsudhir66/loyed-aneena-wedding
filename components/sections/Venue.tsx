"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const details = {
    date: "22 November 2026",
    time: "4:00 PM",
    venue: "Venue Name",
    address: "Full venue address, Ernakulam, Kerala",
    mapsUrl: "YOUR_GOOGLE_MAPS_LINK",
};

function LocationDoodle() {
    return (
        <svg
            viewBox="0 0 90 110"
            fill="none"
            className="h-14 w-12 text-[#747a5a]"
            aria-hidden="true"
        >
            <path
                d="M45 8C26 8 14 22 14 40c0 24 31 56 31 56s31-32 31-56C76 22 64 8 45 8Z"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <circle
                cx="45"
                cy="39"
                r="11"
                stroke="currentColor"
                strokeWidth="1.4"
            />
            <path
                d="M24 100c13 5 29 5 42 0"
                stroke="currentColor"
                strokeWidth="1"
                strokeLinecap="round"
                strokeDasharray="2 4"
            />
        </svg>
    );
}

export default function Venue() {
    return (
        <section
            id="venue"
            className="relative overflow-hidden bg-[#e9e4da] px-6 py-14 text-[#4e4035] sm:py-16"
        >
            {/* PAPER */}
            <div className="pointer-events-none absolute inset-0">
                <div
                    className="absolute inset-0 bg-[url('/crumpled-paper.jpg')] bg-repeat"
                    style={{ backgroundSize: "900px auto" }}
                />

                <div className="absolute inset-0 bg-[#eee9df]/48" />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.65 }}
                className="relative mx-auto max-w-lg text-center"
            >
                {/* LABEL */}
                <p className="font-serif text-[7px] uppercase tracking-[0.35em] text-[#747a5a]">
                    The wedding
                </p>

                {/* TITLE */}
                <h2
                    className="mt-3 text-[46px] leading-[0.9] text-[#4e4035] sm:text-[58px]"
                    style={{ fontFamily: '"Nesta Mastone", cursive' }}
                >
                    Where &amp; when
                </h2>

                {/* LOCATION DOODLE */}
                <div className="mt-4 flex justify-center">
                    <LocationDoodle />
                </div>

                {/* DATE */}
                <p className="mt-3 font-serif text-[9px] uppercase tracking-[0.2em] text-[#4e4035]/60">
                    {details.date}
                    <span className="mx-2 text-[#747a5a]">·</span>
                    {details.time}
                </p>

                {/* DIVIDER */}
                <div className="mx-auto my-5 h-px w-12 bg-[#4e4035]/15" />

                {/* VENUE */}
                <h3 className="font-serif text-[19px] text-[#4e4035] sm:text-[21px]">
                    {details.venue}
                </h3>

                <p className="mx-auto mt-1.5 max-w-[270px] font-serif text-[10px] leading-5 text-[#4e4035]/55">
                    {details.address}
                </p>

                {/* MAP LINK */}
                <a
                    href={details.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="
                        mt-5
                        inline-flex
                        items-center
                        gap-1.5
                        border-b
                        border-[#596041]/35
                        pb-1.5
                        font-serif
                        text-[8px]
                        uppercase
                        tracking-[0.2em]
                        text-[#596041]
                        transition-colors
                        hover:border-[#596041]
                    "
                >
                    Get directions
                    <ArrowUpRight size={12} strokeWidth={1.3} />
                </a>

                {/* SMALL HANDWRITTEN NOTE */}
                <p
                    className="mt-5 text-[19px] text-[#747a5a]/70"
                    style={{ fontFamily: '"Nesta Mastone", cursive' }}
                >
                    see you there!
                </p>

                {/* PAGE NUMBER */}
                <div className="mt-9 flex items-center gap-2.5">
                    <div className="flex items-center gap-1.5">
                        <span className="font-serif text-[5px] uppercase tracking-[0.2em] text-[#4e4035]/25">
                            Page
                        </span>

                        <span className="font-serif text-[10px] tracking-[0.1em] text-[#596041]/80">
                            05
                        </span>
                    </div>

                    <span className="h-px flex-1 bg-[#4e4035]/10" />

                    <span className="font-serif text-[6px] uppercase tracking-[0.25em] text-[#4e4035]/25">
                        A &amp; L · Venue
                    </span>

                    <span className="h-px flex-1 bg-[#4e4035]/10" />

                    <span className="font-serif text-[5px] uppercase tracking-[0.18em] text-[#4e4035]/20">
                        2026
                    </span>
                </div>
            </motion.div>
        </section>
    );
}