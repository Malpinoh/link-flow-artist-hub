
import Head from 'next/head';

export default function Home() {
  return (
    <>
      <Head>
        <title>MALPINOHDISTRO FAN LINK</title>
        <meta name="description" content="Create smart links for your music" />
      </Head>
      
      <div className="min-h-screen bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">MALPINOHDISTRO FAN LINK</h1>
          <p className="text-lg text-gray-600 mb-8">Smart links for your music</p>
          <a
            href="https://malpinohdistro.com.ng"
            className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors"
          >
            Create Your Link
          </a>
        </div>
      </div>
    </>
  );
}
