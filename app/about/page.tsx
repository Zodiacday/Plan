import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About - The Plug Dude',
  description: 'Learn about our mission to help you discover the best free tools on the internet.',
};

export default function AboutPage() {
  return (
    <div className="min-h-screen py-16 px-6 sm:px-8 lg:px-12">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-16">
          <h1 className="text-5xl font-bold mb-6">About ThePlugDude</h1>
          <p className="text-xl text-white/80 leading-relaxed">
            We're on a mission to help you discover the best free tools on the internet, 
            saving you time and money while boosting your productivity.
          </p>
        </div>

        {/* Our Story */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6">Our Story</h2>
          <div className="space-y-4 text-white/80 leading-relaxed">
            <p>
              Our founder, known by the alias "Asterius," was always tech curious. As a young 
              explorer of the internet, he searched tirelessly for free tools to edit videos, 
              create music, code, and much more. Over time, he realized these free tools were 
              scattered across countless sites, many of which were scammy and riddled with 
              malware and viruses.
            </p>
            <p>
              Frustrated by this chaotic landscape, he decided to create ThePlugDude — a single, 
              safe, and easy-to-navigate site that brings all the best free tools together in 
              one place.
            </p>
            <p className="text-xl font-semibold text-white">
              Thus, the Plug Dude was born.
            </p>
          </div>
        </section>

        {/* Our Mission */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
          <p className="text-white/80 leading-relaxed">
            In a world overflowing with software tools, finding the right one can be overwhelming. 
            ThePlugDude cuts through the noise by curating only the best, most useful tools that 
            are accessible to everyone. We believe powerful tools shouldn't break the bank, and 
            we're here to prove that the best things in life (and on the internet) really can be free.
          </p>
        </section>

        {/* What Makes Us Different */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8">What Makes Us Different</h2>
          <div className="grid gap-8 md:grid-cols-2">
            <div className="border border-white/10 p-6">
              <h3 className="text-xl font-bold mb-3">Quality Over Quantity</h3>
              <p className="text-white/80">
                Every tool is personally tested and reviewed. We're selective, so you don't have to be.
              </p>
            </div>
            <div className="border border-white/10 p-6">
              <h3 className="text-xl font-bold mb-3">Truly Free Focus</h3>
              <p className="text-white/80">
                We prioritize tools with generous free tiers. No hidden costs, no bait-and-switch.
              </p>
            </div>
            <div className="border border-white/10 p-6">
              <h3 className="text-xl font-bold mb-3">Community Driven</h3>
              <p className="text-white/80">
                Built by tool enthusiasts, for tool enthusiasts. We value your submissions and feedback.
              </p>
            </div>
            <div className="border border-white/10 p-6">
              <h3 className="text-xl font-bold mb-3">Always Current</h3>
              <p className="text-white/80">
                We continuously update our directory, removing dead tools and adding fresh discoveries.
              </p>
            </div>
          </div>
        </section>

        {/* Our Curation Process */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8">Our Curation Process</h2>
          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-white text-black flex items-center justify-center font-bold">
                1
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Discovery</h3>
                <p className="text-white/80">
                  We actively search for tools and review community submissions.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-white text-black flex items-center justify-center font-bold">
                2
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Testing</h3>
                <p className="text-white/80">
                  Each tool is personally tested for functionality, usability, and value.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-white text-black flex items-center justify-center font-bold">
                3
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Review</h3>
                <p className="text-white/80">
                  We evaluate pros, cons, and overall quality to ensure it meets our standards.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-white text-black flex items-center justify-center font-bold">
                4
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Publication</h3>
                <p className="text-white/80">
                  Only the best tools make it to our directory, complete with detailed information.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Our Values */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8">Our Values</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-bold mb-2">Transparency</h3>
              <p className="text-white/80">
                We clearly mark free vs paid tools and have no hidden affiliate agendas.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2">Accessibility</h3>
              <p className="text-white/80">
                Great tools should be available to everyone, regardless of budget.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2">Efficiency</h3>
              <p className="text-white/80">
                Your time is valuable. We make discovery quick and decisions easy.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2">Community</h3>
              <p className="text-white/80">
                We're building this together. Your contributions make ThePlugDude better for everyone.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
