#!/usr/bin/env bash
set -e

# run in the directory where the source html is

for html in *; do pandoc "$html" -o "$html.md"; done
