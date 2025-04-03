
import { Header } from "@/components/common/Header";
import { Footer } from "@/components/common/Footer";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from "@/components/ui/accordion";
import { Search, LifeBuoy, FileText, MessageCircle, Mail } from "lucide-react";
import { useState } from "react";

const HelpCenter = () => {
  const [searchQuery, setSearchQuery] = useState("");
  
  const faqs = [
    {
      question: "What is MalpinoH Link?",
      answer: "MalpinoH Link is a platform that allows artists to create customizable landing pages for their music. These pages include links to your tracks across all major streaming platforms, making it easy for fans to find and play your music on their preferred service."
    },
    {
      question: "How do I create a new music link?",
      answer: "To create a new music link, log in to your account, click on 'Create New Link' in your dashboard, then add your track details, cover art, and streaming links. Customize the appearance, and click 'Save Link' to publish your new music link."
    },
    {
      question: "Can I customize the appearance of my link page?",
      answer: "Yes! You can customize the background color, text color, and button styles. You can also upload your own cover art to make your link page match your branding or album artwork."
    },
    {
      question: "How do I add streaming links?",
      answer: "When creating or editing a link, scroll to the 'Streaming Links' section and click 'Add Link'. Select the platform from the dropdown, paste your URL, and save. You can add as many streaming platforms as you need."
    },
    {
      question: "Can I edit a link after publishing it?",
      answer: "Yes, you can edit your links at any time. Go to your dashboard, find the link you want to edit, click the 'Edit' button, make your changes, and save."
    },
    {
      question: "How do I share my music link?",
      answer: "After creating a link, you can share it directly from your dashboard. Copy the link URL and share it on social media, in emails, or anywhere you connect with your audience. The link will direct fans to your customized landing page."
    },
    {
      question: "Is there a limit to how many links I can create?",
      answer: "The number of links you can create depends on your subscription plan. Free accounts have a limited number of links, while premium plans offer more capacity. Check your account settings for details on your current limits."
    },
    {
      question: "What streaming platforms are supported?",
      answer: "We support all major streaming platforms, including Spotify, Apple Music, SoundCloud, YouTube Music, Amazon Music, Deezer, TIDAL, Bandcamp, and more. If you need a platform that isn't listed, please contact our support team."
    }
  ];
  
  const filteredFaqs = searchQuery 
    ? faqs.filter(faq => 
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : faqs;

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 py-12 px-4">
        <div className="container mx-auto max-w-4xl">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">How can we help you?</h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Find answers to common questions and learn how to get the most out of your MalpinoH Link experience.
            </p>
            
            {/* Search Bar */}
            <div className="relative max-w-xl mx-auto mt-8">
              <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
              <Input 
                type="text" 
                placeholder="Search for answers..." 
                className="pl-10 h-12"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="p-6 border rounded-lg bg-card shadow-sm">
              <LifeBuoy className="h-8 w-8 mb-4 text-primary" />
              <h3 className="text-xl font-semibold mb-2">Getting Started</h3>
              <p className="text-muted-foreground mb-4">New to MalpinoH Link? Learn the basics and set up your first music link.</p>
              <Button variant="secondary" className="w-full">View Guides</Button>
            </div>
            
            <div className="p-6 border rounded-lg bg-card shadow-sm">
              <FileText className="h-8 w-8 mb-4 text-primary" />
              <h3 className="text-xl font-semibold mb-2">Documentation</h3>
              <p className="text-muted-foreground mb-4">Detailed guides and references for all features and settings.</p>
              <Button variant="secondary" className="w-full">View Docs</Button>
            </div>
            
            <div className="p-6 border rounded-lg bg-card shadow-sm">
              <MessageCircle className="h-8 w-8 mb-4 text-primary" />
              <h3 className="text-xl font-semibold mb-2">Support</h3>
              <p className="text-muted-foreground mb-4">Need personal assistance? Our support team is ready to help.</p>
              <Button variant="secondary" className="w-full">Contact Us</Button>
            </div>
          </div>

          <Separator className="my-8" />
          
          {/* FAQ Section */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold mb-6">Frequently Asked Questions</h2>
            
            {filteredFaqs.length > 0 ? (
              <Accordion type="single" collapsible className="w-full">
                {filteredFaqs.map((faq, index) => (
                  <AccordionItem value={`item-${index}`} key={index}>
                    <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                    <AccordionContent>
                      <p className="text-muted-foreground">{faq.answer}</p>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            ) : (
              <div className="text-center p-8 border rounded-lg bg-muted/20">
                <p className="text-muted-foreground">No results found for "{searchQuery}"</p>
                <Button variant="link" onClick={() => setSearchQuery("")}>Clear search</Button>
              </div>
            )}
          </div>
          
          {/* Contact Section */}
          <div className="bg-card border rounded-lg p-8 text-center mb-12">
            <Mail className="h-12 w-12 mx-auto mb-4 text-primary" />
            <h2 className="text-2xl font-bold mb-2">Still Need Help?</h2>
            <p className="text-muted-foreground mb-6">
              Can't find what you're looking for? Our team is here to assist you.
            </p>
            <Button>
              <Mail className="mr-2 h-4 w-4" />
              Contact Support
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default HelpCenter;
