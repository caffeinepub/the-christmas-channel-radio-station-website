import { a as useGetProgramSchedule, F as useAddCustomProgram, G as useUpdateProgram, J as useDeleteProgram, r as reactExports, j as jsxRuntimeExports, B as Button, L as Link, D as Dialog, x as DialogContent, y as DialogHeader, z as DialogTitle, A as DialogDescription, m as Label, I as Input, C as DialogFooter, n as ue } from "./index-CQfh0D_0.js";
import { C as Card } from "./card-cUM_Zaul.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-DbV3vX4c.js";
import { T as Textarea } from "./textarea-qSgVAgr-.js";
import { P as ProtectedRoute } from "./ProtectedRoute-C6eVQGRx.js";
import { A as ArrowLeft } from "./arrow-left-Ce2zt5Zu.js";
import { P as Plus } from "./plus-Fy-58l5W.js";
import { C as Calendar } from "./calendar-DuSbaeXC.js";
import { S as SquarePen } from "./square-pen-BsgCCs9X.js";
import { T as Trash2 } from "./trash-2-B5shjlOQ.js";
import "./index-iM4Bt8Hw.js";
const WEEKDAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
const ALL_DAYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday"
];
const DAY_COLORS = {
  Monday: "bg-blue-100 text-blue-800 border-blue-200",
  Tuesday: "bg-purple-100 text-purple-800 border-purple-200",
  Wednesday: "bg-green-100 text-green-800 border-green-200",
  Thursday: "bg-orange-100 text-orange-800 border-orange-200",
  Friday: "bg-pink-100 text-pink-800 border-pink-200",
  Saturday: "bg-yellow-100 text-yellow-800 border-yellow-200",
  Sunday: "bg-red-100 text-red-800 border-red-200"
};
function ManagePrograms() {
  const { data: slots = [], isLoading } = useGetProgramSchedule();
  const addProgram = useAddCustomProgram();
  const updateProgram = useUpdateProgram();
  const deleteProgram = useDeleteProgram();
  const [dialogOpen, setDialogOpen] = reactExports.useState(false);
  const [editingSlot, setEditingSlot] = reactExports.useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = reactExports.useState(false);
  const [slotToDelete, setSlotToDelete] = reactExports.useState(null);
  const [formData, setFormData] = reactExports.useState({
    name: "",
    description: "",
    bio: "",
    startTime: "",
    endTime: "",
    day: "Monday"
  });
  const handleOpenDialog = (slot) => {
    if (slot) {
      setEditingSlot(slot);
      setFormData({
        name: slot.program.name,
        description: slot.program.description,
        bio: slot.program.bio || "",
        startTime: slot.program.startTime,
        endTime: slot.program.endTime,
        day: slot.day
      });
    } else {
      setEditingSlot(null);
      setFormData({
        name: "",
        description: "",
        bio: "",
        startTime: "",
        endTime: "",
        day: "Monday"
      });
    }
    setDialogOpen(true);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.description.trim() || !formData.startTime.trim() || !formData.endTime.trim()) {
      ue.error("Please fill in all required fields");
      return;
    }
    try {
      if (editingSlot) {
        await updateProgram.mutateAsync({
          name: formData.name.trim(),
          description: formData.description.trim(),
          bio: formData.bio.trim(),
          startTime: formData.startTime.trim(),
          endTime: formData.endTime.trim(),
          oldDay: editingSlot.day,
          newDay: formData.day
        });
        ue.success("Program slot updated successfully!");
      } else {
        await addProgram.mutateAsync({
          name: formData.name.trim(),
          description: formData.description.trim(),
          bio: formData.bio.trim(),
          startTime: formData.startTime.trim(),
          endTime: formData.endTime.trim(),
          days: [formData.day]
        });
        ue.success("Program slot added successfully!");
      }
      setDialogOpen(false);
      setFormData({
        name: "",
        description: "",
        bio: "",
        startTime: "",
        endTime: "",
        day: "Monday"
      });
    } catch (error) {
      console.error("Error saving program:", error);
      ue.error(error.message || "Failed to save program");
    }
  };
  const handleDelete = async () => {
    if (!slotToDelete) return;
    try {
      await deleteProgram.mutateAsync({
        name: slotToDelete.name,
        day: slotToDelete.day
      });
      ue.success("Program slot deleted successfully!");
      setDeleteDialogOpen(false);
      setSlotToDelete(null);
    } catch (error) {
      console.error("Error deleting program:", error);
      ue.error(error.message || "Failed to delete program");
    }
  };
  const slotsByDay = {};
  for (const slot of slots) {
    if (!slotsByDay[slot.day]) slotsByDay[slot.day] = [];
    slotsByDay[slot.day].push(slot);
  }
  for (const day of Object.keys(slotsByDay)) {
    slotsByDay[day].sort(
      (a, b) => a.program.startTime.localeCompare(b.program.startTime)
    );
  }
  const orderedDays = ALL_DAYS.filter((d) => slotsByDay[d]);
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
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-4xl font-bold text-christmas-dark mb-2 font-christmas", children: "Manage Programs" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-600", children: "Create, edit, or remove radio program slots by weekday" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          onClick: () => handleOpenDialog(),
          className: "bg-christmas-green hover:bg-christmas-green-dark",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4 mr-2" }),
            "Add Program Slot"
          ]
        }
      )
    ] }),
    isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center py-12", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "animate-spin h-12 w-12 border-4 border-christmas-green border-t-transparent rounded-full mx-auto mb-4" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-600", children: "Loading programs..." })
    ] }) : slots.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "bg-white/95 backdrop-blur-sm border-christmas-gold border-2 p-12 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "h-16 w-16 text-gray-400 mx-auto mb-4" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-600 mb-4", children: "No program slots yet. Add your first weekday program slot!" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          onClick: () => handleOpenDialog(),
          className: "bg-christmas-green hover:bg-christmas-green-dark",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4 mr-2" }),
            "Add Program Slot"
          ]
        }
      )
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-8", children: orderedDays.map((day) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: `px-4 py-1.5 rounded-full text-sm font-bold border ${DAY_COLORS[day] || "bg-gray-100 text-gray-800 border-gray-200"}`,
            children: day
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 h-px bg-christmas-gold/30" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-gray-400", children: [
          slotsByDay[day].length,
          " slot",
          slotsByDay[day].length !== 1 ? "s" : ""
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3 pl-2", children: slotsByDay[day].map((slot) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        Card,
        {
          className: "bg-white/95 backdrop-blur-sm border-christmas-gold border-2 hover:shadow-xl transition-shadow",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg font-bold text-christmas-dark font-christmas", children: slot.program.name }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: `text-xs px-2 py-0.5 rounded-full border font-medium ${DAY_COLORS[slot.day] || "bg-gray-100 text-gray-700 border-gray-200"}`,
                    children: slot.day
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-christmas-red font-medium text-sm mb-1", children: [
                slot.program.startTime,
                " – ",
                slot.program.endTime
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-600 text-sm line-clamp-2", children: slot.program.description }),
              slot.program.bio && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-gray-500 text-xs italic mt-1 line-clamp-2", children: [
                "Bio: ",
                slot.program.bio
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 ml-4 shrink-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  onClick: () => handleOpenDialog(slot),
                  variant: "outline",
                  size: "sm",
                  className: "border-christmas-green text-christmas-green hover:bg-christmas-green hover:text-white",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(SquarePen, { className: "h-4 w-4" })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  onClick: () => {
                    setSlotToDelete({
                      name: slot.program.name,
                      day: slot.day
                    });
                    setDeleteDialogOpen(true);
                  },
                  variant: "outline",
                  size: "sm",
                  className: "border-christmas-red text-christmas-red hover:bg-christmas-red hover:text-white",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-4 w-4" })
                }
              )
            ] })
          ] }) })
        },
        `${slot.program.name}-${slot.day}`
      )) })
    ] }, day)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: dialogOpen, onOpenChange: setDialogOpen, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "sm:max-w-lg bg-white border-christmas-gold border-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogHeader, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { className: "text-2xl font-christmas text-christmas-green", children: editingSlot ? "Edit Program Slot" : "Add New Program Slot" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(DialogDescription, { children: editingSlot ? "Update the program slot information" : "Add a new program slot to a specific weekday" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "space-y-4 mt-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "name", children: "Program Name" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              id: "name",
              value: formData.name,
              onChange: (e) => setFormData({ ...formData, name: e.target.value }),
              placeholder: "Enter program name",
              disabled: !!editingSlot,
              className: "border-christmas-gold"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "day", children: "Day of Week" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Select,
            {
              value: formData.day,
              onValueChange: (val) => setFormData({ ...formData, day: val }),
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { id: "day", className: "border-christmas-gold", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Select a day" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
                  WEEKDAYS.map((d) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: d, children: d }, d)),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "Saturday", children: "Saturday" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "Sunday", children: "Sunday" })
                ] })
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "description", children: [
            "Description ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-christmas-red", children: "*" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Textarea,
            {
              id: "description",
              value: formData.description,
              onChange: (e) => setFormData({ ...formData, description: e.target.value }),
              placeholder: "Enter program description",
              rows: 2,
              className: "border-christmas-gold"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "bio", children: [
            "Bio",
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gray-400 text-xs font-normal", children: "(optional)" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Textarea,
            {
              id: "bio",
              value: formData.bio,
              onChange: (e) => setFormData({ ...formData, bio: e.target.value }),
              placeholder: "Enter a short bio or background for this show...",
              rows: 3,
              className: "border-christmas-gold"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "startTime", children: "Start Time" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "startTime",
                value: formData.startTime,
                onChange: (e) => setFormData({ ...formData, startTime: e.target.value }),
                placeholder: "e.g., 2:00 PM",
                className: "border-christmas-gold"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "endTime", children: "End Time" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "endTime",
                value: formData.endTime,
                onChange: (e) => setFormData({ ...formData, endTime: e.target.value }),
                placeholder: "e.g., 7:00 PM",
                className: "border-christmas-gold"
              }
            )
          ] })
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
              disabled: addProgram.isPending || updateProgram.isPending,
              className: "bg-christmas-green hover:bg-christmas-green-dark",
              children: addProgram.isPending || updateProgram.isPending ? "Saving..." : editingSlot ? "Update" : "Add"
            }
          )
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: deleteDialogOpen, onOpenChange: setDeleteDialogOpen, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "sm:max-w-md bg-white border-christmas-red border-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogHeader, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { className: "text-2xl font-christmas text-christmas-red", children: "Delete Program Slot" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogDescription, { children: [
          "Are you sure you want to delete the",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: slotToDelete == null ? void 0 : slotToDelete.day }),
          " slot for",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: slotToDelete == null ? void 0 : slotToDelete.name }),
          "? This action cannot be undone."
        ] })
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
            disabled: deleteProgram.isPending,
            className: "bg-christmas-red hover:bg-christmas-red-dark",
            children: deleteProgram.isPending ? "Deleting..." : "Delete"
          }
        )
      ] })
    ] }) })
  ] }) });
}
export {
  ManagePrograms as default
};
