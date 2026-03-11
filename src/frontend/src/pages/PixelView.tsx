import PixelGrid from "@/components/pixel/PixelGrid";
import type { PixelArt } from "@/data/mockData";
import {
  Compass,
  Eye,
  Heart,
  Home,
  Layers,
  Upload,
  User,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import ExploreScreen from "./pixel/ExploreScreen";
import HomeFeed from "./pixel/HomeFeed";
import ModelsScreen from "./pixel/ModelsScreen";
import ProfileScreen from "./pixel/ProfileScreen";
import UploadScreen from "./pixel/UploadScreen";

type Screen = "home" | "explore" | "upload" | "profile" | "models";

const NAV_ITEMS: { id: Screen; icon: React.ReactNode; label: string }[] = [
  { id: "home", icon: <Home size={18} />, label: "Feed" },
  { id: "explore", icon: <Compass size={18} />, label: "Explore" },
  { id: "upload", icon: <Upload size={18} />, label: "Upload" },
  { id: "models", icon: <Layers size={18} />, label: "Models" },
  { id: "profile", icon: <User size={18} />, label: "Profile" },
];

export default function PixelView() {
  const [screen, setScreen] = useState<Screen>("home");
  const [likedIds, setLikedIds] = useState<Set<number>>(new Set([6, 12]));
  const [openArt, setOpenArt] = useState<PixelArt | null>(null);

  const handleLike = (id: number) => {
    setLikedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <div
      className="flex justify-center items-center min-h-screen bg-[oklch(0.05_0.01_265)]"
      style={{
        backgroundImage:
          "radial-gradient(ellipse at 50% 0%, oklch(0.12 0.04 265 / 0.4) 0%, transparent 60%)",
      }}
    >
      {/* Mobile shell */}
      <div
        className="relative flex flex-col overflow-hidden"
        style={{
          width: "100%",
          maxWidth: 390,
          height: "100dvh",
          background: "oklch(0.08 0.015 265)",
          borderLeft: "1px solid oklch(0.22 0.035 265)",
          borderRight: "1px solid oklch(0.22 0.035 265)",
        }}
      >
        {/* Screen content */}
        <div className="flex-1 overflow-hidden relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={screen}
              initial={{ opacity: 0, x: 8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -8 }}
              transition={{ duration: 0.15 }}
              className="h-full"
            >
              {screen === "home" && (
                <HomeFeed
                  likedIds={likedIds}
                  onLike={handleLike}
                  onOpenArt={setOpenArt}
                />
              )}
              {screen === "explore" && (
                <ExploreScreen
                  likedIds={likedIds}
                  onLike={handleLike}
                  onOpenArt={setOpenArt}
                />
              )}
              {screen === "upload" && <UploadScreen />}
              {screen === "models" && (
                <ModelsScreen
                  likedIds={likedIds}
                  onLike={handleLike}
                  onOpenArt={setOpenArt}
                />
              )}
              {screen === "profile" && (
                <ProfileScreen likedIds={likedIds} onOpenArt={setOpenArt} />
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Bottom nav */}
        <div
          className="bottom-nav flex-shrink-0 flex items-stretch"
          style={{ height: 60, paddingBottom: "env(safe-area-inset-bottom)" }}
        >
          {NAV_ITEMS.map(({ id, icon, label }) => {
            const active = screen === id;
            return (
              <button
                key={id}
                type="button"
                className="flex-1 flex flex-col items-center justify-center gap-0.5 relative"
                onClick={() => setScreen(id)}
                data-ocid={`nav.${id}.link`}
              >
                {active && (
                  <motion.div
                    layoutId="nav-indicator"
                    className="absolute top-0 left-0 right-0 h-0.5 bg-[oklch(0.78_0.18_195)]"
                    style={{ boxShadow: "0 0 8px oklch(0.78 0.18 195 / 0.8)" }}
                  />
                )}
                <span
                  className={active ? "neon-cyan" : "text-muted-foreground"}
                  style={{ transition: "color 0.15s" }}
                >
                  {icon}
                </span>
                <span
                  className={`text-[9px] font-bold font-mono uppercase tracking-widest ${
                    active ? "neon-cyan" : "text-muted-foreground"
                  }`}
                  style={{ transition: "color 0.15s" }}
                >
                  {label}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Art detail modal */}
      <AnimatePresence>
        {openArt && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-end justify-center"
            style={{
              background: "oklch(0 0 0 / 0.85)",
              backdropFilter: "blur(4px)",
            }}
            onClick={() => setOpenArt(null)}
            data-ocid="art.modal"
          >
            <motion.div
              initial={{ y: 80, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 80, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="pixel-border bg-card w-full"
              style={{ maxWidth: 390 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div
                className="relative flex items-center justify-center bg-[oklch(0.05_0.01_265)] scanlines"
                style={{ height: 200 }}
              >
                <PixelGrid
                  paletteId={openArt.paletteId}
                  patternId={openArt.id - 1}
                  size={16}
                  pixelSize={12}
                />
                <button
                  type="button"
                  className="absolute top-3 right-3 p-1.5 bg-[oklch(0_0_0_/_0.7)] border border-border"
                  onClick={() => setOpenArt(null)}
                  data-ocid="art.close_button"
                >
                  <X size={14} className="text-foreground" />
                </button>
              </div>

              <div className="p-4">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="text-[15px] font-bold font-mono text-foreground">
                      {openArt.title}
                    </div>
                    <div className="text-[11px] font-mono neon-cyan">
                      @{openArt.author}
                    </div>
                  </div>
                  <button
                    type="button"
                    className="flex items-center gap-1.5 pixel-chip flex-shrink-0"
                    style={{
                      borderColor: likedIds.has(openArt.id)
                        ? "oklch(0.65 0.25 335)"
                        : "oklch(0.22 0.035 265)",
                      color: likedIds.has(openArt.id)
                        ? "oklch(0.65 0.25 335)"
                        : "oklch(0.55 0.04 265)",
                    }}
                    onClick={() => handleLike(openArt.id)}
                    data-ocid="art.toggle"
                  >
                    <Heart
                      size={13}
                      fill={
                        likedIds.has(openArt.id)
                          ? "oklch(0.65 0.25 335)"
                          : "none"
                      }
                    />
                    <span className="text-[10px] font-mono">
                      {openArt.likes + (likedIds.has(openArt.id) ? 1 : 0)}
                    </span>
                  </button>
                </div>

                <p className="text-[11px] font-mono text-muted-foreground mt-2 leading-relaxed">
                  {openArt.description}
                </p>

                <div className="flex flex-wrap gap-1.5 mt-3">
                  {openArt.tags.map((tag) => (
                    <span
                      key={tag}
                      className="pixel-chip text-[9px] border-border text-muted-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-4 mt-3 pt-3 border-t border-border">
                  <div className="flex items-center gap-1 text-[10px] font-mono text-muted-foreground">
                    <Eye size={11} />
                    {openArt.views.toLocaleString()} views
                  </div>
                  <div className="text-[10px] font-mono text-muted-foreground">
                    {new Date(openArt.createdAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
