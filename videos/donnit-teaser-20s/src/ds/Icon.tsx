import React from "react";

// Iconos inline (reemplazan Phosphor, que venía por CDN). Usan currentColor.
const PATHS: Record<string, React.ReactNode> = {
  "map-pin": (
    <path d="M12 2c-3.9 0-7 3.1-7 7 0 5 7 13 7 13s7-8 7-13c0-3.9-3.1-7-7-7zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5z" />
  ),
  "calendar-blank": (
    <path d="M7 2v2H5.5A2.5 2.5 0 0 0 3 6.5v13A2.5 2.5 0 0 0 5.5 22h13a2.5 2.5 0 0 0 2.5-2.5v-13A2.5 2.5 0 0 0 18.5 4H17V2h-2v2H9V2H7zm11.5 6H5.5V6.5h13V8z" />
  ),
  key: (
    <path d="M14 2a6 6 0 0 0-5.7 7.9L2 16.2V22h5.8l.9-.9V19h2v-2h2v-1.1l.4-.4A6 6 0 1 0 14 2zm2.5 5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z" />
  ),
  leaf: (
    <path d="M20 3s-9-1-14 4C2 11 3 18 3 18s1-6 5-9c-3 4-3 9-3 9s7 1 11-4c4-5 4-11 4-11z" />
  ),
  "lock-simple": (
    <path d="M12 2a5 5 0 0 0-5 5v2H6a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-9a2 2 0 0 0-2-2h-1V7a5 5 0 0 0-5-5zm-3 5a3 3 0 0 1 6 0v2H9V7z" />
  ),
  wallet: (
    <path d="M4 5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-1h-7a3 3 0 0 1 0-6h7V7a2 2 0 0 0-2-2H4zm11 6a1 1 0 0 0 0 2h7v-2h-7z" />
  ),
  plus: <path d="M11 5h2v6h6v2h-6v6h-2v-6H5v-2h6V5z" />,
  chat: (
    <path d="M4 3h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H9l-5 4V5a2 2 0 0 1 2-2z" />
  ),
  check: <path d="M9.5 16.2 5.3 12l-1.4 1.4 5.6 5.6L20.1 7.4l-1.4-1.4z" />,
  heart: (
    <path d="M12 21s-7-4.5-9.5-9C1 9 2.5 5.5 6 5.5c2 0 3.2 1.2 4 2.3.8-1.1 2-2.3 4-2.3 3.5 0 5 3.5 3.5 6.5-2.5 4.5-9.5 9-9.5 9z" />
  ),
};

export const Icon: React.FC<{
  name: string;
  size?: number;
  color?: string;
  style?: React.CSSProperties;
}> = ({ name, size = 16, color = "currentColor", style }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill={color}
    style={{ display: "inline-block", flexShrink: 0, ...style }}
    aria-hidden
  >
    {PATHS[name] ?? null}
  </svg>
);
