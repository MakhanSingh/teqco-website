#!/usr/bin/env bash
# Build the site and publish ONLY the built files to the `cloudways` branch,
# which Cloudways pulls straight into public_html (it does not run builds).
# Usage: ./deploy-cloudways.sh            (needs a git remote named origin)
set -euo pipefail
cd "$(dirname "$0")"
python3 -I build.py
WT=$(mktemp -d)
git worktree add --detach "$WT" >/dev/null 2>&1
(
  cd "$WT"
  if git show-ref --verify --quiet refs/heads/cloudways; then
    git checkout -q cloudways
  else
    git checkout -q --orphan cloudways
  fi
  git rm -rfq . >/dev/null 2>&1 || true
  cp -R "$OLDPWD/deploy/index.html" "$OLDPWD/deploy/about.html" "$OLDPWD/deploy/products.html" "$OLDPWD/deploy/contact.html" \
        "$OLDPWD/deploy/styles.css" "$OLDPWD/deploy/scripts.js" "$OLDPWD/deploy/img" .
  cp "$OLDPWD/cloudways-htaccess" .htaccess
  git add -A
  git -c user.name="$(git config user.name)" -c user.email="$(git config user.email)" commit -qm "Build $(date '+%Y-%m-%d %H:%M')" || echo "Nothing new to publish."
  git push -u origin cloudways
)
git worktree remove --force "$WT"
echo "Pushed built site to branch 'cloudways'. Now click 'Pull' in Cloudways → Deployment via Git (or it auto-pulls if a webhook is set)."
