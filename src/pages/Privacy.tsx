
import { Header } from "@/components/common/Header";
import { Footer } from "@/components/common/Footer";
import { Separator } from "@/components/ui/separator";

const Privacy = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 py-12 px-4">
        <div className="container mx-auto max-w-3xl">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Privacy Policy</h1>
            <p className="text-muted-foreground">
              Last updated: April 3, 2025
            </p>
          </div>

          <Separator className="my-6" />
          
          <div className="space-y-6 prose prose-gray max-w-none">
            <section>
              <h2 className="text-2xl font-semibold">1. Introduction</h2>
              <p>
                At MalpinoH Link, we respect your privacy and are committed to protecting your personal data. 
                This Privacy Policy explains how we collect, use, disclose, and safeguard your information when 
                you use our music link sharing service.
              </p>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold">2. Information We Collect</h2>
              <p>
                We collect information that you voluntarily provide when creating an account, 
                setting up your artist profile, or creating music links:
              </p>
              <ul className="list-disc ml-6 mt-2">
                <li>Account information: email, password, name</li>
                <li>Profile information: artist name, profile picture</li>
                <li>Content you create: music links, streaming service links, cover art</li>
                <li>Usage data: how you interact with our service, pages viewed, features used</li>
                <li>Device information: IP address, browser type, operating system</li>
              </ul>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold">3. How We Use Your Information</h2>
              <p>
                We use the collected information for various purposes, including:
              </p>
              <ul className="list-disc ml-6 mt-2">
                <li>Providing and maintaining our service</li>
                <li>Improving and personalizing your experience</li>
                <li>Analyzing usage patterns and metrics</li>
                <li>Communicating with you about service updates</li>
                <li>Providing customer support</li>
                <li>Preventing fraudulent or unauthorized activity</li>
              </ul>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold">4. Information Sharing</h2>
              <p>
                We may share your information with:
              </p>
              <ul className="list-disc ml-6 mt-2">
                <li>Service providers who perform services on our behalf</li>
                <li>Analytics providers who help us understand service usage</li>
                <li>Law enforcement when required by law</li>
                <li>Third parties in connection with a business transaction</li>
              </ul>
              <p>
                We do not sell your personal information to third parties.
              </p>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold">5. Your Rights and Choices</h2>
              <p>
                Depending on your location, you may have certain rights regarding your personal information:
              </p>
              <ul className="list-disc ml-6 mt-2">
                <li>Access your personal data</li>
                <li>Correct inaccurate data</li>
                <li>Delete your data</li>
                <li>Object to processing of your data</li>
                <li>Data portability</li>
                <li>Withdraw consent</li>
              </ul>
              <p>
                You can exercise these rights by contacting us at privacy@malpinohdistro.com.
              </p>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold">6. Data Security</h2>
              <p>
                We implement appropriate technical and organizational measures to protect your personal information. 
                However, no method of transmission over the Internet or electronic storage is 100% secure.
              </p>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold">7. Changes to This Privacy Policy</h2>
              <p>
                We may update this Privacy Policy from time to time. We will notify you of any changes by posting 
                the new Privacy Policy on this page and updating the "Last updated" date.
              </p>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold">8. Contact Us</h2>
              <p>
                If you have any questions about this Privacy Policy, please contact us at:
              </p>
              <p className="mt-2">
                Email: privacy@malpinohdistro.com<br />
                Address: 123 Music Avenue, Suite 456, Los Angeles, CA 90001
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Privacy;
