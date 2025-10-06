import Header from "@/components/Header";

const Privacy = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="prose prose-slate max-w-none">
          <h1 className="text-4xl font-bold text-foreground mb-8">Privacy Policy</h1>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">1. Introduction</h2>
            <p className="text-muted-foreground mb-4">
              Welcome to ALBION. We are committed to protecting your personal information and your right to privacy. 
              This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our services.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">2. Information We Collect</h2>
            <p className="text-muted-foreground mb-4">
              We collect personal information that you voluntarily provide to us when you register for our services, 
              express an interest in obtaining information about us or our products and services, or otherwise contact us.
            </p>
            <p className="text-muted-foreground mb-4">
              The personal information we collect may include:
            </p>
            <ul className="list-disc list-inside text-muted-foreground mb-4 space-y-2">
              <li>Name and contact information (email address, phone number)</li>
              <li>Date of birth</li>
              <li>Business formation requirements and preferences</li>
              <li>Marketing and communication preferences</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">3. How We Use Your Information</h2>
            <p className="text-muted-foreground mb-4">
              We use personal information collected via our services for a variety of business purposes including:
            </p>
            <ul className="list-disc list-inside text-muted-foreground mb-4 space-y-2">
              <li>To facilitate business formation services and account creation</li>
              <li>To send administrative information to you</li>
              <li>To fulfill and manage your requests</li>
              <li>To respond to legal requests and prevent harm</li>
              <li>To send you marketing and promotional communications (with your consent)</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">4. Sharing Your Information</h2>
            <p className="text-muted-foreground mb-4">
              We only share information with your consent, to comply with laws, to provide you with services, 
              to protect your rights, or to fulfill business obligations. We may share your information with:
            </p>
            <ul className="list-disc list-inside text-muted-foreground mb-4 space-y-2">
              <li>Our trusted business formation partners who assist in providing our services</li>
              <li>Third-party vendors and service providers</li>
              <li>Professional advisers and legal authorities when required by law</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">5. Data Security</h2>
            <p className="text-muted-foreground mb-4">
              We implement appropriate technical and organizational security measures to protect your personal information. 
              However, please note that no electronic transmission over the Internet or information storage technology 
              can be guaranteed to be 100% secure.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">6. Your Privacy Rights</h2>
            <p className="text-muted-foreground mb-4">
              Depending on your location, you may have certain rights regarding your personal information, including:
            </p>
            <ul className="list-disc list-inside text-muted-foreground mb-4 space-y-2">
              <li>The right to access your personal data</li>
              <li>The right to rectify or update your information</li>
              <li>The right to erase your data</li>
              <li>The right to restrict processing</li>
              <li>The right to data portability</li>
              <li>The right to object to processing</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">7. Contact Us</h2>
            <p className="text-muted-foreground mb-4">
              If you have questions or comments about this Privacy Policy, please contact us at:
            </p>
            <p className="text-muted-foreground">
              Email: privacy@albion.com<br />
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

export default Privacy;
