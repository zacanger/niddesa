#!/usr/bin/env bash
set -e

if hash gmake 2>/dev/null; then
    gmake clean
else
    make clean
fi

docker build -t niddesa .
docker run --rm --volume "$(pwd):/data" --entrypoint "make" niddesa
node ./bilara-scripts/convert.js
