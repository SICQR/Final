"use client";

export function AppOverlay({ open, children, onCloseAction }: { open: boolean; children: React.ReactNode; onCloseAction: () => void }) {
  return (
    <>
      {open && (
        <div
          className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center"
          style={{ opacity: 1, transition: 'opacity 0.5s' }}
          onClick={onCloseAction}
        >
          <div
            className="bg-white rounded-xl p-8 shadow-xl"
            style={{ transform: 'scale(1)', transition: 'transform 0.3s' }}
            onClick={e => e.stopPropagation()}
          >
            {children}
          </div>
        </div>
      )}
    </>
  );
}