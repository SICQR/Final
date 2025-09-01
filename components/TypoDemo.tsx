export default function TypoDemo({ fontClass, color, weight, size, children }) {
  return (
    <span
      className={`${fontClass} ${color}`}
      style={{
        fontWeight: weight,
        fontSize: size
      }}
    >
      {children}
    </span>
  );
}