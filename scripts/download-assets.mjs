import { createWriteStream } from "node:fs";
import { mkdir } from "node:fs/promises";
import https from "node:https";
import http from "node:http";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

const assets = [
  ["https://chungdoi.com/images/themes/love-art/hy.webp", "public/images/themes/love-art/hy.webp"],
  ["https://chungdoi.com/images/themes/love-art/hoa%20tim.webp", "public/images/themes/love-art/hoa-tim.webp"],
  ["https://chungdoi.com/images/themes/love-art/tim.webp", "public/images/themes/love-art/tim.webp"],
  ["https://chungdoi.com/images/themes/love-art/dau.webp", "public/images/themes/love-art/dau.webp"],
  ["https://chungdoi.com/images/themes/love-art/re.webp", "public/images/themes/love-art/re.webp"],
  ["https://chungdoi.com/images/themes/love-art/love.webp", "public/images/themes/love-art/love.webp"],
  ["https://chungdoi.com/images/themes/love-art/3%20tim.webp", "public/images/themes/love-art/3-tim.webp"],
  ["https://chungdoi.com/images/themes/love-art/lich.webp", "public/images/themes/love-art/lich.webp"],
  ["https://chungdoi.com/images/themes/love-art/dau%20ly.webp", "public/images/themes/love-art/dau-ly.webp"],
  ["https://chungdoi.com/images/themes/love-art/re%20ly.webp", "public/images/themes/love-art/re-ly.webp"],
  ["https://chungdoi.com/images/themes/love-art/thanks.webp", "public/images/themes/love-art/thanks.webp"],
  ["https://chungdoi.com/images/themes/love-art/bride%20frame.webp", "public/images/themes/love-art/bride-frame.webp"],
  ["https://chungdoi.com/images/themes/love-art/groom%20frame.webp", "public/images/themes/love-art/groom-frame.webp"],
  ["https://chungdoi.com/images/envelope/hoa_tinh_red.webp", "public/images/envelope/hoa-tinh-red.webp"],
];

function download(url, dest) {
  return new Promise((resolve, reject) => {
    const path = join(root, dest);
    const client = url.startsWith("https") ? https : http;
    const req = client.get(
      url,
      { headers: { "User-Agent": "Mozilla/5.0 (compatible; invitation-clone/1.0)" } },
      (res) => {
        if (res.statusCode && res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          download(res.headers.location, dest).then(resolve).catch(reject);
          return;
        }
        if (res.statusCode !== 200) {
          reject(new Error(`${res.statusCode} ${url}`));
          return;
        }
        const file = createWriteStream(path);
        res.pipe(file);
        file.on("finish", () => file.close(() => resolve()));
        file.on("error", reject);
      },
    );
    req.on("error", reject);
  });
}

for (const [url, dest] of assets) {
  await mkdir(dirname(join(root, dest)), { recursive: true });
  await download(url, dest);
  console.log("ok", dest);
}
