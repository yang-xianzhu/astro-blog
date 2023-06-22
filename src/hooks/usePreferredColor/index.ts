import { useState, useEffect } from "preact/hooks";
import { localStorageKey } from "src/constant/key";

export const MediaQuery = "(prefers-color-scheme: dark)";

// 获取当前系统主题色
export const usePreferredColor = () => {
  const [isDark, setDark] = useState(true);

  const changeLocalStorageTheme = () => {
    const isDark = window.matchMedia(MediaQuery).matches;
    const t = isDark ? "dark" : "light";

    setDark(() => isDark);
    localStorage.setItem(localStorageKey.THEME_KEY, t);
  };

  const update = () => {
    changeLocalStorageTheme();
    setDark(() => window.matchMedia(MediaQuery).matches);
    localStorage.setItem(localStorageKey.IS_AUTO, "false");
  };

  useEffect(() => {
    changeLocalStorageTheme();
    window.matchMedia(MediaQuery).addEventListener("change", update);
    return () => {
      window.matchMedia(MediaQuery).removeEventListener("change", update);
    };
  }, []);

  return {
    isDark,
    setDark,
  };
};
