import { Link } from "@tanstack/react-router";
import {
  IconGlobe,
  IconInstagram,
  IconMail,
  IconMoon,
  IconSun,
  IconTikTok,
} from "@/components/Icons";
import { useSite } from "@/lib/site-context";
import logo from "@/assets/logo.png.asset.json";

export function Footer() {
  const { t, theme, setTheme, lang, setSettingsOpen } = useSite();

  return (
    <footer className="mt-24 border-t border-border bg-surface">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 py-8 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-3">
          <img src={logo.url} alt="WOVO" className="h-7 w-7 rounded-md object-contain" />
          <span className="font-mono text-xs text-muted-foreground">
            © {new Date().getFullYear()} {t("footer_rights")}
          </span>
        </div>

        <nav className="flex flex-wrap gap-5 text-xs font-medium uppercase tracking-wider text-muted-foreground">
          <Link to="/" className="hover:text-primary">
            {t("nav_home")}
          </Link>
          <Link to="/services" className="hover:text-primary">
            {t("nav_services")}
          </Link>
          <Link to="/about" className="hover:text-primary">
            {t("nav_about")}
          </Link>
          <Link to="/contact" className="hover:text-primary">
            {t("nav_contact")}
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setSettingsOpen(true)}
            className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-3 py-1.5 text-xs font-semibold uppercase text-muted-foreground transition-colors hover:border-primary hover:text-primary"
          >
            <IconGlobe className="h-4 w-4" />
            {lang.toUpperCase()}
          </button>
          <button
            type="button"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-3 py-1.5 text-xs font-semibold uppercase text-muted-foreground transition-colors hover:border-primary hover:text-primary"
          >
            {theme === "dark" ? <IconMoon className="h-4 w-4" /> : <IconSun className="h-4 w-4" />}
            {theme === "dark" ? t("onboard_dark") : t("onboard_light")}
          </button>
          <a
            href="https://www.tiktok.com/@wovo.website.developing"
            target="_blank"
            rel="noreferrer"
            aria-label="TikTok"
            className="icon-tile h-9 w-9"
          >
            <IconTikTok className="h-4 w-4" />
          </a>
          <a
            href="https://instagram.com/wovo.website.developing"
            target="_blank"
            rel="noreferrer"
            aria-label="Instagram"
            className="icon-tile h-9 w-9"
          >
            <IconInstagram className="h-4 w-4" />
          </a>
          <a href="mailto:wovo.website.developing@gmail.com" aria-label="Email" className="icon-tile h-9 w-9">
            <IconMail className="h-4 w-4" />
          </a>
        </div>
      </div>
    </footer>
  );
}
