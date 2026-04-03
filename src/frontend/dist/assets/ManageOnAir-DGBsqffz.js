import { b as useGetOnAirOverride, ag as useSetOnAirOverride, ah as useClearOnAirOverride, r as reactExports, j as jsxRuntimeExports, B as Button, L as Link, m as Label, I as Input, ai as X, n as ue } from "./index-CQfh0D_0.js";
import { B as Badge } from "./badge-LDPc-HHZ.js";
import { C as Card } from "./card-cUM_Zaul.js";
import { T as Textarea } from "./textarea-qSgVAgr-.js";
import { P as ProtectedRoute } from "./ProtectedRoute-C6eVQGRx.js";
import { A as ArrowLeft } from "./arrow-left-Ce2zt5Zu.js";
import { R as Radio } from "./radio-CK6FBXg6.js";
import { S as Save } from "./save-mPM-iRRI.js";
function ManageOnAir() {
  const { data: currentOverride } = useGetOnAirOverride();
  const setOnAirOverride = useSetOnAirOverride();
  const clearOnAirOverride = useClearOnAirOverride();
  const [showName, setShowName] = reactExports.useState("");
  const [description, setDescription] = reactExports.useState("");
  const [durationHours, setDurationHours] = reactExports.useState("1");
  reactExports.useEffect(() => {
    if (currentOverride) {
      setShowName(currentOverride.overrideProgram);
      setDescription(currentOverride.description);
      const durationNs = Number(currentOverride.endTime) - Number(currentOverride.startTime);
      const durationHours2 = durationNs / (1e6 * 1e3 * 60 * 60);
      setDurationHours(durationHours2.toString());
    }
  }, [currentOverride]);
  const handleSave = async () => {
    if (!showName.trim()) {
      ue.error("Validation Error", {
        description: "Show name is required"
      });
      return;
    }
    if (!description.trim()) {
      ue.error("Validation Error", {
        description: "Description is required"
      });
      return;
    }
    const hours = Number.parseFloat(durationHours);
    if (Number.isNaN(hours) || hours <= 0) {
      ue.error("Validation Error", {
        description: "Duration must be a positive number"
      });
      return;
    }
    try {
      const now = Date.now();
      const startTime = BigInt(now * 1e6);
      const endTime = BigInt((now + hours * 60 * 60 * 1e3) * 1e6);
      const override = {
        overrideProgram: showName.trim(),
        description: description.trim(),
        startTime,
        endTime
      };
      await setOnAirOverride.mutateAsync(override);
      ue.success("On Air Override Saved!", {
        description: `"${showName}" will display for ${hours} hour(s)`
      });
    } catch (error) {
      ue.error("Save Failed", {
        description: error.message || "Failed to save On Air override"
      });
    }
  };
  const handleClear = async () => {
    try {
      await clearOnAirOverride.mutateAsync();
      setShowName("");
      setDescription("");
      setDurationHours("1");
      ue.success("Override Cleared", {
        description: "On Air display reverted to automatic schedule"
      });
    } catch (error) {
      ue.error("Clear Failed", {
        description: error.message || "Failed to clear On Air override"
      });
    }
  };
  const isActive = currentOverride && Number(currentOverride.endTime) > Date.now() * 1e6;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(ProtectedRoute, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 py-12", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, variant: "ghost", className: "mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/admin", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "mr-2 h-4 w-4" }),
        "Back to Dashboard"
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-4xl font-bold text-christmas-dark mb-2 font-christmas", children: "🎙️ On Air Display Editor" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-600", children: "Manually control what shows on the public On Air display" })
    ] }),
    isActive && /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "bg-gradient-to-r from-christmas-red/20 to-christmas-gold/20 border-christmas-gold border-2 shadow-xl mb-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-12 w-12 rounded-full bg-gradient-to-br from-christmas-red to-christmas-gold flex items-center justify-center shadow-lg animate-pulse", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Radio, { className: "h-6 w-6 text-white" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-2 mb-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-gradient-to-r from-christmas-red to-christmas-red-dark text-white font-bold", children: "🔴 OVERRIDE ACTIVE" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-gray-700", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("strong", { children: [
            '"',
            currentOverride.overrideProgram,
            '"'
          ] }),
          " is currently displaying on the homepage"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-gray-600 mt-1", children: [
          "Expires:",
          " ",
          new Date(
            Number(currentOverride.endTime) / 1e6
          ).toLocaleString()
        ] })
      ] })
    ] }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid lg:grid-cols-2 gap-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "bg-white/95 backdrop-blur-sm border-christmas-red border-2 shadow-xl", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-bold text-christmas-dark mb-6 font-christmas", children: "Override Settings" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Label,
              {
                htmlFor: "showName",
                className: "text-christmas-dark font-semibold",
                children: "Show Name *"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "showName",
                value: showName,
                onChange: (e) => setShowName(e.target.value),
                placeholder: "e.g., Special Holiday Broadcast",
                className: "mt-2 border-christmas-red/30 focus:border-christmas-red"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Label,
              {
                htmlFor: "description",
                className: "text-christmas-dark font-semibold",
                children: "Description *"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Textarea,
              {
                id: "description",
                value: description,
                onChange: (e) => setDescription(e.target.value),
                placeholder: "Describe what's happening on this special broadcast...",
                rows: 4,
                className: "mt-2 border-christmas-red/30 focus:border-christmas-red"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Label,
              {
                htmlFor: "duration",
                className: "text-christmas-dark font-semibold",
                children: "Duration (hours) *"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "duration",
                type: "number",
                min: "0.5",
                step: "0.5",
                value: durationHours,
                onChange: (e) => setDurationHours(e.target.value),
                placeholder: "1",
                className: "mt-2 border-christmas-red/30 focus:border-christmas-red"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-gray-500 mt-1", children: "How long should this override last?" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-4 pt-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                onClick: handleSave,
                disabled: setOnAirOverride.isPending,
                className: "flex-1 bg-gradient-to-r from-christmas-gold to-christmas-red hover:from-christmas-gold-light hover:to-christmas-red-dark text-white font-bold shadow-lg hover:shadow-xl transition-all hover:scale-105",
                children: setOnAirOverride.isPending ? /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: "Saving..." }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Save, { className: "mr-2 h-4 w-4" }),
                  "Save Override"
                ] })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                onClick: handleClear,
                disabled: clearOnAirOverride.isPending || !currentOverride,
                variant: "outline",
                className: "flex-1 border-christmas-red text-christmas-red hover:bg-christmas-red hover:text-white",
                children: clearOnAirOverride.isPending ? /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: "Clearing..." }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "mr-2 h-4 w-4" }),
                  "Clear Override"
                ] })
              }
            )
          ] })
        ] })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "bg-white/95 backdrop-blur-sm border-christmas-gold border-2 shadow-xl", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-bold text-christmas-dark mb-6 font-christmas", children: "Live Preview" }),
        showName && description ? /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "bg-white/95 backdrop-blur-sm border-christmas-red border-2 shadow-2xl relative overflow-hidden", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-r from-christmas-red/10 via-christmas-gold/10 to-christmas-red/10 animate-on-air-glow" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 border-2 border-christmas-gold rounded-lg animate-on-air-border-pulse" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-6 relative", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "h-16 w-16 rounded-full bg-gradient-to-br from-christmas-red via-christmas-gold to-christmas-red flex items-center justify-center shadow-2xl animate-on-air-icon-pulse relative", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 rounded-full bg-gradient-to-br from-christmas-red to-christmas-gold animate-on-air-icon-glow opacity-50 blur-md" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Radio, { className: "h-8 w-8 text-white relative z-10 drop-shadow-lg" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-2 mb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { className: "bg-gradient-to-r from-christmas-red to-christmas-red-dark text-white font-bold uppercase tracking-wide shadow-lg animate-on-air-badge relative overflow-hidden", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-on-air-badge-shimmer" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "relative z-10", children: "🔴 On Air Now" })
              ] }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-2xl font-bold text-christmas-dark font-christmas mb-2 animate-on-air-text-glow", children: showName }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-700 leading-relaxed", children: description })
            ] })
          ] }) })
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center py-12 text-gray-400", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Radio, { className: "h-16 w-16 mx-auto mb-4 opacity-30" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Fill in the form to see a preview" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-semibold text-blue-900 mb-2", children: "ℹ️ How it works" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "text-sm text-blue-800 space-y-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "• Override will display immediately after saving" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "• Automatically reverts to schedule after duration expires" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "• Clear override anytime to return to automatic display" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "• Changes are visible on the homepage instantly" })
          ] })
        ] })
      ] }) })
    ] })
  ] }) });
}
export {
  ManageOnAir as default
};
