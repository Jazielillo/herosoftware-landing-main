import Script from "next/script";

export const UmamiAnalytics = () => {
  const websiteId = process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID;
  if (!websiteId) {
    return null;
  }

  console.log("Umami Analytics enabled");
  return (
    <Script
      async
      data-website-id={websiteId} // Replace with your Umami instance URL if self-hosting
      src="https://cloud.umami.is/script.js"
    />
  );
};
