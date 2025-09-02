export default function ErrorScreen({ error }: { error: Error }) {
  return (
    <div className="flex flex-col items-center justify-center py-24">
      <h2 className="font-heading text-4xl text-hotpink mb-4">Oops!</h2>
      <p className="mb-4">{error?.message || "Something went wrong. Try again later."}</p>
    </div>
  );
}