import PixelCard from "@/components/pixel/PixelCard";
import PixelGrid from "@/components/pixel/PixelGrid";
import {
  ALL_TAGS,
  type PixelArt,
  type Tag,
  mockArtworks,
} from "@/data/mockData";
import { X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

const TAG_ICONS: Record<Tag, string> = {
  Nature: "🌿",
  Abstract: "◈",
  Characters: "👾",
  Space: "🪐",
  Fantasy: "⚔️",
  Retro: "🕹️",
  Horror: "💀",
  Vehicles: "🚗",
  Animals: "🦜",
  Buildings: "🏠",
  Food: "🍕",
  Sports: "🏆",
  "Sci-Fi": "🛸",
  Magic: "✨",
};

const TAG_COLORS: Record<Tag, { border: string; glow: string; text: string }> =
  {
    Nature: {
      border: "oklch(0.80 0.20 145)",
      glow: "oklch(0.80 0.20 145 / 0.35)",
      text: "oklch(0.80 0.20 145)",
    },
    Abstract: {
      border: "oklch(0.65 0.25 335)",
      glow: "oklch(0.65 0.25 335 / 0.35)",
      text: "oklch(0.65 0.25 335)",
    },
    Characters: {
      border: "oklch(0.78 0.18 195)",
      glow: "oklch(0.78 0.18 195 / 0.35)",
      text: "oklch(0.78 0.18 195)",
    },
    Space: {
      border: "oklch(0.72 0.22 280)",
      glow: "oklch(0.72 0.22 280 / 0.35)",
      text: "oklch(0.72 0.22 280)",
    },
    Fantasy: {
      border: "oklch(0.72 0.20 45)",
      glow: "oklch(0.72 0.20 45 / 0.35)",
      text: "oklch(0.72 0.20 45)",
    },
    Retro: {
      border: "oklch(0.90 0.20 95)",
      glow: "oklch(0.90 0.20 95 / 0.35)",
      text: "oklch(0.90 0.20 95)",
    },
    Horror: {
      border: "oklch(0.62 0.25 25)",
      glow: "oklch(0.62 0.25 25 / 0.35)",
      text: "oklch(0.62 0.25 25)",
    },
    Vehicles: {
      border: "oklch(0.78 0.18 195)",
      glow: "oklch(0.78 0.18 195 / 0.35)",
      text: "oklch(0.78 0.18 195)",
    },
    Animals: {
      border: "oklch(0.82 0.20 80)",
      glow: "oklch(0.82 0.20 80 / 0.35)",
      text: "oklch(0.82 0.20 80)",
    },
    Buildings: {
      border: "oklch(0.75 0.18 195)",
      glow: "oklch(0.75 0.18 195 / 0.35)",
      text: "oklch(0.75 0.18 195)",
    },
    Food: {
      border: "oklch(0.75 0.22 50)",
      glow: "oklch(0.75 0.22 50 / 0.35)",
      text: "oklch(0.75 0.22 50)",
    },
    Sports: {
      border: "oklch(0.78 0.18 195)",
      glow: "oklch(0.78 0.18 195 / 0.35)",
      text: "oklch(0.78 0.18 195)",
    },
    "Sci-Fi": {
      border: "oklch(0.80 0.22 145)",
      glow: "oklch(0.80 0.22 145 / 0.35)",
      text: "oklch(0.80 0.22 145)",
    },
    Magic: {
      border: "oklch(0.72 0.25 305)",
      glow: "oklch(0.72 0.25 305 / 0.35)",
      text: "oklch(0.72 0.25 305)",
    },
  };

interface ModelsScreenProps {
  likedIds: Set<number>;
  onLike: (id: number) => void;
  onOpenArt: (art: PixelArt) => void;
}

export default function ModelsScreen({
  likedIds,
  onLike,
  onOpenArt,
}: ModelsScreenProps) {
  const [activeCategory, setActiveCategory] = useState<Tag | null>(null);

  const artworksByTag = (tag: Tag) =>
    mockArtworks.filter((a) => a.tags.includes(tag));

  const representativeArt = (tag: Tag) => artworksByTag(tag)[0];

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="px-4 pt-4 pb-3 flex-shrink-0">
        <div className="flex items-center gap-2 mb-1">
          <div className="text-[18px] font-bold font-mono neon-cyan tracking-wider">
            MOD<span className="neon-magenta">ELS</span>
          </div>
          <span className="blink text-[oklch(0.78_0.18_195)] text-lg">█</span>
        </div>
        <div className="text-[10px] font-mono text-muted-foreground tracking-widest uppercase">
          Browse by type
        </div>
      </div>

      {/* Categories grid */}
      <div className="flex-1 overflow-y-auto px-4 pb-4">
        <div className="grid grid-cols-2 gap-3">
          {ALL_TAGS.map((tag, i) => {
            const rep = representativeArt(tag);
            const count = artworksByTag(tag).length;
            const colors = TAG_COLORS[tag];
            return (
              <motion.button
                key={tag}
                type="button"
                className="flex flex-col overflow-hidden text-left"
                style={{
                  border: `1px solid ${colors.border}`,
                  background: "oklch(0.08 0.015 265)",
                  boxShadow: `0 0 8px ${colors.glow}`,
                }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04, duration: 0.2 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setActiveCategory(tag)}
                data-ocid={`models.category.item.${i + 1}`}
              >
                {/* Thumbnail */}
                <div
                  className="relative w-full scanlines"
                  style={{
                    aspectRatio: "1 / 1",
                    background: "oklch(0.05 0.01 265)",
                  }}
                >
                  {rep ? (
                    <div className="w-full h-full flex items-center justify-center">
                      <PixelGrid
                        paletteId={rep.paletteId}
                        patternId={rep.id - 1}
                        size={16}
                        pixelSize={8}
                      />
                    </div>
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-2xl">
                      {TAG_ICONS[tag]}
                    </div>
                  )}
                  {/* Count badge */}
                  <div
                    className="absolute top-1.5 right-1.5 px-1.5 py-0.5 text-[9px] font-mono font-bold"
                    style={{
                      background: "oklch(0 0 0 / 0.75)",
                      color: colors.text,
                      border: `1px solid ${colors.border}`,
                    }}
                  >
                    {count}
                  </div>
                </div>

                {/* Label */}
                <div
                  className="px-2 py-2 flex items-center gap-1.5"
                  style={{ borderTop: `1px solid ${colors.border}` }}
                >
                  <span className="text-base leading-none">
                    {TAG_ICONS[tag]}
                  </span>
                  <span
                    className="text-[11px] font-mono font-bold uppercase tracking-wider"
                    style={{ color: colors.text }}
                  >
                    {tag}
                  </span>
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Category detail overlay */}
      <AnimatePresence>
        {activeCategory && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-30 flex flex-col"
            style={{ background: "oklch(0.08 0.015 265)" }}
          >
            {/* Overlay header */}
            <div
              className="flex items-center gap-3 px-4 py-3 flex-shrink-0"
              style={{
                borderBottom: `1px solid ${TAG_COLORS[activeCategory].border}`,
                boxShadow: `0 1px 12px ${TAG_COLORS[activeCategory].glow}`,
              }}
            >
              <span className="text-xl">{TAG_ICONS[activeCategory]}</span>
              <div className="flex-1">
                <div
                  className="text-[15px] font-bold font-mono uppercase tracking-widest"
                  style={{ color: TAG_COLORS[activeCategory].text }}
                >
                  {activeCategory}
                </div>
                <div className="text-[10px] font-mono text-muted-foreground">
                  {artworksByTag(activeCategory).length} artworks
                </div>
              </div>
              <button
                type="button"
                className="p-1.5 flex items-center justify-center"
                style={{
                  border: `1px solid ${TAG_COLORS[activeCategory].border}`,
                  color: TAG_COLORS[activeCategory].text,
                }}
                onClick={() => setActiveCategory(null)}
                data-ocid="models.category.close_button"
              >
                <X size={14} />
              </button>
            </div>

            {/* Artworks grid */}
            <div className="flex-1 overflow-y-auto px-4 py-4">
              {artworksByTag(activeCategory).length === 0 ? (
                <div
                  className="flex flex-col items-center justify-center h-48 gap-3"
                  data-ocid="models.category.empty_state"
                >
                  <div className="text-4xl">{TAG_ICONS[activeCategory]}</div>
                  <div className="text-xs font-mono text-muted-foreground text-center">
                    NO ARTWORKS YET
                    <br />
                    <span style={{ color: TAG_COLORS[activeCategory].text }}>
                      BE THE FIRST TO CREATE ONE
                    </span>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-3">
                  {artworksByTag(activeCategory).map((art, i) => (
                    <PixelCard
                      key={art.id}
                      art={art}
                      isLiked={likedIds.has(art.id)}
                      onLike={onLike}
                      index={i}
                      onClick={onOpenArt}
                    />
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
