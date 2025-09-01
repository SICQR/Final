"use client";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { motion } from "framer-motion";

export default function AppDropdownMenu({ items }) {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button className="btn">Menu</button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content asChild>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="bg-white shadow-lg rounded"
        >
          {items.map((item, i) => (
            <DropdownMenu.Item key={i} className="px-4 py-2 hover:bg-slate-100">
              {item.label}
            </DropdownMenu.Item>
          ))}
        </motion.div>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
}