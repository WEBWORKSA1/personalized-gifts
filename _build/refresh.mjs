// Refreshes data/videos.json from the public upload feeds of the craft channels
// listed in config.mjs. No API key. Run before build.mjs: node _build/refresh.mjs
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import config from './config.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const OUT = path.join(ROOT, 'data/videos.json');
const CACHE = path.join(ROOT, 'data/channels.json');
const HEADERS = {
  'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36',
  'Accept-Language': 'en-US,en;q=0.9',
  Cookie: 'CONSENT=YES+cb; SOCS=CAI',
};
const readJson = (file, fallback) => { try { return JSON.parse(fs.readFileSync(file, 'utf8')); } catch { return fallback; } };

async function get(url, ms = 15000) {
  const ctl = new AbortController();
  const timer = setTimeout(() => ctl.abort(), ms);
  try {
    const res = await fetch(url, { headers: HEADERS, signal: ctl.signal, redirect: 'follow' });
    return { ok: res.ok, status: res.status, text: res.ok ? await res.text() : '' };
  } catch (err) {
    return { ok: false, status: 0, text: '', error: String(err && err.message) };
  } finally { clearTimeout(timer); }
}

const decode = (s) => s.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;|&apos;/g, "'");

async function channelId(handle, cache) {
  if (cache[handle]) return cache[handle];
  const res = await get(`https://www.youtube.com/@${handle}`);
  if (!res.ok) return null;
  const m = /<link rel="canonical" href="https:\/\/www\.youtube\.com\/channel\/(UC[\w-]{22})"/.exec(res.text)
    || /"externalId":"(UC[\w-]{22})"/.exec(res.text) || /channel_id=(UC[\w-]{22})/.exec(res.text);
  if (m) cache[handle] = m[1];
  return m ? m[1] : null;
}

async function feed(id) {
  const res = await get(`https://www.youtube.com/feeds/videos.xml?channel_id=${id}`);
  if (!res.ok) return [];
  return [...res.text.matchAll(/<entry>([\s\S]*?)<\/entry>/g)].map(([, e]) => {
    const pick = (re) => (re.exec(e) || [])[1] || '';
    return {
      id: pick(/<yt:videoId>([\w-]{6,20})<\/yt:videoId>/),
      title: decode(pick(/<title>([\s\S]*?)<\/title>/)).trim(),
      channel: decode(pick(/<author>\s*<name>([\s\S]*?)<\/name>/)).trim(),
      published: pick(/<published>([^<]+)<\/published>/),
    };
  }).filter((v) => v.id && v.title);
}

const cfg = config.videos;
const wanted = (title) => {
  const t = title.toLowerCase();
  if (t.includes('#shorts') || t.length > 110) return false;
  if (cfg.block.some((w) => new RegExp(`(^|[^a-z])${w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}([^a-z]|$)`).test(t))) return false;
  return cfg.keywords.some((k) => t.includes(k));
};
const alive = async (id) => (await get(`https://www.youtube.com/oembed?format=json&url=${encodeURIComponent(`https://www.youtube.com/watch?v=${id}`)}`, 10000)).ok;

const previous = readJson(OUT, { updated: '', videos: [] });
const cache = readJson(CACHE, {});
const found = [];
for (const handle of cfg.handles) {
  const id = await channelId(handle, cache);
  if (!id) { console.log(`skip @${handle}: channel not resolved`); continue; }
  const items = (await feed(id)).filter((v) => wanted(v.title)).slice(0, cfg.perChannel);
  console.log(`@${handle}: ${items.length} matching videos`);
  found.push(...items);
}

// Newest first, then top up with earlier picks that are still online.
const seen = new Set();
const merged = [];
for (const v of [...found.sort((a, b) => b.published.localeCompare(a.published)), ...previous.videos]) {
  if (seen.has(v.id) || merged.length >= cfg.max) continue;
  seen.add(v.id);
  if (await alive(v.id)) merged.push({ id: v.id, title: v.title.slice(0, 110), channel: v.channel.slice(0, 60), published: v.published });
}

if (!merged.length) {
  console.log('No videos could be confirmed this run; keeping the existing list.');
} else {
  const same = JSON.stringify(merged) === JSON.stringify(previous.videos);
  fs.mkdirSync(path.dirname(OUT), { recursive: true });
  fs.writeFileSync(OUT, JSON.stringify({ updated: same ? previous.updated || new Date().toISOString() : new Date().toISOString(), videos: merged }, null, 1));
  fs.writeFileSync(CACHE, JSON.stringify(cache, null, 1));
  console.log(`Saved ${merged.length} videos${same ? ' (unchanged)' : ''}.`);
}
