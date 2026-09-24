"use client";

import {
    ChangeEvent,
    ReactNode,
    useEffect,
    useRef,
    useState,
} from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Check,
    Copy,
    Heart,
    LoaderCircle,
    X,
} from "lucide-react";

type FileState = {
    file: File;
    url: string;
};

type GreetingStatus = "idle" | "sharing" | "copied";

export default function GuestUpload() {
    const [selected, setSelected] = useState<FileState[]>([]);
    const [name, setName] = useState("");
    const [status, setStatus] = useState("");
    const [loading, setLoading] = useState(false);

    const [greetingOpen, setGreetingOpen] = useState(false);
    const [greeting, setGreeting] = useState("");
    const [greetingStatus, setGreetingStatus] =
        useState<GreetingStatus>("idle");

    const cameraInputRef = useRef<HTMLInputElement>(null);

    const invitationUrl =
        typeof window !== "undefined"
            ? window.location.href.split("#")[0] + "#home"
            : "";

    /* ------------------------------------------------------------
       FILE HANDLING
    ------------------------------------------------------------ */

    function addFiles(files: File[]) {
        if (!files.length) return;

        setSelected((current) => {
            const remaining = Math.max(0, 6 - current.length);

            const incoming = files
                .slice(0, remaining)
                .map((file) => ({
                    file,
                    url: URL.createObjectURL(file),
                }));

            return [...current, ...incoming];
        });

        setStatus("");
    }

    function choose(e: ChangeEvent<HTMLInputElement>) {
        addFiles(Array.from(e.target.files || []));

        e.target.value = "";
    }

    function removePhoto(index: number) {
        setSelected((current) => {
            const item = current[index];

            if (item) {
                URL.revokeObjectURL(item.url);
            }

            return current.filter((_, i) => i !== index);
        });
    }

    useEffect(() => {
        return () => {
            selected.forEach((item) => {
                URL.revokeObjectURL(item.url);
            });
        };

        // Intentionally only run on unmount.
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    /* ------------------------------------------------------------
       UPLOAD
    ------------------------------------------------------------ */

    async function upload() {
        if (!name.trim() || !selected.length) {
            setStatus("Add your name and at least one photo.");
            return;
        }

        setLoading(true);
        setStatus("");

        try {
            for (const item of selected) {
                const response = await fetch("/api/upload", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        fileName: item.file.name,
                        contentType: item.file.type,
                        guestName: name.trim(),
                    }),
                });

                const data = await response.json();

                if (!response.ok) {
                    throw new Error(
                        data.error || "Upload setup failed."
                    );
                }

                await fetch(data.uploadUrl, {
                    method: "PUT",
                    headers: {
                        "Content-Type": item.file.type,
                    },
                    body: item.file,
                });
            }

            setStatus(
                "Photos added to the album — thank you for being part of our memories."
            );

            selected.forEach((item) => {
                URL.revokeObjectURL(item.url);
            });

            setSelected([]);

            if (cameraInputRef.current) {
                cameraInputRef.current.value = "";
            }
        } catch (error) {
            setStatus(
                error instanceof Error
                    ? error.message
                    : "Upload failed."
            );
        } finally {
            setLoading(false);
        }
    }

    /* ------------------------------------------------------------
       GREETINGS / SHARE
    ------------------------------------------------------------ */

    async function sendGreeting() {
        const cleanGreeting = greeting.trim();

        if (!cleanGreeting) return;

        setGreetingStatus("sharing");

        const shareText = `A little wedding note from ${name.trim() || "a guest"
            }:

"${cleanGreeting}"

Aneena & Loyed
22 · 11 · 2026`;

        try {
            if (
                typeof navigator !== "undefined" &&
                navigator.share
            ) {
                await navigator.share({
                    title: "A little note for Aneena & Loyed",
                    text: shareText,
                    url: invitationUrl,
                });

                setGreetingStatus("idle");
                setGreetingOpen(false);
                setGreeting("");
                return;
            }

            await navigator.clipboard.writeText(
                `${shareText}\n\n${invitationUrl}`
            );

            setGreetingStatus("copied");
        } catch {
            setGreetingStatus("idle");
        }
    }

    async function copyInvitation() {
        try {
            await navigator.clipboard.writeText(invitationUrl);
            setStatus("Invitation link copied.");
        } catch {
            setStatus("Copy the invitation link from your browser.");
        }
    }

    /* ------------------------------------------------------------
       UI
    ------------------------------------------------------------ */

    return (
        <>
            <section
                id="upload"
                className="
                    relative
                    overflow-hidden
                    bg-[#e9e4da]
                    px-5
                    pb-14
                    pt-12
                    text-[#4e4035]
                    sm:px-8
                    sm:pb-16
                    sm:pt-14
                "
            >
                {/* ------------------------------------------------
                    PAPER
                ------------------------------------------------ */}

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

                    <div className="absolute inset-0 bg-[#d8c6a9]/[0.05] mix-blend-multiply" />

                    <div
                        className="
                            absolute
                            inset-0
                            opacity-[0.12]
                            mix-blend-multiply
                        "
                        style={{
                            backgroundImage:
                                "radial-gradient(rgba(78,64,53,0.24) 0.45px, transparent 0.65px)",
                            backgroundSize: "3px 3px",
                        }}
                    />
                </div>

                {/* ------------------------------------------------
                    SUBTLE EDITORIAL BACKGROUND
                ------------------------------------------------ */}

                <div className="pointer-events-none absolute inset-0">
                    <div
                        className="
                            absolute
                            left-1/2
                            top-[8%]
                            -translate-x-1/2
                            whitespace-nowrap
                            font-serif
                            text-[clamp(70px,14vw,180px)]
                            font-black
                            uppercase
                            leading-none
                            tracking-[-0.08em]
                            text-[#4e4035]/[0.022]
                        "
                    >
                        Memories
                    </div>

                    <div className="absolute bottom-14 left-[9%] top-14 hidden w-px bg-[#4e4035]/[0.045] lg:block" />

                    <div className="absolute bottom-14 right-[9%] top-14 hidden w-px bg-[#4e4035]/[0.045] lg:block" />

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
                            text-[#4e4035]/[0.16]
                            lg:block
                        "
                    >
                        THE WEDDING POST · A PERSONAL ALBUM
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
                            text-[#4e4035]/[0.16]
                            lg:block
                        "
                    >
                        22 NOVEMBER 2026 · A &amp; L
                    </div>
                </div>

                {/* ------------------------------------------------
                    HEADER
                ------------------------------------------------ */}

                <div className="relative z-10 mx-auto max-w-5xl">
                    <div className="flex items-center gap-3">
                        <span className="font-serif text-[6px] uppercase tracking-[0.3em] text-[#4e4035]/30">
                            Volume 01
                        </span>

                        <span className="h-px flex-1 bg-[#4e4035]/10" />

                        <span className="font-serif text-[6px] uppercase tracking-[0.3em] text-[#4e4035]/30">
                            Guest Album
                        </span>

                        <span className="h-px w-8 bg-[#4e4035]/10 sm:w-12" />

                        <span className="font-serif text-[6px] uppercase tracking-[0.3em] text-[#596041]/60">
                            07
                        </span>
                    </div>
                </div>

                {/* ------------------------------------------------
                    INTRO + ACTIONS
                ------------------------------------------------ */}

                <div className="relative z-10 mx-auto mt-8 max-w-5xl sm:mt-10">
                    <div className="grid items-center gap-8 lg:grid-cols-[0.88fr_1.12fr] lg:gap-14">
                        {/* LEFT */}
                        <motion.div
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
                                amount: 0.2,
                            }}
                            transition={{
                                duration: 0.7,
                                ease: [0.22, 1, 0.36, 1],
                            }}
                        >
                            <div className="flex items-center gap-2.5">
                                <span className="h-px w-7 bg-[#4e4035]/20" />

                                <span className="font-serif text-[6px] uppercase tracking-[0.32em] text-[#596041]/65">
                                    Add to the album
                                </span>
                            </div>

                            <h2
                                className="
                                    mt-4
                                    text-[54px]
                                    leading-[0.78]
                                    tracking-[-0.04em]
                                    text-[#4e4035]
                                    sm:text-[68px]
                                "
                                style={{
                                    fontFamily:
                                        '"Nesta Mastone", cursive',
                                }}
                            >
                                Keep the
                                <br />
                                <span className="ml-[0.1em] text-[#596041]">
                                    moments.
                                </span>
                            </h2>

                            <p className="mt-5 max-w-[310px] font-serif text-[11px] leading-[1.75] text-[#4e4035]/55 sm:text-[12px]">
                                The photographs we take on the day will
                                only tell part of the story. Add yours
                                to the little collection we can look
                                back on for years to come.
                            </p>

                            <div className="mt-6 max-w-[260px] rotate-[-2deg]">
                                <div className="border-t border-[#4e4035]/10 pt-3">
                                    <p
                                        className="
                                            text-[20px]
                                            leading-[1.05]
                                            text-[#596041]/60
                                            sm:text-[23px]
                                        "
                                        style={{
                                            fontFamily:
                                                '"Nesta Mastone", cursive',
                                        }}
                                    >
                                        from your camera roll,
                                        <br />
                                        to our little archive.
                                    </p>

                                    <div className="mt-2 flex items-center gap-2">
                                        <span className="h-px w-6 bg-[#747a5a]/30" />

                                        <span className="font-serif text-[5px] uppercase tracking-[0.26em] text-[#4e4035]/25">
                                            with love · A &amp; L
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* RIGHT — ACTIONS */}
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
                                amount: 0.15,
                            }}
                            transition={{
                                duration: 0.75,
                                delay: 0.08,
                                ease: [0.22, 1, 0.36, 1],
                            }}
                            className="relative"
                        >
                            <div className="mb-4 flex items-center justify-between">
                                <span className="font-serif text-[6px] uppercase tracking-[0.3em] text-[#4e4035]/30">
                                    Leave a little something
                                </span>

                                <span
                                    className="hidden text-[16px] text-[#747a5a]/45 sm:block"
                                    style={{
                                        fontFamily:
                                            '"Nesta Mastone", cursive',
                                    }}
                                >
                                    x
                                </span>
                            </div>

                            <div className="grid grid-cols-3 gap-2.5 sm:gap-3.5">
                                {/* VIEW INVITATION */}
                                <DoodleAction
                                    title="View invitation"
                                    subtitle="Take another look"
                                    rotation="-1deg"
                                    onClick={() => {
                                        document
                                            .getElementById("home")
                                            ?.scrollIntoView({
                                                behavior: "smooth",
                                            });
                                    }}
                                >
                                    <InvitationDoodle />
                                </DoodleAction>

                                {/* SEND GREETINGS */}
                                <DoodleAction
                                    title="Send greetings"
                                    subtitle="Leave us a note"
                                    rotation="1.2deg"
                                    onClick={() =>
                                        setGreetingOpen(true)
                                    }
                                >
                                    <EnvelopeDoodle />
                                </DoodleAction>

                                {/* TAKE A SNAP */}
                                <DoodleAction
                                    title="Take a snap"
                                    subtitle="Open your camera"
                                    rotation="-0.8deg"
                                    onClick={() =>
                                        cameraInputRef.current?.click()
                                    }
                                >
                                    <CameraDoodle />
                                </DoodleAction>
                            </div>

                            <div className="pointer-events-none absolute -bottom-5 left-1/2 hidden -translate-x-1/2 sm:block">
                                <BotanicalDoodle />
                            </div>

                            {/* Camera only — no gallery/add photos */}
                            <input
                                ref={cameraInputRef}
                                type="file"
                                accept="image/*"
                                capture="environment"
                                className="sr-only"
                                onChange={choose}
                            />
                        </motion.div>
                    </div>
                </div>

                {/* ------------------------------------------------
                    SELECTED PHOTOS / UPLOAD
                ------------------------------------------------ */}

                <AnimatePresence>
                    {selected.length > 0 && (
                        <motion.div
                            initial={{
                                opacity: 0,
                                height: 0,
                                y: 12,
                            }}
                            animate={{
                                opacity: 1,
                                height: "auto",
                                y: 0,
                            }}
                            exit={{
                                opacity: 0,
                                height: 0,
                                y: 12,
                            }}
                            transition={{
                                duration: 0.45,
                                ease: [0.22, 1, 0.36, 1],
                            }}
                            className="relative z-10 mx-auto mt-12 max-w-5xl overflow-hidden"
                        >
                            <div className="border-t border-[#4e4035]/10 pt-6">
                                <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
                                    <div>
                                        <span className="font-serif text-[6px] uppercase tracking-[0.3em] text-[#4e4035]/30">
                                            Your photographs
                                        </span>

                                        <p
                                            className="mt-1.5 text-[22px] leading-none text-[#596041]/70"
                                            style={{
                                                fontFamily:
                                                    '"Nesta Mastone", cursive',
                                            }}
                                        >
                                            ready for the album
                                        </p>
                                    </div>

                                    <span className="font-serif text-[6px] uppercase tracking-[0.25em] text-[#4e4035]/25">
                                        {selected.length} / 6 selected
                                    </span>
                                </div>

                                {/* NAME */}
                                <div className="mt-5 max-w-[400px]">
                                    <label className="font-serif text-[6px] uppercase tracking-[0.3em] text-[#4e4035]/40">
                                        Your name

                                        <input
                                            value={name}
                                            onChange={(e) =>
                                                setName(e.target.value)
                                            }
                                            className="
                                                mt-2
                                                w-full
                                                border-0
                                                border-b
                                                border-[#4e4035]/15
                                                bg-transparent
                                                px-0
                                                py-1.5
                                                font-serif
                                                text-[14px]
                                                text-[#4e4035]
                                                outline-none
                                                placeholder:text-[#4e4035]/22
                                                focus:border-[#596041]/50
                                            "
                                            placeholder="Who should we thank?"
                                        />
                                    </label>
                                </div>

                                {/* PHOTOS */}
                                <div className="mt-5 grid grid-cols-3 gap-2.5 sm:grid-cols-6 sm:gap-3">
                                    {selected.map((item, index) => (
                                        <motion.div
                                            key={item.url}
                                            initial={{
                                                opacity: 0,
                                                scale: 0.94,
                                                rotate:
                                                    index % 2 === 0
                                                        ? -2
                                                        : 2,
                                            }}
                                            animate={{
                                                opacity: 1,
                                                scale: 1,
                                                rotate:
                                                    index % 2 === 0
                                                        ? -2
                                                        : 2,
                                            }}
                                            className="group relative"
                                        >
                                            <div className="bg-[#eee9df] p-1.5 shadow-[0_5px_14px_rgba(78,64,53,0.07)]">
                                                <div className="aspect-square overflow-hidden bg-[#d8c6a9]">
                                                    <img
                                                        src={item.url}
                                                        alt={`Selected photo ${index + 1
                                                            }`}
                                                        className="h-full w-full object-cover"
                                                    />
                                                </div>
                                            </div>

                                            <button
                                                type="button"
                                                onClick={() =>
                                                    removePhoto(index)
                                                }
                                                aria-label={`Remove photo ${index + 1
                                                    }`}
                                                className="
                                                    absolute
                                                    -right-1.5
                                                    -top-1.5
                                                    grid
                                                    size-5
                                                    place-items-center
                                                    border
                                                    border-[#4e4035]/10
                                                    bg-[#eee9df]
                                                    text-[#4e4035]/50
                                                    shadow-sm
                                                    transition
                                                    hover:text-[#596041]
                                                "
                                            >
                                                <X
                                                    size={9}
                                                    strokeWidth={1.4}
                                                />
                                            </button>
                                        </motion.div>
                                    ))}
                                </div>

                                {/* UPLOAD */}
                                <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                                    <p className="max-w-sm font-serif text-[9px] leading-4 text-[#4e4035]/35">
                                        Your photographs will become
                                        part of our private wedding
                                        album.
                                    </p>

                                    <button
                                        type="button"
                                        onClick={upload}
                                        disabled={loading}
                                        className="
                                            flex
                                            items-center
                                            justify-center
                                            gap-2
                                            border
                                            border-[#596041]/40
                                            bg-[#596041]/[0.86]
                                            px-5
                                            py-2.5
                                            text-[#f2eee5]
                                            transition-all
                                            duration-300
                                            hover:bg-[#4e4035]/90
                                            disabled:cursor-not-allowed
                                            disabled:opacity-60
                                        "
                                    >
                                        {loading ? (
                                            <LoaderCircle
                                                size={11}
                                                className="animate-spin"
                                            />
                                        ) : (
                                            <Check
                                                size={11}
                                                strokeWidth={1.5}
                                            />
                                        )}

                                        <span className="font-serif text-[7px] uppercase tracking-[0.25em]">
                                            {loading
                                                ? "Adding to album…"
                                                : "Add to our album"}
                                        </span>
                                    </button>
                                </div>

                                {status && (
                                    <p
                                        aria-live="polite"
                                        className="
                                            mt-4
                                            font-serif
                                            text-[9px]
                                            leading-4
                                            text-[#596041]
                                        "
                                    >
                                        {status}
                                    </p>
                                )}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* ------------------------------------------------
                    BOTTOM NOTE
                ------------------------------------------------ */}

                <div className="relative z-10 mx-auto mt-12 max-w-5xl sm:mt-14">
                    <div className="flex items-center gap-2.5">
                        <div className="flex shrink-0 items-center gap-1.5">
                            <span className="font-serif text-[5px] uppercase tracking-[0.22em] text-[#4e4035]/22">
                                Page
                            </span>

                            <span className="font-serif text-[9px] tracking-[0.12em] text-[#596041]/60">
                                07
                            </span>
                        </div>

                        <span className="h-px flex-1 bg-[#4e4035]/10" />

                        <span className="hidden font-serif text-[6px] uppercase tracking-[0.3em] text-[#4e4035]/22 sm:block">
                            Guest Album · The Wedding Post
                        </span>

                        <span className="h-px flex-1 bg-[#4e4035]/10" />

                        <span className="font-serif text-[5px] uppercase tracking-[0.2em] text-[#4e4035]/18">
                            A &amp; L
                        </span>
                    </div>
                </div>
            </section>

            {/* =======================================================
                GREETING NOTE
            ======================================================== */}

            <AnimatePresence>
                {greetingOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="
                            fixed
                            inset-0
                            z-[100]
                            flex
                            items-center
                            justify-center
                            bg-[#4e4035]/20
                            px-5
                            backdrop-blur-[3px]
                        "
                        onMouseDown={(e) => {
                            if (e.target === e.currentTarget) {
                                setGreetingOpen(false);
                            }
                        }}
                    >
                        <motion.div
                            initial={{
                                opacity: 0,
                                y: 20,
                                rotate: -1.2,
                            }}
                            animate={{
                                opacity: 1,
                                y: 0,
                                rotate: -0.4,
                            }}
                            exit={{
                                opacity: 0,
                                y: 15,
                            }}
                            transition={{
                                duration: 0.4,
                                ease: [0.22, 1, 0.36, 1],
                            }}
                            className="
                                relative
                                w-full
                                max-w-[460px]
                                bg-[#eee9df]
                                px-6
                                pb-7
                                pt-6
                                shadow-[0_20px_55px_rgba(52,45,36,0.14)]
                                sm:px-8
                                sm:pb-8
                            "
                        >
                            {/* Paper grain */}
                            <div
                                className="
                                    pointer-events-none
                                    absolute
                                    inset-0
                                    opacity-[0.1]
                                    mix-blend-multiply
                                "
                                style={{
                                    backgroundImage:
                                        "radial-gradient(rgba(78,64,53,0.25) 0.4px, transparent 0.6px)",
                                    backgroundSize: "3px 3px",
                                }}
                            />

                            {/* Tape */}
                            <div className="absolute -top-2 left-1/2 h-6 w-16 -translate-x-1/2 rotate-[-2deg] bg-[#d8c6a9]/25" />

                            {/* Close */}
                            <button
                                type="button"
                                onClick={() =>
                                    setGreetingOpen(false)
                                }
                                className="
                                    absolute
                                    right-3
                                    top-3
                                    grid
                                    size-7
                                    place-items-center
                                    text-[#4e4035]/40
                                    transition
                                    hover:text-[#596041]
                                "
                                aria-label="Close"
                            >
                                <X
                                    size={15}
                                    strokeWidth={1.2}
                                />
                            </button>

                            <div className="relative">
                                <div className="flex items-center gap-2.5 border-b border-[#4e4035]/10 pb-2.5">
                                    <span className="font-serif text-[5px] uppercase tracking-[0.3em] text-[#4e4035]/25">
                                        The Wedding Post
                                    </span>

                                    <span className="h-px flex-1 bg-[#4e4035]/10" />

                                    <span className="font-serif text-[5px] uppercase tracking-[0.3em] text-[#596041]/50">
                                        A &amp; L
                                    </span>
                                </div>

                                <div className="mt-6">
                                    <span className="font-serif text-[6px] uppercase tracking-[0.35em] text-[#596041]/55">
                                        A little note
                                    </span>

                                    <h3
                                        className="mt-2 text-[42px] leading-[0.8] text-[#4e4035] sm:text-[50px]"
                                        style={{
                                            fontFamily:
                                                '"Nesta Mastone", cursive',
                                        }}
                                    >
                                        Send us
                                        <br />
                                        something lovely.
                                    </h3>
                                </div>

                                {/* Name */}
                                <div className="mt-6">
                                    <label className="font-serif text-[6px] uppercase tracking-[0.3em] text-[#4e4035]/40">
                                        Your name

                                        <input
                                            value={name}
                                            onChange={(e) =>
                                                setName(e.target.value)
                                            }
                                            className="
                                                mt-2
                                                w-full
                                                border-0
                                                border-b
                                                border-[#4e4035]/15
                                                bg-transparent
                                                px-0
                                                py-1.5
                                                font-serif
                                                text-[14px]
                                                text-[#4e4035]
                                                outline-none
                                                placeholder:text-[#4e4035]/22
                                                focus:border-[#596041]/50
                                            "
                                            placeholder="Your name"
                                        />
                                    </label>
                                </div>

                                {/* Greeting */}
                                <div className="relative mt-6">
                                    <textarea
                                        value={greeting}
                                        onChange={(e) =>
                                            setGreeting(e.target.value)
                                        }
                                        rows={4}
                                        className="
                                            w-full
                                            resize-none
                                            border-0
                                            bg-transparent
                                            px-0
                                            py-1.5
                                            text-[21px]
                                            leading-[1.5]
                                            text-[#4e4035]/75
                                            outline-none
                                            placeholder:text-[#4e4035]/22
                                        "
                                        style={{
                                            fontFamily:
                                                '"Nesta Mastone", cursive',
                                        }}
                                        placeholder="Write your wishes here..."
                                    />

                                    <div
                                        className="
                                            pointer-events-none
                                            absolute
                                            inset-x-0
                                            bottom-0
                                            top-0
                                            -z-10
                                            opacity-35
                                        "
                                        style={{
                                            backgroundImage:
                                                "repeating-linear-gradient(to bottom, transparent 0px, transparent 34px, rgba(78,64,53,0.09) 35px)",
                                        }}
                                    />
                                </div>

                                {/* Buttons */}
                                <div className="mt-5 flex flex-col gap-2.5 sm:flex-row">
                                    <button
                                        type="button"
                                        onClick={sendGreeting}
                                        disabled={
                                            !greeting.trim() ||
                                            greetingStatus ===
                                            "sharing"
                                        }
                                        className="
                                            flex
                                            flex-1
                                            items-center
                                            justify-center
                                            gap-2
                                            bg-[#596041]/[0.86]
                                            px-4
                                            py-3
                                            text-[#f2eee5]
                                            transition
                                            hover:bg-[#4e4035]
                                            disabled:cursor-not-allowed
                                            disabled:opacity-50
                                        "
                                    >
                                        {greetingStatus ===
                                            "sharing" ? (
                                            <LoaderCircle
                                                size={12}
                                                className="animate-spin"
                                            />
                                        ) : greetingStatus ===
                                            "copied" ? (
                                            <Check size={12} />
                                        ) : (
                                            <Heart
                                                size={12}
                                                strokeWidth={1.2}
                                            />
                                        )}

                                        <span className="font-serif text-[7px] uppercase tracking-[0.25em]">
                                            {greetingStatus ===
                                                "copied"
                                                ? "Greeting copied"
                                                : "Send greeting"}
                                        </span>
                                    </button>

                                    <button
                                        type="button"
                                        onClick={copyInvitation}
                                        className="
                                            flex
                                            items-center
                                            justify-center
                                            gap-2
                                            border
                                            border-[#4e4035]/12
                                            px-4
                                            py-3
                                            text-[#4e4035]/55
                                            transition
                                            hover:border-[#596041]/35
                                            hover:text-[#596041]
                                        "
                                    >
                                        <Copy
                                            size={12}
                                            strokeWidth={1.2}
                                        />

                                        <span className="font-serif text-[7px] uppercase tracking-[0.25em]">
                                            Copy invitation
                                        </span>
                                    </button>
                                </div>

                                {/* Footer */}
                                <div className="mt-5 flex items-center justify-center gap-2">
                                    <span className="h-px w-6 bg-[#747a5a]/20" />

                                    <Heart
                                        size={8}
                                        strokeWidth={1}
                                        className="text-[#747a5a]/50"
                                    />

                                    <span
                                        className="text-[16px] text-[#596041]/45"
                                        style={{
                                            fontFamily:
                                                '"Nesta Mastone", cursive',
                                        }}
                                    >
                                        with love
                                    </span>

                                    <span className="h-px w-6 bg-[#747a5a]/20" />
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}

/* =============================================================
   DOODLE ACTION
============================================================= */

function DoodleAction({
    title,
    subtitle,
    children,
    onClick,
    rotation,
}: {
    title: string;
    subtitle: string;
    children: ReactNode;
    onClick: () => void;
    rotation: string;
}) {
    return (
        <button
            type="button"
            onClick={onClick}
            className="group relative text-left outline-none"
            style={{
                transform: `rotate(${rotation})`,
            }}
        >
            <div
                className="
                    relative
                    flex
                    min-h-[128px]
                    flex-col
                    items-center
                    justify-center
                    border
                    border-[#4e4035]/[0.065]
                    bg-[#eee9df]/[0.14]
                    px-2
                    py-4
                    transition-all
                    duration-400
                    group-hover:-translate-y-0.5
                    group-hover:border-[#596041]/15
                    group-hover:bg-[#eee9df]/[0.28]
                    sm:min-h-[145px]
                    sm:px-3
                    sm:py-5
                "
            >
                {/* Inner paper edge */}
                <div className="pointer-events-none absolute inset-[4px] border border-[#4e4035]/[0.03]" />

                {/* Small doodle */}
                <div className="relative flex h-[58px] w-full items-center justify-center text-[#596041]/65 transition-transform duration-400 group-hover:scale-[1.03] sm:h-[65px]">
                    {children}
                </div>

                {/* Text */}
                <div className="relative mt-2.5 text-center">
                    <p
                        className="
                            text-[17px]
                            leading-none
                            text-[#4e4035]/75
                            sm:text-[19px]
                        "
                        style={{
                            fontFamily:
                                '"Nesta Mastone", cursive',
                        }}
                    >
                        {title}
                    </p>

                    <p className="mt-1.5 font-serif text-[5px] uppercase tracking-[0.2em] text-[#4e4035]/25">
                        {subtitle}
                    </p>
                </div>

                {/* Tiny arrow */}
                <svg
                    viewBox="0 0 30 12"
                    className="
                        pointer-events-none
                        absolute
                        bottom-2
                        right-2.5
                        h-3
                        w-7
                        text-[#596041]/20
                        transition-all
                        duration-400
                        group-hover:translate-x-0.5
                        group-hover:text-[#596041]/45
                    "
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M1 6C8 5.5 15 6 23 6"
                        stroke="currentColor"
                        strokeWidth="0.8"
                        strokeLinecap="round"
                    />

                    <path
                        d="M19 2.5L24 6L19 9.5"
                        stroke="currentColor"
                        strokeWidth="0.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            </div>
        </button>
    );
}

/* =============================================================
   INVITATION DOODLE
============================================================= */

function InvitationDoodle() {
    return (
        <svg
            width="72"
            height="60"
            viewBox="0 0 118 94"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="overflow-visible"
        >
            <path
                d="M18 78C39 83 74 83 99 78"
                stroke="currentColor"
                strokeWidth="1"
                strokeLinecap="round"
                opacity=".18"
            />

            <path
                d="M28 15H91V70H28V15Z"
                stroke="currentColor"
                strokeWidth="1.35"
                strokeLinejoin="round"
            />

            <path
                d="M28 15L59.5 40L91 15"
                stroke="currentColor"
                strokeWidth="1.35"
                strokeLinejoin="round"
            />

            <path
                d="M28 70L48 48"
                stroke="currentColor"
                strokeWidth=".9"
                opacity=".6"
            />

            <path
                d="M91 70L71 48"
                stroke="currentColor"
                strokeWidth=".9"
                opacity=".6"
            />

            <path
                d="M48 47C52 42 56 43 59.5 47C63 43 67 42 71 47"
                stroke="currentColor"
                strokeWidth=".9"
                strokeLinecap="round"
            />

            <path
                d="M59.5 58C55 53 48 58 59.5 65C71 58 64 53 59.5 58Z"
                stroke="currentColor"
                strokeWidth=".9"
                strokeLinejoin="round"
            />

            <path
                d="M17 24C12 19 10 16 11 11"
                stroke="currentColor"
                strokeWidth=".9"
                strokeLinecap="round"
            />

            <path
                d="M12 16C15 16 18 14 19 11"
                stroke="currentColor"
                strokeWidth=".9"
                strokeLinecap="round"
            />
        </svg>
    );
}

/* =============================================================
   ENVELOPE DOODLE
============================================================= */

function EnvelopeDoodle() {
    return (
        <svg
            width="74"
            height="60"
            viewBox="0 0 120 94"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="overflow-visible"
        >
            <path
                d="M19 25H101V72H19V25Z"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinejoin="round"
            />

            <path
                d="M19 26L60 57L101 26"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinejoin="round"
            />

            <path
                d="M19 72L48 46"
                stroke="currentColor"
                strokeWidth=".9"
                opacity=".6"
            />

            <path
                d="M101 72L72 46"
                stroke="currentColor"
                strokeWidth=".9"
                opacity=".6"
            />

            <path
                d="M60 43C55 37 46 43 60 53C74 43 65 37 60 43Z"
                stroke="currentColor"
                strokeWidth="1.1"
                strokeLinejoin="round"
            />

            <path
                d="M90 12C87 8 82 11 90 17C98 11 93 8 90 12Z"
                stroke="currentColor"
                strokeWidth=".8"
                opacity=".55"
            />

            <path
                d="M25 15H39"
                stroke="currentColor"
                strokeWidth=".8"
                strokeLinecap="round"
                opacity=".35"
            />

            <path
                d="M81 17H95"
                stroke="currentColor"
                strokeWidth=".8"
                strokeLinecap="round"
                opacity=".35"
            />
        </svg>
    );
}

/* =============================================================
   CAMERA DOODLE
============================================================= */

function CameraDoodle() {
    return (
        <svg
            width="76"
            height="60"
            viewBox="0 0 125 94"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="overflow-visible"
        >
            <path
                d="M22 31H103C106 31 108 33 108 36V70C108 73 106 75 103 75H22C19 75 17 73 17 70V36C17 33 19 31 22 31Z"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinejoin="round"
            />

            <path
                d="M36 31L42 22H67L74 31"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinejoin="round"
            />

            <circle
                cx="62.5"
                cy="53"
                r="14"
                stroke="currentColor"
                strokeWidth="1.25"
            />

            <circle
                cx="62.5"
                cy="53"
                r="7"
                stroke="currentColor"
                strokeWidth=".85"
            />

            <path
                d="M88 40H96"
                stroke="currentColor"
                strokeWidth="1.2"
                strokeLinecap="round"
            />

            <path
                d="M104 16V26M99 21H109"
                stroke="currentColor"
                strokeWidth=".8"
                strokeLinecap="round"
                opacity=".55"
            />

            <path
                d="M13 17V25M9 21H17"
                stroke="currentColor"
                strokeWidth=".8"
                strokeLinecap="round"
                opacity=".4"
            />

            <path
                d="M33 50C30 46 25 49 33 55C41 49 36 46 33 50Z"
                stroke="currentColor"
                strokeWidth=".8"
                opacity=".5"
            />
        </svg>
    );
}

/* =============================================================
   BOTANICAL DOODLE
============================================================= */

function BotanicalDoodle() {
    return (
        <svg
            width="110"
            height="25"
            viewBox="0 0 150 34"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="text-[#596041]/20"
        >
            <path
                d="M4 29C36 28 53 11 74 7C95 3 116 13 146 5"
                stroke="currentColor"
                strokeWidth=".8"
                strokeLinecap="round"
            />

            <path
                d="M43 20C39 15 39 11 41 7"
                stroke="currentColor"
                strokeWidth=".8"
                strokeLinecap="round"
            />

            <path
                d="M42 14C47 14 50 11 51 8"
                stroke="currentColor"
                strokeWidth=".8"
                strokeLinecap="round"
            />

            <path
                d="M96 10C93 6 93 3 95 1"
                stroke="currentColor"
                strokeWidth=".8"
                strokeLinecap="round"
            />

            <path
                d="M95 6C100 6 103 4 105 1"
                stroke="currentColor"
                strokeWidth=".8"
                strokeLinecap="round"
            />

            <path
                d="M122 10C124 6 127 4 130 3"
                stroke="currentColor"
                strokeWidth=".8"
                strokeLinecap="round"
            />
        </svg>
    );
}