import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Eye, EyeOff, PenLine, Plus, Save, Trash2, X } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import type { BlogPost } from "../../backend";
import ProtectedRoute from "../../components/ProtectedRoute";
import { useActor } from "../../hooks/useActor";
import {
  useCreateBlogPost,
  useDeleteBlogPost,
  useGetAllBlogPosts,
  usePublishBlogPost,
  useUnpublishBlogPost,
  useUpdateBlogPost,
} from "../../hooks/useQueries";

type FormState = {
  title: string;
  content: string;
  author: string;
};

export default function ManageBlogPosts() {
  const { actor, isFetching: actorLoading } = useActor();
  const { data: posts = [], isLoading } = useGetAllBlogPosts();
  const createPost = useCreateBlogPost();
  const updatePost = useUpdateBlogPost();
  const deletePost = useDeleteBlogPost();
  const publishPost = usePublishBlogPost();
  const unpublishPost = useUnpublishBlogPost();

  const [showForm, setShowForm] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [form, setForm] = useState<FormState>({
    title: "",
    content: "",
    author: "",
  });

  const openCreateForm = () => {
    setEditingPost(null);
    setForm({ title: "", content: "", author: "" });
    setShowForm(true);
  };

  const openEditForm = (post: BlogPost) => {
    setEditingPost(post);
    setForm({ title: post.title, content: post.content, author: post.author });
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
    setEditingPost(null);
    setForm({ title: "", content: "", author: "" });
  };

  const extractErrorMessage = (err: unknown): string => {
    if (!err) return "An unknown error occurred";
    const raw = String((err as any)?.message || err);
    // Extract IC trap message
    const trapMatch = raw.match(/Canister [\w-]+ trapped explicitly:\s*(.+)/);
    if (trapMatch) return trapMatch[1].trim();
    const withMessageMatch = raw.match(/with message:\s*'([^']+)'/s);
    if (withMessageMatch) return withMessageMatch[1].trim();
    return raw;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title.trim()) {
      toast.error("Title is required");
      return;
    }
    if (!actor) {
      toast.error("Not connected to backend. Please refresh and try again.");
      return;
    }
    try {
      if (editingPost) {
        await updatePost.mutateAsync({ id: editingPost.id, ...form });
        toast.success("Post updated!");
      } else {
        await createPost.mutateAsync(form);
        toast.success("Post created as draft!");
      }
      closeForm();
    } catch (err: unknown) {
      const msg = extractErrorMessage(err);
      toast.error(msg || "Failed to save post");
      console.error("Blog post save error:", err);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this post? This cannot be undone.")) return;
    try {
      await deletePost.mutateAsync(id);
      toast.success("Post deleted");
    } catch (err: unknown) {
      toast.error(extractErrorMessage(err) || "Failed to delete post");
    }
  };

  const handleTogglePublish = async (post: BlogPost) => {
    try {
      if (post.published) {
        await unpublishPost.mutateAsync(post.id);
        toast.success("Post unpublished");
      } else {
        await publishPost.mutateAsync(post.id);
        toast.success("Post published!");
      }
    } catch (err: unknown) {
      toast.error(
        extractErrorMessage(err) || "Failed to update publish status",
      );
    }
  };

  const formatDate = (timestamp: bigint) => {
    return new Date(Number(timestamp) / 1_000_000).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const isSaving = createPost.isPending || updatePost.isPending;

  return (
    <ProtectedRoute>
      <div className="container mx-auto px-4 py-12">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-christmas-dark mb-1 font-christmas">
              Blog Posts
            </h1>
            <p className="text-gray-600">
              Create and manage your station's blog
            </p>
          </div>
          <Button
            onClick={openCreateForm}
            className="bg-christmas-red hover:bg-christmas-red/80 text-white"
            disabled={actorLoading}
          >
            <Plus className="h-4 w-4 mr-2" />
            New Post
          </Button>
        </div>

        {/* Post Form */}
        {showForm && (
          <Card className="bg-white/95 backdrop-blur-sm border-christmas-gold border-2 shadow-xl mb-8 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-christmas-dark font-christmas">
                {editingPost ? "Edit Post" : "New Post"}
              </h2>
              <Button variant="ghost" size="icon" onClick={closeForm}>
                <X className="h-5 w-5" />
              </Button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="blog-title"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Title *
                </label>
                <Input
                  id="blog-title"
                  value={form.title}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, title: e.target.value }))
                  }
                  placeholder="Post title"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="blog-author"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Author
                </label>
                <Input
                  id="blog-author"
                  value={form.author}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, author: e.target.value }))
                  }
                  placeholder="Author name"
                />
              </div>
              <div>
                <label
                  htmlFor="blog-content"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Content
                </label>
                <Textarea
                  id="blog-content"
                  value={form.content}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, content: e.target.value }))
                  }
                  placeholder="Write your post content here..."
                  rows={10}
                  className="resize-y"
                />
              </div>
              <div className="flex gap-3 justify-end">
                <Button
                  type="button"
                  variant="outline"
                  onClick={closeForm}
                  disabled={isSaving}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={isSaving || actorLoading}
                  className="bg-christmas-green hover:bg-christmas-green/80 text-white min-w-[130px]"
                >
                  {isSaving ? (
                    <span className="flex items-center gap-2">
                      <span className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Saving...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <Save className="h-4 w-4" />
                      {editingPost ? "Save Changes" : "Create Draft"}
                    </span>
                  )}
                </Button>
              </div>
            </form>
          </Card>
        )}

        {/* Post List */}
        {isLoading ? (
          <div className="text-center py-12 text-gray-500">
            Loading posts...
          </div>
        ) : posts.length === 0 ? (
          <Card className="bg-white/95 border-christmas-gold border-2 shadow p-12 text-center">
            <PenLine className="h-12 w-12 text-christmas-red mx-auto mb-4 opacity-50" />
            <p className="text-gray-500 text-lg">
              No blog posts yet. Create your first post!
            </p>
          </Card>
        ) : (
          <div className="space-y-4">
            {posts.map((post) => (
              <Card
                key={post.id}
                className="bg-white/95 backdrop-blur-sm border-christmas-red border-2 shadow-md p-5"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-1 flex-wrap">
                      <h3 className="text-xl font-bold text-christmas-dark font-christmas truncate">
                        {post.title}
                      </h3>
                      <Badge
                        className={
                          post.published
                            ? "bg-christmas-green text-white border-0"
                            : "bg-gray-200 text-gray-600 border-0"
                        }
                      >
                        {post.published ? "Published" : "Draft"}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-500 mb-2">
                      {post.author && <span>By {post.author} &middot; </span>}
                      {formatDate(post.createdAt)}
                    </p>
                    <p className="text-gray-600 text-sm line-clamp-2">
                      {post.content || (
                        <em className="text-gray-400">No content</em>
                      )}
                    </p>
                  </div>
                  <div className="flex gap-2 flex-shrink-0">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleTogglePublish(post)}
                      disabled={
                        publishPost.isPending || unpublishPost.isPending
                      }
                      title={post.published ? "Unpublish" : "Publish"}
                      className={
                        post.published
                          ? "border-christmas-green text-christmas-green hover:bg-christmas-green/10"
                          : "border-christmas-gold text-christmas-gold hover:bg-christmas-gold/10"
                      }
                    >
                      {post.published ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => openEditForm(post)}
                      className="border-christmas-red text-christmas-red hover:bg-christmas-red/10"
                      title="Edit"
                    >
                      <PenLine className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleDelete(post.id)}
                      disabled={deletePost.isPending}
                      className="border-red-500 text-red-500 hover:bg-red-50"
                      title="Delete"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </ProtectedRoute>
  );
}
