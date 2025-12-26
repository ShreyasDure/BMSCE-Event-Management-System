import React from 'react';
import PolicyLayout from '../components/Layout/PolicyLayout';

const PrivacyPolicy = () => {
  return (
    <PolicyLayout title="Privacy Policy">
      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Introduction</h2>
        <p className="text-gray-700 mb-4">
          BMSCE Event Management is committed to protecting your privacy. This Privacy Policy 
          explains how we collect, use, and protect your information when you use our event 
          management platform. This is a demonstration page for academic purposes.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Information We Collect</h2>
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-2">Personal Information</h3>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>Name and contact details (email, phone number)</li>
              <li>Student ID and academic information</li>
              <li>Account credentials and authentication data</li>
              <li>Event registration and participation history</li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-2">Technical Information</h3>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>IP address and device information</li>
              <li>Browser type and version</li>
              <li>Operating system information</li>
              <li>Pages visited and time spent on platform</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">How We Use Your Information</h2>
        <ul className="list-disc pl-6 text-gray-700 space-y-2">
          <li>To provide and maintain our event management services</li>
          <li>To process event registrations and manage attendance</li>
          <li>To communicate with you about events and updates</li>
          <li>To improve our platform and user experience</li>
          <li>To ensure platform security and prevent fraud</li>
          <li>To comply with educational institution requirements</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Data Sharing and Disclosure</h2>
        <p className="text-gray-700 mb-4">
          We may share your information in the following circumstances:
        </p>
        <ul className="list-disc pl-6 text-gray-700 space-y-2">
          <li>With event organizers for event management purposes</li>
          <li>With BMSCE administration for academic requirements</li>
          <li>With service providers who assist in platform operations</li>
          <li>When required by law or educational regulations</li>
          <li>To protect our rights, privacy, safety, or property</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Data Security</h2>
        <p className="text-gray-700 mb-4">
          We implement appropriate technical and organizational measures to protect your 
          personal information against unauthorized access, alteration, disclosure, or destruction. 
          However, no internet transmission is completely secure.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Your Rights</h2>
        <ul className="list-disc pl-6 text-gray-700 space-y-2">
          <li>Access and review your personal information</li>
          <li>Correct inaccurate or incomplete information</li>
          <li>Request deletion of your personal information</li>
          <li>Opt-out of non-essential communications</li>
          <li>Export your data in a portable format</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Cookies and Tracking</h2>
        <p className="text-gray-700 mb-4">
          We use cookies and similar technologies to enhance your experience, analyze platform 
          usage, and provide personalized content. You can control cookie settings through your 
          browser preferences.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Contact Information</h2>
        <p className="text-gray-700 mb-4">
          If you have questions about this Privacy Policy or our data practices, please contact:
        </p>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="text-gray-700">
            <strong>Email:</strong> privacy@bmsce-events.demo<br />
            <strong>Address:</strong> BMS College of Engineering, Basavanagudi, Bangalore - 560019<br />
            <strong>Phone:</strong> +91 80 2662 1006
          </p>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Policy Updates</h2>
        <p className="text-gray-700">
          This Privacy Policy may be updated periodically to reflect changes in our practices 
          or applicable laws. We will notify users of significant changes through platform 
          announcements or email notifications.
        </p>
      </section>
    </PolicyLayout>
  );
};

export default PrivacyPolicy;
