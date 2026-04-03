import { c as createLucideIcon, r as reactExports, j as jsxRuntimeExports, B as Button, q as useRunManualUpdate, s as useGetLastUpdateResult, L as Link, n as ue } from "./index-CQfh0D_0.js";
import { C as Card } from "./card-cUM_Zaul.js";
import { P as ProtectedRoute } from "./ProtectedRoute-C6eVQGRx.js";
import { L as LoaderCircle } from "./loader-circle-CAk1c1PK.js";
import { C as CloudRain, S as Sun, a as Cloud, b as CloudFog, c as CloudDrizzle, d as CloudSnow, e as CloudLightning, W as Wind } from "./wind-w8urz6o4.js";
import { U as Users } from "./users-NQgzXeN9.js";
import { C as Calendar } from "./calendar-DuSbaeXC.js";
import { M as Music } from "./music-DJkBxxQy.js";
import { P as Palette } from "./palette-CIjD4T-3.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$4 = [
  ["path", { d: "M12 7v14", key: "1akyts" }],
  [
    "path",
    {
      d: "M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z",
      key: "ruj8y"
    }
  ]
];
const BookOpen = createLucideIcon("book-open", __iconNode$4);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$3 = [
  ["path", { d: "M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z", key: "1rqfz7" }],
  ["path", { d: "M14 2v4a2 2 0 0 0 2 2h4", key: "tnqrlb" }],
  ["path", { d: "M10 9H8", key: "b1mrlr" }],
  ["path", { d: "M16 13H8", key: "t4e002" }],
  ["path", { d: "M16 17H8", key: "z1uh3a" }]
];
const FileText = createLucideIcon("file-text", __iconNode$3);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["path", { d: "M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z", key: "131961" }],
  ["path", { d: "M19 10v2a7 7 0 0 1-14 0v-2", key: "1vc78b" }],
  ["line", { x1: "12", x2: "12", y1: "19", y2: "22", key: "x3vr5v" }]
];
const Mic = createLucideIcon("mic", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8", key: "v9h5vc" }],
  ["path", { d: "M21 3v5h-5", key: "1q7to0" }],
  ["path", { d: "M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16", key: "3uifl3" }],
  ["path", { d: "M8 16H3v5", key: "1cv678" }]
];
const RefreshCw = createLucideIcon("refresh-cw", __iconNode$1);
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
      d: "M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z",
      key: "4pj2yx"
    }
  ],
  ["path", { d: "M20 3v4", key: "1olli1" }],
  ["path", { d: "M22 5h-4", key: "1gvqau" }],
  ["path", { d: "M4 17v2", key: "vumght" }],
  ["path", { d: "M5 18H3", key: "zchphs" }]
];
const Sparkles = createLucideIcon("sparkles", __iconNode);
function getWeatherIcon(code) {
  if (code === 0 || code === 1)
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Sun, { className: "h-8 w-8 text-yellow-500" });
  if (code === 2 || code === 3)
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Cloud, { className: "h-8 w-8 text-gray-400" });
  if (code >= 45 && code <= 48)
    return /* @__PURE__ */ jsxRuntimeExports.jsx(CloudFog, { className: "h-8 w-8 text-gray-500" });
  if (code >= 51 && code <= 57)
    return /* @__PURE__ */ jsxRuntimeExports.jsx(CloudDrizzle, { className: "h-8 w-8 text-blue-400" });
  if (code >= 61 && code <= 67)
    return /* @__PURE__ */ jsxRuntimeExports.jsx(CloudRain, { className: "h-8 w-8 text-blue-600" });
  if (code >= 71 && code <= 77)
    return /* @__PURE__ */ jsxRuntimeExports.jsx(CloudSnow, { className: "h-8 w-8 text-blue-300" });
  if (code >= 80 && code <= 86)
    return /* @__PURE__ */ jsxRuntimeExports.jsx(CloudRain, { className: "h-8 w-8 text-blue-700" });
  if (code >= 95 && code <= 99)
    return /* @__PURE__ */ jsxRuntimeExports.jsx(CloudLightning, { className: "h-8 w-8 text-purple-600" });
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Wind, { className: "h-8 w-8 text-gray-400" });
}
function getWeatherDescription(code) {
  const conditions = {
    0: "Clear sky",
    1: "Mainly clear",
    2: "Partly cloudy",
    3: "Overcast",
    45: "Foggy",
    48: "Rime fog",
    51: "Light drizzle",
    53: "Moderate drizzle",
    55: "Dense drizzle",
    56: "Light freezing drizzle",
    57: "Dense freezing drizzle",
    61: "Slight rain",
    63: "Moderate rain",
    65: "Heavy rain",
    66: "Light freezing rain",
    67: "Heavy freezing rain",
    71: "Slight snow",
    73: "Moderate snow",
    75: "Heavy snow",
    77: "Snow grains",
    80: "Slight rain showers",
    81: "Moderate rain showers",
    82: "Violent rain showers",
    85: "Slight snow showers",
    86: "Heavy snow showers",
    95: "Thunderstorm",
    96: "Thunderstorm with hail",
    99: "Severe thunderstorm"
  };
  return conditions[code] || "Unknown";
}
function WeatherWidget() {
  const [weatherData, setWeatherData] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(true);
  const [error, setError] = reactExports.useState(null);
  const [useFahrenheit, setUseFahrenheit] = reactExports.useState(true);
  const [lastFetch, setLastFetch] = reactExports.useState(null);
  const DULUTH_LAT = 46.7867;
  const DULUTH_LON = -92.1005;
  const fetchWeatherData = async () => {
    try {
      setLoading(true);
      setError(null);
      const url = `https://api.open-meteo.com/v1/forecast?latitude=${DULUTH_LAT}&longitude=${DULUTH_LON}&daily=temperature_2m_max,temperature_2m_min,weather_code&temperature_unit=${useFahrenheit ? "fahrenheit" : "celsius"}&timezone=America/Chicago&forecast_days=7`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Failed to fetch weather data");
      }
      const data = await response.json();
      const days = data.daily.time.map((date, index) => ({
        date,
        maxTemp: data.daily.temperature_2m_max[index],
        minTemp: data.daily.temperature_2m_min[index],
        weatherCode: data.daily.weather_code[index],
        summary: getWeatherDescription(data.daily.weather_code[index])
      }));
      setWeatherData(days);
      setLastFetch(/* @__PURE__ */ new Date());
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to load weather data"
      );
    } finally {
      setLoading(false);
    }
  };
  reactExports.useEffect(() => {
    fetchWeatherData();
    const interval = setInterval(
      () => {
        fetchWeatherData();
      },
      24 * 60 * 60 * 1e3
    );
    return () => clearInterval(interval);
  }, [useFahrenheit]);
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const today = /* @__PURE__ */ new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    if (date.toDateString() === today.toDateString()) {
      return "Today";
    }
    if (date.toDateString() === tomorrow.toDateString()) {
      return "Tomorrow";
    }
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric"
    });
  };
  if (loading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "bg-white/95 backdrop-blur-sm border-christmas-gold border-2 p-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-center py-12", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-8 w-8 animate-spin text-christmas-gold" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-3 text-gray-600", children: "Loading weather data..." })
    ] }) });
  }
  if (error) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "bg-white/95 backdrop-blur-sm border-christmas-red border-2 p-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center py-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CloudRain, { className: "h-12 w-12 text-christmas-red mx-auto mb-3" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-christmas-red font-semibold mb-2", children: "Weather data unavailable" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-600 text-sm mb-4", children: error }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          onClick: fetchWeatherData,
          className: "bg-christmas-red hover:bg-christmas-red-dark",
          children: "Try Again"
        }
      )
    ] }) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "bg-white/95 backdrop-blur-sm border-christmas-gold border-2 overflow-hidden", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-gradient-to-r from-christmas-red/10 to-christmas-gold/10 p-6 border-b-2 border-christmas-gold", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-2xl font-bold text-christmas-dark font-christmas flex items-center gap-2", children: "❄️ Duluth, MN Weather" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              size: "sm",
              variant: useFahrenheit ? "default" : "outline",
              onClick: () => setUseFahrenheit(true),
              className: useFahrenheit ? "bg-christmas-red hover:bg-christmas-red-dark" : "border-christmas-red text-christmas-red hover:bg-christmas-red/10",
              children: "°F"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              size: "sm",
              variant: !useFahrenheit ? "default" : "outline",
              onClick: () => setUseFahrenheit(false),
              className: !useFahrenheit ? "bg-christmas-red hover:bg-christmas-red-dark" : "border-christmas-red text-christmas-red hover:bg-christmas-red/10",
              children: "°C"
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-gray-600", children: [
        "7-Day Forecast",
        " ",
        lastFetch && `• Updated ${lastFetch.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" })}`
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4", children: weatherData.map((day, index) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: `p-4 rounded-lg border-2 transition-all hover:scale-105 hover:shadow-lg ${index === 0 ? "bg-gradient-to-br from-christmas-gold/20 to-christmas-red/10 border-christmas-gold" : "bg-white border-gray-200 hover:border-christmas-gold"}`,
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "p",
            {
              className: `font-bold mb-2 ${index === 0 ? "text-christmas-red text-lg" : "text-gray-700"}`,
              children: formatDate(day.date)
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center mb-3", children: getWeatherIcon(day.weatherCode) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-gray-600 mb-3 min-h-[2.5rem] flex items-center justify-center", children: day.summary }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-center items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-gray-500 mb-1", children: "High" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xl font-bold text-christmas-red", children: [
                Math.round(day.maxTemp),
                "°"
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-8 w-px bg-gray-300" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-gray-500 mb-1", children: "Low" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xl font-bold text-blue-600", children: [
                Math.round(day.minTemp),
                "°"
              ] })
            ] })
          ] })
        ] })
      },
      day.date
    )) }) })
  ] });
}
function AdminDashboard() {
  const runManualUpdate = useRunManualUpdate();
  const { data: lastUpdateResult } = useGetLastUpdateResult();
  const [isUpdating, setIsUpdating] = reactExports.useState(false);
  const handleManualUpdate = async () => {
    setIsUpdating(true);
    try {
      const filesToUpdate = [
        "djProfiles",
        "programSchedule",
        "nowPlaying",
        "songRequests",
        "themeSettings"
      ];
      const result = await runManualUpdate.mutateAsync(filesToUpdate);
      if (result.updateFailed) {
        ue.error(`Update failed: ${result.resultText}`);
      } else {
        ue.success("Manual update completed successfully!");
      }
    } catch (error) {
      console.error("Error running manual update:", error);
      ue.error(error.message || "Failed to run manual update");
    } finally {
      setIsUpdating(false);
    }
  };
  const formatUpdateTime = (timestamp) => {
    const date = new Date(Number(timestamp) / 1e6);
    return date.toLocaleString();
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(ProtectedRoute, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 py-12", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-4xl font-bold text-christmas-dark mb-2 font-christmas", children: "Admin Dashboard" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-600", children: "Manage your Christmas radio station" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "bg-white/95 backdrop-blur-sm border-christmas-gold border-2 shadow-xl mb-8", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-bold text-christmas-dark font-christmas mb-1", children: "Manual Update" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-600", children: "Trigger a manual refresh of all station data" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            onClick: handleManualUpdate,
            disabled: isUpdating,
            className: "bg-christmas-green hover:bg-christmas-green-dark",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                RefreshCw,
                {
                  className: `h-4 w-4 mr-2 ${isUpdating ? "animate-spin" : ""}`
                }
              ),
              isUpdating ? "Updating..." : "Run Update"
            ]
          }
        )
      ] }),
      lastUpdateResult && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: `mt-4 p-4 rounded-lg ${lastUpdateResult.updateFailed ? "bg-red-50 border border-red-200" : "bg-green-50 border border-green-200"}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "p",
              {
                className: `font-medium ${lastUpdateResult.updateFailed ? "text-red-800" : "text-green-800"}`,
                children: lastUpdateResult.updateFailed ? "❌ Update Failed" : "✅ Last Update"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-gray-600 mt-1", children: lastUpdateResult.resultText }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-gray-500 mt-1", children: formatUpdateTime(lastUpdateResult.updateTime) })
          ]
        }
      )
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-8", children: /* @__PURE__ */ jsxRuntimeExports.jsx(WeatherWidget, {}) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid md:grid-cols-2 lg:grid-cols-3 gap-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/admin/manage-djs", className: "block group", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "bg-white/95 backdrop-blur-sm border-christmas-red border-2 hover:shadow-xl transition-all hover:scale-105", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4 mb-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-12 w-12 rounded-full bg-christmas-red flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "h-6 w-6 text-white" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xl font-bold text-christmas-dark font-christmas", children: "Manage DJs" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-600", children: "Add, edit, or remove DJ profiles and photos" })
      ] }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/admin/manage-programs", className: "block group", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "bg-white/95 backdrop-blur-sm border-christmas-green border-2 hover:shadow-xl transition-all hover:scale-105", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4 mb-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-12 w-12 rounded-full bg-christmas-green flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "h-6 w-6 text-white" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xl font-bold text-christmas-dark font-christmas", children: "Manage Programs" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-600", children: "Update your program schedule and show times" })
      ] }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/admin/manage-now-playing", className: "block group", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "bg-white/95 backdrop-blur-sm border-christmas-gold border-2 hover:shadow-xl transition-all hover:scale-105", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4 mb-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-12 w-12 rounded-full bg-christmas-gold flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Music, { className: "h-6 w-6 text-christmas-red" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xl font-bold text-christmas-dark font-christmas", children: "Now Playing" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-600", children: "Update the currently playing song information" })
      ] }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/admin/manage-theme", className: "block group", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "bg-white/95 backdrop-blur-sm border-christmas-red border-2 hover:shadow-xl transition-all hover:scale-105", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4 mb-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-12 w-12 rounded-full bg-christmas-red flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Palette, { className: "h-6 w-6 text-white" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xl font-bold text-christmas-dark font-christmas", children: "Theme Settings" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-600", children: "Customize colors, backgrounds, and effects" })
      ] }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/admin/manage-song-requests", className: "block group", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "bg-white/95 backdrop-blur-sm border-christmas-green border-2 hover:shadow-xl transition-all hover:scale-105", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4 mb-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-12 w-12 rounded-full bg-christmas-green flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-6 w-6 text-white" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xl font-bold text-christmas-dark font-christmas", children: "Song Requests" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-600", children: "View and manage listener song requests" })
      ] }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/admin/manage-on-air", className: "block group", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "bg-white/95 backdrop-blur-sm border-christmas-gold border-2 hover:shadow-xl transition-all hover:scale-105", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4 mb-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-12 w-12 rounded-full bg-christmas-gold flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Mic, { className: "h-6 w-6 text-christmas-red" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xl font-bold text-christmas-dark font-christmas", children: "On Air Display" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-600", children: "Control what's shown in the On Air section" })
      ] }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/admin/manage-station-info", className: "block group", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "bg-white/95 backdrop-blur-sm border-christmas-red border-2 hover:shadow-xl transition-all hover:scale-105", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4 mb-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-12 w-12 rounded-full bg-christmas-red flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "h-6 w-6 text-white" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xl font-bold text-christmas-dark font-christmas", children: "Station Info" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-600", children: "Update station information and about content" })
      ] }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/admin/manage-blog", className: "block group", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "bg-white/95 backdrop-blur-sm border-christmas-green border-2 hover:shadow-xl transition-all hover:scale-105", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4 mb-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-12 w-12 rounded-full bg-christmas-green flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "h-6 w-6 text-white" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xl font-bold text-christmas-dark font-christmas", children: "Blog Posts" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-600", children: "Create and publish posts for the station blog" })
      ] }) }) })
    ] })
  ] }) });
}
export {
  AdminDashboard as default
};
