function SchoolPlans() {
  const plans = [
    {
      name: 'Basic School Plan',
      price: '$99/month',
      features: ['Access to all Beginner & Intermediate courses', 'Up to 50 students', 'Basic AI personalization', 'Weekly progress reports'],
      cta: 'Choose Basic'
    },
    {
      name: 'Premium District Plan',
      price: '$499/month',
      features: ['Full access to all courses including IELTS Prep', 'Unlimited students', 'Advanced AI differentiation', 'Custom analytics & integration'],
      cta: 'Choose Premium'
    },
    {
      name: 'Enterprise Plan',
      price: 'Custom',
      features: ['All features + dedicated support', 'School-wide LMS integration', 'Teacher training sessions', 'Priority updates'],
      cta: 'Contact Sales'
    }
  ];

  return (
    <div className="min-h-screen bg-blue-900 text-white">
      <section className="text-center py-20 px-4">
        <h1 className="text-6xl font-bold mb-4 text-blue-300">School & District Plans</h1>
        <p className="text-xl mb-12 max-w-3xl mx-auto">
          Tailored plans to bring Learn English to your entire school or district, with AI-supported tools for scalable English learning.
        </p>
      </section>

      <section className="py-16 px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan, index) => (
            <div key={index} className="bg-blue-800 p-6 rounded-lg shadow-lg text-center">
              <h3 className="text-2xl font-bold mb-4">{plan.name}</h3>
              <p className="text-3xl font-bold mb-6">{plan.price}</p>
              <ul className="space-y-2 mb-6 text-left">
                {plan.features.map((feature, i) => (
                  <li key={i} className="text-sm">• {feature}</li>
                ))}
              </ul>
              <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded w-full">
                {plan.cta}
              </button>
            </div>
          ))}
        </div>
      </section>

      <section className="py-16 px-4 bg-blue-800 text-center">
        <h3 className="text-3xl font-bold mb-8">Ready to Scale English Learning?</h3>
        <button className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-lg text-lg">
          Schedule a Demo
        </button>
      </section>
    </div>
  );
}

export default SchoolPlans;