import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Mail } from "lucide-react";

interface BookConsultationDialogProps {
  trigger: React.ReactNode;
}

const BookConsultationDialog = ({ trigger }: BookConsultationDialogProps) => {
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      toast({ title: "Please fill in all fields", variant: "destructive" });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast({ title: "Please enter a valid email address", variant: "destructive" });
      return;
    }

    setIsSubmitting(true);
    try {
      await fetch("https://n8n.simpleexel.io/webhook/bf95823e-80a0-470e-8c74-32f51eebe3f7", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
        mode: "no-cors",
      });

      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({ event: "lead_submit_success" });

      setSubmitted(true);
      setFormData({ name: "", email: "", message: "" });
    } catch {
      toast({ title: "Something went wrong. Please try again.", variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleOpenChange = (value: boolean) => {
    setOpen(value);
    if (!value) {
      setSubmitted(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Book a Free Consultation</DialogTitle>
        </DialogHeader>

        {submitted ? (
          <div className="text-center py-6">
            <h3 className="text-lg font-semibold text-foreground mb-2">Thank You!</h3>
            <p className="text-muted-foreground mb-4">
              We've received your request and will be in touch shortly.
            </p>
            <p className="text-sm text-muted-foreground">
              You can also reach out to us at{" "}
              <a href="mailto:support@albionformation.com" className="text-primary underline font-medium">
                support@albionformation.com
              </a>
            </p>
          </div>
        ) : (
          <>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="consult-name">Name</Label>
                <Input
                  id="consult-name"
                  placeholder="Your full name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  maxLength={100}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="consult-email">Email</Label>
                <Input
                  id="consult-email"
                  type="email"
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  maxLength={255}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="consult-message">Message</Label>
                <Textarea
                  id="consult-message"
                  placeholder="Tell us about your requirements..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  maxLength={1000}
                  rows={4}
                  required
                />
              </div>
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? "Submitting..." : "Submit"}
              </Button>
            </form>
            <p className="text-sm text-muted-foreground text-center flex items-center justify-center gap-1">
              <Mail className="w-3.5 h-3.5" />
              You can also reach out to us at{" "}
              <a href="mailto:support@albionformation.com" className="text-primary underline font-medium">
                support@albionformation.com
              </a>
            </p>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default BookConsultationDialog;
