"use client";

import { FormEvent, useState } from "react";
import { motion } from "framer-motion";
import { Check, Heart, LoaderCircle } from "lucide-react";

type RSVPStatus = "idle" | "loading" | "success" | "error";

export default function RSVP() {
    const [status, setStatus] = useState<RSVPStatus>("idle");
    const [message, setMessage] = useState("");

    async function submit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

        setStatus("loading");
        setMessage("");

        const form = new FormData(e.currentTarget);
        const payload = Object.fromEntries(form.entries());

        try {
            const response = await fetch("/api/rsvp", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Something went wrong.");
            }

            setStatus("success");
            setMessage(data.message || "Thank you — your RSVP is in.");

            e.currentTarget.reset();
        } catch (error) {
            setStatus("error");
            setMessage(
                error instanceof Error
                    ? error.message
                    : "Unable to submit RSVP.",
            );
        }
    }

    return (
        <section
            id="rsvp"
            className="
        relative
        overflow-hidden
        bg-[#e9e4da]
        px-5
        pb-24
        pt-20
        text-[#4e4035]
        sm:px-8
        sm:pb-28
        sm:pt-24
      "
        >
            {/* =========================================================
          CONTINUOUS PAPER
      ========================================================== */}

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

            {/* =========================================================
          EDITORIAL BACKGROUND
      ========================================================== */}

            <div className="pointer-events-none absolute inset-0">
                <div
                    className="
            absolute
            left-1/2
            top-[4%]
            -translate-x-1/2
            whitespace-nowrap
            font-serif
            text-[clamp(90px,19vw,230px)]
            font-black
            uppercase
            leading-none
            tracking-[-0.08em]
            text-[#4e4035]/[0.028]
          "
                >
                    RSVP
                </div>

                <div className="absolute bottom-16 left-[9%] top-16 hidden w-px bg-[#4e4035]/[0.055] lg:block" />

                <div className="absolute bottom-16 right-[9%] top-16 hidden w-px bg-[#4e4035]/[0.055] lg:block" />

                <div
                    className="
            absolute
            left-[2.5%]
            top-1/2
            hidden
            -translate-y-1/2
            -rotate-90
            font-serif
            text-[5px]
            uppercase
            tracking-[0.35em]
            text-[#4e4035]/[0.18]
            lg:block
          "
                >
                    A PERSONAL NOTE · RESPONSE CARD · 22 NOVEMBER 2026
                </div>

                <div
                    className="
            absolute
            right-[2.5%]
            top-1/2
            hidden
            translate-y-1/2
            rotate-90
            font-serif
            text-[5px]
            uppercase
            tracking-[0.35em]
            text-[#4e4035]/[0.18]
            lg:block
          "
                >
                    THE WEDDING POST · A &amp; L
                </div>
            </div>

            {/* =========================================================
          TOP EDITORIAL HEADER
      ========================================================== */}

            <div className="relative z-10 mx-auto mb-12 max-w-6xl sm:mb-16">
                <div className="flex items-center gap-3">
                    <span className="font-serif text-[6px] uppercase tracking-[0.3em] text-[#4e4035]/30">
                        Volume 01
                    </span>

                    <span className="h-px flex-1 bg-[#4e4035]/10" />

                    <span className="font-serif text-[6px] uppercase tracking-[0.3em] text-[#4e4035]/30">
                        Response Card
                    </span>

                    <span className="h-px w-12 bg-[#4e4035]/10" />

                    <span className="font-serif text-[6px] uppercase tracking-[0.3em] text-[#596041]/60">
                        06
                    </span>
                </div>
            </div>

            {/* =========================================================
          MAIN CONTENT
      ========================================================== */}

            <div className="relative z-10 mx-auto max-w-6xl">
                <div className="grid items-start gap-12 lg:grid-cols-[0.75fr_1.25fr] lg:gap-20">
                    {/* =====================================================
              LEFT SIDE
          ===================================================== */}

                    <motion.div
                        initial={{
                            opacity: 0,
                            x: -25,
                        }}
                        whileInView={{
                            opacity: 1,
                            x: 0,
                        }}
                        viewport={{
                            once: true,
                            amount: 0.2,
                        }}
                        transition={{
                            duration: 0.8,
                            ease: [0.22, 1, 0.36, 1],
                        }}
                        className="lg:sticky lg:top-28"
                    >
                        <div className="flex items-center gap-3">
                            <span className="h-px w-9 bg-[#4e4035]/25" />

                            <span className="font-serif text-[7px] uppercase tracking-[0.35em] text-[#596041]/70">
                                A little note
                            </span>
                        </div>

                        <h2
                            className="
                mt-5
                text-[68px]
                leading-[0.72]
                tracking-[-0.04em]
                text-[#4e4035]
                sm:text-[88px]
              "
                            style={{
                                fontFamily: '"Nesta Mastone", cursive',
                            }}
                        >
                            Will you
                            <br />
                            <span className="ml-[0.18em] text-[#596041]">
                                join us?
                            </span>
                        </h2>

                        <p className="mt-8 max-w-[320px] font-serif text-[13px] leading-[1.9] text-[#4e4035]/65 sm:text-[14px]">
                            We would love to know if you can be there as we begin this
                            next chapter together.
                        </p>

                        <div className="mt-10 max-w-[300px] rotate-[-2deg]">
                            <div className="relative border-t border-[#4e4035]/15 pt-5">
                                <p
                                    className="text-[25px] leading-[1.05] text-[#596041]/70 sm:text-[29px]"
                                    style={{
                                        fontFamily: '"Nesta Mastone", cursive',
                                    }}
                                >
                                    save us a little
                                    <br />
                                    place at your table.
                                </p>

                                <div className="mt-3 flex items-center gap-2">
                                    <span className="h-px w-8 bg-[#747a5a]/35" />

                                    <Heart
                                        size={10}
                                        strokeWidth={1}
                                        className="text-[#747a5a]/65"
                                    />

                                    <span className="font-serif text-[6px] uppercase tracking-[0.28em] text-[#4e4035]/30">
                                        22 · 11 · 2026
                                    </span>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* =====================================================
              SUBTLE RESPONSE SHEET
          ===================================================== */}

                    <motion.form
                        onSubmit={submit}
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
                            amount: 0.15,
                        }}
                        transition={{
                            duration: 0.9,
                            ease: [0.22, 1, 0.36, 1],
                        }}
                        className="relative"
                    >
                        {/* Very subtle paper edge */}
                        <div className="absolute inset-[2px] bg-[#d8c6a9]/[0.10] blur-[1px]" />

                        {/* Main sheet */}
                        <div
                            className="
                relative
                bg-[#eee9df]/80
                px-6
                pb-8
                pt-7
                shadow-[0_8px_25px_rgba(78,64,53,0.055)]
                ring-1
                ring-[#4e4035]/[0.07]
                sm:px-10
                sm:pb-10
                sm:pt-9
              "
                        >
                            {/* Extremely subtle grain */}

                            <div
                                className="pointer-events-none absolute inset-0 opacity-[0.10] mix-blend-multiply"
                                style={{
                                    backgroundImage:
                                        "radial-gradient(rgba(78,64,53,0.2) 0.4px, transparent 0.6px)",
                                    backgroundSize: "3px 3px",
                                }}
                            />

                            {/* Very subtle tape */}

                            <div className="absolute -top-2 right-12 h-7 w-16 rotate-[7deg] bg-[#d8c6a9]/20" />

                            {/* =================================================
                  HEADER
              ================================================= */}

                            <div className="relative">
                                <div className="flex items-center justify-between border-b border-[#4e4035]/[0.09] pb-3">
                                    <span className="font-serif text-[6px] uppercase tracking-[0.3em] text-[#4e4035]/30">
                                        The Wedding Post
                                    </span>

                                    <span className="font-serif text-[6px] uppercase tracking-[0.3em] text-[#4e4035]/30">
                                        A &amp; L · 06
                                    </span>
                                </div>

                                <div className="mt-7">
                                    <p className="font-serif text-[7px] uppercase tracking-[0.35em] text-[#596041]/60">
                                        Kindly respond
                                    </p>

                                    <h3
                                        className="mt-2 text-[39px] leading-[0.8] text-[#4e4035] sm:text-[48px]"
                                        style={{
                                            fontFamily: '"Nesta Mastone", cursive',
                                        }}
                                    >
                                        A note from you
                                    </h3>
                                </div>
                            </div>

                            {/* =================================================
                  NAME
              ================================================= */}

                            <div className="relative mt-10">
                                <PaperLabel number="01" text="Your name" />

                                <input
                                    name="name"
                                    type="text"
                                    required
                                    className="
                    mt-3
                    w-full
                    border-0
                    border-b
                    border-[#4e4035]/20
                    bg-transparent
                    px-0
                    py-2
                    font-serif
                    text-[17px]
                    text-[#4e4035]
                    outline-none
                    placeholder:text-[#4e4035]/25
                    focus:border-[#596041]/60
                  "
                                    placeholder="Write your name here"
                                />
                            </div>

                            {/* =================================================
                  EMAIL
              ================================================= */}

                            <div className="relative mt-8">
                                <PaperLabel number="02" text="Email address" />

                                <input
                                    name="email"
                                    type="email"
                                    required
                                    className="
                    mt-3
                    w-full
                    border-0
                    border-b
                    border-[#4e4035]/20
                    bg-transparent
                    px-0
                    py-2
                    font-serif
                    text-[17px]
                    text-[#4e4035]
                    outline-none
                    placeholder:text-[#4e4035]/25
                    focus:border-[#596041]/60
                  "
                                    placeholder="Where can we reach you?"
                                />
                            </div>

                            {/* =================================================
                  ATTENDANCE
              ================================================= */}

                            <div className="relative mt-9">
                                <PaperLabel number="03" text="Will you be there?" />

                                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                                    <RadioOption
                                        name="attendance"
                                        value="Joyfully attending"
                                        label="Joyfully attending"
                                        description="I wouldn't miss it."
                                    />

                                    <RadioOption
                                        name="attendance"
                                        value="Unable to attend"
                                        label="Unable to attend"
                                        description="With love from afar."
                                    />
                                </div>
                            </div>

                            {/* =================================================
                  GUESTS
              ================================================= */}

                            <div className="relative mt-9">
                                <PaperLabel number="04" text="Number of guests" />

                                <div className="mt-5 flex flex-wrap gap-3">
                                    {["1", "2", "3", "4", "5", "6"].map((number) => (
                                        <label
                                            key={number}
                                            className="group cursor-pointer"
                                        >
                                            <input
                                                type="radio"
                                                name="guests"
                                                value={number}
                                                defaultChecked={number === "1"}
                                                required
                                                className="peer sr-only"
                                            />

                                            <span
                                                className="
                          grid
                          size-9
                          place-items-center
                          rounded-full
                          border
                          border-[#4e4035]/15
                          font-serif
                          text-[10px]
                          text-[#4e4035]/55
                          transition-all
                          group-hover:border-[#596041]/45
                          peer-checked:border-[#596041]/60
                          peer-checked:bg-[#596041]/[0.10]
                          peer-checked:text-[#596041]
                        "
                                            >
                                                {number}
                                            </span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* =================================================
                  MESSAGE
              ================================================= */}

                            <div className="relative mt-9">
                                <PaperLabel number="05" text="A little note for us" />

                                <div className="relative mt-4">
                                    <textarea
                                        name="message"
                                        rows={4}
                                        className="
                      relative
                      w-full
                      resize-none
                      border-0
                      bg-transparent
                      px-0
                      py-1
                      text-[22px]
                      leading-[1.65]
                      text-[#4e4035]/75
                      outline-none
                      placeholder:text-[#4e4035]/25
                    "
                                        style={{
                                            fontFamily: '"Nesta Mastone", cursive',
                                        }}
                                        placeholder="Write something we can keep..."
                                    />

                                    <div
                                        className="pointer-events-none absolute inset-x-0 bottom-0 top-0 -z-10 opacity-40"
                                        style={{
                                            backgroundImage:
                                                "repeating-linear-gradient(to bottom, transparent 0px, transparent 31px, rgba(78,64,53,0.10) 32px)",
                                        }}
                                    />
                                </div>
                            </div>

                            {/* =================================================
                  SUBMIT
              ================================================= */}

                            <div className="relative mt-8 border-t border-[#4e4035]/[0.09] pt-6">
                                <button
                                    type="submit"
                                    disabled={status === "loading"}
                                    className="
                    group
                    flex
                    w-full
                    items-center
                    justify-center
                    gap-3
                    border
                    border-[#596041]/60
                    bg-[#596041]/[0.88]
                    px-5
                    py-3.5
                    text-[#f2eee5]
                    transition-all
                    duration-300
                    hover:bg-[#4e4035]/90
                    disabled:cursor-not-allowed
                    disabled:opacity-60
                  "
                                >
                                    {status === "loading" ? (
                                        <LoaderCircle
                                            size={14}
                                            className="animate-spin"
                                        />
                                    ) : status === "success" ? (
                                        <Check size={14} />
                                    ) : (
                                        <Heart
                                            size={13}
                                            strokeWidth={1}
                                            className="transition-transform group-hover:scale-110"
                                        />
                                    )}

                                    <span className="font-serif text-[8px] uppercase tracking-[0.28em]">
                                        {status === "success"
                                            ? "RSVP received"
                                            : "Send our response"}
                                    </span>
                                </button>

                                {message && (
                                    <p
                                        aria-live="polite"
                                        className={`mt-4 text-center font-serif text-[11px] leading-5 ${status === "error"
                                                ? "text-red-800"
                                                : "text-[#596041]"
                                            }`}
                                    >
                                        {message}
                                    </p>
                                )}
                            </div>

                            {/* =================================================
                  SIGNATURE
              ================================================= */}

                            <div className="relative mt-7 text-center">
                                <p
                                    className="text-[22px] leading-none text-[#596041]/55"
                                    style={{
                                        fontFamily: '"Nesta Mastone", cursive',
                                    }}
                                >
                                    with love,
                                </p>

                                <p
                                    className="mt-1 text-[26px] leading-none text-[#4e4035]/65"
                                    style={{
                                        fontFamily: '"Nesta Mastone", cursive',
                                    }}
                                >
                                    Aneena &amp; Loyed
                                </p>
                            </div>
                        </div>
                    </motion.form>
                </div>
            </div>

            {/* =========================================================
          PAGE FOOTER
      ========================================================== */}

            <div className="relative z-10 mx-auto mt-16 max-w-6xl sm:mt-20">
                <div className="flex items-center gap-3">
                    <div className="flex shrink-0 items-center gap-2">
                        <span className="font-serif text-[6px] uppercase tracking-[0.22em] text-[#4e4035]/25">
                            Page
                        </span>

                        <span className="font-serif text-[11px] tracking-[0.12em] text-[#596041]/70">
                            06
                        </span>
                    </div>

                    <span className="h-px flex-1 bg-[#4e4035]/10" />

                    <span className="hidden font-serif text-[7px] uppercase tracking-[0.3em] text-[#4e4035]/25 sm:block">
                        RSVP · The Wedding Post
                    </span>

                    <span className="h-px flex-1 bg-[#4e4035]/10" />

                    <span className="font-serif text-[6px] uppercase tracking-[0.2em] text-[#4e4035]/20">
                        A &amp; L
                    </span>
                </div>
            </div>
        </section>
    );
}

/* ================================================================
   PAPER LABEL
================================================================ */

function PaperLabel({
    number,
    text,
}: {
    number: string;
    text: string;
}) {
    return (
        <div className="flex items-center gap-3">
            <span className="grid size-5 place-items-center border border-[#596041]/25 font-serif text-[6px] text-[#596041]/60">
                {number}
            </span>

            <span className="font-serif text-[7px] uppercase tracking-[0.3em] text-[#4e4035]/50">
                {text}
            </span>

            <span className="h-px flex-1 bg-[#4e4035]/[0.08]" />
        </div>
    );
}

/* ================================================================
   RADIO OPTION
================================================================ */

function RadioOption({
    name,
    value,
    label,
    description,
}: {
    name: string;
    value: string;
    label: string;
    description: string;
}) {
    return (
        <label className="group relative cursor-pointer">
            <input
                type="radio"
                name={name}
                value={value}
                required
                className="peer sr-only"
            />

            <div
                className="
          border
          border-[#4e4035]/[0.09]
          bg-[#e9e4da]/[0.18]
          px-4
          py-3.5
          transition-all
          duration-300
          group-hover:border-[#596041]/30
          peer-checked:border-[#596041]/40
          peer-checked:bg-[#596041]/[0.035]
        "
            >
                <div className="flex items-start gap-3">
                    <span
                        className="
              relative
              mt-0.5
              grid
              size-4
              shrink-0
              place-items-center
              rounded-full
              border
              border-[#4e4035]/25
              transition-colors
              peer-checked:border-[#596041]/60
            "
                    >
                        <span className="size-1.5 rounded-full bg-[#596041] opacity-0 transition-opacity group-has-[input:checked]:opacity-100" />
                    </span>

                    <div>
                        <p
                            className="text-[20px] leading-none text-[#4e4035]/75"
                            style={{
                                fontFamily: '"Nesta Mastone", cursive',
                            }}
                        >
                            {label}
                        </p>

                        <p className="mt-2 font-serif text-[6px] uppercase tracking-[0.18em] text-[#4e4035]/30">
                            {description}
                        </p>
                    </div>
                </div>
            </div>
        </label>
    );
}