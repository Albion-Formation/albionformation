import Header from "@/components/Header";

const Terms = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="prose prose-slate max-w-none">
          <h1 className="text-4xl font-bold text-foreground mb-8">Terms and Conditions</h1>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">1. About these terms</h2>
            <p className="text-muted-foreground mb-4">
              These Terms and Conditions (&quot;Terms&quot;) govern your access to and use of the website and services
              provided by ALBION Business Services (&quot;ALBION&quot;, &quot;we&quot;, &quot;us&quot;, &quot;our&quot;),
              a United Kingdom-based provider of nominee director services.
            </p>
            <p className="text-muted-foreground mb-4">
              By accessing or using our website, submitting a form, or engaging our services, you confirm that you have
              read, understood, and agree to be bound by these Terms together with our{" "}
              <a href="/privacy" className="text-primary hover:underline">
                Privacy Policy
              </a>
              . If you do not agree, you must not use our services.
            </p>
            <p className="text-muted-foreground">
              These Terms are governed by English law. You and ALBION submit to the exclusive jurisdiction of the courts
              of England and Wales.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">2. Who we are</h2>
            <p className="text-muted-foreground">
              ALBION Business Services
              <br />
              Address: London, United Kingdom
              <br />
              Email: support@albionformation.com
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">3. Description of services</h2>
            <p className="text-muted-foreground mb-4">
              ALBION provides nominee director services and related business formation support to individuals, founders,
              and companies. Our services include but are not limited to:
            </p>
            <ul className="list-disc list-inside text-muted-foreground mb-4 space-y-2">
              <li>Nominee director appointment and arrangement services.</li>
              <li>Application processing and eligibility screening for nominee director candidates.</li>
              <li>KYC, AML, and compliance verification in connection with service delivery.</li>
              <li>Supporting documentation, including trust deeds and powers of attorney.</li>
              <li>Ongoing compliance support related to nominee arrangements.</li>
            </ul>
            <p className="text-muted-foreground">
              Service availability depends on eligibility, compliance checks, and suitability assessment. Submitting a
              form does not guarantee service provision.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">4. Eligibility</h2>
            <p className="text-muted-foreground mb-4">
              Our services are available to individuals aged 18 or over. By using our services, you confirm that you are
              at least 18 years old and have the legal capacity to enter into a binding agreement.
            </p>
            <p className="text-muted-foreground">
              We reserve the right to refuse service to any applicant who does not meet eligibility, compliance, or
              suitability criteria.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">5. Your obligations</h2>
            <p className="text-muted-foreground mb-4">When using our website and services, you agree to:</p>
            <ul className="list-disc list-inside text-muted-foreground mb-4 space-y-2">
              <li>Provide accurate, truthful, and complete information in all forms and communications.</li>
              <li>Keep your contact details up to date so we can reach you regarding your application or service.</li>
              <li>Cooperate with identity verification, compliance, and onboarding requirements.</li>
              <li>Not use our services for unlawful, fraudulent, or non-compliant purposes.</li>
              <li>Not attempt to interfere with, disrupt, or compromise the security of our website or systems.</li>
            </ul>
            <p className="text-muted-foreground">
              You are responsible for the accuracy of the information you submit. We are not liable for delays or
              refusals caused by incomplete or inaccurate information.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">6. Service process and no guarantee</h2>
            <p className="text-muted-foreground mb-4">
              Submitting a registration or application form begins a review process. It does not constitute an offer or
              acceptance of service, nor does it create a binding contract until we confirm acceptance in writing.
            </p>
            <p className="text-muted-foreground mb-4">
              This is a professional service arrangement. Eligibility criteria apply. Our services do not represent a
              guaranteed income offer, employment relationship, or investment opportunity.
            </p>
            <p className="text-muted-foreground">
              We reserve the right to decline any application or discontinue any service arrangement at our discretion,
              subject to applicable law and any existing contractual commitments.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">7. Fees and payment</h2>
            <p className="text-muted-foreground mb-4">
              Where fees apply, they will be communicated before any commitment is made. No payment is taken at the point
              of form submission.
            </p>
            <p className="text-muted-foreground mb-4">
              All fees are exclusive of VAT unless stated otherwise. Payment terms, including refund eligibility, will be
              set out in any service agreement issued to you.
            </p>
            <p className="text-muted-foreground">
              We reserve the right to update our fee schedule at any time. Changes will not affect services already
              confirmed and paid for.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">8. Intellectual property</h2>
            <p className="text-muted-foreground">
              All content on our website, including text, graphics, logos, page layouts, and software, is owned by or
              licensed to ALBION and is protected by UK and international intellectual property laws. You may not copy,
              reproduce, distribute, or create derivative works from our content without prior written consent.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">9. Data protection and privacy</h2>
            <p className="text-muted-foreground mb-4">
              We process personal data in accordance with UK GDPR and the Data Protection Act 2018. Full details are set
              out in our{" "}
              <a href="/privacy" className="text-primary hover:underline">
                Privacy Policy
              </a>
              .
            </p>
            <p className="text-muted-foreground">
              By submitting information through our forms, you acknowledge that your data will be processed as described
              in the Privacy Policy and for the purposes stated at the point of collection.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">10. Limitation of liability</h2>
            <p className="text-muted-foreground mb-4">
              To the maximum extent permitted by law:
            </p>
            <ul className="list-disc list-inside text-muted-foreground mb-4 space-y-2">
              <li>
                ALBION shall not be liable for any indirect, incidental, special, consequential, or punitive damages
                arising from your use of or inability to use our services.
              </li>
              <li>
                Our total aggregate liability in connection with any service shall not exceed the total fees paid by you
                for that service.
              </li>
              <li>
                We do not exclude or limit liability for death or personal injury caused by our negligence, fraud or
                fraudulent misrepresentation, or any other liability that cannot be excluded under English law.
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">11. Disclaimer</h2>
            <p className="text-muted-foreground mb-4">
              Our website and services are provided on an &quot;as is&quot; and &quot;as available&quot; basis. We make
              no warranties, express or implied, regarding the accuracy, completeness, availability, or fitness for a
              particular purpose of our website content or services.
            </p>
            <p className="text-muted-foreground">
              Nothing on our website constitutes legal, tax, or financial advice. You should seek independent
              professional advice before making decisions based on information provided through our services.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">12. Termination and suspension</h2>
            <p className="text-muted-foreground mb-4">
              We may suspend or terminate your access to our services at any time if we reasonably believe you have
              breached these Terms, provided inaccurate information, or if continued service would expose us or others to
              legal or regulatory risk.
            </p>
            <p className="text-muted-foreground">
              Termination does not affect any rights or obligations that have already accrued under these Terms.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">13. Third-party links</h2>
            <p className="text-muted-foreground">
              Our website may contain links to third-party websites. We are not responsible for the content, privacy
              practices, or availability of those sites. Inclusion of a link does not imply endorsement.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">14. Complaints</h2>
            <p className="text-muted-foreground">
              If you have a complaint about our services, please contact us at support@albionformation.com. We aim to
              acknowledge complaints within 5 working days and provide a substantive response within 20 working days.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">15. Governing law and jurisdiction</h2>
            <p className="text-muted-foreground">
              These Terms are governed by and construed in accordance with the laws of England and Wales. Any disputes
              arising from or in connection with these Terms shall be subject to the exclusive jurisdiction of the courts
              of England and Wales.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">16. Changes to these terms</h2>
            <p className="text-muted-foreground">
              We may update these Terms from time to time. The latest version will always be available on this page. By
              continuing to use our services after changes are posted, you accept the updated Terms. Where changes are
              material, we will make reasonable efforts to notify affected users.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">17. Contact</h2>
            <p className="text-muted-foreground">
              Email: support@albionformation.com
              <br />
              Address: ALBION Business Services, London, United Kingdom
            </p>
          </section>

          <section className="mb-8">
            <p className="text-sm text-muted-foreground">Last updated: 18 March 2026</p>
          </section>
        </div>
      </main>
    </div>
  );
};

export default Terms;
