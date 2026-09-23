"use client";

import {
    ChangeEvent,
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

    const fileInputRef = useRef<HTMLInputElement>(null);
    const cameraInputRef = useRef<HTMLInputElement>(null);

    const invitationUrl =
        typeof window !== "undefined"
            ? window.location.href.split("#")[0] + "#home"
            : "";

    /*
     * ------------------------------------------------------------
     * FILE HANDLING
     * ------------------------------------------------------------
     */

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

        // Allows the same file to be selected again later.
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

    /*
     * ------------------------------------------------------------
     * UPLOAD
     * ------------------------------------------------------------
     */

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

            if (fileInputRef.current) {
                fileInputRef.current.value = "";
            }

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

    /*
     * ------------------------------------------------------------
     * GREETINGS / SHARE
     * ------------------------------------------------------------
     */

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

    /*
     * ------------------------------------------------------------
     * UI
     * ------------------------------------------------------------
     */

    return (
        <>
            <section
                id="upload"
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
                {/* =====================================================
            PAPER
        ====================================================== */}

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

                    <div className="absolute inset-0 bg-[#d8c6a9]/[0.06] mix-blend-multiply" />

                    <div
                        className="
              absolute
              inset-0
              opacity-[0.16]
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
            VERY SUBTLE EDITORIAL BACKGROUND
        ====================================================== */}

                <div className="pointer-events-none absolute inset-0">
                    <div
                        className="
              absolute
              left-1/2
              top-[5%]
              -translate-x-1/2
              whitespace-nowrap
              font-serif
              text-[clamp(80px,17vw,220px)]
              font-black
              uppercase
              leading-none
              tracking-[-0.08em]
              text-[#4e4035]/[0.025]
            "
                    >
                        Memories
                    </div>

                    <div className="absolute bottom-20 left-[9%] top-20 hidden w-px bg-[#4e4035]/[0.05] lg:block" />

                    <div className="absolute bottom-20 right-[9%] top-20 hidden w-px bg-[#4e4035]/[0.05] lg:block" />

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
              text-[#4e4035]/[0.18]
              lg:block
            "
                    >
                        22 NOVEMBER 2026 · A &amp; L
                    </div>
                </div>

                {/* =====================================================
            HEADER
        ====================================================== */}

                <div className="relative z-10 mx-auto max-w-6xl">
                    <div className="flex items-center gap-3">
                        <span className="font-serif text-[6px] uppercase tracking-[0.3em] text-[#4e4035]/30">
                            Volume 01
                        </span>

                        <span className="h-px flex-1 bg-[#4e4035]/10" />

                        <span className="font-serif text-[6px] uppercase tracking-[0.3em] text-[#4e4035]/30">
                            Guest Album
                        </span>

                        <span className="h-px w-12 bg-[#4e4035]/10" />

                        <span className="font-serif text-[6px] uppercase tracking-[0.3em] text-[#596041]/60">
                            07
                        </span>
                    </div>
                </div>

                {/* =====================================================
            INTRO
        ====================================================== */}

                <div className="relative z-10 mx-auto mt-12 max-w-6xl sm:mt-16">
                    <div className="grid items-end gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
                        <motion.div
                            initial={{
                                opacity: 0,
                                y: 24,
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
                                duration: 0.85,
                                ease: [0.22, 1, 0.36, 1],
                            }}
                        >
                            <div className="flex items-center gap-3">
                                <span className="h-px w-9 bg-[#4e4035]/25" />

                                <span className="font-serif text-[7px] uppercase tracking-[0.35em] text-[#596041]/70">
                                    Add to the album
                                </span>
                            </div>

                            <h2
                                className="
                  mt-5
                  text-[68px]
                  leading-[0.76]
                  tracking-[-0.04em]
                  text-[#4e4035]
                  sm:text-[92px]
                "
                                style={{
                                    fontFamily: '"Nesta Mastone", cursive',
                                }}
                            >
                                Keep the
                                <br />
                                <span className="ml-[0.12em] text-[#596041]">
                                    moments.
                                </span>
                            </h2>

                            <p className="mt-8 max-w-[350px] font-serif text-[13px] leading-[1.9] text-[#4e4035]/60 sm:text-[14px]">
                                The photographs we take on the day will only
                                tell part of the story. Add yours to the little
                                collection we can look back on for years to come.
                            </p>

                            {/* Handwritten annotation */}
                            <div className="mt-9 max-w-[300px] rotate-[-2deg]">
                                <div className="border-t border-[#4e4035]/10 pt-4">
                                    <p
                                        className="text-[25px] leading-[1.05] text-[#596041]/65 sm:text-[29px]"
                                        style={{
                                            fontFamily: '"Nesta Mastone", cursive',
                                        }}
                                    >
                                        from your camera roll,
                                        <br />
                                        to our little archive.
                                    </p>

                                    <div className="mt-3 flex items-center gap-2">
                                        <span className="h-px w-8 bg-[#747a5a]/35" />

                                        <span className="font-serif text-[6px] uppercase tracking-[0.28em] text-[#4e4035]/30">
                                            with love · A &amp; L
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* =================================================
                DOODLE ACTIONS
            ================================================== */}

                        <motion.div
                            initial={{
                                opacity: 0,
                                y: 30,
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
                                delay: 0.1,
                                ease: [0.22, 1, 0.36, 1],
                            }}
                            className="relative"
                        >
                            {/* Doodle heading */}
                            <div className="mb-6 flex items-center justify-between">
                                <div>
                                    <span className="font-serif text-[7px] uppercase tracking-[0.3em] text-[#4e4035]/35">
                                        A few ways to leave a little something
                                    </span>
                                </div>

                                <span
                                    className="hidden text-[21px] text-[#747a5a]/55 sm:block"
                                    style={{
                                        fontFamily: '"Nesta Mastone", cursive',
                                    }}
                                >
                                    x
                                </span>
                            </div>

                            <div className="relative grid grid-cols-2 gap-x-5 gap-y-9 sm:gap-x-8 sm:gap-y-10">
                                {/* =============================================
                    VIEW INVITATION
                ============================================== */}

                                <DoodleAction
                                    title="View invitation"
                                    subtitle="Take another look"
                                    rotation="-1.5deg"
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

                                {/* =============================================
                    SEND GREETINGS
                ============================================== */}

                                <DoodleAction
                                    title="Send greetings"
                                    subtitle="Leave us a little note"
                                    rotation="1.7deg"
                                    onClick={() => setGreetingOpen(true)}
                                >
                                    <EnvelopeDoodle />
                                </DoodleAction>

                                {/* =============================================
                    CAMERA
                ============================================== */}

                                <DoodleAction
                                    title="Take a snap"
                                    subtitle="Open your camera"
                                    rotation="1.2deg"
                                    onClick={() => cameraInputRef.current?.click()}
                                >
                                    <CameraDoodle />
                                </DoodleAction>

                                {/* =============================================
                    ADD PHOTOS
                ============================================== */}

                                <DoodleAction
                                    title="Add photos"
                                    subtitle="Choose from your gallery"
                                    rotation="-2deg"
                                    onClick={() => fileInputRef.current?.click()}
                                >
                                    <PhotoStackDoodle />
                                </DoodleAction>

                                {/* little botanical line */}
                                <div className="pointer-events-none absolute -bottom-8 left-1/2 hidden -translate-x-1/2 sm:block">
                                    <BotanicalDoodle />
                                </div>
                            </div>

                            {/* Hidden gallery input */}
                            <input
                                ref={fileInputRef}
                                type="file"
                                accept="image/jpeg,image/png,image/webp"
                                multiple
                                className="sr-only"
                                onChange={choose}
                            />

                            {/* Camera input */}
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

                {/* =====================================================
            SELECTED PHOTOS / UPLOAD DESK
        ====================================================== */}

                <AnimatePresence>
                    {selected.length > 0 && (
                        <motion.div
                            initial={{
                                opacity: 0,
                                height: 0,
                                y: 15,
                            }}
                            animate={{
                                opacity: 1,
                                height: "auto",
                                y: 0,
                            }}
                            exit={{
                                opacity: 0,
                                height: 0,
                                y: 15,
                            }}
                            transition={{
                                duration: 0.5,
                                ease: [0.22, 1, 0.36, 1],
                            }}
                            className="relative z-10 mx-auto mt-20 max-w-6xl overflow-hidden"
                        >
                            <div className="border-t border-[#4e4035]/10 pt-8">
                                <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
                                    <div>
                                        <span className="font-serif text-[7px] uppercase tracking-[0.3em] text-[#4e4035]/35">
                                            Your photographs
                                        </span>

                                        <p
                                            className="mt-2 text-[28px] leading-none text-[#596041]/75"
                                            style={{
                                                fontFamily: '"Nesta Mastone", cursive',
                                            }}
                                        >
                                            ready for the album
                                        </p>
                                    </div>

                                    <span className="font-serif text-[7px] uppercase tracking-[0.25em] text-[#4e4035]/30">
                                        {selected.length} / 6 selected
                                    </span>
                                </div>

                                {/* Name */}
                                <div className="mt-8 max-w-[480px]">
                                    <label className="font-serif text-[7px] uppercase tracking-[0.3em] text-[#4e4035]/45">
                                        Your name

                                        <input
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
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
                                            placeholder="Who should we thank?"
                                        />
                                    </label>
                                </div>

                                {/* Photos */}
                                <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
                                    {selected.map((item, index) => (
                                        <motion.div
                                            key={item.url}
                                            initial={{
                                                opacity: 0,
                                                scale: 0.92,
                                                rotate: index % 2 === 0 ? -2 : 2,
                                            }}
                                            animate={{
                                                opacity: 1,
                                                scale: 1,
                                                rotate: index % 2 === 0 ? -2 : 2,
                                            }}
                                            className="group relative"
                                        >
                                            <div className="bg-[#eee9df] p-2 shadow-[0_6px_18px_rgba(78,64,53,0.08)]">
                                                <div className="aspect-square overflow-hidden bg-[#d8c6a9]">
                                                    <img
                                                        src={item.url}
                                                        alt={`Selected photo ${index + 1}`}
                                                        className="h-full w-full object-cover"
                                                    />
                                                </div>
                                            </div>

                                            <button
                                                type="button"
                                                onClick={() => removePhoto(index)}
                                                aria-label={`Remove photo ${index + 1}`}
                                                className="
                          absolute
                          -right-2
                          -top-2
                          grid
                          size-6
                          place-items-center
                          border
                          border-[#4e4035]/15
                          bg-[#eee9df]
                          text-[#4e4035]/60
                          opacity-100
                          shadow-sm
                          transition
                          hover:text-[#596041]
                        "
                                            >
                                                <X size={11} strokeWidth={1.5} />
                                            </button>
                                        </motion.div>
                                    ))}
                                </div>

                                {/* Upload */}
                                <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                                    <p className="max-w-md font-serif text-[10px] leading-5 text-[#4e4035]/40">
                                        Your photographs will become part of our private
                                        wedding album.
                                    </p>

                                    <button
                                        type="button"
                                        onClick={upload}
                                        disabled={loading}
                                        className="
                      flex
                      items-center
                      justify-center
                      gap-3
                      border
                      border-[#596041]/50
                      bg-[#596041]/[0.88]
                      px-7
                      py-3.5
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
                                                size={14}
                                                className="animate-spin"
                                            />
                                        ) : (
                                            <Check size={14} strokeWidth={1.5} />
                                        )}

                                        <span className="font-serif text-[8px] uppercase tracking-[0.28em]">
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
                      mt-5
                      font-serif
                      text-[10px]
                      leading-5
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

                {/* =====================================================
            BOTTOM NOTE
        ====================================================== */}

                <div className="relative z-10 mx-auto mt-20 max-w-6xl sm:mt-24">
                    <div className="flex items-center gap-3">
                        <div className="flex shrink-0 items-center gap-2">
                            <span className="font-serif text-[6px] uppercase tracking-[0.22em] text-[#4e4035]/25">
                                Page
                            </span>

                            <span className="font-serif text-[11px] tracking-[0.12em] text-[#596041]/70">
                                07
                            </span>
                        </div>

                        <span className="h-px flex-1 bg-[#4e4035]/10" />

                        <span className="hidden font-serif text-[7px] uppercase tracking-[0.3em] text-[#4e4035]/25 sm:block">
                            Guest Album · The Wedding Post
                        </span>

                        <span className="h-px flex-1 bg-[#4e4035]/10" />

                        <span className="font-serif text-[6px] uppercase tracking-[0.2em] text-[#4e4035]/20">
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
                                y: 25,
                                rotate: -1.5,
                            }}
                            animate={{
                                opacity: 1,
                                y: 0,
                                rotate: -0.5,
                            }}
                            exit={{
                                opacity: 0,
                                y: 20,
                            }}
                            transition={{
                                duration: 0.45,
                                ease: [0.22, 1, 0.36, 1],
                            }}
                            className="
                relative
                w-full
                max-w-[540px]
                bg-[#eee9df]
                px-7
                pb-8
                pt-7
                shadow-[0_25px_70px_rgba(52,45,36,0.16)]
                sm:px-10
                sm:pb-10
              "
                        >
                            {/* paper grain */}
                            <div
                                className="
                  pointer-events-none
                  absolute
                  inset-0
                  opacity-[0.12]
                  mix-blend-multiply
                "
                                style={{
                                    backgroundImage:
                                        "radial-gradient(rgba(78,64,53,0.25) 0.4px, transparent 0.6px)",
                                    backgroundSize: "3px 3px",
                                }}
                            />

                            {/* little tape */}
                            <div className="absolute -top-2 left-1/2 h-7 w-20 -translate-x-1/2 rotate-[-2deg] bg-[#d8c6a9]/25" />

                            <button
                                type="button"
                                onClick={() => setGreetingOpen(false)}
                                className="
                  absolute
                  right-4
                  top-4
                  grid
                  size-8
                  place-items-center
                  text-[#4e4035]/45
                  transition
                  hover:text-[#596041]
                "
                                aria-label="Close"
                            >
                                <X size={17} strokeWidth={1.2} />
                            </button>

                            <div className="relative">
                                <div className="flex items-center gap-3 border-b border-[#4e4035]/10 pb-3">
                                    <span className="font-serif text-[6px] uppercase tracking-[0.3em] text-[#4e4035]/30">
                                        The Wedding Post
                                    </span>

                                    <span className="h-px flex-1 bg-[#4e4035]/10" />

                                    <span className="font-serif text-[6px] uppercase tracking-[0.3em] text-[#596041]/55">
                                        A &amp; L
                                    </span>
                                </div>

                                <div className="mt-8">
                                    <span className="font-serif text-[7px] uppercase tracking-[0.35em] text-[#596041]/60">
                                        A little note
                                    </span>

                                    <h3
                                        className="mt-3 text-[52px] leading-[0.78] text-[#4e4035] sm:text-[62px]"
                                        style={{
                                            fontFamily: '"Nesta Mastone", cursive',
                                        }}
                                    >
                                        Send us
                                        <br />
                                        something lovely.
                                    </h3>
                                </div>

                                <div className="mt-8">
                                    <label className="font-serif text-[7px] uppercase tracking-[0.3em] text-[#4e4035]/45">
                                        Your name

                                        <input
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
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
                        text-[16px]
                        text-[#4e4035]
                        outline-none
                        placeholder:text-[#4e4035]/25
                        focus:border-[#596041]/60
                      "
                                            placeholder="Your name"
                                        />
                                    </label>
                                </div>

                                <div className="relative mt-8">
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
                      py-2
                      text-[25px]
                      leading-[1.55]
                      text-[#4e4035]/75
                      outline-none
                      placeholder:text-[#4e4035]/25
                    "
                                        style={{
                                            fontFamily: '"Nesta Mastone", cursive',
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
                      opacity-40
                    "
                                        style={{
                                            backgroundImage:
                                                "repeating-linear-gradient(to bottom, transparent 0px, transparent 38px, rgba(78,64,53,0.10) 39px)",
                                        }}
                                    />
                                </div>

                                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                                    <button
                                        type="button"
                                        onClick={sendGreeting}
                                        disabled={
                                            !greeting.trim() ||
                                            greetingStatus === "sharing"
                                        }
                                        className="
                      flex
                      flex-1
                      items-center
                      justify-center
                      gap-2
                      bg-[#596041]/[0.88]
                      px-5
                      py-3.5
                      text-[#f2eee5]
                      transition
                      hover:bg-[#4e4035]
                      disabled:cursor-not-allowed
                      disabled:opacity-50
                    "
                                    >
                                        {greetingStatus === "sharing" ? (
                                            <LoaderCircle
                                                size={14}
                                                className="animate-spin"
                                            />
                                        ) : greetingStatus === "copied" ? (
                                            <Check size={14} />
                                        ) : (
                                            <Heart
                                                size={13}
                                                strokeWidth={1.2}
                                            />
                                        )}

                                        <span className="font-serif text-[8px] uppercase tracking-[0.28em]">
                                            {greetingStatus === "copied"
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
                      border-[#4e4035]/15
                      px-5
                      py-3.5
                      text-[#4e4035]/60
                      transition
                      hover:border-[#596041]/40
                      hover:text-[#596041]
                    "
                                    >
                                        <Copy size={13} strokeWidth={1.2} />

                                        <span className="font-serif text-[8px] uppercase tracking-[0.28em]">
                                            Copy invitation
                                        </span>
                                    </button>
                                </div>

                                <div className="mt-7 flex items-center justify-center gap-2">
                                    <span className="h-px w-8 bg-[#747a5a]/25" />

                                    <Heart
                                        size={9}
                                        strokeWidth={1}
                                        className="text-[#747a5a]/55"
                                    />

                                    <span
                                        className="text-[19px] text-[#596041]/50"
                                        style={{
                                            fontFamily: '"Nesta Mastone", cursive',
                                        }}
                                    >
                                        with love
                                    </span>

                                    <span className="h-px w-8 bg-[#747a5a]/25" />
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
   DOODLE ACTION COMPONENT
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
    children: React.ReactNode;
    onClick: () => void;
    rotation: string;
}) {
    return (
        <button
            type="button"
            onClick={onClick}
            className="
        group
        relative
        text-left
        outline-none
      "
            style={{
                transform: `rotate(${rotation})`,
            }}
        >
            <div
                className="
          relative
          flex
          min-h-[190px]
          flex-col
          items-center
          justify-center
          border
          border-[#4e4035]/[0.07]
          bg-[#eee9df]/[0.18]
          px-4
          py-7
          transition-all
          duration-500
          group-hover:-translate-y-1
          group-hover:border-[#596041]/20
          group-hover:bg-[#eee9df]/[0.34]
        "
            >
                {/* imperfect paper edge */}
                <div className="pointer-events-none absolute inset-[5px] border border-[#4e4035]/[0.035]" />

                {/* doodle */}
                <div className="relative flex h-[94px] items-center justify-center text-[#596041]/75 transition-transform duration-500 group-hover:scale-[1.04]">
                    {children}
                </div>

                {/* text */}
                <div className="relative mt-4 text-center">
                    <p
                        className="text-[25px] leading-none text-[#4e4035]/80"
                        style={{
                            fontFamily: '"Nesta Mastone", cursive',
                        }}
                    >
                        {title}
                    </p>

                    <p className="mt-2 font-serif text-[6px] uppercase tracking-[0.25em] text-[#4e4035]/30">
                        {subtitle}
                    </p>
                </div>

                {/* tiny hand-drawn arrow */}
                <svg
                    viewBox="0 0 40 16"
                    className="
            pointer-events-none
            absolute
            bottom-3
            right-4
            h-4
            w-10
            text-[#596041]/25
            transition-all
            duration-500
            group-hover:translate-x-1
            group-hover:text-[#596041]/55
          "
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M1 8C10 7 19 8 31 8"
                        stroke="currentColor"
                        strokeWidth="1"
                        strokeLinecap="round"
                    />
                    <path
                        d="M26 3L32 8L26 13"
                        stroke="currentColor"
                        strokeWidth="1"
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
            width="118"
            height="94"
            viewBox="0 0 118 94"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="overflow-visible"
        >
            {/* shadow */}
            <path
                d="M18 78C39 83 74 83 99 78"
                stroke="currentColor"
                strokeWidth="1"
                strokeLinecap="round"
                opacity=".2"
            />

            {/* envelope/card */}
            <path
                d="M28 15H91V70H28V15Z"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinejoin="round"
            />

            {/* top card */}
            <path
                d="M28 15L59.5 40L91 15"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinejoin="round"
            />

            {/* bottom folds */}
            <path
                d="M28 70L48 48"
                stroke="currentColor"
                strokeWidth="1"
                opacity=".7"
            />

            <path
                d="M91 70L71 48"
                stroke="currentColor"
                strokeWidth="1"
                opacity=".7"
            />

            {/* initials */}
            <path
                d="M48 47C52 42 56 43 59.5 47C63 43 67 42 71 47"
                stroke="currentColor"
                strokeWidth="1"
                strokeLinecap="round"
            />

            {/* tiny heart */}
            <path
                d="M59.5 58C55 53 48 58 59.5 65C71 58 64 53 59.5 58Z"
                stroke="currentColor"
                strokeWidth="1"
                strokeLinejoin="round"
            />

            {/* botanical marks */}
            <path
                d="M17 24C12 19 10 16 11 11"
                stroke="currentColor"
                strokeWidth="1"
                strokeLinecap="round"
            />

            <path
                d="M12 16C15 16 18 14 19 11"
                stroke="currentColor"
                strokeWidth="1"
                strokeLinecap="round"
            />

            <path
                d="M99 57C104 54 106 50 106 45"
                stroke="currentColor"
                strokeWidth="1"
                strokeLinecap="round"
            />

            <path
                d="M104 50C108 50 110 48 111 45"
                stroke="currentColor"
                strokeWidth="1"
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
            width="120"
            height="94"
            viewBox="0 0 120 94"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="overflow-visible"
        >
            {/* envelope */}
            <path
                d="M19 25H101V72H19V25Z"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinejoin="round"
            />

            <path
                d="M19 26L60 57L101 26"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinejoin="round"
            />

            <path
                d="M19 72L48 46"
                stroke="currentColor"
                strokeWidth="1"
                opacity=".65"
            />

            <path
                d="M101 72L72 46"
                stroke="currentColor"
                strokeWidth="1"
                opacity=".65"
            />

            {/* heart */}
            <path
                d="M60 43C55 37 46 43 60 53C74 43 65 37 60 43Z"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinejoin="round"
            />

            {/* floating heart */}
            <path
                d="M90 12C87 8 82 11 90 17C98 11 93 8 90 12Z"
                stroke="currentColor"
                strokeWidth="1"
                opacity=".65"
            />

            {/* little lines */}
            <path
                d="M25 15H39"
                stroke="currentColor"
                strokeWidth="1"
                strokeLinecap="round"
                opacity=".45"
            />

            <path
                d="M81 17H95"
                stroke="currentColor"
                strokeWidth="1"
                strokeLinecap="round"
                opacity=".45"
            />

            <path
                d="M103 37L108 34"
                stroke="currentColor"
                strokeWidth="1"
                strokeLinecap="round"
                opacity=".4"
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
            width="125"
            height="94"
            viewBox="0 0 125 94"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="overflow-visible"
        >
            {/* camera body */}
            <path
                d="M22 31H103C106 31 108 33 108 36V70C108 73 106 75 103 75H22C19 75 17 73 17 70V36C17 33 19 31 22 31Z"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinejoin="round"
            />

            {/* top */}
            <path
                d="M36 31L42 22H67L74 31"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinejoin="round"
            />

            {/* lens */}
            <circle
                cx="62.5"
                cy="53"
                r="14"
                stroke="currentColor"
                strokeWidth="1.5"
            />

            <circle
                cx="62.5"
                cy="53"
                r="7"
                stroke="currentColor"
                strokeWidth="1"
            />

            {/* flash */}
            <path
                d="M88 40H96"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
            />

            {/* little sparkle */}
            <path
                d="M104 16V26M99 21H109"
                stroke="currentColor"
                strokeWidth="1"
                strokeLinecap="round"
                opacity=".65"
            />

            {/* corner marks */}
            <path
                d="M13 17V25M9 21H17"
                stroke="currentColor"
                strokeWidth="1"
                strokeLinecap="round"
                opacity=".45"
            />

            {/* small heart */}
            <path
                d="M33 50C30 46 25 49 33 55C41 49 36 46 33 50Z"
                stroke="currentColor"
                strokeWidth="1"
                opacity=".55"
            />
        </svg>
    );
}

/* =============================================================
   PHOTO STACK DOODLE
============================================================= */

function PhotoStackDoodle() {
    return (
        <svg
            width="122"
            height="94"
            viewBox="0 0 122 94"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="overflow-visible"
        >
            {/* back photograph */}
            <path
                d="M24 20L89 13L95 66L30 73L24 20Z"
                stroke="currentColor"
                strokeWidth="1.3"
                strokeLinejoin="round"
                opacity=".55"
            />

            {/* front photograph */}
            <path
                d="M29 26H101V78H29V26Z"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinejoin="round"
            />

            {/* mountains */}
            <path
                d="M35 68L51 49L62 60L72 46L95 68"
                stroke="currentColor"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />

            {/* sun */}
            <circle
                cx="82"
                cy="39"
                r="5"
                stroke="currentColor"
                strokeWidth="1"
            />

            {/* little botanical */}
            <path
                d="M14 74C10 68 10 61 13 56"
                stroke="currentColor"
                strokeWidth="1"
                strokeLinecap="round"
            />

            <path
                d="M12 65C16 65 19 63 21 60"
                stroke="currentColor"
                strokeWidth="1"
                strokeLinecap="round"
            />

            <path
                d="M15 69C12 69 9 67 7 64"
                stroke="currentColor"
                strokeWidth="1"
                strokeLinecap="round"
            />

            {/* little spark */}
            <path
                d="M103 17L106 11M106 20L112 17"
                stroke="currentColor"
                strokeWidth="1"
                strokeLinecap="round"
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
            width="150"
            height="34"
            viewBox="0 0 150 34"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="text-[#596041]/25"
        >
            <path
                d="M4 29C36 28 53 11 74 7C95 3 116 13 146 5"
                stroke="currentColor"
                strokeWidth="1"
                strokeLinecap="round"
            />

            <path
                d="M43 20C39 15 39 11 41 7"
                stroke="currentColor"
                strokeWidth="1"
                strokeLinecap="round"
            />

            <path
                d="M42 14C47 14 50 11 51 8"
                stroke="currentColor"
                strokeWidth="1"
                strokeLinecap="round"
            />

            <path
                d="M96 10C93 6 93 3 95 1"
                stroke="currentColor"
                strokeWidth="1"
                strokeLinecap="round"
            />

            <path
                d="M95 6C100 6 103 4 105 1"
                stroke="currentColor"
                strokeWidth="1"
                strokeLinecap="round"
            />

            <path
                d="M122 10C124 6 127 4 130 3"
                stroke="currentColor"
                strokeWidth="1"
                strokeLinecap="round"
            />
        </svg>
    );
}