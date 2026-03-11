import React from "react";

function PrivacyPolicy() {
  return (
    <div className="bg-gray-50 min-h-screen py-16 bg-gradient-to-b from-[var(--primary-dark)] via-transparent to-transparent">
      <div className="max-w-5xl mx-auto px-6 bg-[var(--gray-text)]">

        {/* Page Title */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-[var(--primary-dark)] mb-4">
            Privacy Policy
          </h1>
          <p className="text-gray-600">
            M.S.T College Myanmar is committed to protecting your privacy and
            safeguarding your personal information.
          </p>
        </div>

        <div className="bg-white shadow-md rounded-xl p-8 space-y-8">

          {/* Introduction */}
          <section>
            <h2 className="text-xl font-semibold text-[var(--primary-dark)] mb-3">
              1. Introduction
            </h2>
            <p className="text-gray-600 leading-relaxed">
              This Privacy Policy explains how M.S.T College Myanmar collects,
              uses, and protects the personal information of students,
              applicants, staff, and visitors who use our website and services.
              By accessing our website, you agree to the practices described in
              this policy.
            </p>
          </section>

          {/* Information Collection */}
          <section>
            <h2 className="text-xl font-semibold text-[var(--primary-dark)] mb-3">
              2. Information We Collect
            </h2>
            <ul className="list-disc pl-6 text-gray-600 space-y-2">
              <li>Personal information such as name, email address, and phone number.</li>
              <li>Academic details submitted through admission or course applications.</li>
              <li>Information provided when contacting us through forms or emails.</li>
              <li>Website usage data such as IP address, browser type, and pages visited.</li>
            </ul>
          </section>

          {/* Usage */}
          <section>
            <h2 className="text-xl font-semibold text-[var(--primary-dark)] mb-3">
              3. How We Use Your Information
            </h2>
            <ul className="list-disc pl-6 text-gray-600 space-y-2">
              <li>To process applications for courses and programs.</li>
              <li>To communicate updates, announcements, and academic information.</li>
              <li>To improve our website, services, and student experience.</li>
              <li>To respond to inquiries or support requests.</li>
            </ul>
          </section>

          {/* Security */}
          <section>
            <h2 className="text-xl font-semibold text-[var(--primary-dark)] mb-3">
              4. Data Protection
            </h2>
            <p className="text-gray-600 leading-relaxed">
              M.S.T College implements appropriate technical and administrative
              security measures to protect personal data from unauthorized
              access, loss, misuse, or disclosure.
            </p>
          </section>

          {/* Third Party */}
          <section>
            <h2 className="text-xl font-semibold text-[var(--primary-dark)] mb-3">
              5. Third-Party Services
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Our website may contain links to third-party services such as
              social media platforms or external educational resources. We are
              not responsible for the privacy practices of those websites.
            </p>
          </section>

          {/* Cookies */}
          <section>
            <h2 className="text-xl font-semibold text-[var(--primary-dark)] mb-3">
              6. Cookies
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Our website may use cookies to enhance user experience, analyze
              website traffic, and improve functionality. Users may choose to
              disable cookies in their browser settings.
            </p>
          </section>

          {/* Policy Updates */}
          <section>
            <h2 className="text-xl font-semibold text-[var(--primary-dark)] mb-3">
              7. Policy Updates
            </h2>
            <p className="text-gray-600 leading-relaxed">
              M.S.T College reserves the right to update this Privacy Policy at
              any time. Changes will be posted on this page and will take effect
              immediately upon publication.
            </p>
          </section>

          {/* Contact */}
          <section>
            <h2 className="text-xl font-semibold text-[var(--primary-dark)] mb-3">
              8. Contact Us
            </h2>
            <p className="text-gray-600 leading-relaxed">
              If you have questions regarding this Privacy Policy or how your
              information is handled, please contact M.S.T College through the
              official contact information provided on our website.
            </p>
          </section>

          {/* Last Updated */}
          <div className="border-t pt-6 text-sm text-gray-500 text-center">
            Last Updated: {new Date().getFullYear()}
          </div>

        </div>
      </div>
    </div>
  );
}

export default PrivacyPolicy;