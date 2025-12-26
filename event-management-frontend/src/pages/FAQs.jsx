import React from 'react';
import PolicyLayout from '../components/Layout/PolicyLayout';

const FAQs = () => {
  return (
    <PolicyLayout title="Frequently Asked Questions">
      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">General Questions</h2>
        <div className="space-y-4">
          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="text-lg font-medium text-gray-800 mb-2">What is BMSCE Event Management?</h3>
            <p className="text-gray-700">
              BMSCE Event Management is a comprehensive digital platform designed to streamline 
              event discovery, registration, and management within the BMS College of Engineering 
              ecosystem. It connects students, faculty, and event organizers for enhanced campus engagement.
            </p>
          </div>
          
          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="text-lg font-medium text-gray-800 mb-2">Who can use this platform?</h3>
            <p className="text-gray-700">
              The platform is available to all BMSCE students, faculty members, and authorized 
              event organizers. You must have a valid BMSCE email address to create an account.
            </p>
          </div>
          
          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="text-lg font-medium text-gray-800 mb-2">Is the platform free to use?</h3>
            <p className="text-gray-700">
              Yes, the platform is completely free for all BMSCE students and faculty. There are 
              no charges for event registration or basic organizer features.
            </p>
          </div>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Account & Registration</h2>
        <div className="space-y-4">
          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="text-lg font-medium text-gray-800 mb-2">How do I create an account?</h3>
            <p className="text-gray-700">
              Click the "Sign Up" button on the homepage, enter your BMSCE email address, 
              create a password, and follow the verification process. You'll need to verify 
              your email before accessing all features.
            </p>
          </div>
          
          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="text-lg font-medium text-gray-800 mb-2">I forgot my password. How do I reset it?</h3>
            <p className="text-gray-700">
              Click the "Forgot Password" link on the login page, enter your registered email 
              address, and check your email for reset instructions. The reset link is valid 
              for 24 hours.
            </p>
          </div>
          
          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="text-lg font-medium text-gray-800 mb-2">Can I change my email address?</h3>
            <p className="text-gray-700">
              Email addresses are linked to your BMSCE identity and cannot be changed. 
              If you need to update your email, contact the IT support team.
            </p>
          </div>
          
          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="text-lg font-medium text-gray-800 mb-2">How do I delete my account?</h3>
            <p className="text-gray-700">
              You can request account deletion by going to Account Settings and selecting 
              "Delete Account." Note that this action is irreversible and will remove all 
              your event registration history.
            </p>
          </div>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Events & Registration</h2>
        <div className="space-y-4">
          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="text-lg font-medium text-gray-800 mb-2">How do I find events?</h3>
            <p className="text-gray-700">
              Browse the Events section on the homepage or use the search and filter options 
              to find events by category, date, location, or organizer. You can also save 
              events to your favorites for quick access.
            </p>
          </div>
          
          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="text-lg font-medium text-gray-800 mb-2">Can I register for multiple events?</h3>
            <p className="text-gray-700">
              Yes, you can register for as many events as you'd like, provided you meet the 
              requirements and the events don't have conflicting schedules.
            </p>
          </div>
          
          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="text-lg font-medium text-gray-800 mb-2">How do I cancel my registration?</h3>
            <p className="text-gray-700">
              Go to your dashboard, find the event in your registered events list, and click 
              "Cancel Registration." Note that some events may have cancellation deadlines or 
              non-refundable fees.
            </p>
          </div>
          
          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="text-lg font-medium text-gray-800 mb-2">Will I receive reminders for events?</h3>
            <p className="text-gray-700">
              Yes, you'll receive automatic email reminders 24 hours before each registered event. 
              You can manage notification preferences in your account settings.
            </p>
          </div>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">For Event Organizers</h2>
        <div className="space-y-4">
          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="text-lg font-medium text-gray-800 mb-2">How do I become an event organizer?</h3>
            <p className="text-gray-700">
              Contact the Student Affairs office or email organizer@bmsce-events.demo with 
              your department/club details and event management experience. You'll need 
              faculty approval for organizer privileges.
            </p>
          </div>
          
          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="text-lg font-medium text-gray-800 mb-2">What information do I need to create an event?</h3>
            <p className="text-gray-700">
              You'll need: event title and description, date and time, location, category, 
              maximum capacity, registration requirements, and contact information.
            </p>
          </div>
          
          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="text-lg font-medium text-gray-800 mb-2">Can I manage multiple events?</h3>
            <p className="text-gray-700">
              Yes, organizers can create and manage multiple events simultaneously. Your 
              dashboard provides tools to track registrations, send updates, and manage 
              attendance for all your events.
            </p>
          </div>
          
          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="text-lg font-medium text-gray-800 mb-2">How do I communicate with registered participants?</h3>
            <p className="text-gray-700">
              Use the organizer dashboard to send announcements and updates to all registered 
              participants. You can also export participant lists for external communication.
            </p>
          </div>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Technical Support</h2>
        <div className="space-y-4">
          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="text-lg font-medium text-gray-800 mb-2">The platform isn't loading properly. What should I do?</h3>
            <p className="text-gray-700">
              Try clearing your browser cache, disabling browser extensions, or using a different 
              browser. Ensure you have a stable internet connection and JavaScript is enabled.
            </p>
          </div>
          
          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="text-lg font-medium text-gray-800 mb-2">Is there a mobile app?</h3>
            <p className="text-gray-700">
              Currently, the platform is web-based and optimized for mobile browsers. A dedicated 
              mobile app is planned for future development.
            </p>
          </div>
          
          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="text-lg font-medium text-gray-800 mb-2">My data isn't syncing. What's wrong?</h3>
            <p className="text-gray-700">
              Check your internet connection and try refreshing the page. If the issue persists, 
              log out and log back in. Contact support if problems continue.
            </p>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Policies & Guidelines</h2>
        <div className="space-y-4">
          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="text-lg font-medium text-gray-800 mb-2">What are the platform's code of conduct rules?</h3>
            <p className="text-gray-700">
              All users must maintain respectful communication, provide accurate information, 
              and follow BMSCE's institutional policies. Harassment, spam, or fraudulent 
              activities will result in account suspension.
            </p>
          </div>
          
          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="text-lg font-medium text-gray-800 mb-2">How is my personal data protected?</h3>
            <p className="text-gray-700">
              We follow BMSCE's data protection policies and use industry-standard security 
              measures. Your data is only used for platform functionality and never shared 
              with third parties without consent.
            </p>
          </div>
        </div>
      </section>
    </PolicyLayout>
  );
};

export default FAQs;
