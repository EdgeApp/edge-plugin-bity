#!/bin/sh
# Usage: copy-core [path-to-core-ui]
set -e
src=${1:-../edge-plugin-screens-and-components}

dest=node_modules/edge-plugin-screens-and-components
mkdir -p $dest

cp    $src/package.json $dest/package.json
cp    $src/manifest.json $dest/manifest.json
cp -r $src/src/ $dest/src/
cp -r $src/lib/ $dest/lib/
cp -r $src/target/ $dest/target/
cp -r $src/public/ $dest/public/
