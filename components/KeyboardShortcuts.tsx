"use client";

import { useState, useEffect } from "react";

interface KeyboardShortcut {
  key: string;
  description: string;
  combo?: string;
}

const shortcuts: KeyboardShortcut[] = [
  { key: "Ctrl + K", description: "Open command palette" },
  { key: "Tab", description: "Open command palette (when not in input)" },
  { key: "Escape", description: "Close dialogs/palette" },
  { key: "↑ ↓", description: "Navigate command palette" },
  { key: "Enter", description: "Execute selected command" },
  { key: "?", description: "Show keyboard shortcuts" },
];

export default function KeyboardShortcuts() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Show shortcuts with ? key
      if (e.key === "?" && !isOpen && document.activeElement?.tagName !== "INPUT") {
        e.preventDefault();
        setIsOpen(true);
        return;
      }

      // Close with Escape
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
        return;
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm">
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-md">
        <div className="bg-gray-900 border border-gray-700 rounded-lg shadow-2xl overflow-hidden">
          <div className="p-4 border-b border-gray-700">
            <h2 className="text-lg font-heading font-bold text-white">Keyboard Shortcuts</h2>
            <p className="text-sm text-gray-400">Navigate HOTMESS with ease</p>
          </div>

          <div className="p-4 space-y-3">
            {shortcuts.map((shortcut, index) => (
              <div key={index} className="flex justify-between items-center">
                <span className="text-gray-300">{shortcut.description}</span>
                <kbd className="px-2 py-1 bg-gray-800 border border-gray-600 rounded text-xs text-hotpink font-mono">
                  {shortcut.key}
                </kbd>
              </div>
            ))}
          </div>

          <div className="p-3 bg-gray-800 border-t border-gray-700">
            <div className="text-xs text-gray-400 text-center">
              Press <kbd className="px-1 bg-gray-700 rounded">Esc</kbd> to close
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}