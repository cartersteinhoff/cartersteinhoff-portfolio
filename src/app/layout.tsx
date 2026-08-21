import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import { JsonLd } from "@/components/json-ld";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getAbsoluteUrl, getSiteUrl, site } from "@/data/site";
import { defaultSocialImage } from "@/lib/seo";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const cormorantGaramond = Cormorant_Garamond({
  variable: "--font-display",
  subsets: ["latin"],
  weight: "variable",
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  applicationName: site.name,
  title: {
    default: `${site.name} | ${site.seoTitle}`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  authors: [{ name: site.name, url: "/" }],
  creator: site.name,
  publisher: site.name,
  category: "technology",
  alternates: {
    canonical: "/",
    types: {
      "text/markdown": "/index.md",
    },
  },
  manifest: "/manifest.webmanifest",
  openGraph: {
    title: `${site.name} | ${site.seoTitle}`,
    description: site.description,
    type: "website",
    url: "/",
    siteName: site.name,
    locale: "en_US",
    images: [defaultSocialImage],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} | ${site.seoTitle}`,
    description: site.description,
    images: [{ url: "/twitter-image", alt: site.socialImageAlt }],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export const viewport: Viewport = {
  themeColor: "#0b0c0c",
  colorScheme: "dark light",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const siteUrl = getSiteUrl();
  const personId = `${siteUrl}/#person`;
  const serviceId = `${siteUrl}/#professional-service`;
  const websiteId = `${siteUrl}/#website`;
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": personId,
        name: site.name,
        url: `${siteUrl}/`,
        jobTitle: site.role,
        description: site.description,
        email: site.email,
        sameAs: [site.linkedinUrl, site.upworkUrl],
        homeLocation: {
          "@type": "Place",
          name: site.location,
        },
        knowsAbout: site.serviceTypes,
      },
      {
        "@type": "ProfessionalService",
        "@id": serviceId,
        name: site.name,
        url: `${siteUrl}/`,
        image: getAbsoluteUrl("/opengraph-image"),
        description: site.description,
        email: site.email,
        founder: {
          "@id": personId,
        },
        address: {
          "@type": "PostalAddress",
          addressLocality: "Phoenix",
          addressRegion: "AZ",
          addressCountry: "US",
        },
        areaServed: {
          "@type": "City",
          name: site.location,
        },
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Digital services",
          itemListElement: site.serviceTypes.map((serviceName) => ({
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: serviceName,
            },
          })),
        },
      },
      {
        "@type": "WebSite",
        "@id": websiteId,
        name: site.name,
        url: `${siteUrl}/`,
        description: site.description,
        publisher: {
          "@id": personId,
        },
      },
    ],
  };

  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body className={`${manrope.variable} ${cormorantGaramond.variable}`}>
        <JsonLd id="site-structured-data" data={structuredData} />
        <a className="skip-link" href="#main-content">
          Skip to main content
        </a>
        <SiteHeader />
        <div id="main-content" tabIndex={-1}>
          {children}
        </div>
        <SiteFooter />
      </body>
    </html>
  );
}
