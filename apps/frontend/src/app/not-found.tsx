import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center px-6 text-center">
      <p className="font-mono text-xs uppercase tracking-[0.3em] text-accent">404</p>
      <h1 className="mt-4 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
        Page Not Found
      </h1>
      <p className="mt-4 max-w-md text-text-secondary">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <div className="mt-8 flex gap-4">
        <Link
          href="/"
          className="rounded-full border border-accent px-6 py-2.5 text-sm text-accent transition-all hover:bg-accent hover:text-background"
        >
          Go Home
        </Link>
        <Link
          href="/gallery"
          className="rounded-full border border-border px-6 py-2.5 text-sm text-text-secondary transition-all hover:border-accent/40 hover:text-foreground"
        >
          View Gallery
        </Link>
      </div>
    </div>
  );
}
