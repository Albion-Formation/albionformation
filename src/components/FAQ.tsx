import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import BookConsultationDialog from "@/components/BookConsultationDialog";

const FAQ = () => {
  const faqs = [
    {
      question: "Is a nominee director legal in the UK?",
      answer: "Absolutely yes — when done correctly with proper documentation. Nominee directors are fully compliant with the UK Companies Act 2006, recognised by Companies House, and used by thousands of legitimate businesses. The key requirements are: a Declaration of Trust must be in place before appointment, the true beneficial owner must be listed on the PSC (People with Significant Control) register, and HMRC must know the true beneficial ownership. Our arrangements include all required legal documentation to ensure full compliance."
    },
    {
      question: "How does the nominee director service actually work?",
      answer: "Here's the process step by step: (1) You provide your company details and requirements. (2) We complete KYC/AML identity verification — this is a legal requirement. (3) We draft and sign the Nominee Director Agreement, Declaration of Trust, and Power of Attorney. (4) The nominee director is appointed at Companies House. (5) You receive all signed agreements and documentation. Ongoing, the nominee is listed on the public register, but you retain full control via the legal agreements. All major decisions require your approval, and the nominee acts strictly under your instruction."
    },
    {
      question: "Will the nominee director have control over my company or bank accounts?",
      answer: "No. The nominee director acts only as instructed by you. They cannot make business decisions without your approval, access bank accounts without your authorisation, act independently, or interfere with day-to-day operations. Your control is maintained through the Declaration of Trust (confirming your beneficial ownership), Power of Attorney (giving you authority to act), and the Director Services Agreement (setting out the nominee's limited role). You remain the beneficial owner at all times."
    },
    {
      question: "Why would I need a nominee director?",
      answer: "There are several common reasons: (1) Privacy Protection — keep your personal details off the public Companies House register. (2) UK Residency Requirement — most UK banks require a UK-resident director to open a business account. (3) Business Credibility — a UK-resident director enhances trust with UK clients, suppliers, and contract partners. (4) Non-UK Residents — if you're based outside the UK, a nominee lets you maintain a UK corporate presence and satisfy banking/legal requirements. (5) Time Zones — a UK-based signatory available during UK business hours for urgent documents."
    },
    {
      question: "How long does the setup process take?",
      answer: "Standard setup takes 24–48 hours from initial consultation to completion. We also offer same-day express service (3–6 hours) for urgent requirements. The timeline includes: name availability check (instant), document preparation (same day), Companies House submission (same day), and Certificate of Incorporation (24–48 hours standard, same day express). Your company can start trading immediately after incorporation."
    },
    {
      question: "What documents will I receive?",
      answer: "You receive a comprehensive set of legally binding documents: Nominee Director Agreement, Declaration of Trust (confirming your beneficial ownership), Power of Attorney (general authority to act), Indemnity Agreement, Director's Consent to Act, and Companies House filing confirmation. These documents ensure you have full legal protection and control over your company."
    },
    {
      question: "Can I remove or replace a nominee director later?",
      answer: "Yes, you can remove a nominee director at any time by filing the appropriate forms with Companies House. We also offer a transfer service (£250) if you want to switch to a different nominee, or a replacement service (£150). Many clients eventually appoint themselves as director once they no longer need the privacy or UK residency benefits."
    },
    {
      question: "What directorship structures are available?",
      answer: "We offer flexible arrangements: (1) Nominee Director Only — maximum privacy, your name not on the director register (though you appear on the PSC register as beneficial owner). (2) You + Nominee Director — both names on public register, nominee provides UK residency while you maintain visible involvement. (3) Multiple Directors + Nominee — for business partnerships needing UK presence. (4) Corporate Nominee Director — a corporate entity acts as director for higher privacy and credibility."
    },
    {
      question: "Do you offer nominee shareholders as well?",
      answer: "Yes, we offer both nominee director and nominee shareholder services. A nominee shareholder holds shares on your behalf, providing an additional layer of privacy. This is often combined with nominee director services in our Premium and Professional formation packages. We'll discuss the best structure for your needs during the consultation."
    },
    {
      question: "Can non-UK residents form a UK company?",
      answer: "Yes! There are no nationality or residency restrictions for forming a UK company. You can be based anywhere in the world and own 100% of the shares. However, most UK banks require a UK-resident director for account opening — this is where our Nominee Director service becomes essential. We also provide registered office addresses, company secretary services, and can assist with UK business bank account applications."
    },
    {
      question: "What are the ongoing costs and responsibilities?",
      answer: "Nominee Director service starts from £499/year (Standard) or £799/year (Premium with unlimited document signing and bank account support). Ongoing responsibilities include filing annual accounts and confirmation statements (which the nominee can sign), paying UK Corporation Tax on profits, and maintaining the PSC register. We provide compliance reminders and can handle all filings on your behalf."
    },
    {
      question: "Is my information kept confidential?",
      answer: "Your personal details are protected from the public register — the nominee director's details appear instead. However, it's important to understand that the nominee arrangement doesn't hide beneficial ownership from authorities. Your details are disclosed on the PSC register (a legal requirement), to HMRC, and to financial institutions as required by anti-money laundering regulations. We are ICO registered, GDPR compliant, and maintain strict data protection protocols."
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
            Detailed answers to help you understand exactly how our nominee director services work.
          </p>
        </div>
        
        <Accordion type="single" collapsible className="mb-16">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-left font-semibold">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed">
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
          <BookConsultationDialog
            trigger={
              <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
                Book Free Consultation
              </Button>
            }
          />
        </div>
      </div>
    </section>
  );
};

export default FAQ;
