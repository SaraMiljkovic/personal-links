import { existsSync } from "node:fs";
import path from "node:path";

export function hasLocalPhoto(photoPath: string) {
  return /^\/images\/(?:[\w-]+\/)*[\w.-]+\.(?:avif|gif|jpe?g|png|webp)$/i.test(photoPath)
    && existsSync(path.join(process.cwd(), "public", photoPath));
}
