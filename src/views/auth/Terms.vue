<template>
  <div class="min-h-screen bg-white">
    <!-- Header -->
    <header class="bg-[#e82264] text-white py-4 px-6 flex items-center gap-3">
      <router-link to="/">
        <img src="@/assets/logo-white.png" alt="Logo" class="w-32" />
      </router-link>
    </header>

    <!-- Main -->
    <div class="container mx-auto py-10 px-5">
      <h2 class="text-2xl font-semibold mb-6">Terms and Conditions</h2>
      <p class="text-gray-500 mb-2">Last Updated: 11 May 2025</p>
      <p class="text-gray-700 mb-8">
        Welcome to FansnGage. These Terms of Use ("Terms") are a legal agreement between you and
        FansnGage ("we," "us," or "our"). By accessing or using our services, you agree to comply
        with these Terms and our Privacy Policy. If you do not agree to these Terms, you must not
        use the FansnGage platform.
      </p>
      <div class="grid grid-cols-1 md:grid-cols-4 gap-10">
        <!-- Sidebar -->
        <aside class="md:col-span-1 space-y-3">
          <ul class="text-sky-600 font-medium space-y-2">
            <li><a href="#service" class="hover:underline">1. The Fansngage Service</a></li>
            <li>
              <a href="#eligibility" class="hover:underline"
                >2. Eligibility and Account Responsibility</a
              >
            </li>
            <li>
              <a href="#content" class="hover:underline">3. Your Content and License to Us</a>
            </li>
            <li>
              <a href="#restrictions" class="hover:underline">4. Platform Use and Restrictions</a>
            </li>
            <li><a href="#monetization" class="hover:underline">5. Monetization and Fees</a></li>
            <li><a href="#privacy" class="hover:underline">6. Privacy and Data</a></li>
            <li><a href="#ip" class="hover:underline">7. Intellectual Property</a></li>
            <li><a href="#termination" class="hover:underline">8. Termination</a></li>
            <li><a href="#liability" class="hover:underline">9. Limitation of Liability</a></li>
            <li><a href="#disputes" class="hover:underline">10. Disputes and Governing Law</a></li>
            <li><a href="#feedback" class="hover:underline">11. Feedback and Suggestions</a></li>
            <li><a href="#changes" class="hover:underline">12. Changes to These Terms</a></li>
            <li><a href="#contact" class="hover:underline">13. Contact</a></li>
          </ul>
        </aside>
        <!-- Content -->
        <main class="md:col-span-3 space-y-8">
          <section id="service">
            <h3 class="text-xl font-bold mb-2">1. The Fansngage Service</h3>
            <p>
              Fansngage is a platform that empowers creators to monetize their content, build their
              audience, and connect directly with their fans. Our Service includes:
            </p>
            <ul class="list-disc pl-6 mt-2 space-y-1">
              <li>
                <strong>Creator Tools:</strong> Monetize via subscriptions, exclusive content, tips,
                and product sales.
              </li>
              <li>
                <strong>Community Features:</strong> Communicate with fans via messaging, posts, and
                live updates.
              </li>
              <li><strong>Analytics:</strong> Access audience insights and performance metrics.</li>
              <li><strong>Custom Branding:</strong> Personalize your creator space.</li>
              <li>
                <strong>Third-party integrations:</strong> Use payment gateways, email tools, and
                analytics tools.
              </li>
            </ul>
            <p class="mt-2">
              We may offer different types of user accounts and features depending on your role
              (e.g., creator, subscriber).
            </p>
          </section>
          <section id="eligibility">
            <h3 class="text-xl font-bold mb-2">2. Eligibility and Account Responsibility</h3>
            <p>
              You must be at least 18 years old to use our services. You are responsible for your
              account credentials and for any activity under your account. If you believe your
              account has been compromised, contact us immediately. We reserve the right to disable
              accounts that violate these Terms or applicable law.
            </p>
          </section>
          <section id="content">
            <h3 class="text-xl font-bold mb-2">3. Your Content and License to Us</h3>
            <p>
              You retain ownership of the content you upload to Fansngage. However, you grant us a
              worldwide, non-exclusive, royalty-free license to host, display, modify, and
              distribute your content strictly for the purpose of operating the platform and
              providing the Services.
            </p>
            <p>
              You must have all necessary rights to the content you post. You may not upload content
              that:
            </p>
            <ul class="list-disc pl-6 mt-2 space-y-1">
              <li>Is illegal, harassing, or hateful</li>
              <li>Violates any copyright, trademark, or intellectual property rights</li>
              <li>Infringes on someone’s privacy or confidentiality</li>
            </ul>
            <p>We may remove content or suspend accounts that violate our guidelines.</p>
          </section>
          <section id="restrictions">
            <h3 class="text-xl font-bold mb-2">4. Platform Use and Restrictions</h3>
            <p>You agree not to:</p>
            <ul class="list-disc pl-6 mt-2 space-y-1">
              <li>Use bots or scripts to automate platform interactions</li>
              <li>Impersonate others or provide false identity information</li>
              <li>Upload malicious code or viruses</li>
              <li>Engage in spam, harassment, or abuse</li>
              <li>Collect personal data from users without their consent</li>
            </ul>
            <p>We may suspend or terminate your account if we suspect misuse or violations.</p>
          </section>
          <section id="monetization">
            <h3 class="text-xl font-bold mb-2">5. Monetization and Fees</h3>
            <p>
              Creators can earn revenue via features such as subscriptions and tips. Fansngage takes
              a platform service fee on each transaction. We may withhold or delay payments in case
              of suspected fraud or breach of policy. Taxes, local laws, and payment processor terms
              may apply.
            </p>
          </section>
          <section id="privacy">
            <h3 class="text-xl font-bold mb-2">6. Privacy and Data</h3>
            <p>
              Your use of the Service is subject to our
              <a href="/auth/PrivacyPolicy" class="text-[#e82264] hover:underline">Privacy Policy</a
              >, which explains how we collect, store, and use your information. You agree to allow
              us to use your data in accordance with that policy.
            </p>
          </section>
          <section id="ip">
            <h3 class="text-xl font-bold mb-2">7. Intellectual Property</h3>
            <p>
              All content provided by Fansngage (excluding user-generated content) is protected by
              intellectual property laws. You may not reuse, reproduce, or modify Fansngage content
              without our prior written consent.
            </p>
          </section>
          <section id="termination">
            <h3 class="text-xl font-bold mb-2">8. Termination</h3>
            <p>
              We may terminate or suspend your access to the Service at any time if you breach these
              Terms. Upon termination, your access to earnings and content may be revoked. You may
              delete your account at any time via account settings.
            </p>
          </section>
          <section id="liability">
            <h3 class="text-xl font-bold mb-2">9. Limitation of Liability</h3>
            <p>
              Nothing in these Terms shall exclude or limit our liability for any matter where such
              liability cannot be excluded or limited under applicable law. This includes liability
              for death or personal injury caused by our negligence or that of our employees,
              agents, or subcontractors, and for fraud or fraudulent misrepresentation.
            </p>
            <p>Subject to the above, Fansngage shall not be liable for:</p>
            <ul class="list-disc pl-6 mt-2 space-y-1">
              <li>Loss of profits (direct or indirect)</li>
              <li>Loss of goodwill or reputation</li>
              <li>Loss of opportunity or anticipated savings</li>
              <li>Loss of data</li>
              <li>
                Any indirect, consequential, exemplary, or special damages, even if foreseeable
              </li>
            </ul>
            <p>We are also not liable for any loss or damage resulting from:</p>
            <ul class="list-disc pl-6 mt-2 space-y-1">
              <li>
                Your reliance on the accuracy or availability of content, advertisements, or
                promotional offers
              </li>
              <li>Platform changes, interruptions, or termination of features</li>
              <li>Deletion or loss of content or communications data</li>
              <li>Your failure to maintain accurate account details or secure your credentials</li>
            </ul>
            <p>
              Fansngage is intended for individual and private use. You agree not to use the
              platform for commercial or business purposes unless explicitly authorized. We are not
              liable for business losses, including lost profits, revenue, or interruption.
            </p>
            <p>
              In cases where defective digital content provided by Fansngage damages your device or
              data due to our failure to use reasonable care and skill, we will either repair the
              damage or provide compensation. However, we are not responsible for damages that could
              have been avoided by following our advice (e.g., applying updates) or using supported
              hardware/software environments.
            </p>
            <p>
              These limitations apply even if we have been advised of the possibility of such
              losses.
            </p>
            <p>
              You are solely responsible for any mobile or internet data charges incurred while
              using our Service. Please check with your provider for details.
            </p>
            <p>
              To the maximum extent allowed by law, any dispute you have with a third party arising
              out of your use of the platform is solely between you and that third party. You
              release Fansngage and its affiliates from any claims, damages, or liabilities arising
              from such disputes.
            </p>
          </section>
          <section id="disputes">
            <h3 class="text-xl font-bold mb-2">10. Disputes and Governing Law</h3>
            <p>
              Before initiating legal action, both parties agree to first attempt to resolve
              disputes informally. If the dispute cannot be resolved amicably, you agree that it
              will be resolved under the governing laws of the jurisdiction in which you reside, or
              where Fansngage is headquartered, depending on the applicable legal context.
              Jurisdiction may be determined by your location (e.g., within the EU, UK, or USA), and
              legal claims may be brought before competent courts in that jurisdiction.
            </p>
          </section>
          <section id="feedback">
            <h3 class="text-xl font-bold mb-2">11. Feedback and Suggestions</h3>
            <p>
              If you submit feedback or suggestions, you grant Fansngage the right to use them
              without compensation or obligation.
            </p>
          </section>
          <section id="changes">
            <h3 class="text-xl font-bold mb-2">12. Changes to These Terms</h3>
            <p>
              We may modify these Terms from time to time. We will notify you of material changes,
              and your continued use of the Service constitutes acceptance of the updated Terms.
            </p>
          </section>
          <section id="contact">
            <h3 class="text-xl font-bold mb-2">13. Contact</h3>
            <p>
              If you have questions or concerns, contact us at:
              <a href="mailto:support@fansngage.com" class="text-[#e82264] hover:underline"
                >support@fansngage.com</a
              >
            </p>
          </section>
        </main>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>
