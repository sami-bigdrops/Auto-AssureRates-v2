import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | AssureRates",
  description: "Privacy policy for using AssureRates's insurance comparison services.",
};

export default function PrivacyPolicyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-screen overflow-y-auto">
      {children}
    </div>
  );
}
