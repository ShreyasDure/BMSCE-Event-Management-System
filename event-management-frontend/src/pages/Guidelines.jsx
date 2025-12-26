import React from 'react';
import PolicyLayout from '../components/Layout/PolicyLayout';

const Guidelines = () => {
  return (
    <PolicyLayout title="Community Guidelines">
      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Our Community Commitment</h2>
        <p className="text-gray-700 mb-4">
          BMSCE Event Management is dedicated to creating a safe, inclusive, and productive 
          environment for all members of our college community. These guidelines help ensure 
          that everyone has a positive experience while using our platform.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Core Principles</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="text-lg font-medium text-blue-900 mb-2">Respect & Inclusion</h3>
            <p className="text-blue-800">
              Treat all community members with dignity and respect, regardless of their background, 
              role, or experience level.
            </p>
          </div>
          
          <div className="bg-green-50 p-4 rounded-lg">
            <h3 className="text-lg font-medium text-green-900 mb-2">Integrity & Honesty</h3>
            <p className="text-green-800">
              Be truthful in all interactions and provide accurate information when creating 
              events or registering for activities.
            </p>
          </div>
          
          <div className="bg-purple-50 p-4 rounded-lg">
            <h3 className="text-lg font-medium text-purple-900 mb-2">Collaboration</h3>
            <p className="text-purple-800">
              Work together to create meaningful events and experiences that benefit the entire 
              BMSCE community.
            </p>
          </div>
          
          <div className="bg-orange-50 p-4 rounded-lg">
            <h3 className="text-lg font-medium text-orange-900 mb-2">Responsibility</h3>
            <p className="text-orange-800">
              Take ownership of your actions and commitments, whether as an event organizer 
              or participant.
            </p>
          </div>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">For Event Participants</h2>
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-2">Registration Etiquette</h3>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>Only register for events you genuinely plan to attend</li>
              <li>Cancel your registration if you can no longer attend</li>
              <li>Respect registration deadlines and capacity limits</li>
              <li>Provide accurate information during registration</li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-2">Event Participation</h3>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>Arrive on time and stay for the duration of the event</li>
              <li>Actively participate and engage with content</li>
              <li>Follow event-specific rules and guidelines</li>
              <li>Respect speakers, organizers, and fellow participants</li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-2">Communication Standards</h3>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>Use professional and respectful language in all communications</li>
              <li>Provide constructive feedback when requested</li>
              <li>Avoid spam or irrelevant messages in event discussions</li>
              <li>Protect the privacy of other participants</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">For Event Organizers</h2>
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-2">Event Creation Standards</h3>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>Provide accurate and detailed event descriptions</li>
              <li>Set realistic capacity limits based on venue constraints</li>
              <li>Include clear eligibility requirements and prerequisites</li>
              <li>Specify any costs, materials, or preparation needed</li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-2">Organizer Responsibilities</h3>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>Ensure events align with BMSCE's educational mission</li>
              <li>Obtain necessary permissions and approvals</li>
              <li>Provide timely updates and communications to participants</li>
              <li>Maintain accurate attendance records</li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-2">Quality Assurance</h3>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>Test all technical setups before events begin</li>
              <li>Have backup plans for technical issues</li>
              <li>Collect and respond to participant feedback</li>
              <li>Continuously improve event quality based on experiences</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Content Guidelines</h2>
        <div className="space-y-4">
          <div className="border-l-4 border-red-500 pl-4">
            <h3 className="text-lg font-medium text-gray-800 mb-2">Prohibited Content</h3>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>Harassment, hate speech, or discriminatory content</li>
              <li>False or misleading information</li>
              <li>Spam, promotional content, or commercial advertising</li>
              <li>Content that violates copyright or intellectual property rights</li>
              <li>Illegal activities or content that violates BMSCE policies</li>
            </ul>
          </div>
          
          <div className="border-l-4 border-green-500 pl-4">
            <h3 className="text-lg font-medium text-gray-800 mb-2">Encouraged Content</h3>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>Educational and skill-building activities</li>
              <li>Cultural and artistic events</li>
              <li>Sports and recreational activities</li>
              <li>Career development and networking opportunities</li>
              <li>Community service and social impact initiatives</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Event Categories & Standards</h2>
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-2">Academic Events</h3>
            <p className="text-gray-700 mb-2">
              Workshops, seminars, conferences, and study sessions should:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-1">
              <li>Have clear learning objectives</li>
              <li>Be led by qualified facilitators</li>
              <li>Provide valuable educational content</li>
              <li>Include opportunities for questions and discussion</li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-2">Cultural Events</h3>
            <p className="text-gray-700 mb-2">
              Performances, festivals, and celebrations should:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-1">
              <li>Respect cultural sensitivities and traditions</li>
              <li>Be inclusive and welcoming to all participants</li>
              <li>Follow appropriate content guidelines</li>
              <li>Obtain necessary permissions for performances</li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-2">Sports Activities</h3>
            <p className="text-gray-700 mb-2">
              Tournaments, fitness sessions, and recreational sports should:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-1">
              <li>Prioritize participant safety</li>
              <li>Have qualified supervision when required</li>
              <li>Include proper warm-up and safety protocols</li>
              <li>Be accessible to various skill levels</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Enforcement & Consequences</h2>
        <div className="bg-yellow-50 p-4 rounded-lg">
          <h3 className="text-lg font-medium text-yellow-900 mb-2">Violation Process</h3>
          <p className="text-yellow-800 mb-3">
            When guidelines are violated, we follow this process:
          </p>
          <ol className="list-decimal pl-6 text-yellow-800 space-y-2">
            <li><strong>First Offense:</strong> Warning and educational guidance</li>
            <li><strong>Second Offense:</strong> Temporary suspension (1-2 weeks)</li>
            <li><strong>Third Offense:</strong> Extended suspension (1 month)</li>
            <li><strong>Severe Violations:</strong> Immediate permanent ban</li>
          </ol>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Reporting Issues</h2>
        <p className="text-gray-700 mb-4">
          If you encounter violations of these guidelines or have concerns about an event 
          or user, please report them immediately:
        </p>
        <div className="bg-gray-50 p-4 rounded-lg">
          <ul className="list-disc pl-6 text-gray-700 space-y-2">
            <li><strong>Email:</strong> conduct@bmsce-events.demo</li>
            <li><strong>Confidential Hotline:</strong> +91 80 2662 1006 ext. 555</li>
            <li><strong>In-Person:</strong> Student Affairs Office, Room 301</li>
            <li><strong>Online Form:</strong> Available in your dashboard under "Report Issue"</li>
          </ul>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Guideline Updates</h2>
        <p className="text-gray-700">
          These guidelines may be updated periodically to reflect the evolving needs of our 
          community. We'll notify users of significant changes through platform announcements 
          and email notifications. Your continued use of the platform constitutes acceptance 
          of any updates to these guidelines.
        </p>
      </section>
    </PolicyLayout>
  );
};

export default Guidelines;
