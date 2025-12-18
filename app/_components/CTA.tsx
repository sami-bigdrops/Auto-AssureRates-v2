"use client";

import { useState, useCallback, useEffect } from "react";
import { MapPin, ShieldCheck } from "lucide-react";

export default function CTA() {
  const [zipCode, setZipCode] = useState("");
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);
  const isZipValid = /^\d{5}$/.test(zipCode);

  // Function to fetch user location using server-side IP detection (same as LeadProsper)
  const fetchUserLocation = useCallback(async () => {
    try {
      setIsLoadingLocation(true);
      // Use our API route that uses the same IP detection method as LeadProsper
      const response = await fetch("/api/get-location", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(
          `API returned ${response.status}: ${response.statusText}`
        );
      }

      const data = await response.json();

      if (data.zipCode) {
        setZipCode(data.zipCode);
      } else {
        // Keep empty if location not available
        setZipCode("");
      }
    } catch {
      // Keep empty on error
      setZipCode("");
    } finally {
      setIsLoadingLocation(false);
    }
  }, []);

  // Fetch location after initial render to avoid blocking FCP
  useEffect(() => {
    // Use requestIdleCallback for better performance, fallback to setTimeout
    const scheduleLocationFetch = () => {
      if ("requestIdleCallback" in window) {
        requestIdleCallback(() => fetchUserLocation(), { timeout: 2000 });
      } else {
        setTimeout(() => fetchUserLocation(), 100);
      }
    };

    scheduleLocationFetch();
  }, [fetchUserLocation]);

  // Function to get cookie value
  const getCookie = (name: string): string | null => {
    if (typeof document === "undefined") return null;
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(";").shift() || null;
    return null;
  };

  const handleZipChange = (value: string) => {
    const sanitized = value.replace(/\D/g, "").slice(0, 5);
    setZipCode(sanitized);
  };

  // Function to handle redirect
  const handleContinue = () => {
    // Validate ZIP code is exactly 5 digits
    if (!isZipValid) {
      alert("Please enter a valid 5-digit ZIP code");
      return;
    }

    // Get UTM parameters from cookies
    const utmSource = getCookie("utm_source") || "";
    const utmId = getCookie("utm_id") || "";
    const utmS1 = getCookie("utm_s1") || "";

    // Build the redirect URL
    const baseUrl = "https://auto.assurerates.com";
    const params = new URLSearchParams({
      zip_code: zipCode,
      referrer: "autoquotes.assurerates.com",
      tid: "3108",
    });

    // Map UTM parameters to affiliate tracking parameters
    if (utmSource) params.set("subid", utmSource);
    if (utmId) params.set("subid2", utmId);
    if (utmS1) params.set("c1", utmS1);

    const redirectUrl = `${baseUrl}/form?${params.toString()}`;

    // Redirect to the quote page
    window.location.href = redirectUrl;
  };

  // Handle Enter key press
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleContinue();
    }
  };
  return (
    <section className="w-full bg-[#F0F4F6] py-8 px-3 md:py-12 lg:py-14 xl:px-0">
      <div className="w-full max-w-7xl mx-auto flex flex-col items-center justify-between gap-8 md:gap-10 lg:gap-12">
        <div className="w-full max-w-xl mx-auto space-y-3 text-center px-2 md:px-0">
          <h2 className="text-3xl md:text-4xl text-center font-semibold font-poppins leading-tight">
            Get Auto Insurance Rates Options{" "}
            <span className="bg-linear-to-r from-[#00AEEF] to-[#3476DB] bg-clip-text text-transparent font-poppins">
              Today
            </span>
          </h2>
          <p className="text-base md:text-lg text-[#4A5568] font-roboto">
            See what options are available for your car and location right now
          </p>
        </div>
        <div className="w-full flex flex-col md:flex-row lg:flex-col xl:flex-row items-center justify-center lg:items-start gap-4">
          <div className="relative w-full max-w-xs">
            <MapPin className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-[#1ABC9C]" />
            <input
              type="text"
              placeholder="Enter your ZIP code"
              value={zipCode}
              onChange={(e) => handleZipChange(e.target.value)}
              onKeyDown={handleKeyPress}
              className="w-full h-14 pl-11 pr-3 rounded-md border border-[#AFCAEF] bg-white"
            />
          </div>
          <button
            onClick={handleContinue}
            className="w-full h-14 max-w-xs min-w-[260px] bg-linear-to-r from-[#07A5EC] to-[#3476DB] text-white px-4 py-2 rounded-md font-semibold font-poppins flex items-center justify-center gap-2 whitespace-nowrap transition-opacity disabled:cursor-not-allowed disabled:from-[#AEC5E9] disabled:to-[#AEC5E9] disabled:text-[#FFFFFF] disabled:opacity-80"
            disabled={isLoadingLocation || !isZipValid}
          >
            <span className="text-base lg:text-lg font-roboto">
              Get My Free Quote
            </span>
            {isLoadingLocation && (
              <span
                aria-live="polite"
                className="inline-flex h-4 w-4 animate-spin rounded-full border-2 border-white/70 border-t-transparent"
              />
            )}
          </button>
        </div>
        <div className="flex items-center justify-center lg:justify-start gap-2">
          <ShieldCheck className="w-6 h-6 text-[#1ABC9C]" />
          <span className="text-base lg:text-lg font-roboto">
            Takes under 3 minutes. No obligation.
          </span>
        </div>
      </div>
    </section>
  );
}
