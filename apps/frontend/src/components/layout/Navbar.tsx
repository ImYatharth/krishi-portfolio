export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <a href="/" className="font-mono text-sm tracking-widest text-accent uppercase">
          yourstruly.krishi
        </a>
        <div className="flex items-center gap-8">
          <a href="/gallery" className="text-sm text-text-secondary transition-colors hover:text-foreground">
            Gallery
          </a>
          <a href="/about" className="text-sm text-text-secondary transition-colors hover:text-foreground">
            About
          </a>
          <a href="/contact" className="text-sm text-text-secondary transition-colors hover:text-foreground">
            Contact
          </a>
        </div>
      </div>
    </nav>
  );
}
