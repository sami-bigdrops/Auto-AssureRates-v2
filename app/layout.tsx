import type { Metadata } from "next";
import { Poppins, Roboto } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"
import TrackingHandler from "@/components/TrackingHandler";

const poppins = Poppins({
  variable: "--poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const roboto = Roboto({
  variable: "--roboto",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "Auto AssureRates",
  description:
    "Auto AssureRates provides affordable and reliable auto insurance services across the United States. Get competitive quotes, excellent customer support, and secure coverage tailored to your needs.",
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isMaintenanceMode = true;

  return (
    <html lang="en">
      <body className={`${poppins.variable} ${roboto.variable} antialiased overflow-x-hidden overflow-y-auto`}>
        <main className="w-full mx-auto">
          <TrackingHandler />
          {isMaintenanceMode ? (
            <div className="min-h-screen w-full flex items-center justify-center px-6 text-center">
              <div>
                <h1 className="text-4xl font-bold">Under Maintenance</h1>
                <p className="mt-4 text-base opacity-80">
                  We are currently performing scheduled maintenance. Please check back soon.
                </p>
              </div>
            </div>
          ) : (
            children
          )}
        </main>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
