import Header from "@/components/Header";

const Privacy = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="prose prose-slate max-w-none">
          <h1 className="text-4xl font-bold text-foreground mb-8">Privacy Policy</h1>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">1. Who we are</h2>
            <p className="text-muted-foreground mb-4">
              This Privacy Policy explains how ALBION Business Services ("ALBION", "we", "us", "our") collects and uses
              personal data when you use our website and submit application or registration forms for nominee director
              services.
            </p>
            <p className="text-muted-foreground">
              Data controller contact: support@albionformation.com
              <br />
              Address: ALBION Business Services, London, United Kingdom
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">2. Scope and legal framework</h2>
            <p className="text-muted-foreground mb-4">
              We process personal data in line with the UK General Data Protection Regulation (UK GDPR), the Data
              Protection Act 2018, and other applicable UK privacy laws.
            </p>
            <p className="text-muted-foreground">
              This notice applies to personal data collected directly from you through our forms, website interactions,
              and communications with our team.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">3. Personal data we collect</h2>
            <ul className="list-disc list-inside text-muted-foreground mb-4 space-y-2">
              <li>Identity details: first name, last name, date of birth.</li>
              <li>Contact details: email address and phone number.</li>
              <li>
                Application details: director history, service requirements, compliance-related responses, and preferred
                contact time.
              </li>
              <li>Consent records: GDPR consent, privacy consent, and marketing preferences.</li>
              <li>
                Technical data: device/browser data, IP address, and website interaction events (for example analytics or
                tag manager events).
              </li>
            </ul>
            <p className="text-muted-foreground">
              We may also receive limited personal data from trusted service providers that support onboarding,
              compliance, website operations, and communications.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">4. Why we process your data and lawful basis</h2>
            <ul className="list-disc list-inside text-muted-foreground mb-4 space-y-2">
              <li>
                To assess applications and deliver requested services (Article 6(1)(b) - performance of a contract or
                steps prior to contract).
              </li>
              <li>
                To carry out identity, risk, and compliance checks where required (Article 6(1)(c) - legal obligation,
                and/or Article 6(1)(f) - legitimate interests).
              </li>
              <li>
                To communicate with you about your enquiry, onboarding, and service updates (Article 6(1)(b) and
                Article 6(1)(f)).
              </li>
              <li>
                To maintain website security, prevent misuse, and improve performance (Article 6(1)(f) - legitimate
                interests).
              </li>
              <li>
                To send marketing communications where you opt in (Article 6(1)(a) - consent). You can opt out at any
                time.
              </li>
            </ul>
            <p className="text-muted-foreground">
              Where we rely on legitimate interests, we balance those interests against your rights and freedoms.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">5. How we collect personal data</h2>
            <ul className="list-disc list-inside text-muted-foreground mb-4 space-y-2">
              <li>Directly from you via website forms and communications.</li>
              <li>From your use of our website (analytics and technical logs).</li>
              <li>From trusted partners and processors supporting service delivery and compliance.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">6. Recipients of personal data</h2>
            <p className="text-muted-foreground mb-4">We may share your personal data with:</p>
            <ul className="list-disc list-inside text-muted-foreground mb-4 space-y-2">
              <li>Nominee service and business formation partners involved in delivering the requested service.</li>
              <li>Identity, KYC, AML, and compliance screening providers.</li>
              <li>Cloud hosting, form processing, CRM, email, and analytics providers.</li>
              <li>Professional advisers (legal, tax, audit) where needed.</li>
              <li>Regulators, law enforcement, courts, and public bodies where required by law.</li>
            </ul>
            <p className="text-muted-foreground">
              We require processors and partners to protect personal data and use it only for agreed purposes.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">7. International transfers</h2>
            <p className="text-muted-foreground mb-4">
              Some providers we use may process data outside the United Kingdom. Where this happens, we apply lawful
              transfer safeguards, such as adequacy regulations or UK-approved transfer clauses, and proportionate
              technical and contractual protections.
            </p>
            <p className="text-muted-foreground">
              You can contact us to request more information about the safeguards used for international transfers.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">8. Data retention</h2>
            <p className="text-muted-foreground mb-4">
              We keep personal data only for as long as necessary for the purposes in this notice, including legal,
              compliance, and record-keeping obligations.
            </p>
            <ul className="list-disc list-inside text-muted-foreground mb-4 space-y-2">
              <li>Enquiry and marketing records: up to 24 months after last meaningful interaction.</li>
              <li>Application and onboarding records: up to 6 years after service completion or account closure.</li>
              <li>Records required by law (including compliance and anti-fraud): retained as legally required.</li>
            </ul>
            <p className="text-muted-foreground">
              We may retain limited data longer where needed to establish, exercise, or defend legal claims.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">9. Your UK data protection rights</h2>
            <p className="text-muted-foreground mb-4">Under UK GDPR, you have the right to:</p>
            <ul className="list-disc list-inside text-muted-foreground mb-4 space-y-2">
              <li>Request access to your personal data.</li>
              <li>Request correction of inaccurate or incomplete data.</li>
              <li>Request erasure in certain circumstances.</li>
              <li>Request restriction of processing in certain circumstances.</li>
              <li>Object to processing based on legitimate interests.</li>
              <li>Request portability of data you provided to us.</li>
              <li>Withdraw consent at any time where processing is based on consent.</li>
            </ul>
            <p className="text-muted-foreground">
              To exercise your rights, contact support@albionformation.com. We may need to verify your identity before
              actioning a request.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">10. Complaints to the ICO</h2>
            <p className="text-muted-foreground mb-4">
              If you are not satisfied with how we handle your personal data, you can complain to the UK Information
              Commissioner&apos;s Office (ICO).
            </p>
            <p className="text-muted-foreground">
              ICO website:{" "}
              <a
                href="https://ico.org.uk/make-a-complaint/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                https://ico.org.uk/make-a-complaint/
              </a>
              <br />
              ICO helpline: 0303 123 1113
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">11. Cookies and tracking</h2>
            <p className="text-muted-foreground mb-4">
              We use cookies and similar technologies to run the website, measure performance, and improve user
              experience. Where required, we ask for your consent before setting non-essential cookies.
            </p>
            <p className="text-muted-foreground">
              For full details on the cookies we use, their purposes, and how to manage them, please see our{" "}
              <a href="/cookies" className="text-primary hover:underline">
                Cookie Policy
              </a>
              .
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">12. Whether you must provide data</h2>
            <p className="text-muted-foreground">
              Some personal data is necessary for us to assess eligibility, respond to your enquiry, and deliver our
              services. If required information is not provided, we may not be able to process your application or offer
              the requested service.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">13. Automated decisions and profiling</h2>
            <p className="text-muted-foreground">
              We do not make solely automated decisions that produce legal or similarly significant effects without human
              involvement. Where profiling or structured assessments are used to support compliance or service decisions,
              those decisions include human review.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">14. Children</h2>
            <p className="text-muted-foreground">
              Our services are intended for adults. We do not knowingly collect personal data from individuals under 18.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">15. Changes to this policy</h2>
            <p className="text-muted-foreground">
              We may update this Privacy Policy from time to time to reflect legal, technical, or business changes. The
              latest version will always be published on this page.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">16. Contact</h2>
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

export default Privacy;
