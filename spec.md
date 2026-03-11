# Pixel View

## Current State
Pixel View is a retro-arcade PWA with 4 screens (Home Feed, Explore, Upload, Profile) and 12 pixel art pieces across 8 categories: Nature, Abstract, Characters, Space, Fantasy, Retro, Horror, Vehicles. Pixel art is rendered via CSS grid patterns with neon palettes.

## Requested Changes (Diff)

### Add
- 6 new pixel art model **types/categories**: Animals, Buildings, Food, Sports, Sci-Fi, Magic
- 6 new pixel patterns in mockData.ts (one per new category): Bird, House, Pizza, Trophy, UFO, Wizard
- 6 new palette sets for the new patterns
- 6 new mock artworks (one per new type)
- A **"Models" screen** (new 5th nav tab) that shows all model types as a visual category grid — each category card shows a representative pixel art, category name, and artwork count
- Clicking a category card opens a full-screen category detail sheet listing all artworks of that type

### Modify
- Bottom nav: add a 5th tab "Models" (Layers icon)
- mockData.ts: add new Tag types, 6 new patterns, 6 new palettes, 6 new artworks
- Screen type union: add "models"

### Remove
- Nothing removed

## Implementation Plan
1. Update `mockData.ts`: add 6 new tags to Tag union, 6 new PatternFn entries in patterns array, 6 new palette arrays, 6 new PixelArt entries in mockArtworks, update ALL_TAGS
2. Create `src/frontend/src/pages/pixel/ModelsScreen.tsx`: category grid with all 14 tags, each showing a representative pixel art thumbnail, count badge, and tap-to-drill-down
3. Create `src/frontend/src/pages/pixel/CategoryDetail.tsx`: full artwork list for a selected category (reuses PixelCard)
4. Update `PixelView.tsx`: add "models" to Screen type, add Models nav item with Layers icon, render ModelsScreen
