#!/bin/sh

# Finds remaining occurrences of '??' and displays matching files sorted
# by the amount of occurrences

echo Total lines:
ag -Q '??' book | wc -l
echo
echo Per file:
ag -Q '??' book --count | sort --field-separator=: -g  -k2
