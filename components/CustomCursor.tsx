"use client";
import ArtisticCursor from "./ArtisticCursor";
import LegacyCursor from "./LegacyCursor";

// Change to "legacy" to restore the original cursor.
const CURSOR_DESIGN = "artistic";
const cursorDesigns = { artistic: ArtisticCursor, legacy: LegacyCursor };

export default function CustomCursor() {
  const Cursor = cursorDesigns[CURSOR_DESIGN];
  return <Cursor />;
}
