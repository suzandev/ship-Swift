import { useEffect, useState } from "react";

const useTheme = () => {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const root = window.document.documentElement;
    if (dark) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [dark]);

  return [dark, setDark];
};

export default useTheme;
