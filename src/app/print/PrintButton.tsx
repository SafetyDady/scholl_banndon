"use client";

export default function PrintButton() {
  return (
    <button
      onClick={() => window.print()}
      style={{
        padding: "10px 32px",
        fontSize: "16px",
        backgroundColor: "#2563eb",
        color: "white",
        border: "none",
        borderRadius: "6px",
        cursor: "pointer",
      }}
    >
      พิมพ์
    </button>
  );
}
