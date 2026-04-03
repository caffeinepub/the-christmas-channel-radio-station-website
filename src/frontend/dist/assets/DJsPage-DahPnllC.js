import { k as useGetDJProfiles, j as jsxRuntimeExports } from "./index-CQfh0D_0.js";
import { C as Card } from "./card-cUM_Zaul.js";
import { S as Skeleton } from "./skeleton-P4_f8b3b.js";
import { U as Users } from "./users-NQgzXeN9.js";
function DJsPage() {
  const { data: djs, isLoading } = useGetDJProfiles();
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container mx-auto px-4 py-12", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-6xl mx-auto", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mb-12", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "inline-flex items-center justify-center w-20 h-20 rounded-full bg-christmas-green mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "h-10 w-10 text-white" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-4xl md:text-5xl font-bold text-christmas-dark mb-4 font-christmas", children: "Meet Our DJs" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xl text-gray-600", children: "The voices bringing you holiday cheer all season long" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid md:grid-cols-2 lg:grid-cols-3 gap-8", children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: [1, 2, 3].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      Card,
      {
        className: "bg-white/95 backdrop-blur-sm border-christmas-gold border-2",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "w-full aspect-square rounded-lg mb-4" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-6 w-32 mb-2" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-full mb-2" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-full" })
        ] })
      },
      i
    )) }) : djs && djs.length > 0 ? djs.map((dj) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      Card,
      {
        className: "bg-white/95 backdrop-blur-sm border-christmas-gold border-2 hover:shadow-xl transition-all hover:-translate-y-1",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative mb-4 rounded-lg overflow-hidden shadow-lg", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "img",
              {
                src: dj.photoUrl.getDirectURL(),
                alt: dj.name,
                className: "w-full aspect-square object-cover"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-christmas-dark/50 to-transparent" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-2xl font-bold text-christmas-dark mb-2 font-christmas", children: dj.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-600 leading-relaxed", children: dj.bio })
        ] })
      },
      dj.name
    )) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "col-span-full", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "bg-white/95 backdrop-blur-sm border-christmas-gold border-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-12 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "h-16 w-16 text-gray-400 mx-auto mb-4" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xl font-bold text-gray-600 mb-2", children: "No DJs Yet" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-500", children: "Our team is getting ready for the holiday season!" })
    ] }) }) }) })
  ] }) });
}
export {
  DJsPage as default
};
