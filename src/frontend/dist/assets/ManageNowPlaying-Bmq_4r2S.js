import { u as useGetNowPlaying, K as useUpdateNowPlaying, M as useClearNowPlaying, r as reactExports, j as jsxRuntimeExports, B as Button, L as Link, m as Label, I as Input, n as ue } from "./index-CQfh0D_0.js";
import { C as Card } from "./card-cUM_Zaul.js";
import { P as ProtectedRoute } from "./ProtectedRoute-C6eVQGRx.js";
import { A as ArrowLeft } from "./arrow-left-Ce2zt5Zu.js";
import { M as Music } from "./music-DJkBxxQy.js";
import { T as Trash2 } from "./trash-2-B5shjlOQ.js";
function ManageNowPlaying() {
  const { data: nowPlaying, isLoading } = useGetNowPlaying();
  const updateNowPlaying = useUpdateNowPlaying();
  const clearNowPlaying = useClearNowPlaying();
  const [formData, setFormData] = reactExports.useState({
    title: "",
    artist: ""
  });
  reactExports.useEffect(() => {
    if (nowPlaying) {
      setFormData({
        title: nowPlaying.title,
        artist: nowPlaying.artist
      });
    }
  }, [nowPlaying]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.artist.trim()) {
      ue.error("Please fill in both title and artist");
      return;
    }
    try {
      await updateNowPlaying.mutateAsync({
        title: formData.title.trim(),
        artist: formData.artist.trim()
      });
      ue.success("Now Playing updated successfully!");
    } catch (error) {
      console.error("Error updating now playing:", error);
      ue.error(error.message || "Failed to update Now Playing");
    }
  };
  const handleClear = async () => {
    try {
      await clearNowPlaying.mutateAsync();
      setFormData({ title: "", artist: "" });
      ue.success("Now Playing cleared successfully!");
    } catch (error) {
      console.error("Error clearing now playing:", error);
      ue.error(error.message || "Failed to clear Now Playing");
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(ProtectedRoute, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 py-12", children: [
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
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-4xl font-bold text-christmas-dark mb-2 font-christmas", children: "Update Now Playing" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-600", children: "Update the current song information in real-time" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-2xl mx-auto", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "bg-white/95 backdrop-blur-sm border-christmas-gold border-2 shadow-xl", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4 mb-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-16 w-16 rounded-full bg-christmas-gold/10 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Music, { className: "h-8 w-8 text-christmas-gold" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-bold text-christmas-dark font-christmas", children: "Current Song" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-600", children: isLoading ? "Loading..." : nowPlaying ? `${nowPlaying.title} - ${nowPlaying.artist}` : "No song currently playing" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "space-y-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "title", children: "Song Title" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "title",
                value: formData.title,
                onChange: (e) => setFormData({ ...formData, title: e.target.value }),
                placeholder: "Enter song title",
                className: "border-christmas-gold"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "artist", children: "Artist" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "artist",
                value: formData.artist,
                onChange: (e) => setFormData({ ...formData, artist: e.target.value }),
                placeholder: "Enter artist name",
                className: "border-christmas-gold"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                type: "submit",
                disabled: updateNowPlaying.isPending,
                className: "flex-1 bg-christmas-gold hover:bg-christmas-gold-light text-christmas-red",
                children: updateNowPlaying.isPending ? "Updating..." : "Update Now Playing"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                type: "button",
                onClick: handleClear,
                disabled: clearNowPlaying.isPending || !nowPlaying,
                variant: "outline",
                className: "border-christmas-red text-christmas-red hover:bg-christmas-red hover:text-white",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-4 w-4 mr-2" }),
                  clearNowPlaying.isPending ? "Clearing..." : "Clear"
                ]
              }
            )
          ] })
        ] })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "mt-6 bg-gradient-to-r from-christmas-gold/10 to-christmas-red/10 border-christmas-gold border-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg font-bold text-christmas-dark mb-2 font-christmas", children: "💡 Quick Tips" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "text-gray-600 space-y-2 text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "• Updates are reflected immediately on the live site" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: '• Use "Clear" to remove the current song display' }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "• Make sure to enter both title and artist for best results" })
        ] })
      ] }) })
    ] })
  ] }) });
}
export {
  ManageNowPlaying as default
};
