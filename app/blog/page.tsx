import Link from 'next/link';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { blogPosts } from '../data/blogs';

function BlogCard({ post }: { post: typeof blogPosts[0] }) {
  return (
    <Link href={`/blog/${post.slug}`} className="group block bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      <div className="relative">
        <div className="flex items-center justify-center h-48 bg-gradient-to-br from-pink-50 to-purple-50 rounded-t-lg">
          <span className="text-6xl group-hover:scale-110 transition-transform duration-300 ease-in-out">
            {post.image}
          </span>
        </div>
      </div>
      <div className="p-6">
        <div className="mb-2">
          {post.tags.map(tag => (
            <span key={tag} className="inline-block bg-purple-100 text-purple-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded-full">
              {tag}
            </span>
          ))}
        </div>
        <h2 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-pink-600 transition-colors">{post.title}</h2>
        <p className="text-gray-600 text-sm mb-4">{post.excerpt}</p>
        <div className="text-xs text-gray-500">
          <span>{post.author}</span> &middot; <span>{new Date(post.date).toLocaleDateString('vi-VN')}</span>
        </div>
      </div>
    </Link>
  );
}


export default function BlogPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="py-12 pt-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold text-gray-900 mb-4">Góc Bếp DinhDinh</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Nơi chia sẻ những câu chuyện, mẹo vặt và kiến thức thú vị về thế giới bánh ngọt.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map(post => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
} 