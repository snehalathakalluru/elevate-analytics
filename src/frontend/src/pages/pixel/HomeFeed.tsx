import PixelCard from "@/components/pixel/PixelCard";
import {
  ALL_TAGS,
  type PixelArt,
  type Tag,
  mockArtworks,
} from "@/data/mockData";
import { Search, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useMemo, useState } from "react";

interface HomeFeedProps {
  likedIds: Set<number>;
  onLike: (id: number) => void;
  onOpenArt: (art: PixelArt) => void;
}

export default function HomeFeed({
  likedIds,
  onLike,
  onOpenArt,
}: HomeFeedProps) {
  const [search, setSearch] = useState("");
  const [activeTag, setActiveTag] = useState<Tag | "All">("All");

  const filtered = useMemo(() => {
    let list = mockArtworks;
    if (activeTag !== "All") {
      list = list.filter((a) => a.tags.includes(activeTag));
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (a) =>
          a.title.toLowerCase().includes(q) ||
          a.tags.some((t) => t.toLowerCase().includes(q)),
      );
    }
    return list;
  }, [search, activeTag]);

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="px-4 pt-4 pb-2 flex-shrink-0">
        <div className="flex items-center gap-2 mb-3">
          <div className="text-[18px] font-bold font-mono neon-cyan tracking-wider">
            PIXEL<span className="neon-magenta">VIEW</span>
          </div>
          <span className="blink text-[oklch(0.78_0.18_195)] text-lg">█</span>
        </div>

        <div className="relative">
          <Search
            size={13}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
          />
          <input
            className="pixel-input pl-8 pr-8"
            placeholder="SEARCH PIXELS..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            data-ocid="feed.search_input"
          />
          {search && (
            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              onClick={() => setSearch("")}
            >
              <X size={13} />
            </button>
          )}
        </div>
      </div>

      {/* Tag filter row */}
      <div className="px-4 pb-2 flex-shrink-0">
        <div
          className="flex gap-2 overflow-x-auto pb-1"
          style={{ scrollbarWidth: "none" }}
        >
          {(["All", ...ALL_TAGS] as ("All" | Tag)[]).map((tag) => (
            <button
              key={tag}
              type="button"
              className={`pixel-chip flex-shrink-0 ${
                activeTag === tag
                  ? "bg-[oklch(0.78_0.18_195_/_0.2)] border-[oklch(0.78_0.18_195)] text-[oklch(0.78_0.18_195)]"
                  : "border-border text-muted-foreground hover:border-foreground hover:text-foreground"
              }`}
              onClick={() => setActiveTag(tag)}
              data-ocid="feed.tab"
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="flex-1 overflow-y-auto px-4 pb-4">
        <AnimatePresence mode="wait">
          {filtered.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center h-48 gap-3"
              data-ocid="feed.empty_state"
            >
              <div className="text-4xl">🎮</div>
              <div className="text-xs font-mono text-muted-foreground text-center">
                NO PIXELS FOUND
                <br />
                <span className="text-[oklch(0.78_0.18_195)]">
                  TRY A DIFFERENT SEARCH
                </span>
              </div>
            </motion.div>
          ) : (
            <motion.div key="grid" className="grid grid-cols-2 gap-3">
              {filtered.map((art, i) => (
                <PixelCard
                  key={art.id}
                  art={art}
                  isLiked={likedIds.has(art.id)}
                  onLike={onLike}
                  index={i}
                  onClick={onOpenArt}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
