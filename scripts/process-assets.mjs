import sharp from "sharp";
import { copyFileSync, mkdirSync } from "fs";

mkdirSync("public/images", { recursive: true });
mkdirSync("public/downloads", { recursive: true });

// Compress hero image to ~400KB, 1920px wide
await sharp("picture_assets/062A8878.jpg")
  .resize(1920)
  .jpeg({ quality: 75 })
  .toFile("public/images/hero.jpg");

console.log("✓ hero.jpg compressed");

// Invert MADISM logo to white (negate the image, then flatten on transparent)
await sharp("picture_assets/MADISM_LOGO_FIXED.png")
  .negate({ alpha: false })
  .toFile("public/images/madism-logo-white.png");

console.log("✓ madism-logo-white.png created");

// Copy EPK PDF
copyFileSync("Madism_EPK_V5.pdf", "public/downloads/Madism_EPK_V5.pdf");
console.log("✓ EPK copied to public/downloads/");

// Create favicon from rounded logo
await sharp("picture_assets/MADISM_LOGO_ROUNDED (3).png")
  .negate({ alpha: false })
  .resize(32, 32)
  .toFile("app/favicon.ico");

console.log("✓ favicon.ico created");
