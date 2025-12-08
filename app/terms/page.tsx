import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service - The Plug Dude',
  description: 'Terms and conditions for using The Plug Dude.',
};

export default function TermsPage() {
  return (
    <div className="min-h-screen py-16 px-6 sm:px-8 lg:px-12">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-5xl font-bold mb-4">Terms of Service</h1>
          <p className="text-white/60">Last updated: 12/8/2025</p>
        </div>

        {/* Introduction */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-4">Introduction</h2>
          <p className="text-white/80 leading-relaxed">
            Welcome to The Plug Dude. By accessing or using our website, you agree to be bound 
            by these Terms of Service. If you do not agree with any part of these terms, please 
            do not use our service.
          </p>
        </section>

        {/* Use of Service */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-4">Use of Service</h2>
          <p className="text-white/80 mb-4">You agree to use The Plug Dude only for lawful purposes. You must not:</p>
          <ul className="list-disc list-inside space-y-2 text-white/80 ml-4">
            <li>Submit false, misleading, or malicious content</li>
            <li>Attempt to hack, disrupt, or damage the website</li>
            <li>Use automated tools to scrape or harvest data without permission</li>
            <li>Violate any applicable laws or regulations</li>
            <li>Infringe upon the intellectual property rights of others</li>
          </ul>
        </section>

        {/* Content Submissions */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-4">Content Submissions</h2>
          <p className="text-white/80 leading-relaxed mb-4">
            When you submit tools, reviews, or other content to The Plug Dude:
          </p>
          <ul className="list-disc list-inside space-y-2 text-white/80 ml-4">
            <li>You grant us a non-exclusive, worldwide license to use, display, and distribute your submission</li>
            <li>You confirm that you have the right to submit the content</li>
            <li>You understand that we may edit or remove submissions at our discretion</li>
            <li>You agree that submissions may be subject to review before publication</li>
          </ul>
        </section>

        {/* Disclaimer */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-4">Disclaimer</h2>
          <p className="text-white/80 leading-relaxed">
            The Plug Dude provides information about third-party tools and services. We make no 
            warranties or guarantees about the accuracy, reliability, or quality of these tools. 
            Use of any third-party tool is at your own risk. We are not responsible for any damages, 
            losses, or issues that may arise from using tools listed on our site.
          </p>
        </section>

        {/* Limitation of Liability */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-4">Limitation of Liability</h2>
          <p className="text-white/80 leading-relaxed">
            To the fullest extent permitted by law, The Plug Dude shall not be liable for any 
            indirect, incidental, special, consequential, or punitive damages resulting from your 
            use of or inability to use the service.
          </p>
        </section>

        {/* Intellectual Property */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-4">Intellectual Property</h2>
          <p className="text-white/80 leading-relaxed">
            All content on The Plug Dude, including text, graphics, logos, and software, is the 
            property of The Plug Dude or its content creators and is protected by copyright and 
            other intellectual property laws.
          </p>
        </section>

        {/* Changes to Terms */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-4">Changes to Terms</h2>
          <p className="text-white/80 leading-relaxed">
            We reserve the right to modify these Terms of Service at any time. Changes will be 
            effective immediately upon posting. Your continued use of the service after changes 
            are posted constitutes your acceptance of the modified terms.
          </p>
        </section>

        {/* Governing Law */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-4">Governing Law</h2>
          <p className="text-white/80 leading-relaxed">
            These Terms of Service shall be governed by and construed in accordance with applicable 
            laws, without regard to conflict of law provisions.
          </p>
        </section>

        {/* Contact Us */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-4">Contact Us</h2>
          <p className="text-white/80 leading-relaxed">
            If you have questions about these Terms of Service, please contact us through our{' '}
            <a href="/contact" className="underline hover:text-white transition-colors">
              contact page
            </a>.
          </p>
        </section>
      </div>
    </div>
  );
}
