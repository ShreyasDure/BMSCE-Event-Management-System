import React from 'react';
import PolicyLayout from '../components/Layout/PolicyLayout';

const TermsOfService = () => {
  return (
    <PolicyLayout title="Terms of Service">
      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Acceptance of Terms</h2>
        <p className="text-gray-700 mb-4">
          By accessing and using the BMSCE Event Management platform, you agree to be bound 
          by these Terms of Service and all applicable laws and regulations. If you do not 
          agree with any of these terms, you are prohibited from using this platform.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Description of Service</h2>
        <p className="text-gray-700 mb-4">
          BMSCE Event Management is a digital platform designed to facilitate event discovery, 
          registration, and management within the BMS College of Engineering ecosystem. The 
          platform connects students, faculty, and event organizers for enhanced campus engagement.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">User Accounts</h2>
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-2">Registration</h3>
            <p className="text-gray-700">
              Users must create an account to access certain features. You agree to provide 
              accurate, current, and complete information during registration and to update 
              such information to keep it accurate, current, and complete.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-2">Account Security</h3>
            <p className="text-gray-700">
              You are responsible for safeguarding your account credentials and for all 
              activities that occur under your account. You must notify us immediately of 
              any unauthorized use of your account.
            </p>
          </div>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">User Conduct</h2>
        <p className="text-gray-700 mb-4">
          You agree not to use the platform to:
        </p>
        <ul className="list-disc pl-6 text-gray-700 space-y-2">
          <li>Create or share false, misleading, or fraudulent information</li>
          <li>Upload or transmit malicious code, viruses, or harmful content</li>
          <li>Violate any applicable laws or regulations</li>
          <li>Infringe upon the intellectual property rights of others</li>
          <li>Harass, abuse, or harm other users or the platform community</li>
          <li>Interfere with or disrupt the platform's operation or security</li>
          <li>Create multiple accounts for deceptive purposes</li>
          <li>Use the platform for commercial purposes without authorization</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Event Registration and Participation</h2>
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-2">Registration</h3>
            <p className="text-gray-700">
              When you register for events, you agree to provide accurate information and 
              comply with event-specific requirements and guidelines.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-2">Attendance</h3>
            <p className="text-gray-700">
              By registering for events, you commit to attending unless you properly cancel 
              your registration according to the event's cancellation policy.
            </p>
          </div>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Intellectual Property</h2>
        <p className="text-gray-700 mb-4">
          The platform and its original content, features, and functionality are owned by 
          BMSCE Event Management and are protected by international copyright, trademark, 
          and other intellectual property laws.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Privacy Policy</h2>
        <p className="text-gray-700 mb-4">
          Your privacy is important to us. Please review our Privacy Policy, which also 
          governs your use of the platform, to understand our practices regarding the 
          collection and use of your information.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Termination</h2>
        <p className="text-gray-700 mb-4">
          We may terminate or suspend your account and bar access to the platform immediately, 
          without prior notice or liability, for any reason whatsoever, including without 
          limitation if you breach the Terms.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Limitation of Liability</h2>
        <p className="text-gray-700 mb-4">
          In no event shall BMSCE Event Management, our directors, employees, partners, agents, 
          suppliers, or affiliates be liable for any indirect, incidental, special, consequential, 
          or punitive damages, including loss of profits, data, use, or other intangible losses, 
          resulting from your use of the platform.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Governing Law</h2>
        <p className="text-gray-700 mb-4">
          These Terms shall be interpreted and governed by the laws of India, without regard 
          to its conflict of law provisions. Any disputes arising from these Terms will be 
          resolved through the appropriate educational institution channels.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Changes to Terms</h2>
        <p className="text-gray-700">
          We reserve the right to modify these Terms at any time. If we make material changes, 
          we will notify you by email or by posting a notice on the platform prior to the 
          effective date of the changes.
        </p>
      </section>
    </PolicyLayout>
  );
};

export default TermsOfService;
