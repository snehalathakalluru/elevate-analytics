import PixelGrid from "@/components/pixel/PixelGrid";
import { type PixelArt, mockArtworks } from "@/data/mockData";
import { Grid, Heart } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

const MY_UPLOADS = mockArtworks.filter((a) => a.author === "pixelwitch");

interface ProfileProps {
  likedIds: Set<number>;
  onOpenArt: (art: PixelArt) => void;
}

export default function ProfileScreen({ likedIds, onOpenArt }: ProfileProps) {
  const [tab, setTab] = useState<"uploads" | "liked">("uploads");

  const likedArt = mockArtworks.filter((a) => likedIds.has(a.id));
  const displayList = tab === "uploads" ? MY_UPLOADS : likedArt;

  const totalLikesReceived = MY_UPLOADS.reduce((sum, a) => sum + a.likes, 0);

  return (
    <div className="flex flex-col h-full">
      <div className="px-4 pt-4 pb-3 flex-shrink-0 border-b border-border">
        <div className="text-[14px] font-bold font-mono neon-yellow tracking-widest uppercase">
          Profile
        </div>
      </div>

      {/* Profile card */}
      <div className="p-4 flex-shrink-0">
        <div className="pixel-border bg-card p-4">
          <div className="flex items-center gap-4">
            <div
              className="flex-shrink-0 pixel-border-cyan overflow-hidden scanlines relative"
              style={{ width: 60, height: 60 }}
            >
              <PixelGrid paletteId={0} patternId={11} size={8} pixelSize={7} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-[15px] font-bold font-mono text-foreground">
                pixelwitch
              </div>
              <div className="text-[10px] font-mono neon-cyan">
                @pixelwitch · since 2025
              </div>
              <div className="text-[9px] font-mono text-muted-foreground mt-0.5">
                Pixel art is life. Creating worlds one dot at a time.
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2 mt-4">
            {[
              { label: "Uploads", value: MY_UPLOADS.length },
              { label: "Likes", value: totalLikesReceived },
              { label: "Following", value: 42 },
            ].map((stat) => (
              <div
                key={stat.label}
                className="flex flex-col items-center border border-border py-2"
              >
                <div className="text-[16px] font-bold font-mono neon-cyan">
                  {stat.value.toLocaleString()}
                </div>
                <div className="text-[9px] font-mono text-muted-foreground uppercase tracking-wider">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="px-4 flex-shrink-0 flex gap-0 border-b border-border">
        {(["uploads", "liked"] as const).map((t) => (
          <button
            key={t}
            type="button"
            className={`flex items-center gap-1.5 px-4 py-2.5 text-[11px] font-bold font-mono uppercase tracking-wider border-b-2 transition-colors ${
              tab === t
                ? "border-[oklch(0.78_0.18_195)] text-[oklch(0.78_0.18_195)]"
                : "border-transparent text-muted-foreground"
            }`}
            onClick={() => setTab(t)}
            data-ocid="profile.tab"
          >
            {t === "uploads" ? <Grid size={11} /> : <Heart size={11} />}
            {t === "uploads" ? "My Art" : "Liked"}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="flex-1 overflow-y-auto p-4">
        {displayList.length === 0 ? (
          <div
            className="flex flex-col items-center justify-center h-32 gap-2"
            data-ocid="profile.empty_state"
          >
            <div className="text-3xl">{tab === "uploads" ? "🎨" : "💔"}</div>
            <div className="text-[10px] font-mono text-muted-foreground text-center">
              {tab === "uploads" ? "NO UPLOADS YET" : "NO LIKED ARTWORKS"}
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-2">
            {displayList.map((art, i) => (
              <motion.div
                key={art.id}
                className="pixel-border bg-card cursor-pointer"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.04 }}
                whileHover={{ scale: 1.03 }}
                onClick={() => onOpenArt(art)}
                data-ocid={`profile.item.${i + 1}`}
              >
                <div
                  className="scanlines relative flex items-center justify-center bg-[oklch(0.06_0.01_265)]"
                  style={{ aspectRatio: "1/1" }}
                >
                  <PixelGrid
                    paletteId={art.paletteId}
                    patternId={art.id - 1}
                    size={16}
                    pixelSize={5}
                  />
                </div>
                <div className="p-1">
                  <div className="text-[8px] font-mono text-muted-foreground truncate">
                    {art.title}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
