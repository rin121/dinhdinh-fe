import { notFound } from 'next/navigation';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { blogPosts } from '../../data/blogs';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = blogPosts.find(p => p.slug === slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="py-12 pt-28">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <div className="mb-4">
              {post.tags.map(tag => (
                <span key={tag} className="inline-block bg-pink-100 text-pink-800 text-sm font-semibold mr-2 px-3 py-1 rounded-full">
                  {tag}
                </span>
              ))}
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">{post.title}</h1>
            <div className="text-gray-500 text-sm">
              <span>Đăng bởi <strong>{post.author}</strong></span> &middot; 
              <span>{new Date(post.date).toLocaleDateString('vi-VN', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
            </div>
          </div>
          
          <div className="flex justify-center my-8">
             <div className="w-full h-96 bg-gradient-to-br from-pink-50 to-purple-50 rounded-lg flex items-center justify-center">
                <span className="text-8xl">{post.image}</span>
             </div>
          </div>

          <article 
            className="prose lg:prose-xl max-w-none mx-auto text-gray-700"
            dangerouslySetInnerHTML={{ __html: post.content }}
          >
          </article>
        </div>
      </main>
      <Footer />
    </div>
  );
} 