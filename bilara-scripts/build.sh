#!/usr/bin/env bash
set -e

./bilara-scripts/convert.js
if [ -d 'assets/bilara' ]; then
    rm -rf assets/bilara
fi
mv ./bilara-scripts/data ./assets/bilara
