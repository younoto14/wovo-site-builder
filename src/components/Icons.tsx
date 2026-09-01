import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

function Base({ children, ...props }: IconProps & { children: React.ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {children}
    </svg>
  );
}

/* ---------- navigation & ui ---------- */

export const IconHome = (p: IconProps) => (
  <Base {...p}>
    <path d="M3.2 10.4 12 3.2l8.8 7.2" />
    <path d="M5.2 9.4V20a.8.8 0 0 0 .8.8h3.6v-5.2h4.8v5.2H18a.8.8 0 0 0 .8-.8V9.4" />
    <path d="M9.6 12.2h4.8" opacity={0.55} />
  </Base>
);

export const IconServices = (p: IconProps) => (
  <Base {...p}>
    <rect x="3.2" y="3.2" width="7.4" height="7.4" rx="2" />
    <rect x="13.4" y="3.2" width="7.4" height="7.4" rx="2" />
    <rect x="3.2" y="13.4" width="7.4" height="7.4" rx="2" />
    <path d="M17.1 13.4v7.4M13.4 17.1h7.4" />
  </Base>
);

export const IconAbout = (p: IconProps) => (
  <Base {...p}>
    <circle cx="12" cy="12" r="8.6" />
    <path d="M12 10.6v6" />
    <path d="M12 7.4h.01" strokeWidth={2.2} />
    <path d="M4.4 15.4c4.6 1.8 10.6 1.8 15.2 0" opacity={0.45} />
  </Base>
);

export const IconContact = (p: IconProps) => (
  <Base {...p}>
    <rect x="2.8" y="4.8" width="18.4" height="14.4" rx="2.4" />
    <path d="M3.6 7.4 12 13.2l8.4-5.8" />
    <path d="M3.6 17.4 9 12.8M20.4 17.4 15 12.8" opacity={0.45} />
  </Base>
);

export const IconSettings = (p: IconProps) => (
  <Base {...p}>
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 14.2a1.6 1.6 0 0 0 .32 1.76l.06.06a1.9 1.9 0 1 1-2.7 2.7l-.06-.06a1.6 1.6 0 0 0-1.76-.32 1.6 1.6 0 0 0-.98 1.46V20a1.9 1.9 0 1 1-3.8 0v-.1a1.6 1.6 0 0 0-1.04-1.46 1.6 1.6 0 0 0-1.76.32l-.06.06a1.9 1.9 0 1 1-2.7-2.7l.06-.06a1.6 1.6 0 0 0 .32-1.76 1.6 1.6 0 0 0-1.46-.98H4a1.9 1.9 0 1 1 0-3.8h.1a1.6 1.6 0 0 0 1.46-1.04 1.6 1.6 0 0 0-.32-1.76l-.06-.06a1.9 1.9 0 1 1 2.7-2.7l.06.06a1.6 1.6 0 0 0 1.76.32H9.8a1.6 1.6 0 0 0 .98-1.46V4a1.9 1.9 0 1 1 3.8 0v.1a1.6 1.6 0 0 0 .98 1.46 1.6 1.6 0 0 0 1.76-.32l.06-.06a1.9 1.9 0 1 1 2.7 2.7l-.06.06a1.6 1.6 0 0 0-.32 1.76v.02a1.6 1.6 0 0 0 1.46.98H20a1.9 1.9 0 1 1 0 3.8h-.1a1.6 1.6 0 0 0-1.46.98Z" />
  </Base>
);

export const IconClose = (p: IconProps) => (
  <Base {...p}>
    <path d="M6 6l12 12M18 6 6 18" />
  </Base>
);

export const IconCheck = (p: IconProps) => (
  <Base {...p}>
    <path d="M4.6 12.6 9.4 17.4 19.4 7.2" />
  </Base>
);

export const IconPin = (p: IconProps) => (
  <Base {...p}>
    <path d="M14.4 3.6 20.4 9.6l-2.5.7a3 3 0 0 0-1.6 1l-3.1 3.8-4.3-4.3 3.8-3.1a3 3 0 0 0 1-1.6Z" />
    <path d="M9 15 4.4 19.6" />
    <path d="M12.6 11.4 8.6 7.4" opacity={0.4} />
  </Base>
);

export const IconLock = (p: IconProps) => (
  <Base {...p}>
    <rect x="4.4" y="10.2" width="15.2" height="10.4" rx="2.4" />
    <path d="M8 10.2V7.6a4 4 0 0 1 8 0v2.6" />
    <path d="M12 14.2v2.6" />
  </Base>
);

export const IconLogout = (p: IconProps) => (
  <Base {...p}>
    <path d="M14.4 4.8H6.8A1.6 1.6 0 0 0 5.2 6.4v11.2a1.6 1.6 0 0 0 1.6 1.6h7.6" />
    <path d="M17 8.4 20.6 12 17 15.6" />
    <path d="M20.6 12H10.4" />
  </Base>
);

export const IconGlobe = (p: IconProps) => (
  <Base {...p}>
    <circle cx="12" cy="12" r="8.6" />
    <path d="M3.4 12h17.2" />
    <path d="M12 3.4c2.3 2.4 3.5 5.4 3.5 8.6s-1.2 6.2-3.5 8.6c-2.3-2.4-3.5-5.4-3.5-8.6S9.7 5.8 12 3.4Z" />
  </Base>
);

export const IconSun = (p: IconProps) => (
  <Base {...p}>
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2.6v2.2M12 19.2v2.2M4.4 4.4l1.6 1.6M18 18l1.6 1.6M2.6 12h2.2M19.2 12h2.2M4.4 19.6 6 18M18 6l1.6-1.6" />
  </Base>
);

export const IconMoon = (p: IconProps) => (
  <Base {...p}>
    <path d="M20 14.4A8.4 8.4 0 0 1 9.6 4a8.6 8.6 0 1 0 10.4 10.4Z" />
    <path d="M15.6 5.4h2.8M17 4v2.8" opacity={0.5} />
  </Base>
);

export const IconArrow = (p: IconProps) => (
  <Base {...p}>
    <path d="M4.6 12h14" />
    <path d="M13.4 6.6 18.8 12l-5.4 5.4" />
  </Base>
);

export const IconChevron = (p: IconProps) => (
  <Base {...p}>
    <path d="M6.6 9.4 12 14.8l5.4-5.4" />
  </Base>
);

export const IconMap = (p: IconProps) => (
  <Base {...p}>
    <path d="M9.2 4.2 3.6 6.4v13.4l5.6-2.2 5.6 2.2 5.6-2.2V4.2l-5.6 2.2Z" />
    <path d="M9.2 4.2v13.4M14.8 6.4v13.4" opacity={0.5} />
  </Base>
);

/* ---------- brand marks (filled, authentic silhouettes) ---------- */

export const IconTikTok = (p: IconProps) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...p}>
    <path d="M16.6 2.4h-3.1v13.3a2.6 2.6 0 1 1-2.6-2.6c.24 0 .47.03.7.09V9.9a5.9 5.9 0 1 0 5.1 5.85V9.05a6.6 6.6 0 0 0 3.9 1.27V7.03a3.55 3.55 0 0 1-2.6-1.3 3.6 3.6 0 0 1-1.4-2.68Z" />
  </svg>
);

export const IconInstagram = (p: IconProps) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...p}>
    <path d="M7.8 2.6h8.4a5.2 5.2 0 0 1 5.2 5.2v8.4a5.2 5.2 0 0 1-5.2 5.2H7.8a5.2 5.2 0 0 1-5.2-5.2V7.8a5.2 5.2 0 0 1 5.2-5.2Zm0 1.9A3.3 3.3 0 0 0 4.5 7.8v8.4a3.3 3.3 0 0 0 3.3 3.3h8.4a3.3 3.3 0 0 0 3.3-3.3V7.8a3.3 3.3 0 0 0-3.3-3.3H7.8Zm8.9 1.5a1.15 1.15 0 1 1 0 2.3 1.15 1.15 0 0 1 0-2.3ZM12 7.1a4.9 4.9 0 1 1 0 9.8 4.9 4.9 0 0 1 0-9.8Zm0 1.9a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z" />
  </svg>
);

export const IconMail = (p: IconProps) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...p}>
    <path d="M3.4 5.4h17.2c.77 0 1.4.63 1.4 1.4v10.4c0 .77-.63 1.4-1.4 1.4H3.4c-.77 0-1.4-.63-1.4-1.4V6.8c0-.77.63-1.4 1.4-1.4Zm.9 1.9 7.7 5.3 7.7-5.3H4.3Zm15.4 1.6-6.9 4.75a1.4 1.4 0 0 1-1.6 0L4.3 8.9v7.7h15.4V8.9Z" />
  </svg>
);

/* ---------- service & capability marks ---------- */

export const IconPortfolio = (p: IconProps) => (
  <Base {...p}>
    <rect x="2.8" y="4.6" width="18.4" height="12.6" rx="2" />
    <path d="M2.8 8.4h18.4" />
    <path d="M5.4 6.5h.01M7.6 6.5h.01M9.8 6.5h.01" strokeWidth={2} />
    <path d="M6.4 14.4l2.6-3 2.4 2.4 2.6-3.6 3.6 4.2" />
    <path d="M8.6 20.4h6.8" />
  </Base>
);

export const IconBrand = (p: IconProps) => (
  <Base {...p}>
    <path d="M4.4 8.4 6 4.6h12l1.6 3.8" />
    <path d="M3.6 8.4h16.8v10.4a1.6 1.6 0 0 1-1.6 1.6H5.2a1.6 1.6 0 0 1-1.6-1.6Z" />
    <path d="M9.2 11.6a2.8 2.8 0 0 0 5.6 0" />
  </Base>
);

export const IconSystems = (p: IconProps) => (
  <Base {...p}>
    <rect x="3" y="4.6" width="18" height="14.8" rx="2.2" />
    <path d="M3 9.2h18" />
    <path d="M7.4 13h5.4M7.4 16h8" />
    <path d="M16.6 12.4l1.6 1.6-1.6 1.6" opacity={0.7} />
  </Base>
);

export const IconCustom = (p: IconProps) => (
  <Base {...p}>
    <path d="M12 3.2 14.6 8l5.4.8-3.9 3.8.92 5.4L12 15.4 7 18l.92-5.4L4 8.8 9.4 8Z" />
    <path d="M12 8.6v3.6" opacity={0.5} />
  </Base>
);

export const IconResponsive = (p: IconProps) => (
  <Base {...p}>
    <rect x="2.6" y="4.6" width="12.4" height="9.6" rx="1.8" />
    <rect x="16.2" y="8.6" width="5.2" height="10.8" rx="1.6" />
    <path d="M6.4 18.4h5.2M8.8 14.2v4.2" />
    <path d="M18.2 17.4h1.2" strokeWidth={2} />
  </Base>
);

export const IconPerformance = (p: IconProps) => (
  <Base {...p}>
    <path d="M3.6 16.4a8.4 8.4 0 1 1 16.8 0" />
    <path d="M12 16.4 16 9.6" />
    <circle cx="12" cy="16.4" r="1.4" />
    <path d="M3.6 16.4h2M18.4 16.4h2M5.6 9.4l1.4 1M18.4 9.4 17 10.4" opacity={0.55} />
  </Base>
);

export const IconMotion = (p: IconProps) => (
  <Base {...p}>
    <path d="M3.2 14.4c2.4 0 2.4-5 4.8-5s2.4 5 4.8 5 2.4-5 4.8-5 2.4 5 4.4 5" />
    <path d="M3.2 19h17.6" opacity={0.4} />
  </Base>
);

export const IconContrast = (p: IconProps) => (
  <Base {...p}>
    <circle cx="12" cy="12" r="8.6" />
    <path d="M12 3.4a8.6 8.6 0 0 1 0 17.2Z" fill="currentColor" stroke="none" />
  </Base>
);

export const IconSeo = (p: IconProps) => (
  <Base {...p}>
    <circle cx="10.8" cy="10.8" r="6.2" />
    <path d="M15.4 15.4 20.4 20.4" />
    <path d="M8 11.6l2 2 3.6-4.2" />
  </Base>
);

export const IconAccess = (p: IconProps) => (
  <Base {...p}>
    <circle cx="12" cy="12" r="8.6" />
    <circle cx="12" cy="7.6" r="1.3" fill="currentColor" stroke="none" />
    <path d="M7.6 10.6c2.9.9 5.9.9 8.8 0" />
    <path d="M12 10.8v3.4l-2 4M12 14.2l2 4" />
  </Base>
);

export const IconCode = (p: IconProps) => (
  <Base {...p}>
    <path d="M8.6 8 4.6 12l4 4" />
    <path d="M15.4 8l4 4-4 4" />
    <path d="M13.4 5.6 10.6 18.4" opacity={0.6} />
  </Base>
);
