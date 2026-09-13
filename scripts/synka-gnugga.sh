#!/bin/sh
# Synkar in en snapshot av Gnugga (körfilerna, inte docs/scripts/mockups) till
# flippa-repot under gnugga/, så att den inbäddade Gnugga serveras SAMMA ORIGIN
# som Flippa (flippa.tomairaksinen.se). Cross-origin-iframes får flyktig,
# partitionerad lagring i iOS (ITP) och kan inte nås av lagringsbryggan.
# Kör efter varje Gnugga-release som ska ut i Flippa. Se docs/flippa-x-gnugga.md.
set -e
KALLA="$(dirname "$0")/../../gnugga"
MAL="$(dirname "$0")/../gnugga"
mkdir -p "$MAL/data/ro"
for f in index.html app.js style.css sw.js manifest.json icon-192.png icon-512.png LICENSE-data.md; do
  cp "$KALLA/$f" "$MAL/$f"
done
cp "$KALLA/data/changelog.js" "$MAL/data/changelog.js"
cp "$KALLA/data/ro/monster.js" "$KALLA/data/ro/lexikon.json" "$MAL/data/ro/"
echo "Gnugga-snapshot synkad: $(grep -o 'APP_VERSION = \"v[0-9]*\"' "$MAL/app.js")"
