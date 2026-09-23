"use client";

export default function PaperSeam() {
    return (
        <div
            className="
        pointer-events-none
        relative
        z-20
        -my-[18px]
        h-[36px]
        overflow-visible
      "
            aria-hidden="true"
        >
            {/* Very soft crease shadow */}
            <svg
                className="absolute left-0 top-0 h-full w-full"
                viewBox="0 0 1200 36"
                preserveAspectRatio="none"
            >
                <defs>
                    <filter
                        id="seam-blur"
                        x="-10%"
                        y="-200%"
                        width="120%"
                        height="500%"
                    >
                        <feGaussianBlur stdDeviation="2.8" />
                    </filter>

                    <filter
                        id="seam-soft-blur"
                        x="-10%"
                        y="-200%"
                        width="120%"
                        height="500%"
                    >
                        <feGaussianBlur stdDeviation="1.2" />
                    </filter>
                </defs>

                {/* Deepest part of the crease */}
                <path
                    d="
            M0 19
            C70 16 115 21 180 18
            C245 15 300 21 365 18
            C430 15 490 21 555 18
            C620 15 680 21 745 18
            C810 15 870 21 935 18
            C1000 15 1060 21 1120 18
            C1155 17 1180 19 1200 18
          "
                    fill="none"
                    stroke="rgba(78,64,53,0.075)"
                    strokeWidth="5"
                    filter="url(#seam-blur)"
                />

                {/* Soft lower shadow */}
                <path
                    d="
            M0 21
            C70 18 115 23 180 20
            C245 17 300 23 365 20
            C430 17 490 23 555 20
            C620 17 680 23 745 20
            C810 17 870 23 935 20
            C1000 17 1060 23 1120 20
            C1155 19 1180 21 1200 20
          "
                    fill="none"
                    stroke="rgba(78,64,53,0.035)"
                    strokeWidth="2"
                    filter="url(#seam-soft-blur)"
                />

                {/* Paper highlight */}
                <path
                    d="
            M0 15
            C70 12 115 17 180 14
            C245 11 300 17 365 14
            C430 11 490 17 555 14
            C620 11 680 17 745 14
            C810 11 870 17 935 14
            C1000 11 1060 17 1120 14
            C1155 13 1180 15 1200 14
          "
                    fill="none"
                    stroke="rgba(255,255,255,0.22)"
                    strokeWidth="1"
                />
            </svg>

            {/* Tiny irregular paper texture variation */}
            <div
                className="
          absolute
          left-0
          right-0
          top-1/2
          h-[12px]
          -translate-y-1/2
          opacity-[0.16]
          mix-blend-multiply
          [background-image:
            radial-gradient(
              rgba(78,64,53,0.18) 0.45px,
              transparent 0.7px
            )
          ]
          [background-size:4px_4px]
        "
            />
        </div>
    );
}