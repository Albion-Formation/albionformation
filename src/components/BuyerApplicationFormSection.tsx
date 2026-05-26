import { BuyerMultistepForm } from "@/components/ui/buyer-multistep-form";

const BuyerApplicationFormSection = () => {
  return (
    <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div id="application-form" className="mb-8 mt-10 scroll-mt-24 text-center">
        <h2 className="text-3xl font-bold text-foreground">To place an order, complete the form below</h2>
        <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
          We will get back to you shortly to complete your order
        </p>
      </div>

      <BuyerMultistepForm />
    </main>
  );
};

export default BuyerApplicationFormSection;
