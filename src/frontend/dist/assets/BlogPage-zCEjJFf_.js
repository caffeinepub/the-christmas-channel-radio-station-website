import { p as useGetBlogPosts, j as jsxRuntimeExports } from "./index-CQfh0D_0.js";
import { C as Card } from "./card-cUM_Zaul.js";
function BlogPage() {
  const { data: posts = [], isLoading } = useGetBlogPosts();
  const formatDate = (timestamp) => {
    return new Date(Number(timestamp) / 1e6).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric"
    });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 py-12", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-10 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-5xl font-bold text-christmas-dark font-christmas mb-3", children: "🎄 Station Blog" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-600 text-lg", children: "News, stories, and updates from The Christmas Channel" })
    ] }),
    isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center py-16 text-gray-500 text-lg", children: "Loading posts..." }) : posts.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "bg-white/95 border-christmas-gold border-2 shadow p-16 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-500 text-xl", children: "No posts yet — check back soon! 🎅" }) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-3xl mx-auto space-y-8", children: posts.map((post) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Card,
      {
        className: "bg-white/95 backdrop-blur-sm border-christmas-red border-2 shadow-xl overflow-hidden",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-2 bg-gradient-to-r from-christmas-red via-christmas-gold to-christmas-green" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-8", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-3xl font-bold text-christmas-dark font-christmas mb-2", children: post.title }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-gray-500 mb-6", children: [
              post.author && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                "By ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: post.author }),
                " ·",
                " "
              ] }),
              formatDate(post.createdAt)
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-gray-700 whitespace-pre-wrap leading-relaxed text-base", children: post.content })
          ] })
        ]
      },
      post.id
    )) })
  ] });
}
export {
  BlogPage as default
};
