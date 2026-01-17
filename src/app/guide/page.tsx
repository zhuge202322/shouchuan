import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Calendar, User, ArrowRight, BookOpen } from "lucide-react";

interface Post {
  id: number;
  title: { rendered: string };
  excerpt: { rendered: string };
  date: string;
  slug: string;
  _embedded?: {
    "wp:featuredmedia"?: Array<{
      source_url: string;
      alt_text: string;
    }>;
    author?: Array<{
      name: string;
    }>;
  };
}

async function getPosts(): Promise<Post[]> {
  try {
    const wpUrl = process.env.NEXT_PUBLIC_WORDPRESS_API_URL || "http://43.165.68.39/";
    const res = await fetch(
      `${wpUrl}wp-json/wp/v2/posts?_embed&per_page=9`,
      { next: { revalidate: 3600 } }
    );

    if (!res.ok) {
      return [];
    }

    return res.json();
  } catch (error) {
    console.error("Error fetching posts:", error);
    return [];
  }
}

export default async function GuidePage() {
  const posts = await getPosts();

  // Helper to format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Helper to decode HTML entities
  const decodeHtml = (html: string) => {
    return html.replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&#038;/g, "&").replace(/&#8217;/g, "'").replace(/&hellip;/g, "...");
  };

  return (
    <div className="min-h-screen bg-[#020202] flex justify-center relative overflow-x-hidden font-sans text-[#e5e5e0]">
      {/* Main Website Container - Boxed Width */}
      <div className="w-full max-w-[1400px] bg-[#0f0f11] relative shadow-[0_0_50px_rgba(0,0,0,0.5)] flex flex-col min-h-screen">
        <Navbar />
        
        <main className="pt-32 pb-20 container mx-auto px-4 md:px-8">
          
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-serif text-[#f0e6d2] mb-4">Spiritual Guide</h1>
            <div className="w-24 h-1 bg-[#d4af37] mx-auto mb-6"></div>
            <p className="text-stone-400 max-w-2xl mx-auto font-light leading-relaxed">
              Explore the ancient wisdom of crystals, Taoist geomancy, and the art of energy purification.
            </p>
          </div>

          {/* Posts Grid */}
          {posts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => {
                const imageUrl = post._embedded?.["wp:featuredmedia"]?.[0]?.source_url || "/img/1.png";
                const authorName = post._embedded?.author?.[0]?.name || "Prana Heals";

                return (
                  <Link href={`/guide/${post.slug}`} key={post.id} className="group bg-[#151517] border border-stone-800 hover:border-[#d4af37]/30 transition duration-500 flex flex-col h-full">
                    {/* Image */}
                    <div className="relative aspect-[16/9] w-full overflow-hidden bg-[#1c1c1c]">
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition z-10"></div>
                      <Image
                        src={imageUrl}
                        alt={decodeHtml(post.title.rendered)}
                        fill
                        className="object-cover group-hover:scale-105 transition duration-700"
                      />
                    </div>

                    {/* Content */}
                    <div className="p-6 flex flex-col flex-1">
                      <div className="flex items-center gap-4 text-xs text-[#d4af37] mb-3 uppercase tracking-wider">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {formatDate(post.date)}
                        </span>
                        <span className="w-1 h-1 rounded-full bg-stone-700"></span>
                        <span className="flex items-center gap-1">
                          <User className="w-3 h-3" />
                          {authorName}
                        </span>
                      </div>

                      <h2 className="text-xl font-serif text-[#f0e6d2] mb-3 leading-tight group-hover:text-[#d4af37] transition">
                        {decodeHtml(post.title.rendered)}
                      </h2>

                      <div 
                        className="text-stone-500 text-sm leading-relaxed mb-6 line-clamp-3 flex-1"
                        dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
                      />

                      <div className="mt-auto pt-4 border-t border-stone-800 flex items-center justify-between text-xs font-medium uppercase tracking-widest text-stone-400 group-hover:text-[#f0e6d2] transition">
                        <span>Read Article</span>
                        <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition" />
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-32 text-stone-500">
              <BookOpen className="w-16 h-16 mb-4 text-stone-700" />
              <p className="font-serif text-lg">No guides available at the moment.</p>
            </div>
          )}

        </main>
        
        <Footer />
      </div>
    </div>
  );
}
