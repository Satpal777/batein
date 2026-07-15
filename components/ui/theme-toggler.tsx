"use client";
 
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { MoonIcon, SunIcon } from "@phosphor-icons/react";
  
const STARS = [
  { top: 8, left: 10, s: 2 },
  { top: 20, left: 22, s: 1.5 },
  { top: 13, left: 30, s: 1 },
  { top: 26, left: 14, s: 1 },
];
 
export default function ThemeToggler() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
 
  const dark = resolvedTheme === "dark";
 
  if (!mounted) {
    return (
      <button
        aria-label="Toggle dark mode"
        className="invisible h-[38px] w-[76px] rounded-full"
      />
    );
  }
 
  return (
    <button
      role="switch"
      aria-checked={dark}
      aria-label="Toggle dark mode"
      onClick={() => setTheme(dark ? "light" : "dark")}
      className={[
        "relative h-[40px] w-[76px] rounded-full border p-0",
        "cursor-pointer [-webkit-tap-highlight-color:transparent]",
        "transition-colors duration-500",
        "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-[#c9f31d]",
        dark ? "border-[#262626] bg-[#1c1c1c]" : "border-[#d6d6cf] bg-[#e6e6e0]",
      ].join(" ")}
    >
      {/* ambient stars — visible in dark, fade out in light */}
      <span
        aria-hidden
        className={[
          "absolute inset-0 overflow-hidden rounded-full transition-opacity duration-[400ms]",
          dark ? "opacity-100" : "opacity-0",
        ].join(" ")}
      >
        {STARS.map((st, i) => (
          <span
            key={i}
            className="absolute rounded-full bg-[#ededed] opacity-70"
            style={{ top: st.top, left: st.left, width: st.s, height: st.s }}
          />
        ))}
      </span>
 
      {/* sliding thumb */}
      <span
        aria-hidden
        className={[
          "absolute left-[3px] top-[3px] grid h-[30px] w-[30px] place-items-center rounded-full",
          "shadow-[0_2px_8px_rgba(0,0,0,0.35)]",
          "transition-[transform,background-color] duration-[420ms] ease-[cubic-bezier(0.34,1.56,0.64,1)]",
          "motion-reduce:transition-none",
          dark
            ? "translate-x-[38px] bg-[#c9f31d] text-[#0a0a0a]"
            : "translate-x-0 bg-[#0a0a0a] text-[#f4f4f0]",
        ].join(" ")}
      >

        <span
          className={[
            "absolute grid place-items-center transition-all duration-[420ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] motion-reduce:transition-none",
            dark ? "rotate-180 scale-[0.4] opacity-0" : "rotate-0 scale-100 opacity-100",
          ].join(" ")}
        >
          <SunIcon className="w-[18px] h-[18px]" />
        </span>
        
        <span
          className={[
            "absolute grid place-items-center transition-all duration-[420ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] motion-reduce:transition-none",
            dark ? "rotate-0 scale-100 opacity-100" : "-rotate-180 scale-[0.4] opacity-0",
          ].join(" ")}
        >
          <MoonIcon className="w-[18px] h-[18px]" />
        </span>
      </span>
    </button>
  );
}