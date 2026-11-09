// Video files live in src/assets so Vite fingerprints them; this resolves them by number.
// Only the files listed below are matched (1-4 and 10-32): anything the glob matches ships in the
// build, so a wider pattern would publish spare videos nobody can reach.
const files = import.meta.glob(['../../assets/[1-4].mp4', '../../assets/[12][0-9].mp4', '../../assets/3[0-2].mp4'], {
  eager: true,
  query: '?url',
  import: 'default',
}) as Record<string, string>;

const byNumber = (n: number) => files[`../../assets/${n}.mp4`];

// Posters are portrait phone frames shown in square cards, so the build crops them square (as
// object-cover would) and makes small WebP versions. Vite needs these queries written out literally.
const posterSrcs = import.meta.glob('../../assets/posters/*.jpg', {
  eager: true,
  query: '?w=640&aspect=1:1&fit=cover&format=webp&quality=72',
  import: 'default',
}) as Record<string, string>;
const posterSrcSets = import.meta.glob('../../assets/posters/*.jpg', {
  eager: true,
  query: '?w=320;640&aspect=1:1&fit=cover&format=webp&quality=72&as=srcset',
  import: 'default',
}) as Record<string, string>;
const posterPath = (n: number) => `../../assets/posters/poster${n}.jpg`;

export type GalleryVideo = {
  src: string;
  /** Leave out to use the video's own first frame as its cover. */
  poster?: string;
  /** Responsive versions of `poster`. */
  posterSrcSet?: string;
  title: string;
};

/** Highlights from past editions: assets 10.mp4 to 32.mp4 with assets/posters/poster1.jpg to poster23.jpg. */
export const pastVideos: GalleryVideo[] = Array.from({ length: 23 }, (_, i) => ({
  src: byNumber(10 + i),
  poster: posterSrcs[posterPath(i + 1)],
  posterSrcSet: posterSrcSets[posterPath(i + 1)],
  title: `Exhibition highlight ${i + 1}`,
}));

/**
 * Teasers for the upcoming editions, shown on the home page.
 * To change them, just replace src/assets/1.mp4 to 4.mp4 (keep the file names). There are no
 * separate cover images: each card shows its own video's first frame.
 */
export const upcomingVideos: GalleryVideo[] = Array.from({ length: 4 }, (_, i) => ({
  src: byNumber(1 + i),
  title: `Upcoming edition preview ${i + 1}`,
}));
