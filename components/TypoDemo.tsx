export type TypoDemoProps = {
  fontClass?: string;
  color?: string;
  weight?: number | string;
  size?: number | string;
  children?: React.ReactNode;
};

export default function TypoDemo({ fontClass, color, weight, size, children }: TypoDemoProps) {
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