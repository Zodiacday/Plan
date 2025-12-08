import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact - The Plug Dude',
  description: 'Get in touch with us. We\'d love to hear from you!',
};

export default function ContactPage() {
  return (
    <div className="min-h-screen py-16 px-6 sm:px-8 lg:px-12">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-16">
          <h1 className="text-5xl font-bold mb-6">Get in Touch</h1>
          <p className="text-xl text-white/80 leading-relaxed">
            Have a question, suggestion, or want to submit a tool? We'd love to hear from you!
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div>
            <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-2">Email</h3>
                <a 
                  href="mailto:asteriuselos@gmail.com" 
                  className="text-white/80 hover:text-white transition-colors underline"
                >
                  asteriuselos@gmail.com
                </a>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">Response Time</h3>
                <p className="text-white/80">
                  We typically respond within 24-48 hours.
                </p>
              </div>
            </div>
          </div>

          {/* What You Can Contact Us About */}
          <div>
            <h2 className="text-2xl font-bold mb-6">What We Can Help With</h2>
            
            <div className="space-y-4">
              <div className="border border-white/10 p-4">
                <h3 className="font-semibold mb-2">📝 Submit a Tool</h3>
                <p className="text-white/80 text-sm">
                  Found an amazing free tool? Let us know so we can review and add it to our directory.
                </p>
              </div>

              <div className="border border-white/10 p-4">
                <h3 className="font-semibold mb-2">💡 Suggestions</h3>
                <p className="text-white/80 text-sm">
                  Have ideas for improving The Plug Dude? We're all ears!
                </p>
              </div>

              <div className="border border-white/10 p-4">
                <h3 className="font-semibold mb-2">🐛 Report Issues</h3>
                <p className="text-white/80 text-sm">
                  Found a broken link or outdated information? Let us know and we'll fix it.
                </p>
              </div>

              <div className="border border-white/10 p-4">
                <h3 className="font-semibold mb-2">🤝 Partnerships</h3>
                <p className="text-white/80 text-sm">
                  Interested in collaborating? Reach out to discuss opportunities.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Note */}
        <div className="mt-16 border border-white/10 p-8 text-center">
          <p className="text-white/80">
            <strong>Note:</strong> We're a small team dedicated to curating the best free tools. 
            While we review every submission, not all tools may be added to our directory. 
            We prioritize quality over quantity to maintain the value of our recommendations.
          </p>
        </div>
      </div>
    </div>
  );
}
