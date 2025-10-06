import Header from "@/components/Header";

const Terms = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="prose prose-slate max-w-none">
          <h1 className="text-4xl font-bold text-foreground mb-8">Terms and Conditions</h1>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">1. Acceptance of Terms</h2>
            <p className="text-muted-foreground mb-4">
              By accessing and using ALBION's services, you accept and agree to be bound by the terms and provisions 
              of this agreement. If you do not agree to these terms, please do not use our services.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">2. Description of Services</h2>
            <p className="text-muted-foreground mb-4">
              ALBION provides business formation and consultation services to help entrepreneurs and business owners 
              establish and manage their companies. Our services include but are not limited to:
            </p>
            <ul className="list-disc list-inside text-muted-foreground mb-4 space-y-2">
              <li>Business registration and incorporation services</li>
              <li>Compliance and regulatory guidance</li>
              <li>Business consultation and advisory services</li>
              <li>Document preparation and filing</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">3. User Obligations</h2>
            <p className="text-muted-foreground mb-4">
              As a user of our services, you agree to:
            </p>
            <ul className="list-disc list-inside text-muted-foreground mb-4 space-y-2">
              <li>Provide accurate, current, and complete information</li>
              <li>Maintain the security of your account credentials</li>
              <li>Comply with all applicable laws and regulations</li>
              <li>Not use our services for any unlawful or fraudulent purposes</li>
              <li>Not interfere with or disrupt the integrity or performance of our services</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">4. Payment Terms</h2>
            <p className="text-muted-foreground mb-4">
              Payment for our services is required as per the fee schedule provided at the time of service engagement. 
              All fees are non-refundable unless otherwise stated in writing. We reserve the right to change our fees 
              at any time with prior notice.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">5. Intellectual Property</h2>
            <p className="text-muted-foreground mb-4">
              All content, features, and functionality of our services, including but not limited to text, graphics, 
              logos, and software, are owned by ALBION and are protected by international copyright, trademark, and 
              other intellectual property laws.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">6. Limitation of Liability</h2>
            <p className="text-muted-foreground mb-4">
              ALBION shall not be liable for any indirect, incidental, special, consequential, or punitive damages 
              resulting from your use of or inability to use our services. Our total liability shall not exceed the 
              amount paid by you for the services in question.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">7. Disclaimer of Warranties</h2>
            <p className="text-muted-foreground mb-4">
              Our services are provided "as is" and "as available" without any warranties of any kind, either express 
              or implied. We do not warrant that our services will be uninterrupted, secure, or error-free.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">8. Termination</h2>
            <p className="text-muted-foreground mb-4">
              We reserve the right to terminate or suspend your access to our services at any time, without prior 
              notice, for conduct that we believe violates these Terms or is harmful to other users, us, or third parties.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">9. Governing Law</h2>
            <p className="text-muted-foreground mb-4">
              These Terms shall be governed by and construed in accordance with the laws of the United Kingdom, 
              without regard to its conflict of law provisions.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">10. Changes to Terms</h2>
            <p className="text-muted-foreground mb-4">
              We reserve the right to modify these Terms at any time. We will notify users of any material changes 
              by posting the new Terms on our website. Your continued use of our services after such changes constitutes 
              your acceptance of the new Terms.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">11. Contact Information</h2>
            <p className="text-muted-foreground mb-4">
              If you have any questions about these Terms, please contact us at:
            </p>
            <p className="text-muted-foreground">
              Email: support@albionformation.com<br />
              Address: ALBION Business Services, London, United Kingdom
            </p>
          </section>

          <section className="mb-8">
            <p className="text-sm text-muted-foreground">
              Last Updated: {new Date().toLocaleDateString('en-GB', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </section>
        </div>
      </main>
    </div>
  );
};

export default Terms;
