import PixelGrid from "@/components/pixel/PixelGrid";
import { type PixelArt, mockArtworks } from "@/data/mockData";
import { ChevronRight } from "lucide-react";
import { motion } from "motion/react";
import { useRef } from "react";

interface ExploreProps {
  likedIds: Set<number>;
  onLike: (id: number) => void;
  onOpenArt: (art: PixelArt) => void;
}

const trending = [...mockArtworks]
  .sort((a, b) => b.views - a.views)
  .slice(0, 6);
const newest = [...mockArtworks].sort((a, b) => b.id - a.id).slice(0, 6);
const topLiked = [...mockArtworks]
  .sort((a, b) => b.likes - a.likes)
  .slice(0, 6);

function HorizontalCard({
  art,
  onOpenArt,
  rank,
}: { art: PixelArt; onOpenArt: (a: PixelArt) => void; rank?: number }) {
  return (
    <motion.div
      className="flex-shrink-0 pixel-border bg-card cursor-pointer"
      style={{ width: 130 }}
      whileHover={{ y: -2 }}
      onClick={() => onOpenArt(art)}
    >
      <div
        className="relative flex items-center justify-center bg-[oklch(0.06_0.01_265)] scanlines"
        style={{ height: 100 }}
      >
        <PixelGrid
          paletteId={art.paletteId}
          patternId={art.id - 1}
          size={16}
          pixelSize={6}
        />
        {rank !== undefined && (
          <div className="absolute top-1 left-1 bg-[oklch(0.78_0.18_195)] text-[oklch(0.08_0.015_265)] text-[9px] font-bold font-mono px-1.5 py-0.5">
            #{rank + 1}
          </div>
        )}
      </div>
      <div className="p-1.5">
        <div className="text-[10px] font-bold font-mono text-foreground truncate">
          {art.title}
        </div>
        <div className="text-[9px] font-mono text-muted-foreground">
          @{art.author}
        </div>
      </div>
    </motion.div>
  );
}

function Section({
  title,
  items,
  onOpenArt,
  showRank,
}: {
  title: string;
  items: PixelArt[];
  onOpenArt: (a: PixelArt) => void;
  showRank?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <div className="mb-5">
      <div className="px-4 mb-2 flex items-center justify-between">
        <div className="text-[12px] font-bold font-mono neon-cyan tracking-wider uppercase">
          {title}
        </div>
        <ChevronRight size={14} className="text-muted-foreground" />
      </div>
      <div
        ref={ref}
        className="flex gap-3 overflow-x-auto px-4 pb-2"
        style={{ scrollbarWidth: "none" }}
      >
        {items.map((art, i) => (
          <HorizontalCard
            key={art.id}
            art={art}
            onOpenArt={onOpenArt}
            rank={showRank ? i : undefined}
          />
        ))}
      </div>
    </div>
  );
}

export default function ExploreScreen({ onOpenArt }: ExploreProps) {
  return (
    <div className="flex flex-col h-full">
      <div className="px-4 pt-4 pb-3 flex-shrink-0">
        <div className="text-[14px] font-bold font-mono neon-magenta tracking-widest uppercase">
          Explore
        </div>
        <div className="text-[10px] font-mono text-muted-foreground mt-0.5">
          Discover the pixel multiverse
        </div>
      </div>

      {/* Featured banner */}
      <div className="mx-4 mb-4 flex-shrink-0">
        <button
          className="relative pixel-border-yellow overflow-hidden flex items-center gap-4 p-3 bg-[oklch(0.12_0.02_265)] cursor-pointer w-full text-left"
          onClick={() => onOpenArt(topLiked[0])}
          type="button"
        >
          <div className="flex-shrink-0 scanlines relative">
            <PixelGrid
              paletteId={topLiked[0].paletteId}
              patternId={topLiked[0].id - 1}
              size={16}
              pixelSize={7}
            />
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-[9px] font-mono neon-yellow tracking-widest mb-1">
              ★ FEATURED
            </div>
            <div className="text-[13px] font-bold font-mono text-foreground truncate">
              {topLiked[0].title}
            </div>
            <div className="text-[10px] font-mono text-muted-foreground">
              @{topLiked[0].author}
            </div>
            <div className="text-[9px] font-mono text-muted-foreground mt-1">
              {topLiked[0].likes} likes · {topLiked[0].views.toLocaleString()}{" "}
              views
            </div>
          </div>
        </button>
      </div>

      <div className="flex-1 overflow-y-auto pb-4">
        <Section title="🔥 Trending" items={trending} onOpenArt={onOpenArt} />
        <Section title="✨ Newest" items={newest} onOpenArt={onOpenArt} />
        <Section
          title="❤️ Top Liked"
          items={topLiked}
          onOpenArt={onOpenArt}
          showRank
        />
      </div>
    </div>
  );
}
