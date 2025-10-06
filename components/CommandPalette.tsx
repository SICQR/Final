"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface Command {
  id: string;
  title: string;
  description: string;
  href?: string;
  action?: () => void;
  category: string;
}

export default function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [showPreferences, setShowPreferences] = useState(false);
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  const commands: Command[] = [
    // Navigation Commands
    { id: "nav-home", title: "Home", description: "Go to homepage", href: "/", category: "Navigation" },
    { id: "nav-radio", title: "Radio", description: "Listen to HOTMESS Radio", href: "/radio", category: "Navigation" },
    { id: "nav-shop", title: "Shop", description: "Browse drops and merchandise", href: "/shop", category: "Navigation" },
    { id: "nav-about", title: "About", description: "Learn about HOTMESS", href: "/about", category: "Navigation" },
    { id: "nav-affiliate", title: "Affiliate", description: "Join the affiliate program", href: "/affiliate", category: "Navigation" },
    { id: "nav-admin", title: "Admin", description: "Access admin dashboard", href: "/admin", category: "Navigation" },
    
    // Actions
    { id: "action-search", title: "Search", description: "Search the site", category: "Actions" },
    { 
      id: "action-preferences", 
      title: "Preferences", 
      description: "Customize settings and options", 
      action: () => {
        // Trigger preferences modal
        document.dispatchEvent(new CustomEvent("open-preferences"));
      },
      category: "Actions" 
    },
    { 
      id: "action-shortcuts", 
      title: "Keyboard Shortcuts", 
      description: "View all keyboard shortcuts", 
      action: () => {
        // Trigger shortcuts modal by simulating ? key
        document.dispatchEvent(new KeyboardEvent("keydown", { key: "?" }));
      },
      category: "Actions" 
    },
  ];

  const filteredCommands = commands.filter(command =>
    command.title.toLowerCase().includes(query.toLowerCase()) ||
    command.description.toLowerCase().includes(query.toLowerCase())
  );

  const executeCommand = useCallback((command: Command) => {
    if (command.href) {
      router.push(command.href);
    } else if (command.action) {
      command.action();
    }
    setIsOpen(false);
    setQuery("");
    setSelectedIndex(0);
  }, [router]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Open command palette with Ctrl+K or Cmd+K
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen(true);
        return;
      }

      // Open with Tab key when not in input field
      if (e.key === "Tab" && !isOpen && document.activeElement?.tagName !== "INPUT") {
        e.preventDefault();
        setIsOpen(true);
        return;
      }

      // Close with Escape
      if (e.key === "Escape") {
        setIsOpen(false);
        setQuery("");
        setSelectedIndex(0);
        return;
      }

      // Navigation within palette
      if (isOpen) {
        if (e.key === "ArrowDown") {
          e.preventDefault();
          setSelectedIndex(prev => (prev + 1) % filteredCommands.length);
        } else if (e.key === "ArrowUp") {
          e.preventDefault();
          setSelectedIndex(prev => (prev - 1 + filteredCommands.length) % filteredCommands.length);
        } else if (e.key === "Enter") {
          e.preventDefault();
          const selectedCommand = filteredCommands[selectedIndex];
          if (selectedCommand) {
            executeCommand(selectedCommand);
          }
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, selectedIndex, filteredCommands, executeCommand]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm">
      <div className="fixed top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/4 w-full max-w-lg">
        <div className="bg-gray-900 border border-gray-700 rounded-lg shadow-2xl overflow-hidden">
          {/* Search Input */}
          <div className="p-4 border-b border-gray-700">
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Type a command or search..."
              className="w-full bg-transparent text-white placeholder-gray-400 outline-none text-lg"
            />
            <div className="mt-2 text-xs text-gray-400">
              Use ↑↓ to navigate, ↵ to select, Esc to close
            </div>
          </div>

          {/* Command List */}
          <div className="max-h-96 overflow-y-auto">
            {filteredCommands.length === 0 ? (
              <div className="p-4 text-center text-gray-400">
                No commands found for "{query}"
              </div>
            ) : (
              filteredCommands.map((command, index) => (
                <button
                  key={command.id}
                  onClick={() => executeCommand(command)}
                  className={`w-full text-left p-4 hover:bg-gray-800 transition-colors ${
                    index === selectedIndex ? "bg-gray-800 border-l-2 border-hotpink" : ""
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="text-white font-medium">{command.title}</div>
                      <div className="text-gray-400 text-sm">{command.description}</div>
                    </div>
                    <div className="text-xs text-gray-500 uppercase tracking-wide">
                      {command.category}
                    </div>
                  </div>
                </button>
              ))
            )}
          </div>

          {/* Footer */}
          <div className="p-3 bg-gray-800 border-t border-gray-700">
            <div className="flex justify-between text-xs text-gray-400">
              <span>🎮 NES-style tab completion enabled</span>
              <span>
                <kbd className="px-1 bg-gray-700 rounded">Ctrl</kbd> + <kbd className="px-1 bg-gray-700 rounded">K</kbd> to open
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}