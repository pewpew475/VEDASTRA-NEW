import React from 'react';

const Services = () => {
  return (
    <main className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <section className="mb-16">
        <h1 className="mb-6 text-3xl sm:text-4xl lg:text-5xl font-bold text-center text-slate-900">
          Our Services
        </h1>
        <p className="mx-auto max-w-3xl text-lg sm:text-xl text-center text-slate-600">
          Comprehensive astrology services powered by expert astrologers and advanced calculators.
        </p>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-3xl p-8 lg:p-12 shadow-xl">
          <h3 className="mb-4 text-2xl lg:text-3xl font-bold text-slate-900">Live Consultations</h3>
          <p className="text-lg text-slate-700 mb-6">
            Chat or call with certified astrologers for personalized readings.
          </p>
          <ul className="space-y-2 text-slate-600">
            <li>• Instant connection</li>
            <li>• Video/call/chat</li>
            <li>• 24/7 availability</li>
          </ul>
        </div>

        <div className="bg-gradient-to-br from-blue-50 to-sky-50 rounded-3xl p-8 lg:p-12 shadow-xl">
          <h3 className="mb-4 text-2xl lg:text-3xl font-bold text-slate-900">Free Calculators</h3>
          <p className="text-lg text-slate-700 mb-6">
            Accurate calculations powered by traditional algorithms.
          </p>
          <ul className="space-y-2 text-slate-600">
            <li>• Kundli generator</li>
            <li>• Match making</li>
            <li>• Numerology charts</li>
          </ul>
        </div>

        <div className="bg-gradient-to-br from-emerald-50 to-green-50 rounded-3xl p-8 lg:p-12 shadow-xl">
          <h3 className="mb-4 text-2xl lg:text-3xl font-bold text-slate-900">Learning Academy</h3>
          <p className="text-lg text-slate-700 mb-6">
            Master astrology through structured courses.
          </p>
          <ul className="space-y-2 text-slate-600">
            <li>• Beginner to advanced</li>
            <li>• Certified courses</li>
            <li>• Lifetime access</li>
          </ul>
        </div>
      </section>
    </main>
  );
};

export default Services;
