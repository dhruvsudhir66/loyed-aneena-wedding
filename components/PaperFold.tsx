"use client";

export default function PaperFold() {
    return (
        <div
            className="
        relative
        z-20
        -mt-1
        h-[72px]
        overflow-hidden
        bg-[#e9e4da]
      "
            aria-hidden="true"
        >
            {/* Same crumpled paper texture as Hero */}
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

            {/* Same warm paper wash as Hero */}
            <div className="absolute inset-0 bg-[#eee9df]/48" />

            {/* Same subtle sand tone as Hero */}
            <div
                className="
          absolute
          inset-0
          bg-[#d8c6a9]/[0.06]
          mix-blend-multiply
        "
            />

            {/* Paper grain */}
            <div
                className="
          absolute
          inset-0
          opacity-[0.16]
          mix-blend-multiply
          [background-image:
            radial-gradient(
              rgba(78,64,53,0.28) 0.45px,
              transparent 0.65px
            )
          ]
          [background-size:3px_3px]
        "
            />

            {/* Paper fold */}
            <svg
                className="
          absolute
          bottom-[-1px]
          left-0
          h-[58px]
          w-full
        "
                viewBox="0 0 1200 80"
                preserveAspectRatio="none"
            >
                <defs>
                    <filter
                        id="paper-fold-shadow"
                        x="-20%"
                        y="-50%"
                        width="140%"
                        height="200%"
                    >
                        <feGaussianBlur stdDeviation="4" />
                    </filter>
                </defs>

                {/* Soft shadow underneath the fold */}
                <path
                    d="
            M0 35
            C70 27 125 42 195 34
            C270 25 320 40 390 33
            C465 25 525 42 600 32
            C675 22 735 41 810 33
            C885 25 950 42 1025 33
            C1095 25 1145 38 1200 31
            L1200 80
            L0 80
            Z
          "
                    fill="rgba(78,64,53,0.08)"
                    filter="url(#paper-fold-shadow)"
                    transform="translate(0 5)"
                />

                {/* Main irregular fold */}
                <path
                    d="
            M0 27
            C65 19 125 34 195 26
            C270 17 320 32 390 25
            C465 17 525 34 600 24
            C675 14 735 33 810 25
            C885 17 950 34 1025 25
            C1095 17 1145 30 1200 23
            L1200 80
            L0 80
            Z
          "
                    fill="#e9e4da"
                />

                {/* Soft highlight along the fold */}
                <path
                    d="
            M0 26
            C65 18 125 33 195 25
            C270 16 320 31 390 24
            C465 16 525 33 600 23
            C675 13 735 32 810 24
            C885 16 950 33 1025 24
            C1095 16 1145 29 1200 22
          "
                    fill="none"
                    stroke="rgba(255,255,255,0.32)"
                    strokeWidth="1"
                />

                {/* Subtle crease below the highlight */}
                <path
                    d="
            M0 31
            C65 23 125 38 195 30
            C270 21 320 36 390 29
            C465 21 525 38 600 28
            C675 18 735 37 810 29
            C885 21 950 38 1025 29
            C1095 21 1145 34 1200 27
          "
                    fill="none"
                    stroke="rgba(78,64,53,0.06)"
                    strokeWidth="1"
                />
            </svg>
        </div>
    );
}