#!/usr/bin/env bash
set -e

# Depends on pandoc and xelatex
# To run on mac, first brew install mactext pandoc
# Run from within a directory that only includes completed files,
# plus the metadata.txt file

output_dir=build
file_name=niddesa

# clean first
if [[ -d $output_dir ]]; then
  rm -rf $output_dir;
fi
mkdir $output_dir

for format in pdf epub html mobi; do
  pandoc \
    -o "$output_dir/$file_name.$format" \
    title.txt \
    --toc --toc-depth=2 \
    --pdf-engine=xelatex \
    -f gfm \
    --standalone \
    ./*.md
done
