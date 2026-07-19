import { faqs } from "@/lib/content";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function Faq() {
  return (
    <section className="bg-cream">
      <div className="container-site grid gap-12 py-20 sm:py-24 lg:grid-cols-[0.9fr_1.1fr]">
        <SectionHeading
          align="left"
          eyebrow="FAQs"
          title="Find answers to our most common questions."
          description="Everything you need to know about working with YouWin — and what to expect on your journey."
          className="lg:sticky lg:top-32 lg:self-start"
        />
        <Reveal delay={0.1}>
          <Accordion
            type="single"
            collapsible
            className="rounded-3xl border bg-white px-6 sm:px-8"
          >
            {faqs.map((faq, i) => (
              <AccordionItem key={faq.question} value={`faq-${i}`}>
                <AccordionTrigger>{faq.question}</AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </div>
    </section>
  );
}
