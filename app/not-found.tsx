export default function NotFound() {
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-heading font-bold mb-4 text-hotpink">
          Lost, daddy?
        </h1>
        <p className="text-2xl text-gray-300 mb-8">
          This page ghosted
        </p>
        <a 
          href="/"
          className="btn-primary"
        >
          Take me home
        </a>
      </div>
    </div>
  );
}