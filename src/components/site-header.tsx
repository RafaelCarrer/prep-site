import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="masthead">
      <div className="masthead-inner">
        <Link href="/" className="wordmark" aria-label="PREP — home">
          PREP<span className="wordmark-dim">.md</span>
        </Link>
        <nav aria-label="Primary">
          <ul className="nav-list">
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/spec">Spec</Link>
            </li>
            <li>
              <Link href="/learn">Learn</Link>
            </li>
            <li>
              <Link href="/about">About</Link>
            </li>
            <li>
              <a
                href="https://github.com/RafaelCarrer/prep.md"
                rel="noopener noreferrer"
              >
                GitHub
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
