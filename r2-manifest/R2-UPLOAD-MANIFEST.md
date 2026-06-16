# RIMA AFRICA SAFARIS — Cloudflare R2 Upload Manifest
## Bucket name: rima-africa-media
## Public URL pattern: https://pub-YOURPUBID.r2.dev/[path]

## SETUP STEPS
1. Cloudflare Dashboard ? R2 ? Create Bucket: "rima-africa-media"
2. Settings ? Public Access ? Enable
3. Optionally add custom domain: media.rimaafrica.com
4. Update NEXT_PUBLIC_R2_URL in .env.local and Cloudflare Pages env vars

---

## REQUIRED FILES — MINIMUM SET FOR LAUNCH

### UI / Site-wide
| File path in R2                       | Size     | Description                        |
|---------------------------------------|----------|------------------------------------|
| ui/hero-placeholder.jpg               | 1440×900 | Homepage hero poster (preload)     |
| ui/about-story.jpg                    | 800×1000 | About page portrait                |
| ui/why-01.jpg through why-05.jpg      | 275×172  | Why Us section card images         |
| ui/continent-east-africa.jpg          | 400×520  | East Africa continent thumbnail    |
| ui/continent-southern-africa.jpg      | 400×520  | Southern Africa thumbnail          |
| ui/continent-indian-ocean.jpg         | 400×520  | Indian Ocean Islands thumbnail     |
| ui/type-safari.jpg through type-sustainable.jpg | 600×400 | Experience type cards   |

### Videos (H.264 mp4, 1080p, max 35 seconds, muted-loop ready)
| File path in R2                              | Description                   |
|----------------------------------------------|-------------------------------|
| videos/hero/main-hero.mp4                    | Homepage hero loop            |
| videos/destinations/kenya-hero.mp4           | Kenya destination page hero   |
| videos/destinations/tanzania-hero.mp4        | Tanzania destination hero     |
| videos/destinations/zanzibar-hero.mp4        | Zanzibar destination hero     |
| videos/destinations/seychelles-hero.mp4      | Seychelles destination hero   |
| videos/destinations/mauritius-hero.mp4       | Mauritius destination hero    |

### Per Destination (repeat for each slug)
Slugs: kenya, tanzania, zanzibar, rwanda, uganda, seychelles, mauritius,
       madagascar, botswana, namibia, zimbabwe, zambia, south-africa

| Pattern                                      | Dimensions | Purpose                |
|----------------------------------------------|------------|------------------------|
| destinations/[slug]/hero.jpg                 | 1440×900   | Destination page hero  |
| destinations/[slug]/cover.jpg                | 600×600    | Country card image     |
| destinations/[slug]/gallery-01.jpg to 08.jpg | 1200×800   | Gallery grid           |

### Kenya sub-images (Where to Go section)
| File                                    | Description      |
|-----------------------------------------|------------------|
| destinations/kenya/maasai-mara.jpg      | Maasai Mara      |
| destinations/kenya/amboseli.jpg         | Amboseli         |
| destinations/kenya/samburu.jpg          | Samburu          |
| destinations/kenya/nakuru.jpg           | Lake Nakuru      |
| destinations/kenya/diani.jpg            | Diani Beach      |

### Blog covers
| File                                                | Description         |
|-----------------------------------------------------|---------------------|
| blog/great-wildebeest-migration-guide/cover.jpg     | Migration article   |
| blog/best-time-maasai-mara/cover.jpg                | Seasonal guide      |
| blog/seychelles-honeymoon-guide/cover.jpg           | Seychelles article  |
| blog/gorilla-trekking-rwanda-guide/cover.jpg        | Rwanda article      |

### Guides/Team
| File                | Dimensions | Description             |
|---------------------|------------|-------------------------|
| team/guide-01.jpg   | 400×500    | Guide portrait 1        |
| team/guide-02.jpg   | 400×500    | Guide portrait 2        |

---

## WRANGLER UPLOAD COMMANDS (run after `npx wrangler login`)
```bash
npx wrangler r2 object put rima-africa-media/ui/hero-placeholder.jpg --file C:\path\to\hero.jpg
npx wrangler r2 object put rima-africa-media/destinations/kenya/hero.jpg --file C:\path\to\kenya-hero.jpg
```
Or use the Cloudflare R2 web console to drag-and-drop upload entire folders.

## OPTIONAL: CLOUDFLARE IMAGES TRANSFORM (when/if activated)
Append query params to R2 URLs for responsive images:
https://pub-YOURID.r2.dev/destinations/kenya/hero.jpg?width=800&quality=80&format=webp
