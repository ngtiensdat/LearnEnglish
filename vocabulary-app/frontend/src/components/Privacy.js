function Privacy() {
  return (
    <div className="min-h-screen bg-blue-900 text-white">
      <section className="text-center py-20 px-4">
        <h1 className="text-6xl font-bold mb-4 text-blue-300">Privacy & Data Protection</h1>
        <p className="text-xl mb-12 max-w-3xl mx-auto">
          We're committed to responsible technology that puts learner and educator privacy first.
        </p>
      </section>

      <section className="py-16 px-4 bg-blue-800">
        <div className="max-w-4xl mx-auto space-y-8">
          <div>
            <h3 className="text-2xl font-bold mb-4">Enterprise-Grade Security</h3>
            <ul className="space-y-2">
              <li>• End-to-end encryption for all learning data</li>
              <li>• GDPR and CCPA compliant</li>
              <li>• Regular security audits</li>
            </ul>
          </div>
          <div>
            <h3 className="text-2xl font-bold mb-4">Data Ownership</h3>
            <ul className="space-y-2">
              <li>• You own your data – no sharing without consent</li>
              <li>• Signed agreements for schools and businesses</li>
              <li>• Easy export and deletion options</li>
            </ul>
          </div>
          <div>
            <h3 className="text-2xl font-bold mb-4">AI Privacy Focus</h3>
            <ul className="space-y-2">
              <li>• Anonymized feedback in AI tools</li>
              <li>• No tracking outside your sessions</li>
              <li>• Transparent data usage policies</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 text-center">
        <button className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-lg text-lg">
          Download Policy PDF
        </button>
      </section>
    </div>
  );
}

export default Privacy;