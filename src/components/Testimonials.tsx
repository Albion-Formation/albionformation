import { Card } from "@/components/ui/card";
import { Star } from "lucide-react";

const Testimonials = () => {
  const testimonials = [
    {
      quote: "The nominee director service was exactly what I needed for my privacy. Professional, quick, and completely transparent about the legal requirements.",
      initials: "SJ",
      name: "Sarah Johnson",
      title: "Business Owner"
    },
    {
      quote: "Outstanding service from start to finish. The team was knowledgeable and the setup was completed in under 24 hours as promised.",
      initials: "MC",
      name: "Michael Chen",
      title: "Investment Manager"
    },
    {
      quote: "I needed a UK nominee director for my startup. The consultation was thorough and they guided me through every step of the process.",
      initials: "ER",
      name: "Emma Rodriguez",
      title: "Tech Entrepreneur"
    }
  ];

  const stats = [
    { number: "4.9/5", label: "Average Rating" },
    { number: "Over 500+", label: "Satisfied Clients" },
    { number: "99%", label: "Success Rate" }
  ];

  return (
    <section className="py-16 lg:py-24 bg-secondary/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-6">
            What Our Clients Say
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Don't just take our word for it. Here's what our satisfied clients have to say about our nominee director services.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="p-6">
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-muted-foreground mb-6 italic">
                "{testimonial.quote}"
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-semibold">
                  {testimonial.initials}
                </div>
                <div>
                  <p className="font-semibold text-foreground">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.title}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 text-center">
          {stats.map((stat, index) => (
            <div key={index}>
              <div className="text-3xl font-bold text-foreground mb-2">{stat.number}</div>
              <div className="text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;