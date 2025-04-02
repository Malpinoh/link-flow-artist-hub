
import { Header } from "@/components/common/Header";
import { Footer } from "@/components/common/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { FileText, Play, Download, BookOpen, Music, ExternalLink } from "lucide-react";

const Resources = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 py-12 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold mb-4">Music Promotion Resources</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Everything you need to promote your music effectively across all platforms.
              Use these resources to maximize your reach and grow your audience.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardContent className="pt-6">
                <div className="mb-4 h-12 w-12 rounded-full music-gradient flex items-center justify-center">
                  <FileText className="h-6 w-6 text-white" />
                </div>
                <h2 className="text-xl font-semibold mb-2">Promotion Guide</h2>
                <p className="text-muted-foreground mb-4">
                  Learn how to promote your music effectively across all streaming platforms.
                </p>
                <Button asChild variant="outline" className="w-full">
                  <a href="#" target="_blank" rel="noopener noreferrer">
                    Download Guide
                    <Download className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="mb-4 h-12 w-12 rounded-full music-gradient flex items-center justify-center">
                  <Play className="h-6 w-6 text-white" />
                </div>
                <h2 className="text-xl font-semibold mb-2">Tutorial Videos</h2>
                <p className="text-muted-foreground mb-4">
                  Watch step-by-step tutorials on creating effective music promotion campaigns.
                </p>
                <Button asChild variant="outline" className="w-full">
                  <a href="#" target="_blank" rel="noopener noreferrer">
                    Watch Tutorials
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="mb-4 h-12 w-12 rounded-full music-gradient flex items-center justify-center">
                  <BookOpen className="h-6 w-6 text-white" />
                </div>
                <h2 className="text-xl font-semibold mb-2">Best Practices</h2>
                <p className="text-muted-foreground mb-4">
                  Industry-tested best practices for promoting your music and growing your fan base.
                </p>
                <Button asChild variant="outline" className="w-full">
                  <a href="#" target="_blank" rel="noopener noreferrer">
                    Read More
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="mb-4 h-12 w-12 rounded-full music-gradient flex items-center justify-center">
                  <Music className="h-6 w-6 text-white" />
                </div>
                <h2 className="text-xl font-semibold mb-2">Music Distribution</h2>
                <p className="text-muted-foreground mb-4">
                  Compare different distribution platforms and choose the best one for your needs.
                </p>
                <Button asChild variant="outline" className="w-full">
                  <a href="#" target="_blank" rel="noopener noreferrer">
                    Compare Options
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="mb-4 h-12 w-12 rounded-full music-gradient flex items-center justify-center">
                  <FileText className="h-6 w-6 text-white" />
                </div>
                <h2 className="text-xl font-semibold mb-2">Press Kit Templates</h2>
                <p className="text-muted-foreground mb-4">
                  Download ready-to-use press kit templates to present your music professionally.
                </p>
                <Button asChild variant="outline" className="w-full">
                  <a href="#" target="_blank" rel="noopener noreferrer">
                    Download Templates
                    <Download className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="mb-4 h-12 w-12 rounded-full music-gradient flex items-center justify-center">
                  <FileText className="h-6 w-6 text-white" />
                </div>
                <h2 className="text-xl font-semibold mb-2">Contact Directory</h2>
                <p className="text-muted-foreground mb-4">
                  Access our directory of music bloggers, playlist curators, and music journalists.
                </p>
                <Button asChild className="w-full">
                  <Link to="/dashboard">
                    Create Account to Access
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Resources;
