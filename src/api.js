// ===== settings and helpers shared by all components =====
// '/webwanderer/' is forwarded to XAMPP by the proxy in vite.config.js
export const BASE = '/webwanderer/';
export const API  = BASE + 'module_d_api.php';
export const PICS = BASE + 'pics/';

// fetch a file and fail loudly if it is missing
export async function get(path, type = 'json') {
  const res = await fetch(path, { cache: 'no-store' });
  if (!res.ok) throw new Error(`${path} returned ${res.status}`);
  return type === 'json' ? res.json() : res.text();
}

// average rating, 0 if no reviews
export function avg(h) {
  const n = h.reviews.length;
  if (!n) return 0;
  return h.reviews.reduce((sum, r) => sum + r.rating, 0) / n;
}

// picture url: "Hampton Inn_1.jpg" etc.
export const url = (name, i) => PICS + encodeURIComponent(`${name}_${i}.jpg`);

// true if the image loads, false if not
function exists(src) {
  return new Promise(res => {
    const img = new Image();
    img.onload  = () => res(true);
    img.onerror = () => res(false);
    img.src = src;
  });
}

// count how many pictures a hotel has (remembered so we only probe once)
const totals = {};
export async function countImages(name) {
  if (totals[name]) return totals[name];
  let n = 0;
  while (n < 30 && await exists(url(name, n + 1))) n++;
  return (totals[name] = n);
}
