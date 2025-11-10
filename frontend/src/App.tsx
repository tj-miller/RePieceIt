import React, { useState } from "react";

export default function ThemeDemo() {
  const [dark, setDark] = useState(false);

  const toggleTheme = () => {
    document.documentElement.classList.toggle("dark");
    setDark(!dark);
  };

  return (
    <div className="min-h-screen bg-surface text-text flex flex-col items-center justify-center transition-colors duration-std ease-smooth px-6 py-15 font-sans">
      {/* Card container */}
      <div className="w-full max-w-2xl bg-surface border border-border rounded-xl shadow-md p-8 transition-all duration-std ease-smooth">
        <h1 className="text-4xl font-bold mb-2 tracking-tight">
          Tailwind Theme Demo
        </h1>
        <p className="text-text-muted mb-8">
          A showcase of your design tokens — colors, fonts, borders, radii,
          shadows, and transitions.
        </p>

        {/* Buttons row */}
        <div className="flex flex-wrap gap-3 mb-10">
          <button className="bg-primary text-white px-4 py-2 rounded-md shadow-sm hover:bg-primary/85 transition-colors duration-fast ease-smooth">
            Primary
          </button>
          <button className="bg-accent text-white px-4 py-2 rounded-md shadow-sm hover:bg-accent/85 transition-colors duration-fast ease-smooth">
            Accent
          </button>
          <button className="bg-success text-white px-4 py-2 rounded-md shadow-sm hover:bg-success/85 transition-colors duration-fast ease-smooth">
            Success
          </button>
          <button className="bg-warn text-white px-4 py-2 rounded-md shadow-sm hover:bg-warn/85 transition-colors duration-fast ease-smooth">
            Warning
          </button>
          <button className="bg-error text-white px-4 py-2 rounded-md shadow-sm hover:bg-error/85 transition-colors duration-fast ease-smooth">
            Error
          </button>
        </div>

        {/* Border & radius showcase */}
        <div className="grid grid-cols-3 gap-6 mb-10">
          <div className="h-16 border border-border rounded-sm shadow-sm flex items-center justify-center text-xs text-text-muted">
            rounded-sm
          </div>
          <div className="h-16 border border-border rounded-lg shadow-md flex items-center justify-center text-xs text-text-muted">
            rounded-lg
          </div>
          <div className="h-16 border border-border rounded-2xl shadow-lg flex items-center justify-center text-xs text-text-muted">
            rounded-2xl
          </div>
        </div>

        {/* Font demo */}
        <div className="space-y-3 mb-10">
          <p className="text-base">
            This paragraph uses <strong>Inter</strong>, your primary sans font.
          </p>
          <p className="font-mono text-sm">
            And this line uses <strong>JetBrains Mono</strong> for code or UI
            elements.
          </p>
          <div className="border border-border rounded-md p-3 mt-2 bg-surface/50">
            <code className="font-mono text-xs">
              const toggleTheme = () =&gt;
              document.documentElement.classList.toggle("dark");
            </code>
          </div>
        </div>

        {/* Shadow depth examples */}
        <div className="flex gap-6 mb-10">
          <div className="h-12 w-20 rounded-md bg-surface border border-border shadow-sm flex items-center justify-center text-[10px] text-text-muted">
            shadow-sm
          </div>
          <div className="h-12 w-20 rounded-md bg-surface border border-border shadow-md flex items-center justify-center text-[10px] text-text-muted">
            shadow-md
          </div>
          <div className="h-12 w-20 rounded-md bg-surface border border-border shadow-lg flex items-center justify-center text-[10px] text-text-muted">
            shadow-lg
          </div>
        </div>

        {/* Theme toggle */}
        <div className="flex items-center justify-between border-t border-border pt-6">
          <p className="text-text-muted">
            The current theme is <strong>{dark ? "Dark" : "Light"}</strong>.
          </p>
          <button
            onClick={toggleTheme}
            className="px-4 py-2 border border-border rounded-md font-medium hover:bg-surface/80 transition-colors duration-fast ease-smooth"
          >
            Toggle Theme
          </button>
        </div>
      </div>
    </div>
  );
}
