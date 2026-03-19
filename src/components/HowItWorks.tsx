const HowItWorks = () => {
  const steps = [
    {
      number: "1",
      title: "Choose your path",
      description: "Select whether you need a nominee director or want to apply as one."
    },
    {
      number: "2",
      title: "Submit required details",
      description: "Complete KYC and onboarding information through our guided process."
    },
    {
      number: "3",
      title: "Activate and proceed",
      description: "Get approved and move forward with compliant UK director support."
    }
  ];

  return (
    <section id="how-it-works" className="scroll-mt-24 bg-background py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-2xl border border-slate-800 bg-slate-950 px-6 py-10 shadow-2xl sm:px-10 sm:py-14 lg:px-16 lg:py-16">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_0%,rgba(14,165,233,0.14),transparent_45%),radial-gradient(circle_at_85%_20%,rgba(59,130,246,0.10),transparent_40%)]" />

          <div className="relative z-10">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">HOW IT WORKS</p>
            <h2 className="mt-4 max-w-3xl text-3xl font-semibold leading-tight text-slate-100 sm:text-4xl lg:text-5xl">
              Get started in 3 clear steps with UK nominee director support.
            </h2>

            <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-3">
              {steps.map((step) => (
                <article
                  key={step.number}
                  className="rounded-2xl border border-slate-800/80 bg-slate-900/80 p-6 shadow-lg shadow-black/20 backdrop-blur"
                >
                  <p className="bg-gradient-to-b from-slate-200 to-slate-600 bg-clip-text text-6xl font-semibold leading-none text-transparent">
                    {step.number}
                  </p>
                  <h3 className="mt-5 text-2xl font-medium text-slate-100">{step.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-slate-400">{step.description}</p>
                </article>
              ))}
            </div>

            <p className="mt-8 text-sm text-slate-400">
              Fully compliant process for business owners and professionals.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
