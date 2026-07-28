import React from "react";
import { Icon } from "./Icon";

// Portado de RentalItemCard.jsx (Donnit DS) — la card de alquiler (Moments).
export const RentalItemCard: React.FC<{
  image?: string;
  title: string;
  pricePerDay: number;
  currency?: string;
  available?: boolean;
  neighborhood?: string;
  distance?: string;
  ownerGivesBack?: boolean;
  style?: React.CSSProperties;
}> = ({
  image,
  title,
  pricePerDay,
  currency = "€",
  available = true,
  neighborhood,
  distance,
  ownerGivesBack = false,
  style,
}) => {
  const meta = [distance, neighborhood].filter(Boolean).join(" · ");
  return (
    <article
      style={{
        width: "100%",
        background: "var(--rent-tint)",
        borderRadius: "var(--radius-lg)",
        padding: 10,
        boxShadow: "var(--shadow-low)",
        border: "1.5px solid var(--turq-200)",
        ...style,
      }}
    >
      <div
        style={{
          position: "relative",
          borderRadius: "var(--radius-md)",
          overflow: "hidden",
          aspectRatio: "5 / 3",
          background: "var(--sage-100)",
        }}
      >
        {image && (
          <img
            src={image}
            alt=""
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
          />
        )}
        <div style={{ position: "absolute", top: 8, left: 8 }}>
          {available ? (
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 5,
                height: 24,
                padding: "0 10px",
                borderRadius: "var(--radius-pill)",
                background: "rgba(255,255,255,0.92)",
                color: "var(--rent-strong)",
                font: "var(--fw-semibold) 12px var(--font-body)",
              }}
            >
              <span
                style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--rent)" }}
              />{" "}
              Disponible
            </span>
          ) : (
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                height: 24,
                padding: "0 10px",
                borderRadius: "var(--radius-pill)",
                background: "rgba(255,255,255,0.92)",
                color: "var(--text-muted)",
                font: "var(--fw-semibold) 12px var(--font-body)",
              }}
            >
              Reservado
            </span>
          )}
        </div>
        {ownerGivesBack && (
          <div style={{ position: "absolute", top: 8, right: 8 }}>
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                width: 26,
                height: 26,
                borderRadius: "var(--radius-pill)",
                background: "var(--white)",
                boxShadow: "var(--shadow-low)",
              }}
            >
              <Icon name="leaf" size={15} color="var(--green-600)" />
            </span>
          </div>
        )}
        <div
          style={{
            position: "absolute",
            right: 8,
            bottom: 8,
            display: "inline-flex",
            alignItems: "center",
            gap: 5,
            height: 30,
            padding: "0 11px",
            borderRadius: "var(--radius-pill)",
            background: "var(--rent)",
            color: "var(--on-rent)",
            boxShadow: "var(--shadow-med)",
          }}
        >
          <Icon name="calendar-blank" size={13} color="var(--on-rent)" />
          <span style={{ font: "var(--fw-bold) 14px var(--font-display)" }}>
            {currency}
            {pricePerDay}
          </span>
          <span style={{ font: "var(--fw-semibold) 11px var(--font-body)", opacity: 0.92 }}>
            /día
          </span>
        </div>
      </div>
      <div style={{ padding: "10px 4px 4px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 4,
              font: "var(--fw-bold) 10px var(--font-body)",
              letterSpacing: "0.06em",
              color: "var(--rent-strong)",
            }}
          >
            <Icon name="key" size={11} color="var(--rent-strong)" /> ALQUILER
          </span>
        </div>
        <h3
          style={{
            margin: 0,
            font: "var(--fw-bold) 15px var(--font-display)",
            color: "var(--text-strong)",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {title}
        </h3>
        {meta && (
          <p
            style={{
              margin: "6px 0 0",
              display: "flex",
              alignItems: "center",
              gap: 5,
              font: "var(--fw-regular) 13px var(--font-body)",
              color: "var(--text-secondary)",
            }}
          >
            <Icon name="map-pin" size={14} color="var(--rent)" />
            {meta}
          </p>
        )}
      </div>
    </article>
  );
};
