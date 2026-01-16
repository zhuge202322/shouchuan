import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import { ArrowLeft, Calendar, User } from "lucide-react";

interface Post {
  id: number;
  title: { rendered: string };
  content: { rendered: string };
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

async function getPost(slug: string): Promise<Post | null> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}wp-json/wp/v2/posts?slug=${slug}&_embed`,
      { next: { revalidate: 3600 } }
    );

    if (!res.ok) {
      return null;
    }

    const posts = await res.json();
    return posts.length > 0 ? posts[0] : null;
  } catch (error) {
    console.error("Error fetching post:", error);
    return null;
  }
}

// Helper to decode HTML entities (simple version for title)
const decodeHtml = (html: string) => {
  return html.replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&#038;/g, "&").replace(/&#8217;/g, "'");
};

export default async function GuideDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    return (
      <div className="min-h-screen bg-[#020202] flex justify-center text-[#e5e5e0]">
        <div className="w-full max-w-[1400px] bg-[#0f0f11] min-h-screen flex flex-col">
          <Navbar />
          <div className="flex-1 flex items-center justify-center">
            <h1 className="text-2xl font-serif">Guide Not Found</h1>
          </div>
        </div>
      </div>
    );
  }

  const imageUrl = post._embedded?.["wp:featuredmedia"]?.[0]?.source_url;
  const authorName = post._embedded?.author?.[0]?.name || "Prana Heals";
  const date = new Date(post.date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });

  return (
    <div className="min-h-screen bg-[#020202] flex justify-center relative overflow-x-hidden font-sans text-[#e5e5e0]">
      {/* Main Website Container - Boxed Width */}
      <div className="w-full max-w-[1400px] bg-[#0f0f11] relative shadow-[0_0_50px_rgba(0,0,0,0.5)] flex flex-col min-h-screen">
        <Navbar />
        
        <main className="pt-32 pb-20 container mx-auto px-4 md:px-8 max-w-4xl">
          
          <div className="mb-8">
            <Link href="/guide" className="text-stone-500 hover:text-[#d4af37] text-sm flex items-center gap-2 transition w-fit">
              <ArrowLeft className="w-4 h-4" /> Back to Guide
            </Link>
          </div>

          <article>
            {/* Header */}
            <header className="mb-12 text-center">
              <div className="flex items-center justify-center gap-4 text-xs text-[#d4af37] mb-6 uppercase tracking-wider">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {date}
                </span>
                <span className="w-1 h-1 rounded-full bg-stone-700"></span>
                <span className="flex items-center gap-1">
                  <User className="w-3 h-3" />
                  {authorName}
                </span>
              </div>
              <h1 className="text-3xl md:text-5xl font-serif text-[#f0e6d2] leading-tight mb-8">
                {decodeHtml(post.title.rendered)}
              </h1>
              {imageUrl && (
                <div className="relative aspect-[21/9] w-full overflow-hidden rounded-sm border border-stone-800">
                  <Image 
                    src={imageUrl} 
                    alt={decodeHtml(post.title.rendered)} 
                    fill 
                    className="object-cover"
                    priority
                  />
                </div>
              )}
            </header>

            {/* Content */}
            <div 
              className="prose prose-invert prose-stone max-w-none 
                prose-headings:font-serif prose-headings:text-[#f0e6d2] 
                prose-a:text-[#d4af37] prose-a:no-underline hover:prose-a:underline
                prose-strong:text-white
                prose-img:rounded-sm prose-img:border prose-img:border-stone-800"
              dangerouslySetInnerHTML={{ __html: post.content.rendered }}
            />
          </article>

        </main>
      </div>
    </div>
  );
}
