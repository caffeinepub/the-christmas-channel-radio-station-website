import { c as createLucideIcon, r as reactExports, l as useSubmitSongRequest, j as jsxRuntimeExports, m as Label, I as Input, B as Button, n as ue } from "./index-CQfh0D_0.js";
import { C as Card } from "./card-cUM_Zaul.js";
import { T as Textarea } from "./textarea-qSgVAgr-.js";
import { R as Radio } from "./radio-CK6FBXg6.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    {
      d: "M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z",
      key: "1ffxy3"
    }
  ],
  ["path", { d: "m21.854 2.147-10.94 10.939", key: "12cjpa" }]
];
const Send = createLucideIcon("send", __iconNode);
function RequestsPage() {
  const [name, setName] = reactExports.useState("");
  const [songTitle, setSongTitle] = reactExports.useState("");
  const [message, setMessage] = reactExports.useState("");
  const submitRequest = useSubmitSongRequest();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await submitRequest.mutateAsync({
        name,
        songTitle,
        message
      });
      ue.success("Request submitted!", {
        description: `Thanks ${name}! We'll try to play "${songTitle}" for you soon.`
      });
      setName("");
      setSongTitle("");
      setMessage("");
    } catch (_e) {
      ue.error("Failed to submit request", {
        description: "Please try again later."
      });
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container mx-auto px-4 py-12", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-2xl mx-auto", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mb-12", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "inline-flex items-center justify-center w-20 h-20 rounded-full bg-christmas-gold mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Radio, { className: "h-10 w-10 text-christmas-red" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-4xl md:text-5xl font-bold text-christmas-dark mb-4 font-christmas", children: "Song Requests" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xl text-gray-600", children: "Share your favorite holiday tune with us!" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "bg-white/95 backdrop-blur-sm border-christmas-gold border-2 shadow-xl", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-8", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "space-y-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Label,
          {
            htmlFor: "name",
            className: "text-christmas-dark font-medium",
            children: "Your Name *"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            id: "name",
            type: "text",
            value: name,
            onChange: (e) => setName(e.target.value),
            placeholder: "Enter your name",
            required: true,
            className: "mt-2 border-christmas-gold/30 focus:border-christmas-gold"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Label,
          {
            htmlFor: "song",
            className: "text-christmas-dark font-medium",
            children: "Song Request *"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            id: "song",
            type: "text",
            value: songTitle,
            onChange: (e) => setSongTitle(e.target.value),
            placeholder: "e.g., White Christmas by Bing Crosby",
            required: true,
            className: "mt-2 border-christmas-gold/30 focus:border-christmas-gold"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Label,
          {
            htmlFor: "message",
            className: "text-christmas-dark font-medium",
            children: "Message (Optional)"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Textarea,
          {
            id: "message",
            value: message,
            onChange: (e) => setMessage(e.target.value),
            placeholder: "Add a special message or dedication...",
            rows: 4,
            className: "mt-2 border-christmas-gold/30 focus:border-christmas-gold"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          type: "submit",
          disabled: submitRequest.isPending,
          className: "w-full bg-christmas-red hover:bg-christmas-red-dark text-white font-bold py-6 text-lg",
          children: submitRequest.isPending ? "Submitting..." : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Send, { className: "mr-2 h-5 w-5" }),
            "Submit Request"
          ] })
        }
      )
    ] }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "mt-8 bg-christmas-gold/10 backdrop-blur-sm border-christmas-gold border-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg font-bold text-christmas-dark mb-2 font-christmas", children: "📻 Request Guidelines" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "space-y-2 text-gray-700", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "• We play Christmas and holiday music only" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "• Requests are played in the order received" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "• Please allow time for your song to be queued" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "• Keep messages family-friendly" })
      ] })
    ] }) })
  ] }) });
}
export {
  RequestsPage as default
};
