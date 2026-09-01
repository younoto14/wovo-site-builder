import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { supabase } from "@/integrations/supabase/client";
import { adminSaveContent } from "@/lib/admin.functions";
import { dirFor, translate, type RegionCode } from "@/lib/i18n";

type Theme = "dark" | "light";

type SiteContextValue = {
  lang: string;
  theme: Theme;
  region: RegionCode;
  ready: boolean;
  setLang: (code: string) => void;
  setTheme: (theme: Theme) => void;
  setRegion: (region: RegionCode) => void;
  t: (key: string) => string;
  settingsOpen: boolean;
  setSettingsOpen: (open: boolean) => void;
  onboarded: boolean;
  completeOnboarding: (lang: string, theme: Theme, region: RegionCode) => void;
  resetOnboarding: () => void;
  adminMode: boolean;
  setAdminMode: (value: boolean) => void;
  draft: Record<string, string>;
  setDraft: (key: string, value: string) => void;
  discardDraft: () => void;
  commitDraft: () => Promise<void>;
  dirty: boolean;
};

const SiteContext = createContext<SiteContextValue | null>(null);

export function SiteProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState("en");
  const [theme, setThemeState] = useState<Theme>("dark");
  const [region, setRegionState] = useState<RegionCode>("global");
  const [onboarded, setOnboarded] = useState(true);
  const [ready, setReady] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [adminMode, setAdminModeState] = useState(false);
  const [overrides, setOverrides] = useState<Record<string, string>>({});
  const [draft, setDraftState] = useState<Record<string, string>>({});

  useEffect(() => {
    const storedLang = localStorage.getItem("wovo_lang");
    const storedTheme = localStorage.getItem("wovo_theme") as Theme | null;
    const storedRegion = localStorage.getItem("wovo_region") as RegionCode | null;
    if (storedLang) setLangState(storedLang);
    if (storedTheme === "light" || storedTheme === "dark") setThemeState(storedTheme);
    if (storedRegion) setRegionState(storedRegion);
    setOnboarded(localStorage.getItem("wovo_onboarded") === "true");
    setAdminModeState(sessionStorage.getItem("wovo_admin") === "true");
    setReady(true);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("dark", theme === "dark");
    root.classList.toggle("light", theme === "light");
    root.setAttribute("dir", dirFor(lang));
    root.setAttribute("lang", lang);
  }, [theme, lang]);

  useEffect(() => {
    let active = true;
    supabase
      .from("site_content")
      .select("key,value")
      .then(({ data }) => {
        if (!active || !data) return;
        const next: Record<string, string> = {};
        for (const row of data) next[row.key] = row.value;
        setOverrides(next);
      });
    return () => {
      active = false;
    };
  }, []);

  const setLang = useCallback((code: string) => {
    setLangState(code);
    localStorage.setItem("wovo_lang", code);
  }, []);

  const setTheme = useCallback((value: Theme) => {
    setThemeState(value);
    localStorage.setItem("wovo_theme", value);
  }, []);

  const setRegion = useCallback((value: RegionCode) => {
    setRegionState(value);
    localStorage.setItem("wovo_region", value);
  }, []);

  const completeOnboarding = useCallback(
    (l: string, th: Theme, r: RegionCode) => {
      setLang(l);
      setTheme(th);
      setRegion(r);
      setOnboarded(true);
      localStorage.setItem("wovo_onboarded", "true");
    },
    [setLang, setTheme, setRegion],
  );

  const resetOnboarding = useCallback(() => {
    localStorage.removeItem("wovo_onboarded");
    setOnboarded(false);
    setSettingsOpen(false);
  }, []);

  const setAdminMode = useCallback((value: boolean) => {
    setAdminModeState(value);
    if (value) sessionStorage.setItem("wovo_admin", "true");
    else sessionStorage.removeItem("wovo_admin");
  }, []);

  // Resolution order: admin draft -> committed override -> translation table.
  const resolve = useCallback(
    (key: string) => {
      const langKey = `${key}@${lang}`;
      if (draft[langKey] !== undefined) return draft[langKey];
      if (overrides[langKey] !== undefined) return overrides[langKey];
      if (overrides[key] !== undefined) return overrides[key];
      return translate(lang, key);
    },
    [draft, overrides, lang],
  );

  const setDraft = useCallback((key: string, value: string) => {
    setDraftState((prev) => ({ ...prev, [key]: value }));
  }, []);

  const discardDraft = useCallback(() => setDraftState({}), []);

  const commitDraft = useCallback(async () => {
    const entries = Object.entries(draft).map(([key, value]) => ({ key, value }));
    if (entries.length === 0) return;
    await adminSaveContent({ data: { entries } });
    setOverrides((prev) => ({ ...prev, ...draft }));
    setDraftState({});
  }, [draft]);

  const value = useMemo<SiteContextValue>(
    () => ({
      lang,
      theme,
      region,
      ready,
      setLang,
      setTheme,
      setRegion,
      t: resolve,
      settingsOpen,
      setSettingsOpen,
      onboarded,
      completeOnboarding,
      resetOnboarding,
      adminMode,
      setAdminMode,
      draft,
      setDraft,
      discardDraft,
      commitDraft,
      dirty: Object.keys(draft).length > 0,
    }),
    [
      lang,
      theme,
      region,
      ready,
      setLang,
      setTheme,
      setRegion,
      resolve,
      settingsOpen,
      onboarded,
      completeOnboarding,
      resetOnboarding,
      adminMode,
      setAdminMode,
      draft,
      setDraft,
      discardDraft,
      commitDraft,
    ],
  );

  return <SiteContext.Provider value={value}>{children}</SiteContext.Provider>;
}

export function useSite() {
  const ctx = useContext(SiteContext);
  if (!ctx) throw new Error("useSite must be used inside SiteProvider");
  return ctx;
}
