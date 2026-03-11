import type { PixelArt } from "@/data/mockData";
import { Eye, Heart } from "lucide-react";
import { motion } from "motion/react";
import PixelGrid from "./PixelGrid";

const tagColors: Record<string, string> = {
  Nature: "border-[oklch(0.80_0.20_145)] text-[oklch(0.80_0.20_145)]",
  Abstract: "border-[oklch(0.65_0.25_335)] text-[oklch(0.65_0.25_335)]",
  Characters: "border-[oklch(0.78_0.18_195)] text-[oklch(0.78_0.18_195)]",
  Space: "border-[oklch(0.72_0.22_280)] text-[oklch(0.72_0.22_280)]",
  Fantasy: "border-[oklch(0.72_0.20_45)] text-[oklch(0.72_0.20_45)]",
  Retro: "border-[oklch(0.90_0.20_95)] text-[oklch(0.90_0.20_95)]",
  Horror: "border-[oklch(0.62_0.25_25)] text-[oklch(0.62_0.25_25)]",
  Vehicles: "border-[oklch(0.78_0.18_195)] text-[oklch(0.78_0.18_195)]",
  Animals: "border-[oklch(0.82_0.20_80)] text-[oklch(0.82_0.20_80)]",
  Buildings: "border-[oklch(0.75_0.18_195)] text-[oklch(0.75_0.18_195)]",
  Food: "border-[oklch(0.75_0.22_50)] text-[oklch(0.75_0.22_50)]",
  Sports: "border-[oklch(0.78_0.18_195)] text-[oklch(0.78_0.18_195)]",
  "Sci-Fi": "border-[oklch(0.80_0.22_145)] text-[oklch(0.80_0.22_145)]",
  Magic: "border-[oklch(0.72_0.25_305)] text-[oklch(0.72_0.25_305)]",
};

interface PixelCardProps {
  art: PixelArt;
  isLiked: boolean;
  onLike: (id: number) => void;
  index: number;
  onClick: (art: PixelArt) => void;
}

export default function PixelCard({
  art,
  isLiked,
  onLike,
  index,
  onClick,
}: PixelCardProps) {
  const pixelSize = 8;

  return (
    <motion.div
      className="pixel-border bg-card flex flex-col cursor-pointer"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.2 }}
      whileHover={{ y: -2 }}
      onClick={() => onClick(art)}
      data-ocid={`feed.item.${index + 1}`}
    >
      {/* Pixel art image */}
      <div
        className="relative overflow-hidden"
        style={{ aspectRatio: "1 / 1" }}
      >
        <div className="w-full h-full flex items-center justify-center bg-[oklch(0.06_0.01_265)] scanlines relative">
          <PixelGrid
            paletteId={art.paletteId}
            patternId={art.id - 1}
            size={16}
            pixelSize={pixelSize}
          />
        </div>
        <div className="absolute top-1 right-1 flex items-center gap-1 bg-[oklch(0_0_0_/_0.7)] px-1.5 py-0.5">
          <Eye size={9} className="text-muted-foreground" />
          <span className="text-[9px] font-mono text-muted-foreground">
            {art.views.toLocaleString()}
          </span>
        </div>
      </div>

      {/* Info */}
      <div className="p-2 flex flex-col gap-1.5 flex-1">
        <div className="text-[11px] font-bold font-mono text-foreground truncate leading-tight">
          {art.title}
        </div>
        <div className="text-[9px] font-mono text-muted-foreground truncate">
          @{art.author}
        </div>

        <div className="flex flex-wrap gap-1">
          {art.tags.slice(0, 2).map((tag) => (
            <span
              key={tag}
              className={`pixel-chip text-[8px] py-0.5 px-1.5 ${tagColors[tag] ?? "border-muted-foreground text-muted-foreground"}`}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Like button */}
        <div className="flex items-center justify-between mt-auto pt-1">
          <button
            type="button"
            className="flex items-center gap-1 group"
            onClick={(e) => {
              e.stopPropagation();
              onLike(art.id);
            }}
          >
            <Heart
              size={12}
              className={
                isLiked
                  ? "text-[oklch(0.65_0.25_335)] fill-[oklch(0.65_0.25_335)]"
                  : "text-muted-foreground group-hover:text-[oklch(0.65_0.25_335)]"
              }
              style={{ transition: "color 0.1s, fill 0.1s" }}
            />
            <span
              className={`text-[10px] font-mono ${isLiked ? "text-[oklch(0.65_0.25_335)]" : "text-muted-foreground"}`}
            >
              {art.likes + (isLiked ? 1 : 0)}
            </span>
          </button>
        </div>
      </div>
    </motion.div>
  );
}
