import type { Metadata } from "next";
import "@Styles/globals.css";

export const metadata: Metadata = {
  title: "Rendezvous",
  description: "Rendezvous is a entertainment studio",
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
