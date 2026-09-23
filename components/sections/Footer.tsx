import { Heart } from "lucide-react";

export default function Footer() {
    return (
        <footer className="relative overflow-hidden bg-[#e9e4da] px-5 pb-6 pt-20 text-[#4e4035] sm:px-8 sm:pb-8 sm:pt-24">
            {/* =====================================================
          PAPER TEXTURE
      ====================================================== */}

            <div className="pointer-events-none absolute inset-0">
                <div
                    className="absolute inset-0 bg-[#e9e4da] bg-[url('/crumpled-paper.jpg')] bg-repeat"
                    style={{ backgroundSize: "900px auto" }}
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

            {/* =====================================================
          FAINT EDITORIAL TYPE
      ====================================================== */}

            <div className="pointer-events-none absolute inset-0 overflow-hidden">
                <div
                    className="
            absolute
            bottom-[-2%]
            left-1/2
            -translate-x-1/2
            whitespace-nowrap
            font-serif
            text-[clamp(110px,22vw,280px)]
            font-black
            uppercase
            leading-none
            tracking-[-0.09em]
            text-[#4e4035]/[0.025]
          "
                >
                    The End
                </div>

                <div className="absolute left-[8%] top-16 hidden h-[calc(100%-8rem)] w-px bg-[#4e4035]/[0.05] lg:block" />

                <div className="absolute right-[8%] top-16 hidden h-[calc(100%-8rem)] w-px bg-[#4e4035]/[0.05] lg:block" />

                <span
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
                    THE WEDDING POST · FINAL PAGE
                </span>

                <span
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
                    A &amp; L · 22 NOVEMBER 2026
                </span>
            </div>

            {/* =====================================================
          CONTENT
      ====================================================== */}

            <div className="relative z-10 mx-auto max-w-6xl">
                {/* Top editorial line */}

                <div className="flex items-center gap-3">
                    <span className="font-serif text-[6px] uppercase tracking-[0.3em] text-[#4e4035]/30">
                        Volume 01
                    </span>

                    <span className="h-px flex-1 bg-[#4e4035]/10" />

                    <span className="font-serif text-[6px] uppercase tracking-[0.3em] text-[#4e4035]/30">
                        The Last Page
                    </span>

                    <span className="h-px w-12 bg-[#4e4035]/10" />

                    <span className="font-serif text-[6px] uppercase tracking-[0.3em] text-[#596041]/60">
                        08
                    </span>
                </div>

                {/* =================================================
            MAIN CLOSING
        ================================================== */}

                <div className="mx-auto flex max-w-3xl flex-col items-center px-3 pb-20 pt-20 text-center sm:pb-24 sm:pt-24">
                    <p className="font-serif text-[7px] uppercase tracking-[0.38em] text-[#596041]/65">
                        Until then
                    </p>

                    <h2
                        className="
              mt-7
              text-[72px]
              leading-[0.72]
              tracking-[-0.04em]
              text-[#4e4035]
              sm:text-[105px]
            "
                        style={{
                            fontFamily: '"Nesta Mastone", cursive',
                        }}
                    >
                        See you
                        <br />
                        <span className="ml-[0.12em] text-[#596041]">
                            there.
                        </span>
                    </h2>

                    {/* Handwritten little note */}

                    <div className="mt-10 rotate-[-2deg]">
                        <p
                            className="text-[25px] leading-[1.05] text-[#4e4035]/55 sm:text-[29px]"
                            style={{
                                fontFamily: '"Nesta Mastone", cursive',
                            }}
                        >
                            save a dance for us.
                        </p>

                        <div className="mx-auto mt-4 flex items-center justify-center gap-2">
                            <span className="h-px w-8 bg-[#747a5a]/30" />

                            <Heart
                                size={9}
                                strokeWidth={1}
                                className="text-[#747a5a]/60"
                            />

                            <span className="h-px w-8 bg-[#747a5a]/30" />
                        </div>
                    </div>

                    {/* Date / place */}

                    <div className="mt-12 flex flex-col items-center gap-3">
                        <p className="font-serif text-[8px] uppercase tracking-[0.32em] text-[#4e4035]/45">
                            17 April 2027
                        </p>

                        <span className="h-px w-5 bg-[#596041]/35" />

                        <p className="font-serif text-[8px] uppercase tracking-[0.32em] text-[#4e4035]/45">
                            Ernakulam · Kerala
                        </p>
                    </div>

                    {/* Couple Instagram */}

                    <a
                        href="https://instagram.com/aneenaandloyed"
                        target="_blank"
                        rel="noreferrer"
                        className="
              mt-10
              text-[20px]
              text-[#596041]/65
              transition-colors
              hover:text-[#4e4035]
            "
                        style={{
                            fontFamily: '"Nesta Mastone", cursive',
                        }}
                    >
                        @aneenaandloyed
                    </a>

                    <span className="mt-2 font-serif text-[6px] uppercase tracking-[0.3em] text-[#4e4035]/25">
                        our little corner of the internet
                    </span>
                </div>

                {/* =================================================
            FINAL EDITORIAL RULE
        ================================================== */}

                <div className="flex items-center gap-3">
                    <span className="h-px flex-1 bg-[#4e4035]/10" />

                    <div className="flex items-center gap-2">
                        <span className="size-1 rounded-full bg-[#596041]/45" />
                        <span className="size-1 rounded-full bg-[#596041]/25" />
                        <span className="size-1 rounded-full bg-[#596041]/45" />
                    </div>

                    <span className="h-px flex-1 bg-[#4e4035]/10" />
                </div>

                {/* =================================================
            VERY BOTTOM — WYVERNSTACK PRINTER'S MARK
        ================================================== */}

                <div className="mt-6 flex flex-col items-center gap-2 text-center sm:flex-row sm:justify-between sm:text-left">
                    <div>
                        <p className="font-serif text-[6px] uppercase tracking-[0.28em] text-[#4e4035]/25">
                            Designed &amp; crafted by
                        </p>

                        <p className="mt-1 font-serif text-[8px] uppercase tracking-[0.24em] text-[#4e4035]/45">
                            Wyvernstack
                        </p>
                    </div>

                    <div className="flex items-center gap-3">
                        <a
                            href="https://www.wyvernstack.com"
                            target="_blank"
                            rel="noreferrer"
                            className="
                font-serif
                text-[7px]
                uppercase
                tracking-[0.22em]
                text-[#4e4035]/35
                transition-colors
                hover:text-[#596041]
              "
                        >
                            www.wyvernstack.com
                        </a>

                        <span className="h-3 w-px bg-[#4e4035]/10" />

                        <a
                            href="https://instagram.com/wyvernstack"
                            target="_blank"
                            rel="noreferrer"
                            className="
                font-serif
                text-[7px]
                uppercase
                tracking-[0.22em]
                text-[#4e4035]/35
                transition-colors
                hover:text-[#596041]
              "
                        >
                            @wyvernstack
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}