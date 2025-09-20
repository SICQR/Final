"use client";

import { useState, useEffect } from "react";

interface UserPreferences {
  theme: "dark" | "light" | "auto";
  keyboardShortcuts: boolean;
  animations: boolean;
  tabCompletion: boolean;
  fontSize: "small" | "medium" | "large";
}

const defaultPreferences: UserPreferences = {
  theme: "dark",
  keyboardShortcuts: true,
  animations: true,
  tabCompletion: true,
  fontSize: "medium",
};

export default function UserPreferences() {
  const [isOpen, setIsOpen] = useState(false);
  const [preferences, setPreferences] = useState<UserPreferences>(defaultPreferences);

  useEffect(() => {
    // Load preferences from localStorage
    const saved = localStorage.getItem("hotmess-preferences");
    if (saved) {
      try {
        setPreferences({ ...defaultPreferences, ...JSON.parse(saved) });
      } catch (error) {
        console.error("Failed to load preferences:", error);
      }
    }
  }, []);

  useEffect(() => {
    // Listen for preferences command
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === "P") {
        e.preventDefault();
        setIsOpen(true);
      }
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };

    const handleOpenPreferences = () => {
      setIsOpen(true);
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("open-preferences", handleOpenPreferences);
    
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("open-preferences", handleOpenPreferences);
    };
  }, [isOpen]);

  const updatePreference = <K extends keyof UserPreferences>(
    key: K,
    value: UserPreferences[K]
  ) => {
    const newPreferences = { ...preferences, [key]: value };
    setPreferences(newPreferences);
    localStorage.setItem("hotmess-preferences", JSON.stringify(newPreferences));
    
    // Apply theme changes immediately
    if (key === "theme") {
      applyTheme(value as string);
    }
  };

  const applyTheme = (theme: string) => {
    if (theme === "light") {
      document.documentElement.classList.add("light");
    } else {
      document.documentElement.classList.remove("light");
    }
  };

  const resetPreferences = () => {
    setPreferences(defaultPreferences);
    localStorage.removeItem("hotmess-preferences");
    applyTheme("dark");
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm">
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-md">
        <div className="bg-gray-900 border border-gray-700 rounded-lg shadow-2xl overflow-hidden">
          <div className="p-4 border-b border-gray-700">
            <h2 className="text-lg font-heading font-bold text-white">Preferences</h2>
            <p className="text-sm text-gray-400">Customize your HOTMESS experience</p>
          </div>

          <div className="p-4 space-y-6">
            {/* Theme */}
            <div>
              <label className="block text-sm font-medium text-white mb-2">Theme</label>
              <select
                value={preferences.theme}
                onChange={(e) => updatePreference("theme", e.target.value as "dark" | "light" | "auto")}
                className="w-full bg-gray-800 border border-gray-600 rounded px-3 py-2 text-white"
              >
                <option value="dark">Dark</option>
                <option value="light">Light</option>
                <option value="auto">Auto</option>
              </select>
            </div>

            {/* Font Size */}
            <div>
              <label className="block text-sm font-medium text-white mb-2">Font Size</label>
              <select
                value={preferences.fontSize}
                onChange={(e) => updatePreference("fontSize", e.target.value as "small" | "medium" | "large")}
                className="w-full bg-gray-800 border border-gray-600 rounded px-3 py-2 text-white"
              >
                <option value="small">Small</option>
                <option value="medium">Medium</option>
                <option value="large">Large</option>
              </select>
            </div>

            {/* Keyboard Shortcuts */}
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-medium text-white">Keyboard Shortcuts</div>
                <div className="text-xs text-gray-400">Enable keyboard navigation</div>
              </div>
              <button
                onClick={() => updatePreference("keyboardShortcuts", !preferences.keyboardShortcuts)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  preferences.keyboardShortcuts ? "bg-hotpink" : "bg-gray-600"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    preferences.keyboardShortcuts ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
            </div>

            {/* Tab Completion */}
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-medium text-white">Tab Completion</div>
                <div className="text-xs text-gray-400">Enable tab key to open command palette</div>
              </div>
              <button
                onClick={() => updatePreference("tabCompletion", !preferences.tabCompletion)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  preferences.tabCompletion ? "bg-hotpink" : "bg-gray-600"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    preferences.tabCompletion ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
            </div>

            {/* Animations */}
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-medium text-white">Animations</div>
                <div className="text-xs text-gray-400">Enable interface animations</div>
              </div>
              <button
                onClick={() => updatePreference("animations", !preferences.animations)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  preferences.animations ? "bg-hotpink" : "bg-gray-600"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    preferences.animations ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
            </div>
          </div>

          <div className="p-4 bg-gray-800 border-t border-gray-700 flex justify-between">
            <button
              onClick={resetPreferences}
              className="text-sm text-gray-400 hover:text-white transition-colors"
            >
              Reset to defaults
            </button>
            <button
              onClick={() => setIsOpen(false)}
              className="btn-primary text-sm px-4 py-2"
            >
              Done
            </button>
          </div>

          <div className="px-4 pb-3 text-xs text-gray-400 text-center">
            Press <kbd className="px-1 bg-gray-700 rounded">Ctrl</kbd> + 
            <kbd className="px-1 bg-gray-700 rounded">Shift</kbd> + 
            <kbd className="px-1 bg-gray-700 rounded">P</kbd> to open preferences
          </div>
        </div>
      </div>
    </div>
  );
}