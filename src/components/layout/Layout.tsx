import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { Link, NavLink, Outlet, useLocation } from "react-router";
import { ThemeControl } from "../../features/theme/ThemeControl";
import { profile, site } from "../../content/profile";
import { RouteEntrance } from "../motion/RouteEntrance";

function Navigation({ close }: { close: () => void }) {
  return (
    <>
      <NavLink to="/" end onClick={close}>
        Home
      </NavLink>
      <NavLink to="/projects" onClick={close}>
        Work
      </NavLink>
      <Link to="/#about" onClick={close}>
        About
      </Link>
      <Link to="/#contact" className="nav-contact" onClick={close}>
        Let’s talk <ArrowUpRight size={14} aria-hidden="true" />
      </Link>
    </>
  );
}

export function Layout() {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  const location = useLocation();
  const previousLocation = useRef({
    pathname: location.pathname,
    search: location.search,
  });
  function closeMenu() {
    setMenuOpen(false);
    // A same-page link may hide the focused element without a route focus change.
    if (menuOpen) menuButton.current?.focus();
  }
  useEffect(() => {
    const routeChanged =
      previousLocation.current.pathname !== location.pathname;
    const searchChanged = previousLocation.current.search !== location.search;
    previousLocation.current = {
      pathname: location.pathname,
      search: location.search,
    };
    if (!routeChanged && searchChanged) return;
    if (location.hash) {
      // Lazy sections may not exist on the first render after a route change.
      const scrollToSection = () => {
        const target = document.getElementById(location.hash.slice(1));
        if (!target) return false;
        target.scrollIntoView({ behavior: "instant" });
        target.focus({ preventScroll: true });
        return true;
      };
      if (scrollToSection()) return;
      const observer = new MutationObserver(() => {
        if (scrollToSection()) observer.disconnect();
      });
      observer.observe(document.getElementById("main-content")!, {
        childList: true,
        subtree: true,
      });
      return () => observer.disconnect();
    } else {
      window.scrollTo({ top: 0, behavior: "instant" });
      if (routeChanged)
        document.getElementById("main-content")?.focus({ preventScroll: true });
    }
  }, [location.pathname, location.hash, location.search, location.key]);
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        menuButton.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [menuOpen]);
  return (
    <>
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>
      <header className="site-header">
        <div className="container header-inner">
          <Link to="/" className="brand" aria-label={`${profile.name}, home`}>
            {profile.monogram}
            <span>.</span>
            <span className="brand-caption">
              {profile.name}
              <span> / developer</span>
            </span>
          </Link>
          <nav className="desktop-nav" aria-label="Main navigation">
            <Navigation close={closeMenu} />
          </nav>
          <div className="header-tools">
            <ThemeControl />
            <button
              ref={menuButton}
              className="icon-button mobile-toggle"
              aria-label={menuOpen ? "Close navigation" : "Open navigation"}
              aria-expanded={menuOpen}
              aria-controls="mobile-navigation"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <X size={21} /> : <Menu size={21} />}
            </button>
          </div>
        </div>
        <nav
          id="mobile-navigation"
          className="mobile-nav container"
          hidden={!menuOpen}
          aria-label="Mobile navigation"
        >
          <Navigation close={closeMenu} />
        </nav>
      </header>
      <main id="main-content" tabIndex={-1}>
        <RouteEntrance key={location.pathname} anchor={Boolean(location.hash)}>
          <Outlet />
        </RouteEntrance>
      </main>
      <footer className="site-footer container">
        <Link to="/" className="footer-signature">
          {profile.name}
          <span>.</span>
        </Link>
        <p>
          © {new Date().getFullYear()} {profile.name}. Crafted with intention.
        </p>
        <Link to="/#top">
          Back to top <ArrowUpRight size={15} aria-hidden="true" />
        </Link>
      </footer>
    </>
  );
}

// Updates route metadata without requiring an external head management library.
export function PageMeta({
  title,
  description = site.description,
}: {
  title: string;
  description?: string;
}) {
  const { pathname } = useLocation();
  useEffect(() => {
    document.title = title;
    const updates = [
      ["name", "description", description],
      ["property", "og:title", title],
      ["property", "og:description", description],
      ["name", "twitter:title", title],
      ["name", "twitter:description", description],
    ];
    updates.forEach(([attribute, key, value]) =>
      document
        .querySelector(`meta[${attribute}="${key}"]`)
        ?.setAttribute("content", value),
    );
    if (!site.baseUrl) return;
    const canonical = document.createElement("link");
    canonical.rel = "canonical";
    canonical.href = new URL(pathname, site.baseUrl).href;
    document.head.append(canonical);
    return () => canonical.remove();
  }, [title, description, pathname]);
  return null;
}
