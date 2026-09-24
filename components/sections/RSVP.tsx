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
                    : "Unable to submit RSVP."
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
                pb-20
                pt-14
                text-[#4e4035]
                sm:px-8
                sm:pb-24
                sm:pt-18
            "
        >
            {/* =========================================================
                CONTINUOUS PAPER
            ========================================================== */}

            <div className="pointer-events-none absolute inset-0">
                <div
                    className="
                        absolute
                        inset-0
                        bg-[#e9e4da]
                        bg-[url('/crumpled-paper.jpg')]
                        bg-repeat
                    "
                    style={{
                        backgroundSize: "900px auto",
                    }}
                />

                <div className="absolute inset-0 bg-[#eee9df]/48" />

                <div className="absolute inset-0 bg-[#d8c6a9]/[0.055] mix-blend-multiply" />

                <div
                    className="
                        absolute
                        inset-0
                        opacity-[0.12]
                        mix-blend-multiply
                    "
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

            <div className="pointer-events-none absolute inset-0 overflow-hidden">
                <div
                    className="
                        absolute
                        left-1/2
                        top-[5%]
                        -translate-x-1/2
                        whitespace-nowrap
                        font-serif
                        text-[clamp(75px,16vw,200px)]
                        font-black
                        uppercase
                        leading-none
                        tracking-[-0.08em]
                        text-[#4e4035]/[0.022]
                    "
                >
                    RSVP
                </div>

                <div className="absolute bottom-12 left-[10%] top-12 hidden w-px bg-[#4e4035]/[0.045] lg:block" />

                <div className="absolute bottom-12 right-[10%] top-12 hidden w-px bg-[#4e4035]/[0.045] lg:block" />

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
                        tracking-[0.32em]
                        text-[#4e4035]/[0.14]
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
                        tracking-[0.32em]
                        text-[#4e4035]/[0.14]
                        lg:block
                    "
                >
                    THE WEDDING POST · A &amp; L
                </div>
            </div>

            {/* =========================================================
                TOP EDITORIAL HEADER
            ========================================================== */}

            <div className="relative z-10 mx-auto mb-8 max-w-5xl sm:mb-10">
                <div className="flex items-center gap-2.5">
                    <span className="font-serif text-[5px] uppercase tracking-[0.28em] text-[#4e4035]/30">
                        Volume 01
                    </span>

                    <span className="h-px flex-1 bg-[#4e4035]/10" />

                    <span className="font-serif text-[5px] uppercase tracking-[0.28em] text-[#4e4035]/30">
                        Response Card
                    </span>

                    <span className="h-px w-7 bg-[#4e4035]/10" />

                    <span className="font-serif text-[5px] uppercase tracking-[0.28em] text-[#596041]/60">
                        06
                    </span>
                </div>
            </div>

            {/* =========================================================
                MAIN CONTENT
            ========================================================== */}

            <div className="relative z-10 mx-auto max-w-4xl">
                <div className="grid items-center gap-9 lg:grid-cols-[0.78fr_1.22fr] lg:gap-14">

                    {/* =================================================
                        LEFT SIDE
                    ================================================== */}

                    <motion.div
                        initial={{
                            opacity: 0,
                            x: -18,
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
                            duration: 0.7,
                            ease: [0.22, 1, 0.36, 1],
                        }}
                        className="lg:sticky lg:top-24"
                    >
                        <div className="flex items-center gap-2.5">
                            <span className="h-px w-7 bg-[#4e4035]/20" />

                            <span className="font-serif text-[6px] uppercase tracking-[0.32em] text-[#596041]/65">
                                A little note
                            </span>
                        </div>

                        <h2
                            className="
                                mt-4
                                text-[52px]
                                leading-[0.74]
                                tracking-[-0.04em]
                                text-[#4e4035]
                                sm:text-[68px]
                            "
                            style={{
                                fontFamily:
                                    '"Nesta Mastone", cursive',
                            }}
                        >
                            Will you
                            <br />
                            <span className="ml-[0.15em] text-[#596041]">
                                join us?
                            </span>
                        </h2>

                        <p className="mt-6 max-w-[275px] font-serif text-[11px] leading-[1.8] text-[#4e4035]/60 sm:text-[12px]">
                            We would love to know if you can be
                            there as we begin this next chapter
                            together.
                        </p>

                        <div className="mt-7 max-w-[240px] rotate-[-2deg]">
                            <div className="border-t border-[#4e4035]/12">
                                <div className="mt-2.5 flex items-center gap-2">
                                    <span className="h-px w-6 bg-[#747a5a]/30" />

                                    <span className="font-serif text-[5px] uppercase tracking-[0.25em] text-[#4e4035]/28">
                                        22 · 11 · 2026
                                    </span>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* =================================================
                        RESPONSE SHEET
                    ================================================== */}

                    <motion.form
                        onSubmit={submit}
                        initial={{
                            opacity: 0,
                            y: 18,
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
                            duration: 0.8,
                            ease: [0.22, 1, 0.36, 1],
                        }}
                        className="relative mx-auto w-full max-w-[500px]"
                    >
                        {/* Subtle paper edge */}
                        <div className="absolute inset-[2px] bg-[#d8c6a9]/[0.07] blur-[1px]" />

                        {/* Main sheet */}
                        <div
                            className="
                                relative
                                bg-[#eee9df]/72
                                px-5
                                pb-6
                                pt-5
                                shadow-[0_6px_20px_rgba(78,64,53,0.045)]
                                ring-1
                                ring-[#4e4035]/[0.055]
                                sm:px-7
                                sm:pb-7
                                sm:pt-6
                            "
                        >
                            {/* Very subtle grain */}
                            <div
                                className="
                                    pointer-events-none
                                    absolute
                                    inset-0
                                    opacity-[0.07]
                                    mix-blend-multiply
                                "
                                style={{
                                    backgroundImage:
                                        "radial-gradient(rgba(78,64,53,0.2) 0.4px, transparent 0.6px)",
                                    backgroundSize: "3px 3px",
                                }}
                            />

                            {/* Small paper tape */}
                            <div className="absolute -top-1.5 right-10 h-5 w-12 rotate-[7deg] bg-[#d8c6a9]/[0.17]" />

                            {/* =================================================
                                FORM HEADER
                            ================================================== */}

                            <div className="relative">
                                <div className="flex items-center justify-between border-b border-[#4e4035]/[0.07] pb-2.5">
                                    <span className="font-serif text-[5px] uppercase tracking-[0.28em] text-[#4e4035]/28">
                                        The Wedding Post
                                    </span>

                                    <span className="font-serif text-[5px] uppercase tracking-[0.28em] text-[#4e4035]/28">
                                        A &amp; L · 06
                                    </span>
                                </div>

                                <div className="mt-5">
                                    <p className="font-serif text-[6px] uppercase tracking-[0.32em] text-[#596041]/55">
                                        Kindly respond
                                    </p>

                                    <h3
                                        className="
                                            mt-1.5
                                            text-[32px]
                                            leading-[0.82]
                                            text-[#4e4035]
                                            sm:text-[38px]
                                        "
                                        style={{
                                            fontFamily:
                                                '"Nesta Mastone", cursive',
                                        }}
                                    >
                                        A note from you
                                    </h3>
                                </div>
                            </div>

                            {/* =================================================
                                NAME
                            ================================================== */}

                            <div className="relative mt-7">
                                <PaperLabel
                                    number="01"
                                    text="Your name"
                                />

                                <input
                                    name="name"
                                    type="text"
                                    required
                                    className="
                                        mt-2.5
                                        w-full
                                        border-0
                                        border-b
                                        border-[#4e4035]/[0.16]
                                        bg-transparent
                                        px-0
                                        py-1.5
                                        font-serif
                                        text-[14px]
                                        text-[#4e4035]
                                        outline-none
                                        placeholder:text-[#4e4035]/20
                                        focus:border-[#596041]/55
                                    "
                                    placeholder="Write your name here"
                                />
                            </div>

                            {/* =================================================
                                ATTENDANCE
                            ================================================== */}

                            <div className="relative mt-7">
                                <PaperLabel
                                    number="02"
                                    text="Will you be there?"
                                />

                                <div className="mt-3 grid gap-2.5 sm:grid-cols-2">
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
                                SUBMIT
                            ================================================== */}

                            <div className="relative mt-6 border-t border-[#4e4035]/[0.07] pt-4">
                                <button
                                    type="submit"
                                    disabled={status === "loading"}
                                    className="
                                        group
                                        flex
                                        w-full
                                        items-center
                                        justify-center
                                        gap-2.5
                                        border
                                        border-[#596041]/50
                                        bg-[#596041]/[0.82]
                                        px-4
                                        py-2.5
                                        text-[#f2eee5]
                                        transition-all
                                        duration-300
                                        hover:bg-[#4e4035]/85
                                        disabled:cursor-not-allowed
                                        disabled:opacity-60
                                    "
                                >
                                    {status === "loading" ? (
                                        <LoaderCircle
                                            size={12}
                                            className="animate-spin"
                                        />
                                    ) : status === "success" ? (
                                        <Check size={12} />
                                    ) : (
                                        <Heart
                                            size={11}
                                            strokeWidth={1}
                                            className="transition-transform group-hover:scale-110"
                                        />
                                    )}

                                    <span className="font-serif text-[7px] uppercase tracking-[0.25em]">
                                        {status === "success"
                                            ? "RSVP received"
                                            : "Send response"}
                                    </span>
                                </button>

                                {message && (
                                    <p
                                        aria-live="polite"
                                        className={`mt-3 text-center font-serif text-[10px] leading-4 ${status === "error"
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
                            ================================================== */}

                            <div className="relative mt-5 text-center">
                                <p
                                    className="text-[18px] leading-none text-[#596041]/50"
                                    style={{
                                        fontFamily:
                                            '"Nesta Mastone", cursive',
                                    }}
                                >
                                    with love,
                                </p>

                                <p
                                    className="mt-0.5 text-[21px] leading-none text-[#4e4035]/60"
                                    style={{
                                        fontFamily:
                                            '"Nesta Mastone", cursive',
                                    }}
                                >
                                    Loyed &amp; Aneena
                                </p>
                            </div>
                        </div>
                    </motion.form>
                </div>
            </div>

            {/* =========================================================
                PAGE FOOTER
            ========================================================== */}

            <div className="relative z-10 mx-auto mt-11 max-w-5xl sm:mt-14">
                <div className="flex items-center gap-2.5">
                    <div className="flex shrink-0 items-center gap-1.5">
                        <span className="font-serif text-[5px] uppercase tracking-[0.2em] text-[#4e4035]/22">
                            Page
                        </span>

                        <span className="font-serif text-[10px] tracking-[0.12em] text-[#596041]/65">
                            06
                        </span>
                    </div>

                    <span className="h-px flex-1 bg-[#4e4035]/10" />

                    <span className="hidden font-serif text-[6px] uppercase tracking-[0.28em] text-[#4e4035]/22 sm:block">
                        RSVP · The Wedding Post
                    </span>

                    <span className="h-px flex-1 bg-[#4e4035]/10" />

                    <span className="font-serif text-[5px] uppercase tracking-[0.18em] text-[#4e4035]/18">
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
        <div className="flex items-center gap-2.5">
            <span className="grid size-[18px] place-items-center border border-[#596041]/20 font-serif text-[5px] text-[#596041]/55">
                {number}
            </span>

            <span className="font-serif text-[6px] uppercase tracking-[0.28em] text-[#4e4035]/45">
                {text}
            </span>

            <span className="h-px flex-1 bg-[#4e4035]/[0.07]" />
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
                    border-[#4e4035]/[0.075]
                    bg-[#e9e4da]/[0.14]
                    px-3
                    py-2.5
                    transition-all
                    duration-300
                    group-hover:border-[#596041]/25
                    peer-checked:border-[#596041]/35
                    peer-checked:bg-[#596041]/[0.028]
                "
            >
                <div className="flex items-start gap-2.5">
                    <span
                        className="
                            relative
                            mt-0.5
                            grid
                            size-3.5
                            shrink-0
                            place-items-center
                            rounded-full
                            border
                            border-[#4e4035]/20
                            transition-colors
                            peer-checked:border-[#596041]/55
                        "
                    >
                        <span className="size-1 rounded-full bg-[#596041] opacity-0 transition-opacity group-has-[input:checked]:opacity-100" />
                    </span>

                    <div>
                        <p
                            className="
                                text-[16px]
                                leading-none
                                text-[#4e4035]/70
                                sm:text-[17px]
                            "
                            style={{
                                fontFamily:
                                    '"Nesta Mastone", cursive',
                            }}
                        >
                            {label}
                        </p>

                        <p className="mt-1.5 font-serif text-[5px] uppercase tracking-[0.16em] text-[#4e4035]/27">
                            {description}
                        </p>
                    </div>
                </div>
            </div>
        </label>
    );
}