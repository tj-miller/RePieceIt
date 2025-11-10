import React, { useState } from "react";

export default function ThemeDemo() {
  const [dark, setDark] = useState(false);

  const toggleTheme = () => {
    document.documentElement.classList.toggle("dark");
    setDark(!dark);
  };

  return (
    <div className="min-h-screen bg-surface text-text flex flex-col items-center justify-center transition-colors duration-300">
      <h1 className="text-3xl font-bold mb-6">Tailwind Theming Demo</h1>
      <div className="flex gap-3">
        <button className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/80">
          Primary
        </button>
        <button className="bg-accent text-white px-4 py-2 rounded-lg hover:bg-accent/80">
          Accent
        </button>
        <button className="bg-success text-white px-4 py-2 rounded-lg hover:bg-success/80">
          Success
        </button>
        <button className="bg-warn text-white px-4 py-2 rounded-lg hover:bg-warn/80">
          Warning
        </button>
        <button className="bg-error text-white px-4 py-2 rounded-lg hover:bg-error/80">
          Error
        </button>
      </div>

      <p className="text-text-muted mt-6">
        The current theme is <strong>{dark ? "Dark" : "Light"}</strong>.
      </p>

      <button
        onClick={toggleTheme}
        className="mt-4 px-3 py-2 border border-border rounded-md"
      >
        Toggle Theme
      </button>
    </div>
  );
}
