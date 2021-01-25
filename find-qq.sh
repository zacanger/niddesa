#!/usr/bin/env bash
set -e

# Finds remaining occurrences of '??' and displays matching files sorted
# by the amount of occurrences

count=$(ag -Q '??' book --count | sort --field-separator=: -g  -k2)
total=$(echo "$count" | cut -d: -f2 | awk '{ sum +=$1 }; END { print sum }')

echo "Total occurences: $total"
echo
echo Per file:
echo "$count"
