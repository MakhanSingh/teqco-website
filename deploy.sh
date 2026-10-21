#!/usr/bin/env bash
# Deploy the Next.js site to Vercel production (Vercel runs `next build` itself).
# Usage: ./deploy.sh
set -euo pipefail
cd "$(dirname "$0")"
if [ ! -f .vercel/project.json ]; then
  npx -y vercel@latest link --yes --scope makhansinghs-projects --project teqco-redesign 2>&1 | grep -v "npm notice" | tail -2
fi
npx -y vercel@latest deploy --prod --yes 2>&1 | grep -v "npm notice" | tail -3
echo "Live: https://teqco-redesign.vercel.app"
