# Teqco website

Next.js (App Router) site for Teqco, Condobolin. Static export, no server runtime needed.

- `app/` pages and layout, `components/` UI, `data/ranges.js` the 15 product ranges, `public/img/` images, `app/globals.css` styles.
- `npm run dev` local dev server, `npm run build` static export into `out/`.
- `./deploy.sh` deploys to Vercel (https://teqco-redesign.vercel.app).
- `./deploy-cloudways.sh` builds and pushes `out/` to the `cloudways` branch; then Pull in Cloudways → Deployment via Git.
