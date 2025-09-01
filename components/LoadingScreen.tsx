import { motion } from "framer-motion";
export default function LoadingScreen() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center py-24"
    >
      <svg width={56} height={56} className="mb-6 animate-spin" viewBox="0 0 48 48" fill="none">
        <circle cx="24" cy="24" r="20" stroke="#ff1981" strokeWidth="6" />
      </svg>
      <p className="opacity-70">Loading…</p>
    </motion.div>
  );
}