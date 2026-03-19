import Header from "@/components/Header";
import Footer from "@/components/Footer";

const CookiePolicy = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="prose prose-slate max-w-none">
          <h1 className="text-4xl font-bold text-foreground mb-8">Cookie Policy</h1>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">1. What are cookies?</h2>
            <p className="text-muted-foreground mb-4">
              Cookies are small text files placed on your device when you visit a website. They help the site remember
              your preferences, understand how you use it, and improve your experience. Similar technologies such as
              pixels, local storage, and scripts serve comparable purposes.
            </p>
            <p className="text-muted-foreground">
              This policy explains which cookies we use, why we use them, and how you can control them. It should be
              read alongside our{" "}
              <a href="/privacy" className="text-primary hover:underline">
                Privacy Policy
              </a>
              .
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">2. Legal basis</h2>
            <p className="text-muted-foreground">
              We comply with the Privacy and Electronic Communications Regulations 2003 (PECR) and the UK General Data
              Protection Regulation (UK GDPR). Strictly necessary cookies are set without consent because they are
              essential for the website to function. All other cookies require your consent before they are placed.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">3. Types of cookies we use</h2>

            <h3 className="text-xl font-semibold text-foreground mt-6 mb-3">Strictly necessary cookies</h3>
            <p className="text-muted-foreground mb-4">
              These are required for the website to function correctly. They enable core features such as page
              navigation, form submission, and security. They cannot be switched off.
            </p>
            <div className="overflow-x-auto mb-6">
              <table className="w-full text-sm text-left border border-border">
                <thead className="bg-muted text-foreground">
                  <tr>
                    <th className="px-4 py-2 border-b border-border">Cookie</th>
                    <th className="px-4 py-2 border-b border-border">Provider</th>
                    <th className="px-4 py-2 border-b border-border">Purpose</th>
                    <th className="px-4 py-2 border-b border-border">Expiry</th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr>
                    <td className="px-4 py-2 border-b border-border">Session ID</td>
                    <td className="px-4 py-2 border-b border-border">ALBION</td>
                    <td className="px-4 py-2 border-b border-border">Maintains session state across page requests</td>
                    <td className="px-4 py-2 border-b border-border">Session</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3 className="text-xl font-semibold text-foreground mt-6 mb-3">Analytics cookies</h3>
            <p className="text-muted-foreground mb-4">
              These help us understand how visitors interact with the website by collecting information anonymously. We
              use this data to improve performance and content. These cookies are only set with your consent.
            </p>
            <div className="overflow-x-auto mb-6">
              <table className="w-full text-sm text-left border border-border">
                <thead className="bg-muted text-foreground">
                  <tr>
                    <th className="px-4 py-2 border-b border-border">Cookie</th>
                    <th className="px-4 py-2 border-b border-border">Provider</th>
                    <th className="px-4 py-2 border-b border-border">Purpose</th>
                    <th className="px-4 py-2 border-b border-border">Expiry</th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr>
                    <td className="px-4 py-2 border-b border-border">_ga</td>
                    <td className="px-4 py-2 border-b border-border">Google Analytics</td>
                    <td className="px-4 py-2 border-b border-border">Distinguishes unique visitors</td>
                    <td className="px-4 py-2 border-b border-border">2 years</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 border-b border-border">_ga_*</td>
                    <td className="px-4 py-2 border-b border-border">Google Analytics</td>
                    <td className="px-4 py-2 border-b border-border">Maintains session state</td>
                    <td className="px-4 py-2 border-b border-border">2 years</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3 className="text-xl font-semibold text-foreground mt-6 mb-3">Marketing and targeting cookies</h3>
            <p className="text-muted-foreground mb-4">
              These cookies may be set by us or third-party advertising partners. They are used to build a profile of
              your interests and show relevant content or advertisements on other sites. These cookies are only set with
              your consent.
            </p>
            <div className="overflow-x-auto mb-6">
              <table className="w-full text-sm text-left border border-border">
                <thead className="bg-muted text-foreground">
                  <tr>
                    <th className="px-4 py-2 border-b border-border">Cookie</th>
                    <th className="px-4 py-2 border-b border-border">Provider</th>
                    <th className="px-4 py-2 border-b border-border">Purpose</th>
                    <th className="px-4 py-2 border-b border-border">Expiry</th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr>
                    <td className="px-4 py-2 border-b border-border">_fbp</td>
                    <td className="px-4 py-2 border-b border-border">Meta (Facebook)</td>
                    <td className="px-4 py-2 border-b border-border">Tracks visits across websites for ad delivery</td>
                    <td className="px-4 py-2 border-b border-border">3 months</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 border-b border-border">_gcl_au</td>
                    <td className="px-4 py-2 border-b border-border">Google Ads</td>
                    <td className="px-4 py-2 border-b border-border">Stores conversion data from ad clicks</td>
                    <td className="px-4 py-2 border-b border-border">3 months</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-muted-foreground text-sm">
              The cookie tables above reflect the cookies in use at the time of publishing. If additional cookies are
              introduced, this page will be updated.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">4. Google Tag Manager</h2>
            <p className="text-muted-foreground">
              We use Google Tag Manager (GTM) to manage website tags and tracking scripts. GTM itself does not use
              cookies or collect personal data. However, it may trigger tags that set cookies listed in the tables above.
              These tags are subject to the consent rules described in this policy.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">5. How to manage cookies</h2>
            <p className="text-muted-foreground mb-4">
              You can control or delete cookies at any time using the following methods:
            </p>
            <ul className="list-disc list-inside text-muted-foreground mb-4 space-y-2">
              <li>
                <strong>Browser settings:</strong> Most browsers allow you to block or delete cookies. Check your
                browser&apos;s help section for instructions.
              </li>
              <li>
                <strong>Cookie consent controls:</strong> Where we display a cookie banner, you can adjust your
                preferences at any time by revisiting the banner or contacting us.
              </li>
              <li>
                <strong>Third-party opt-out tools:</strong> You can opt out of Google Analytics tracking at{" "}
                <a
                  href="https://tools.google.com/dlpage/gaoptout"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  tools.google.com/dlpage/gaoptout
                </a>
                .
              </li>
            </ul>
            <p className="text-muted-foreground">
              Blocking certain cookies may affect the functionality of our website or prevent some features from working
              as expected.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">6. Third-party cookies</h2>
            <p className="text-muted-foreground">
              Some cookies are placed by third parties (such as Google and Meta) when you use our website. We do not
              control how those third parties use the data collected through their cookies. Please refer to their
              respective privacy policies for more information:
            </p>
            <ul className="list-disc list-inside text-muted-foreground mt-3 space-y-2">
              <li>
                <a
                  href="https://policies.google.com/privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  Google Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="https://www.facebook.com/privacy/policy/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  Meta Privacy Policy
                </a>
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">7. Changes to this policy</h2>
            <p className="text-muted-foreground">
              We may update this Cookie Policy to reflect changes in the cookies we use or for legal, regulatory, or
              operational reasons. The latest version will always be available on this page.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">8. Contact</h2>
            <p className="text-muted-foreground">
              If you have questions about our use of cookies, please contact us at:
            </p>
            <p className="text-muted-foreground mt-3">
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
      <Footer />
    </div>
  );
};

export default CookiePolicy;
