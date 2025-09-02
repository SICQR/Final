"use client";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";

export type DropdownMenuItem = {
  label: string;
  href?: string;
  onClick?: () => void;
};

export default function AppDropdownMenu({ items }: { items: DropdownMenuItem[] }) {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button className="btn">Menu</button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content asChild>
        <div
          className="bg-white shadow-lg rounded"
          style={{ opacity: 1, transform: 'scale(1)', transition: 'opacity 0.3s, transform 0.3s' }}
        >
          {items.map((item, i) => (
            <DropdownMenu.Item key={i} className="px-4 py-2 hover:bg-slate-100">
              {item.label}
            </DropdownMenu.Item>
          ))}
        </div>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
}