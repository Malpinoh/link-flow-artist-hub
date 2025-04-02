
import { Header } from "@/components/common/Header";
import { Footer } from "@/components/common/Footer";
import { Separator } from "@/components/ui/separator";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const Legal = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 py-12 px-4">
        <div className="container mx-auto max-w-3xl">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Legal Information</h1>
            <p className="text-muted-foreground">
              Last updated: April 2, 2025
            </p>
          </div>

          <Separator className="my-6" />
          
          <div className="space-y-12">
            <section>
              <h2 className="text-2xl font-semibold mb-4">Terms of Service</h2>
              <div className="prose prose-gray max-w-none">
                <p className="text-muted-foreground">
                  By using the MALPINOHDISTRO LINK service, you agree to these terms. Please read them carefully.
                </p>
                
                <Accordion type="single" collapsible className="mt-6">
                  <AccordionItem value="service-usage">
                    <AccordionTrigger>1. Service Usage</AccordionTrigger>
                    <AccordionContent>
                      <p className="text-sm text-muted-foreground">
                        MALPINOHDISTRO LINK provides a platform for musicians to create and share music links. You may use our services only as permitted by law and these terms. We may suspend or stop providing our services to you if you do not comply with our terms or policies or if we are investigating suspected misconduct.
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="account-security">
                    <AccordionTrigger>2. Account Security</AccordionTrigger>
                    <AccordionContent>
                      <p className="text-sm text-muted-foreground">
                        You are responsible for safeguarding the password that you use to access the service and for any activities or actions under your password. We encourage you to use "strong" passwords (passwords that use a combination of upper and lowercase letters, numbers, and symbols) with your account.
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="content-responsibility">
                    <AccordionTrigger>3. Content Responsibility</AccordionTrigger>
                    <AccordionContent>
                      <p className="text-sm text-muted-foreground">
                        Our service allows you to post, link, store, share and otherwise make available certain information, text, graphics, videos, or other material. You are responsible for the content that you post to the service, including its legality, reliability, and appropriateness.
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="intellectual-property">
                    <AccordionTrigger>4. Intellectual Property</AccordionTrigger>
                    <AccordionContent>
                      <p className="text-sm text-muted-foreground">
                        The service and its original content, features, and functionality are and will remain the exclusive property of MALPINOHDISTRO LINK and its licensors. The service is protected by copyright, trademark, and other laws. Our trademarks and trade dress may not be used in connection with any product or service without the prior written consent.
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="termination">
                    <AccordionTrigger>5. Termination</AccordionTrigger>
                    <AccordionContent>
                      <p className="text-sm text-muted-foreground">
                        We may terminate or suspend your account and bar access to the service immediately, without prior notice or liability, under our sole discretion, for any reason whatsoever and without limitation, including but not limited to a breach of the Terms.
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            </section>
            
            <Separator />
            
            <section>
              <h2 className="text-2xl font-semibold mb-4">Privacy Policy</h2>
              <div className="prose prose-gray max-w-none">
                <p className="text-muted-foreground">
                  Your privacy is important to us. It is MALPINOHDISTRO LINK's policy to respect your privacy regarding any information we may collect from you.
                </p>
                
                <Accordion type="single" collapsible className="mt-6">
                  <AccordionItem value="data-collection">
                    <AccordionTrigger>1. Information We Collect</AccordionTrigger>
                    <AccordionContent>
                      <p className="text-sm text-muted-foreground">
                        We collect personal information that you voluntarily provide to us when you register on the website, express an interest in obtaining information about us or our products and services, or otherwise contact us. The personal information we collect may include names, email addresses, and other contact details.
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="data-usage">
                    <AccordionTrigger>2. How We Use Your Information</AccordionTrigger>
                    <AccordionContent>
                      <p className="text-sm text-muted-foreground">
                        We use the information we collect to provide, maintain, and improve our services, to develop new ones, and to protect our company and our users. We also use this information to offer you tailored content and to help us understand how users use our services.
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="data-sharing">
                    <AccordionTrigger>3. Information Sharing</AccordionTrigger>
                    <AccordionContent>
                      <p className="text-sm text-muted-foreground">
                        We do not share personal information with companies, organizations, or individuals outside of MALPINOHDISTRO LINK except in the following cases: with your consent, for legal reasons, or to protect rights, property, or safety.
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="data-security">
                    <AccordionTrigger>4. Security</AccordionTrigger>
                    <AccordionContent>
                      <p className="text-sm text-muted-foreground">
                        We work hard to protect our users from unauthorized access to or unauthorized alteration, disclosure, or destruction of information we hold. However, no method of transmission over the Internet, or method of electronic storage is 100% secure.
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="your-choices">
                    <AccordionTrigger>5. Your Choices</AccordionTrigger>
                    <AccordionContent>
                      <p className="text-sm text-muted-foreground">
                        You have the right to access, update, or delete your personal information at any time. You can also opt out of receiving marketing communications from us by following the unsubscribe instructions included in our emails.
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Legal;
