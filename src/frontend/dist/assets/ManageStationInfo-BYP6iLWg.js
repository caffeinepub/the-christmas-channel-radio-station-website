import { o as useGetStationInformation, aj as useUpdateStationInformation, r as reactExports, j as jsxRuntimeExports, B as Button, L as Link, m as Label, I as Input, n as ue } from "./index-CQfh0D_0.js";
import { C as Card } from "./card-cUM_Zaul.js";
import { T as Textarea } from "./textarea-qSgVAgr-.js";
import { P as ProtectedRoute } from "./ProtectedRoute-C6eVQGRx.js";
import { A as ArrowLeft } from "./arrow-left-Ce2zt5Zu.js";
import { S as Save } from "./save-mPM-iRRI.js";
function ManageStationInfo() {
  const { data: stationInfo, isLoading } = useGetStationInformation();
  const updateStationInfo = useUpdateStationInformation();
  const [formData, setFormData] = reactExports.useState({
    title: "",
    description: "",
    content: ""
  });
  reactExports.useEffect(() => {
    if (stationInfo) {
      setFormData({
        title: stationInfo.title,
        description: stationInfo.description,
        content: stationInfo.content
      });
    }
  }, [stationInfo]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.description.trim()) {
      ue.error("Title and description are required");
      return;
    }
    try {
      await updateStationInfo.mutateAsync({
        title: formData.title.trim(),
        description: formData.description.trim(),
        content: formData.content.trim()
      });
      ue.success("Station information updated successfully!");
    } catch (error) {
      console.error("Error updating station info:", error);
      ue.error(error.message || "Failed to update station information");
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(ProtectedRoute, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container mx-auto px-4 py-12", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-4xl mx-auto", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          asChild: true,
          variant: "ghost",
          className: "mb-4 text-christmas-red hover:text-christmas-red-dark",
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/admin", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "h-4 w-4 mr-2" }),
            "Back to Dashboard"
          ] })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-4xl font-bold text-christmas-dark mb-2 font-christmas", children: "Manage Station Information" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-600", children: "Update the About Station section content" })
    ] }),
    isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "bg-white/95 backdrop-blur-sm border-christmas-gold border-2 p-12 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "animate-spin h-12 w-12 border-4 border-christmas-green border-t-transparent rounded-full mx-auto mb-4" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-600", children: "Loading station information..." })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "bg-white/95 backdrop-blur-sm border-christmas-gold border-2 shadow-xl", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "space-y-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Label,
            {
              htmlFor: "title",
              className: "text-lg font-semibold text-christmas-dark",
              children: "Section Title"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              id: "title",
              value: formData.title,
              onChange: (e) => setFormData({ ...formData, title: e.target.value }),
              placeholder: "e.g., About Our Station",
              className: "border-christmas-gold text-lg"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-gray-500", children: "This will be displayed as the heading of the About Station section" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Label,
            {
              htmlFor: "description",
              className: "text-lg font-semibold text-christmas-dark",
              children: "Short Description"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Textarea,
            {
              id: "description",
              value: formData.description,
              onChange: (e) => setFormData({
                ...formData,
                description: e.target.value
              }),
              placeholder: "A brief description or tagline",
              rows: 2,
              className: "border-christmas-gold"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-gray-500", children: "A short summary that appears below the title" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Label,
            {
              htmlFor: "content",
              className: "text-lg font-semibold text-christmas-dark",
              children: "Main Content"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Textarea,
            {
              id: "content",
              value: formData.content,
              onChange: (e) => setFormData({ ...formData, content: e.target.value }),
              placeholder: "Enter the main content for the About Station section. You can use HTML for formatting.",
              rows: 12,
              className: "border-christmas-gold font-mono text-sm"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-gray-500", children: "Main content for the section. Basic HTML tags are supported (p, strong, em, br, ul, ol, li, etc.)" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-4 pt-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            type: "submit",
            disabled: updateStationInfo.isPending,
            className: "bg-christmas-green hover:bg-christmas-green-dark flex-1",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Save, { className: "h-4 w-4 mr-2" }),
              updateStationInfo.isPending ? "Saving..." : "Save Changes"
            ]
          }
        ) })
      ] }),
      (formData.title || formData.description || formData.content) && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8 pt-8 border-t border-christmas-gold", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xl font-bold text-christmas-dark mb-4 font-christmas", children: "Preview" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "bg-gray-50 border-christmas-green border-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6", children: [
          formData.title && /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "text-2xl font-bold text-christmas-dark mb-2 font-christmas", children: formData.title }),
          formData.description && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-600 italic mb-4", children: formData.description }),
          formData.content && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "prose prose-lg max-w-none text-gray-700 whitespace-pre-wrap", children: formData.content })
        ] }) })
      ] })
    ] }) })
  ] }) }) });
}
export {
  ManageStationInfo as default
};
