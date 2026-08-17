import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-slate-50 p-6 text-center dark:bg-slate-950">
      <h1 className="text-6xl font-extrabold text-slate-900 dark:text-white">404</h1>
      <h2 className="mt-4 text-xl font-semibold text-slate-700 dark:text-slate-300">
        Page Not Found
      </h2>
      <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
        The requested resource could not be found.
      </p>
      <Link
        href="/"
        className="mt-6 rounded-lg bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700"
      >
        Return Home
      </Link>
    </main>
  );
}