import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8">
      <h1 className="text-2xl font-bold mb-4">Welcome to the Database App</h1>
      <nav className="flex gap-4">
        <Link
          href="/submit"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Submit Data
        </Link>
        <Link
          href="/view"
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          View Data
        </Link>
      </nav>
    </div>
  );
}
