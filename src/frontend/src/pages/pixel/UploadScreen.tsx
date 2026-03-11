import { ALL_TAGS, type Tag } from "@/data/mockData";
import { Check, ImagePlus, Upload, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useRef, useState } from "react";
import { toast } from "sonner";

export default function UploadScreen() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const toggleTag = (tag: Tag) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag],
    );
  };

  const handleFile = (file: File) => {
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file?.type.startsWith("image/")) handleFile(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      toast.error("Title is required!");
      return;
    }
    if (selectedTags.length === 0) {
      toast.error("Select at least one tag!");
      return;
    }
    setIsSubmitting(true);
    await new Promise((r) => setTimeout(r, 1200));
    setIsSubmitting(false);
    setSubmitted(true);
    toast.success("Pixel art uploaded!");
    setTimeout(() => {
      setSubmitted(false);
      setTitle("");
      setDescription("");
      setSelectedTags([]);
      setPreviewUrl(null);
    }, 2000);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="px-4 pt-4 pb-3 flex-shrink-0 border-b border-border">
        <div className="text-[14px] font-bold font-mono neon-yellow tracking-widest uppercase">
          Upload Pixel Art
        </div>
        <div className="text-[10px] font-mono text-muted-foreground mt-0.5">
          Share your creation with the world
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        <form onSubmit={handleSubmit} className="p-4 flex flex-col gap-4">
          {/* Image upload */}
          <div>
            <div className="section-title mb-2">Image</div>
            <label
              className="relative border-2 border-dashed border-border flex flex-col items-center justify-center cursor-pointer hover:border-primary transition-colors"
              style={{ minHeight: 140 }}
              onDrop={handleDrop}
              onDragOver={(e) => e.preventDefault()}
              data-ocid="upload.dropzone"
            >
              <input
                ref={fileRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) handleFile(file);
                }}
              />
              <AnimatePresence mode="wait">
                {previewUrl ? (
                  <motion.div
                    key="preview"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="relative w-full"
                  >
                    <img
                      src={previewUrl}
                      alt="Preview"
                      className="w-full object-contain"
                      style={{ maxHeight: 200, imageRendering: "pixelated" }}
                    />
                    <button
                      type="button"
                      className="absolute top-1 right-1 bg-[oklch(0_0_0_/_0.8)] border border-border p-1"
                      onClick={(e) => {
                        e.stopPropagation();
                        setPreviewUrl(null);
                      }}
                    >
                      <X size={12} className="text-foreground" />
                    </button>
                  </motion.div>
                ) : (
                  <motion.div
                    key="prompt"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex flex-col items-center gap-2 py-6 px-4"
                  >
                    <ImagePlus size={28} className="text-muted-foreground" />
                    <div className="text-[10px] font-mono text-muted-foreground text-center">
                      DROP IMAGE HERE
                      <br />
                      <span className="text-[oklch(0.78_0.18_195)]">
                        OR CLICK TO BROWSE
                      </span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </label>
          </div>

          {/* Title */}
          <div>
            <div className="section-title mb-2">Title *</div>
            <input
              className="pixel-input"
              placeholder="ENTER ART TITLE..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              maxLength={40}
              data-ocid="upload.input"
            />
            <div className="text-right text-[9px] font-mono text-muted-foreground mt-1">
              {title.length}/40
            </div>
          </div>

          {/* Description */}
          <div>
            <div className="section-title mb-2">Description</div>
            <textarea
              className="pixel-input resize-none"
              placeholder="DESCRIBE YOUR ARTWORK..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              maxLength={200}
              data-ocid="upload.textarea"
            />
            <div className="text-right text-[9px] font-mono text-muted-foreground mt-1">
              {description.length}/200
            </div>
          </div>

          {/* Tags */}
          <div>
            <div className="section-title mb-2">
              Tags *{" "}
              <span className="text-muted-foreground normal-case">
                ({selectedTags.length} selected)
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {ALL_TAGS.map((tag) => {
                const active = selectedTags.includes(tag);
                return (
                  <button
                    key={tag}
                    type="button"
                    className={`pixel-chip ${
                      active
                        ? "bg-[oklch(0.78_0.18_195_/_0.2)] border-[oklch(0.78_0.18_195)] text-[oklch(0.78_0.18_195)]"
                        : "border-border text-muted-foreground"
                    }`}
                    onClick={() => toggleTag(tag)}
                    data-ocid="upload.toggle"
                  >
                    {active && <Check size={9} className="inline mr-1" />}
                    {tag}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Submit */}
          <motion.button
            type="submit"
            className={`pixel-btn w-full mt-2 flex items-center justify-center gap-2 ${
              submitted ? "pixel-btn-filled" : "pixel-btn-cyan"
            }`}
            disabled={isSubmitting || submitted}
            whileTap={{ scale: 0.97 }}
            data-ocid="upload.submit_button"
          >
            {isSubmitting ? (
              <>
                <span className="blink">▋</span> UPLOADING...
              </>
            ) : submitted ? (
              <>
                <Check size={14} /> UPLOADED!
              </>
            ) : (
              <>
                <Upload size={14} /> UPLOAD ART
              </>
            )}
          </motion.button>
        </form>
      </div>
    </div>
  );
}
