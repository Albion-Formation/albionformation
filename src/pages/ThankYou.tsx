import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";

const ThankYou = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/");
    }, 5000); // 5 seconds

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="w-full bg-background border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex-shrink-0">
              <h1 className="text-2xl font-bold text-foreground">ALBION</h1>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl w-full text-center">
          <div className="mb-8 flex justify-center">
            <CheckCircle className="w-24 h-24 text-primary" />
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Thank You!
          </h1>
          
          <p className="text-xl text-muted-foreground mb-8">
            Your application has been submitted successfully. We'll be in touch within 24 hours to discuss your business formation requirements.
          </p>
          
          <div className="bg-card border border-border rounded-lg p-6 mb-8">
            <h2 className="text-lg font-semibold text-foreground mb-3">
              What happens next?
            </h2>
            <ul className="text-left space-y-3 text-muted-foreground">
              <li className="flex items-start">
                <span className="text-primary mr-2">•</span>
                <span>Our team will review your application</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-2">•</span>
                <span>You'll receive a confirmation email shortly</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-2">•</span>
                <span>We'll contact you within 24 hours to discuss next steps</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-2">•</span>
                <span>Your business formation process will begin once confirmed</span>
              </li>
            </ul>
          </div>
          
          <Button 
            onClick={() => navigate("/")}
            className="bg-primary text-primary-foreground hover:bg-primary/90"
            size="lg"
          >
            Return to Home
          </Button>
        </div>
      </main>
    </div>
  );
};

export default ThankYou;
