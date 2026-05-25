import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BuyerHeroSection from "@/components/BuyerHeroSection";
// import ScrollytellingFeatures from "@/components/scrollytelling/ScrollytellingFeatures";
import StorytellingCarouselSection from "@/components/StorytellingCarouselSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import FeaturesCarouselSection from "@/components/FeaturesCarouselSection";
import BuyerCtaSection from "@/components/BuyerCtaSection";
import BuyerFaqSection from "@/components/BuyerFaqSection";
import BuyerTrustIndicatorsSection from "@/components/BuyerTrustIndicatorsSection";

const formSchema = z.object({
  firstName: z.string().trim().min(1, "First name is required").max(50, "First name must be less than 50 characters"),
  lastName: z.string().trim().min(1, "Last name is required").max(50, "Last name must be less than 50 characters"),
  phoneNumber: z.string().trim().min(10, "Phone number must be at least 10 digits").max(20, "Phone number must be less than 20 characters"),
  email: z.string().trim().email("Invalid email address").max(255, "Email must be less than 255 characters"),
  confirmEmail: z.string().trim().email("Invalid email address").max(255, "Email must be less than 255 characters"),
  dobMonth: z.string().min(1, "Month is required"),
  dobDate: z.string().min(1, "Date is required"),
  dobYear: z.string().min(1, "Year is required"),
  gdprConsent: z.boolean().refine((val) => val === true, {
    message: "GDPR consent is required for UK/EU leads",
  }),
  privacyConsent: z.boolean().refine((val) => val === true, {
    message: "You must agree to the privacy policy and terms of service",
  }),
  marketingConsent: z.boolean().default(false),
}).refine((data) => data.email === data.confirmEmail, {
  message: "Email addresses do not match",
  path: ["confirmEmail"],
});

type FormData = z.infer<typeof formSchema>;

const NomineeBuyers = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const scrollToForm = () => {
    document.getElementById("application-form")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      phoneNumber: "",
      email: "",
      confirmEmail: "",
      dobMonth: "",
      dobDate: "",
      dobYear: "",
      gdprConsent: false,
      privacyConsent: false,
      marketingConsent: false,
    },
  });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    try {
      const payload = {
        ...data,
        dateOfBirth: `${data.dobYear}-${data.dobMonth}-${data.dobDate}`,
        formType: "nominee-buyers",
      } as const;
      const params = new URLSearchParams();
      Object.entries(payload).forEach(([k, v]) => params.append(k, String(v)));
      const response = await fetch("https://n8n.simpleexel.io/webhook/85afd7b0-935b-4245-8d79-4ee4c397f723", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
        },
        body: params.toString(),
      });

      if (!response.ok) {
        const errorText = await response.text().catch(() => "");
        throw new Error(`Failed to submit form: ${response.status} ${errorText}`);
      }
      
      // Trigger GTM event on successful submission
      const windowWithDataLayer = window as Window & { dataLayer?: Array<Record<string, string>> };
      windowWithDataLayer.dataLayer = windowWithDataLayer.dataLayer || [];
      windowWithDataLayer.dataLayer.push({
        event: "lead_submit_success"
      });
      
      navigate("/thank-you-buyer");
    } catch (error) {
      toast({
        title: "Error",
        description: "There was an error submitting your application. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <BuyerHeroSection />

      {/* <ScrollytellingFeatures /> */}
      <StorytellingCarouselSection />

      <TestimonialsSection />

      <FeaturesCarouselSection />

      <BuyerCtaSection onConsultationClick={scrollToForm} />

      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div id="application-form" className="mb-8 mt-10 text-center scroll-mt-24">

          <h2 className="text-3xl font-bold text-foreground">To place an order, complete the form below</h2>
          <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
          We will get back to you shortly to complete your order
          </p>
        </div>

        <div className="rounded-2xl border border-border bg-card p-6 shadow-lg sm:p-8">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="rounded-xl border border-border/70 bg-background/70 p-5 sm:p-6">
                <h3 className="text-lg font-semibold text-foreground">Contact details</h3>
                <p className="mt-1 text-sm text-muted-foreground">Use the same details you want us to contact you on.</p>

                <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>First Name</FormLabel>
                        <FormControl>
                          <Input className="h-11" placeholder="Enter your first name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Last Name</FormLabel>
                        <FormControl>
                          <Input className="h-11" placeholder="Enter your last name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="mt-4 space-y-4">
                  <FormField
                    control={form.control}
                    name="phoneNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number</FormLabel>
                        <FormControl>
                          <Input className="h-11" placeholder="+44 20 1234 5678" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email Address</FormLabel>
                        <FormControl>
                          <Input className="h-11" placeholder="your.email@example.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="confirmEmail"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Confirm Email Address</FormLabel>
                        <FormControl>
                          <Input className="h-11" placeholder="Confirm your email address" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <div className="space-y-4 rounded-xl border border-border/70 bg-background/70 p-5 sm:p-6">
                <FormLabel className="text-base font-semibold">Date of birth</FormLabel>
                <div className="grid grid-cols-3 gap-4">
                  <FormField
                    control={form.control}
                    name="dobMonth"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Month</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="h-11">
                              <SelectValue placeholder="MM" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="01">01</SelectItem>
                            <SelectItem value="02">02</SelectItem>
                            <SelectItem value="03">03</SelectItem>
                            <SelectItem value="04">04</SelectItem>
                            <SelectItem value="05">05</SelectItem>
                            <SelectItem value="06">06</SelectItem>
                            <SelectItem value="07">07</SelectItem>
                            <SelectItem value="08">08</SelectItem>
                            <SelectItem value="09">09</SelectItem>
                            <SelectItem value="10">10</SelectItem>
                            <SelectItem value="11">11</SelectItem>
                            <SelectItem value="12">12</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="dobDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Date</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="h-11">
                              <SelectValue placeholder="DD" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {Array.from({ length: 31 }, (_, i) => (
                              <SelectItem key={i + 1} value={String(i + 1).padStart(2, '0')}>
                                {String(i + 1).padStart(2, '0')}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="dobYear"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Year</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="h-11">
                              <SelectValue placeholder="YYYY" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {Array.from({ length: 100 }, (_, i) => {
                              const year = new Date().getFullYear() - i;
                              return (
                                <SelectItem key={year} value={String(year)}>
                                  {year}
                                </SelectItem>
                              );
                            })}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <p className="text-sm text-muted-foreground">For example 07 14 1971</p>
              </div>

              <div className="space-y-6 rounded-xl border border-border/70 bg-background/70 p-5 sm:p-6">
                <h3 className="text-lg font-semibold text-foreground">Privacy & consent</h3>
                
                <FormField
                  control={form.control}
                  name="gdprConsent"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center space-x-3 rounded-lg border border-border/60 bg-background p-4">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="leading-none !mt-0">
                        <FormLabel className="text-sm">
                          I consent to the processing of my personal data under GDPR requirements (required for UK/EU leads). *
                        </FormLabel>
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="privacyConsent"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center space-x-3 rounded-lg border border-border/60 bg-background p-4">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="leading-none !mt-0">
                        <FormLabel className="text-sm">
                          I agree to the processing of my personal data as outlined in the{" "}
                          <a href="/privacy" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                            Privacy Policy
                          </a>
                          {" "}and{" "}
                          <a href="/terms" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                            Terms of Service
                          </a>
                          . *
                        </FormLabel>
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="marketingConsent"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center space-x-3 rounded-lg border border-border/60 bg-background p-4">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="leading-none !mt-0">
                        <FormLabel className="text-sm">
                          I consent to receiving marketing communications and analytics tracking (optional)
                        </FormLabel>
                      </div>
                    </FormItem>
                  )}
                />

                <p className="text-xs text-muted-foreground">
                  Your data will be processed securely and will only be shared with our trusted business formation partners.
                </p>
              </div>

              <div className="rounded-xl border border-primary/20 bg-primary/5 p-4">
                <p className="text-sm text-muted-foreground">
                  Once submitted, our team reviews your details and contacts you with the next onboarding steps.
                </p>
              </div>

              <Button 
                type="submit" 
                className="h-12 w-full rounded-xl bg-primary text-primary-foreground hover:bg-primary/90" 
                size="lg"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Submit Registration"}
              </Button>
            </form>
          </Form>
        </div>
      </main>

      <BuyerFaqSection />

      <BuyerTrustIndicatorsSection />

      <Footer />

    </div>
  );
};

export default NomineeBuyers;
