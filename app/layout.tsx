import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "BidStack — Professional Proposals for Specialty Trades",
  description: "Win more jobs with AI-powered bid proposals built for electricians, plumbers, HVAC, and painters. Stop losing hours on Word docs.",
  keywords: "bid software, construction proposals, subcontractor, electrical bid, plumbing estimate, HVAC proposal",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
