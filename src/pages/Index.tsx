
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Header } from "@/components/common/Header";
import { Footer } from "@/components/common/Footer";
import { AuthForm } from "@/components/auth/AuthForm";
import { Music, ArrowRight, Laptop, Smartphone, Globe, Share2 } from "lucide-react";

const Index = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden py-20 lg:py-32">
          <div className="absolute inset-0 music-gradient opacity-20"></div>
          <div className="container px-4 md:px-6 relative z-10">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_500px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="inline-block">
                  <div className="inline-flex items-center rounded-full px-3 py-1 text-sm bg-muted">
                    <span className="text-primary">New!</span>
                    <span className="ml-1 text-muted-foreground">Pre-save links are here!</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    One Link For All Your Music
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    Share your music across all streaming platforms with a single beautiful link. 
                    Perfect for social media bios, promotions, and connecting with fans.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button size="lg" asChild>
                    <Link to="/dashboard">
                      Get Started
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                  <Button variant="outline" size="lg" asChild>
                    <a href="#how-it-works">
                      How It Works
                    </a>
                  </Button>
                </div>
              </div>
              <div className="mx-auto flex w-full max-w-sm items-center space-y-2 flex-col">
                <AuthForm />
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="bg-muted py-16 md:py-24" id="how-it-works">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">How It Works</h2>
              <p className="mx-auto mt-4 max-w-[700px] text-muted-foreground md:text-xl">
                Create and share music links in minutes with our simple workflow
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="flex flex-col items-center text-center">
                <div className="h-12 w-12 rounded-full music-gradient flex items-center justify-center mb-4">
                  <Music size={24} className="text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2">1. Create a Link</h3>
                <p className="text-muted-foreground">
                  Upload your cover art and add links to your music on all streaming platforms.
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="h-12 w-12 rounded-full music-gradient flex items-center justify-center mb-4">
                  <Laptop size={24} className="text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2">2. Customize Your Page</h3>
                <p className="text-muted-foreground">
                  Choose colors, backgrounds and customize the appearance to match your brand.
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="h-12 w-12 rounded-full music-gradient flex items-center justify-center mb-4">
                  <Share2 size={24} className="text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2">3. Share Everywhere</h3>
                <p className="text-muted-foreground">
                  Share your unique link URL on social media, newsletters, or anywhere you connect with fans.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="py-16 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_600px] lg:gap-12">
              <div className="flex items-center">
                <div className="space-y-4">
                  <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Why Musicians Love MALPINOHDISTRO LINK</h2>
                  <p className="text-muted-foreground md:text-xl">
                    MALPINOHDISTRO LINK is built specifically for independent artists and labels who need simple, effective music promotion tools.
                  </p>
                  <ul className="grid gap-6">
                    <li className="flex items-start">
                      <div className="mr-4 h-6 w-6 rounded-full music-gradient flex items-center justify-center">
                        <span className="text-white text-xs">✓</span>
                      </div>
                      <div className="space-y-1">
                        <h3 className="font-medium">Grow Your Audience</h3>
                        <p className="text-sm text-muted-foreground">
                          Let fans choose their preferred streaming platform to increase plays and saves.
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="mr-4 h-6 w-6 rounded-full music-gradient flex items-center justify-center">
                        <span className="text-white text-xs">✓</span>
                      </div>
                      <div className="space-y-1">
                        <h3 className="font-medium">Professional Appearance</h3>
                        <p className="text-sm text-muted-foreground">
                          Create beautiful, branded landing pages that represent your music and style.
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="mr-4 h-6 w-6 rounded-full music-gradient flex items-center justify-center">
                        <span className="text-white text-xs">✓</span>
                      </div>
                      <div className="space-y-1">
                        <h3 className="font-medium">Pre-Save Campaigns</h3>
                        <p className="text-sm text-muted-foreground">
                          Build anticipation for upcoming releases with pre-save links across platforms.
                        </p>
                      </div>
                    </li>
                  </ul>
                  <div>
                    <Button size="lg" asChild>
                      <Link to="/dashboard">
                        Start Creating Links
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
              <div className="relative mx-auto aspect-video overflow-hidden rounded-xl bg-muted lg:order-last">
                <img 
                  src="https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=1740&auto=format&fit=crop" 
                  alt="MALPINOHDISTRO LINK Example" 
                  className="object-cover w-full h-full"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent opacity-40" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="glass-card px-4 py-2 rounded-lg">
                    <p className="font-medium text-white">Your music deserves to be heard</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-24 music-gradient">
          <div className="container px-4 md:px-6 text-center">
            <div className="mx-auto max-w-3xl">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl text-white mb-4">
                Ready to Grow Your Music Audience?
              </h2>
              <p className="mx-auto max-w-[700px] text-lg text-white/80 mb-8">
                Join thousands of artists using MALPINOHDISTRO LINK to promote their music and connect with fans across all platforms.
              </p>
              <Button size="lg" variant="secondary" asChild>
                <Link to="/dashboard">
                  Create Your First Link
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
