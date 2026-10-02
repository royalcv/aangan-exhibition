// Video files live in src/assets so Vite fingerprints them; this resolves them by number.
const files = import.meta.glob('/src/assets/*.mp4', {
  eager: true,
  query: '?url',
  import: 'default',
}) as Record<string, string>;

const byNumber = (n: number) => files[`/src/assets/${n}.mp4`];

export type GalleryVideo = {
  src: string;
  poster: string;
  title: string;
};

/** Highlights from past editions: assets 10.mp4 to 32.mp4 with posters 1 to 23. */
export const pastVideos: GalleryVideo[] = Array.from({ length: 23 }, (_, i) => ({
  src: byNumber(10 + i),
  poster: `/videos/poster${i + 1}.jpg`,
  title: `Exhibition highlight ${i + 1}`,
}));
