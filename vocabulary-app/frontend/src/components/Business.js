function Business() {
  const offerings = [
    {
      title: 'Corporate English Training',
      description: 'Tailored courses for business communication and professional skills.',
      features: ['Email writing & presentations', 'Negotiation simulations', 'Team collaboration tools']
    },
    {
      title: 'Employee Onboarding',
      description: 'Quick-start programs for non-native speakers in global teams.',
      features: ['Cultural insights', 'AI feedback on reports', 'Progress tracking for HR']
    },
    {
      title: 'Custom Workshops',
      description: 'In-house sessions with our experts for your industry needs.',
      features: ['Virtual or in-person', 'Certification upon completion', 'ROI analytics']
    }
  ];

  return (
    <div className="min-h-screen bg-blue-900 text-white">
      <section className="text-center py-20 px-4">
        <h1 className="text-6xl font-bold mb-4 text-blue-300">For Business</h1>
        <p className="text-xl mb-12 max-w-3xl mx-auto">
          Empower your team with English proficiency using AI-supported, business-focused learning solutions.
        </p>
      </section>

      <section className="py-16 px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {offerings.map((offering, index) => (
            <div key={index} className="bg-blue-800 p-6 rounded-lg shadow-lg">
              <h3 className="text-2xl font-bold mb-4">{offering.title}</h3>
              <p className="mb-4">{offering.description}</p>
              <ul className="space-y-2 mb-6">
                {offering.features.map((feature, i) => (
                  <li key={i} className="text-sm">• {feature}</li>
                ))}
              </ul>
              <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded">
                Get Started
              </button>
            </div>
          ))}
        </div>
      </section>

      <section className="py-16 px-4 bg-blue-800 text-center">
        <h3 className="text-3xl font-bold mb-8">Boost Your Team's Global Edge</h3>
        <button className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-lg text-lg">
          Request a Quote
        </button>
      </section>
    </div>
  );
}

export default Business;