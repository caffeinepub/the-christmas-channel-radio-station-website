import { k as useGetDJProfiles, t as useAddDJProfile, v as useUpdateDJProfile, w as useDeleteDJProfile, r as reactExports, j as jsxRuntimeExports, B as Button, L as Link, D as Dialog, x as DialogContent, y as DialogHeader, z as DialogTitle, A as DialogDescription, m as Label, I as Input, C as DialogFooter, n as ue, E as ExternalBlob } from "./index-CQfh0D_0.js";
import { C as Card } from "./card-cUM_Zaul.js";
import { T as Textarea } from "./textarea-qSgVAgr-.js";
import { P as ProtectedRoute } from "./ProtectedRoute-C6eVQGRx.js";
import { A as ArrowLeft } from "./arrow-left-Ce2zt5Zu.js";
import { P as Plus } from "./plus-Fy-58l5W.js";
import { S as SquarePen } from "./square-pen-BsgCCs9X.js";
import { T as Trash2 } from "./trash-2-B5shjlOQ.js";
function ManageDJs() {
  const { data: djProfiles = [], isLoading } = useGetDJProfiles();
  const addDJ = useAddDJProfile();
  const updateDJ = useUpdateDJProfile();
  const deleteDJ = useDeleteDJProfile();
  const [dialogOpen, setDialogOpen] = reactExports.useState(false);
  const [editingDJ, setEditingDJ] = reactExports.useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = reactExports.useState(false);
  const [djToDelete, setDjToDelete] = reactExports.useState(null);
  const [formData, setFormData] = reactExports.useState({
    name: "",
    bio: "",
    photoFile: null,
    photoUrl: ""
  });
  const [uploadProgress, setUploadProgress] = reactExports.useState(0);
  const handleOpenDialog = (dj) => {
    if (dj) {
      setEditingDJ(dj);
      setFormData({
        name: dj.name,
        bio: dj.bio,
        photoFile: null,
        photoUrl: dj.photoUrl.getDirectURL()
      });
    } else {
      setEditingDJ(null);
      setFormData({ name: "", bio: "", photoFile: null, photoUrl: "" });
    }
    setUploadProgress(0);
    setDialogOpen(true);
  };
  const handleFileChange = (e) => {
    var _a;
    const file = (_a = e.target.files) == null ? void 0 : _a[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        ue.error("Please select an image file");
        return;
      }
      setFormData({ ...formData, photoFile: file });
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.bio.trim()) {
      ue.error("Please fill in all fields");
      return;
    }
    try {
      let photoBlob;
      if (formData.photoFile) {
        const arrayBuffer = await formData.photoFile.arrayBuffer();
        const uint8Array = new Uint8Array(arrayBuffer);
        photoBlob = ExternalBlob.fromBytes(uint8Array).withUploadProgress(
          (percentage) => {
            setUploadProgress(percentage);
          }
        );
      } else if (editingDJ) {
        photoBlob = editingDJ.photoUrl;
      } else {
        ue.error("Please select a photo");
        return;
      }
      if (editingDJ) {
        await updateDJ.mutateAsync({
          name: formData.name.trim(),
          bio: formData.bio.trim(),
          photo: photoBlob
        });
        ue.success("DJ profile updated successfully!");
      } else {
        await addDJ.mutateAsync({
          name: formData.name.trim(),
          bio: formData.bio.trim(),
          photo: photoBlob
        });
        ue.success("DJ profile added successfully!");
      }
      setDialogOpen(false);
      setFormData({ name: "", bio: "", photoFile: null, photoUrl: "" });
      setUploadProgress(0);
    } catch (error) {
      console.error("Error saving DJ:", error);
      ue.error(error.message || "Failed to save DJ profile");
    }
  };
  const handleDelete = async () => {
    if (!djToDelete) return;
    try {
      await deleteDJ.mutateAsync(djToDelete);
      ue.success("DJ profile deleted successfully!");
      setDeleteDialogOpen(false);
      setDjToDelete(null);
    } catch (error) {
      console.error("Error deleting DJ:", error);
      ue.error(error.message || "Failed to delete DJ profile");
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(ProtectedRoute, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 py-12", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-8 flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
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
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-4xl font-bold text-christmas-dark mb-2 font-christmas", children: "Manage DJs" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-600", children: "Add, edit, or remove DJ profiles" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          onClick: () => handleOpenDialog(),
          className: "bg-christmas-red hover:bg-christmas-red-dark",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4 mr-2" }),
            "Add DJ"
          ]
        }
      )
    ] }),
    isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center py-12", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "animate-spin h-12 w-12 border-4 border-christmas-red border-t-transparent rounded-full mx-auto mb-4" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-600", children: "Loading DJ profiles..." })
    ] }) : djProfiles.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "bg-white/95 backdrop-blur-sm border-christmas-gold border-2 p-12 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-600 mb-4", children: "No DJ profiles yet. Add your first DJ!" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          onClick: () => handleOpenDialog(),
          className: "bg-christmas-red hover:bg-christmas-red-dark",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4 mr-2" }),
            "Add DJ"
          ]
        }
      )
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid md:grid-cols-2 lg:grid-cols-3 gap-6", children: djProfiles.map((dj) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      Card,
      {
        className: "bg-white/95 backdrop-blur-sm border-christmas-gold border-2 hover:shadow-xl transition-shadow",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "img",
            {
              src: dj.photoUrl.getDirectURL(),
              alt: dj.name,
              className: "w-full h-48 object-cover rounded-lg mb-4"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xl font-bold text-christmas-dark mb-2 font-christmas", children: dj.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-600 mb-4 line-clamp-3", children: dj.bio }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                onClick: () => handleOpenDialog(dj),
                variant: "outline",
                size: "sm",
                className: "flex-1 border-christmas-green text-christmas-green hover:bg-christmas-green hover:text-white",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SquarePen, { className: "h-4 w-4 mr-2" }),
                  "Edit"
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                onClick: () => {
                  setDjToDelete(dj.name);
                  setDeleteDialogOpen(true);
                },
                variant: "outline",
                size: "sm",
                className: "flex-1 border-christmas-red text-christmas-red hover:bg-christmas-red hover:text-white",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-4 w-4 mr-2" }),
                  "Delete"
                ]
              }
            )
          ] })
        ] })
      },
      dj.name
    )) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: dialogOpen, onOpenChange: setDialogOpen, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "sm:max-w-lg bg-white border-christmas-gold border-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogHeader, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { className: "text-2xl font-christmas text-christmas-red", children: editingDJ ? "Edit DJ Profile" : "Add New DJ" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(DialogDescription, { children: editingDJ ? "Update the DJ profile information" : "Add a new DJ to your station" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "space-y-4 mt-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "name", children: "DJ Name" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              id: "name",
              value: formData.name,
              onChange: (e) => setFormData({ ...formData, name: e.target.value }),
              placeholder: "Enter DJ name",
              disabled: !!editingDJ,
              className: "border-christmas-gold"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "bio", children: "Bio" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Textarea,
            {
              id: "bio",
              value: formData.bio,
              onChange: (e) => setFormData({ ...formData, bio: e.target.value }),
              placeholder: "Enter DJ bio",
              rows: 4,
              className: "border-christmas-gold"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "photo", children: "Photo" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "photo",
                type: "file",
                accept: "image/*",
                onChange: handleFileChange,
                className: "border-christmas-gold"
              }
            ),
            formData.photoUrl && !formData.photoFile && /* @__PURE__ */ jsxRuntimeExports.jsx(
              "img",
              {
                src: formData.photoUrl,
                alt: "Current",
                className: "h-12 w-12 rounded object-cover"
              }
            )
          ] }),
          uploadProgress > 0 && uploadProgress < 100 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full bg-gray-200 rounded-full h-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "bg-christmas-red h-2 rounded-full transition-all",
              style: { width: `${uploadProgress}%` }
            }
          ) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogFooter, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              type: "button",
              variant: "outline",
              onClick: () => setDialogOpen(false),
              children: "Cancel"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              type: "submit",
              disabled: addDJ.isPending || updateDJ.isPending,
              className: "bg-christmas-red hover:bg-christmas-red-dark",
              children: addDJ.isPending || updateDJ.isPending ? "Saving..." : editingDJ ? "Update" : "Add"
            }
          )
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: deleteDialogOpen, onOpenChange: setDeleteDialogOpen, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "sm:max-w-md bg-white border-christmas-red border-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogHeader, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { className: "text-2xl font-christmas text-christmas-red", children: "Delete DJ Profile" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(DialogDescription, { children: "Are you sure you want to delete this DJ profile? This action cannot be undone." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogFooter, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            variant: "outline",
            onClick: () => setDeleteDialogOpen(false),
            children: "Cancel"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            onClick: handleDelete,
            disabled: deleteDJ.isPending,
            className: "bg-christmas-red hover:bg-christmas-red-dark",
            children: deleteDJ.isPending ? "Deleting..." : "Delete"
          }
        )
      ] })
    ] }) })
  ] }) });
}
export {
  ManageDJs as default
};
