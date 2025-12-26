import React from 'react';
import PolicyLayout from '../components/Layout/PolicyLayout';

const CookiePolicy = () => {
  return (
    <PolicyLayout title="Cookie Policy">
      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">What Are Cookies</h2>
        <p className="text-gray-700 mb-4">
          Cookies are small text files that are stored on your device (computer, tablet, or mobile) 
          when you visit a website. They help the website remember information about your visit, 
          which can make it easier to visit the site again and make the site more useful to you.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">How We Use Cookies</h2>
        <p className="text-gray-700 mb-4">
          BMSCE Event Management uses cookies for the following purposes:
        </p>
        <ul className="list-disc pl-6 text-gray-700 space-y-2">
          <li><strong>Essential Cookies:</strong> Required for the platform to function properly</li>
          <li><strong>Authentication Cookies:</strong> Keep you logged in and maintain your session</li>
          <li><strong>Preference Cookies:</strong> Remember your settings and preferences</li>
          <li><strong>Analytics Cookies:</strong> Help us understand how the platform is used</li>
          <li><strong>Functional Cookies:</strong> Enable personalized features and content</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Types of Cookies We Use</h2>
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-2">Session Cookies</h3>
            <p className="text-gray-700">
              These are temporary cookies that are erased when you close your browser. They help 
              maintain your session and track your activity during a single visit.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-2">Persistent Cookies</h3>
            <p className="text-gray-700">
              These remain on your device for a set period or until you delete them. They help 
              us recognize you when you return to the platform.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-2">First-Party Cookies</h3>
            <p className="text-gray-700">
              These are set by our platform directly and only we can read them. They are essential 
              for the platform to function properly.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-2">Third-Party Cookies</h3>
            <p className="text-gray-700">
              These are set by external services we use, such as analytics providers or social 
              media integration services.
            </p>
          </div>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Specific Cookies Used</h2>
        <div className="bg-gray-50 p-4 rounded-lg">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-2 font-medium text-gray-800">Cookie Name</th>
                <th className="text-left py-2 font-medium text-gray-800">Purpose</th>
                <th className="text-left py-2 font-medium text-gray-800">Duration</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-100">
                <td className="py-2 text-gray-700">session_id</td>
                <td className="py-2 text-gray-700">Maintains user session</td>
                <td className="py-2 text-gray-700">Session</td>
              </tr>
              <tr className="border-b border-gray-100">
                <td className="py-2 text-gray-700">auth_token</td>
                <td className="py-2 text-gray-700">User authentication</td>
                <td className="py-2 text-gray-700">30 days</td>
              </tr>
              <tr className="border-b border-gray-100">
                <td className="py-2 text-gray-700">preferences</td>
                <td className="py-2 text-gray-700">User preferences</td>
                <td className="py-2 text-gray-700">1 year</td>
              </tr>
              <tr className="border-b border-gray-100">
                <td className="py-2 text-gray-700">analytics_id</td>
                <td className="py-2 text-gray-700">Platform usage analytics</td>
                <td className="py-2 text-gray-700">2 years</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Managing Cookies</h2>
        <p className="text-gray-700 mb-4">
          You can control and manage cookies in various ways:
        </p>
        <ul className="list-disc pl-6 text-gray-700 space-y-2">
          <li>Browser settings to block or delete cookies</li>
          <li>Cookie consent banner on our platform</li>
          <li>Privacy settings in your user account</li>
          <li>Clearing browsing data periodically</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Your Choices</h2>
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-2">Accept All Cookies</h3>
            <p className="text-gray-700">
              This allows us to provide you with the best possible experience and all features 
              of the platform.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-2">Accept Essential Cookies Only</h3>
            <p className="text-gray-700">
              This ensures the platform functions but limits personalization and analytics features.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-2">Reject All Cookies</h3>
            <p className="text-gray-700">
              This may limit your ability to use certain features of the platform.
            </p>
          </div>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Impact of Disabling Cookies</h2>
        <p className="text-gray-700 mb-4">
          If you choose to disable cookies, some features of the platform may not function 
          properly. This may include:
        </p>
        <ul className="list-disc pl-6 text-gray-700 space-y-2">
          <li>Difficulty staying logged in to your account</li>
          <li>Loss of personalized settings and preferences</li>
          <li>Limited ability to track event registrations</li>
          <li>Reduced platform performance and user experience</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Third-Party Services</h2>
        <p className="text-gray-700 mb-4">
          We may use third-party services that set their own cookies. These include:
        </p>
        <ul className="list-disc pl-6 text-gray-700 space-y-2">
          <li>Google Analytics for website usage statistics</li>
          <li>Educational institution authentication systems</li>
          <li>Payment processing services (if applicable)</li>
          <li>Social media integration services</li>
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Updates to Cookie Policy</h2>
        <p className="text-gray-700">
          We may update this Cookie Policy from time to time to reflect changes in our 
          practices or for other operational, legal, or regulatory reasons. We will notify 
          you of any significant changes by posting the new policy on this page.
        </p>
      </section>
    </PolicyLayout>
  );
};

export default CookiePolicy;
