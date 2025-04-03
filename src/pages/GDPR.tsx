
import { Header } from "@/components/common/Header";
import { Footer } from "@/components/common/Footer";
import { Separator } from "@/components/ui/separator";

const GDPR = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 py-12 px-4">
        <div className="container mx-auto max-w-3xl">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">GDPR Compliance</h1>
            <p className="text-muted-foreground">
              Last updated: April 3, 2025
            </p>
          </div>

          <Separator className="my-6" />
          
          <div className="space-y-6 prose prose-gray max-w-none">
            <section>
              <h2 className="text-2xl font-semibold">GDPR Overview</h2>
              <p>
                The General Data Protection Regulation (GDPR) is a regulation in EU law on data protection and privacy 
                for all individuals within the European Union and the European Economic Area. At MalpinoH Link, we are 
                committed to ensuring that our practices comply with GDPR requirements.
              </p>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold">1. Data Controller and Contact Information</h2>
              <p>
                MalpinoH Link acts as a data controller for the personal data we collect. If you have any questions about 
                our data practices or your rights, please contact our Data Protection Officer at:
              </p>
              <p className="ml-6 mt-2">
                Email: gdpr@malpinohdistro.com<br />
                Address: 123 Music Avenue, Suite 456, Los Angeles, CA 90001
              </p>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold">2. Your GDPR Rights</h2>
              <p>
                Under the GDPR, if you are an EU resident, you have the following rights:
              </p>
              <ul className="list-disc ml-6 mt-2">
                <li><strong>Right to Access</strong> - You have the right to request copies of your personal data.</li>
                <li><strong>Right to Rectification</strong> - You have the right to request that we correct any information you believe is inaccurate or complete information you believe is incomplete.</li>
                <li><strong>Right to Erasure</strong> - You have the right to request that we erase your personal data, under certain conditions.</li>
                <li><strong>Right to Restrict Processing</strong> - You have the right to request that we restrict the processing of your personal data, under certain conditions.</li>
                <li><strong>Right to Object to Processing</strong> - You have the right to object to our processing of your personal data, under certain conditions.</li>
                <li><strong>Right to Data Portability</strong> - You have the right to request that we transfer the data we have collected to another organization, or directly to you, under certain conditions.</li>
              </ul>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold">3. How to Exercise Your Rights</h2>
              <p>
                You can exercise your GDPR rights by:
              </p>
              <ul className="list-disc ml-6 mt-2">
                <li>Emailing our Data Protection Officer at gdpr@malpinohdistro.com</li>
                <li>Using the privacy controls in your account settings</li>
                <li>Submitting a request through our contact form</li>
              </ul>
              <p>
                We will respond to all legitimate requests within one month. Occasionally, it may take longer if your request 
                is particularly complex or you have made several requests.
              </p>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold">4. Legal Basis for Processing</h2>
              <p>
                We process your personal data under the following legal bases:
              </p>
              <ul className="list-disc ml-6 mt-2">
                <li><strong>Consent</strong> - You have given clear consent for us to process your personal data for a specific purpose.</li>
                <li><strong>Contract</strong> - The processing is necessary for a contract we have with you.</li>
                <li><strong>Legitimate Interests</strong> - The processing is necessary for our legitimate interests or the legitimate interests of a third party.</li>
                <li><strong>Legal Obligation</strong> - The processing is necessary for us to comply with the law.</li>
              </ul>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold">5. Data Retention</h2>
              <p>
                We will only retain your personal data for as long as necessary to fulfill the purposes we collected it for, 
                including for the purposes of satisfying any legal, accounting, or reporting requirements.
              </p>
              <p className="mt-2">
                To determine the appropriate retention period for personal data, we consider the amount, nature, and sensitivity 
                of the personal data, the potential risk of harm from unauthorized use or disclosure, the purposes for which we 
                process your personal data, and applicable legal requirements.
              </p>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold">6. Data Transfers</h2>
              <p>
                We may transfer your personal data to countries outside the European Economic Area (EEA). When we do, 
                we ensure a similar degree of protection is afforded to it by ensuring at least one of the following 
                safeguards is implemented:
              </p>
              <ul className="list-disc ml-6 mt-2">
                <li>EU-approved standard contractual clauses</li>
                <li>Privacy Shield certification (for transfers to the US)</li>
                <li>Binding corporate rules</li>
              </ul>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold">7. Updates to This Policy</h2>
              <p>
                We may update our GDPR Compliance policy from time to time. We will notify you of any changes by posting 
                the new policy on this page and updating the "Last updated" date.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default GDPR;
