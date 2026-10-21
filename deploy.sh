#!/usr/bin/env bash
# Build deploy/ from src/ (shared header, footer, CSS, scripts + each page) and push to Vercel production.
# Usage: ./deploy.sh
set -euo pipefail
cd "$(dirname "$0")"
python3 -I build.py
cd deploy
npx -y vercel@latest deploy --prod --yes 2>&1 | grep -v "npm notice" | tail -3
echo "Live: https://teqco-redesign.vercel.app"
