import { night } from "./night";
import { day } from "./day";

export default function themeLibrary(theme) {
  const themes = {
    day: day,
    night: night,
  };
  return themes[theme];
}
