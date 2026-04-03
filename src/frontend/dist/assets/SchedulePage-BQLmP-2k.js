import { a as useGetProgramSchedule, j as jsxRuntimeExports } from "./index-CQfh0D_0.js";
import { C as Card } from "./card-cUM_Zaul.js";
import { S as Skeleton } from "./skeleton-P4_f8b3b.js";
import { C as Calendar } from "./calendar-DuSbaeXC.js";
import { C as Clock } from "./clock-DZFXI__O.js";
const ALL_DAYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday"
];
const DAY_ACCENT = {
  Monday: {
    bg: "from-blue-50 to-white",
    border: "border-blue-200",
    badge: "bg-blue-600 text-white",
    dot: "bg-blue-500"
  },
  Tuesday: {
    bg: "from-purple-50 to-white",
    border: "border-purple-200",
    badge: "bg-purple-600 text-white",
    dot: "bg-purple-500"
  },
  Wednesday: {
    bg: "from-green-50 to-white",
    border: "border-green-200",
    badge: "bg-green-600 text-white",
    dot: "bg-green-500"
  },
  Thursday: {
    bg: "from-orange-50 to-white",
    border: "border-orange-200",
    badge: "bg-orange-500 text-white",
    dot: "bg-orange-500"
  },
  Friday: {
    bg: "from-pink-50 to-white",
    border: "border-pink-200",
    badge: "bg-pink-600 text-white",
    dot: "bg-pink-500"
  },
  Saturday: {
    bg: "from-yellow-50 to-white",
    border: "border-yellow-200",
    badge: "bg-yellow-500 text-white",
    dot: "bg-yellow-500"
  },
  Sunday: {
    bg: "from-red-50 to-white",
    border: "border-red-200",
    badge: "bg-christmas-red text-white",
    dot: "bg-christmas-red"
  }
};
const today = () => {
  return [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ][(/* @__PURE__ */ new Date()).getDay()];
};
function SchedulePage() {
  const { data: slots, isLoading } = useGetProgramSchedule();
  const slotsByDay = {};
  if (slots) {
    for (const slot of slots) {
      if (!slotsByDay[slot.day]) slotsByDay[slot.day] = [];
      slotsByDay[slot.day].push(slot);
    }
    for (const day of Object.keys(slotsByDay)) {
      slotsByDay[day].sort(
        (a, b) => a.program.startTime.localeCompare(b.program.startTime)
      );
    }
  }
  const orderedDays = ALL_DAYS.filter((d) => slotsByDay[d]);
  const currentDay = today();
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container mx-auto px-4 py-12", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-4xl mx-auto", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mb-12", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "inline-flex items-center justify-center w-20 h-20 rounded-full bg-christmas-red mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "h-10 w-10 text-white" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-4xl md:text-5xl font-bold text-christmas-dark mb-4 font-christmas", children: "Program Schedule" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg text-gray-600 max-w-2xl mx-auto", children: "Tune in to your favorite shows — here's what's on the air this week." })
    ] }),
    isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-8", children: [1, 2, 3].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-8 w-32 rounded-full" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-28 w-full rounded-xl" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-28 w-full rounded-xl" })
    ] }, i)) }) : orderedDays.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "bg-white/95 backdrop-blur-sm border-christmas-gold border-2 p-12 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "h-16 w-16 text-gray-300 mx-auto mb-4" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-500 text-lg", children: "No programs scheduled yet. Check back soon!" })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2 justify-center mb-10", children: orderedDays.map((day) => {
        const accent = DAY_ACCENT[day] || DAY_ACCENT.Monday;
        const isToday = day === currentDay;
        return /* @__PURE__ */ jsxRuntimeExports.jsx(
          "a",
          {
            href: `#day-${day}`,
            className: `px-4 py-1.5 rounded-full text-sm font-semibold transition-all ${isToday ? `${accent.badge} shadow-md ring-2 ring-offset-1 ring-current` : "bg-white border border-gray-200 text-gray-600 hover:border-gray-400"}`,
            children: isToday ? `📍 ${day}` : day
          },
          day
        );
      }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-10", children: orderedDays.map((day) => {
        const accent = DAY_ACCENT[day] || DAY_ACCENT.Monday;
        const isToday = day === currentDay;
        return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { id: `day-${day}`, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: `px-5 py-1.5 rounded-full text-sm font-bold ${accent.badge}`,
                children: day
              }
            ),
            isToday && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-semibold text-christmas-red bg-christmas-red/10 px-3 py-1 rounded-full border border-christmas-red/20", children: "Today" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 h-px bg-gray-200" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-gray-400", children: [
              slotsByDay[day].length,
              " show",
              slotsByDay[day].length !== 1 ? "s" : ""
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3 pl-1", children: slotsByDay[day].map((slot) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            Card,
            {
              className: `bg-gradient-to-r ${accent.bg} ${accent.border} border-2 hover:shadow-lg transition-shadow`,
              children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: `mt-1.5 h-2.5 w-2.5 rounded-full shrink-0 ${accent.dot}`
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg font-bold text-christmas-dark font-christmas leading-tight", children: slot.program.name }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 mt-0.5 mb-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "h-3.5 w-3.5 text-gray-400 shrink-0" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm font-medium text-christmas-red", children: [
                      slot.program.startTime,
                      " –",
                      " ",
                      slot.program.endTime
                    ] })
                  ] }),
                  slot.program.description && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-gray-600 leading-relaxed", children: slot.program.description }),
                  slot.program.bio && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-gray-500 italic mt-2 leading-relaxed border-t border-gray-200/80 pt-2", children: slot.program.bio })
                ] })
              ] }) })
            },
            `${slot.program.name}-${slot.day}`
          )) })
        ] }, day);
      }) })
    ] })
  ] }) });
}
export {
  SchedulePage as default
};
