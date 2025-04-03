
import { Header } from "@/components/common/Header";
import { Footer } from "@/components/common/Footer";
import { Separator } from "@/components/ui/separator";

const Terms = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 py-12 px-4">
        <div className="container mx-auto max-w-3xl">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Terms of Service</h1>
            <p className="text-muted-foreground">
              Last updated: April 3, 2025
            </p>
          </div>

          <Separator className="my-6" />
          
          <div className="space-y-6 prose prose-gray max-w-none">
            <section>
              <h2 className="text-2xl font-semibold">1. Agreement to Terms</h2>
              <p>
                By accessing or using the MalpinoH Link service, you agree to be bound by these Terms of Service. 
                If you disagree with any part of the terms, you may not access the service.
              </p>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold">2. Description of Service</h2>
              <p>
                MalpinoH Link provides a platform for musicians and artists to create and share customizable 
                landing pages that connect their audience to their music across various streaming platforms.
              </p>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold">3. User Accounts</h2>
              <p>
                When you create an account with us, you must provide accurate, complete, and current information. 
                You are responsible for safeguarding your account, and you agree not to disclose your password 
                to any third party.
              </p>
              <p className="mt-2">
                You are solely responsible for any activities or actions that occur under your account. 
                You must immediately notify us of any unauthorized use of your account.
              </p>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold">4. User Content</h2>
              <p>
                Our service allows you to post, link, store, share and otherwise make available certain information, 
                text, graphics, videos, or other material ("Content"). You are responsible for the Content that you 
                post, including its legality, reliability, and appropriateness.
              </p>
              <p className="mt-2">
                By posting Content, you grant us the right to display, reproduce, modify, and distribute your Content 
                on and through the service. You retain any and all of your rights to any Content you submit, post or 
                display on or through the service.
              </p>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold">5. Acceptable Use</h2>
              <p>
                You agree not to use the service:
              </p>
              <ul className="list-disc ml-6 mt-2">
                <li>In any way that violates any applicable national or international law or regulation</li>
                <li>To transmit any material that is defamatory, obscene, or invasive of another's privacy</li>
                <li>To impersonate or attempt to impersonate the company, a company employee, another user, or any other person</li>
                <li>To engage in any conduct that restricts or inhibits anyone's use or enjoyment of the service</li>
                <li>To attempt to gain unauthorized access to the service, user accounts, or computer systems</li>
              </ul>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold">6. Intellectual Property</h2>
              <p>
                The service and its original content (excluding Content provided by users), features, and functionality 
                are and will remain the exclusive property of MalpinoH Link and its licensors. The service is protected 
                by copyright, trademark, and other laws.
              </p>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold">7. Termination</h2>
              <p>
                We may terminate or suspend your account immediately, without prior notice or liability, for any reason, 
                including without limitation if you breach the Terms. Upon termination, your right to use the service will 
                immediately cease.
              </p>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold">8. Limitation of Liability</h2>
              <p>
                In no event shall MalpinoH Link, nor its directors, employees, partners, agents, suppliers, or affiliates, 
                be liable for any indirect, incidental, special, consequential, or punitive damages, including loss of profits, 
                data, or other intangible losses, resulting from your access to or use of or inability to access or use the service.
              </p>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold">9. Changes to Terms</h2>
              <p>
                We reserve the right, at our sole discretion, to modify or replace these Terms at any time. 
                If a revision is material, we will try to provide at least 30 days' notice prior to any new terms taking effect.
              </p>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold">10. Contact Us</h2>
              <p>
                If you have any questions about these Terms, please contact us at:
              </p>
              <p className="mt-2">
                Email: terms@malpinohdistro.com<br />
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

export default Terms;
