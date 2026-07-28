import React from "react";
import { Icon } from "./Icon";

// Portado de Fab.jsx (Donnit DS) — el "+" verde de publicar.
export const Fab: React.FC<{ size?: number; style?: React.CSSProperties }> = ({
  size = 56,
  style,
}) => (
  <div
    style={{
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      width: size,
      height: size,
      borderRadius: "var(--radius-pill)",
      background: "var(--brand)",
      color: "var(--white)",
      boxShadow: "var(--shadow-brand)",
      ...style,
    }}
  >
    <Icon name="plus" size={Math.round(size * 0.42)} color="var(--white)" />
  </div>
);
