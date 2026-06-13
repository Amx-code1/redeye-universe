import Script from "next/script";

export default function AdScript() {
  const adClient =
    process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_ID;

  if (!adClient) return null;

  return (
    <Script
      async
      strategy="afterInteractive"
      crossOrigin="anonymous"
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adClient}`}
    />
  );
}