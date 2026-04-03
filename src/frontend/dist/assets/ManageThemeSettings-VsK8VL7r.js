import { r as reactExports, g as useComposedRefs, d as useControllableState, j as jsxRuntimeExports, e as createContextScope, P as Primitive, f as composeEventHandlers, h as cn, N as useNavigate, i as useGetThemeSettings, O as useUpdateThemeSettings, Q as BackgroundImage, T as TailwindColor, B as Button, m as Label, n as ue } from "./index-CQfh0D_0.js";
import { C as Card } from "./card-cUM_Zaul.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-DbV3vX4c.js";
import { d as usePrevious, b as useSize } from "./index-iM4Bt8Hw.js";
import { P as ProtectedRoute } from "./ProtectedRoute-C6eVQGRx.js";
import { A as ArrowLeft } from "./arrow-left-Ce2zt5Zu.js";
import { P as Palette } from "./palette-CIjD4T-3.js";
import { E as Eye } from "./eye-C7OMq__g.js";
import { S as Save } from "./save-mPM-iRRI.js";
var SWITCH_NAME = "Switch";
var [createSwitchContext] = createContextScope(SWITCH_NAME);
var [SwitchProvider, useSwitchContext] = createSwitchContext(SWITCH_NAME);
var Switch$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const {
      __scopeSwitch,
      name,
      checked: checkedProp,
      defaultChecked,
      required,
      disabled,
      value = "on",
      onCheckedChange,
      form,
      ...switchProps
    } = props;
    const [button, setButton] = reactExports.useState(null);
    const composedRefs = useComposedRefs(forwardedRef, (node) => setButton(node));
    const hasConsumerStoppedPropagationRef = reactExports.useRef(false);
    const isFormControl = button ? form || !!button.closest("form") : true;
    const [checked, setChecked] = useControllableState({
      prop: checkedProp,
      defaultProp: defaultChecked ?? false,
      onChange: onCheckedChange,
      caller: SWITCH_NAME
    });
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(SwitchProvider, { scope: __scopeSwitch, checked, disabled, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Primitive.button,
        {
          type: "button",
          role: "switch",
          "aria-checked": checked,
          "aria-required": required,
          "data-state": getState(checked),
          "data-disabled": disabled ? "" : void 0,
          disabled,
          value,
          ...switchProps,
          ref: composedRefs,
          onClick: composeEventHandlers(props.onClick, (event) => {
            setChecked((prevChecked) => !prevChecked);
            if (isFormControl) {
              hasConsumerStoppedPropagationRef.current = event.isPropagationStopped();
              if (!hasConsumerStoppedPropagationRef.current) event.stopPropagation();
            }
          })
        }
      ),
      isFormControl && /* @__PURE__ */ jsxRuntimeExports.jsx(
        SwitchBubbleInput,
        {
          control: button,
          bubbles: !hasConsumerStoppedPropagationRef.current,
          name,
          value,
          checked,
          required,
          disabled,
          form,
          style: { transform: "translateX(-100%)" }
        }
      )
    ] });
  }
);
Switch$1.displayName = SWITCH_NAME;
var THUMB_NAME = "SwitchThumb";
var SwitchThumb = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeSwitch, ...thumbProps } = props;
    const context = useSwitchContext(THUMB_NAME, __scopeSwitch);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Primitive.span,
      {
        "data-state": getState(context.checked),
        "data-disabled": context.disabled ? "" : void 0,
        ...thumbProps,
        ref: forwardedRef
      }
    );
  }
);
SwitchThumb.displayName = THUMB_NAME;
var BUBBLE_INPUT_NAME = "SwitchBubbleInput";
var SwitchBubbleInput = reactExports.forwardRef(
  ({
    __scopeSwitch,
    control,
    checked,
    bubbles = true,
    ...props
  }, forwardedRef) => {
    const ref = reactExports.useRef(null);
    const composedRefs = useComposedRefs(ref, forwardedRef);
    const prevChecked = usePrevious(checked);
    const controlSize = useSize(control);
    reactExports.useEffect(() => {
      const input = ref.current;
      if (!input) return;
      const inputProto = window.HTMLInputElement.prototype;
      const descriptor = Object.getOwnPropertyDescriptor(
        inputProto,
        "checked"
      );
      const setChecked = descriptor.set;
      if (prevChecked !== checked && setChecked) {
        const event = new Event("click", { bubbles });
        setChecked.call(input, checked);
        input.dispatchEvent(event);
      }
    }, [prevChecked, checked, bubbles]);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "input",
      {
        type: "checkbox",
        "aria-hidden": true,
        defaultChecked: checked,
        ...props,
        tabIndex: -1,
        ref: composedRefs,
        style: {
          ...props.style,
          ...controlSize,
          position: "absolute",
          pointerEvents: "none",
          opacity: 0,
          margin: 0
        }
      }
    );
  }
);
SwitchBubbleInput.displayName = BUBBLE_INPUT_NAME;
function getState(checked) {
  return checked ? "checked" : "unchecked";
}
var Root = Switch$1;
var Thumb = SwitchThumb;
function Switch({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Root,
    {
      "data-slot": "switch",
      className: cn(
        "peer data-[state=checked]:bg-primary data-[state=unchecked]:bg-input focus-visible:border-ring focus-visible:ring-ring/50 dark:data-[state=unchecked]:bg-input/80 inline-flex h-[1.15rem] w-8 shrink-0 items-center rounded-full border border-transparent shadow-xs transition-all outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50",
        className
      ),
      ...props,
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        Thumb,
        {
          "data-slot": "switch-thumb",
          className: cn(
            "bg-background dark:data-[state=unchecked]:bg-foreground dark:data-[state=checked]:bg-primary-foreground pointer-events-none block size-4 rounded-full ring-0 transition-transform data-[state=checked]:translate-x-[calc(100%-2px)] data-[state=unchecked]:translate-x-0"
          )
        }
      )
    }
  );
}
function ManageThemeSettings() {
  var _a, _b, _c, _d, _e;
  const navigate = useNavigate();
  const { data: themeSettings, isLoading } = useGetThemeSettings();
  const updateThemeSettings = useUpdateThemeSettings();
  const [showCountdown, setShowCountdown] = reactExports.useState(true);
  const [showNewsFeed, setShowNewsFeed] = reactExports.useState(true);
  const [snowEnabled, setSnowEnabled] = reactExports.useState(true);
  const [backgroundImage, setBackgroundImage] = reactExports.useState(
    BackgroundImage.snowyVillage
  );
  const [primaryColor, setPrimaryColor] = reactExports.useState(
    TailwindColor.red
  );
  const [accentColor, setAccentColor] = reactExports.useState(
    TailwindColor.gold
  );
  const [isPreview, setIsPreview] = reactExports.useState(false);
  reactExports.useEffect(() => {
    if (themeSettings) {
      setShowCountdown(themeSettings.showCountdown);
      setShowNewsFeed(themeSettings.showNewsFeed);
      setSnowEnabled(themeSettings.snowEnabled);
      setBackgroundImage(themeSettings.backgroundImage);
      setPrimaryColor(themeSettings.primaryColor);
      setAccentColor(themeSettings.accentColor);
    }
  }, [themeSettings]);
  const handleSave = async () => {
    try {
      await updateThemeSettings.mutateAsync({
        showCountdown,
        showNewsFeed,
        snowEnabled,
        backgroundImage,
        primaryColor,
        accentColor
      });
      ue.success("Theme settings saved successfully!");
      setIsPreview(false);
    } catch (error) {
      console.error("Error saving theme settings:", error);
      ue.error("Failed to save theme settings");
    }
  };
  const handlePreview = () => {
    setIsPreview(true);
    ue.info("Preview mode enabled. Changes are not saved yet.");
  };
  const backgroundImageOptions = [
    {
      value: BackgroundImage.snowyVillage,
      label: "Snowy Village",
      image: "/assets/generated/snowy-village-background.dim_1920x1080.jpg"
    },
    {
      value: BackgroundImage.twinklingLights,
      label: "Twinkling Lights",
      image: "/assets/generated/twinkling-lights-background.dim_1920x1080.jpg"
    },
    {
      value: BackgroundImage.festiveTree,
      label: "Festive Tree",
      image: "/assets/generated/festive-tree-background.dim_1920x1080.jpg"
    }
  ];
  const colorOptions = [
    { value: TailwindColor.red, label: "Red", color: "oklch(0.52 0.22 25)" },
    {
      value: TailwindColor.green,
      label: "Green",
      color: "oklch(0.48 0.18 155)"
    },
    { value: TailwindColor.gold, label: "Gold", color: "oklch(0.78 0.15 85)" },
    { value: TailwindColor.blue, label: "Blue", color: "oklch(0.55 0.20 250)" },
    {
      value: TailwindColor.purple,
      label: "Purple",
      color: "oklch(0.55 0.20 300)"
    },
    {
      value: TailwindColor.brown,
      label: "Brown",
      color: "oklch(0.45 0.10 50)"
    },
    {
      value: TailwindColor.white,
      label: "White",
      color: "oklch(0.95 0.02 85)"
    }
  ];
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(ProtectedRoute, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container mx-auto px-4 py-12", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-center text-gray-600", children: "Loading theme settings..." }) }) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(ProtectedRoute, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 py-12", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-8 flex items-center justify-between", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          variant: "ghost",
          onClick: () => navigate({ to: "/admin" }),
          className: "mb-4 text-christmas-red hover:text-christmas-red-dark",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "mr-2 h-4 w-4" }),
            "Back to Dashboard"
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-4xl font-bold text-christmas-dark font-christmas", children: "🎨 Christmas Theme Settings" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-600 mt-2", children: "Customize the look and feel of your Christmas Channel" })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid lg:grid-cols-2 gap-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "bg-white/95 backdrop-blur-sm border-christmas-gold border-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-2xl font-bold text-christmas-dark mb-6 font-christmas flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Palette, { className: "h-6 w-6 text-christmas-gold" }),
          "Theme Configuration"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between p-4 bg-gray-50 rounded-lg", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Label,
                {
                  htmlFor: "snow-toggle",
                  className: "text-base font-semibold text-christmas-dark",
                  children: "Snow Effects"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-gray-600 mt-1", children: "Enable or disable animated snowfall" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Switch,
              {
                id: "snow-toggle",
                checked: snowEnabled,
                onCheckedChange: setSnowEnabled
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between p-4 bg-gray-50 rounded-lg", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Label,
                {
                  htmlFor: "countdown-toggle",
                  className: "text-base font-semibold text-christmas-dark",
                  children: "Christmas Countdown"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-gray-600 mt-1", children: "Show countdown timer on homepage" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Switch,
              {
                id: "countdown-toggle",
                checked: showCountdown,
                onCheckedChange: setShowCountdown
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between p-4 bg-gray-50 rounded-lg", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Label,
                {
                  htmlFor: "newsfeed-toggle",
                  className: "text-base font-semibold text-christmas-dark",
                  children: "News Feed"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-gray-600 mt-1", children: "Show news feed on homepage" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Switch,
              {
                id: "newsfeed-toggle",
                checked: showNewsFeed,
                onCheckedChange: setShowNewsFeed
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 bg-gray-50 rounded-lg", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-base font-semibold text-christmas-dark mb-3 block", children: "Background Image" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Select,
              {
                value: backgroundImage,
                onValueChange: (value) => setBackgroundImage(value),
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { className: "w-full", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Select background" }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: backgroundImageOptions.map((option) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: option.value, children: option.label }, option.value)) })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-3 grid grid-cols-3 gap-2", children: backgroundImageOptions.map((option) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                type: "button",
                onClick: () => setBackgroundImage(option.value),
                className: `relative rounded-lg overflow-hidden border-2 transition-all ${backgroundImage === option.value ? "border-christmas-gold ring-2 ring-christmas-gold" : "border-gray-300 hover:border-christmas-gold"}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "img",
                    {
                      src: option.image,
                      alt: option.label,
                      className: "w-full h-20 object-cover"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-black/20 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white text-xs font-semibold", children: option.label }) })
                ]
              },
              option.value
            )) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 bg-gray-50 rounded-lg", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-base font-semibold text-christmas-dark mb-3 block", children: "Primary Color" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Select,
              {
                value: primaryColor,
                onValueChange: (value) => setPrimaryColor(value),
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { className: "w-full", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Select primary color" }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: colorOptions.map((option) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: option.value, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "div",
                      {
                        className: "w-4 h-4 rounded-full border border-gray-300",
                        style: { backgroundColor: option.color }
                      }
                    ),
                    option.label
                  ] }) }, option.value)) })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-3 flex gap-2", children: colorOptions.map((option) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: () => setPrimaryColor(option.value),
                className: `w-10 h-10 rounded-full border-2 transition-all ${primaryColor === option.value ? "border-christmas-dark ring-2 ring-christmas-gold" : "border-gray-300 hover:border-christmas-gold"}`,
                style: { backgroundColor: option.color },
                title: option.label
              },
              option.value
            )) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 bg-gray-50 rounded-lg", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-base font-semibold text-christmas-dark mb-3 block", children: "Accent Color" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Select,
              {
                value: accentColor,
                onValueChange: (value) => setAccentColor(value),
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { className: "w-full", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Select accent color" }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: colorOptions.map((option) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: option.value, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "div",
                      {
                        className: "w-4 h-4 rounded-full border border-gray-300",
                        style: { backgroundColor: option.color }
                      }
                    ),
                    option.label
                  ] }) }, option.value)) })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-3 flex gap-2", children: colorOptions.map((option) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: () => setAccentColor(option.value),
                className: `w-10 h-10 rounded-full border-2 transition-all ${accentColor === option.value ? "border-christmas-dark ring-2 ring-christmas-gold" : "border-gray-300 hover:border-christmas-gold"}`,
                style: { backgroundColor: option.color },
                title: option.label
              },
              option.value
            )) })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 mt-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              onClick: handlePreview,
              variant: "outline",
              className: "flex-1 border-christmas-gold text-christmas-gold hover:bg-christmas-gold hover:text-white",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "mr-2 h-4 w-4" }),
                "Preview"
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              onClick: handleSave,
              disabled: updateThemeSettings.isPending,
              className: "flex-1 bg-christmas-red hover:bg-christmas-red-dark",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Save, { className: "mr-2 h-4 w-4" }),
                updateThemeSettings.isPending ? "Saving..." : "Save Changes"
              ]
            }
          )
        ] })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "bg-white/95 backdrop-blur-sm border-christmas-green border-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-2xl font-bold text-christmas-dark mb-6 font-christmas flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "h-6 w-6 text-christmas-green" }),
          "Live Preview"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
          isPreview && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-blue-50 border border-blue-200 rounded-lg p-3 text-sm text-blue-800", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Preview Mode:" }),
            ' Changes shown below are not saved yet. Click "Save Changes" to apply.'
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-lg overflow-hidden border-2 border-gray-300", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "h-48 relative",
              style: {
                backgroundImage: `url(${(_a = backgroundImageOptions.find((opt) => opt.value === backgroundImage)) == null ? void 0 : _a.image})`,
                backgroundSize: "cover",
                backgroundPosition: "center"
              },
              children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-b from-black/30 to-black/50 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white font-bold text-lg", children: "Background Preview" }) })
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "p-4 rounded-lg border-2",
                style: {
                  borderColor: (_b = colorOptions.find(
                    (opt) => opt.value === primaryColor
                  )) == null ? void 0 : _b.color
                },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-gray-700 mb-2", children: "Primary Color" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      className: "h-16 rounded-lg",
                      style: {
                        backgroundColor: (_c = colorOptions.find(
                          (opt) => opt.value === primaryColor
                        )) == null ? void 0 : _c.color
                      }
                    }
                  )
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "p-4 rounded-lg border-2",
                style: {
                  borderColor: (_d = colorOptions.find(
                    (opt) => opt.value === accentColor
                  )) == null ? void 0 : _d.color
                },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-gray-700 mb-2", children: "Accent Color" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      className: "h-16 rounded-lg",
                      style: {
                        backgroundColor: (_e = colorOptions.find(
                          (opt) => opt.value === accentColor
                        )) == null ? void 0 : _e.color
                      }
                    }
                  )
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between p-3 bg-gray-50 rounded-lg", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium text-gray-700", children: "Snow Effects" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: `text-sm font-semibold ${snowEnabled ? "text-green-600" : "text-gray-400"}`,
                  children: snowEnabled ? "✓ Enabled" : "✗ Disabled"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between p-3 bg-gray-50 rounded-lg", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium text-gray-700", children: "Christmas Countdown" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: `text-sm font-semibold ${showCountdown ? "text-green-600" : "text-gray-400"}`,
                  children: showCountdown ? "✓ Visible" : "✗ Hidden"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between p-3 bg-gray-50 rounded-lg", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium text-gray-700", children: "News Feed" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: `text-sm font-semibold ${showNewsFeed ? "text-green-600" : "text-gray-400"}`,
                  children: showNewsFeed ? "✓ Visible" : "✗ Hidden"
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-christmas-gold/10 border border-christmas-gold rounded-lg p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-christmas-dark", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Note:" }),
            " Theme changes will be applied across all pages of the website once saved. Visitors will see the new theme immediately."
          ] }) })
        ] })
      ] }) })
    ] })
  ] }) });
}
export {
  ManageThemeSettings as default
};
