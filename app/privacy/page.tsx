import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy - The Plug Dude',
  description: 'Learn how we collect, use, and protect your information.',
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen py-16 px-6 sm:px-8 lg:px-12">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-5xl font-bold mb-4">Privacy Policy</h1>
          <p className="text-white/60">Last updated: 12/8/2025</p>
        </div>

        {/* Introduction */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-4">Introduction</h2>
          <p className="text-white/80 leading-relaxed">
            The Plug Dude ("we," "our," or "us") is committed to protecting your privacy. 
            This Privacy Policy explains how we collect, use, disclose, and safeguard your 
            information when you visit our website.
          </p>
        </section>

        {/* Information We Collect */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-4">Information We Collect</h2>
          <p className="text-white/80 mb-4">We may collect the following types of information:</p>
          <ul className="list-disc list-inside space-y-2 text-white/80 ml-4">
            <li>Personal information you provide (name, email) when submitting tools or contacting us</li>
            <li>Usage data (pages visited, time spent, device information)</li>
            <li>Cookies and tracking technologies for analytics</li>
            <li>Favorites and preferences stored in your browser's local storage</li>
          </ul>
        </section>

        {/* How We Use Your Information */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-4">How We Use Your Information</h2>
          <p className="text-white/80 mb-4">We use the information we collect to:</p>
          <ul className="list-disc list-inside space-y-2 text-white/80 ml-4">
            <li>Provide and maintain our service</li>
            <li>Improve and personalize your experience</li>
            <li>Respond to your inquiries and support requests</li>
            <li>Send you newsletters (if you opt in)</li>
            <li>Analyze usage patterns and optimize our website</li>
          </ul>
        </section>

        {/* Analytics and Tracking */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-4">Analytics and Tracking</h2>
          <p className="text-white/80 leading-relaxed">
            We gather analytics data to better understand how users interact with our site. 
            This helps us improve functionality, performance, and user experience. The data 
            collected includes device information, pages visited, time spent, and usage patterns. 
            We ensure this data is handled securely and in accordance with privacy laws.
          </p>
        </section>

        {/* Data Storage */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-4">Data Storage</h2>
          <p className="text-white/80 leading-relaxed">
            Your favorites and preferences are stored locally in your browser using localStorage. 
            This data never leaves your device unless you explicitly submit it to us. We do not 
            track or store this information on our servers.
          </p>
        </section>

        {/* Third-Party Services */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-4">Third-Party Services</h2>
          <p className="text-white/80 leading-relaxed">
            We may use third-party services for analytics and advertising. These services may 
            collect information about your device and usage patterns. Please review their privacy 
            policies for more information.
          </p>
        </section>

        {/* Your Rights */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-4">Your Rights</h2>
          <p className="text-white/80 mb-4">You have the right to:</p>
          <ul className="list-disc list-inside space-y-2 text-white/80 ml-4">
            <li>Access the personal information we hold about you</li>
            <li>Request correction of inaccurate information</li>
            <li>Request deletion of your personal information</li>
            <li>Opt out of marketing communications</li>
            <li>Disable cookies through your browser settings</li>
          </ul>
        </section>

        {/* Contact Us */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-4">Contact Us</h2>
          <p className="text-white/80 leading-relaxed">
            If you have questions about this Privacy Policy, please contact us through our{' '}
            <a href="/contact" className="underline hover:text-white transition-colors">
              contact page
            </a>.
          </p>
        </section>
      </div>
    </div>
  );
}
