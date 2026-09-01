import { LANGUAGES as RAW_LANGUAGES, TRANSLATIONS as RAW_TRANSLATIONS } from "./translations";

export type Language = { code: string; name: string; dir: "ltr" | "rtl" };

export const LANGUAGES = RAW_LANGUAGES as unknown as Language[];

const DICTS = RAW_TRANSLATIONS as unknown as Record<string, Record<string, string>>;

/**
 * Strings introduced by the rebuilt pages. English is the base; a language that
 * is missing an entry falls back to English automatically.
 */
const EXTRA: Record<string, Record<string, string>> = {
  en: {
    srv_variants_intro: "Four production-ready website families, each engineered from scratch.",
    srv_caps_intro: "Capabilities included with every WOVO build.",
    abt_identity_title: "Identity First",
    abt_identity_desc:
      "Every project starts with a visual identity study: typography, spacing rhythm, contrast, and motion language are decided before a single component is written.",
    abt_arch_title: "Custom Architecture",
    abt_arch_desc:
      "Modular front-end architecture, strict theming tokens, localized content layers, and a lightweight admin surface for the content you change often.",
    abt_boundaries_1: "Custom front-end design and development",
    abt_boundaries_2: "Light and dark theming with full translation coverage",
    abt_boundaries_3: "Performance, SEO and accessibility passes before delivery",
    contact_tiktok: "TikTok",
    contact_instagram: "Instagram DM",
    contact_email: "Email",
    contact_form_title: "Project Brief",
    region_global: "Global",
    region_europe: "Europe",
    region_mena: "Middle East",
    region_north_america: "North America",
    region_asia: "Asia",
    region_africa: "Africa",
    region_south_america: "South America",
    region_oceania: "Oceania",
    admin_new_pass: "New admin password",
    admin_save_pass: "Update password",
    admin_edit_label: "Edit content",
    admin_cancel: "Cancel",
    admin_saved: "Changes committed.",
    admin_login_hint: "Restricted area. Authorized personnel only.",
  },
  tr: {
    srv_variants_intro: "Sıfırdan geliştirilen dört üretim hazır web sitesi ailesi.",
    srv_caps_intro: "Her WOVO projesinde standart olarak sunulan yetenekler.",
    abt_identity_title: "Önce Kimlik",
    abt_identity_desc:
      "Her proje bir görsel kimlik çalışmasıyla başlar: tipografi, boşluk ritmi, kontrast ve hareket dili ilk bileşenden önce belirlenir.",
    abt_arch_title: "Özel Mimari",
    abt_arch_desc:
      "Modüler ön yüz mimarisi, katı tema değişkenleri, yerelleştirilmiş içerik katmanları ve sık değiştirdiğiniz içerik için hafif bir yönetim paneli.",
    abt_boundaries_1: "Özel ön yüz tasarımı ve geliştirmesi",
    abt_boundaries_2: "Tam çeviri desteğiyle açık ve koyu tema",
    abt_boundaries_3: "Teslimden önce performans, SEO ve erişilebilirlik kontrolleri",
    contact_tiktok: "TikTok",
    contact_instagram: "Instagram DM",
    contact_email: "E-posta",
    contact_form_title: "Proje Özeti",
    region_global: "Global",
    region_europe: "Avrupa",
    region_mena: "Orta Doğu",
    region_north_america: "Kuzey Amerika",
    region_asia: "Asya",
    region_africa: "Afrika",
    region_south_america: "Güney Amerika",
    region_oceania: "Okyanusya",
    admin_new_pass: "Yeni yönetici şifresi",
    admin_save_pass: "Şifreyi güncelle",
    admin_edit_label: "İçeriği düzenle",
    admin_cancel: "İptal",
    admin_saved: "Değişiklikler kaydedildi.",
    admin_login_hint: "Kısıtlı alan. Sadece yetkili personel.",
  },
  ar: {
    srv_variants_intro: "أربع عائلات مواقع جاهزة للإنتاج، كل منها مبني من الصفر.",
    srv_caps_intro: "إمكانات مضمّنة في كل مشروع من WOVO.",
    abt_identity_title: "الهوية أولاً",
    abt_identity_desc:
      "يبدأ كل مشروع بدراسة الهوية البصرية: الخطوط والإيقاع والتباين ولغة الحركة تُحدد قبل كتابة أي مكوّن.",
    abt_arch_title: "بنية مخصصة",
    abt_arch_desc:
      "بنية واجهة أمامية معيارية، ومتغيرات تصميم صارمة، وطبقات محتوى مترجمة، ولوحة تحكم خفيفة للمحتوى المتغيّر.",
    abt_boundaries_1: "تصميم وتطوير واجهة أمامية مخصصة",
    abt_boundaries_2: "وضع فاتح وداكن مع تغطية ترجمة كاملة",
    abt_boundaries_3: "مراجعات الأداء وتحسين محركات البحث وإمكانية الوصول قبل التسليم",
    contact_tiktok: "تيك توك",
    contact_instagram: "رسالة إنستغرام",
    contact_email: "البريد الإلكتروني",
    contact_form_title: "ملخص المشروع",
    region_global: "عالمي",
    region_europe: "أوروبا",
    region_mena: "الشرق الأوسط",
    region_north_america: "أمريكا الشمالية",
    region_asia: "آسيا",
    region_africa: "أفريقيا",
    region_south_america: "أمريكا الجنوبية",
    region_oceania: "أوقيانوسيا",
    admin_new_pass: "كلمة مرور جديدة",
    admin_save_pass: "تحديث كلمة المرور",
    admin_edit_label: "تعديل المحتوى",
    admin_cancel: "إلغاء",
    admin_saved: "تم حفظ التغييرات.",
    admin_login_hint: "منطقة مقيدة. للمخوّلين فقط.",
  },
};

export const REGIONS = [
  "global",
  "europe",
  "mena",
  "north_america",
  "asia",
  "africa",
  "south_america",
  "oceania",
] as const;

export type RegionCode = (typeof REGIONS)[number];

export function translate(lang: string, key: string): string {
  return (
    EXTRA[lang]?.[key] ??
    DICTS[lang]?.[key] ??
    EXTRA["en"]?.[key] ??
    DICTS["en"]?.[key] ??
    key
  );
}

export function dirFor(lang: string): "ltr" | "rtl" {
  return LANGUAGES.find((l) => l.code === lang)?.dir ?? "ltr";
}
