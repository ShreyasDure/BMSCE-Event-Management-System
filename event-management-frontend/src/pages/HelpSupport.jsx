import React from 'react';
import PolicyLayout from '../components/Layout/PolicyLayout';

const HelpSupport = () => {
  return (
    <PolicyLayout title="Help & Support">
      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Welcome to BMSCE Event Management Support</h2>
        <p className="text-gray-700 mb-4">
          We're here to help you make the most of our event management platform. Whether you're 
          a student looking to discover events or an organizer managing campus activities, we've 
          got the resources you need.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Common Issues & Solutions</h2>
        <div className="space-y-6">
          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="text-lg font-medium text-gray-800 mb-2">Account Login Problems</h3>
            <p className="text-gray-700 mb-2">
              <strong>Issue:</strong> Unable to log in to your account
            </p>
            <p className="text-gray-700 mb-2">
              <strong>Solution:</strong> 
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-1">
              <li>Check your email and password for typos</li>
              <li>Use the "Forgot Password" link to reset your password</li>
              <li>Ensure you're using your BMSCE email address</li>
              <li>Clear your browser cache and try again</li>
            </ul>
          </div>

          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="text-lg font-medium text-gray-800 mb-2">Event Registration Issues</h3>
            <p className="text-gray-700 mb-2">
              <strong>Issue:</strong> Cannot register for an event
            </p>
            <p className="text-gray-700 mb-2">
              <strong>Solution:</strong> 
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-1">
              <li>Ensure you're logged in to your account</li>
              <li>Check if registration is still open</li>
              <li>Verify you meet the event requirements</li>
              <li>Contact the event organizer directly</li>
            </ul>
          </div>

          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="text-lg font-medium text-gray-800 mb-2">Dashboard Access Problems</h3>
            <p className="text-gray-700 mb-2">
              <strong>Issue:</strong> Cannot access your dashboard
            </p>
            <p className="text-gray-700 mb-2">
              <strong>Solution:</strong> 
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-1">
              <li>Ensure your account is properly verified</li>
              <li>Check your role (student/organizer) is correct</li>
              <li>Log out and log back in</li>
              <li>Contact IT support if the issue persists</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Getting Started Guides</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="text-lg font-medium text-blue-900 mb-2">For Students</h3>
            <ul className="list-disc pl-6 text-blue-800 space-y-1">
              <li>Creating your account</li>
              <li>Browsing and filtering events</li>
              <li>Registering for events</li>
              <li>Managing your registrations</li>
              <li>Viewing your event history</li>
            </ul>
          </div>
          
          <div className="bg-green-50 p-4 rounded-lg">
            <h3 className="text-lg font-medium text-green-900 mb-2">For Organizers</h3>
            <ul className="list-disc pl-6 text-green-800 space-y-1">
              <li>Setting up organizer account</li>
              <li>Creating new events</li>
              <li>Managing event details</li>
              <li>Tracking registrations</li>
              <li>Communicating with participants</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Contact Support</h2>
        <div className="bg-gray-50 p-6 rounded-lg">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-medium text-gray-800 mb-3">Email Support</h3>
              <p className="text-gray-700 mb-2">
                Send us an email and we'll respond within 24-48 hours.
              </p>
              <p className="text-gray-700">
                <strong>Email:</strong> support@bmsce-events.demo
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-medium text-gray-800 mb-3">Phone Support</h3>
              <p className="text-gray-700 mb-2">
                Available during college hours (9:00 AM - 5:00 PM, Monday-Friday)
              </p>
              <p className="text-gray-700">
                <strong>Phone:</strong> +91 80 2662 1006
              </p>
            </div>
          </div>
          
          <div className="mt-6 pt-6 border-t border-gray-200">
            <h3 className="text-lg font-medium text-gray-800 mb-3">In-Person Support</h3>
            <p className="text-gray-700 mb-2">
              Visit our help desk at the Student Services Building:
            </p>
            <p className="text-gray-700">
              <strong>Location:</strong> Room 203, Student Services Building<br />
              <strong>Hours:</strong> Monday - Friday, 10:00 AM - 4:00 PM
            </p>
          </div>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Frequently Asked Questions</h2>
        <div className="space-y-4">
          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="text-lg font-medium text-gray-800 mb-2">How do I reset my password?</h3>
            <p className="text-gray-700">
              Click the "Forgot Password" link on the login page, enter your BMSCE email address, 
              and follow the instructions sent to your email.
            </p>
          </div>
          
          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="text-lg font-medium text-gray-800 mb-2">Can I cancel my event registration?</h3>
            <p className="text-gray-700">
              Yes, you can cancel your registration up to 24 hours before the event starts. 
              Go to your dashboard, find the event, and click "Cancel Registration."
            </p>
          </div>
          
          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="text-lg font-medium text-gray-800 mb-2">How do I become an event organizer?</h3>
            <p className="text-gray-700">
              Contact the Student Affairs office or email us at organizer@bmsce-events.demo 
              to request organizer privileges.
            </p>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">System Requirements</h2>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="text-gray-700 mb-3">For the best experience, we recommend:</p>
          <ul className="list-disc pl-6 text-gray-700 space-y-1">
            <li>Modern web browser (Chrome, Firefox, Safari, Edge)</li>
            <li>Stable internet connection</li>
            <li>JavaScript enabled</li>
            <li>Cookies enabled (for authentication)</li>
            <li>Minimum screen resolution: 1024x768</li>
          </ul>
        </div>
      </section>
    </PolicyLayout>
  );
};

export default HelpSupport;
