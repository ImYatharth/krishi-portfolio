#!/usr/bin/env node
/**
 * Strapi 5 Setup Script
 *
 * Usage: node scripts/setup-strapi.mjs <email> <password>
 *
 * This script:
 * 1. Authenticates with Strapi admin
 * 2. Creates a full-access API token
 * 3. Seeds categories, artworks, homepage, about page
 * 4. Writes the token to frontend .env.local
 */

const STRAPI_URL = "http://localhost:1337";
const [email, password] = process.argv.slice(2);

if (!email || !password) {
  console.error("Usage: node scripts/setup-strapi.mjs <email> <password>");
  process.exit(1);
}

async function adminFetch(path, { token, method, body } = {}) {
  const headers = { "Content-Type": "application/json" };
  if (token) headers["Authorization"] = `Bearer ${token}`;

  const res = await fetch(`${STRAPI_URL}${path}`, {
    method: method || "GET",
    headers,
    ...(body ? { body: typeof body === "string" ? body : JSON.stringify(body) } : {}),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`${res.status}: ${text.slice(0, 200)}`);
  }
  return res.json();
}

// ─── 1. Authenticate ────────────────────────────────────────

console.log("\n🔐 Authenticating...");
const authRes = await adminFetch("/admin/login", {
  method: "POST",
  body: JSON.stringify({ email, password }),
});
const jwt = authRes.data.token;
console.log("   ✅ Authenticated");

// ─── 2. Create API Token (full-access) ─────────────────────

console.log("\n🪙  Creating API token...");
let apiToken = "";
try {
  const tokenRes = await adminFetch("/admin/api-tokens", {
    method: "POST",
    token: jwt,
    body: JSON.stringify({
      name: "Frontend",
      description: "Token for Next.js frontend",
      type: "full-access",
      lifespan: null,
    }),
  });
  apiToken = tokenRes.data.accessKey;
  console.log("   ✅ API token created");

  // Write to frontend .env.local
  const fs = await import("fs");
  const envPath = "/Users/apple/Desktop/Yatharth/Sports/krishi-portfolio/apps/frontend/.env.local";
  let envContent = fs.readFileSync(envPath, "utf8");
  envContent = envContent.replace(/STRAPI_API_TOKEN=.*/, `STRAPI_API_TOKEN=${apiToken}`);
  fs.writeFileSync(envPath, envContent);
  console.log("   ✅ Token saved to apps/frontend/.env.local");
} catch (e) {
  console.log(`   ⚠️  ${e.message.slice(0, 100)}`);
  console.log("   → Create manually: Strapi admin → Settings → API Tokens → Full-access");
}

// Use the API token for content operations (admin JWT doesn't work for /api/ routes)
const contentToken = apiToken || null;

// ─── 3. Seed Categories ─────────────────────────────────────

console.log("\n🎨 Seeding categories...");
const categories = [
  { name: "Digital Art", slug: "digital-art", description: "Digital paintings and artwork", sortOrder: 1 },
  { name: "Illustration", slug: "illustration", description: "Character and scene illustrations", sortOrder: 2 },
  { name: "Concept Art", slug: "concept-art", description: "Concept art and visual development", sortOrder: 3 },
];

for (const cat of categories) {
  try {
    await adminFetch("/api/categories", {
      method: "POST",
      token: contentToken,
      body: JSON.stringify({ data: cat }),
    });
    console.log(`   ✅ ${cat.name}`);
  } catch (e) {
    console.log(`   ⚠️  ${cat.name}: ${e.message.slice(0, 80)}`);
  }
}

// ─── 4. Seed Artworks ────────────────────────────────────────

console.log("\n🖼️  Seeding artworks...");
const artworks = [
  { title: "Ethereal Glow", slug: "ethereal-glow", description: "An exploration of light and form in digital space.", medium: "Digital Painting", dimensions: "3840 × 2160 px", year: 2024, isFeatured: true, sortOrder: 1, tags: ["atmospheric", "dark", "light"] },
  { title: "Midnight Garden", slug: "midnight-garden", description: "A botanical study reimagined through a dark, fantastical lens.", medium: "Digital Illustration", dimensions: "2400 × 3200 px", year: 2024, isFeatured: true, sortOrder: 2, tags: ["botanical", "dark", "fantasy"] },
  { title: "Signal and Noise", slug: "signal-and-noise", description: "The tension between clarity and chaos, expressed through layered digital compositions.", medium: "Mixed Digital Media", dimensions: "4000 × 3000 px", year: 2025, isFeatured: true, sortOrder: 3, tags: ["abstract", "glitch", "experimental"] },
  { title: "The Wanderer", slug: "the-wanderer", description: "A lone figure traversing an impossible landscape.", medium: "Digital Painting", dimensions: "3000 × 4000 px", year: 2025, isFeatured: false, sortOrder: 4, tags: ["character", "landscape", "solitude"] },
  { title: "Neon Drift", slug: "neon-drift", description: "Urban energy distilled into pure color and movement.", medium: "Digital Art", dimensions: "3840 × 2160 px", year: 2025, isFeatured: false, sortOrder: 5, tags: ["urban", "neon", "atmosphere"] },
  { title: "Chrysalis", slug: "chrysalis", description: "Transformation captured in a single frame — the moment between what was and what will be.", medium: "Digital Illustration", dimensions: "2800 × 3500 px", year: 2026, isFeatured: true, sortOrder: 6, tags: ["transformation", "organic", "surreal"] },
];

for (const art of artworks) {
  try {
    const res = await adminFetch("/api/artworks", {
      method: "POST",
      token: contentToken,
      body: JSON.stringify({ data: art }),
    });
    // Publish it in Strapi 5
    if (res.data?.documentId) {
      try {
        await adminFetch(`/api/artworks/${res.data.documentId}/actions/publish`, {
          method: "POST",
          token: contentToken,
        });
      } catch {}
    }
    console.log(`   ✅ ${art.title}`);
  } catch (e) {
    console.log(`   ⚠️  ${art.title}: ${e.message.slice(0, 80)}`);
  }
}

// ─── 5. Seed Homepage ────────────────────────────────────────

console.log("\n🏠 Homepage...");
try {
  await adminFetch("/api/homepage", {
    method: "PUT",
    token: contentToken,
    body: JSON.stringify({
      data: {
        heroTitle: "yourstruly.krishi",
        heroSubtitle: "Digital Art & Illustration",
        aboutPreviewText: "A digital artist exploring the boundaries of illustration and visual storytelling.",
        ctaText: "Explore Gallery",
        ctaLink: "/gallery",
      },
    }),
  });
  console.log("   ✅ Configured");
} catch (e) {
  console.log(`   ⚠️  ${e.message.slice(0, 80)}`);
}

// ─── 6. Seed About ──────────────────────────────────────────

console.log("\n👤 About...");
try {
  await adminFetch("/api/about", {
    method: "PUT",
    token: contentToken,
    body: JSON.stringify({
      data: {
        headline: "The Artist Behind the Work",
        bio: "<p>I'm Krishi, a digital artist and illustrator passionate about creating atmospheric, evocative artwork that tells stories without words.</p><p>My work explores the intersection of technology and traditional art forms, drawing inspiration from nature, urban landscapes, and the boundless possibilities of the digital medium.</p>",
        shortBio: "Digital artist & illustrator based in India, creating atmospheric and evocative artwork.",
        socialLinks: [
          { platform: "instagram", url: "https://instagram.com/yourstruly.krishi", label: "Instagram" },
        ],
        skills: ["Digital Painting", "Illustration", "Concept Art", "Character Design", "Photoshop", "Procreate"],
      },
    }),
  });
  console.log("   ✅ Configured");
} catch (e) {
  console.log(`   ⚠️  ${e.message.slice(0, 80)}`);
}

// ─── Done! ───────────────────────────────────────────────────

console.log("\n" + "═".repeat(50));
console.log("✨ Setup complete!");
console.log("═".repeat(50));
console.log(`
📌 MANUAL STEP REQUIRED:
   Open http://localhost:1337/admin → Settings → Users & Permissions → Roles → Public
   Enable these actions:
     • Artwork: find, findOne
     • Category: find, findOne
     • About: find
     • Homepage: find
     • Contact-submission: create
   Then click Save.

   After that, restart the Next.js frontend and visit http://localhost:3000
`);
