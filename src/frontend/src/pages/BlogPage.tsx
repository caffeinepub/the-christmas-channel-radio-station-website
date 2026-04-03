import { Card } from "@/components/ui/card";
import { useGetBlogPosts } from "../hooks/useQueries";

export default function BlogPage() {
  const { data: posts = [], isLoading } = useGetBlogPosts();

  const formatDate = (timestamp: bigint) => {
    return new Date(Number(timestamp) / 1_000_000).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-10 text-center">
        <h1 className="text-5xl font-bold text-christmas-dark font-christmas mb-3">
          🎄 Station Blog
        </h1>
        <p className="text-gray-600 text-lg">
          News, stories, and updates from The Christmas Channel
        </p>
      </div>

      {isLoading ? (
        <div className="text-center py-16 text-gray-500 text-lg">
          Loading posts...
        </div>
      ) : posts.length === 0 ? (
        <Card className="bg-white/95 border-christmas-gold border-2 shadow p-16 text-center">
          <p className="text-gray-500 text-xl">
            No posts yet — check back soon! 🎅
          </p>
        </Card>
      ) : (
        <div className="max-w-3xl mx-auto space-y-8">
          {posts.map((post) => (
            <Card
              key={post.id}
              className="bg-white/95 backdrop-blur-sm border-christmas-red border-2 shadow-xl overflow-hidden"
            >
              {/* Red top accent */}
              <div className="h-2 bg-gradient-to-r from-christmas-red via-christmas-gold to-christmas-green" />
              <div className="p-8">
                <h2 className="text-3xl font-bold text-christmas-dark font-christmas mb-2">
                  {post.title}
                </h2>
                <p className="text-sm text-gray-500 mb-6">
                  {post.author && (
                    <span>
                      By <strong>{post.author}</strong> &middot;{" "}
                    </span>
                  )}
                  {formatDate(post.createdAt)}
                </p>
                <div className="text-gray-700 whitespace-pre-wrap leading-relaxed text-base">
                  {post.content}
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
