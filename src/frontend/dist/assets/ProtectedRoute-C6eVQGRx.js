import { c as createLucideIcon, at as useInternetIdentity, au as useIsCallerAdmin, j as jsxRuntimeExports, B as Button, av as Shield } from "./index-CQfh0D_0.js";
import { C as Card } from "./card-cUM_Zaul.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["rect", { width: "18", height: "11", x: "3", y: "11", rx: "2", ry: "2", key: "1w4ew1" }],
  ["path", { d: "M7 11V7a5 5 0 0 1 10 0v4", key: "fwvmzm" }]
];
const Lock = createLucideIcon("lock", __iconNode);
function ProtectedRoute({ children }) {
  const { identity, login, loginStatus } = useInternetIdentity();
  const { data: isAdmin, isLoading: adminLoading } = useIsCallerAdmin();
  const isAuthenticated = !!identity;
  const isLoggingIn = loginStatus === "logging-in";
  if (!isAuthenticated) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container mx-auto px-4 py-16", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "max-w-md mx-auto bg-white/95 backdrop-blur-sm border-christmas-red border-2 shadow-xl", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-8 text-center space-y-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-20 w-20 rounded-full bg-christmas-red/10 mx-auto flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "h-10 w-10 text-christmas-red" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-bold text-christmas-dark mb-2 font-christmas", children: "Authentication Required" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-600", children: "Please log in to access the admin dashboard." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          onClick: login,
          disabled: isLoggingIn,
          className: "w-full bg-christmas-red hover:bg-christmas-red-dark text-white",
          children: isLoggingIn ? "Logging in..." : "Login with Internet Identity"
        }
      )
    ] }) }) });
  }
  if (adminLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container mx-auto px-4 py-16", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "max-w-md mx-auto bg-white/95 backdrop-blur-sm border-christmas-gold border-2 shadow-xl", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-8 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "animate-spin h-12 w-12 border-4 border-christmas-red border-t-transparent rounded-full mx-auto mb-4" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-600", children: "Checking permissions..." })
    ] }) }) });
  }
  if (!isAdmin) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container mx-auto px-4 py-16", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "max-w-md mx-auto bg-white/95 backdrop-blur-sm border-christmas-red border-2 shadow-xl", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-8 text-center space-y-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-20 w-20 rounded-full bg-christmas-red/10 mx-auto flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "h-10 w-10 text-christmas-red" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-bold text-christmas-dark mb-2 font-christmas", children: "Access Denied" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-600", children: "You don't have permission to access the admin dashboard." })
      ] })
    ] }) }) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children });
}
export {
  ProtectedRoute as P
};
