import { Heart } from "lucide-react";

export default function Footer() {
    return (
        <footer className="relative overflow-hidden bg-[#e9e4da] px-5 pb-5 pt-10 text-[#4e4035] sm:px-8 sm:pb-6 sm:pt-12">

            {/* PAPER TEXTURE */}
            <div className="pointer-events-none absolute inset-0">
                <div
                    className="absolute inset-0 bg-[#e9e4da] bg-[url('/crumpled-paper.jpg')] bg-repeat"
                    style={{ backgroundSize: "900px auto" }}
                />

                <div className="absolute inset-0 bg-[#eee9df]/48" />
                <div className="absolute inset-0 bg-[#d8c6a9]/[0.06] mix-blend-multiply" />

                <div
                    className="absolute inset-0 opacity-[0.12] mix-blend-multiply"
                    style={{
                        backgroundImage:
                            "radial-gradient(rgba(78,64,53,0.28) 0.45px, transparent 0.65px)",
                        backgroundSize: "3px 3px",
                    }}
                />
            </div>

            {/* FAINT BACKGROUND TYPE */}
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
                <div
                    className="
                        absolute
                        bottom-[-4%]
                        left-1/2
                        -translate-x-1/2
                        whitespace-nowrap
                        font-serif
                        text-[100px]
                        font-black
                        uppercase
                        leading-none
                        tracking-[-0.09em]
                        text-[#4e4035]/[0.018]
                        sm:text-[150px]
                    "
                >
                    The End
                </div>

                <div className="absolute left-[8%] top-10 hidden h-[calc(100%-5rem)] w-px bg-[#4e4035]/[0.04] lg:block" />
                <div className="absolute right-[8%] top-10 hidden h-[calc(100%-5rem)] w-px bg-[#4e4035]/[0.04] lg:block" />

                <span
                    className="
                        absolute left-[2.5%] top-1/2 hidden
                        -translate-y-1/2 -rotate-90
                        font-serif text-[5px] uppercase
                        tracking-[0.35em] text-[#4e4035]/[0.14]
                        lg:block
                    "
                >
                    THE WEDDING POST · FINAL PAGE
                </span>

                <span
                    className="
                        absolute right-[2.5%] top-1/2 hidden
                        translate-y-1/2 rotate-90
                        font-serif text-[5px] uppercase
                        tracking-[0.35em] text-[#4e4035]/[0.14]
                        lg:block
                    "
                >
                    A &amp; L · 22 NOVEMBER 2026
                </span>
            </div>

            {/* CONTENT */}
            <div className="relative z-10 mx-auto max-w-5xl">

                {/* TOP EDITORIAL LINE */}
                <div className="flex items-center gap-3">
                    <span className="font-serif text-[5px] uppercase tracking-[0.3em] text-[#4e4035]/30">
                        Volume 01
                    </span>

                    <span className="h-px flex-1 bg-[#4e4035]/10" />

                    <span className="font-serif text-[5px] uppercase tracking-[0.3em] text-[#4e4035]/30">
                        The Last Page
                    </span>

                    <span className="h-px w-8 bg-[#4e4035]/10" />

                    <span className="font-serif text-[5px] tracking-[0.3em] text-[#596041]/60">
                        08
                    </span>
                </div>

                {/* SMALL CLOSING */}
                <div className="flex flex-col items-center px-3 pb-8 pt-8 text-center sm:pb-10 sm:pt-10">

                    <p className="font-serif text-[6px] uppercase tracking-[0.35em] text-[#596041]/65">
                        Until then
                    </p>

                    <h2
                        className="
                            mt-3
                            text-[42px]
                            leading-[0.78]
                            tracking-[-0.04em]
                            text-[#4e4035]
                            sm:text-[54px]
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

                    {/* HANDWRITTEN NOTE */}
                    <div className="mt-5 rotate-[-2deg]">
                        <p
                            className="text-[18px] leading-none text-[#4e4035]/55 sm:text-[20px]"
                            style={{
                                fontFamily: '"Nesta Mastone", cursive',
                            }}
                        >
                            save a dance for us.
                        </p>

                        <div className="mx-auto mt-2 flex items-center justify-center gap-2">
                            <span className="h-px w-5 bg-[#747a5a]/30" />

                            <Heart
                                size={7}
                                strokeWidth={1}
                                className="text-[#747a5a]/60"
                            />

                            <span className="h-px w-5 bg-[#747a5a]/30" />
                        </div>
                    </div>

                    {/* DATE / PLACE */}
                    <div className="mt-6 flex items-center gap-3">
                        <p className="font-serif text-[6px] uppercase tracking-[0.3em] text-[#4e4035]/45">
                            17 April 2027
                        </p>

                        <span className="h-3 w-px bg-[#596041]/25" />

                        <p className="font-serif text-[6px] uppercase tracking-[0.3em] text-[#4e4035]/45">
                            Ernakulam · Kerala
                        </p>
                    </div>

                    {/* COUPLE INSTAGRAM */}
                    <a
                        href="https://instagram.com/aneenaandloyed"
                        target="_blank"
                        rel="noreferrer"
                        className="
                            mt-5
                            text-[15px]
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

                    <span className="mt-1 font-serif text-[5px] uppercase tracking-[0.3em] text-[#4e4035]/25">
                        our little corner of the internet
                    </span>
                </div>

                {/* FINAL RULE */}
                <div className="flex items-center gap-3">
                    <span className="h-px flex-1 bg-[#4e4035]/10" />

                    <div className="flex items-center gap-1.5">
                        <span className="size-[3px] rounded-full bg-[#596041]/45" />
                        <span className="size-[3px] rounded-full bg-[#596041]/25" />
                        <span className="size-[3px] rounded-full bg-[#596041]/45" />
                    </div>

                    <span className="h-px flex-1 bg-[#4e4035]/10" />
                </div>

                {/* WYVERNSTACK CREDIT */}
                <div className="mt-4 flex flex-col items-center gap-2 text-center sm:flex-row sm:justify-between sm:text-left">

                    <div className="flex items-center gap-2">
                        <p className="font-serif text-[5px] uppercase tracking-[0.25em] text-[#4e4035]/25">
                            Designed &amp; crafted by
                        </p>

                        <span className="h-2 w-px bg-[#4e4035]/10" />

                        <p className="font-serif text-[6px] uppercase tracking-[0.22em] text-[#4e4035]/45">
                            Wyvernstack
                        </p>
                    </div>

                    <div className="flex items-center gap-3">
                        <a
                            href="https://www.wyvernstack.com"
                            target="_blank"
                            rel="noreferrer"
                            className="
                                font-serif text-[5px]
                                uppercase tracking-[0.22em]
                                text-[#4e4035]/35
                                transition-colors
                                hover:text-[#596041]
                            "
                        >
                            www.wyvernstack.com
                        </a>

                        <span className="h-2 w-px bg-[#4e4035]/10" />

                        <a
                            href="https://instagram.com/wyvernstack"
                            target="_blank"
                            rel="noreferrer"
                            className="
                                font-serif text-[5px]
                                uppercase tracking-[0.22em]
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