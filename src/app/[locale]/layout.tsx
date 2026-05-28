import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { Syne, DM_Sans, Space_Mono } from "next/font/google";
import "../globals.css";

const syne = Syne({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["700", "800"],
});

const dmSans = DM_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700", "800"],
});

const spaceMono = Space_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "Soundmatch – Musik verbindet",
  description:
    "Finde Menschen mit derselben musikalischen DNA. Community-App basierend auf deinem echten Musikgeschmack.",
  keywords: ["Soundmatch", "Musik", "Community", "Match", "Radar", "Spotify"],
  openGraph: {
    title: "Soundmatch – Musik verbindet",
    description: "Finde Menschen mit derselben musikalischen DNA.",
    type: "website",
  },
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const messages = await getMessages();

  return (
    <html
      lang={locale}
      className={`${syne.variable} ${dmSans.variable} ${spaceMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-sm-bg text-sm-text">
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
