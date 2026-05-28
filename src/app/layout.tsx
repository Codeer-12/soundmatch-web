import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Soundmatch",
  description: "Musik verbindet. Proximity macht es real.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
