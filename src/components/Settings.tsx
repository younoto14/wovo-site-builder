import { IconClose, IconGlobe, IconMap, IconMoon, IconSun } from "@/components/Icons";
import { LANGUAGES, REGIONS, type RegionCode } from "@/lib/i18n";
import { useSite } from "@/lib/site-context";

function OptionButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex items-center gap-2 rounded-xl border px-3 py-2.5 text-left text-xs font-semibold transition-colors ${
        active
          ? "border-primary bg-primary-soft text-primary"
          : "border-border bg-background text-muted-foreground hover:border-border-strong"
      }`}
    >
      {children}
    </button>
  );
}

export function SettingsDrawer() {
  const { t, settingsOpen, setSettingsOpen, lang, setLang, theme, setTheme, region, setRegion, resetOnboarding } =
    useSite();

  if (!settingsOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-foreground/40 backdrop-blur-sm">
      <button
        type="button"
        aria-label={t("settings_close")}
        className="flex-1 cursor-default"
        onClick={() => setSettingsOpen(false)}
      />
      <aside className="h-full w-full max-w-md overflow-y-auto border-l border-border bg-surface p-6">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="font-mono text-sm font-bold uppercase tracking-[0.2em]">
            {t("settings_title")}
          </h2>
          <button
            type="button"
            onClick={() => setSettingsOpen(false)}
            className="rounded-lg border border-border p-2 text-muted-foreground"
          >
            <IconClose className="h-4 w-4" />
          </button>
        </div>

        <section className="mb-8">
          <h3 className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-widest">
            <IconGlobe className="h-4 w-4" /> {t("settings_language")}
          </h3>
          <div className="grid grid-cols-3 gap-2">
            {LANGUAGES.map((l) => (
              <OptionButton key={l.code} active={l.code === lang} onClick={() => setLang(l.code)}>
                <span className="font-mono text-[10px] opacity-70">{l.code.toUpperCase()}</span>
                <span className="truncate">{l.name}</span>
              </OptionButton>
            ))}
          </div>
        </section>

        <section className="mb-8">
          <h3 className="mb-3 text-xs font-bold uppercase tracking-widest">{t("settings_theme")}</h3>
          <div className="grid grid-cols-2 gap-2">
            <OptionButton active={theme === "dark"} onClick={() => setTheme("dark")}>
              <IconMoon className="h-4 w-4" /> {t("onboard_dark")}
            </OptionButton>
            <OptionButton active={theme === "light"} onClick={() => setTheme("light")}>
              <IconSun className="h-4 w-4" /> {t("onboard_light")}
            </OptionButton>
          </div>
        </section>

        <section className="mb-8">
          <h3 className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-widest">
            <IconMap className="h-4 w-4" /> {t("settings_region")}
          </h3>
          <div className="grid grid-cols-2 gap-2">
            {REGIONS.map((r) => (
              <OptionButton key={r} active={r === region} onClick={() => setRegion(r as RegionCode)}>
                <IconMap className="h-4 w-4 shrink-0" />
                <span className="truncate">{t(`region_${r}`)}</span>
              </OptionButton>
            ))}
          </div>
        </section>

        <button
          type="button"
          onClick={resetOnboarding}
          className="w-full rounded-xl border border-border px-4 py-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground hover:border-primary hover:text-primary"
        >
          {t("settings_reset_onboarding")}
        </button>
      </aside>
    </div>
  );
}
