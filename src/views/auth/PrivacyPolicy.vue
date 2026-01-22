<template>
  <div class="min-h-screen bg-white">
    <!-- Header -->
    <header
      class="bg-[#e82264] text-white py-4 px-4 sm:px-6 flex items-center gap-3 fixed top-0 left-0 w-full z-50"
    >
      <router-link to="/">
        <img src="@/assets/logo-white.png" alt="Logo" class="w-24 sm:w-32" />
      </router-link>
    </header>

    <!-- Top Blue Banner -->
    <div class="bg-[#e82264] text-white py-16 sm:py-28 px-4 sm:px-6 relative overflow-hidden">
      <div class="absolute inset-0 opacity-20">
        <!-- Optional background decoration -->
      </div>

      <h2 class="text-2xl sm:text-4xl font-semibold z-10 relative text-center sm:text-left">
        Privacy Policy For FANSNGAGE
      </h2>
      <div class="mt-3 w-12 h-1 bg-white rounded mx-auto sm:mx-0"></div>
    </div>

    <!-- Content Section -->
    <div class="max-w-4xl mx-auto py-8 px-4 sm:px-6">
      <p class="text-gray-600 mb-4 text-sm">
        <strong>Effective Date:</strong> May 8, 2025<br />
        <strong>Last Updated:</strong> May 8, 2025
      </p>

      <p class="text-gray-700 mb-8 text-sm sm:text-base leading-relaxed">
        Welcome to Fansngage (referred to as "we", "our", or "us"). This Privacy Policy explains how
        we collect, use, protect, and share your personal information when you use
        <a href="https://fansngage.com" class="text-[#e82264] hover:underline"
          >https://fansngage.com</a
        >, our platform for content creators and fans (the "Site").
        <strong>By using the Site, you agree to the practices described in this policy.</strong>
      </p>

      <!-- Table of Contents -->
      <div class="bg-gray-50 rounded-lg p-6 mb-8">
        <h3 class="text-lg font-semibold text-gray-800 mb-4">Table of Contents</h3>
        <ol class="list-decimal pl-5 space-y-2 text-[#e82264] font-medium text-sm sm:text-base">
          <li><a href="#section-1" class="hover:underline">Information We Collect</a></li>
          <li><a href="#section-2" class="hover:underline">How We Use Your Information</a></li>
          <li><a href="#section-3" class="hover:underline">Sharing of Your Information</a></li>
          <li>
            <a href="#section-4" class="hover:underline">Cookies and Tracking Technologies</a>
          </li>
          <li><a href="#section-5" class="hover:underline">The Security of Your Information</a></li>
          <li>
            <a href="#section-6" class="hover:underline">Your Choices About Your Information</a>
          </li>
          <li><a href="#section-7" class="hover:underline">Your Data Rights</a></li>
          <li><a href="#section-8" class="hover:underline">Children's Privacy</a></li>
          <li><a href="#section-9" class="hover:underline">International Data Transfers</a></li>
          <li><a href="#section-10" class="hover:underline">Content Ownership & Licensing</a></li>
          <li><a href="#section-11" class="hover:underline">Data Breach Notification</a></li>
          <li><a href="#section-12" class="hover:underline">Policy Updates</a></li>
          <li><a href="#section-13" class="hover:underline">Contact Us</a></li>
        </ol>
      </div>

      <!-- Section 1 -->
      <section id="section-1" class="mb-8">
        <h3 class="text-xl font-bold text-gray-800 mb-4">1. Information We Collect</h3>

        <h4 class="text-lg font-semibold text-gray-700 mb-2">a. Info You Provide</h4>
        <ul class="list-disc pl-6 mb-4 text-gray-700 space-y-1">
          <li>
            <strong>Profile details:</strong> like your name, email, username, password, and linked
            social accounts.
          </li>
          <li><strong>Payment data:</strong> when you buy or tip (via Stripe or PayPal).</li>
          <li><strong>Content:</strong> posts, videos, photos, messages, comments.</li>
          <li>
            <strong>Clipboard content:</strong> only if you paste something — we don't store it.
          </li>
          <li>
            <strong>Messages:</strong> including metadata like timestamps and participants (but not
            private message contents unless flagged).
          </li>
        </ul>

        <h4 class="text-lg font-semibold text-gray-700 mb-2">b. Info We Collect Automatically</h4>
        <ul class="list-disc pl-6 mb-4 text-gray-700 space-y-1">
          <li>
            <strong>Device & browser info:</strong> IP address, device type, screen size, browser
            version.
          </li>
          <li>
            <strong>Usage patterns:</strong> pages you visit, features you use, time spent, buttons
            clicked.
          </li>
          <li>
            <strong>Inferred preferences:</strong> like your content interests based on behavior.
          </li>
          <li><strong>Cross-device activity:</strong> if you log in on multiple devices.</li>
        </ul>

        <h4 class="text-lg font-semibold text-gray-700 mb-2">c. Info From Others</h4>
        <ul class="list-disc pl-6 mb-4 text-gray-700 space-y-1">
          <li><strong>Social media login:</strong> If you sign in using Google, Facebook, etc.</li>
          <li><strong>Analytics & ad partners:</strong> for measuring platform performance.</li>
        </ul>
      </section>

      <!-- Section 2 -->
      <section id="section-2" class="mb-8">
        <h3 class="text-xl font-bold text-gray-800 mb-4">2. How We Use Your Information</h3>
        <p class="text-gray-700 mb-4">
          We use the information we collect to provide and improve Fansngage.
        </p>
        <ul class="list-disc pl-6 text-gray-700 space-y-1">
          <li>Operate and maintain the Fansngage platform</li>
          <li>Process payments, subscriptions, and payouts</li>
          <li>Communicate with you (e.g., order updates, support, policy changes)</li>
          <li>
            Personalize your experience by remembering preferences and delivering relevant content
          </li>
          <li>Help you access your account securely and quickly</li>
          <li>Recommend creators or content based on your activity</li>
          <li>Analyze usage and optimize platform performance</li>
          <li>Measure traffic and platform performance</li>
          <li>Test new features and improve functionality</li>
          <li>Ensure technical stability and resolve bugs</li>
          <li>Enforce our terms and prevent fraud or misuse</li>
          <li>
            Improve services using AI-based analytics (no external AI model training without
            consent)
          </li>
          <li>
            Promote creator content and the platform (e.g., thumbnails, previews, or campaigns)
          </li>
          <li>
            Send relevant notifications, announcements, or marketing (only if you've opted in)
          </li>
          <li>
            Facilitate interactive experiences like promotions, contests, or events (participation
            optional and privacy-controlled)
          </li>
        </ul>
        <p class="text-gray-700 mt-4">
          We may analyze trends and anonymized data to better understand our audience and how
          Fansngage is used.
        </p>
      </section>

      <!-- Section 3 -->
      <section id="section-3" class="mb-8">
        <h3 class="text-xl font-bold text-gray-800 mb-4">3. Sharing of Your Information</h3>
        <p class="text-gray-700 mb-4">
          We do not sell or rent your personal information to third parties. However, we may share
          information under the following circumstances to provide and improve the Fansngage
          experience:
        </p>

        <h4 class="text-lg font-semibold text-gray-700 mb-2">a. Service Providers</h4>
        <p class="text-gray-700 mb-4">
          We may share your information—including usage data, device identifiers, and cookie
          data—with trusted third-party service providers (e.g., cloud hosting, payment processors
          like Stripe or PayPal, fraud detection tools, analytics platforms, or email delivery
          services). These partners help us operate the platform, and they are contractually
          obligated to handle your data securely and only for the purpose of providing their
          services.
        </p>

        <h4 class="text-lg font-semibold text-gray-700 mb-2">
          b. Advertising and Marketing Partners
        </h4>
        <p class="text-gray-700 mb-4">
          With your consent (where required), we may share anonymized or aggregated data with
          advertising networks to help deliver personalized content or measure the effectiveness of
          campaigns. No personally identifiable information will be shared without your explicit
          permission.
        </p>

        <h4 class="text-lg font-semibold text-gray-700 mb-2">
          c. Legal Requirements and Protection
        </h4>
        <p class="text-gray-700 mb-2">We may disclose your information when:</p>
        <ul class="list-disc pl-6 mb-4 text-gray-700 space-y-1">
          <li>Required by law, subpoena, or other legal process.</li>
          <li>Necessary to enforce our Terms of Service or other agreements.</li>
          <li>
            Needed to protect the rights, safety, or property of Fansngage, our users, or others.
          </li>
        </ul>

        <h4 class="text-lg font-semibold text-gray-700 mb-2">d. Public Content</h4>
        <p class="text-gray-700 mb-4">
          Any content you voluntarily make public (e.g., posts, creator content, comments, or
          profile information marked as public) may be viewed, shared, or redistributed by other
          users or external platforms (if embedded or featured).
        </p>

        <h4 class="text-lg font-semibold text-gray-700 mb-2">e. Business Transfers</h4>
        <p class="text-gray-700 mb-4">
          In the event of a merger, acquisition, sale of assets, or restructuring, your data may be
          transferred to the new owner. That entity will be required to honor the commitments of
          this Privacy Policy.
        </p>

        <h4 class="text-lg font-semibold text-gray-700 mb-2">f. Aggregated or Anonymized Data</h4>
        <p class="text-gray-700 mb-4">
          We may share anonymized, aggregated data (that does not personally identify you) with
          research partners, advertisers, or the public to improve our platform or for analytical
          insights.
        </p>
      </section>

      <!-- Section 4 -->
      <section id="section-4" class="mb-8">
        <h3 class="text-xl font-bold text-gray-800 mb-4">4. Cookies and Tracking Technologies</h3>
        <p class="text-gray-700 mb-2">We use cookies to:</p>
        <ul class="list-disc pl-6 mb-4 text-gray-700 space-y-1">
          <li>Save preferences and enable login/security</li>
          <li>Analyze site performance and engagement</li>
          <li>Provide personalized content or offers</li>
        </ul>
        <p class="text-gray-700">
          You can manage cookies in your browser settings. Disabling cookies may affect certain
          functionalities.
        </p>
      </section>

      <!-- Section 5 -->
      <section id="section-5" class="mb-8">
        <h3 class="text-xl font-bold text-gray-800 mb-4">5. The Security of Your Information</h3>
        <p class="text-gray-700 mb-4">
          We are committed to keeping your information secure and protected. While we implement
          industry-standard measures, including encryption, to safeguard your personal data, please
          be aware that no method of online transmission is 100% secure. Any data you transmit via
          the Platform is done at your own risk.
        </p>
        <p class="text-gray-700 mb-4">
          To ensure robust protection, we maintain technical and organizational safeguards designed
          to match the level of risk involved. These measures are reviewed and updated periodically
          to adapt to evolving security standards and threats.
        </p>
        <p class="text-gray-700 mb-4">
          Occasionally, our Platform may contain links to websites operated by our partners,
          affiliates, or advertisers. Please note that these external websites have their own
          privacy policies. We are not responsible for their privacy practices, so we encourage you
          to review their policies before sharing any personal data.
        </p>
        <h4 class="text-lg font-semibold text-gray-700 mb-2">Your Responsibility</h4>
        <p class="text-gray-700">
          You are responsible for keeping your password confidential and for managing access to your
          account. Do not share your login credentials, and always use strong, unique passwords.
        </p>
      </section>

      <!-- Section 6 -->
      <section id="section-6" class="mb-8">
        <h3 class="text-xl font-bold text-gray-800 mb-4">6. Your Choices About Your Information</h3>

        <h4 class="text-lg font-semibold text-gray-700 mb-2">Managing Your Account</h4>
        <p class="text-gray-700 mb-2">
          You may update or correct your personal information at any time by logging into your
          Fansngage account settings. You can:
        </p>
        <ul class="list-disc pl-6 mb-4 text-gray-700 space-y-1">
          <li>Edit your profile</li>
          <li>Change your password</li>
          <li>Update payment details</li>
          <li>Manage notification preferences</li>
        </ul>

        <h4 class="text-lg font-semibold text-gray-700 mb-2">Email Preferences</h4>
        <p class="text-gray-700 mb-4">
          You can unsubscribe from non-essential marketing emails by clicking the "unsubscribe" link
          in those emails. However, certain service-related emails (e.g., billing updates, security
          alerts) are necessary for your account and cannot be opted out of.
        </p>

        <h4 class="text-lg font-semibold text-gray-700 mb-2">Data Retention</h4>
        <p class="text-gray-700 mb-4">
          If you choose to deactivate or delete your account, we may retain certain data (e.g., for
          billing, legal, or backup purposes) for a commercially reasonable period, unless otherwise
          required by law. Your content may remain stored in backup systems or logs, but will no
          longer be publicly accessible or actively processed.
        </p>

        <h4 class="text-lg font-semibold text-gray-700 mb-2">How Long We Keep Your User Content</h4>
        <p class="text-gray-700 mb-2">
          After you deactivate or delete your Fansngage account, we may retain certain information —
          including your profile details and User Content — for a commercially reasonable period for
          purposes such as:
        </p>
        <ul class="list-disc pl-6 mb-4 text-gray-700 space-y-1">
          <li>Backup and recovery</li>
          <li>Legal compliance</li>
          <li>Fraud prevention</li>
          <li>Audit and dispute resolution</li>
        </ul>
        <p class="text-gray-700 mb-4">
          This retention ensures we can maintain the integrity and security of our services, comply
          with our legal obligations, and protect both users and the platform from misuse.
        </p>
        <p class="text-gray-700 mb-4">
          Your data will no longer be visible or actively processed on the platform once your
          account is deactivated or deleted. However, it may exist in our secure backups until it is
          safely purged in accordance with our data retention schedule.
        </p>
        <p class="text-gray-700 mb-4">
          To request permanent deletion, please email us at
          <a href="mailto:support@fansngage.com" class="text-[#e82264] hover:underline"
            >support@fansngage.com</a
          >
          or use the account deletion option in your settings.
        </p>
        <p class="text-gray-700">
          Once your request is verified and processed, your personal information and content will be
          removed from active systems, in accordance with our data retention policy and applicable
          laws.
        </p>
      </section>

      <!-- Section 7 -->
      <section id="section-7" class="mb-8">
        <h3 class="text-xl font-bold text-gray-800 mb-4">7. Your Data Rights (EEA, CCPA, USA)</h3>
        <p class="text-gray-700 mb-2">
          If you reside in the EEA, California, or a U.S. state with privacy legislation, you have
          the right to:
        </p>
        <ul class="list-disc pl-6 mb-4 text-gray-700 space-y-1">
          <li>Access your personal data</li>
          <li>Request corrections or deletions</li>
          <li>Opt-out of marketing or sale of personal data</li>
          <li>Request a copy of your data (data portability)</li>
          <li>File a complaint with a data protection authority</li>
        </ul>
        <p class="text-gray-700">
          To exercise any of these rights, please contact us at:
          <a href="mailto:support@fansngage.com" class="text-[#e82264] hover:underline"
            >support@fansngage.com</a
          >
        </p>
      </section>

      <!-- Section 8 -->
      <section id="section-8" class="mb-8">
        <h3 class="text-xl font-bold text-gray-800 mb-4">8. Children's Privacy</h3>
        <p class="text-gray-700">
          Fansngage is not intended for individuals under 18. We do not knowingly collect data from
          minors. If such data is discovered, it will be deleted promptly.
        </p>
      </section>

      <!-- Section 9 -->
      <section id="section-9" class="mb-8">
        <h3 class="text-xl font-bold text-gray-800 mb-4">9. International Data Transfers</h3>
        <p class="text-gray-700">
          Your data may be transferred to and processed in countries outside your jurisdiction. We
          ensure such transfers comply with GDPR and other legal frameworks.
        </p>
      </section>

      <!-- Section 10 -->
      <section id="section-10" class="mb-8">
        <h3 class="text-xl font-bold text-gray-800 mb-4">10. Content Ownership & Licensing</h3>
        <p class="text-gray-700 mb-2">
          You retain ownership of content you upload. By uploading content, you grant us a limited,
          non-exclusive, worldwide license to:
        </p>
        <ul class="list-disc pl-6 mb-4 text-gray-700 space-y-1">
          <li>Display it to your fans</li>
          <li>Enable platform features (e.g., thumbnails, discovery previews)</li>
          <li>Promote the platform (in a limited, respectful manner)</li>
        </ul>
        <p class="text-gray-700">We do not claim ownership over your creations.</p>
      </section>

      <!-- Section 11 -->
      <section id="section-11" class="mb-8">
        <h3 class="text-xl font-bold text-gray-800 mb-4">11. Data Breach Notification</h3>
        <p class="text-gray-700">
          In the event of a breach, affected users and relevant authorities will be notified
          promptly, as required by applicable law.
        </p>
      </section>

      <!-- Section 12 -->
      <section id="section-12" class="mb-8">
        <h3 class="text-xl font-bold text-gray-800 mb-4">12. Policy Updates</h3>
        <p class="text-gray-700">
          We may revise this policy periodically. Changes will be posted on this page with an
          updated "Last Updated" date. Continued use of the site means you accept the new policy.
        </p>
      </section>

      <!-- Section 13 -->
      <section id="section-13" class="mb-8">
        <h3 class="text-xl font-bold text-gray-800 mb-4">13. Contact Us</h3>
        <p class="text-gray-700 mb-2">For questions, data requests, or privacy concerns:</p>
        <p class="text-gray-700">
          <strong>Email:</strong>
          <a href="mailto:support@fansngage.com" class="text-[#e82264] hover:underline"
            >support@fansngage.com</a
          ><br />
          <strong>Address:</strong> 35J3+32F - Jumeirah Lake Towers, Dubai, United Arab Emirates
        </p>
      </section>

      <!-- Footer -->
      <div class="border-t pt-6 mt-8 text-center text-gray-500 text-sm">
        <p>© 2025 Fansngage. All rights reserved.</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>
