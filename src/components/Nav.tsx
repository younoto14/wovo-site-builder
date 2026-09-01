import { Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  IconAbout,
  IconClose,
  IconContact,
  IconHome,
  IconServices,
  IconSettings,
} from "@/components/Icons";
import { useSite } from "@/lib/site-context";
import logo from "@/assets/logo.png.asset.json";

const LINKS = [
  { to: "/", key: "nav_home", Icon: IconHome },
  { to: "/services", key: "nav_services", Icon: IconServices },
  { to: "/about", key: "nav_about", Icon: IconAbout },
  { to: "/contact", key: "nav_contact", Icon: IconContact },
] as const;

export function Nav() {
  const { t, setSettingsOpen } = useSite();
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Desktop rail */}
      <nav className="fixed left-5 top-1/2 z-40 hidden -translate-y-1/2 flex-col gap-2 rounded-2xl border border-border bg-surface/90 p-2 backdrop-blur md:flex">
        <img src={logo.url} alt="WOVO" className="mx-auto mb-1 h-8 w-8 rounded-lg object-contain" />
        {LINKS.map(({ to, key, Icon }) => (
          <Link
            key={to}
            to={to}
            activeOptions={{ exact: to === "/" }}
            className="group flex w-20 flex-col items-center gap-1 rounded-xl px-2 py-3 text-[10px] font-medium uppercase tracking-wider text-muted-foreground transition-colors hover:bg-secondary data-[status=active]:bg-primary-soft data-[status=active]:text-primary"
          >
            <Icon className="h-5 w-5" />
            {t(key)}
          </Link>
        ))}
        <button
          type="button"
          onClick={() => setSettingsOpen(true)}
          className="flex w-20 flex-col items-center gap-1 rounded-xl px-2 py-3 text-[10px] font-medium uppercase tracking-wider text-muted-foreground transition-colors hover:bg-secondary"
        >
          <IconSettings className="h-5 w-5" />
          {t("nav_settings")}
        </button>
      </nav>

      {/* Mobile top bar */}
      <header className="sticky top-0 z-40 flex items-center justify-between border-b border-border bg-surface/95 px-4 py-3 backdrop-blur md:hidden">
        <Link to="/" className="flex items-center gap-2">
          <img src={logo.url} alt="WOVO" className="h-7 w-7 rounded-md object-contain" />
          <span className="font-mono text-sm font-bold tracking-[0.25em] text-heading">WOVO</span>
        </Link>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setSettingsOpen(true)}
            className="rounded-lg border border-border p-2 text-muted-foreground"
            aria-label={t("nav_settings")}
          >
            <IconSettings className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="rounded-lg border border-border p-2 text-muted-foreground"
            aria-label={t("nav_home")}
          >
            {open ? (
              <IconClose className="h-5 w-5" />
            ) : (
              <svg viewBox="0 0 24 24" className="h-5 w-5" stroke="currentColor" fill="none" strokeWidth={1.8} strokeLinecap="round">
                <path d="M4 7h16M4 12h16M4 17h16" />
              </svg>
            )}
          </button>
        </div>
      </header>

      {open && (
        <div className="sticky top-[57px] z-40 grid grid-cols-2 gap-2 border-b border-border bg-surface px-4 py-3 md:hidden">
          {LINKS.map(({ to, key, Icon }) => (
            <Link
              key={to}
              to={to}
              onClick={() => setOpen(false)}
              activeOptions={{ exact: to === "/" }}
              className="flex items-center gap-2 rounded-xl border border-border px-3 py-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground data-[status=active]:border-primary data-[status=active]:text-primary"
            >
              <Icon className="h-4 w-4" />
              {t(key)}
            </Link>
          ))}
        </div>
      )}
    </>
  );
}
