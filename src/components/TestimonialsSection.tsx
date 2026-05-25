import { Testimonial } from "@/components/ui/clean-testimonial";

const TestimonialsSection = () => {
  return (
    <section className="border-t border-border bg-background py-16 lg:py-24" aria-label="Client testimonials">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <header className="mx-auto mb-4 max-w-3xl text-center lg:mb-8">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            Client Testimonials
          </p>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Trusted by international founders worldwide
          </h2>
        </header>

        <Testimonial />
      </div>
    </section>
  );
};

export default TestimonialsSection;
