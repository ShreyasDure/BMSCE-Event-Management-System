import React from 'react';
import Navbar from '../Home/Navbar';
import Footer from '../Home/Footer';

const PolicyLayout = ({ children, title }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{title}</h1>
              <div className="w-16 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full"></div>
            </div>
            
            <div className="prose prose-gray max-w-none">
              {children}
            </div>
            
            <div className="mt-12 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="text-sm text-yellow-800">
                <strong>Notice:</strong> This page is for academic and demonstration purposes only. 
                This is not a live implementation and should not be considered as legally binding 
                terms or actual policies.
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PolicyLayout;
