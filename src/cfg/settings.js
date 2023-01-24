import Setting from "@/classes/Setting";
import { SETTINGS as guiSettings } from "@/controller/GUI";

export const SETTINGS = {
  general: {
    name: "General",
    icon: "cog",
    settings: [
      new Setting({ 
        name: "Theme",
        isDropDown: true, 
        dropDownList: ["Light", " Dark"]
    })]
  },
  machine: {
    name: "Machine",
    icon: "server",
    settings: guiSettings
  },
  cloud: {
    name: "PPM Cloud",
    icon: "cloud-upload",
    settings: [new Setting({ name: "Theme" })]
  },
  advanced: {
    name: "Advanced",
    icon: "database",
    settings: [new Setting({ name: "Need to work on it"})]
  },
  reset: {
    name: "Reset",
    icon: "trash",
    settings: [
      new Setting({
        name: "Refresh app",
        isButton: true,
        buttonAction: "refreshApp"
      }),
      new Setting({
        name: "Reset all settings and shortcuts",
        isButton: true,
        buttonAction: "openConfirmationOfResetPopUp"
      }),
      new Setting({ name: "Reset all shortcuts",
        isButton: true,
        buttonAction: "refreshAllShortCut"
      })
    ]
  }
};
