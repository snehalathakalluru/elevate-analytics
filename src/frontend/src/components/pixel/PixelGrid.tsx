import { palettes, patterns } from "@/data/mockData";

interface PixelGridProps {
  paletteId: number;
  patternId: number;
  size?: number;
  pixelSize?: number;
}

export default function PixelGrid({
  paletteId,
  patternId,
  size = 16,
  pixelSize = 10,
}: PixelGridProps) {
  const palette = palettes[paletteId % palettes.length];
  const patternFn = patterns[patternId % patterns.length];

  const cells: string[] = [];
  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      const colorIdx = patternFn(r, c, paletteId);
      cells.push(palette[colorIdx % palette.length]);
    }
  }

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${size}, ${pixelSize}px)`,
        gridTemplateRows: `repeat(${size}, ${pixelSize}px)`,
        imageRendering: "pixelated",
        flexShrink: 0,
      }}
    >
      {cells.map((color, i) => {
        const row = Math.floor(i / size);
        const col = i % size;
        return (
          <div
            key={`${row}-${col}`}
            style={{
              width: pixelSize,
              height: pixelSize,
              backgroundColor: color,
            }}
          />
        );
      })}
    </div>
  );
}
