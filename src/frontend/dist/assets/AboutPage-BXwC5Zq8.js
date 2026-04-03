import { c as createLucideIcon, o as useGetStationInformation, j as jsxRuntimeExports, H as Heart } from "./index-CQfh0D_0.js";
import { C as Card } from "./card-cUM_Zaul.js";
import { R as Radio } from "./radio-CK6FBXg6.js";
import { M as Music } from "./music-DJkBxxQy.js";
import { U as Users } from "./users-NQgzXeN9.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "M12 16v-4", key: "1dtifu" }],
  ["path", { d: "M12 8h.01", key: "e9boi3" }]
];
const Info = createLucideIcon("info", __iconNode);
function AboutPage() {
  const { data: stationInfo, isLoading: stationInfoLoading } = useGetStationInformation();
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container mx-auto px-4 py-12", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-4xl mx-auto", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mb-12", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "img",
        {
          src: "/assets/generated/christmas-channel-logo-transparent.dim_200x200.png",
          alt: "The Christmas Channel",
          className: "h-24 w-24 mx-auto mb-6"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-4xl md:text-5xl font-bold text-christmas-dark mb-4 font-christmas", children: "About The Christmas Channel" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xl text-gray-600", children: "Spreading holiday cheer through music since 2025" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "bg-white/95 backdrop-blur-sm border-christmas-gold border-2 shadow-xl mb-8", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-8", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "prose prose-lg max-w-none", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-gray-700 leading-relaxed mb-4", children: [
        "Welcome to",
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-christmas-red", children: "The Christmas Channel" }),
        ", your premier destination for non-stop holiday music! We're dedicated to bringing you the best Christmas classics, modern holiday hits, and festive favorites 24 hours a day, 7 days a week."
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-700 leading-relaxed mb-4", children: "Whether you're decorating the tree, wrapping presents, or just getting into the holiday spirit, we're here to provide the perfect soundtrack to your season. From timeless carols to contemporary Christmas pop, our carefully curated playlist has something for everyone." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-700 leading-relaxed", children: "Our passionate team of DJs and music enthusiasts work around the clock to ensure you have the best listening experience possible. We love hearing from our listeners, so don't hesitate to send us your song requests and holiday greetings!" })
    ] }) }) }),
    stationInfo && /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "bg-white/95 backdrop-blur-sm border-christmas-green border-2 shadow-xl mb-8", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-4 mb-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-12 w-12 rounded-full bg-christmas-green flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Info, { className: "h-6 w-6 text-white" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-bold text-christmas-dark mb-2 font-christmas", children: stationInfo.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-600 italic mb-4", children: stationInfo.description })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "prose prose-lg max-w-none", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-gray-700 leading-relaxed whitespace-pre-wrap", children: stationInfo.content }) })
    ] }) }),
    stationInfoLoading && /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "bg-white/95 backdrop-blur-sm border-christmas-green border-2 shadow-xl mb-8", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-8 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "animate-spin h-8 w-8 border-4 border-christmas-green border-t-transparent rounded-full mx-auto mb-4" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-600", children: "Loading station information..." })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid md:grid-cols-2 gap-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "bg-white/95 backdrop-blur-sm border-christmas-red border-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-12 w-12 rounded-full bg-christmas-red flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Radio, { className: "h-6 w-6 text-white" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xl font-bold text-christmas-dark mb-2 font-christmas", children: "24/7 Broadcasting" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-600", children: "Non-stop holiday music streaming all day, every day throughout the season." })
        ] })
      ] }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "bg-white/95 backdrop-blur-sm border-christmas-green border-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-12 w-12 rounded-full bg-christmas-green flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Music, { className: "h-6 w-6 text-white" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xl font-bold text-christmas-dark mb-2 font-christmas", children: "Curated Playlists" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-600", children: "Expertly selected songs ranging from classic carols to modern holiday hits." })
        ] })
      ] }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "bg-white/95 backdrop-blur-sm border-christmas-gold border-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-12 w-12 rounded-full bg-christmas-gold flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "h-6 w-6 text-christmas-red" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xl font-bold text-christmas-dark mb-2 font-christmas", children: "Expert DJs" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-600", children: "Our talented team of DJs brings personality and warmth to every broadcast." })
        ] })
      ] }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "bg-white/95 backdrop-blur-sm border-christmas-red border-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-12 w-12 rounded-full bg-christmas-red flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Heart, { className: "h-6 w-6 text-white" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xl font-bold text-christmas-dark mb-2 font-christmas", children: "Community Focused" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-600", children: "We love our listeners! Send requests and connect with fellow holiday music fans." })
        ] })
      ] }) }) })
    ] })
  ] }) });
}
export {
  AboutPage as default
};
