"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    adsbygoogle: unknown[];
  }
}

export default function AdBanner() {
  const adClient =
    process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_ID;

  useEffect(() => {
    try {
      if (adClient) {
        (
          window.adsbygoogle =
            window.adsbygoogle || []
        ).push({});
      }
    } catch {}
  }, [adClient]);

  if (!adClient) {
    return null;
  }

  return (
    <div className="my-8 overflow-hidden rounded-2xl border border-red-900/20 bg-zinc-900 p-4">
      <ins
        className="adsbygoogle"
        style={{
          display: "block",
        }}
        data-ad-client={adClient}
        data-ad-slot="YOUR_AD_SLOT"
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
}