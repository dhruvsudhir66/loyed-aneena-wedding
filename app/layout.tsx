import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Our Wedding | Save the Date",
  description: "A quiet, modern wedding invitation in sage, olive, cream and warm earth tones.",
  metadataBase: new URL("https://example.com"),
  openGraph: {
    title: "Our Wedding | Save the Date",
    description: "Join us as we begin our next chapter together.",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#2f3524",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
