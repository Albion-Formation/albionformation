import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";

const FAQ = () => {
  const faqs = [
    {
      question: "Is a nominee director legal in the UK?",
      answer: "Yes, nominee directors are completely legal in the UK. This is a widely accepted practice that allows company owners to maintain privacy while ensuring compliance with Companies House requirements."
    },
    {
      question: "How long does the setup process take?",
      answer: "Our typical setup process takes 24 hours from the initial consultation to completion. In some cases, it may be completed even faster depending on the complexity of your requirements."
    },
    {
      question: "Can I remove a nominee director later?",
      answer: "Yes, you can remove a nominee director at any time by filing the appropriate forms with Companies House. We can assist you with this process if needed."
    },
    {
      question: "Do you offer nominee shareholders as well?",
      answer: "Yes, we offer both nominee director and nominee shareholder services. We can discuss your specific needs during the consultation to determine the best structure for your business."
    },
    {
      question: "What documents are required to get started?",
      answer: "You'll need to provide identification documents, proof of address, and details about your company. Our team will provide you with a complete list during your consultation."
    },
    {
      question: "Will the nominee director have any control over my company?",
      answer: "No, the nominee director acts only as instructed by you. You retain full control over your company's operations and decisions through our legal agreements."
    },
    {
      question: "What ongoing responsibilities do I have?",
      answer: "You'll need to ensure that the nominee director is kept informed of significant company matters and that all legal requirements are met. We provide ongoing support to help you maintain compliance."
    }
  ];

  return (
    <section className="py-16 lg:py-24 bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-6">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-muted-foreground">
            Get answers to the most common questions about our nominee director services.
          </p>
        </div>
        
        <Accordion type="single" collapsible className="mb-16">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-left font-semibold">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
        
        <div className="text-center">
          <h3 className="text-2xl font-bold text-foreground mb-4">Still Have Questions?</h3>
          <p className="text-muted-foreground mb-6">
            Our experts are here to help. Book a free consultation to get personalized answers to your specific situation.
          </p>
          <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
            Book Free Consultation
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FAQ;