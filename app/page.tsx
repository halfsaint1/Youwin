import type { Metadata } from "next";

import { site } from "@/lib/site";
import { Hero } from "@/components/sections/hero";
import { WhoWeAre } from "@/components/sections/who-we-are";
import { ServicesGrid } from "@/components/sections/services-grid";
import { Roadmap } from "@/components/sections/roadmap";
import { Destinations } from "@/components/sections/destinations";
import { TestimonialsCarousel } from "@/components/sections/testimonials-carousel";
import { CtaBand } from "@/components/sections/cta-band";
import { BlogPreview } from "@/components/sections/blog-preview";

export const metadata: Metadata = {
  title: { absolute: `Study Abroad Consultants | ${site.name}` },
  description:
    "Unlock your future beyond borders. YouWin Educational Consulting offers expert advice, visa support, and a clear path to studying abroad in the UK, Ireland, USA, Canada, and Australia.",
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <>
      <Hero />
      <WhoWeAre />
      <ServicesGrid />
      <Roadmap />
      <TestimonialsCarousel />
      <Destinations />
      <CtaBand />
      <BlogPreview />
    </>
  );
}
