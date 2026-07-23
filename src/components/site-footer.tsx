import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-footer-inner">
        <div className="footer-main">
          <span className="footer-tagline">
            PREP — an open standard by Rafael Carrer (AMETI)
          </span>
          <span className="footer-sub">CC BY 4.0</span>
        </div>
        <nav className="footer-links" aria-label="Footer">
          <a
            href="https://github.com/RafaelCarrer/prep.md"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
          <a href="mailto:hello@prep.md">hello@prep.md</a>
          <Link href="/privacy">Privacy</Link>
          <Link href="/terms">Terms</Link>
          <a
            href="https://github.com/sponsors/RafaelCarrer"
            rel="noopener noreferrer"
          >
            Sponsor
          </a>
        </nav>
      </div>
    </footer>
  );
}
