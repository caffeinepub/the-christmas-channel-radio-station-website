import { c as createLucideIcon, ak as useActor, al as useGetAllBlogPosts, am as useCreateBlogPost, an as useUpdateBlogPost, ao as useDeleteBlogPost, ap as usePublishBlogPost, aq as useUnpublishBlogPost, r as reactExports, j as jsxRuntimeExports, B as Button, ai as X, I as Input, n as ue } from "./index-CQfh0D_0.js";
import { B as Badge } from "./badge-LDPc-HHZ.js";
import { C as Card } from "./card-cUM_Zaul.js";
import { T as Textarea } from "./textarea-qSgVAgr-.js";
import { P as ProtectedRoute } from "./ProtectedRoute-C6eVQGRx.js";
import { P as Plus } from "./plus-Fy-58l5W.js";
import { S as Save } from "./save-mPM-iRRI.js";
import { E as Eye } from "./eye-C7OMq__g.js";
import { T as Trash2 } from "./trash-2-B5shjlOQ.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  [
    "path",
    {
      d: "M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49",
      key: "ct8e1f"
    }
  ],
  ["path", { d: "M14.084 14.158a3 3 0 0 1-4.242-4.242", key: "151rxh" }],
  [
    "path",
    {
      d: "M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143",
      key: "13bj9a"
    }
  ],
  ["path", { d: "m2 2 20 20", key: "1ooewy" }]
];
const EyeOff = createLucideIcon("eye-off", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M12 20h9", key: "t2du7b" }],
  [
    "path",
    {
      d: "M16.376 3.622a1 1 0 0 1 3.002 3.002L7.368 18.635a2 2 0 0 1-.855.506l-2.872.838a.5.5 0 0 1-.62-.62l.838-2.872a2 2 0 0 1 .506-.854z",
      key: "1ykcvy"
    }
  ]
];
const PenLine = createLucideIcon("pen-line", __iconNode);
function ManageBlogPosts() {
  const { actor, isFetching: actorLoading } = useActor();
  const { data: posts = [], isLoading } = useGetAllBlogPosts();
  const createPost = useCreateBlogPost();
  const updatePost = useUpdateBlogPost();
  const deletePost = useDeleteBlogPost();
  const publishPost = usePublishBlogPost();
  const unpublishPost = useUnpublishBlogPost();
  const [showForm, setShowForm] = reactExports.useState(false);
  const [editingPost, setEditingPost] = reactExports.useState(null);
  const [form, setForm] = reactExports.useState({
    title: "",
    content: "",
    author: ""
  });
  const openCreateForm = () => {
    setEditingPost(null);
    setForm({ title: "", content: "", author: "" });
    setShowForm(true);
  };
  const openEditForm = (post) => {
    setEditingPost(post);
    setForm({ title: post.title, content: post.content, author: post.author });
    setShowForm(true);
  };
  const closeForm = () => {
    setShowForm(false);
    setEditingPost(null);
    setForm({ title: "", content: "", author: "" });
  };
  const extractErrorMessage = (err) => {
    if (!err) return "An unknown error occurred";
    const raw = String((err == null ? void 0 : err.message) || err);
    const trapMatch = raw.match(/Canister [\w-]+ trapped explicitly:\s*(.+)/);
    if (trapMatch) return trapMatch[1].trim();
    const withMessageMatch = raw.match(/with message:\s*'([^']+)'/s);
    if (withMessageMatch) return withMessageMatch[1].trim();
    return raw;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title.trim()) {
      ue.error("Title is required");
      return;
    }
    if (!actor) {
      ue.error("Not connected to backend. Please refresh and try again.");
      return;
    }
    try {
      if (editingPost) {
        await updatePost.mutateAsync({ id: editingPost.id, ...form });
        ue.success("Post updated!");
      } else {
        await createPost.mutateAsync(form);
        ue.success("Post created as draft!");
      }
      closeForm();
    } catch (err) {
      const msg = extractErrorMessage(err);
      ue.error(msg || "Failed to save post");
      console.error("Blog post save error:", err);
    }
  };
  const handleDelete = async (id) => {
    if (!confirm("Delete this post? This cannot be undone.")) return;
    try {
      await deletePost.mutateAsync(id);
      ue.success("Post deleted");
    } catch (err) {
      ue.error(extractErrorMessage(err) || "Failed to delete post");
    }
  };
  const handleTogglePublish = async (post) => {
    try {
      if (post.published) {
        await unpublishPost.mutateAsync(post.id);
        ue.success("Post unpublished");
      } else {
        await publishPost.mutateAsync(post.id);
        ue.success("Post published!");
      }
    } catch (err) {
      ue.error(
        extractErrorMessage(err) || "Failed to update publish status"
      );
    }
  };
  const formatDate = (timestamp) => {
    return new Date(Number(timestamp) / 1e6).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric"
    });
  };
  const isSaving = createPost.isPending || updatePost.isPending;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(ProtectedRoute, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 py-12", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-8 flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-4xl font-bold text-christmas-dark mb-1 font-christmas", children: "Blog Posts" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-600", children: "Create and manage your station's blog" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          onClick: openCreateForm,
          className: "bg-christmas-red hover:bg-christmas-red/80 text-white",
          disabled: actorLoading,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4 mr-2" }),
            "New Post"
          ]
        }
      )
    ] }),
    showForm && /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "bg-white/95 backdrop-blur-sm border-christmas-gold border-2 shadow-xl mb-8 p-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-bold text-christmas-dark font-christmas", children: editingPost ? "Edit Post" : "New Post" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", size: "icon", onClick: closeForm, children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-5 w-5" }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "label",
            {
              htmlFor: "blog-title",
              className: "block text-sm font-medium text-gray-700 mb-1",
              children: "Title *"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              id: "blog-title",
              value: form.title,
              onChange: (e) => setForm((f) => ({ ...f, title: e.target.value })),
              placeholder: "Post title",
              required: true
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "label",
            {
              htmlFor: "blog-author",
              className: "block text-sm font-medium text-gray-700 mb-1",
              children: "Author"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              id: "blog-author",
              value: form.author,
              onChange: (e) => setForm((f) => ({ ...f, author: e.target.value })),
              placeholder: "Author name"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "label",
            {
              htmlFor: "blog-content",
              className: "block text-sm font-medium text-gray-700 mb-1",
              children: "Content"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Textarea,
            {
              id: "blog-content",
              value: form.content,
              onChange: (e) => setForm((f) => ({ ...f, content: e.target.value })),
              placeholder: "Write your post content here...",
              rows: 10,
              className: "resize-y"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 justify-end", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              type: "button",
              variant: "outline",
              onClick: closeForm,
              disabled: isSaving,
              children: "Cancel"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              type: "submit",
              disabled: isSaving || actorLoading,
              className: "bg-christmas-green hover:bg-christmas-green/80 text-white min-w-[130px]",
              children: isSaving ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" }),
                "Saving..."
              ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Save, { className: "h-4 w-4" }),
                editingPost ? "Save Changes" : "Create Draft"
              ] })
            }
          )
        ] })
      ] })
    ] }),
    isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center py-12 text-gray-500", children: "Loading posts..." }) : posts.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "bg-white/95 border-christmas-gold border-2 shadow p-12 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(PenLine, { className: "h-12 w-12 text-christmas-red mx-auto mb-4 opacity-50" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-500 text-lg", children: "No blog posts yet. Create your first post!" })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: posts.map((post) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      Card,
      {
        className: "bg-white/95 backdrop-blur-sm border-christmas-red border-2 shadow-md p-5",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-1 flex-wrap", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xl font-bold text-christmas-dark font-christmas truncate", children: post.title }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Badge,
                {
                  className: post.published ? "bg-christmas-green text-white border-0" : "bg-gray-200 text-gray-600 border-0",
                  children: post.published ? "Published" : "Draft"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-gray-500 mb-2", children: [
              post.author && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                "By ",
                post.author,
                " · "
              ] }),
              formatDate(post.createdAt)
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-600 text-sm line-clamp-2", children: post.content || /* @__PURE__ */ jsxRuntimeExports.jsx("em", { className: "text-gray-400", children: "No content" }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 flex-shrink-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                size: "sm",
                variant: "outline",
                onClick: () => handleTogglePublish(post),
                disabled: publishPost.isPending || unpublishPost.isPending,
                title: post.published ? "Unpublish" : "Publish",
                className: post.published ? "border-christmas-green text-christmas-green hover:bg-christmas-green/10" : "border-christmas-gold text-christmas-gold hover:bg-christmas-gold/10",
                children: post.published ? /* @__PURE__ */ jsxRuntimeExports.jsx(EyeOff, { className: "h-4 w-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "h-4 w-4" })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                size: "sm",
                variant: "outline",
                onClick: () => openEditForm(post),
                className: "border-christmas-red text-christmas-red hover:bg-christmas-red/10",
                title: "Edit",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(PenLine, { className: "h-4 w-4" })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                size: "sm",
                variant: "outline",
                onClick: () => handleDelete(post.id),
                disabled: deletePost.isPending,
                className: "border-red-500 text-red-500 hover:bg-red-50",
                title: "Delete",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-4 w-4" })
              }
            )
          ] })
        ] })
      },
      post.id
    )) })
  ] }) });
}
export {
  ManageBlogPosts as default
};
