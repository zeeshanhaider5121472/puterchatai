// "use client";

// import { createContext, useContext, useEffect, useState } from "react";

// type Theme = "dark" | "light";

// const ThemeContext = createContext({
//   theme: "dark" as Theme,
//   toggleTheme: () => {},
// });

// export const useTheme = () => useContext(ThemeContext);

// export function ThemeProvider({ children }: { children: React.ReactNode }) {
//   const [theme, setTheme] = useState<Theme>("dark");

//   useEffect(() => {
//     const savedTheme = localStorage.getItem("theme") as Theme || "dark";
//     setTheme(savedTheme);
//     document.documentElement.classList.toggle("dark", savedTheme === "dark");
//     document.body.classList.toggle("light", savedTheme === "light");
//   }, []);

//   const toggleTheme = () => {
//     const newTheme = theme === "dark" ? "light" : "dark";
//     setTheme(newTheme);
//     localStorage.setItem("theme", newTheme);
//     document.documentElement.classList.toggle("dark", newTheme === "dark");
//     document.body.classList.toggle("light", newTheme === "light");
//   };

//   return (
//     <ThemeContext.Provider value={{ theme, toggleTheme }}>
//       {children}
//     </ThemeContext.Provider>
//   );
// }