// Writes a fully rendered HTML file for every route, so search engines and link previews
// (WhatsApp, Facebook, X) see each page's real content, title and social tags without running
// JavaScript. Runs after both Vite builds: `dist/` (browser) and `dist-ssr/` (server renderer).
import { mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const dist = join(root, 'dist');
const ssrDir = join(root, 'dist-ssr');

/** Route -> output file. Netlify serves /about from about/index.html and 404.html for unknown URLs. */
const routes = [
  { url: '/', file: 'index.html' },
  { url: '/about', file: 'about/index.html' },
  { url: '/contact', file: 'contact/index.html' },
  { url: '/videos', file: 'videos/index.html' },
  { url: '/stalls', file: 'stalls/index.html' },
  { url: '/404', file: '404.html' },
];

const template = await readFile(join(dist, 'index.html'), 'utf8');
if (!template.includes('<!--app-head-->') || !template.includes('<!--app-html-->')) {
  throw new Error('dist/index.html is missing the <!--app-head--> or <!--app-html--> placeholder.');
}

const { render } = await import(pathToFileURL(join(ssrDir, 'entry-server.js')).href);

for (const { url, file } of routes) {
  const { html, head } = await render(url);
  if (!head.includes('<title')) throw new Error(`Pre-render of ${url} produced no <title>; is <Seo> missing?`);

  const page = template.replace('<!--app-head-->', head).replace('<!--app-html-->', html);
  const target = join(dist, file);
  await mkdir(dirname(target), { recursive: true });
  await writeFile(target, page);
  console.log(`prerendered ${url.padEnd(10)} -> dist/${file}`);
}

await rm(ssrDir, { recursive: true, force: true });
